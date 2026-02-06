// src/pages/api/properties.ts
import type { APIRoute } from 'astro';
import { prisma } from '../../lib/db';
import { cache } from '../../lib/redis';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const operation = url.searchParams.get('operation');
  const city = url.searchParams.get('city');
  const minPrice = url.searchParams.get('minPrice');
  const maxPrice = url.searchParams.get('maxPrice');

  // Crear cache key basado en parámetros
  const cacheKey = `properties:${type || 'all'}:${operation || 'all'}:${city || 'all'}:${minPrice || '0'}:${maxPrice || 'max'}`;

  // Intentar obtener de cache
  const cached = await cache.get(cacheKey);
  if (cached) {
    return new Response(JSON.stringify(cached), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'HIT',
      },
    });
  }

  // Construir filtros
  const where: any = {
    status: 'available',
  };

  if (type) where.type = type;
  if (operation) where.operation = operation;
  if (city) where.city = city;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseInt(minPrice);
    if (maxPrice) where.price.lte = parseInt(maxPrice);
  }

  try {
    const properties = await prisma.property.findMany({
      where,
      include: {
        agent: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    // Guardar en cache por 5 minutos
    await cache.set(cacheKey, properties, 300);

    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return new Response(JSON.stringify({ error: 'Error fetching properties' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const property = await prisma.property.create({
      data: {
        id: `prop-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        title: data.title,
        description: data.description,
        price: data.price,
        type: data.type,
        operation: data.operation,
        area: data.area,
        bedrooms: data.bedrooms || 0,
        bathrooms: data.bathrooms || 0,
        address: data.address,
        city: data.city,
        region: data.region,
        country: 'Chile',
        images: data.image ? [data.image] : [],
        features: [],
        status: 'available',
      },
    });

    await cache.invalidatePattern('properties:*');

    return new Response(JSON.stringify(property), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating property:', error);
    return new Response(JSON.stringify({ error: 'Error creating property' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const prerender = false;
