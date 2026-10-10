import { pgTable, serial, varchar, text, integer, boolean, timestamp, decimal, jsonb, uuid, primaryKey, index, uniqueIndex, pgSchema, real, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("customer").notNull(), // customer, admin
  isVerified: boolean("is_verified").default(false).notNull(),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("users_email_idx").on(table.email),
]);

export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(userAddresses),
  orders: many(orders),
  wishlists: many(wishlists),
  reviews: many(reviews),
  notifications: many(notifications),
  priceAlerts: many(priceAlerts),
  cartItems: many(cartItems),
}));

// User Addresses
export const userAddresses = pgTable("user_addresses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  label: varchar("label", { length: 50 }).notNull(), // Home, Work, etc.
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  street: text("street").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  country: varchar("country", { length: 100 }).default("India").notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userAddressesRelations = relations(userAddresses, ({ one }) => ({
  user: one(users, { fields: [userAddresses.userId], references: [users.id] }),
}));

// Categories
export const categories: any = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  parentId: integer("parent_id").references(() => categories.id, { onDelete: "set null" }),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoriesRelations = relations(categories, ({ one, many }: any) => ({
  parent: one(categories as any, { fields: [categories.parentId], references: [categories.id], relationName: "parent_category" }),
  children: many(categories as any, { relationName: "parent_category" }),
  products: many(products),
}));

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  description: text("description").notNull(),
  brand: varchar("brand", { length: 100 }),
  categoryId: integer("category_id").notNull().references(() => categories.id, { onDelete: "restrict" }),
  basePrice: decimal("base_price", { precision: 12, scale: 2 }).notNull(),
  comparePrice: decimal("compare_price", { precision: 12, scale: 2 }),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  stockQuantity: integer("stock_quantity").default(0).notNull(),
  weightKg: decimal("weight_kg", { precision: 8, scale: 3 }),
  isActive: boolean("is_active").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  warrantyMonths: integer("warranty_months").default(12),
  repairInfoUrl: varchar("repair_info_url", { length: 500 }),
  careInstructions: text("care_instructions"),
  sustainabilityNote: text("sustainability_note"),
  specs: jsonb("specs"),
  images: jsonb("images").default([]).notNull(),
  variants: jsonb("variants").default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("products_category_id_idx").on(table.categoryId),
  index("products_name_idx").on(table.name),
  index("products_brand_idx").on(table.brand),
  index("products_is_featured_idx").on(table.isFeatured),
]);

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  reviews: many(reviews),
  imagesTable: many(productImages),
  inventory: many(inventory),
  cartItems: many(cartItems),
  orderItems: many(orderItems),
  wishlists: many(wishlistItems),
  priceAlerts: many(priceAlerts),
}));

export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  altText: varchar("alt_text", { length: 255 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}));

// Inventory (per variant / SKU for tracking)
export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  variantKey: varchar("variant_key", { length: 200 }).notNull(), // e.g., "Red / M"
  quantity: integer("quantity").default(0).notNull(),
  reservedQuantity: integer("reserved_quantity").default(0).notNull(),
  lastRestockedAt: timestamp("last_restocked_at").defaultNow(),
});

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(products, { fields: [inventory.productId], references: [products.id] }),
}));

// Reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  comment: text("comment").notNull(),
  verifiedPurchase: boolean("verified_purchase").default(false).notNull(),
  isApproved: boolean("is_approved").default(true).notNull(),
  helpfulCount: integer("helpful_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("reviews_user_product_idx").on(table.userId, table.productId),
]);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, { fields: [reviews.productId], references: [products.id] }),
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
}));

// Carts
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  sessionId: varchar("session_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("carts_user_id_idx").on(table.userId),
  index("carts_session_id_idx").on(table.sessionId),
]);

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").notNull().references(() => carts.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantKey: varchar("variant_key", { length: 200 }).notNull(),
  quantity: integer("quantity").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
  product: one(products, { fields: [cartItems.productId], references: [products.id] }),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, { fields: [carts.userId], references: [users.id] }),
  items: many(cartItems),
}));

