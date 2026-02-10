from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routers import tasks, bugs

app = FastAPI(title="Task & Bug Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await init_db()

app.include_router(tasks.router)
app.include_router(bugs.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Task & Bug Tracker API"}
