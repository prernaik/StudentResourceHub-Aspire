# API Contract for Aspire - Student Resource Hub

## Data Models

### User
```typescript
interface User {
  id: string;           // Unique identifier
  username: string;     // Display name
  email: string;        // Unique email
  password: string;     // Hashed password
  role: 'student' | 'teacher' | 'admin';
  points: number;       // Contribution points
  createdAt: Date;
  updatedAt: Date;
}
```

### Resource
```typescript
interface Resource {
  id: string;           // Unique identifier
  title: string;        // Resource title
  description: string;  // Short description
  content: string;      // URL or text content
  type: 'note' | 'video' | 'question_paper' | 'project';
  subject: string;      // Subject/category
  semester: number;     // Academic semester
  college: string;      // College name
  uploaderId: string;   // Reference to User
  verified: boolean;    // Teacher-verified status
  createdAt: Date;
  updatedAt: Date;
}
```
### Comment
```typescript
interface Comment {
  id: string;           // Unique identifier
  resourceId: string;   // Reference to Resource
  userId: string;       // Reference to User
  content: string;      // Comment text
  rating: number;       // 1-5 rating
  createdAt: Date;
}
```

## API Endpoints
### 1. Authentication
#### Register User
Feature: User Registration,
Method: POST,
Endpoint: /api/auth/register,
Request Body:
```typescript
{
  "username": "string (3-20 chars)",
  "email": "string (valid email)",
  "password": "string (min 8 chars)",
  "role": "student|teacher",
  "college": "string"
}
```

#### Success Response (201):
```typescript
{
  "message": "Registration successful",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "college": "string"
  }
}
```
#### Error Responses:
400: Invalid input,
409: Email already exists

### Login User
#### Feature: User Login
Method: POST,
Endpoint: /api/auth/login,
Request Body:
```typescript
{
  "email": "string",
  "password": "string"
}
```
#### Success Response (200):

```typescript
{
  "token": "JWT token",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string"
  }
}
```
#### Error Responses:
400: Missing credentials,
401: Invalid credentials

### 2. Resources
#### Upload Resource
Feature: Upload Study Material,
Method: POST,
Endpoint: /api/resources,
Headers: Authorization: Bearer <token>,
Request Body:
```typescript
{
  "title": "string",
  "description": "string",
  "content": "string (URL or text)",
  "type": "note|video|question_paper|project",
  "subject": "string",
  "semester": "number",
  "college": "string"
}
```
#### Success Response (201):
```typescript
{
  "message": "Resource uploaded successfully",
  "resource": {
    "id": "string",
    "title": "string",
    "type": "string",
    "verified": false
  }
}
```
#### Get All Resources
##### Feature: Browse Resources
##### Method: `GET`
##### Endpoint: `/api/resources`
##### Query Params:
###### `?type=` Filter by type
###### `?subject=` Filter by subject
###### `?semester=` Filter by semester
###### `?college=` Filter by college
###### `?verified=` true/false
##### Success Response (200):
```typescript
{
  "resources": [
    {
      "id": "string",
      "title": "string",
      "type": "string",
      "subject": "string",
      "semester": "number",
      "uploader": {
        "username": "string",
        "role": "string"
      },
      "verified": "boolean",
      "createdAt": "ISO date"
    }
  ]
}
```
#### Get Single Resource
##### Feature: View Resource Details
##### Method: GET
##### Endpoint: /api/resources/:id
##### Success Response (200):
```typescript
{
  "resource": {
    "id": "string",
    "title": "string",
    "description": "string",
    "content": "string",
    "type": "string",
    "subject": "string",
    "semester": "number",
    "uploader": {
      "id": "string",
      "username": "string",
      "role": "string"
    },
    "verified": "boolean",
    "createdAt": "ISO date",
    "comments": [
      {
        "id": "string",
        "content": "string",
        "rating": "number",
        "user": {
          "username": "string"
        },
        "createdAt": "ISO date"
      }
    ]
  }
}
```

### 3. Comments & Ratings
#### Add Comment
##### Feature: Comment on Resource
##### Method: POST
##### Endpoint: /api/resources/:id/comments
##### Headers: Authorization: Bearer <token>
##### Request Body:
```typescript
{
  "content": "string",
  "rating": "number (1-5)"
}
```
##### Success Response (201):
```typescript
{
  "message": "Comment added successfully",
  "comment": {
    "id": "string",
    "content": "string",
    "rating": "number"
  }
}
```
### 4. Verification
##### Verify Resource (Teacher Only)
##### Feature: Verify Resource
##### Method: PATCH
##### Endpoint: /api/resources/:id/verify
##### Headers: Authorization: Bearer <token>
##### Request Body:
```typescript
{
  "verified": "boolean"
}
```
##### Success Response (200):
```typescript
{
  "message": "Resource verification status updated"
}
```

### 5. User & Community
#### Get User Profile
##### Feature: View User Profile
##### Method: GET
##### Endpoint: /api/users/:id
##### Success Response (200):
```typescript
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "college": "string",
    "points": "number",
    "createdAt": "ISO date"
  },
  "contributions": [
    {
      "id": "string",
      "title": "string",
      "type": "string",
      "verified": "boolean",
      "createdAt": "ISO date"
    }
  ]
}
```
#### Get Leaderboard
##### Feature: View Top Contributors
#####  Method: GET
##### Endpoint: /api/leaderboard
#####  Query Params: ?college= Filter by college
#####  Success Response (200):
```typescript
{
  "leaderboard": [
    {
      "rank": "number",
      "user": {
        "id": "string",
        "username": "string",
        "role": "string"
      },
      "points": "number",
      "resourcesCount": "number"
    }
  ]
}
```
### Error Responses
#### All error responses follow this format:
```typescript
{
  "error": "string (error name)",
  "message": "string (human-readable message)",
  "details": "object (optional additional details)"
}
```
#### Common error codes:
##### 400 Bad Request - Invalid input data
##### 401 Unauthorized - Missing/Invalid token
##### 403 Forbidden - Not authorized for action
##### 404 Not Found - Resource not found
##### 500 Server Error - Internal server error

