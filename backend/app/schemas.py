from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class TicketCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str


class NoteResponse(BaseModel):
    id: int
    note_text: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TicketResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str
    status: str
    created_at: datetime
    updated_at: datetime
    notes: list[NoteResponse] = []

    model_config = ConfigDict(from_attributes=True)


class TicketListResponse(BaseModel):
    ticket_id: str
    customer_name: str
    subject: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TicketUpdate(BaseModel):
    status: str | None = None
    notes: str | None = None


class TicketCreateResponse(BaseModel):
    ticket_id: str
    created_at: datetime


class TicketUpdateResponse(BaseModel):
    success: bool
    updated_at: datetime