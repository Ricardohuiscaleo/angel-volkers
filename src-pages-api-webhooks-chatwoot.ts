// src/pages/api/webhooks/chatwoot.ts
import type { APIRoute } from 'astro';
import { sendToN8N, n8nWebhooks } from '../../../lib/n8n';
import { prisma } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { event, conversation, message } = data;

    console.log('Chatwoot webhook received:', event);

    // Procesar solo mensajes entrantes
    if (event === 'message_created' && message.message_type === 'incoming') {
      const content = message.content;
      const contactId = conversation.contact_id;

      // Buscar usuario por chatwootId
      const user = await prisma.user.findUnique({
        where: { chatwootId: contactId.toString() },
      });

      // Enviar a n8n para procesamiento con IA
      await sendToN8N(n8nWebhooks.chatwootMessage, {
        conversationId: conversation.id,
        contactId,
        userId: user?.id,
        message: content,
        timestamp: new Date().toISOString(),
      });

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
