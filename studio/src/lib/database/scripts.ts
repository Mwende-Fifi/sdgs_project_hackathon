import { createClient } from "@/lib/supabase/client"

export async function executeScript(scriptName: "createTable" | "insertData"): Promise<void> {
  const supabase = createClient()

  if (scriptName === "createTable") {
    const { error } = await supabase.rpc("exec_sql", {
      sql_query: `
        CREATE TABLE IF NOT EXISTS public.health_resources (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT NOT NULL,
          address TEXT NOT NULL,
          county TEXT NOT NULL,
          phone TEXT,
          email TEXT,
          website TEXT,
          hours TEXT,
          services TEXT[] NOT NULL DEFAULT '{}',
          cost TEXT NOT NULL,
          latitude DECIMAL(10, 8),
          longitude DECIMAL(11, 8),
          description TEXT,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_health_resources_county ON public.health_resources(county);
        CREATE INDEX IF NOT EXISTS idx_health_resources_type ON public.health_resources(type);
        CREATE INDEX IF NOT EXISTS idx_health_resources_active ON public.health_resources(is_active);
      `,
    })

    if (error) {
      throw new Error(`Failed to create table: ${error.message}`)
    }
  } else if (scriptName === "insertData") {
    const { error } = await supabase.rpc("exec_sql", {
      sql_query: `
        INSERT INTO public.health_resources (name, type, address, county, phone, hours, services, cost, latitude, longitude, description) VALUES
        ('Kenyatta National Hospital', 'hospital', 'Hospital Rd, Upper Hill', 'Nairobi', '+254-20-2726300', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics', 'Oncology'], 'Free for public patients, fees for private', -1.3018, 36.8073, 'Kenya''s largest referral hospital providing comprehensive medical services'),
        ('Nairobi Hospital', 'hospital', 'Argwings Kodhek Rd', 'Nairobi', '+254-20-2845000', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Cardiology'], 'Private hospital with insurance accepted', -1.2921, 36.8219, 'Leading private hospital in East Africa'),
        ('Mathare Mental Hospital', 'mental-health', 'Mathare North', 'Nairobi', '+254-20-2557000', 'Mon-Fri 8AM-5PM', ARRAY['Mental Health', 'Counseling', 'Psychiatric Care'], 'Free mental health services', -1.2297, 36.8735, 'Specialized mental health facility serving Kenya'),
        ('Coast Provincial General Hospital', 'hospital', 'Mama Ngina Dr', 'Mombasa', '+254-41-2312191', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics'], 'Free for public patients', -4.0435, 39.6682, 'Major referral hospital for Coast region'),
        ('Jaramogi Oginga Odinga Teaching Hospital', 'hospital', 'Kakamega Rd', 'Kisumu', '+254-57-2025555', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Teaching'], 'Free for public patients', -0.0917, 34.7680, 'Regional referral and teaching hospital'),
        ('Nakuru Provincial General Hospital', 'hospital', 'Hospital Rd', 'Nakuru', '+254-51-2210102', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics'], 'Free for public patients', -0.3031, 36.0800, 'Main referral hospital for Rift Valley region'),
        ('Kibera Community Health Center', 'clinic', 'Kibera Slums', 'Nairobi', '+254-20-2387654', 'Mon-Fri 8AM-5PM', ARRAY['Primary Care', 'Immunization', 'Family Planning'], 'Free community health services', -1.3133, 36.7892, 'Community health center serving Kibera residents'),
        ('Pumwani Maternity Hospital', 'hospital', 'Pumwani', 'Nairobi', '+254-20-2221426', '24/7', ARRAY['Maternity', 'Newborn Care', 'Family Planning'], 'Free maternity services', -1.2921, 36.8344, 'Specialized maternity hospital'),
        ('Moi Teaching and Referral Hospital', 'hospital', 'Nandi Rd', 'Uasin Gishu', '+254-53-2033471', '24/7', ARRAY['Emergency Care', 'Surgery', 'Teaching', 'Research'], 'Free for public patients', 0.5143, 35.2697, 'Major teaching and referral hospital'),
        ('Gertrudes Children''s Hospital', 'hospital', 'Muthaiga Rd', 'Nairobi', '+254-20-2763474', '24/7', ARRAY['Pediatrics', 'Emergency Care', 'Surgery'], 'Private pediatric hospital', -1.2630, 36.8063, 'Specialized children''s hospital'),
        ('Mama Lucy Kibaki Hospital', 'hospital', 'Kangundo Rd', 'Nairobi', '+254-20-2863000', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity'], 'Free for public patients', -1.2921, 36.9063, 'Level 5 hospital serving Eastern Nairobi'),
        ('Kiambu District Hospital', 'hospital', 'Hospital Rd', 'Kiambu', '+254-66-2022004', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity'], 'Free for public patients', -1.1748, 36.8356, 'District hospital serving Kiambu County'),
        ('Machakos Level 5 Hospital', 'hospital', 'Machakos Town', 'Machakos', '+254-44-2021273', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity'], 'Free for public patients', -1.5177, 37.2634, 'Level 5 hospital for Machakos County'),
        ('Kajiado District Hospital', 'hospital', 'Kajiado Town', 'Kajiado', '+254-45-2022156', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity'], 'Free for public patients', -1.8524, 36.7766, 'Main hospital serving Kajiado County'),
        ('BasicNeeds-BasicRights Kenya', 'mental-health', 'Lavington', 'Nairobi', '+254-20-2560498', 'Mon-Fri 8AM-5PM', ARRAY['Mental Health', 'Community Support', 'Advocacy'], 'Free mental health support', -1.2667, 36.7667, 'Mental health and development organization'),
        ('Kenya Red Cross Society', 'program', 'South C', 'Nairobi', '+254-20-6003593', 'Mon-Fri 8AM-5PM', ARRAY['Emergency Response', 'Health Programs', 'Blood Bank'], 'Free emergency and health services', -1.3167, 36.8167, 'Humanitarian organization providing health services'),
        ('Amref Health Africa', 'program', 'Langata Rd', 'Nairobi', '+254-20-6993000', 'Mon-Fri 8AM-5PM', ARRAY['Community Health', 'Training', 'Research'], 'Community health programs', -1.3667, 36.7667, 'Leading health development organization in Africa'),
        ('Marie Stopes Kenya', 'clinic', 'Various Locations', 'Nairobi', '+254-20-2717077', 'Mon-Sat 8AM-5PM', ARRAY['Family Planning', 'Reproductive Health', 'Safe Motherhood'], 'Subsidized reproductive health services', -1.2921, 36.8219, 'Reproductive health services provider'),
        ('Goodlife Pharmacy', 'pharmacy', 'Multiple Locations', 'Nairobi', '+254-709-929000', 'Mon-Sun 8AM-10PM', ARRAY['Prescription Drugs', 'Health Consultations', 'Medical Supplies'], 'Affordable pharmacy chain', -1.2921, 36.8219, 'Leading pharmacy chain in Kenya'),
        ('Haltons Pharmacy', 'pharmacy', 'Multiple Locations', 'Mombasa', '+254-41-2229563', 'Mon-Sun 8AM-9PM', ARRAY['Prescription Drugs', 'Health Products', 'Consultations'], 'Affordable pharmacy services', -4.0435, 39.6682, 'Established pharmacy chain on the coast')
        ON CONFLICT (name, county) DO NOTHING;
      `,
    })

    if (error) {
      throw new Error(`Failed to insert data: ${error.message}`)
    }
  }
}
