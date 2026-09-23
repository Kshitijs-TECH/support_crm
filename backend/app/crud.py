import uuid
from sqlalchemy.orm import Session
from sqlalchemy import or_, func

from . import models
from . import schemas


ALLOWED_STATUSES = {"Open", "In Progress", "Closed"}


def create_ticket(db: Session, ticket_data: schemas.TicketCreate):
    """
    Create a new support ticket.
    """

    ticket = models.Ticket(
        ticket_id=f"TEMP-{uuid.uuid4().hex}",
        customer_name=ticket_data.customer_name,
        customer_email=ticket_data.customer_email,
        subject=ticket_data.subject,
        description=ticket_data.description,
        status="Open",
    )

    db.add(ticket)
    db.flush()

    # Replace temporary ID with the final human-readable ticket ID
    ticket.ticket_id = f"TKT-{ticket.id:03d}"

    db.commit()
    db.refresh(ticket)

    return ticket


def get_tickets(
    db: Session,
    status: str | None = None,
    search: str | None = None
):
    """
    Get all tickets with optional status filtering
    and search functionality.
    """

    query = db.query(models.Ticket)

    # Filter by status
    if status:
        status = status.strip()
        if status not in ALLOWED_STATUSES:
            return []
        query = query.filter(
            func.lower(models.Ticket.status) == status.lower()
        )

    # Search across name, ticket ID, email and description
    if search:
        search_term = f"%{search}%"

        query = query.filter(
            or_(
                models.Ticket.customer_name.ilike(search_term),
                models.Ticket.ticket_id.ilike(search_term),
                models.Ticket.customer_email.ilike(search_term),
                models.Ticket.description.ilike(search_term),
            )
        )

    return query.order_by(models.Ticket.created_at.desc()).all()


def get_ticket(db: Session, ticket_id: str):
    """
    Get one ticket using its human-readable ticket ID.
    """

    return (
        db.query(models.Ticket)
        .filter(models.Ticket.ticket_id == ticket_id)
        .first()
    )


def update_ticket(
    db: Session,
    ticket: models.Ticket,
    ticket_data: schemas.TicketUpdate
):
    """
    Update ticket status and/or add a note.
    """

    # Update status if provided
    if ticket_data.status is not None:

        if ticket_data.status not in ALLOWED_STATUSES:
            raise ValueError(
                "Status must be Open, In Progress, or Closed"
            )

        ticket.status = ticket_data.status

    # Add note if provided
    if ticket_data.notes:
        note = models.Note(
            ticket_id=ticket.id,
            note_text=ticket_data.notes
        )

        db.add(note)

    db.commit()
    db.refresh(ticket)

    return ticket