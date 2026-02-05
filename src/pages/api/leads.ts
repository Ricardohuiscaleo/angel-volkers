// src/pages/api/leads.ts
import type { APIRoute } from 'astro';
import { prisma } from '../../lib/db';
import { sendToN8N, n8nWebhooks } from '../../lib/n8n';
import { createChatwootContact } from '../../lib/chatwoot';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, message, propertyId, source = 'web' } = data;

    // Validación básica
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear o buscar usuario
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          phone,
        },
      });

      // Crear contacto en Chatwoot
      try {
        const chatwootContact = await createChatwootContact({
          name,
          email,
          phone,
        });
        
        // Actualizar usuario con ID de Chatwoot
        await prisma.user.update({
          where: { id: user.id },
          data: { chatwootId: chatwootContact.payload.contact.id.toString() },
        });
      } catch (error) {
        console.error('Error creating Chatwoot contact:', error);
      }
    }

    // Crear lead
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        source,
        propertyId,
        userId: user.id,
        status: 'new',
        score: calculateLeadScore({ name, email, phone, message }),
      },
    });

    // Enviar a n8n para automatizaciones
    try {
      await sendToN8N(n8nWebhooks.leadCapture, {
        leadId: lead.id,
        name,
        email,
        phone,
        message,
        propertyId,
        score: lead.score,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error sending to n8n:', error);
    }

    return new Response(
      JSON.stringify({
        success: true,
        leadId: lead.id,
        message: 'Gracias por tu interés. Te contactaremos pronto.',
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return new Response(
      JSON.stringify({ error: 'Error processing your request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

function calculateLeadScore(data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}): number {
  let score = 0;
  
  if (data.name) score += 10;
  if (data.email) score += 20;
  if (data.phone) score += 30;
  if (data.message && data.message.length > 20) score += 40;
  
  return score;
}
