import React from "react";

function StatusFilter({ selectedStatus, onStatusChange }) {
  const statuses = ["All", "Open", "In Progress", "Closed"];

  return (
    <div className="form-group">
      <label htmlFor="status-filter" className="form-label">
        Filter by Status
      </label>

      <select
        id="status-filter"
        className="form-select"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StatusFilter;