# How to Run EasyMove Elite

## 1. Install Node.js (if not already installed)

Download and install from: https://nodejs.org/en/download
Recommended: LTS version (v20 or v22)

Verify installation:
```
node -v
npm -v
```

## 2. Install Dependencies

Open a terminal (PowerShell or CMD) in this folder:
```
cd "d:\Работа\Moving\Автоматизация\easymove-elite"
npm install
```

## 3. Run the Development Server

```
npm run dev
```

The app will start at: http://localhost:3000

## 4. Open in Browser

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Homepage |
| http://localhost:3000/about | About page |
| http://localhost:3000/services | Services grid |
| http://localhost:3000/quote | Quote calculator |
| http://localhost:3000/contact | Contact form |
| http://localhost:3000/admin | Admin dashboard |
| http://localhost:3000/admin/login | Admin login |

## 5. Admin Login Credentials

Email: admin@easymove.com
Password: luxury2024

## 6. Data Storage

All data is stored in JSON files in the `data/` folder:
- `data/quotes.json` — submitted quotes
- `data/leads.json` — contact form submissions
- `data/services.json` — service catalog (auto-seeded on first run)

## 7. Build for Production

```
npm run build
npm start
```
