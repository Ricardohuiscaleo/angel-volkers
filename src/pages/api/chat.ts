import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, sessionId } = await request.json();

    const webhookUrl = import.meta.env.N8N_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL || 'https://proyecto1-n8n.dj3bvg.easypanel.host/webhook/chat-inmobiliario';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversationId: sessionId,
        phone: sessionId
      })
    });

    const data = await response.json();

    return new Response(JSON.stringify({ 
      response: data.response || 'Gracias por tu mensaje. Un agente te contactará pronto.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error en chat:', error);
    return new Response(JSON.stringify({ error: 'Error en el chat' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
