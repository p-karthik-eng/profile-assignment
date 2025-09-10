

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

