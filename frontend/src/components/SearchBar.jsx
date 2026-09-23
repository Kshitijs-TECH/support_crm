import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="form-group">
      <label htmlFor="search-input" className="form-label">
        Search Tickets
      </label>
      <input
        id="search-input"
        type="text"
        className="form-input"
        placeholder="Search by subject, customer name, ticket ID..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;