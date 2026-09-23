const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function getTickets(search = "", status = "") {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (status && status !== "All") {
    params.append("status", status);
  }

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/api/tickets?${queryString}`
    : `${API_URL}/api/tickets`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}

export async function createTicket(ticketData) {
  const response = await fetch(`${API_URL}/api/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }

  return response.json();
}

export async function getTicket(ticketId) {
  const response = await fetch(
    `${API_URL}/api/tickets/${ticketId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }

  return response.json();
}
export async function updateTicket(ticketId, updateData) {
  const response = await fetch(
    `${API_URL}/api/tickets/${ticketId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update ticket");
  }

  return response.json();
}