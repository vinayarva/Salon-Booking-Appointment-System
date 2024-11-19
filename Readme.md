# Salon Appointment Booking System API Documentation

## Authentication
All routes require authentication (`Authenticate` middleware). Ensure the client includes valid authentication headers.

---

## API Endpoints

### **Availability Routes**

#### **Fetch Availability**
- **Endpoint:** `GET /fetchAvailability`
- **Description:** Fetch available time slots for a specific date.
- **Response Example:**
```json
{
  "date": "2024-11-20",
  "availability": {
    "10:00": true,
    "11:00": true,
    "12:00": true,
    "13:00": false,
    "14:00": true
  }
}
```

#### **Fetch All Availability (Admin)**
- **Endpoint:** `GET /admin/fetchAvailabilityALL`
- **Description:** Fetch availability for all dates.
- **Response Example:**
```json
[
  {
    "date": "2024-11-20",
    "availability": {
      "10:00": true,
      "11:00": true,
      "12:00": true,
      "13:00": false,
      "14:00": true
    }
  },
  {
    "date": "2024-11-21",
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

#### **Update Availability (Admin)**
- **Endpoint:** `PUT /admin/updateAvailability`
- **Description:** Update availability for a specific date.
- **Request Body:**
```json
{
  "date": "2024-11-20",
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
  "updatedAvailability": {
    "10:00": false,
    "11:00": true
  }
}
```

---

### **Booking Routes**

#### **Book Appointment**
- **Endpoint:** `POST /booking`
- **Description:** Book an appointment.
- **Request Body:**
```json
{
  "date": "2024-11-22",
  "time": "14:00:00",
  "services": "Haircut, Shave"
}
```
- **Response Example:**
```json
{
  "message": "Appointment booked successfully",
  "appointmentID": 1,
  "date": "2024-11-22",
  "time": "14:00:00",
  "services": "Haircut, Shave",
  "status": "confirmed"
}
```

#### **Fetch User Bookings**
- **Endpoint:** `GET /fetchBookings`
- **Description:** Fetch all appointments for the authenticated user.
- **Response Example:**
```json
[
  {
    "appointmentID": 1,
    "date": "2024-11-22",
    "time": "14:00:00",
    "services": "Haircut, Shave",
    "status": "confirmed"
  },
  {
    "appointmentID": 2,
    "date": "2024-11-25",
    "time": "10:00:00",
    "services": "Hair Coloring",
    "status": "completed"
  }
]
```

---

### **Service Routes**

#### **Add Service**
- **Endpoint:** `POST /addService`
- **Description:** Add a new service.
- **Request Body:**
```json
{
  "serviceName": "Haircut",
  "serviceDescription": "Professional haircut service.",
  "price": 50,
  "imageLink": "https://example.com/image.jpg"
}
```
- **Response Example:**
```json
{
  "message": "Service added successfully",
  "service": {
    "serviceID": 1,
    "serviceName": "Haircut",
    "serviceDescription": "Professional haircut service.",
    "price": 50,
    "imageLink": "https://example.com/image.jpg"
  }
}
```

#### **Fetch All Services**
- **Endpoint:** `GET /getService`
- **Description:** Retrieve all available services.
- **Response Example:**
```json
[
  {
    "serviceID": 1,
    "serviceName": "Haircut",
    "serviceDescription": "Professional haircut service.",
    "price": 50,
    "imageLink": "https://example.com/image.jpg"
  },
  {
    "serviceID": 2,
    "serviceName": "Shave",
    "serviceDescription": "Smooth and clean shave.",
    "price": 30,
    "imageLink": "https://example.com/image2.jpg"
  }
]
```

#### **Fetch Service by ID**
- **Endpoint:** `GET /getService/:id`
- **Description:** Retrieve details of a specific service by ID.
- **Response Example:**
```json
{
  "serviceID": 1,
  "serviceName": "Haircut",
  "serviceDescription": "Professional haircut service.",
  "price": 50,
  "imageLink": "https://example.com/image.jpg"
}
```

---

### **Admin Routes**

#### **Update Appointment Status**
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

## Models Overview

### **User Model**
| Attribute      | Type              | Details              |
|----------------|-------------------|----------------------|
| `ID`           | `INTEGER`         | Primary Key, Auto-Increment |
| `userName`     | `STRING`          | Not Null            |
| `email`        | `STRING`          | Not Null, Unique    |
| `password`     | `STRING`          | Not Null            |
| `phoneNumber`  | `STRING`          | Not Null            |

---

### **Admin Model**
| Attribute      | Type              | Details              |
|----------------|-------------------|----------------------|
| `ID`           | `INTEGER`         | Primary Key, Auto-Increment |
| `name`         | `STRING`          |                      |
| `email`        | `STRING`          |                      |
| `phone`        | `STRING`          |                      |
| `password`     | `STRING`          |                      |
| `speciality`   | `STRING`          |                      |
| `role`         | `STRING`          | Default: "staff"     |
| `access`       | `BOOLEAN`         | Default: `true`      |

---

### **Service Model**
| Attribute         | Type          | Details              |
|-------------------|---------------|----------------------|
| `ID`              | `INTEGER`     | Primary Key, Auto-Increment |
| `serviceName`     | `STRING`      |                      |
| `serviceDescription` | `TEXT`     |                      |
| `price`           | `INTEGER`     |                      |
| `imageLink`       | `TEXT`        |                      |

---

### **Day Availability Model**
| Attribute      | Type              | Details              |
|----------------|-------------------|----------------------|
| `ID`           | `INTEGER`         | Primary Key, Auto-Increment |
| `date`         | `DATEONLY`        | Not Null            |
| `availability` | `JSON`            | Default: Time slots |

---

### **Appointment Model**
| Attribute      | Type              | Details              |
|----------------|-------------------|----------------------|
| `ID`           | `INTEGER`         | Primary Key, Auto-Increment |
| `date`         | `DATEONLY`        | Not Null            |
| `time`         | `TIME`            | Not Null            |
| `services`     | `STRING`          | Not Null            |
| `status`       | `ENUM`            | Default: `confirmed`|

---

Use this documentation to integrate or extend the system. Let me know for further enhancements!