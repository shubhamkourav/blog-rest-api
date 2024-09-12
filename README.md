# Blogging API

This is a simple **Blogging API** built with **Node.js**, **Express**, and **MongoDB** using **Mongoose** as an ORM. This API allows users to perform CRUD operations on blog posts, including searching, filtering, and viewing popular posts.

## Features

- Create, Read, Update, Delete (CRUD) blog posts.
- Search blogs by title or content.
- Filter blogs by category or tag.
- Paginate blog posts.
- Get blogs by date range.
- Track and increment view count for blog posts.
- Sort blog posts by popularity (based on view count).

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (>=12.x)
- **MongoDB** (running locally or a MongoDB Atlas instance)

### Installation
1. Clone this repository:

    ```bash
    git clone https://github.com/your-username/blogging-api.git
    cd blogging-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```
3. Create a .env file for your environment variables:

    ```bash
    touch .env
    ```
4. Add your MongoDB URI:

    ```bash
    MONGODB_URI=mongodb://localhost:27017/blog_db
    PORT=3000
    ```
### Running the Server

Start the server in development mode:

```bash
    npm run dev
```
The server will start on http://localhost:3000.

### Routes
| Method | Endpoint                                                       | Description                                  |
|--------|-----------------------------------------------------------------|----------------------------------------------|
| GET    | `/api/blogs`                                                    | Get all blogs with pagination                |
| GET    | `/api/blogs/:id`                                                | Get a single blog by ID                      |
| POST   | `/api/blogs`                                                    | Create a new blog                            |
| PUT    | `/api/blogs/:id`                                                | Update an existing blog by ID                |
| DELETE | `/api/blogs/:id`                                                | Delete a blog by ID                          |
| GET    | `/api/blogs/search?q=keyword`                                   | Search blogs by title or content             |
| GET    | `/api/blogs/category/:category`                                 | Filter blogs by category                     |
| GET    | `/api/blogs/tag/:tag`                                           | Get blogs by tag                             |
| GET    | `/api/blogs/date-range?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` | Get blogs within a date range                |
| GET    | `/api/blogs/popularity`                                         | Get blogs sorted by popularity (views)       |
| PUT    | `/api/blogs/:id/views`                                          | Increment the view count of a blog post      |

### Request/Response Example
#### Create a Blog
- POST ```/api/blogs```

Request Body:

```bash
{
    "title": "First Blog Post",
    "content": "This is the content of the first blog post.",
    "category": "Technology",
    "tags": ["tech", "coding"]
}
```
Response:

```bash
{
    "_id": "60e70e4f33b5b22d4411c998",
    "title": "First Blog Post",
    "content": "This is the content of the first blog post.",
    "category": "Technology",
    "tags": ["tech", "coding"],
    "views": 0,
    "createdAt": "2023-09-11T09:29:51.018Z",
    "updatedAt": "2023-09-11T09:29:51.018Z"
}
```
### Error Handling
The API uses HTTP status codes to indicate success or failure of the requests:

- ```200 OK``` – Success
- ```201 Created``` – Resource created successfully
- ```400 Bad Request``` – Validation or client error
- ```404 Not Found``` – Resource not found
- ```500 Internal Server Error``` – Server error

### Folder Structure

```bash
├── app
│   ├── controllers
│   │   └── blog.js          # Blog controller for handling blog logic
│   ├── models
│   │   └── blog.js          # Blog Mongoose model
│   └── routes
│       └── blog.js          # Blog route definitions
├── server.js                # Main server file
├── package.json             # Node.js package configuration
├── .env                     # Environment variables (not committed)
└── README.md                # Documentation
```

### Dependencies
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose**: Elegant MongoDB object modeling for Node.js.
- **dotenv**: Loads environment variables from a .env file.

### Dev Dependencies
**nodemon**: Automatically restarts the server on file changes.

## Project URL

For more details this project is inspired from roadmap.sh: [Blogging Platform API on roadmap.sh](https://roadmap.sh/projects/blogging-platform-api)

