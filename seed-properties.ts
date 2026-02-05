import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockProperties = [
  {
    title: 'BODEGA EN SECTOR INDUSTRIAL',
    description: 'Amplia bodega en sector industrial de Arica, ideal para almacenamiento o distribución.',
    price: 410000000,
    currency: 'CLP',
    type: 'warehouse',
    operation: 'sale',
    bedrooms: 0,
    bathrooms: 2,
    area: 662,
    address: 'Sector Industrial',
    city: 'Arica',
    region: 'Arica y Parinacota',
    country: 'Chile',
    images: ['https://uploadcare.engelvoelkers.com/af1ec947-3c06-4aa0-a6c5-97e4b79945d8/-/format/webp/-/stretch/off/-/progressive/yes/-/resize/1440x/-/quality/lighter/'],
    features: ['Sector Industrial', 'Amplio espacio', 'Acceso vehicular'],
    status: 'available'
  },
  {
    title: 'DEPARTAMENTO MODERNO EN PROVIDENCIA',
    description: 'Hermoso departamento de 2 dormitorios y 2 baños en el corazón de Providencia.',
    price: 185000000,
    currency: 'CLP',
    type: 'apartment',
    operation: 'sale',
    bedrooms: 2,
    bathrooms: 2,
    area: 75,
    address: 'Av. Providencia 2500',
    city: 'Santiago',
    region: 'Región Metropolitana',
    country: 'Chile',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    features: ['Balcón', 'Estacionamiento', 'Bodega', 'Logia'],
    status: 'available'
  },
  {
    title: 'CASA EN CONDOMINIO LAS CONDES',
    description: 'Exclusiva casa de 4 dormitorios en condominio cerrado con áreas verdes.',
    price: 450000000,
    currency: 'CLP',
    type: 'house',
    operation: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    address: 'Condominio Los Dominicos',
    city: 'Santiago',
    region: 'Región Metropolitana',
    country: 'Chile',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
    features: ['Jardín', 'Quincho', 'Piscina', 'Seguridad 24/7'],
    status: 'available'
  },
  {
    title: 'OFICINA PREMIUM EN VITACURA',
    description: 'Moderna oficina en edificio corporativo clase A con vista panorámica.',
    price: 95000000,
    currency: 'CLP',
    type: 'office',
    operation: 'sale',
    bedrooms: 0,
    bathrooms: 2,
    area: 85,
    address: 'Av. Vitacura 3500',
    city: 'Santiago',
    region: 'Región Metropolitana',
    country: 'Chile',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
    features: ['Aire acondicionado', 'Estacionamiento', 'Sala de reuniones'],
    status: 'available'
  },
  {
    title: 'DEPARTAMENTO FRENTE AL MAR VIÑA DEL MAR',
    description: 'Espectacular departamento con vista al mar en Reñaca.',
    price: 320000000,
    currency: 'CLP',
    type: 'apartment',
    operation: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    address: 'Av. Borgoño 15000',
    city: 'Viña del Mar',
    region: 'Valparaíso',
    country: 'Chile',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    features: ['Vista al mar', 'Terraza', 'Piscina', 'Gimnasio'],
    status: 'available'
  }
];

async function seedProperties() {
  console.log('🌱 Creando propiedades de prueba...');
  
  for (const property of mockProperties) {
    await prisma.property.create({
      data: {
        id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...property
      }
    });
  }
  
  console.log(`✅ ${mockProperties.length} propiedades creadas`);
}

seedProperties()
  .then(() => {
    console.log('✨ Seed completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
