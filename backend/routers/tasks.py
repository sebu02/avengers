from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from typing import List, Optional
from database import get_session
from models import Task, TaskStatus

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/", response_model=Task)
async def create_task(task: Task, session: AsyncSession = Depends(get_session)):
    session.add(task)
    await session.commit()
    await session.refresh(task)
    return task

@router.get("/", response_model=List[Task])
async def read_tasks(
    offset: int = 0,
    limit: int = 100,
    status: Optional[TaskStatus] = None,
    session: AsyncSession = Depends(get_session)
):
    query = select(Task)
    if status:
        query = query.where(Task.status == status)
    query = query.offset(offset).limit(limit)
    result = await session.execute(query)
    return result.scalars().all()

@router.get("/{task_id}", response_model=Task)
async def read_task(task_id: int, session: AsyncSession = Depends(get_session)):
    task = await session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.patch("/{task_id}", response_model=Task)
async def update_task(task_id: int, task_update: Task, session: AsyncSession = Depends(get_session)):
    db_task = await session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task_data = task_update.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
    
    session.add(db_task)
    await session.commit()
    await session.refresh(db_task)
    return db_task

@router.delete("/{task_id}")
async def delete_task(task_id: int, session: AsyncSession = Depends(get_session)):
    task = await session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    await session.delete(task)
    await session.commit()
    return {"ok": True}
