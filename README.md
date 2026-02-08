Perfect — here it is **clean, ready-to-paste in actual `.md` (Markdown) format**.
Just copy everything below and paste into your `README.md`.

---

````md
# DSV React CRUD Assignment

## Overview

This project is a React + TypeScript based CRUD (Create, Read, Update, Delete) web application to manage user data.  
It is designed with **extensibility in mind**, allowing new form fields to be added with minimal code changes using a **configuration-driven form schema**.

The application integrates with an API (JSON Server used for mock testing) and demonstrates clean architecture, reusable components, and proper async handling.

---

## Tech Stack

- React (Vite)
- TypeScript
- Bootstrap 5
- React Hook Form
- Axios
- React Toastify
- JSON Server (Mock API)

---

## Features Implemented

### User Form

Fields:

- First Name
- Last Name
- Phone Number
- Email Address

Each field supports:

- Required validation
- Email format validation
- Phone number validation

---

### CRUD Operations

- Create a new user
- Read (list all users)
- Update existing user
- Delete user (with confirmation)

---

### API Handling

- Axios service layer
- Loading states
- Error handling
- Toast notifications for success and failure

---

### Extensible Architecture

The form is generated using a **schema-based configuration**.

Form fields are defined in:

`src/config/userFormSchema.ts`

To add a new field (example: Date of Birth):

```ts
{
  name: "dob",
  label: "Date of Birth",
  type: "text",
  required: true
}
````

No UI or logic changes are required in components.

---

### UI/UX

* Clean and simple layout
* Responsive table design
* Modal-based Add/Edit form
* Delete confirmation prompt
* Mobile-friendly spacing and controls

---

## Project Structure

```
src/
├── components/
│   └── DynamicForm.tsx
├── config/
│   └── userFormSchema.ts
├── pages/
│   └── Users.tsx
├── services/
│   └── api.ts
├── types/
│   ├── user.ts
│   └── form.ts
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd dsv-react-crud
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Run Frontend

```bash
npm run dev
```

---

### 4. Run Mock API (JSON Server)

```bash
npm run server
```

API will run at:

`http://localhost:3001/users`

---

## Deployment

The frontend is deployed on Vercel.

Live Link:

`<your-vercel-link>`

---

## Design Decisions

* Used schema-driven form to ensure extensibility.
* Created a separate API service layer for clean architecture.
* Reusable DynamicForm component handles both Create and Update.
* Added loading, error, and toast states to simulate real production behavior.
* Used Bootstrap utilities for quick responsive layout.

---

## Assumptions

* Phone number considered valid if 10 digits.
* JSON Server used as mock backend.
* Basic validation implemented as per assignment scope.

---

## Bonus Implementations

* TypeScript for type safety
* Reusable architecture
* Confirmation before delete
* Responsive UI

````

---

### After this

1. Paste into `README.md`
2. Replace:

- `<your-repo-link>`
- `<your-vercel-link>`

3. Push:

```bash
git add .
git commit -m "Added professional README"
git push
````

---
