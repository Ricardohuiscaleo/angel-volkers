import type { APIRoute } from 'astro';
import { mockLeads } from '../../lib/mock-leads';

// Usar mock data en desarrollo si no hay conexión a DB
const USE_MOCK = process.env.NODE_ENV === 'development';

let prismaLeads: any;
if (!USE_MOCK) {
  try {
    const dbModule = await import('../../lib/db-leads');
    prismaLeads = dbModule.prismaLeads;
  } catch (error) {
    console.warn('Using mock leads data');
  }
}

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    if (USE_MOCK || !prismaLeads) {
      const url = new URL(request.url);
      const status = url.searchParams.get('status');
      let leads = [...mockLeads];
      if (status) {
        leads = leads.filter(l => l.status === status);
      }
      return new Response(JSON.stringify(leads), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const limit = parseInt(url.searchParams.get('limit') || '50');

    const where: any = {};
    if (status) where.status = status;

    const leads = await prismaLeads.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return new Response(JSON.stringify(leads), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return new Response(JSON.stringify({ error: 'Error fetching leads' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    if (!data.name || !data.email) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const score = calculateLeadScore(data);

    const lead = await prismaLeads.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message || null,
        source: data.source || 'website',
        status: 'new',
        score,
        propertyId: data.propertyId || null,
        userId: data.userId || null,
        agentId: data.agentId || null,
        metadata: data.metadata || null
      }
    });

    return new Response(JSON.stringify(lead), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return new Response(JSON.stringify({ error: 'Error creating lead' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Lead ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const lead = await prismaLeads.lead.update({
      where: { id },
      data: updateData
    });

    return new Response(JSON.stringify(lead), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return new Response(JSON.stringify({ error: 'Error updating lead' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function calculateLeadScore(data: { name: string; email: string; phone?: string; message?: string }): number {
  let score = 0;
  if (data.name) score += 10;
  if (data.email) score += 20;
  if (data.phone) score += 30;
  if (data.message && data.message.length > 20) score += 40;
  return score;
}
