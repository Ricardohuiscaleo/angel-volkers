import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ciudades = ['Santiago', 'Viña del Mar', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Puerto Montt', 'Iquique', 'Rancagua'];
const comunas = ['Las Condes', 'Vitacura', 'Providencia', 'Lo Barnechea', 'Ñuñoa', 'La Reina', 'Reñaca', 'Con Con', 'Viña Centro', 'Cerro Alegre'];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed45Casas() {
  console.log('🏠 Creando 45 casas...');

  const casas = [];

  for (let i = 0; i < 45; i++) {
    const ciudad = randomChoice(ciudades);
    const comuna = randomChoice(comunas);
    const habitaciones = randomInt(2, 6);
    const banos = randomInt(1, 4);
    const area = randomInt(80, 350);
    const precio = randomInt(80000000, 450000000);
    const operation = randomChoice(['sale', 'rent']);

    casas.push({
      id: `prop-${Date.now()}-${Math.random().toString(36).substring(2, 11)}-${i}`,
      title: `Casa en ${comuna}, ${ciudad}`,
      description: `Hermosa casa de ${habitaciones} dormitorios y ${banos} baños en ${comuna}. Excelente ubicación y acabados de primera calidad.`,
      price: precio,
      currency: 'CLP',
      type: 'house',
      operation,
      bedrooms: habitaciones,
      bathrooms: banos,
      area,
      address: `Calle ${randomInt(100, 9999)}`,
      city: ciudad,
      region: 'Región Metropolitana',
      country: 'Chile',
      images: [
        `https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800`,
        `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800`
      ],
      features: [
        'Estacionamiento',
        'Jardín',
        'Terraza',
        'Bodega',
        'Logia'
      ],
      status: 'available'
    });
  }

  for (const casa of casas) {
    await prisma.property.create({ data: casa });
  }

  console.log(`✅ ${casas.length} casas creadas exitosamente`);
}

seed45Casas()
  .then(() => {
    console.log('🎉 Seed completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
