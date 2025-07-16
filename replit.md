# Carzo E-commerce Application

## Overview

This is a full-stack e-commerce application for automotive accessories called "Carzo". The application features a modern React frontend with TypeScript, a Node.js/Express backend, and PostgreSQL database with Drizzle ORM. It's specifically designed for selling automotive accessories like car cases, bags, and other car-related products.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with a custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state, custom hooks for cart management
- **Routing**: React Router for client-side navigation
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reloading with Vite middleware integration

### Build and Deployment
- **Development**: Vite dev server with Express API proxy
- **Production**: Static files served by Express with esbuild bundling
- **Database Migrations**: Drizzle Kit for schema management

## Key Components

### Database Schema
Located in `shared/schema.ts`, currently defines:
- **Users table**: Basic user authentication with id, username, and password
- **Extensible design**: Ready for product tables, orders, and other e-commerce entities

### Storage Layer
- **Interface**: `IStorage` defines CRUD operations
- **Implementation**: `MemStorage` class provides in-memory storage for development
- **Ready for database**: Interface designed to easily swap to database implementation

### Frontend Components
- **Product Management**: ProductGallery, ProductOptions for product display
- **Shopping Cart**: CartDrawer with add/remove functionality
- **Navigation**: Header with mobile menu, responsive design
- **UI Library**: Complete set of accessible components from Radix UI

### Routing Structure
- `/` - Main product page (automotive cases)
- `/bags` - Bags product page
- `/checkout` - Checkout process
- `/*` - 404 error handling

## Data Flow

1. **Product Display**: Static product data rendered through React components
2. **Cart Management**: Client-side cart state with localStorage persistence
3. **User Interaction**: Form submissions and product selections managed by React Hook Form
4. **API Communication**: TanStack Query for server state management (ready for future API endpoints)

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **class-variance-authority**: Type-safe variant API

### Development Tools
- **Vite**: Fast build tool with HMR
- **Replit Integration**: Runtime error overlay and cartographer plugins
- **TypeScript**: Static type checking

### Database and Backend
- **Drizzle ORM**: Type-safe database toolkit
- **Neon Database**: Serverless PostgreSQL
- **Express.js**: Web framework for Node.js

## Deployment Strategy

### Development Environment
- Vite development server with Express API integration
- Hot module replacement for rapid development
- Replit-specific tooling for cloud development

### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` script

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Node environment detection for development/production modes
- Static file serving in production mode

### Key Features Ready for Extension
- User authentication system (schema exists)
- Product catalog expansion (component structure ready)
- Order management (database and API structure prepared)
- Payment integration (checkout page framework exists)
- Mobile-responsive design (Tailwind breakpoints implemented)