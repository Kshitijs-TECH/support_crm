import React, { useEffect, useState } from "react";
import { getTicket, updateTicket } from "../api/tickets";
import TicketDetail from "../components/TicketDetail";

function TicketPage({ ticketId, onBack }) {
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadTicket() {
      try {
        setLoading(true);
        setError("");

        const data = await getTicket(ticketId);

        setTicket(data);
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTicket();
  }, [ticketId]);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      const result = await updateTicket(ticketId, {
        status,
        notes,
      });

      setSuccess(
        `Ticket updated successfully at ${result.updated_at}.`
      );

      const updatedTicket = await getTicket(ticketId);
      setTicket(updatedTicket);
      setNotes("");
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p className="state-message">Loading ticket...</p>
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="container">
        <div className="alert alert-error">Error: {error}</div>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Tickets
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Tickets
        </button>
      </div>

      <TicketDetail ticket={ticket} />

      <div className="card">
        <h2>Update Ticket</h2>

        <div className="form">
          <div className="form-group">
            <label htmlFor="ticket-status" className="form-label">
              Status
            </label>

            <select
              id="ticket-status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ticket-notes" className="form-label">
              Add Note
            </label>

            <textarea
              id="ticket-notes"
              className="form-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note or comment..."
              rows="4"
            />
          </div>

          {error && <div className="alert alert-error">Error: {error}</div>}

          {success && <div className="alert alert-success">{success}</div>}

          <button
            className="btn btn-primary"
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketPage;