// src/pages/api/webhooks/chatwoot.ts
import type { APIRoute } from 'astro';
import { sendToN8N, n8nWebhooks } from '../../../lib/n8n';
import { prisma } from '../../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { event, conversation, message } = data;

    console.log('Chatwoot webhook received:', event);

    // Procesar solo mensajes entrantes
    if (event === 'message_created' && message.message_type === 'incoming') {
      const content = message.content;
      const contactId = conversation.contact_id;
      const conversationId = conversation.id.toString();

      // Buscar usuario por chatwootId
      const user = await prisma.user.findUnique({
        where: { chatwootId: contactId.toString() },
      });

      // Enviar a n8n para procesamiento con IA
      await sendToN8N(n8nWebhooks.chatwootMessage, {
        conversationId,
        contactId,
        userId: user?.id,
        message: content,
        timestamp: new Date().toISOString(),
      });

      // Capturar lead progresivamente si hay datos de contacto
      if (conversation.meta?.sender) {
        const sender = conversation.meta.sender;
        const existingLead = await prisma.lead.findFirst({
          where: { email: sender.email || 'pendiente@email.com' },
        });

        if (existingLead) {
          await prisma.lead.update({
            where: { id: existingLead.id },
            data: {
              name: sender.name || undefined,
              phone: sender.phone_number || undefined,
              message: content,
              updatedAt: new Date(),
            },
          });
        } else {
          await prisma.lead.create({
            data: {
              name: sender.name || 'Visitante',
              email: sender.email || 'pendiente@email.com',
              phone: sender.phone_number || null,
              message: content,
              source: 'chatwoot',
              status: 'new',
              score: (sender.email ? 20 : 0) + (sender.phone_number ? 30 : 0) + (sender.name ? 10 : 0),
            },
          });
        }
      }

      // Detectar intención de agendar visita
      if (
        content.toLowerCase().includes('visita') ||
        content.toLowerCase().includes('ver') ||
        content.toLowerCase().includes('agendar')
      ) {
        // Crear notificación para agente
        await prisma.notification.create({
          data: {
            type: 'visit_request',
            title: 'Solicitud de visita',
            message: `${user?.name || 'Usuario'} quiere agendar una visita`,
            data: {
              userId: user?.id,
              conversationId: conversation.id,
              message: content,
            },
          },
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing Chatwoot webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Error processing webhook' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
