from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from typing import List, Optional
from database import get_session
from models import Bug, BugStatus

router = APIRouter(prefix="/bugs", tags=["bugs"])

@router.post("/", response_model=Bug)
async def create_bug(bug: Bug, session: AsyncSession = Depends(get_session)):
    session.add(bug)
    await session.commit()
    await session.refresh(bug)
    return bug

@router.get("/", response_model=List[Bug])
async def read_bugs(
    offset: int = 0,
    limit: int = 100,
    status: Optional[BugStatus] = None,
    session: AsyncSession = Depends(get_session)
):
    query = select(Bug)
    if status:
        query = query.where(Bug.status == status)
    query = query.offset(offset).limit(limit)
    result = await session.execute(query)
    return result.scalars().all()

@router.get("/{bug_id}", response_model=Bug)
async def read_bug(bug_id: int, session: AsyncSession = Depends(get_session)):
    bug = await session.get(Bug, bug_id)
    if not bug:
        raise HTTPException(status_code=404, detail="Bug not found")
    return bug

@router.patch("/{bug_id}", response_model=Bug)
async def update_bug(bug_id: int, bug_update: Bug, session: AsyncSession = Depends(get_session)):
    db_bug = await session.get(Bug, bug_id)
    if not db_bug:
        raise HTTPException(status_code=404, detail="Bug not found")
    
    bug_data = bug_update.dict(exclude_unset=True)
    for key, value in bug_data.items():
        setattr(db_bug, key, value)
    
    session.add(db_bug)
    await session.commit()
    await session.refresh(db_bug)
    return db_bug

@router.delete("/{bug_id}")
async def delete_bug(bug_id: int, session: AsyncSession = Depends(get_session)):
    bug = await session.get(Bug, bug_id)
    if not bug:
        raise HTTPException(status_code=404, detail="Bug not found")
    await session.delete(bug)
    await session.commit()
    return {"ok": True}
