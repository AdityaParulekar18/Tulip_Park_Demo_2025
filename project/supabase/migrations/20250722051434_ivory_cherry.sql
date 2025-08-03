-- Create pooja_collections table
CREATE TABLE IF NOT EXISTS pooja_collections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  amount integer NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  flat_number text NOT NULL,
  transaction_id text NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('online', 'cash')),
  year integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pooja_collections ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations on pooja_collections" ON pooja_collections FOR ALL USING (true);

-- Insert sample flat data (A Wing)
INSERT INTO flats (flat_number, wing, floor, type, area, status, owner_name, owner_phone, owner_email, rent_price, sale_price, tenant_name, tenant_phone, tenant_email, contract_end) VALUES
('A101', 'A', 1, '2BHK', '850 sq ft', 'owner-occupied', 'Rajesh Sharma', '+91 98765 43210', 'rajesh.sharma@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('A102', 'A', 1, '2BHK', '850 sq ft', 'rented', 'Priya Patel', '+91 98765 43211', 'priya.patel@email.com', 35000, NULL, 'Amit Tenant', '+91 98765 43298', 'amit.tenant@email.com', '2024-12-31'),
('A103', 'A', 1, '2BHK', '850 sq ft', 'for-rent', 'Mumbai Properties Ltd', '+91 98765 43212', 'info@mumbaiproperties.com', 32000, NULL, NULL, NULL, NULL, NULL),
('A104', 'A', 1, '2BHK', '850 sq ft', 'for-rent', 'Amit Kumar', '+91 98765 43213', 'amit.kumar@email.com', 32000, NULL, NULL, NULL, NULL, NULL),
('A201', 'A', 2, '2BHK', '850 sq ft', 'owner-occupied', 'Sneha Gupta', '+91 98765 43214', 'sneha.gupta@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('A202', 'A', 2, '2BHK', '850 sq ft', 'rented', 'Vikram Singh', '+91 98765 43215', 'vikram.singh@email.com', 38000, NULL, 'Priya Tenant', '+91 98765 43297', 'priya.tenant@email.com', '2024-08-15'),
('A203', 'A', 2, '2BHK', '850 sq ft', 'rented', 'Meera Joshi', '+91 98765 43216', 'meera.joshi@email.com', 36000, NULL, 'Rohit Tenant', '+91 98765 43296', 'rohit.tenant@email.com', '2025-03-20'),
('A204', 'A', 2, '2BHK', '850 sq ft', 'for-rent', 'Ravi Agarwal', '+91 98765 43217', 'ravi.agarwal@email.com', 34000, NULL, NULL, NULL, NULL, NULL),
('A301', 'A', 3, '3BHK', '1200 sq ft', 'owner-occupied', 'Sunita Shah', '+91 98765 43218', 'sunita.shah@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('A302', 'A', 3, '3BHK', '1200 sq ft', 'rented', 'Deepak Mehta', '+91 98765 43219', 'deepak.mehta@email.com', 45000, NULL, 'Sonia Tenant', '+91 98765 43295', 'sonia.tenant@email.com', '2024-11-30'),
('A303', 'A', 3, '3BHK', '1200 sq ft', 'for-rent', 'Kavita Reddy', '+91 98765 43220', 'kavita.reddy@email.com', 42000, NULL, NULL, NULL, NULL, NULL),
('A304', 'A', 3, '3BHK', '1200 sq ft', 'owner-occupied', 'Rohit Malhotra', '+91 98765 43221', 'rohit.malhotra@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('A401', 'A', 4, '3BHK', '1200 sq ft', 'rented', 'Anita Verma', '+91 98765 43222', 'anita.verma@email.com', 47000, NULL, 'Meera Tenant', '+91 98765 43294', 'meera.tenant@email.com', '2025-01-15'),
('A402', 'A', 4, '3BHK', '1200 sq ft', 'owner-occupied', 'Suresh Gupta', '+91 98765 43223', 'suresh.gupta@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('A403', 'A', 4, '3BHK', '1200 sq ft', 'for-rent', 'Pooja Sharma', '+91 98765 43224', 'pooja.sharma@email.com', 44000, NULL, NULL, NULL, NULL, NULL),
('A404', 'A', 4, '3BHK', '1200 sq ft', 'rented', 'Manish Agarwal', '+91 98765 43225', 'manish.agarwal@email.com', 46000, NULL, 'Suresh Tenant', '+91 98765 43293', 'suresh.tenant@email.com', '2024-09-30'),
('A501', 'A', 5, '3BHK', '1200 sq ft', 'owner-occupied', 'Rekha Patel', '+91 98765 43226', 'rekha.patel@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('A502', 'A', 5, '3BHK', '1200 sq ft', 'rented', 'Ashok Kumar', '+91 98765 43227', 'ashok.kumar@email.com', 48000, NULL, 'Vinod Tenant', '+91 98765 43292', 'vinod.tenant@email.com', '2024-12-15'),
('A503', 'A', 5, '3BHK', '1200 sq ft', 'for-rent', 'Nisha Singh', '+91 98765 43228', 'nisha.singh@email.com', 45000, NULL, NULL, NULL, NULL, NULL),
('A504', 'A', 5, '3BHK', '1200 sq ft', 'owner-occupied', 'Ramesh Joshi', '+91 98765 43229', 'ramesh.joshi@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('A601', 'A', 6, '3BHK', '1200 sq ft', 'rented', 'Sanjay Mehta', '+91 98765 43230', 'sanjay.mehta@email.com', 50000, NULL, 'Rajesh Tenant', '+91 98765 43291', 'rajesh.tenant@email.com', '2025-02-28'),
('A602', 'A', 6, '3BHK', '1200 sq ft', 'owner-occupied', 'Geeta Sharma', '+91 98765 43231', 'geeta.sharma@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('A603', 'A', 6, '3BHK', '1200 sq ft', 'for-rent', 'Vinod Gupta', '+91 98765 43232', 'vinod.gupta@email.com', 47000, NULL, NULL, NULL, NULL, NULL),
('A604', 'A', 6, '3BHK', '1200 sq ft', 'rented', 'Lakshmi Reddy', '+91 98765 43233', 'lakshmi.reddy@email.com', 49000, NULL, 'Priya Tenant', '+91 98765 43290', 'priya.tenant@email.com', '2024-10-31'),
('A701', 'A', 7, '3BHK', '1200 sq ft', 'for-sale', 'Kiran Patel', '+91 98765 43234', 'kiran.patel@email.com', NULL, 12500000, NULL, NULL, NULL, NULL),
('A702', 'A', 7, '3BHK', '1200 sq ft', 'rented', 'Sunil Kumar', '+91 98765 43235', 'sunil.kumar@email.com', 52000, NULL, 'Kavita Tenant', '+91 98765 43289', 'kavita.tenant@email.com', '2025-04-30'),
('A703', 'A', 7, '3BHK', '1200 sq ft', 'for-rent', 'Madhuri Singh', '+91 98765 43236', 'madhuri.singh@email.com', 48000, NULL, NULL, NULL, NULL, NULL),
('A704', 'A', 7, '3BHK', '1200 sq ft', 'owner-occupied', 'Arun Joshi', '+91 98765 43237', 'arun.joshi@email.com', NULL, NULL, NULL, NULL, NULL, NULL);

-- Insert B Wing data
INSERT INTO flats (flat_number, wing, floor, type, area, status, owner_name, owner_phone, owner_email, rent_price, sale_price, tenant_name, tenant_phone, tenant_email, contract_end) VALUES
('B101', 'B', 1, '2BHK', '900 sq ft', 'owner-occupied', 'Ritu Sharma', '+91 98765 43238', 'ritu.sharma@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B102', 'B', 1, '2BHK', '900 sq ft', 'rented', 'Ajay Patel', '+91 98765 43239', 'ajay.patel@email.com', 40000, NULL, 'Priya Sharma', '+91 98765 43298', 'priya.sharma@email.com', '2024-11-30'),
('B103', 'B', 1, '2BHK', '900 sq ft', 'for-sale', 'Seema Gupta', '+91 98765 43240', 'seema.gupta@email.com', NULL, 8500000, NULL, NULL, NULL, NULL),
('B104', 'B', 1, '2BHK', '900 sq ft', 'rented', 'Rahul Singh', '+91 98765 43241', 'rahul.singh@email.com', 39000, NULL, 'Amit Sharma', '+91 98765 43299', 'amit.sharma@email.com', '2025-01-15'),
('B105', 'B', 1, '2BHK', '900 sq ft', 'owner-occupied', 'Priyanka Mehta', '+91 98765 43242', 'priyanka.mehta@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B106', 'B', 1, '2BHK', '900 sq ft', 'for-rent', 'Vishal Kumar', '+91 98765 43243', 'vishal.kumar@email.com', 37000, NULL, NULL, NULL, NULL, NULL),
('B201', 'B', 2, '2BHK', '900 sq ft', 'owner-occupied', 'Neha Agarwal', '+91 98765 43244', 'neha.agarwal@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B202', 'B', 2, '2BHK', '900 sq ft', 'rented', 'Karan Malhotra', '+91 98765 43245', 'karan.malhotra@email.com', 41000, NULL, 'Sonia Verma', '+91 98765 43297', 'sonia.verma@email.com', '2024-12-31'),
('B203', 'B', 2, '2BHK', '900 sq ft', 'for-rent', 'Deepika Shah', '+91 98765 43246', 'deepika.shah@email.com', 38000, NULL, NULL, NULL, NULL, NULL),
('B204', 'B', 2, '2BHK', '900 sq ft', 'owner-occupied', 'Arjun Reddy', '+91 98765 43247', 'arjun.reddy@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B205', 'B', 2, '2BHK', '900 sq ft', 'rented', 'Kavya Joshi', '+91 98765 43248', 'kavya.joshi@email.com', 40500, NULL, 'Rohit Kumar', '+91 98765 43296', 'rohit.kumar@email.com', '2025-03-15'),
('B206', 'B', 2, '2BHK', '900 sq ft', 'for-sale', 'Manoj Singh', '+91 98765 43249', 'manoj.singh@email.com', NULL, 8800000, NULL, NULL, NULL, NULL),
('B301', 'B', 3, '2BHK', '900 sq ft', 'owner-occupied', 'Anita Gupta', '+91 98765 43250', 'anita.gupta@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B302', 'B', 3, '2BHK', '900 sq ft', 'rented', 'Vikash Sharma', '+91 98765 43251', 'vikash.sharma@email.com', 42000, NULL, 'Meera Patel', '+91 98765 43295', 'meera.patel@email.com', '2024-10-30'),
('B303', 'B', 3, '2BHK', '900 sq ft', 'for-rent', 'Sunita Mehta', '+91 98765 43252', 'sunita.mehta@email.com', 39000, NULL, NULL, NULL, NULL, NULL),
('B304', 'B', 3, '2BHK', '900 sq ft', 'owner-occupied', 'Rajesh Kumar', '+91 98765 43253', 'rajesh.kumar@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B305', 'B', 3, '2BHK', '900 sq ft', 'rented', 'Pooja Agarwal', '+91 98765 43254', 'pooja.agarwal@email.com', 41500, NULL, 'Suresh Reddy', '+91 98765 43294', 'suresh.reddy@email.com', '2025-02-28'),
('B306', 'B', 3, '2BHK', '900 sq ft', 'for-sale', 'Amit Joshi', '+91 98765 43255', 'amit.joshi@email.com', NULL, 9000000, NULL, NULL, NULL, NULL),
('B401', 'B', 4, '2BHK', '900 sq ft', 'owner-occupied', 'Rekha Singh', '+91 98765 43256', 'rekha.singh@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B402', 'B', 4, '2BHK', '900 sq ft', 'rented', 'Sanjay Patel', '+91 98765 43257', 'sanjay.patel@email.com', 43000, NULL, 'Nisha Sharma', '+91 98765 43293', 'nisha.sharma@email.com', '2024-11-15'),
('B403', 'B', 4, '2BHK', '900 sq ft', 'for-rent', 'Geeta Malhotra', '+91 98765 43258', 'geeta.malhotra@email.com', 40000, NULL, NULL, NULL, NULL, NULL),
('B404', 'B', 4, '2BHK', '900 sq ft', 'owner-occupied', 'Ramesh Gupta', '+91 98765 43259', 'ramesh.gupta@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B405', 'B', 4, '2BHK', '900 sq ft', 'rented', 'Lakshmi Reddy', '+91 98765 43260', 'lakshmi.reddy@email.com', 42500, NULL, 'Vinod Kumar', '+91 98765 43292', 'vinod.kumar@email.com', '2025-01-31'),
('B406', 'B', 4, '2BHK', '900 sq ft', 'for-sale', 'Ashok Sharma', '+91 98765 43261', 'ashok.sharma@email.com', NULL, 9200000, NULL, NULL, NULL, NULL),
('B501', 'B', 5, '2BHK', '900 sq ft', 'owner-occupied', 'Kiran Joshi', '+91 98765 43262', 'kiran.joshi@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B502', 'B', 5, '2BHK', '900 sq ft', 'rented', 'Sunil Agarwal', '+91 98765 43263', 'sunil.agarwal@email.com', 44000, NULL, 'Priya Singh', '+91 98765 43291', 'priya.singh@email.com', '2024-12-15'),
('B503', 'B', 5, '2BHK', '900 sq ft', 'for-rent', 'Madhuri Patel', '+91 98765 43264', 'madhuri.patel@email.com', 41000, NULL, NULL, NULL, NULL, NULL),
('B504', 'B', 5, '2BHK', '900 sq ft', 'owner-occupied', 'Arun Mehta', '+91 98765 43265', 'arun.mehta@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B505', 'B', 5, '2BHK', '900 sq ft', 'rented', 'Seema Reddy', '+91 98765 43266', 'seema.reddy@email.com', 43500, NULL, 'Rajesh Gupta', '+91 98765 43290', 'rajesh.gupta@email.com', '2025-04-30'),
('B506', 'B', 5, '2BHK', '900 sq ft', 'for-sale', 'Manish Kumar', '+91 98765 43267', 'manish.kumar@email.com', NULL, 9500000, NULL, NULL, NULL, NULL),
('B601', 'B', 6, '2BHK', '900 sq ft', 'owner-occupied', 'Nisha Agarwal', '+91 98765 43268', 'nisha.agarwal@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B602', 'B', 6, '2BHK', '900 sq ft', 'rented', 'Rohit Sharma', '+91 98765 43269', 'rohit.sharma@email.com', 45000, NULL, 'Kavita Joshi', '+91 98765 43289', 'kavita.joshi@email.com', '2024-09-30'),
('B603', 'B', 6, '2BHK', '900 sq ft', 'for-rent', 'Deepak Singh', '+91 98765 43270', 'deepak.singh@email.com', 42000, NULL, NULL, NULL, NULL, NULL),
('B604', 'B', 6, '2BHK', '900 sq ft', 'owner-occupied', 'Sunita Patel', '+91 98765 43271', 'sunita.patel@email.com', NULL, NULL, NULL, NULL, NULL, NULL),
('B605', 'B', 6, '2BHK', '900 sq ft', 'rented', 'Vikram Reddy', '+91 98765 43272', 'vikram.reddy@email.com', 44500, NULL, 'Anita Kumar', '+91 98765 43288', 'anita.kumar@email.com', '2025-05-31'),
('B606', 'B', 6, '2BHK', '900 sq ft', 'for-sale', 'Ravi Malhotra', '+91 98765 43273', 'ravi.malhotra@email.com', NULL, 9800000, NULL, NULL, NULL, NULL);