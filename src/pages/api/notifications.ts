import type { APIRoute } from 'astro';

export const prerender = false;

// Store global para clientes SSE
const globalClients = (globalThis as any).__sseClients || new Set();
(globalThis as any).__sseClients = globalClients;

export const GET: APIRoute = async () => {
  const stream = new ReadableStream({
    start(controller) {
      globalClients.add(controller);
      
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`));
      
      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(`: keepalive\n\n`));
        } catch {
          clearInterval(keepAlive);
        }
      }, 30000);
      
      return () => {
        globalClients.delete(controller);
        clearInterval(keepAlive);
      };
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const message = `data: ${JSON.stringify(data)}\n\n`;
    
    globalClients.forEach((client: any) => {
      try {
        client.enqueue(new TextEncoder().encode(message));
      } catch (error) {
        globalClients.delete(client);
      }
    });

    return new Response(JSON.stringify({ sent: globalClients.size }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Broadcast failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
