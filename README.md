# Support CRM

A full-stack customer support ticket management system built as part of the Datastraw Technologies AI + Tech Intern Assessment.

The application allows support teams to create, search, filter, view, update, and add notes to customer support tickets.

## Live Demo

- **Frontend:** https://support-crm-frontend-kqh4.onrender.com
- **Backend API:** https://support-crm-z7u8.onrender.com
- **API Documentation:** https://support-crm-z7u8.onrender.com/docs

## Features

- Create customer support tickets
- Automatically generate ticket IDs
- List all support tickets
- Search tickets by:
  - Customer name
  - Ticket ID
  - Customer email
  - Description
- Filter tickets by status:
  - Open
  - In Progress
  - Closed
- View complete ticket details
- Update ticket status
- Add notes/comments to tickets
- Persist ticket and note data in SQLite
- Responsive and professional React interface

## Tech Stack

### Frontend

- React
- Vite
- Plain CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic

### Database

- SQLite

## Architecture

The application follows a simple three-layer architecture:

```text
React Frontend
      |
      | HTTP / REST API
      v
FastAPI Backend
      |
      | SQLAlchemy
      v
SQLite Database