-- ==============================================================================
-- KOPI RUANG KITA - DATABASE SEED DATA
-- Default Users:
--   1. admin / admin123 (Role: admin)
--   2. owner / admin123 (Role: owner)
--   3. staff / admin123 (Role: staff)
-- ==============================================================================

-- 1. SEED USERS
INSERT INTO users (username, password, full_name, role)
VALUES 
    ('admin', '$2a$10$n5clObv7rmfpGNDkzHwHzOnfHZbiq/pgUB6Z6FjGA6rZwAMse70fu', 'Administrator Kopi Ruang Kita', 'admin'),
    ('owner', '$2a$10$n5clObv7rmfpGNDkzHwHzOnfHZbiq/pgUB6Z6FjGA6rZwAMse70fu', 'Owner Kopi Ruang Kita', 'owner'),
    ('staff', '$2a$10$n5clObv7rmfpGNDkzHwHzOnfHZbiq/pgUB6Z6FjGA6rZwAMse70fu', 'Barista & Kasir', 'staff')
ON CONFLICT (username) DO NOTHING;

-- 2. SEED MENUS
INSERT INTO menus (id, name, category, price, img, description, is_available)
VALUES
    (1, 'Kopi Susu Gula Aren', 'Coffee', 18000, 'https://i.pinimg.com/736x/f0/49/5b/f0495b2d4ee979ac4068f4c61a57397b.jpg', 'Perpaduan espresso, susu creamy, dan manis legit gula aren.', TRUE),
    (2, 'Americano', 'Coffee', 15000, 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', 'Kopi hitam dengan rasa bold dan aroma espresso yang khas.', TRUE),
    (3, 'Cafe Latte', 'Coffee', 22000, 'https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', 'Espresso lembut berpadu dengan susu steamed yang creamy.', TRUE),
    (4, 'Caramel Macchiato', 'Coffee', 25000, 'https://i.pinimg.com/736x/c3/0e/0e/c30e0ecc2b17ff4fa571f5963c70519b.jpg', 'Minuman kopi susu dengan sentuhan manis saus karamel.', TRUE),
    (5, 'Matcha Latte', 'Non-Coffee', 22000, 'https://plus.unsplash.com/premium_photo-1695151556198-6b21eae6215d?q=80&w=783&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', 'Matcha dengan rasa khas yang berpadu dengan susu lembut.', TRUE),
    (6, 'Taro Latte', 'Non-Coffee', 20000, 'https://i.pinimg.com/736x/ac/a2/0d/aca20d8451b60b70937f98d1c27e4e5f.jpg', 'Minuman taro creamy dengan rasa manis yang menenangkan.', TRUE),
    (7, 'Red Velvet Latte', 'Non-Coffee', 22000, 'https://i.pinimg.com/736x/1c/b0/45/1cb0450d33404c6383a1d44003d42e77.jpg', 'Latte red velvet lembut dengan cita rasa manis yang unik.', TRUE),
    (8, 'Lychee Tea', 'Non-Coffee', 18000, 'https://i.pinimg.com/736x/2c/58/8b/2c588b17c03c59becba4cc8baf7d0ba9.jpg', 'Teh segar dengan aroma dan rasa manis buah leci.', TRUE),
    (9, 'French Fries', 'Snack', 15000, 'https://plus.unsplash.com/premium_photo-1683121324474-83460636b0ed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', 'Kentang goreng renyah yang cocok menemani waktu santai.', TRUE),
    (10, 'Roti Bakar Coklat', 'Snack', 16000, 'https://i.pinimg.com/1200x/35/57/e2/3557e272e25b7180fd1e20ba4da79c8e.jpg', 'Roti bakar hangat dengan isian cokelat manis yang lumer.', TRUE),
    (11, 'Pisang Goreng Keju', 'Snack', 15000, 'https://i.pinimg.com/1200x/2b/59/b6/2b59b672b0e83a51ea27e78e6cf2649b.jpg', 'Pisang goreng renyah dengan taburan keju gurih.', TRUE),
    (12, 'Dimsum Ayam', 'Snack', 18000, 'https://images.unsplash.com/photo-1604632910793-c0601f361b34?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D', 'Dimsum ayam lembut dengan isian gurih di setiap gigitan.', TRUE)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    img = EXCLUDED.img,
    description = EXCLUDED.description;

-- Menyelaraskan sequence id menu agar auto increment berlanjut dari id tertinggi
SELECT setval('menus_id_seq', (SELECT MAX(id) FROM menus));

-- 3. SEED PROMOS
INSERT INTO promos (id, title, label, description, price_normal, price_discounted, image_url, is_active)
VALUES
    (1, 'Teman Santai Sore', 'PAKET NYORE', 'Nikmati Kopi Susu Gula Aren dan Roti Bakar Coklat dalam satu paket hemat.', 'Rp34.000', 'Rp29.000', '/gambarr 1.png', TRUE),
    (2, 'Beli 1, Gratis 1', 'HAPPY HOUR', 'Pesan satu minuman pilihan dan dapatkan satu minuman gratis selama Happy Hour.', NULL, '13.00–15.00', '/gambarr 2.png', TRUE),
    (3, 'Senin Lebih Hemat', 'MONDAY DEAL', 'Nikmati menu favoritmu dan dapatkan diskon 10%.', NULL, 'DISKON 10%', NULL, TRUE)
ON CONFLICT (id) DO NOTHING;

SELECT setval('promos_id_seq', (SELECT MAX(id) FROM promos));

-- 4. SEED SAMPLE CONTACT
INSERT INTO contacts (nama, no_hp, pesan, status)
VALUES
    ('Rizky Ramadhan', '081298765432', 'Halo Kopi Ruang Kita! Apakah tersedia ruangan smoking indoor untuk meeting 6 orang?', 'UNREAD')
ON CONFLICT DO NOTHING;
