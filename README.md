# Bhutan Travel Website

A full-stack travel website for Bhutan tourism, built with Next.js, MongoDB, and Tailwind CSS.

## Features

- Tour package browsing and booking
- Admin dashboard for managing conctact and bookings
- Blog system for travel articles
- User authentication and authorization
- Responsive design with modern UI

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system

## Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or Atlas)
- Git

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd bhutan-travel
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD_HASH=your_admin_password_hash
```

4. Generate admin credentials:
```bash
node scripts/generate-password.js
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── admin/          # Admin dashboard
│   ├── booking/        # Booking pages
│   └── ...
├── components/         # React components
├── lib/               # Utility functions
├── models/            # MongoDB models
└── styles/            # Global styles
```

## API Routes

- `/api/tour-packages` - Tour package management
- `/api/bookings` - Booking management
- `/api/auth` - Authentication endpoints
- `/api/blog` - Blog post management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. #   p r o j e c t n e x t j s  
 #   p r o j e c t n e x t j s  
 #   p r o j e c t n e x t j s  
 #   p r o j e c t n e x t j s  
 #   p r o j e c t n e x t j s  
 #   p r o j e c t n e x t j s  
 