import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const existing = await db.select({ count: sql`count(*)` }).from(products) as any[];
    if (existing[0]?.count > 0) {
      return NextResponse.json({ message: "Already seeded" });
    }

    const cats = await db.select().from(categories);
    const electronics = cats.find((c: any) => c.slug === "electronics")?.id || 1;
    const fashion = cats.find((c: any) => c.slug === "fashion")?.id || 2;
    const homeLiving = cats.find((c: any) => c.slug === "home-living")?.id || 3;

    await db.insert(products).values([
      {
        name: "Lumina Pro Wireless Headphones",
        slug: "lumina-pro-wireless-headphones",
        description: "Premium noise-canceling wireless headphones with 40-hour battery life, transparent mode, and memory foam cushions.",
        brand: "Lumina",
        categoryId: electronics,
        basePrice: "4999.00",
        comparePrice: "7999.00",
        sku: "LUM-HED-001",
        stockQuantity: 45,
        weightKg: "0.25",
        warrantyMonths: 24,
        repairInfoUrl: "https://example.com/repair",
        careInstructions: "Wipe with dry cloth. Avoid moisture.",
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
        description: "Lightweight breathable running shoes with responsive cushioning.",
        brand: "AeroFit",
        categoryId: fashion,
        basePrice: "2499.00",
        comparePrice: "3499.00",
        sku: "AER-SHO-002",
        stockQuantity: 30,
        weightKg: "0.35",
        warrantyMonths: 12,
        specs: { upper: "Mesh", sole: "Rubber", weight: "280g" },
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],
        variants: [{ label: "Color", options: ["Neon Green", "Graphite Grey", "Solar Red"] }, { label: "Size", options: ["7","8","9","10","11"] }],
      },
      {
        name: "Zen Garden Diffuser",
        slug: "zen-garden-diffuser",
        description: "Ceramic essential oil diffuser with silent ultrasonic operation.",
        brand: "ZenCraft",
        categoryId: homeLiving,
        basePrice: "1899.00",
        comparePrice: "2599.00",
        sku: "ZEN-DIF-003",
        stockQuantity: 20,
        weightKg: "0.45",
        warrantyMonths: 18,
        specs: { capacity: "200ml", runtime: "8h", material: "Ceramic" },
        images: ["https://images.unsplash.com/photo-1608571423900-8a5d8b8b7e7e?auto=format&fit=crop&w=800&q=80"],
        variants: [{ label: "Color", options: ["Sage Green", "Terracotta", "Ivory"] }],
      },
      {
        name: "Vortex Mechanical Keyboard",
        slug: "vortex-mechanical-keyboard",
        description: "Compact 75% layout mechanical keyboard with hot-swappable switches and RGB backlighting.",
        brand: "Vortex",
        categoryId: electronics,
        basePrice: "6499.00",
        comparePrice: "8999.00",
        sku: "VOR-KBD-004",
        stockQuantity: 12,
        weightKg: "0.9",
        warrantyMonths: 24,
        specs: { layout: "75%", switches: "Hot-swappable", connection: "USB-C", backlight: "RGB" },
        images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"],
        variants: [{ label: "Switch", options: ["Blue Clicky", "Red Linear", "Brown Tactile"] }, { label: "Layout", options: ["ANSI", "ISO"] }],
      },
      {
        name: "Organic Cotton Tote Bag",
        slug: "organic-cotton-tote-bag",
        description: "Durable spacious tote made from 100% GOTS-certified organic cotton.",
        brand: "EarthThread",
        categoryId: fashion,
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
      },
      {
        name: "Smart Scale X1",
        slug: "smart-scale-x1",
        description: "Bio-impedance smart scale tracking weight, body fat, muscle mass, and BMI.",
        brand: "FitSense",
        categoryId: electronics,
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
    ]);

    return NextResponse.json({ message: "Seeded successfully", count: 6 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
