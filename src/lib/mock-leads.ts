// Mock leads data for local development
export const mockLeads = [
  {
    id: 'lead-1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+56912345678',
    message: 'Interesado en departamento en Las Condes',
    source: 'website',
    status: 'new',
    score: 90,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'lead-2',
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+56987654321',
    message: 'Busco casa en Providencia, 3 dormitorios',
    source: 'chat',
    status: 'contacted',
    score: 85,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: 'lead-3',
    name: 'Carlos Rodríguez',
    email: 'carlos.r@email.com',
    phone: null,
    message: null,
    source: 'phone',
    status: 'qualified',
    score: 60,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: 'lead-4',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '+56911223344',
    message: 'Quiero invertir en propiedades comerciales',
    source: 'referral',
    status: 'converted',
    score: 100,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 'lead-5',
    name: 'Pedro Morales',
    email: 'pedro.m@email.com',
    phone: null,
    message: 'Solo consultando precios',
    source: 'email',
    status: 'lost',
    score: 30,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19')
  }
];
