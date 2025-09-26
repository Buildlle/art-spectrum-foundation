# ASF Custom CMS Setup

## Prerequisites

1. **Neon Database**: Create a database at [neon.tech](https://neon.tech)
2. **Environment Variables**: Copy `.env.local` and fill in your values

## Installation & Setup

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   # Copy example env file
   cp .env.local .env.local.example

   # Edit .env.local with your values:
   # - DATABASE_URL: Your Neon database connection string
   # - NEXTAUTH_SECRET: Generate with `openssl rand -base64 32`
   # - ADMIN_EMAIL & ADMIN_PASSWORD: Your admin credentials
   ```

3. **Set up database**:
   ```bash
   # Push schema to database
   npm run db:push

   # Optional: Open Drizzle Studio to view data
   npm run db:studio
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

## Usage

### Admin Access
- Visit `/admin/login` to access the admin dashboard
- Use the credentials from your `.env.local` file

### Inline Editing
1. **Enable Edit Mode**: Add `?edit=true` to any page URL
2. **Edit Content**: Click on any text or image to edit inline
3. **Save Changes**: Press Enter or click outside to save
4. **Deploy**: Use the toolbar to deploy changes to live site

### Using EditableContent Component

Replace static content with the `EditableContent` component:

```tsx
import EditableContent from '@/components/EditableContent';

// Before:
<h1>Art Spectrum Foundation</h1>

// After:
<EditableContent
  contentKey="homepage-title"
  type="text"
  defaultContent="Art Spectrum Foundation"
  page="home"
  as="h1"
  className="text-4xl font-bold"
/>
```

#### Component Props:
- `contentKey`: Unique identifier for this content block
- `type`: 'text', 'image', or 'link'
- `defaultContent`: Default content to show
- `page`: Page identifier (e.g., 'home', 'about')
- `position`: Optional position identifier
- `className`: CSS classes to apply
- `as`: HTML element to render as
- `metadata`: Additional data (alt text, etc.)

### API Endpoints

- `GET /api/content` - Get all content or filter by page/key
- `POST /api/content` - Create new content block
- `PUT /api/content` - Update existing content block
- `DELETE /api/content/[key]` - Delete content block
- `POST /api/deploy` - Trigger deployment

## Database Schema

The system uses 4 main tables:
- `users` - Authentication and user management
- `content_blocks` - Editable content pieces
- `pages` - Page configurations
- `deployments` - Deployment history

## Deployment Integration

To integrate with your deployment service, update `/api/deploy/route.ts`:

```typescript
// Example for Vercel
const webhookUrl = `https://api.vercel.com/v1/integrations/deploy/${process.env.VERCEL_HOOK_ID}`;
await fetch(webhookUrl, { method: 'POST' });

// Example for Netlify
const webhookUrl = process.env.NETLIFY_BUILD_HOOK;
await fetch(webhookUrl, { method: 'POST' });
```

## Security Notes

- Admin credentials are stored in environment variables
- All API routes should be protected in production
- Consider implementing proper password hashing
- Add rate limiting for API endpoints
- Use HTTPS in production