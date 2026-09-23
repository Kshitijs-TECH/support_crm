from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db


router = APIRouter(
    prefix="/api/tickets",
    tags=["Tickets"]
)


@router.post(
    "",
    response_model=schemas.TicketCreateResponse,
    status_code=201
)
def create_ticket(
    ticket: schemas.TicketCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new support ticket.
    """

    return crud.create_ticket(db, ticket)


@router.get(
    "",
    response_model=list[schemas.TicketListResponse]
)
def list_tickets(
    status: str | None = Query(default=None),
    search: str | None = Query(default=None),
    db: Session = Depends(get_db)
):
    """
    Get all tickets with optional search and status filtering.
    """

    return crud.get_tickets(
        db=db,
        status=status,
        search=search
    )


@router.get(
    "/{ticket_id}",
    response_model=schemas.TicketResponse
)
def get_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):
    """
    Get a single ticket by ticket ID.
    """

    ticket = crud.get_ticket(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


@router.put(
    "/{ticket_id}",
    response_model=schemas.TicketUpdateResponse
)
def update_ticket(
    ticket_id: str,
    ticket_data: schemas.TicketUpdate,
    db: Session = Depends(get_db)
):
    """
    Update ticket status and/or add a note.
    """

    ticket = crud.get_ticket(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    try:
        updated_ticket = crud.update_ticket(
            db=db,
            ticket=ticket,
            ticket_data=ticket_data
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    return {
        "success": True,
        "updated_at": updated_ticket.updated_at
    }