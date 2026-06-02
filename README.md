# Stepper Form Backend

Backend service for a configurable stepper form system built with Node.js, Express, MongoDB, and Mongoose.

## Features

### Dynamic Form Configuration

Form structure is managed from the database.

A form contains:

- Multiple steps
- Multiple fields per step
- Field validations
- Required field rules

Supported field types:

- Text
- Select
- Radio

### Submission Management

Users can:

- Create submissions
- Save drafts
- Continue drafts later
- Complete forms
- Track progress

### User Identification

Authentication was not required for the assignment.

To support multiple users:

- A UUID is generated when a user creates their first submission
- The UUID is stored in browser local storage
- Future submissions are linked using the same UUID

This prevents users from seeing each other's submissions.

### Validation

The backend validates:

- Required fields
- Invalid step indexes
- Invalid field values
- Missing form configurations
- Invalid submissions

### Progress Tracking

Each submission stores:

- Current step
- Completed steps
- Submission status

Progress is calculated as:

```txt
completedSteps / totalSteps
```

## Architecture

Project structure follows:

```txt
Routes
↓
Controllers
↓
Services
↓
DAL (Data Access Layer)
↓
MongoDB
```

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Running Locally

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run development server:

```bash
npm run dev
```

## API Overview

### Config APIs

- Get all form configurations

### Submission APIs

- Create submission
- Get all submissions
- Get submission by id
- Update submission step
- Save draft
- Submit form
