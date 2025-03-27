# Product Delivery Status Tracker

A streamlined logistics tracking application built with **Next.js** (Frontend) and **FastAPI** (Backend) that monitors product deliveries across FedEx and DHL carriers.

## Overview

This application tracks shipments, compares carrier performance, and provides real-time updates on the status of deliveries. The goal was to build core functionality within 48 hours, focusing on simplicity and efficiency.

### Features
- **Frontend** (Next.js with Shadcn UI):
  - Dashboard view with delivery success rate, recent shipments, and carrier performance comparison.
  - Shipment creation form with Zod validation.
  - Shipment list with filtering by carrier and status.
  - Responsive layout with toast notifications for actions.
  
- **Backend** (FastAPI):
  - Core API endpoints for managing shipments.
  - Mock carrier simulation to randomly update shipment statuses.
  - Basic delivery metrics calculation.
  - CORS-enabled for frontend communication.


## Project Setup

### Prerequisites

- Node.js (for frontend)
- Python 3.x (for backend)
- FastAPI
- Pydantic (for data validation)
- Shadcn UI (for frontend components)
- Zod (for frontend validation)
- Vercel / Render (for deployment)

### Frontend Setup (Next.js)
1. Clone the repository:
   ```bash
   git clone https://github.com/Dilukshan16/delivery-tracker.git
   cd product-delivery-tracker/frontend
