INSERT INTO storage.buckets (id, name, public)
VALUES ('event-banners', 'event-banners', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'event-banners');

CREATE POLICY "Authenticated Uploads Only" 
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'event-banners');