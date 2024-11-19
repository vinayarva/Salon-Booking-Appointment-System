# Salon Appointment Booking System - API Documentation

The **Salon Appointment Booking System** is designed to simplify salon operations by providing efficient management of services, appointments, availability, and user roles. This API ensures seamless booking, service management, and communication with integrated email notifications .

### Key Features:
1. **User Management:**
   - Authentication and role-based access control for admins, staff, and customers.
   - User profile management.

2. **Service Management:**
   - CRUD operations for salon services.
   - Support for dynamic pricing and detailed descriptions.

3. **Appointment Booking:**
   - Book, fetch, and update appointments for customers.
   - Admin and staff tools for managing appointment statuses.

4. **Availability Management:**
   - Real-time availability updates and time-slot management.
   - Prevents overbooking with intelligent time-slot allocation.

5. **Payment Integration:**
   - Payment processing for services.
   - Payment verification .

6. **Email Notifications:**
   - Automated email notifications for:
     - **Appointment Confirmation**: Sent when a booking is made.
     - **Appointment Updates**: Sent for changes in status (e.g., confirmed, canceled).

7. **Admin Dashboard:**
   - Overview of all appointments, services, and availability.
   - Manage staff roles and permissions.



## Authentication
All routes require authentication (`Authenticate` middleware). Ensure the client includes valid authentication headers.

# Salon Appointment Booking System - API Documentation

This documentation outlines the API endpoints and data models used in the **Salon Appointment Booking System**, which allows users to manage appointments, services, and employee availability.

---

## **Authentication Routes**

### **Login (User)**
- **Endpoint:** `POST /login`
- **Description:** User login.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt-token"
  }
  ```

### **Sign Up (User)**
- **Endpoint:** `POST /signup`
- **Description:** User registration.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890"
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Signup successful",
    "userId": 1
  }
  ```

---

## **Admin Routes**

### **Admin Login**
- **Endpoint:** `POST /admin/login`
- **Description:** Admin login.
- **Request Body:** Same as User Login.

