import { formatPrice } from '../lib/utils';

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  city: string;
  region: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
}

export default function PropertyCard({ 
  id, 
  title, 
  price, 
  currency, 
  city, 
  region, 
  bedrooms, 
  bathrooms, 
  area, 
  images 
}: PropertyCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl">
      <a href={`/propiedades/${id}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={images[0] || '/placeholder.jpg'}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-1">
            {city}, {region}, Chile
          </p>
          
          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h2>
          
          <p className="text-2xl font-bold text-blue-600 mb-3">
            {formatPrice(price, currency)}
          </p>
          
          <ul className="flex flex-wrap gap-3 text-sm text-gray-600">
            {bedrooms !== null && bedrooms > 0 && (
              <li className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {bedrooms} Dorm.
              </li>
            )}
            
            {bathrooms !== null && bathrooms > 0 && (
              <li className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                {bathrooms} Baños
              </li>
            )}
            
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {area} m²
            </li>
          </ul>
        </div>
      </a>
      
      <button 
        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
        aria-label="Agregar a favoritos"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </article>
  );
}
