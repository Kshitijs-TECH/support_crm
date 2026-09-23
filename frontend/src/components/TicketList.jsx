import React from "react";

function getStatusBadgeClass(status) {
  if (status === "Open") return "badge-open";
  if (status === "In Progress") return "badge-in-progress";
  if (status === "Closed") return "badge-closed";
  return "";
}

function TicketList({ tickets, onTicketClick }) {
  if (tickets.length === 0) {
    return <p className="state-message">No tickets found.</p>;
  }

  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <div
          key={ticket.ticket_id}
          className="ticket-card card"
          onClick={() => onTicketClick(ticket.ticket_id)}
        >
          <div className="ticket-card-top">
            <span className="ticket-id">{ticket.ticket_id}</span>
            <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          <h3 className="ticket-subject">{ticket.subject}</h3>

          <div className="ticket-meta">
            Customer: {ticket.customer_name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketList;