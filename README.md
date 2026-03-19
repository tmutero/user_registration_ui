# User Registration UI

Angular application with Docker support for easy local development.

---

## 🚀 Run Locally

### Prerequisites
- Node.js (v20+)
- npm

### Steps
```bash
git clone <repository-url>
cd user-registration-ui
npm install
npm start
```

App runs at:  
👉 http://localhost:4200

---

## 🐳 Run with Docker

### Start
```bash
docker-compose up --build
```

### Run in background
```bash
docker-compose up -d
```

### Stop
```bash
docker-compose down
```

App runs at:  
👉 http://localhost:4200

---

## ⚙️ Environment (Optional)

Create `.env` file:
```env
DEV_PORT=4200
```

---

## 📦 Build

```bash
npm run build
```

---

## 📁 Key Files

- `Dockerfile.dev` – Dev container setup  
- `docker-compose.yml` – Run app with Docker  

---

