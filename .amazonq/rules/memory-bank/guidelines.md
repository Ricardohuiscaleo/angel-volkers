# Development Guidelines

## Code Quality Standards

### File Structure & Organization
- **API Routes**: Place in `src/pages/api/` with descriptive names (properties.ts, leads.ts)
- **Library Code**: Centralize utilities in `src/lib/` (db.ts, redis.ts, utils.ts, chatwoot.ts, n8n.ts)
- **Components**: React components in `src/components/` or root for standalone components
- **Type Safety**: Use TypeScript for all files with explicit type annotations

### Naming Conventions
- **Files**: kebab-case for directories and files (e.g., `scrape-engelvolkers.ts`)
- **Components**: PascalCase for React components (e.g., `PropertyCard`)
- **Functions**: camelCase for functions and variables (e.g., `calculateLeadScore`, `formatPrice`)
- **Constants**: UPPER_SNAKE_CASE for constants (e.g., `BASE_URL`, `SEARCH_URL`)
- **Database Models**: PascalCase singular (e.g., `Property`, `User`, `Lead`)

### Code Formatting
- **Imports**: Group by external packages, then internal modules
  ```typescript
  import type { APIRoute } from 'astro';
  import { prisma } from '../../lib/db';
  import { cache } from '../../lib/redis';
  ```
- **Spacing**: Single blank line between logical sections
- **String Literals**: Use single quotes for strings, template literals for interpolation
- **Semicolons**: Always use semicolons at statement ends
- **Indentation**: 2 spaces (consistent across all files)

### Documentation Standards
- **Comments**: Use inline comments for complex logic, avoid obvious comments
- **Console Logging**: Use descriptive messages with emojis for CLI scripts
  ```typescript
  console.log('🔍 Scrapeando Engel & Völkers Chile...');
  console.log(`✅ Encontradas ${properties.length} propiedades`);
  console.error('❌ Error:', error);
  ```
- **Error Messages**: User-friendly Spanish messages for API responses
  ```typescript
  message: 'Gracias por tu interés. Te contactaremos pronto.'
  ```

## API Development Patterns

### Astro API Routes
- **Export Named Functions**: Use `GET`, `POST`, `PUT`, `DELETE` as named exports
  ```typescript
  export const GET: APIRoute = async ({ request }) => { ... }
  export const POST: APIRoute = async ({ request }) => { ... }
  ```
- **Type Annotations**: Always use `APIRoute` type from 'astro'
- **Prerendering**: Explicitly disable for dynamic routes
  ```typescript
  export const prerender = false;
  ```

### Request Handling
- **URL Parameters**: Extract from `request.url` using URL API
  ```typescript
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  ```
- **Request Body**: Parse JSON with `await request.json()`
- **Validation**: Perform basic validation before processing
  ```typescript
  if (!name || !email) {
    return new Response(
      JSON.stringify({ error: 'Name and email are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  ```

### Response Patterns
- **Consistent Structure**: Always return JSON with proper headers
  ```typescript
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  ```
- **Status Codes**: Use appropriate HTTP status codes
  - 200: Success (GET)
  - 201: Created (POST)
  - 400: Bad Request (validation errors)
  - 500: Server Error
- **Error Handling**: Wrap database operations in try-catch
  ```typescript
  try {
    // database operations
  } catch (error) {
    console.error('Error creating property:', error);
    return new Response(JSON.stringify({ error: 'Error creating property' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  ```

## Database Patterns (Prisma)

### Client Initialization
- **Singleton Pattern**: Use global variable to prevent multiple instances in development
  ```typescript
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };
  export const prisma = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
  ```

### Query Patterns
- **Filtering**: Build dynamic where clauses based on parameters
  ```typescript
  const where: any = { status: 'available' };
  if (type) where.type = type;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseInt(minPrice);
    if (maxPrice) where.price.lte = parseInt(maxPrice);
  }
  ```
