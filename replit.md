# BlogProject — Frontend

A React blog app where users can read, write, like, and manage blog posts. Built with React, Redux, Bootstrap, React Router, Formik, and Axios.

## Running the app

```
PORT=5000 BROWSER=none npm start
```

The workflow **"Start application"** is configured and runs this automatically. The app serves on port 5000.

## Changing the backend API

All API calls go to a single environment variable — **`REACT_APP_API_BASE_URL`** — set in the Replit Secrets/Environment panel.

**Current value:** `https://blog-app-spring-project.herokuapp.com`

To point to a different backend (e.g. a local Spring Boot server or a new Heroku deployment):
1. Go to the Replit **Secrets** panel (or Environment Variables)
2. Update `REACT_APP_API_BASE_URL` to your new base URL (no trailing slash)
3. Restart the workflow — the app picks it up on the next compile

The variable is consumed in:
- `src/services/AuthService.js`
- `src/services/AuthorService.js`
- `src/services/UserService.js`
- `src/services/LikedPostService.js`

## Stack

| Layer | Tech |
|---|---|
| UI | React 18, Bootstrap 5 |
| State | Redux + react-redux |
| Routing | React Router v6 |
| Forms | Formik + Yup |
| HTTP | Axios |
| Rich text | CKEditor 5 |
| Notifications | React Toastify |

## Pages

- `/` — Home page
- `/posts` — All posts (filterable, sortable, paginated)
- `/posts/:id` — Post detail + like
- `/create` — Create post (auth required)
- `/edit/:id` — Edit post (auth required)
- `/profile` — User profile with liked posts (auth required)
- `/login` — Login
- `/register` — Register

## User preferences

_None recorded yet._
