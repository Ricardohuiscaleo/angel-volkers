import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BASE_URL = 'https://www.engelvoelkers.com';
const SEARCH_URL = `${BASE_URL}/es-cl/buscar/?q=&startIndex=0&businessArea=residential&sortBy=relevance&pageSize=100`;

async function scrapeEngelVolkers() {
  console.log('🔍 Scrapeando Engel & Völkers Chile...');
  
  try {
    const response = await fetch(SEARCH_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const properties = [];
    
    $('article[data-testid^="search-components_result-card"]').each((i, el) => {
      const $el = $(el);
      
      const title = $el.find('[data-testid$="-headline"]').text().trim();
      const location = $el.find('[data-testid$="-location"]').text().trim();
      const priceText = $el.find('[data-testid$="-price"]').text().trim();
      const imageUrl = $el.find('img').attr('data-src') || $el.find('img').attr('src');
      
      const bedrooms = parseInt($el.find('[data-testid$="-bedrooms"]').text().match(/\d+/)?.[0] || '0');
      const bathrooms = parseInt($el.find('[data-testid$="-bathrooms"]').text().match(/\d+/)?.[0] || '0');
      const areaText = $el.find('[data-testid$="-livingArea"]').text();
      const area = parseInt(areaText.match(/\d+/)?.[0] || '0');
      
      const price = parseInt(priceText.replace(/[^\d]/g, ''));
      const currency = priceText.includes('CLP') ? 'CLP' : priceText.includes('USD') ? 'USD' : 'CLP';
      
      const [city, region, country] = location.split(',').map(s => s.trim());
      
      if (title && price) {
        properties.push({
          title,
          description: `${title} en ${location}`,
          price,
          currency,
          type: title.toLowerCase().includes('departamento') ? 'apartment' : 
                title.toLowerCase().includes('casa') ? 'house' : 
                title.toLowerCase().includes('bodega') ? 'warehouse' : 'other',
          operation: 'sale',
          bedrooms: bedrooms || null,
          bathrooms: bathrooms || null,
          area,
          address: location,
          city: city || 'Santiago',
          region: region || 'Región Metropolitana',
          country: country || 'Chile',
          images: imageUrl ? [imageUrl] : [],
          features: [],
          status: 'available'
        });
      }
    });
    
    console.log(`✅ Encontradas ${properties.length} propiedades`);
    
    for (const property of properties) {
      await prisma.property.create({
        data: {
          id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...property
        }
      });
    }
    
    console.log(`💾 ${properties.length} propiedades guardadas`);
    return properties;
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

scrapeEngelVolkers()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
