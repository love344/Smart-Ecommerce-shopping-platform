import { db } from "./src/db/index";
import { products, categories } from "./src/db/schema";
import { sql } from "drizzle-orm";

async function seed() {
  const existing = await db.select({ count: sql`count(*)` }).from(products);
  const countValue = Number((existing[0] as any)?.count || 0);
  if (countValue > 0) {
    console.log("Already seeded");
    return;
  }
  const cats = await db.select().from(categories);
  const electronics = cats.find((c: any) => c.slug === "electronics")?.id || 1;
  const fashion = cats.find((c: any) => c.slug === "fashion")?.id || 2;
  const homeLiving = cats.find((c: any) => c.slug === "home-living")?.id || 3;
  await db.insert(products).values([
    { name: "Lumina Pro Wireless Headphones", slug: "lumina-pro-wireless-headphones", description: "Premium noise-canceling wireless headphones.", brand: "Lumina", categoryId: electronics, basePrice: "4999.00", comparePrice: "7999.00", sku: "LUM-HED-001", stockQuantity: 45, weightKg: "0.25", warrantyMonths: 24, repairInfoUrl: "https://example.com/repair", careInstructions: "Wipe with dry cloth.", sustainabilityNote: "30% recycled plastic.", specs: { driverSize: "40mm", batteryLife: "40h" }, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"], variants: [{ label: "Color", options: ["Black", "White"] }], isFeatured: true },
    { name: "AeroFit Running Shoes", slug: "aerofit-running-shoes", description: "Lightweight running shoes.", brand: "AeroFit", categoryId: fashion, basePrice: "2499.00", comparePrice: "3499.00", sku: "AER-SHO-002", stockQuantity: 30, weightKg: "0.35", specs: { upper: "Mesh" }, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"], variants: [{ label: "Size", options: ["7", "8", "9"] }] },
    { name: "Zen Garden Diffuser", slug: "zen-garden-diffuser", description: "Essential oil diffuser.", brand: "ZenCraft", categoryId: homeLiving, basePrice: "1899.00", comparePrice: "2599.00", sku: "ZEN-DIF-003", stockQuantity: 20, weightKg: "0.45", specs: { capacity: "200ml" }, images: ["https://images.unsplash.com/photo-1608571423900-8a5d8b8b7e7e?auto=format&fit=crop&w=800&q=80"] },
    { name: "Vortex Mechanical Keyboard", slug: "vortex-mechanical-keyboard", description: "Compact mechanical keyboard.", brand: "Vortex", categoryId: electronics, basePrice: "6499.00", comparePrice: "8999.00", sku: "VOR-KBD-004", stockQuantity: 12, weightKg: "0.9", specs: { layout: "75%" }, images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"] },
    { name: "Organic Cotton Tote Bag", slug: "organic-cotton-tote-bag", description: "Organic cotton tote.", brand: "EarthThread", categoryId: fashion, basePrice: "799.00", comparePrice: "1299.00", sku: "EAR-BAG-005", stockQuantity: 100, weightKg: "0.15", sustainabilityNote: "Organic cotton", specs: { capacity: "15L" }, images: ["https://images.unsplash.com/photo-1559563458-c667ba5f5480?auto=format&fit=crop&w=800&q=80"] },
    { name: "Smart Scale X1", slug: "smart-scale-x1", description: "Bio-impedance smart scale.", brand: "FitSense", categoryId: electronics, basePrice: "3499.00", comparePrice: "4999.00", sku: "FIT-SCL-006", stockQuantity: 25, weightKg: "0.6", specs: { maxWeight: "180kg" }, images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"], isFeatured: true },
  ]);
  console.log("Seeded products successfully");
}
seed().catch(console.error);
