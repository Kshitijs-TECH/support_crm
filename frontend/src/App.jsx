import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import NewTicket from "./pages/NewTicket";
import TicketPage from "./pages/TicketPage";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const openTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    setCurrentPage("ticket");
  };

  const goToDashboard = () => {
    setCurrentPage("dashboard");
    setSelectedTicketId(null);
  };

  if (currentPage === "new-ticket") {
    return (
      <NewTicket
        onBack={goToDashboard}
      />
    );
  }

  if (currentPage === "ticket") {
    return (
      <TicketPage
        ticketId={selectedTicketId}
        onBack={goToDashboard}
      />
    );
  }

  return (
    <Dashboard
      onNewTicket={() => setCurrentPage("new-ticket")}
      onTicketClick={openTicket}
    />
  );
}

export default App;