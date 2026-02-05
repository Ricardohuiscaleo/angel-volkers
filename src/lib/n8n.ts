
export async function sendToN8N(webhook: string, data: any) {
  const url = `${process.env.N8N_WEBHOOK_URL}/${webhook}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('Error sending to n8n:', error);
    throw error;
  }
}

export const n8nWebhooks = {
  leadCapture: 'lead-capture',
  propertyAlert: 'property-alert',
  visitSchedule: 'visit-schedule',
  chatwootMessage: 'chatwoot-message',
};