### **Add Employee**
- **Endpoint:** `POST /admin/addEmployee`
- **Description:** Add a new employee.
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "speciality": "stylist"
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Employee added successfully",
    "employeeId": 1
  }
  ```

### **Update Employee**
- **Endpoint:** `PUT /admin/updateEmployee/:id`
- **Description:** Update an employee's details by ID.
- **Request Body:**
  ```json
  {
    "name": "Jane Smith",
    "speciality": "manicure"
  }
  ```

### **Fetch All Employees**
- **Endpoint:** `GET /admin/getEmployee`
- **Description:** Retrieve a list of all employees.

### **Fetch Employee by ID**
- **Endpoint:** `GET /admin/editEmployee/:id`
- **Description:** Retrieve details of an employee by their ID.

### **Delete Employee**
- **Endpoint:** `DELETE /admin/deleteEmployee/:id`
- **Description:** Delete an employee by their ID.

---

## **Availability Routes**

### **Fetch Availability**
- **Endpoint:** `GET /fetchAvailability`
- **Description:** Fetch available time slots for the authenticated user.
- **Response Example:**
  ```json
  {
    "date": "2024-11-20",
    "employeeID": 1,
    "availability": {
      "10:00": true,
      "11:00": true,
      "12:00": true,
      "13:00": false,
      "14:00": true
    }
  }
  ```

### **Fetch All Availability (Admin)**
- **Endpoint:** `GET /admin/fetchAvailabilityALL`
- **Description:** Fetch all employees' availability for specific date.
- **Response Example:**
  ```json
  [
    {
      "date": "2024-11-20",
      "employeeID": 1,
      "availability": {
        "10:00": true,
        "11:00": true,
        "12:00": true,
        "13:00": false,
        "14:00": true
      }
    },
    {
      "date": "2024-11-20",
      "employeeID": 2,
      "availability": {
        "10:00": true,
        "11:00": false,
        "12:00": true,
        "13:00": true,
        "14:00": true
      }
    }
  ]
  ```

### **Update Availability (Admin)**
- **Endpoint:** `PUT /admin/updateAvailability`
- **Description:** Admin can update availability for an employee on a specific date.
- **Request Body:**
  ```json
  {
    "date": "2024-11-20",
    "employeeID": 1,
    "availability": {
      "10:00": false,
      "11:00": true
    }
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Availability updated successfully",
    "date": "2024-11-20",
    "employeeID": 1,
    "updatedAvailability": {
      "10:00": false,
      "11:00": true
    }
  }
  ```

---

## **Booking Routes**

### **Book Appointment**
- **Endpoint:** `POST /booking`
- **Description:** Book an appointment.
- **Request Body:**
  ```json
  {
    "date": "2024-11-22",
    "time": "14:00:00",
    "services": "Haircut",
    "userID": 1,
    "employeeID": 2
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Appointment booked successfully",
    "appointmentID": 1,
    "date": "2024-11-22",
    "time": "14:00:00",
    "services": "Haircut",
    "status": "confirmed",
    "userID": 1,
    "employeeID": 2
  }
  ```

### **Fetch User Bookings**
- **Endpoint:** `GET /fetchBookings`
- **Description:** Fetch all appointments for the authenticated user.
- **Response Example:**
  ```json
  [
    {
      "appointmentID": 1,
      "date": "2024-11-22",
      "time": "14:00:00",
      "services": "Haircut",
      "status": "confirmed",
      "employeeID": 2
    },
    {
      "appointmentID": 2,
      "date": "2024-11-25",
      "time": "10:00:00",
      "services": "Hair Coloring",
      "status": "completed",
      "employeeID": 1
    }
  ]
  ```

### **Fetch Appointments by Date (Admin)**
- **Endpoint:** `GET /admin/getappointment`
- **Description:** Fetch all appointments for a specific date.
- **Response Example:**
  ```json
  [
    {
      "appointmentID": 1,
      "date": "2024-11-22",
      "time": "14:00:00",
      "services": "Haircut, Shave",
      "status": "confirmed",
      "userID": 1,
      "employeeID": 2
    },
    {
      "appointmentID": 2,
      "date": "2024-11-22",
      "time": "16:00:00",
      "services": "Shave",
      "status": "pending",
      "userID": 3,
      "employeeID": 2
    }
  ]
  ```

### **Update Appointment Status**
- **Endpoint:** `PUT /admin/appointmentStatus/:id`
- **Description:** Update the status of an appointment.
- **Request Body:**
  ```json
  {
    "status": "completed"
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Appointment status updated successfully",
    "appointmentID": 1,
    "newStatus": "completed"
  }
  ```

---

## **Service Routes**

### **Add Service**
- **Endpoint:** `POST /addService`
- **Description:** Add a new service.
- **Request Body:**
  ```json
  {
    "serviceName": "Haircut",
    "serviceDescription": "Professional haircut service",
    "price": 50,
    "imageLink": "https://example.com/image.jpg"
  }
  ```

### **Fetch All Services**
- **Endpoint:** `GET /getService`
- **Description:** Retrieve all services.
- **Response Example:**
  ```json
  [
    {
      "serviceID": 1,
      "serviceName": "Haircut",
      "serviceDescription": "Professional haircut service",
      "price": 50,
      "imageLink": "https://example.com/image.jpg"
    },
    {
      "serviceID": 2,
      "serviceName": "Shave",
      "serviceDescription": "Smooth shave service",
      "price": 30,
      "imageLink": "https://example.com/image2.jpg"
    }
  ]
  ```

### **Fetch Service by ID**
- **Endpoint:** `GET /getService/:id`
- **Description:** Retrieve a specific service by ID.
- **Response Example:**
  ```json
  {
    "serviceID": 1,
    "serviceName": "Haircut",
    "serviceDescription": "Professional haircut service",
    "price": 50,
    "imageLink": "https://example.com/image.jpg"
  }
  ```

### **Update Service**
- **Endpoint:** `PUT /updateService/:id`
- **Description:** Update a service by ID.
- **Request Body:**
  ```json
  {
    "serviceName": "Premium Haircut",
    "serviceDescription": "High-end professional haircut service",
    "price": 100
  }
  ```

### **Delete Service**
-

 **Endpoint:** `DELETE /deleteService/:id`
- **Description:** Delete a service by ID.

---

## **Payment Routes**

### **Premium Purchase**
- **Endpoint:** `GET /service/payment`
- **Description:** Initiates a service payment.

### **Verify Payment**
- **Endpoint:** `POST /service/paymentverify`
- **Description:** Verifies the payment for the service.

---

## API Endpoints

---

## Models Overview

Here is the separation of each model into individual tables:

### **Admin Model**

| **Attribute**  | **Type**    | **Details**                                      |
|----------------|------------|--------------------------------------------------|
| `ID`           | `INTEGER`  | Primary key, Auto increment                      |
| `name`         | `STRING`   | Admin's name                                     |
| `email`        | `STRING`   | Admin email (unique)                             |
| `phone`        | `STRING`   | Admin phone number                               |
| `password`     | `STRING`   | Admin password (hashed)                          |
| `speciality`   | `STRING`   | Admin's area of expertise                        |
| `role`         | `STRING`   | Admin role (default: staff)                      |
| `access`       | `BOOLEAN`  | Boolean for access control (default: true)       |

---

### **User Model**

| **Attribute**  | **Type**    | **Details**                                      |
|----------------|------------|--------------------------------------------------|
| `ID`           | `INTEGER`  | Primary key, Auto increment                      |
| `userName`     | `STRING`   | User's name                                      |
| `email`        | `STRING`   | User email (unique)                              |
| `password`     | `STRING`   | User password (hashed)                           |
| `phoneNumber`  | `STRING`   | User phone number                                |

---

### **BookAppointment Model**

| **Attribute**   | **Type**    | **Details**                                      |
|-----------------|------------|--------------------------------------------------|
| `ID`            | `INTEGER`  | Primary key, Auto increment                      |
| `date`          | `DATEONLY` | Appointment date                                 |
| `time`          | `TIME`     | Appointment time                                 |
| `services`      | `STRING`   | service                                          |
| `status`        | `ENUM`     | Appointment status ( `confirmed`, `completed`, `cancelled`) |
| `userID`        | `INTEGER`  | Reference to the `User` model                    |
| `employeeID`    | `INTEGER`  | Reference to the `Admin` model (Employee handling the appointment) |

---

### **DayAvailability Model**

| **Attribute**       | **Type**    | **Details**                                      |
|---------------------|------------|--------------------------------------------------|
| `ID`                | `INTEGER`  | Primary key, Auto increment                      |
| `date`              | `DATEONLY` | Available date                                   |
| `availability`      | `JSON`     | Time slots and their availability (e.g., `{ "10:00": true, "11:00": false }`) |

---

### **Services Model**

| **Attribute**       | **Type**    | **Details**                                      |
|---------------------|------------|--------------------------------------------------|
| `ID`                | `INTEGER`  | Primary key, Auto increment                      |
| `serviceName`       | `STRING`   | Name of the service                              |
| `serviceDescription` | `TEXT`     | Description of the service                       |
| `price`             | `INTEGER`  | Service price                                    |
| `imageLink`         | `TEXT`     | Link to service image (if avaible)                           |

---

The **Salon Appointment Booking System** facilitates easy management of salon operations, including service booking, staff management, and availability tracking. Customers can book appointments, view service details, and track their booking status, while admins can manage users, services, and appointments. The system integrates payment processing and email notifications for appointment updates. Key models include **User**, **Admin**, **BookAppointment**, **DayAvailability**, and **Services**. This system is licensed for free use and can be modified to fit specific salon requirements.
---


