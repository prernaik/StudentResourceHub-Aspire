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

interface Comment {
  id: string;           // Unique identifier
  resourceId: string;   // Reference to Resource
  userId: string;       // Reference to User
  content: string;      // Comment text
  rating: number;       // 1-5 rating
  createdAt: Date;
}

{
  "username": "string (3-20 chars)",
  "email": "string (valid email)",
  "password": "string (min 8 chars)",
  "role": "student|teacher",
  "college": "string"
}

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

{
  "email": "string",
  "password": "string"
}

{
  "token": "JWT token",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string"
  }
}

{
  "title": "string",
  "description": "string",
  "content": "string (URL or text)",
  "type": "note|video|question_paper|project",
  "subject": "string",
  "semester": "number",
  "college": "string"
}

{
  "message": "Resource uploaded successfully",
  "resource": {
    "id": "string",
    "title": "string",
    "type": "string",
    "verified": false
  }
}

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

{
  "content": "string",
  "rating": "number (1-5)"
}

{
  "message": "Comment added successfully",
  "comment": {
    "id": "string",
    "content": "string",
    "rating": "number"
  }
}

{
  "verified": "boolean"
}

{
  "message": "Resource verification status updated"
}

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

{
  "error": "string (error name)",
  "message": "string (human-readable message)",
  "details": "object (optional additional details)"
}


