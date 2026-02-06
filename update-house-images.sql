-- Actualizar imágenes de las 45 casas con URLs de Unsplash variadas
DO $$
DECLARE
  house_record RECORD;
  image_urls TEXT[];
  random_set INTEGER;
BEGIN
  FOR house_record IN 
    SELECT id FROM "Property" WHERE type = 'house' ORDER BY "createdAt" DESC LIMIT 45
  LOOP
    -- Generar número aleatorio entre 1 y 15 para seleccionar set de imágenes
    random_set := floor(random() * 15 + 1)::INTEGER;
    
    -- Asignar diferentes sets de imágenes según el número aleatorio
    CASE random_set
      WHEN 1 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
        ];
      WHEN 2 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
          'https://images.unsplash.com/photo-1600573472550-8090b5e0745e'
        ];
      WHEN 3 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
          'https://images.unsplash.com/photo-1613977257363-707ba9348227',
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811'
        ];
      WHEN 4 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
          'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
          'https://images.unsplash.com/photo-1600210492493-0946911123ea'
        ];
      WHEN 5 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
          'https://images.unsplash.com/photo-1600607687644-c7171b42498b',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'
        ];
      WHEN 6 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d'
        ];
      WHEN 7 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
          'https://images.unsplash.com/photo-1600607687644-afd4c8b8e7c3'
        ];
      WHEN 8 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
          'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68'
        ];
      WHEN 9 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
          'https://images.unsplash.com/photo-1600566752229-250ed79470e6',
          'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099'
        ];
      WHEN 10 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1572120360610-d971b9d7767c',
          'https://images.unsplash.com/photo-1600566753151-384129cf4e3e',
          'https://images.unsplash.com/photo-1600573472550-8090b5e0745e'
        ];
      WHEN 11 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'
        ];
      WHEN 12 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3'
        ];
      WHEN 13 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e',
          'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
          'https://images.unsplash.com/photo-1600210492493-0946911123ea'
        ];
      WHEN 14 THEN
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
          'https://images.unsplash.com/photo-1600607687644-c7171b42498b'
        ];
      ELSE
        image_urls := ARRAY[
          'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
          'https://images.unsplash.com/photo-1600573472550-8090b5e0745e'
        ];
    END CASE;
    
    -- Actualizar la propiedad con las nuevas imágenes
    UPDATE "Property" 
    SET images = image_urls
    WHERE id = house_record.id;
    
  END LOOP;
  
  RAISE NOTICE 'Imágenes actualizadas para 45 casas';
END $$;

-- Verificar actualización
SELECT id, title, array_length(images, 1) as num_images 
FROM "Property" 
WHERE type = 'house' 
ORDER BY "createdAt" DESC 
LIMIT 10;
