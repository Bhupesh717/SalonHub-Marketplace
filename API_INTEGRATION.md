# API Integration Guide for EduPanel (Next.js 14)

This document explains how to integrate your backend APIs with the EduPanel Next.js application.

## Configuration

### 1. Set Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com/api
```

### 2. Update API Configuration

Edit `config/api.ts`:

```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-api-url.com/api";
```

## Expected API Endpoints

### Authentication

#### Login

- **Endpoint**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "token": "jwt-token-here",
    "user": {
      "id": "1",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "admin" // or "school"
    }
  }
  ```
- **Error Response** (401):
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

#### Forgot Password

- **Endpoint**: `POST /auth/forgot-password`
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Password reset link sent to your email"
  }
  ```

#### Reset Password

- **Endpoint**: `POST /auth/reset-password`
- **Request Body**:
  ```json
  {
    "token": "reset-token-from-email",
    "password": "newpassword123"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Password reset successful"
  }
  ```

### Students

#### Get All Students

- **Endpoint**: `GET /students`
- **Headers**: `Authorization: Bearer {token}`
- **Success Response** (200):
  ```json
  [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "grade": "10",
      "phone": "555-0101"
    }
  ]
  ```

#### Create Student

- **Endpoint**: `POST /students`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "grade": "11",
    "phone": "555-0102"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "id": "2",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "grade": "11",
    "phone": "555-0102"
  }
  ```

#### Update Student

- **Endpoint**: `PUT /students/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: (Same as Create, all fields optional)
- **Success Response** (200): Returns updated student object

#### Delete Student

- **Endpoint**: `DELETE /students/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Success Response** (200):
  ```json
  {
    "message": "Student deleted successfully"
  }
  ```

### Schools (Admin Only)

#### Get All Schools

- **Endpoint**: `GET /schools`
- **Headers**: `Authorization: Bearer {token}`
- **Success Response** (200):
  ```json
  [
    {
      "id": "1",
      "name": "Springfield High School",
      "email": "info@springfield.edu",
      "address": "123 Main St",
      "phone": "555-1000"
    }
  ]
  ```

#### Create School

- **Endpoint**: `POST /schools`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "name": "Riverside Academy",
    "email": "contact@riverside.edu",
    "address": "456 Oak Ave",
    "phone": "555-2000"
  }
  ```
- **Success Response** (201): Returns created school object

#### Update School

- **Endpoint**: `PUT /schools/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**: (Same as Create, all fields optional)
- **Success Response** (200): Returns updated school object

#### Delete School

- **Endpoint**: `DELETE /schools/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Success Response** (200):
  ```json
  {
    "message": "School deleted successfully"
  }
  ```

## Implementation Steps

### 1. Update API Service (`services/api.ts`)

Replace mock logic with actual API calls:

```typescript
async login(credentials: { email: string; password: string }) {
  const { data } = await this.api.post(API_ENDPOINTS.LOGIN, credentials)
  return data
}
```

### 2. Update Auth Store (`stores/authStore.ts`)

Update the login function:

```typescript
login: async (credentials) => {
  const response = await api.login(credentials);

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN_KEY, response.token);
    document.cookie = `auth_token=${response.token}; path=/; max-age=86400`;
  }

  set({ user: response.user, token: response.token });
};
```

### 3. Update Student Store (`stores/studentStore.ts`)

Replace mock data with API calls:

```typescript
fetchStudents: async () => {
  set({ isLoading: true });
  try {
    const data = await api.getStudents();
    set({ students: data, isLoading: false });
  } catch (error) {
    set({ isLoading: false });
    throw error;
  }
};
```

### 4. Update School Store (`stores/schoolStore.ts`)

Replace mock data with API calls (same pattern as students).

## Error Handling

The API service includes an interceptor for handling authentication errors:

```typescript
this.api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - redirect to login
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);
```

## Authentication Flow

1. User submits login credentials
2. API returns JWT token and user data
3. Token stored in localStorage and httpOnly cookie
4. Token automatically included in all subsequent requests via interceptor
5. Middleware checks token validity for protected routes
6. If token invalid/expired, user redirected to login

## CORS Configuration

Your backend API must allow requests from your Next.js application domain:

```javascript
// Example Express.js CORS configuration
app.use(
  cors({
    origin: "https://your-nextjs-app.com",
    credentials: true,
  })
);
```

## Testing

Use the demo credentials to test the frontend before connecting real APIs:

- **Admin**: admin@example.com / admin123
- **School**: school@example.com / school123

Once your backend is ready, update the stores to use real API calls and test thoroughly.

## Support

For questions or issues with API integration, contact: support@edupanel.com
