import React, { useState } from "react";

function TicketForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit(formData);

    setFormData({
      customer_name: "",
      customer_email: "",
      subject: "",
      description: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="customer_name" className="form-label">
          Customer Name
        </label>
        <input
          id="customer_name"
          name="customer_name"
          type="text"
          className="form-input"
          value={formData.customer_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customer_email" className="form-label">
          Customer Email
        </label>
        <input
          id="customer_email"
          name="customer_email"
          type="email"
          className="form-input"
          value={formData.customer_email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="form-label">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="form-input"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="form-textarea"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create Ticket"}
      </button>
    </form>
  );
}

export default TicketForm;