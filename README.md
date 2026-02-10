# TaskMaster - Task & Bug Tracker

## Prerequisites
- Node.js (v18+)
- Python (v3.9+)

## Setup Instructions

### 1. Backend (FastAPI)
Navigate to the `backend` directory:
```bash
cd backend
```

Create a virtual environment (optional but recommended):
```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# Unix/MacOS
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the server:
```bash
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Frontend (Next.js)
Navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## Features
- Task Dashboard
- Bug Tracking
- Dark Mode UI with Tailwind CSS
- Real-time updates (simulated)