// Wishlists
export const wishlists = pgTable("wishlists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).default("My Wishlist").notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  shareToken: varchar("share_token", { length: 64 }),
  giftMode: boolean("gift_mode").default(false).notNull(),
  budgetLimit: decimal("budget_limit", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const wishlistItems = pgTable("wishlist_items", {
  id: serial("id").primaryKey(),
  wishlistId: integer("wishlist_id").notNull().references(() => wishlists.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  addedAt: timestamp("added_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("wishlist_items_unique").on(table.wishlistId, table.productId),
]);

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  wishlist: one(wishlists, { fields: [wishlistItems.wishlistId], references: [wishlists.id] }),
  product: one(products, { fields: [wishlistItems.productId], references: [products.id] }),
}));

export const wishlistsRelations = relations(wishlists, ({ one, many }) => ({
  user: one(users, { fields: [wishlists.userId], references: [users.id] }),
  items: many(wishlistItems),
}));

// Coupons
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  type: varchar("type", { length: 20 }).notNull(), // percent, fixed
  value: decimal("value", { precision: 12, scale: 2 }).notNull(),
  minOrderValue: decimal("min_order_value", { precision: 12, scale: 2 }).default("0"),
  maxDiscount: decimal("max_discount", { precision: 12, scale: 2 }),
  usageLimit: integer("usage_limit").default(1),
  usageCount: integer("usage_count").default(0).notNull(),
  startsAt: timestamp("starts_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true).notNull(),
});

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  status: varchar("status", { length: 30 }).default("pending").notNull(), // pending, paid, processing, shipped, delivered, cancelled, refunded
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  shippingAmount: decimal("shipping_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  discountAmount: decimal("discount_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  couponCode: varchar("coupon_code", { length: 50 }),
  shippingAddressId: integer("shipping_address_id").notNull().references(() => userAddresses.id, { onDelete: "restrict" }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("orders_user_id_idx").on(table.userId),
  index("orders_status_idx").on(table.status),
  index("orders_order_number_idx").on(table.orderNumber),
]);

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
  payments: many(payments),
  returnRequests: many(returnRequests),
  notifications: many(notifications),
  address: one(userAddresses, { fields: [orders.shippingAddressId], references: [userAddresses.id] }),
}));

// Order Items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  productName: varchar("product_name", { length: 255 }).notNull(),
  productSku: varchar("product_sku", { length: 100 }).notNull(),
  variantKey: varchar("variant_key", { length: 200 }),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 12, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 12, scale: 2 }).notNull(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}));

// Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "restrict" }),
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }),
  razorpayOrderId: varchar("razorpay_order_id", { length: 255 }),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("INR").notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, captured, failed, refunded
  method: varchar("method", { length: 50 }),
  signatureVerified: boolean("signature_verified").default(false).notNull(),
  webhookEvent: text("webhook_event"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("payments_order_id_idx").on(table.orderId),
  index("payments_razorpay_payment_id_idx").on(table.razorpayPaymentId),
]);

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, { fields: [payments.orderId], references: [orders.id] }),
}));

// Refunds
export const refunds = pgTable("refunds", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "restrict" }),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  reason: text("reason"),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, processed, failed
  refundReference: varchar("refund_reference", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const refundsRelations = relations(refunds, ({ one }) => ({
  order: one(orders, { fields: [refunds.orderId], references: [orders.id] }),
}));

// Shipments
export const shipments = pgTable("shipments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "restrict" }),
  trackingNumber: varchar("tracking_number", { length: 100 }),
  carrier: varchar("carrier", { length: 100 }),
  status: varchar("status", { length: 30 }).default("pending").notNull(),
  estimatedDelivery: timestamp("estimated_delivery"),
  shippedAt: timestamp("shipped_at"),
  deliveredAt: timestamp("delivered_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const shipmentsRelations = relations(shipments, ({ one }) => ({
  order: one(orders, { fields: [shipments.orderId], references: [orders.id] }),
}));

// Return Requests
export const returnRequests = pgTable("return_requests", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "restrict" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  reason: text("reason").notNull(),
  requestType: varchar("request_type", { length: 20 }).default("return").notNull(), // return, exchange
  status: varchar("status", { length: 20 }).default("requested").notNull(), // requested, approved, rejected, completed
  returnNumber: varchar("return_number", { length: 50 }).notNull().unique(),
  itemsRequested: jsonb("items_requested").default([]).notNull(),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("return_requests_order_id_idx").on(table.orderId),
  index("return_requests_user_id_idx").on(table.userId),
]);

export const returnRequestsRelations = relations(returnRequests, ({ one }) => ({
  order: one(orders, { fields: [returnRequests.orderId], references: [orders.id] }),
  user: one(users, { fields: [returnRequests.userId], references: [users.id] }),
}));

// Notifications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(), // order, return, price_alert, wishlist, system
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  relatedId: integer("related_id"), // order id, product id, etc.
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}));

// Price Alerts
export const priceAlerts = pgTable("price_alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  targetPrice: decimal("target_price", { precision: 12, scale: 2 }).notNull(),
  isTriggered: boolean("is_triggered").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  triggeredAt: timestamp("triggered_at"),
}, (table) => [
  uniqueIndex("price_alerts_user_product_idx").on(table.userId, table.productId),
]);

export const priceAlertsRelations = relations(priceAlerts, ({ one }) => ({
  user: one(users, { fields: [priceAlerts.userId], references: [users.id] }),
  product: one(products, { fields: [priceAlerts.productId], references: [products.id] }),
}));

// Audit Logs
export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 50 }).notNull(),
  entityId: integer("entity_id"),
  details: jsonb("details"),
  ipAddress: varchar("ip_address", { length: 45 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
