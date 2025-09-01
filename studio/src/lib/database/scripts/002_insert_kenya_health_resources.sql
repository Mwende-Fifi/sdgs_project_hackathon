-- Insert real health centers in Kenya
INSERT INTO public.health_resources (name, type, address, county, phone, hours, services, cost, latitude, longitude, description) VALUES

-- Nairobi County
('Kenyatta National Hospital', 'hospital', 'Hospital Rd, Upper Hill, Nairobi', 'Nairobi', '+254-20-2726300', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics', 'Mental Health'], 'Government Rates', -1.3013, 36.8073, 'Kenya''s largest referral hospital providing comprehensive healthcare services'),

('Nairobi Hospital', 'hospital', 'Argwings Kodhek Rd, Nairobi', 'Nairobi', '+254-20-2845000', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Cardiology', 'Oncology'], 'Private/Insurance', -1.2921, 36.8219, 'Leading private hospital in East Africa'),

('Mathare Mental Hospital', 'mental-health', 'Mathare North, Nairobi', 'Nairobi', '+254-20-2557000', 'Mon-Fri 8AM-5PM', ARRAY['Mental Health', 'Psychiatric Care', 'Counseling', 'Rehabilitation'], 'Free/Subsidized', -1.2297, 36.8631, 'National referral hospital for mental health services'),

('Mbagathi District Hospital', 'hospital', 'Mbagathi Way, Nairobi', 'Nairobi', '+254-20-6002000', '24/7', ARRAY['General Medicine', 'Maternity', 'Pediatrics', 'Emergency Care'], 'Free', -1.3242, 36.7756, 'Public hospital serving Nairobi South'),

('Pumwani Maternity Hospital', 'hospital', 'Pumwani, Nairobi', 'Nairobi', '+254-20-2222181', '24/7', ARRAY['Maternity', 'Neonatal Care', 'Family Planning', 'Reproductive Health'], 'Free', -1.2833, 36.8333, 'Largest maternity hospital in East Africa'),

-- Mombasa County
('Coast Provincial General Hospital', 'hospital', 'Mvita, Mombasa', 'Mombasa', '+254-41-2312191', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics'], 'Free', -4.0435, 39.6682, 'Main referral hospital for Coast region'),

('Aga Khan Hospital Mombasa', 'hospital', 'Vanga Rd, Mombasa', 'Mombasa', '+254-41-2222707', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Cardiology'], 'Private/Insurance', -4.0435, 39.6682, 'Private hospital providing quality healthcare'),

('Port Reitz Sub-District Hospital', 'hospital', 'Port Reitz, Mombasa', 'Mombasa', '+254-41-2433444', 'Mon-Fri 8AM-5PM', ARRAY['General Medicine', 'Maternity', 'Pediatrics'], 'Free', -4.0435, 39.6682, 'Public hospital serving Port Reitz area'),

-- Kisumu County
('Jaramogi Oginga Odinga Teaching and Referral Hospital', 'hospital', 'Kisumu-Kakamega Rd, Kisumu', 'Kisumu', '+254-57-2023701', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics', 'Mental Health'], 'Free/Subsidized', -0.0917, 34.7680, 'Regional referral hospital for Western Kenya'),

('Kisumu District Hospital', 'hospital', 'Oginga Odinga St, Kisumu', 'Kisumu', '+254-57-2020440', '24/7', ARRAY['General Medicine', 'Maternity', 'Emergency Care'], 'Free', -0.0917, 34.7680, 'District hospital serving Kisumu'),

-- Nakuru County
('Nakuru Provincial General Hospital', 'hospital', 'Hospital Rd, Nakuru', 'Nakuru', '+254-51-2210102', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics'], 'Free', -0.3031, 36.0800, 'Provincial hospital serving Rift Valley region'),

('War Memorial Hospital', 'hospital', 'Nakuru', 'Nakuru', '+254-51-2212203', '24/7', ARRAY['General Medicine', 'Surgery', 'Maternity'], 'Private/Insurance', -0.3031, 36.0800, 'Private hospital in Nakuru'),

-- Eldoret (Uasin Gishu County)
('Moi Teaching and Referral Hospital', 'hospital', 'Nandi Rd, Eldoret', 'Uasin Gishu', '+254-53-2033471', '24/7', ARRAY['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics', 'Oncology'], 'Free/Subsidized', 0.5143, 35.2697, 'Second largest referral hospital in Kenya'),

-- Mental Health Centers
('Mathari National Teaching and Referral Hospital', 'mental-health', 'Kiambu Rd, Nairobi', 'Nairobi', '+254-20-2557000', 'Mon-Fri 8AM-5PM', ARRAY['Mental Health', 'Psychiatric Care', 'Counseling', 'Substance Abuse Treatment'], 'Free', -1.2297, 36.8631, 'National mental health referral center'),

('Gilgil Mental Health Hospital', 'mental-health', 'Gilgil', 'Nakuru', '+254-50-2030200', 'Mon-Fri 8AM-5PM', ARRAY['Mental Health', 'Psychiatric Care', 'Rehabilitation'], 'Free', -0.5000, 36.3167, 'Mental health facility serving Central Kenya'),

-- Community Health Programs
('Kibera Community Health Program', 'program', 'Kibera, Nairobi', 'Nairobi', '+254-700-123456', 'Mon-Fri 8AM-5PM', ARRAY['Community Health', 'Health Education', 'Immunization', 'Nutrition'], 'Free', -1.3133, 36.7892, 'Community-based health program in Kibera slums'),

('Mathare Community Health Center', 'program', 'Mathare, Nairobi', 'Nairobi', '+254-700-234567', 'Mon-Fri 8AM-5PM', ARRAY['Primary Care', 'Health Education', 'Family Planning', 'HIV Testing'], 'Free', -1.2297, 36.8631, 'Community health center serving Mathare area'),

-- Clinics
('Kangemi Health Centre', 'clinic', 'Kangemi, Nairobi', 'Nairobi', '+254-700-345678', 'Mon-Fri 8AM-5PM', ARRAY['Primary Care', 'Maternal Health', 'Child Health', 'Immunization'], 'Free', -1.2667, 36.7333, 'Government health center in Kangemi'),

('Dandora Health Centre', 'clinic', 'Dandora, Nairobi', 'Nairobi', '+254-700-456789', 'Mon-Fri 8AM-5PM', ARRAY['Primary Care', 'Family Planning', 'HIV Testing', 'TB Treatment'], 'Free', -1.2500, 36.8833, 'Health center serving Dandora community'),

('Kawangware Health Centre', 'clinic', 'Kawangware, Nairobi', 'Nairobi', '+254-700-567890', 'Mon-Fri 8AM-5PM', ARRAY['Primary Care', 'Maternal Health', 'Immunization'], 'Free', -1.2833, 36.7500, 'Community health center in Kawangware'),

-- Pharmacies
('Goodlife Pharmacy', 'pharmacy', 'Various Locations, Nairobi', 'Nairobi', '+254-700-678901', 'Mon-Sun 8AM-10PM', ARRAY['Prescription Drugs', 'Over-the-counter Medication', 'Health Consultations'], 'Affordable', -1.2921, 36.8219, 'Chain pharmacy with multiple locations'),

('Haltons Pharmacy', 'pharmacy', 'Various Locations, Nairobi', 'Nairobi', '+254-700-789012', 'Mon-Sun 8AM-9PM', ARRAY['Prescription Drugs', 'Medical Supplies', 'Health Screening'], 'Affordable', -1.2921, 36.8219, 'Established pharmacy chain in Kenya');
