const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "The latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features 48MP main camera, 3x optical zoom, and USB-C connectivity.",
    price: 999.99,
    compareAtPrice: 1099.99,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    ],
    category: "Electronics",
    brand: "Apple",
    sku: "IPH15PRO-001",
    stock: 50,
    weight: 187,
    dimensions: { length: 146.7, width: 71.5, height: 8.25 },
    tags: ["smartphone", "iphone", "apple", "5g", "camera"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "MacBook Air M2",
    description: "Ultra-thin laptop with M2 chip, 13.6-inch Liquid Retina display, and up to 18 hours of battery life. Perfect for productivity and creative work.",
    price: 1199.99,
    compareAtPrice: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
    ],
    category: "Electronics",
    brand: "Apple",
    sku: "MBA-M2-001",
    stock: 30,
    weight: 1240,
    dimensions: { length: 304.1, width: 215, height: 11.3 },
    tags: ["laptop", "macbook", "apple", "m2", "ultrabook"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise canceling wireless headphones with 30-hour battery life, exceptional sound quality, and comfortable design for all-day wear.",
    price: 399.99,
    compareAtPrice: 449.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    ],
    category: "Electronics",
    brand: "Sony",
    sku: "SONY-WH1000XM5-001",
    stock: 75,
    weight: 250,
    dimensions: { length: 167, width: 248, height: 72 },
    tags: ["headphones", "wireless", "noise-canceling", "bluetooth", "audio"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max 270 unit providing lightweight, all-day comfort. Perfect for running, training, or casual wear.",
    price: 129.99,
    compareAtPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    ],
    category: "Clothing",
    brand: "Nike",
    sku: "NIKE-AM270-001",
    stock: 100,
    weight: 300,
    dimensions: { length: 30, width: 12, height: 8 },
    tags: ["shoes", "running", "sneakers", "athletic", "comfortable"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight-leg jeans with button fly and original fit. Made from premium denim for durability and timeless style.",
    price: 89.99,
    compareAtPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
    ],
    category: "Clothing",
    brand: "Levi's",
    sku: "LEVIS-501-001",
    stock: 200,
    weight: 400,
    dimensions: { length: 32, width: 12, height: 2 },
    tags: ["jeans", "denim", "casual", "classic", "straight-leg"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "The Great Gatsby",
    description: "F. Scott Fitzgerald's masterpiece about the Jazz Age and the American Dream. A timeless classic of American literature.",
    price: 12.99,
    compareAtPrice: 15.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    ],
    category: "Books",
    brand: "Scribner",
    sku: "BOOK-GATSBY-001",
    stock: 150,
    weight: 250,
    dimensions: { length: 20, width: 13, height: 2 },
    tags: ["fiction", "classic", "literature", "jazz-age", "american"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "7-in-1 electric pressure cooker that replaces 7 kitchen appliances. Features include pressure cooking, slow cooking, rice cooking, and more.",
    price: 89.99,
    compareAtPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
    ],
    category: "Home & Garden",
    brand: "Instant Pot",
    sku: "INSTANT-DUO-001",
    stock: 60,
    weight: 3000,
    dimensions: { length: 30, width: 30, height: 30 },
    tags: ["kitchen", "pressure-cooker", "slow-cooker", "electric", "cooking"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat made from eco-friendly TPE material. Perfect thickness for comfort and stability during yoga practice.",
    price: 49.99,
    compareAtPrice: 59.99,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"
    ],
    category: "Sports",
    brand: "Manduka",
    sku: "MANDUKA-MAT-001",
    stock: 80,
    weight: 2000,
    dimensions: { length: 180, width: 60, height: 5 },
    tags: ["yoga", "fitness", "exercise", "non-slip", "eco-friendly"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "L'Oreal Paris Skincare Set",
    description: "Complete skincare routine including cleanser, toner, and moisturizer. Formulated for all skin types with gentle, effective ingredients.",
    price: 34.99,
    compareAtPrice: 44.99,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500"
    ],
    category: "Beauty",
    brand: "L'Oreal",
    sku: "LOREAL-SKIN-001",
    stock: 120,
    weight: 500,
    dimensions: { length: 15, width: 10, height: 8 },
    tags: ["skincare", "beauty", "cleanser", "moisturizer", "toner"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "LEGO Star Wars Millennium Falcon",
    description: "Iconic Star Wars spaceship in LEGO form. Features detailed interior, movable parts, and includes minifigures. Perfect for collectors and fans.",
    price: 159.99,
    compareAtPrice: 179.99,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500"
    ],
    category: "Toys",
    brand: "LEGO",
    sku: "LEGO-MFALCON-001",
    stock: 25,
    weight: 1500,
    dimensions: { length: 50, width: 40, height: 15 },
    tags: ["lego", "star-wars", "building", "collector", "spaceship"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "Samsung 65\" QLED 4K TV",
    description: "Stunning 4K QLED display with Quantum HDR, Smart TV features, and Alexa built-in. Perfect for home entertainment and gaming.",
    price: 1299.99,
    compareAtPrice: 1499.99,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500"
    ],
    category: "Electronics",
    brand: "Samsung",
    sku: "SAMSUNG-65QLED-001",
    stock: 15,
    weight: 25000,
    dimensions: { length: 145, width: 83, height: 5 },
    tags: ["tv", "4k", "qled", "smart-tv", "entertainment"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Revolutionary running shoes with responsive Boost midsole and Primeknit+ upper. Designed for maximum energy return and comfort.",
    price: 179.99,
    compareAtPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    ],
    category: "Clothing",
    brand: "Adidas",
    sku: "ADIDAS-UB22-001",
    stock: 90,
    weight: 280,
    dimensions: { length: 28, width: 11, height: 7 },
    tags: ["running", "shoes", "boost", "athletic", "comfortable"],
    isActive: true,
    isFeatured: false
  },
  // Additional Electronics
  {
    name: "iPad Air 5th Generation",
    description: "Powerful tablet with M1 chip, 10.9-inch Liquid Retina display, and Apple Pencil support. Perfect for creativity and productivity.",
    price: 599.99,
    compareAtPrice: 649.99,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500"
    ],
    category: "Electronics",
    brand: "Apple",
    sku: "IPAD-AIR5-001",
    stock: 45,
    weight: 461,
    dimensions: { length: 247.6, width: 178.5, height: 6.1 },
    tags: ["tablet", "ipad", "apple", "m1", "creative"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Sony PlayStation 5",
    description: "Next-generation gaming console with lightning-fast loading, haptic feedback, and 4K graphics. Includes DualSense wireless controller.",
    price: 499.99,
    compareAtPrice: 549.99,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500"
    ],
    category: "Electronics",
    brand: "Sony",
    sku: "PS5-CONSOLE-001",
    stock: 20,
    weight: 4500,
    dimensions: { length: 390, width: 260, height: 104 },
    tags: ["gaming", "console", "playstation", "4k", "wireless"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "DJI Mini 3 Pro Drone",
    description: "Ultra-lightweight drone with 4K camera, 34-minute flight time, and advanced obstacle avoidance. Perfect for aerial photography.",
    price: 759.99,
    compareAtPrice: 799.99,
    images: [
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500",
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500"
    ],
    category: "Electronics",
    brand: "DJI",
    sku: "DJI-MINI3PRO-001",
    stock: 15,
    weight: 249,
    dimensions: { length: 145, width: 90, height: 62 },
    tags: ["drone", "camera", "aerial", "photography", "4k"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "GoPro Hero 11 Black",
    description: "Action camera with 5.3K video, 27MP photos, and HyperSmooth 5.0 stabilization. Waterproof and rugged for extreme adventures.",
    price: 399.99,
    compareAtPrice: 449.99,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500"
    ],
    category: "Electronics",
    brand: "GoPro",
    sku: "GOPRO-HERO11-001",
    stock: 35,
    weight: 153,
    dimensions: { length: 71, width: 50, height: 33 },
    tags: ["action-camera", "gopro", "5k", "waterproof", "adventure"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Bose QuietComfort 45",
    description: "Premium noise-canceling headphones with 24-hour battery life and comfortable Acoustic Noise Canceling technology.",
    price: 329.99,
    compareAtPrice: 379.99,
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500"
    ],
    category: "Electronics",
    brand: "Bose",
    sku: "BOSE-QC45-001",
    stock: 60,
    weight: 240,
    dimensions: { length: 170, width: 240, height: 80 },
    tags: ["headphones", "noise-canceling", "bose", "wireless", "audio"],
    isActive: true,
    isFeatured: false
  },
  // Additional Clothing
  {
    name: "Uniqlo Ultra Light Down Jacket",
    description: "Lightweight, packable down jacket perfect for layering. Features water-repellent finish and comes in multiple colors.",
    price: 69.99,
    compareAtPrice: 79.99,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    ],
    category: "Clothing",
    brand: "Uniqlo",
    sku: "UNIQLO-ULD-001",
    stock: 150,
    weight: 200,
    dimensions: { length: 70, width: 50, height: 5 },
    tags: ["jacket", "down", "lightweight", "packable", "winter"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "H&M Premium Cotton T-Shirt",
    description: "Soft, breathable cotton t-shirt with a modern fit. Available in various colors and sizes for everyday comfort.",
    price: 19.99,
    compareAtPrice: 24.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    ],
    category: "Clothing",
    brand: "H&M",
    sku: "HM-TSHIRT-001",
    stock: 300,
    weight: 150,
    dimensions: { length: 70, width: 50, height: 2 },
    tags: ["t-shirt", "cotton", "casual", "comfortable", "basic"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Zara Blazer Jacket",
    description: "Elegant blazer jacket with a modern cut and comfortable fit. Perfect for professional settings or smart casual occasions.",
    price: 89.99,
    compareAtPrice: 109.99,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"
    ],
    category: "Clothing",
    brand: "Zara",
    sku: "ZARA-BLAZER-001",
    stock: 80,
    weight: 400,
    dimensions: { length: 75, width: 60, height: 3 },
    tags: ["blazer", "jacket", "professional", "formal", "elegant"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Converse Chuck Taylor All Star",
    description: "Classic canvas sneakers with rubber toe cap and vulcanized sole. Timeless design that goes with everything.",
    price: 59.99,
    compareAtPrice: 69.99,
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500"
    ],
    category: "Clothing",
    brand: "Converse",
    sku: "CONVERSE-CHUCK-001",
    stock: 200,
    weight: 300,
    dimensions: { length: 28, width: 10, height: 6 },
    tags: ["sneakers", "canvas", "classic", "casual", "versatile"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Ray-Ban Aviator Classic",
    description: "Iconic aviator sunglasses with gold frame and green lenses. Timeless design with superior UV protection.",
    price: 154.99,
    compareAtPrice: 174.99,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"
    ],
    category: "Clothing",
    brand: "Ray-Ban",
    sku: "RAYBAN-AVIATOR-001",
    stock: 100,
    weight: 30,
    dimensions: { length: 15, width: 6, height: 2 },
    tags: ["sunglasses", "aviator", "ray-ban", "classic", "uv-protection"],
    isActive: true,
    isFeatured: false
  },
  // Additional Home & Garden
  {
    name: "IKEA MALM Bed Frame",
    description: "Minimalist bed frame with clean lines and sturdy construction. Available in multiple sizes and finishes.",
    price: 199.99,
    compareAtPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500"
    ],
    category: "Home & Garden",
    brand: "IKEA",
    sku: "IKEA-MALM-001",
    stock: 25,
    weight: 25000,
    dimensions: { length: 200, width: 160, height: 30 },
    tags: ["bed", "furniture", "minimalist", "modern", "bedroom"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Philips Hue Smart Bulb Starter Kit",
    description: "Smart lighting system with color-changing bulbs, bridge, and app control. Compatible with Alexa and Google Assistant.",
    price: 199.99,
    compareAtPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    ],
    category: "Home & Garden",
    brand: "Philips",
    sku: "PHILIPS-HUE-001",
    stock: 40,
    weight: 500,
    dimensions: { length: 20, width: 15, height: 10 },
    tags: ["smart-home", "lighting", "philips-hue", "color-changing", "wifi"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "Professional-grade stand mixer with 10-speed motor and multiple attachments. Perfect for baking and cooking enthusiasts.",
    price: 379.99,
    compareAtPrice: 429.99,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
    ],
    category: "Home & Garden",
    brand: "KitchenAid",
    sku: "KITCHENAID-MIXER-001",
    stock: 30,
    weight: 12000,
    dimensions: { length: 40, width: 30, height: 35 },
    tags: ["mixer", "kitchen", "baking", "professional", "stand-mixer"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Dyson V15 Detect Cordless Vacuum",
    description: "Powerful cordless vacuum with laser dust detection and 60-minute runtime. Includes multiple attachments for all surfaces.",
    price: 699.99,
    compareAtPrice: 749.99,
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500"
    ],
    category: "Home & Garden",
    brand: "Dyson",
    sku: "DYSON-V15-001",
    stock: 20,
    weight: 2500,
    dimensions: { length: 120, width: 25, height: 25 },
    tags: ["vacuum", "cordless", "dyson", "laser-detection", "powerful"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "Cuisinart Coffee Maker",
    description: "Programmable coffee maker with 12-cup capacity and auto-shutoff feature. Perfect for coffee lovers and busy households.",
    price: 89.99,
    compareAtPrice: 109.99,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
    ],
    category: "Home & Garden",
    brand: "Cuisinart",
    sku: "CUISINART-COFFEE-001",
    stock: 50,
    weight: 3000,
    dimensions: { length: 30, width: 20, height: 35 },
    tags: ["coffee-maker", "programmable", "12-cup", "auto-shutoff", "kitchen"],
    isActive: true,
    isFeatured: false
  },
  // Additional Beauty & Personal Care
  {
    name: "Dyson Airwrap Multi-Styler",
    description: "Revolutionary hair styling tool that dries, curls, waves, and smooths hair using air instead of extreme heat.",
    price: 599.99,
    compareAtPrice: 649.99,
    images: [
      "https://images.unsplash.com/photo-1522338140263-f46f5913618a?w=500",
      "https://images.unsplash.com/photo-1522338140263-f46f5913618a?w=500"
    ],
    category: "Beauty",
    brand: "Dyson",
    sku: "DYSON-AIRWRAP-001",
    stock: 15,
    weight: 1000,
    dimensions: { length: 30, width: 10, height: 10 },
    tags: ["hair-styling", "dyson", "airwrap", "curling", "drying"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "La Mer Moisturizing Cream",
    description: "Luxury moisturizing cream with Miracle Broth and sea kelp. Provides intense hydration and helps reduce fine lines.",
    price: 349.99,
    compareAtPrice: 399.99,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500"
    ],
    category: "Beauty",
    brand: "La Mer",
    sku: "LAMER-CREAM-001",
    stock: 25,
    weight: 100,
    dimensions: { length: 8, width: 8, height: 5 },
    tags: ["moisturizer", "luxury", "anti-aging", "hydration", "premium"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Oral-B iO Series 9 Toothbrush",
    description: "Smart electric toothbrush with AI-powered cleaning and interactive display. Connects to app for personalized brushing guidance.",
    price: 199.99,
    compareAtPrice: 229.99,
    images: [
      "https://images.unsplash.com/photo-1559591935-c7cc5c7f1b8c?w=500",
      "https://images.unsplash.com/photo-1559591935-c7cc5c7f1b8c?w=500"
    ],
    category: "Beauty",
    brand: "Oral-B",
    sku: "ORALB-IO9-001",
    stock: 40,
    weight: 200,
    dimensions: { length: 25, width: 3, height: 3 },
    tags: ["toothbrush", "electric", "smart", "oral-care", "ai-powered"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "MAC Ruby Woo Lipstick",
    description: "Iconic matte red lipstick with long-lasting formula. Perfect for a bold, classic look that suits all skin tones.",
    price: 19.99,
    compareAtPrice: 24.99,
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500"
    ],
    category: "Beauty",
    brand: "MAC",
    sku: "MAC-RUBYWOO-001",
    stock: 100,
    weight: 3,
    dimensions: { length: 8, width: 1, height: 1 },
    tags: ["lipstick", "matte", "red", "long-lasting", "classic"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Foreo Luna 3 Facial Cleanser",
    description: "Sonic facial cleansing brush with T-Sonic technology and 8 different intensity levels. Gentle yet effective for all skin types.",
    price: 199.99,
    compareAtPrice: 229.99,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500"
    ],
    category: "Beauty",
    brand: "Foreo",
    sku: "FOREOLUNA3-001",
    stock: 30,
    weight: 150,
    dimensions: { length: 12, width: 8, height: 3 },
    tags: ["facial-cleanser", "sonic", "foreo", "skincare", "gentle"],
    isActive: true,
    isFeatured: false
  },
  // Additional Sports & Fitness
  {
    name: "Peloton Bike+",
    description: "Premium indoor cycling bike with 24\" rotating HD touchscreen and live/on-demand classes. Includes 30-day free trial.",
    price: 2495.99,
    compareAtPrice: 2695.99,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    category: "Sports",
    brand: "Peloton",
    sku: "PELOTON-BIKE-001",
    stock: 10,
    weight: 50000,
    dimensions: { length: 140, width: 60, height: 130 },
    tags: ["exercise-bike", "peloton", "indoor-cycling", "fitness", "live-classes"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "Fitbit Versa 4 Smartwatch",
    description: "Advanced fitness smartwatch with GPS, heart rate monitoring, and 6+ day battery life. Tracks 40+ exercise modes.",
    price: 229.99,
    compareAtPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    ],
    category: "Sports",
    brand: "Fitbit",
    sku: "FITBIT-VERSA4-001",
    stock: 60,
    weight: 100,
    dimensions: { length: 4, width: 4, height: 1 },
    tags: ["smartwatch", "fitness-tracker", "gps", "heart-rate", "fitbit"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Bowflex SelectTech 552 Dumbbells",
    description: "Adjustable dumbbells that combine 15 sets of weights in one using a unique dial system. Space-saving and versatile.",
    price: 429.99,
    compareAtPrice: 479.99,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    category: "Sports",
    brand: "Bowflex",
    sku: "BOWFLEX-552-001",
    stock: 20,
    weight: 25000,
    dimensions: { length: 50, width: 20, height: 20 },
    tags: ["dumbbells", "adjustable", "strength-training", "bowflex", "versatile"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Wilson Pro Staff Tennis Racket",
    description: "Professional tennis racket with graphite frame and synthetic gut strings. Perfect for intermediate to advanced players.",
    price: 199.99,
    compareAtPrice: 229.99,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500"
    ],
    category: "Sports",
    brand: "Wilson",
    sku: "WILSON-PROSTAFF-001",
    stock: 35,
    weight: 300,
    dimensions: { length: 70, width: 25, height: 3 },
    tags: ["tennis", "racket", "wilson", "professional", "graphite"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Nike Dri-FIT Training Shorts",
    description: "Lightweight training shorts with Dri-FIT technology for moisture management. Perfect for workouts and athletic activities.",
    price: 34.99,
    compareAtPrice: 39.99,
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500"
    ],
    category: "Sports",
    brand: "Nike",
    sku: "NIKE-DRIFIT-001",
    stock: 120,
    weight: 150,
    dimensions: { length: 40, width: 30, height: 2 },
    tags: ["shorts", "training", "dri-fit", "moisture-wicking", "athletic"],
    isActive: true,
    isFeatured: false
  },
  // Additional Books & Media
  {
    name: "Atomic Habits by James Clear",
    description: "Bestselling book about building good habits and breaking bad ones. Practical strategies for personal development and success.",
    price: 16.99,
    compareAtPrice: 19.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    ],
    category: "Books",
    brand: "Avery",
    sku: "BOOK-ATOMIC-001",
    stock: 200,
    weight: 300,
    dimensions: { length: 21, width: 14, height: 2 },
    tags: ["self-help", "habits", "personal-development", "bestseller", "motivation"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "The Alchemist by Paulo Coelho",
    description: "Inspirational novel about following your dreams and listening to your heart. A modern classic that has touched millions of readers.",
    price: 14.99,
    compareAtPrice: 17.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    ],
    category: "Books",
    brand: "HarperOne",
    sku: "BOOK-ALCHEMIST-001",
    stock: 180,
    weight: 250,
    dimensions: { length: 20, width: 13, height: 2 },
    tags: ["fiction", "inspirational", "classic", "philosophy", "adventure"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Kindle Paperwhite",
    description: "Waterproof e-reader with 6.8\" display, adjustable warm light, and weeks of battery life. Perfect for reading anywhere.",
    price: 139.99,
    compareAtPrice: 159.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    ],
    category: "Books",
    brand: "Amazon",
    sku: "KINDLE-PAPERWHITE-001",
    stock: 75,
    weight: 205,
    dimensions: { length: 17, width: 12, height: 1 },
    tags: ["e-reader", "kindle", "waterproof", "paperwhite", "reading"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Harry Potter Complete Collection",
    description: "Complete set of all 7 Harry Potter books in a beautiful boxed set. Perfect for collectors and fans of the magical series.",
    price: 89.99,
    compareAtPrice: 109.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    ],
    category: "Books",
    brand: "Scholastic",
    sku: "BOOK-HP-COLLECTION-001",
    stock: 50,
    weight: 2000,
    dimensions: { length: 25, width: 20, height: 15 },
    tags: ["harry-potter", "fantasy", "boxed-set", "collector", "magical"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "The Subtle Art of Not Giving a F*ck",
    description: "Bestselling self-help book that challenges conventional wisdom about happiness and success. Raw, honest, and practical advice.",
    price: 15.99,
    compareAtPrice: 18.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    ],
    category: "Books",
    brand: "HarperOne",
    sku: "BOOK-SUBTLE-ART-001",
    stock: 150,
    weight: 280,
    dimensions: { length: 21, width: 14, height: 2 },
    tags: ["self-help", "bestseller", "philosophy", "happiness", "practical"],
    isActive: true,
    isFeatured: false
  },
  // Additional Toys & Games
  {
    name: "Nintendo Switch OLED",
    description: "Gaming console with 7\" OLED screen, enhanced audio, and versatile play modes. Includes Joy-Con controllers.",
    price: 349.99,
    compareAtPrice: 379.99,
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500",
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500"
    ],
    category: "Toys",
    brand: "Nintendo",
    sku: "NINTENDO-SWITCH-001",
    stock: 40,
    weight: 420,
    dimensions: { length: 24, width: 10, height: 1 },
    tags: ["gaming", "nintendo", "switch", "portable", "oled"],
    isActive: true,
    isFeatured: true
  },
  {
    name: "Monopoly Classic Board Game",
    description: "Classic family board game where players buy, sell, and trade properties. Perfect for game nights and family entertainment.",
    price: 24.99,
    compareAtPrice: 29.99,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500"
    ],
    category: "Toys",
    brand: "Hasbro",
    sku: "MONOPOLY-CLASSIC-001",
    stock: 100,
    weight: 800,
    dimensions: { length: 40, width: 40, height: 5 },
    tags: ["board-game", "family", "classic", "monopoly", "strategy"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Hot Wheels Ultimate Garage",
    description: "Multi-level car garage playset with ramps, elevator, and parking spaces. Includes 5 Hot Wheels cars for endless fun.",
    price: 49.99,
    compareAtPrice: 59.99,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500"
    ],
    category: "Toys",
    brand: "Mattel",
    sku: "HOTWHEELS-GARAGE-001",
    stock: 60,
    weight: 1500,
    dimensions: { length: 60, width: 40, height: 50 },
    tags: ["hot-wheels", "cars", "playset", "garage", "kids"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Barbie Dreamhouse",
    description: "Three-story dollhouse with 10 rooms, working elevator, and pool. Includes furniture and accessories for imaginative play.",
    price: 199.99,
    compareAtPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500"
    ],
    category: "Toys",
    brand: "Mattel",
    sku: "BARBIE-DREAMHOUSE-001",
    stock: 25,
    weight: 8000,
    dimensions: { length: 80, width: 40, height: 60 },
    tags: ["barbie", "dollhouse", "dreamhouse", "dolls", "imaginative"],
    isActive: true,
    isFeatured: false
  },
  {
    name: "Puzzle 1000 Pieces - Nature Scene",
    description: "High-quality 1000-piece jigsaw puzzle featuring a beautiful nature landscape. Perfect for relaxation and family bonding.",
    price: 19.99,
    compareAtPrice: 24.99,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500"
    ],
    category: "Toys",
    brand: "Ravensburger",
    sku: "PUZZLE-1000-001",
    stock: 80,
    weight: 500,
    dimensions: { length: 50, width: 35, height: 2 },
    tags: ["puzzle", "jigsaw", "1000-pieces", "nature", "relaxation"],
    isActive: true,
    isFeatured: false
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Log some product details
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (${product.brand}) - $${product.price}`);
    });

    console.log('Product seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedProducts();
}

module.exports = { seedProducts, sampleProducts }; 