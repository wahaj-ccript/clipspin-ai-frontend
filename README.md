# ClipSpin Frontend

A React-based web application that transforms social media videos (YouTube Shorts, Instagram Reels, TikTok) into AI-generated content using various video formats, AI presenters, and advanced video generation technologies.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Overview](#project-overview)
- [Architecture & Structure](#architecture--structure)
- [API Documentation](#api-documentation)
- [Component Documentation](#component-documentation)
- [Development](#development)

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **Package Manager**: npm, yarn, or pnpm (pnpm recommended)
- **Environment**: Modern web browser with ES2020+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clip-spin-frontend
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install

   # Or using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://clipspin-api.qisqa.link/api
   ```

4. **Run the development server**
   ```bash
   # Using pnpm
   pnpm dev

   # Using npm
   npm run dev

   # Using yarn
   yarn dev
   ```

5. **Access the application**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview
```

## Project Overview

ClipSpin is a modern web application that enables content creators to transform social media videos into new AI-generated content. The platform supports multiple video formats and provides various AI-powered video generation options with advanced features like avatar selection and voice customization.

### Key Features

- **Multi-Platform Support**: Accepts URLs from YouTube Shorts, Instagram Reels, and TikTok
- **AI Video Generation**: Five different project types with AI-powered content creation
- **Avatar Selection**: Choose from multiple AI avatars with preview functionality
- **Credit-Based System**: Subscription-based credit system for video generation
- **Real-Time Progress Tracking**: Live updates on video processing status with detailed workflow
- **User Authentication**: Secure authentication with subscription management
- **Responsive Design**: Modern, mobile-first UI built with Tailwind CSS
- **Advanced Video Generation**: Integration with Veo3 for realistic video generation with sound

### Project Types

1. **Slide Show**: AI avatar delivers script with animated slides
2. **Text Audiogram**: Audio-focused videos with dynamic text and B-roll
3. **Talking Head**: AI presenter speaking directly to camera with avatar selection
4. **Veo3**: AI Video Generation with realistic sound effects and ambient noise
5. **Professional Editor**: High-quality professional video production

## Architecture & Structure

### Technology Stack

- **Frontend Framework**: React 18.3+ with TypeScript
- **Build Tool**: Vite 5.4+
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: React Context API + TanStack Query
- **Routing**: React Router DOM v6
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors
- **Authentication**: Custom JWT-based auth system
- **Media Handling**: Video preview and playback controls

### Folder Structure

```
src/
├── api/                    # API layer and HTTP client
│   ├── axios.ts           # Axios instance with interceptors
│   ├── projectsApi.ts     # Project-related API calls
│   └── users.ts           # User-related API calls
├── assets/                 # Static assets
│   ├── icons/             # Icon components (Male, Female)
│   └── logo.png           # Veo3 logo
├── auth/                   # Authentication system
│   ├── context/           # Auth context and providers
│   ├── guard/             # Route protection (including admin guard)
│   └── hooks/             # Auth-related hooks
├── components/             # Reusable UI components
│   ├── _form/             # Form components
│   ├── _rhf/              # React Hook Form components
│   └── [Component]/       # Individual component folders
├── hooks/                  # Custom React hooks
│   └── api/               # API-specific hooks
├── modules/                # Feature modules
│   ├── project/           # Project management
│   ├── service/           # Service layer
│   │   ├── hooks/         # Service hooks (useGetAvatars)
│   │   ├── libs/          # Service utilities (avatarMapper)
│   │   └── types/         # Service type definitions
│   └── subscription/      # Subscription management
├── pages/                  # Page components
│   ├── dashboard/         # Dashboard-specific pages
│   │   ├── NewProject.tsx # Enhanced project creation
│   │   ├── ProjectDetail.tsx # Project details with workflow
│   │   └── Workflow.tsx   # Progress tracking component
│   └── Protected/         # Protected admin pages
├── providers/              # Global providers
├── routes/                 # Routing configuration
│   └── sections/          # Route definitions
├── services/               # Business logic services
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

### State Management Strategy

- **Global State**: React Context for authentication and theme
- **Server State**: TanStack Query for API data caching and synchronization
- **Form State**: React Hook Form for complex form management with avatar selection
- **Local State**: useState for component-specific state (video playback, selection)

### Routing Strategy

- **File-based Organization**: Routes organized by feature/section
- **Protected Routes**: Authentication guards for dashboard and admin routes
- **Dynamic Routes**: Parameterized routes for projects and resources
- **Lazy Loading**: Code splitting for optimal performance

## API Documentation

### Base Configuration

- **Base URL**: `https://api.app.clipspin.ai/api`
- **Authentication**: JWT Bearer tokens
- **Timeout**: 30 seconds
- **Content Type**: `application/json`

### Authentication Flow

1. **Token Storage**: JWT tokens stored in localStorage
2. **Request Interceptor**: Automatically adds Authorization header
3. **Response Interceptor**: Handles 401 errors and redirects to login
4. **Token Refresh**: Automatic token validation and refresh

### Key Endpoints

#### Projects API

```typescript
// Create project from URL with avatar selection
POST /projects
{
  "title": "string",
  "input": { "url": "string" },
  "type": "slide_show" | "text_audiogram" | "talking_head" | "professional" | "veo3",
  "avatar_id": "string" // Optional for talking_head type
}

// Get user projects with pagination
GET /projects?page=1&limit=10

// Get specific project
GET /projects/:id

// Update project
PUT /projects/:id
{
  "title": "string",
  "selected_idea": { "script": "string" }
}

// Generate video
POST /projects/:id/generate

// Upload result video
POST /projects/:id/result
```

#### Avatar API

```typescript
// Get available avatars
GET /heygen-avatars
Response: {
  data: Array<{
    _id: string;
    avatar_id: string;
    avatar_name: string;
    gender: "male" | "female";
    preview_image_url: string;
    preview_video_url: string;
    premium: boolean;
  }>
}
```

#### File Upload

```typescript
// Upload file
POST /files
Content-Type: multipart/form-data
```

### Data Flow

1. **User Input**: URL validation and project creation with optional avatar selection
2. **API Request**: Axios interceptors handle authentication
3. **Server Processing**: Backend processes video and generates content with selected avatar
4. **Real-time Updates**: Polling for project status updates with detailed progress tracking
5. **Result Delivery**: Generated video URLs and metadata

## Component Documentation

### Core Components

#### NewProject Component

**Purpose**: Enhanced project creation interface with URL validation, project type selection, and avatar selection for talking head projects.

**Props**:
```typescript
interface NewProjectProps {
  projectType: ProjectType;
}
```

**Key Features**:
- URL validation for YouTube Shorts, Instagram Reels, TikTok
- Credit-based project type selection with 5 types including Veo3
- Avatar selection with preview videos for talking head projects
- Success notifications with navigation options
- Form validation with Zod schema including avatar field

**Usage**:
```tsx
<NewProject projectType={ProjectType.talking_head} />
```

#### Workflow Component

**Purpose**: Visual progress tracking for project generation with detailed status indicators.

**Props**:
```typescript
interface WorkflowProps {
  project: Project;
}
```

**Key Features**:
- Three-step progress visualization
- Real-time status updates with loading indicators
- Estimated completion time display
- Error state handling with badges

**Usage**:
```tsx
<Workflow project={projectData} />
```

#### Avatar Selection

**Features**:
- Grid layout of available avatars
- Video preview on hover/click
- Gender-based filtering
- Premium avatar indicators
- Responsive design for mobile and desktop

### Form Components

**Location**: `src/components/_form/`

**Components**:
- `Form`: React Hook Form wrapper with context
- `FormField`: Individual form field with validation
- `Input`: Styled input component with error states
- `Button`: Consistent button styling with loading states

**Usage**:
```tsx
<Form {...form}>
  <FormField
    control={form.control}
    name="avatar"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Select Avatar</FormLabel>
        <FormControl>
          <AvatarSelection {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

#### UI Components

**Location**: `src/components/`

**Key Components**:
- `Card`: Container component with header, content, footer
- `Alert`: Notification component with variants (success, warning, error)
- `Button`: Primary action component with loading states
- `Tooltip`: Contextual help component with rich content
- `Badge`: Status indicators with color variants for project states

### Authentication Components

#### AuthProvider

**Purpose**: Global authentication state management with subscription tracking

**Features**:
- JWT token management
- User session persistence
- Subscription data caching with credit tracking
- Automatic token refresh

#### AuthGuard & AdminGuard

**Purpose**: Route protection for authenticated users and admin access

**Usage**:
```tsx
<AuthGuard>
  <ProtectedComponent />
</AuthGuard>

<AdminGuard>
  <AdminComponent />
</AdminGuard>
```

### Service Layer

#### useGetAvatars Hook

**Purpose**: Fetch and manage avatar data with caching

**Features**:
- TanStack Query integration
- Data transformation with avatarMapper
- Loading and error states
- Automatic refetching

**Usage**:
```tsx
const { data: avatars, isLoading, error } = useGetAvatars();
```

### Hooks

#### Custom Hooks

- `useAuthContext`: Access authentication state and user data
- `useCreateProjectFromUrl`: Project creation with optimistic updates and avatar support
- `useToast`: Global toast notifications
- `useSubscriptionPlans`: Subscription plan data with credit pricing
- `useGetAvatars`: Avatar data fetching and management

## Development

### Recent Updates

- **Talking Head Implementation**: Full avatar selection with preview functionality
- **Veo3 Integration**: Advanced AI video generation with realistic sound
- **Enhanced UI**: Improved project type selection with visual indicators
- **Progress Tracking**: Detailed workflow visualization with status updates
- **Admin Features**: Enhanced user management and admin guard implementation

### Code Quality

- **ESLint**: Airbnb configuration with TypeScript support
- **Prettier**: Code formatting with Tailwind CSS plugin
- **Husky**: Pre-commit hooks for code quality
- **TypeScript**: Strict type checking enabled with comprehensive interfaces

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
```

### Environment Variables

```env
VITE_API_BASE_URL=https://api.app.clipspin.ai/api
```

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Considerations

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Responsive images with proper formats
- **Video Optimization**: Efficient video preview loading
- **Bundle Analysis**: Vite bundle analyzer for optimization
- **Caching**: TanStack Query for efficient data caching with avatar data
- **Memory Management**: Proper cleanup of video refs and event listeners
