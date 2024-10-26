from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal
from typing import Optional

class ScheduleBase(BaseModel):
    date: datetime
    start_time: datetime
    end_time: datetime
    location_id: int
    hours: Decimal
    available_time_blocks: Optional[str] = None

class ScheduleCreate(ScheduleBase):
    pass

class Schedule(ScheduleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True