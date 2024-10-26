from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from ..db.base import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    schedules = relationship("Schedule", back_populates="location")