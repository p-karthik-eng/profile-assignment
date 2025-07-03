# Profile Management Application

A modern React + TypeScript application for managing user profiles, featuring robust form validation, API integration, error handling, and persistent state using Redux Toolkit and localStorage. Styled with Material-UI (MUI) for a clean, responsive UI.

---

## 🚀 Features

- **Profile Form**: Create and update user profiles with validation (Name, Email, Age).
- **Profile Display**: View, edit, or delete your profile with confirmation dialogs.
- **Routing**: Seamless navigation using React Router (`/profile-form`, `/profile`, custom 404).
- **API Integration**: Uses `json-server` as a mock backend for CRUD operations.
- **Global State**: Redux Toolkit manages profile and API status across the app.
- **Persistence**: Profile data is saved in localStorage for persistence across refreshes.
- **Environment Variables**: Easily switch API base URLs for development/production.
- **Material-UI**: Responsive, accessible, and visually appealing UI components.
- **Error Handling**: All API and validation errors are handled gracefully with dialogs and notifications.

---

## 🛠️ Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/Yasvanth-2005/profile-assignment
cd assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:3001/users
```

You can adjust this URL for production as needed.

### 4. Start the mock API server

```bash
npm run server
```

This runs `json-server` on `http://localhost:3001`.

### 5. Start the development server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for production

```bash
npm run build
npm run preview
```

---

## 🧑‍💻 Approach & Optimizations

### State Management & Persistence

- **Redux Toolkit** is used for global state management, ensuring all profile data and API statuses are accessible throughout the app.
- **localStorage** is used for data persistence. On app load, the profile is loaded from localStorage if available, ensuring the user's data persists across page refreshes and browser restarts.

### API Integration

- All profile CRUD operations (create, update, delete) are performed via RESTful API calls to a mock backend (`json-server`).
- The API base URL is configured via environment variables, making it easy to switch between development and production environments.

### Form Handling & Validation

- The profile form uses strong validation:
  - Name: Required, minimum 3 characters.
  - Email: Required, must be valid.
  - Age: Optional, must be a number if provided.
- Errors are shown inline and via MUI Snackbar for a smooth user experience.

### Routing

- **React Router** is used for navigation between the profile form, profile display, and a custom 404 page.
- Invalid routes automatically redirect to the 404 page.

### UI/UX

- **Material-UI (MUI)** provides a modern, accessible, and responsive design.
- All dialogs (delete confirmation, errors) use MUI's Dialog component for consistency and better UX.
- Buttons use icons and color coding for clarity.
- The form and dialogs are centered and styled for a professional look.

### Error Handling

- All API and validation errors are caught and displayed using MUI Dialogs or Snackbars, never as raw alerts.
- The app gracefully handles missing data, failed API calls, and invalid routes.

### Environment Variables

- The app uses Vite's environment variable system (`VITE_API_URL`) to configure the API endpoint.
- Easily switch between development and production by changing the `.env` file.

---

## 📁 File Structure

- `src/pages/`: Contains all main pages (ProfileForm, ProfilePage, PageNotFound).
- `src/store/`: Redux Toolkit slices and store setup.
- `src/utils/`: API utilities and localStorage helpers.
- `public/`: Static assets.
- `db.json`: Mock database for `json-server`.

---

## 📝 Notes

- The app is fully typed with TypeScript for safety and maintainability.
- All state changes and API calls are reflected in both Redux and localStorage for consistency.
- The UI is designed to be clean, accessible, and user-friendly.

---

## 🧑‍🏫 Assignment Requirements Coverage

- [x] TypeScript and .tsx components
- [x] Form validation and error handling
- [x] API integration with mock backend
- [x] Redux Toolkit for global state
- [x] Data persistence with localStorage
- [x] Routing with React Router
- [x] Environment variable configuration
- [x] MUI for styling and dialogs
- [x] Edit and Delete profile with confirmation
- [x] Custom 404 page

---

## 🛣️ Deployment

- To deploy, build the app with `npm run build` and deploy the `dist` folder to your preferred hosting (e.g., Vercel).
- Ensure your production `.env` is set with the correct API URL.

---

Feel free to reach out if you have any questions or need further improvements!
