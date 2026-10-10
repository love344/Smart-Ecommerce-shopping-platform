import { db } from "@/db";
import { users, categories, products, userAddresses } from "@/db/schema";
import { hashPassword } from "@/lib/auth";

export async function seedDatabase() {
  console.log("Seeding database...");

  // Create admin user
  const adminHash = await hashPassword("Admin@123");
  await db.insert(users).values({
    email: "admin@lumina.com",
    passwordHash: adminHash,
    name: "Admin User",
    role: "admin",
    isVerified: true,
  }).onConflictDoNothing();

  // Create sample customer
  const userHash = await hashPassword("User@123");
  await db.insert(users).values({
    email: "user@lumina.com",
    passwordHash: userHash,
    name: "Sample User",
    role: "customer",
    isVerified: true,
  }).onConflictDoNothing();

  // Create categories
  await db.insert(categories).values([
    { name: "Electronics", slug: "electronics", description: "Gadgets and devices", imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
    { name: "Fashion", slug: "fashion", description: "Apparel and accessories", imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80", sortOrder: 2 },
    { name: "Home & Living", slug: "home-living", description: "Furniture and decor", imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", sortOrder: 3 },
    { name: "Books", slug: "books", description: "Reads for everyone", imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80", sortOrder: 4 },
  ]).onConflictDoNothing();

  // Get category IDs
  const cats = await db.select().from(categories);
  const electronicsId = cats.find((c: any) => c.slug === "electronics")?.id || 1;
  const fashionId = cats.find((c: any) => c.slug === "fashion")?.id || 2;
  const homeId = cats.find((c: any) => c.slug === "home-living")?.id || 3;

  // Seed products
  await db.insert(products).values([
    {
      name: "Lumina Pro Wireless Headphones",
      slug: "lumina-pro-wireless-headphones",
      description: "Premium noise-canceling wireless headphones with 40-hour battery life. Features transparent mode, custom equalizer, and memory foam ear cushions for all-day comfort.",
      brand: "Lumina",
      categoryId: electronicsId,
      basePrice: "4999.00",
      comparePrice: "7999.00",
      sku: "LUM-HED-001",
      stockQuantity: 45,
      weightKg: "0.25",
      warrantyMonths: 24,
      careInstructions: "Wipe with dry cloth. Avoid moisture.",
      repairInfoUrl: "https://example.com/repair",
      sustainabilityNote: "Made with 30% recycled plastic components.",
      specs: { driverSize: "40mm", batteryLife: "40h", noiseCancel: true, bluetooth: "5.3" },
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585298723682-7115561d661e?auto=format&fit=crop&w=800&q=80",
      ],
      variants: [{ label: "Color", options: ["Midnight Black", "Cloud White", "Ocean Blue"] }, { label: "Size", options: ["Standard"] }],
      isFeatured: true,
    },
    {
      name: "AeroFit Running Shoes",
      slug: "aerofit-running-shoes",
      description: "Lightweight, breathable running shoes with responsive cushioning and durable rubber outsoles. Ideal for daily training and long-distance runs.",
      brand: "AeroFit",
      categoryId: fashionId,
      basePrice: "2499.00",
      comparePrice: "3499.00",
      sku: "AER-SHO-002",
      stockQuantity: 30,
      weightKg: "0.35",
      warrantyMonths: 12,
      specs: { upper: "Mesh", sole: "Rubber", weight: "280g", drop: "8mm" },
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],
      variants: [{ label: "Color", options: ["Neon Green", "Graphite Grey", "Solar Red"] }, { label: "Size", options: ["7", "8", "9", "10", "11"] }],
      isActive: true,
    },
    {
      name: "Zen Garden Diffuser",
      slug: "zen-garden-diffuser",
      description: "Ceramic essential oil diffuser with hand-painted botanical design. Silent ultrasonic operation, 8-hour continuous mist, and ambient LED lighting.",
      brand: "ZenCraft",
      categoryId: homeId,
      basePrice: "1899.00",
      comparePrice: "2599.00",
      sku: "ZEN-DIF-003",
      stockQuantity: 20,
      weightKg: "0.45",
      warrantyMonths: 18,
      specs: { capacity: "200ml", runtime: "8h", material: "Ceramic", light: "7-color LED" },
      images: ["https://images.unsplash.com/photo-1608571423900-8a5d8b8b7e7e?auto=format&fit=crop&w=800&q=80"],
      variants: [{ label: "Color", options: ["Sage Green", "Terracotta", "Ivory"] }],
      isFeatured: false,
    },
    {
      name: "Vortex Mechanical Keyboard",
      slug: "vortex-mechanical-keyboard",
      description: "Compact 75% layout mechanical keyboard with hot-swappable switches, PBT keycaps, and per-key RGB backlighting. USB-C connectivity.",
      brand: "Vortex",
      categoryId: electronicsId,
      basePrice: "6499.00",
      comparePrice: "8999.00",
      sku: "VOR-KBD-004",
      stockQuantity: 12,
      weightKg: "0.9",
      warrantyMonths: 24,
      specs: { layout: "75%", switches: "Hot-swappable", connection: "USB-C", backlight: "RGB" },
      images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"],
      variants: [{ label: "Switch", options: ["Blue Clicky", "Red Linear", "Brown Tactile"] }, { label: "Layout", options: ["ANSI", "ISO"] }],
      isActive: true,
    },
    {
      name: "Organic Cotton Tote Bag",
      slug: "organic-cotton-tote-bag",
      description: "Durable, spacious tote made from 100% GOTS-certified organic cotton. Features reinforced handles, inner pocket, and minimal branding.",
      brand: "EarthThread",
      categoryId: fashionId,
      basePrice: "799.00",
      comparePrice: "1299.00",
      sku: "EAR-BAG-005",
      stockQuantity: 100,
      weightKg: "0.15",
      warrantyMonths: 6,
      sustainabilityNote: "Certified organic cotton. Zero plastic packaging.",
      specs: { material: "Organic Cotton", dimensions: "40x35x12cm", capacity: "15L" },
      images: ["https://images.unsplash.com/photo-1559563458-c667ba5f5480?auto=format&fit=crop&w=800&q=80"],
      variants: [{ label: "Color", options: ["Natural", "Charcoal", "Olive"] }],
      isActive: true,
    },
    {
      name: "Smart Scale X1",
      slug: "smart-scale-x1",
      description: "Bio-impedance smart scale tracking weight, body fat, muscle mass, and BMI. Syncs with mobile app via Bluetooth. Sleek tempered glass surface.",
      brand: "FitSense",
      categoryId: electronicsId,
      basePrice: "3499.00",
      comparePrice: "4999.00",
      sku: "FIT-SCL-006",
      stockQuantity: 25,
      weightKg: "0.6",
      warrantyMonths: 12,
      specs: { sensors: "4x Bio-impedance", sync: "Bluetooth 5.0", maxWeight: "180kg", battery: "CR2032" },
      images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"],
      variants: [{ label: "Color", options: ["White Glass", "Black Glass"] }],
      isFeatured: true,
    },
  ]).onConflictDoNothing();

  console.log("Seeding complete.");
}
