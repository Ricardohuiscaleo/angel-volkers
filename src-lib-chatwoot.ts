
const CHATWOOT_URL = process.env.CHATWOOT_URL;
const API_KEY = process.env.CHATWOOT_API_KEY;
const ACCOUNT_ID = process.env.CHATWOOT_ACCOUNT_ID;

export async function createChatwootContact(data: {
  name: string;
  email: string;
  phone?: string;
}) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/contacts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': API_KEY!,
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
}

export async function createChatwootConversation(contactId: string, inboxId: string) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/conversations`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': API_KEY!,
      },
      body: JSON.stringify({
        contact_id: contactId,
        inbox_id: inboxId,
      }),
    }
  );

  return await response.json();
}

export async function sendChatwootMessage(
  conversationId: string,
  message: string
) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/conversations/${conversationId}/messages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': API_KEY!,
      },
      body: JSON.stringify({
        content: message,
        message_type: 'outgoing',
      }),
    }
  );

  return await response.json();
}
