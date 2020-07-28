# Server Side Hospital API

> This is a server-side hospital API which can perform some basic tasks.

---

### Table of Contents

- [Description](#description)
- [Folder Structure](#folder-structure)
- [How To Use](#how-to-use)
- [Author Info](#author-info)

---

## Description

This API can be integrated in hospitals which have been assigned for patients affected by COVID-19. It will help in keeping track of their progress.
This API can perform the following functions :-
- Register Doctor
- Log Doctor In and generate JWT.
- Register Patient using JWT.
- Generate Patient report using JWT.
- View all reports of a particular patient based on patient id.
- View all reports based on a particular report status.

#### Technologies

- NodeJS
- MongoDB

---

## Folder Structure
- routes: Contains the api folder which contains routes for different api requests.
- controllers: Contains the controllers for doctor, patient and report.
- models: Contains the Schemas for Doctors, Patients and Reports
- config : Contains mongoose and passportJWT configuration files

## How To Use

#### Setting it up on your Machine

1. Clone or Download the Project
2. Navigate to the folder using the terminal and run 'npm install'. This will install all the dependencies to your package. Make sure you have Node installed on your machine.
3. Run 'npm start' to start the server 
4. Reference URL: 'localhost:8000'

#### API Routes

1. /doctors/register - To register Doctor in the database. Required fields to pass in body of request are 'username', 'name' and 'password'.
2. /doctors/login - Doctor can login and generate JSON Web Token. Required fields to pass in body of request are 'username' and 'password'.

##### Routes requiring JWT
3. /patients/register - To register patients in the database. This can be done by doctors only. Required fields are 'phone' and 'name' along with 'JWT' in the header of the request.
4. /patients/:id/create_report - To create report for a particular patient. This can be done by doctors only. Required field is 'status'. NOTE: Status can take one of the following values only: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'].

##### Public Routes
5. /patients/:id/all_reports - Returns all the reports of a particular patient(identified by id).
6. /reports/:status - Returns all the reports with a particular status.

---

## Author Info

- LinkedIn - [@lakshdhamija](https://linkedin.com/in/laksh-dhamija)

