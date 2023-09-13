# GetMeTherapy - Appointment Scheduling Web Application
![GetMeTherapy Logo](https://getmetherapy.com/images/logo.webp)

This is a Web Application is a comprehensive solution designed to simplify and streamline the process of booking appointments with consultants, professionals, or service providers. This platform caters to both users seeking appointments and consultants managing their schedules, offering a seamless experience for all stakeholders involved. 


# Features
### User Registration and Authentication
- Create an account with your name, email, password and role(user/consultant).
- Secure authentication to protect your account.
- Contains a different dashboard for consultant and user.

### Appointment Booking
- Users can browse available appointments from consultants.
- Select your preferred time slot and date for booking.

### Availability Management
- Consultants can manage their available time slots and dates.
- Set break times and leave dates when unavailable.

### Email Notifications
- Receive email confirmations with booking details, including time and date.

### JWT Authentication
- JSON Web Tokens for secure user authentication and authorization.

### CORS Configuration
- Cross-Origin Resource Sharing (CORS) configured for secure API access.
### Error Handling
- Provides meaningful error messages and responses for better user experience.
### Beautiful UI/UX Design
- **Calendar View:** Visualize available dates and appointments.
- **Visual Feedback:** Animations and transitions for user interactions.
- **Smooth Booking Process:** Step-by-step booking with animations.


# Installation Steps

To install and run the GetMeTherapy appointment scheduling web application locally, which consists of separate frontend and backend folders, follow these steps:

### Clone the Repository:

```bash
  git clone https://github.com/ronitahuja/Get-Me-Therapy.git
```

### Install Backend Dependencies:
navigate to backend folder:
```bash
cd Get-Me-Therapy/backend
```
Install Node.js dependencies:
```bash
npm install
```
### Database Setup:
Create a database using MySQL(command-line or GUI) with database name as getmetherapy.
```bash
CREATE DATABASE getmetherapy;
```
### Start the Backend Server:
```bash
npm start
```
### Install Frontend Dependencies:
navigate to frontend folder by starting another terminal in Get-Me-Therapy directory:
```bash
cd frontend
```
Install Node.js dependencies:
```bash
npm install
```
### Start the Frontend Server:
```bash
npm start
```
### Access the application:
open your web browser and visit http://localhost:3000 to access the web application.You can now use and test the application locally.

    
