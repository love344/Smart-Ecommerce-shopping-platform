# Lumina — Smart Shopping Platform

A modern, full-stack e-commerce application with intelligent features built on Next.js, Drizzle ORM, and PostgreSQL.

## Features
- Premium responsive UI with light/dark support
- User authentication and profile management
- Product catalog with search and filters
- Smart Budget Shopping Assistant
- Honest Product Comparison
- Shopping cart and secure checkout demonstration (Razorpay test mode)
- Admin dashboard
- Returns assistance and transparent policies
- Shared wishlist functionality

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database URL.

3. Push database schema:
   ```bash
   npx drizzle-kit push
   ```

4. Seed the database (optional — visit `/api/seed` after starting the server if products are missing):

5. Start development server:
   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000`

## Key Accounts (Demo)
- Admin: `admin@lumina.com` / `Admin@123`
- Customer: `user@lumina.com` / `User@123`

## Testing
Run the build and validation:
```bash
npm run build
npm run start
```

## External Services
- **Payments**: Razorpay (test mode configured). Provide `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env` for live mode.
- **Database**: PostgreSQL (configured via `DATABASE_URL`).
- **Images**: Unsplash URLs used for sample products (production should use Cloudinary or similar).
- **Email**: Not configured — document your SMTP or transactional service in `.env`.

## Security Notes
- Passwords are hashed with bcrypt (work factor 12).
- The demo uses JWT cookies. In production, use secure cookies with HTTPS.
- Admin endpoints should be protected with role-based middleware.
- Never commit real API secrets.

## Pending / Setup Requirements
- [ ] Configure live Razorpay credentials
- [ ] Configure transactional email service (SMTP/Resend)
- [ ] Configure image upload service (Cloudinary)
- [ ] Enable HTTPS in production
- [ ] Set up automated database backups
