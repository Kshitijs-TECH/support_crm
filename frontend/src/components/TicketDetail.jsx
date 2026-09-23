import React from "react";

function getStatusBadgeClass(status) {
  if (status === "Open") return "badge-open";
  if (status === "In Progress") return "badge-in-progress";
  if (status === "Closed") return "badge-closed";
  return "";
}

function TicketDetail({ ticket }) {
  if (!ticket) {
    return <p className="state-message">No ticket selected.</p>;
  }

  return (
    <div>
      <div className="detail-header">
        <div className="ticket-card-top">
          <span className="ticket-id">{ticket.ticket_id}</span>
          <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>
        <h1 className="ticket-subject">{ticket.subject}</h1>
      </div>

      <div className="detail-grid">
        <div className="card">
          <h3>Customer Information</h3>
          <p className="ticket-meta">Name: {ticket.customer_name}</p>
          <p className="ticket-meta">Email: {ticket.customer_email}</p>
        </div>

        <div className="card">
          <h3>Description</h3>
          <p>{ticket.description}</p>
        </div>

        <div className="card">
          <h3>Notes</h3>

          {ticket.notes && ticket.notes.length > 0 ? (
            <div>
              {ticket.notes.map((note) => (
                <div key={note.id} className="note-item">
                  <p>{note.note_text}</p>
                  <div className="note-timestamp">{note.created_at}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="state-message">No notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;