- **Relations**: Use `include` for related data with `select` for specific fields
  ```typescript
  include: {
    agent: {
      select: { name: true, phone: true, email: true }
    }
  }
  ```
- **Ordering**: Always specify `orderBy` for consistent results
  ```typescript
  orderBy: { createdAt: 'desc' }
  ```
- **Pagination**: Use `take` to limit results
  ```typescript
  take: 50
  ```

### Data Creation
- **Spread Operator**: Use spread for bulk data insertion
  ```typescript
  await prisma.property.create({
    data: {
      ...data,
      images: data.images || [],
      features: data.features || []
    }
  });
  ```
- **ID Generation**: Use custom IDs with timestamp and random string
  ```typescript
  id: `prop-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
  ```

### Upsert Pattern
- **Find or Create**: Check existence before creating
  ```typescript
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email, name, phone } });
  }
  ```

## Caching Strategy (Redis)

### Cache Key Naming
- **Descriptive Keys**: Use colon-separated namespaces
  ```typescript
  const cacheKey = `properties:${type || 'all'}:${operation || 'all'}:${city || 'all'}:${minPrice || '0'}:${maxPrice || 'max'}`;
  ```

### Cache Flow Pattern
1. **Check Cache First**: Attempt to retrieve from cache
2. **Return if Hit**: Include `X-Cache: HIT` header
3. **Query Database**: If cache miss, query database
4. **Store in Cache**: Save result with TTL
5. **Return with Miss Header**: Include `X-Cache: MISS` header

```typescript
const cached = await cache.get(cacheKey);
if (cached) {
  return new Response(JSON.stringify(cached), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' }
  });
}
// ... query database ...
await cache.set(cacheKey, properties, 300); // 5 minutes
```

### Cache Invalidation
- **Pattern-Based**: Invalidate related keys using patterns
  ```typescript
  await cache.invalidatePattern('properties:*');
  ```
- **On Mutations**: Always invalidate cache after create/update/delete operations

### Error Handling
- **Graceful Degradation**: Log warnings but don't fail on Redis errors
  ```typescript
  try {
    await redis.setex(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.warn('Redis set error:', error);
  }
  ```

## External Integration Patterns

### n8n Webhook Integration
- **Async Fire-and-Forget**: Don't block API response on webhook calls
  ```typescript
  try {
    await sendToN8N(n8nWebhooks.leadCapture, { ...data });
  } catch (error) {
    console.error('Error sending to n8n:', error);
  }
  ```
- **Structured Payloads**: Send complete data with metadata
  ```typescript
  {
    leadId: lead.id,
    name, email, phone, message,
    score: lead.score,
    timestamp: new Date().toISOString()
  }
  ```

### Chatwoot Integration
- **Contact Creation**: Create contacts for new users
- **Error Handling**: Log errors but don't fail user creation
  ```typescript
  try {
    const chatwootContact = await createChatwootContact({ name, email, phone });
    await prisma.user.update({
      where: { id: user.id },
      data: { chatwootId: chatwootContact.payload.contact.id.toString() }
    });
  } catch (error) {
    console.error('Error creating Chatwoot contact:', error);
  }
  ```

## React Component Patterns

### Component Structure
- **Interface First**: Define props interface before component
  ```typescript
  interface PropertyCardProps {
    id: string;
    title: string;
    price: number;
    // ... other props
  }
  ```
- **Destructured Props**: Destructure props in function signature
  ```typescript
  export default function PropertyCard({ id, title, price, ... }: PropertyCardProps) {
  ```

### Styling Patterns
- **TailwindCSS Classes**: Use utility classes for styling
- **Responsive Design**: Mobile-first approach
- **Hover States**: Use `group` and `group-hover` for interactive elements
  ```typescript
  className="group relative overflow-hidden"
  className="transition-transform duration-300 group-hover:scale-105"
  ```
- **Conditional Rendering**: Check for null/undefined before rendering optional elements
  ```typescript
  {bedrooms !== null && bedrooms !== undefined && bedrooms > 0 && (
    <li>...</li>
  )}
  ```

### Accessibility
- **Semantic HTML**: Use appropriate elements (article, button, etc.)
- **ARIA Labels**: Add aria-label for icon-only buttons
  ```typescript
  <button aria-label="Agregar a favoritos">
  ```
- **Alt Text**: Always provide alt text for images
- **Loading Optimization**: Use `loading="lazy"` for images

### Utility Functions
- **Centralized Helpers**: Import from `src/lib/utils.ts`
  ```typescript
  import { formatPrice } from './src/lib/utils';
  ```
- **Intl API**: Use for localization (currency, dates)
  ```typescript
  export function formatPrice(price: number, currency: string = 'CLP'): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    }).format(price);
  }
  ```

## Web Scraping Patterns

### Cheerio Usage
- **Selector Strategy**: Use data-testid attributes when available
  ```typescript
  $('article[data-testid^=\"search-components_result-card\"]').each((i, el) => {
    const title = $el.find('[data-testid$=\"-headline\"]').text().trim();
  });
  ```
- **Regex Extraction**: Use regex for parsing numbers from text
  ```typescript
  const bedrooms = parseInt($el.find('[data-testid$=\"-bedrooms\"]').text().match(/\\d+/)?.[0] || '0');
  ```
- **Fallback Values**: Always provide fallback values
  ```typescript
  const imageUrl = $el.find('img').attr('data-src') || $el.find('img').attr('src');
  ```

### Data Transformation
- **Type Inference**: Infer property types from title keywords
  ```typescript
  type: title.toLowerCase().includes('departamento') ? 'apartment' : 
        title.toLowerCase().includes('casa') ? 'house' : 
        title.toLowerCase().includes('bodega') ? 'warehouse' : 'other'
  ```
- **Location Parsing**: Split location strings into components
  ```typescript
  const [city, region, country] = location.split(',').map(s => s.trim());
  ```

### Script Execution
- **CLI Feedback**: Provide clear console output with emojis
- **Process Exit**: Properly exit with status codes
  ```typescript
  scrapeEngelVolkers()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
  ```

## Business Logic Patterns

### Lead Scoring
- **Weighted Scoring**: Assign points based on data completeness
  ```typescript
  function calculateLeadScore(data: { name: string; email: string; phone?: string; message?: string; }): number {
    let score = 0;
    if (data.name) score += 10;
    if (data.email) score += 20;
    if (data.phone) score += 30;
    if (data.message && data.message.length > 20) score += 40;
    return score;
  }
  ```

### Mock Data
- **Realistic Data**: Use real-world examples for seeding
- **Varied Types**: Include different property types and operations
- **External Images**: Use Unsplash or similar for placeholder images

## Environment & Configuration

### Environment Variables
- **Fallback Values**: Provide sensible defaults
  ```typescript
  process.env.REDIS_URL || 'redis://localhost:6379'
  ```
- **Connection Options**: Configure retry strategies and error handling
  ```typescript
  {
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      if (times > 3) return null;
      return Math.min(times * 50, 2000);
    }
  }
  ```

### Error Event Handling
- **Non-Blocking Errors**: Use `console.warn` for non-critical errors
  ```typescript
  redis.on('error', (err) => {
    console.warn('Redis connection error:', err.message);
  });
  ```

## Testing & Development

### Mock Data Strategy
- **Seed Endpoints**: Create dedicated API endpoints for seeding
- **Unique IDs**: Generate unique IDs for each seed run
- **Comprehensive Coverage**: Include all property types and edge cases

### Development Workflow
1. Define Prisma schema
2. Generate Prisma client
3. Create API routes with proper types
4. Implement caching layer
5. Add external integrations
6. Test with seed data
7. Deploy with environment variables
