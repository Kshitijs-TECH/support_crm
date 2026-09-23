import React, { useState } from "react";
import TicketForm from "../components/TicketForm";
import { createTicket } from "../api/tickets";

function NewTicket({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateTicket = async (formData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const result = await createTicket(formData);

      setSuccess(
        `Ticket ${result.ticket_id} created successfully.`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Tickets
        </button>

        <div className="page-header-top">
          <div>
            <h1>Create New Ticket</h1>
            <p className="page-subtitle">
              Enter the customer's support request below.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          Error: {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <div className="card">
        <TicketForm
          onSubmit={handleCreateTicket}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default NewTicket;