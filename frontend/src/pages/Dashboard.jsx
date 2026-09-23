import React, { useEffect, useState } from "react";
import { getTickets } from "../api/tickets";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import TicketList from "../components/TicketList";

function Dashboard({ onNewTicket, onTicketClick }) {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTickets() {
      try {
        setLoading(true);
        setError("");

        const data = await getTickets(searchTerm, selectedStatus);
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, [searchTerm, selectedStatus]);

  // Summary counts come from the `tickets` array we already have in state —
  // no extra API call. Because `tickets` reflects whatever search/status
  // filter is currently active, these numbers describe the CURRENT VIEW,
  // not the whole database. That's a deliberate tradeoff (see note below).
  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === "Open").length;
  const inProgressCount = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;
  const closedCount = tickets.filter((t) => t.status === "Closed").length;

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1>Support CRM</h1>
            <p className="page-subtitle">
              Manage and track customer support requests
            </p>
          </div>

          <button className="btn btn-primary" onClick={onNewTicket}>
            + New Ticket
          </button>
        </div>

        <div className="summary-grid">
          <div className="card">
            <div className="summary-card-label">Total Tickets</div>
            <div className="summary-card-value">{totalCount}</div>
          </div>
          <div className="card">
            <div className="summary-card-label">Open</div>
            <div className="summary-card-value">{openCount}</div>
          </div>
          <div className="card">
            <div className="summary-card-label">In Progress</div>
            <div className="summary-card-value">{inProgressCount}</div>
          </div>
          <div className="card">
            <div className="summary-card-label">Closed</div>
            <div className="summary-card-value">{closedCount}</div>
          </div>
        </div>

        <div className="filters-bar">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <StatusFilter
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </div>
      </div>

      {loading && <p className="state-message">Loading tickets...</p>}

      {error && <div className="alert alert-error">Error: {error}</div>}

      {!loading && !error && (
        <TicketList tickets={tickets} onTicketClick={onTicketClick} />
      )}
    </div>
  );
}

export default Dashboard;