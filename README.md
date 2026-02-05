# SME Financial Health Assessment Tool

An AI-powered platform for small and medium enterprises to evaluate their financial health, identify risks, and get actionable growth recommendations.

## Features
- **📊 AI Financial Analysis**: Upload CSV/XLSX financial statements for automated processing.
- **📈 Industry Benchmarking**: Compare performance against industry standards (Manufacturing, Retail, Services, etc.).
- **🤖 Actionable Insights**: Get AI-driven recommendations based on cash flow and profitability.
- **🛡️ Secure By Design**: All financial data is encrypted at rest using AES-256 (Fernet).
- **🌐 Multilingual Support**: Reports available in English and Hindi.
- **📑 Investor-Ready Reporting**: Summarized metrics for bank/NBFC loan applications.

## Tech Stack
- **Frontend**: React.js (Vite), Glassmorphism UI, Vanilla CSS.
- **Backend**: FastAPI (Python), Pandas for data processing.
- **Database**: PostgreSQL support (SQLite for local demo).
- **Security**: Cryptography.io for encryption.

## Getting Started

### Backend
1. Navigate to `backend/`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the API: `python main.py`

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run the dashboard: `npm run dev`

## Usage
1. Click **"Download Sample Financial CSV"** on the dashboard.
2. Select your **Industry** and **Language**.
3. Upload the CSV to see the magic!
