# Project Title

WorkoutWise

## Overview

WorkoutWise is an interactive fitness app that helps users explore new exercises while enabling them to visualize and monitor their daily workout activities, fostering a more engaging and informed fitness journey.

### Problem Space

Many fitness enthusiasts struggle to discover new exercises and effectively track their daily workout activities, leading to monotonous routines and limited progress visibility. This lack of variety and insight hinders their ability to stay motivated and achieve their fitness goals efficiently.

### User Profile

- Individuals seeking to track their workout progress to monitor their improvements.
- Fitness enthusiasts looking to explore and incorporate new types of workouts into their routine.

### Features

### **User Registration and Login Flow:**

- **As a New User:**

  - I should be able to register by clicking the "Register" button below the login form.
  - During registration, I should provide the following information: First Name, Last Name, Email, Gender, Password and Confirm Password

- **As a Registered User:**
  - I should be able to log in to the application by entering my username and password.

---

### **Logged-in User Dashboard:**

- **As a Logged-in User:**

  - I should see my dashboard displaying:

    - A table that displays previously performed exercises by date.

- **Navigation to Daily Tracker:**
  - user should be able to navigate to the 'Daily Tracker' page by clicking the 'Daily Tracker' option in the sidebar.
  - On the 'Daily Tracker' page, user should be able to input the details of my previous day's performed exercises along with the remaining information.
  - After updating the daily tracker the updated informatuion will be populated in dashboard.

---

### **Explore Workouts Page:**

- **As a User:**

  - User should be able to explore exercises by clicking 'Explore Workouts' in the sidebar.
  - User should be able to filter the exercise list by
    - Intensity
    - Category

- **Workout Details Page:**
  - Upon selecting a exercise, user should be directed to a separate page displaying:
    - Demo videos
    - Exercise details

## Implementation

### Tech Stack

- React
- MySQL
- Express
- Client Libraries:
  - React
  - sass
  - react-router
  - axios
  - recharts
  - mui
- Server Libraries
  - knex
  - Express
  - bcrypt
  - jsonwebtoken

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Landing page
  - login
  - Register
- Home Page or dashboard
- Daily Tracker Page
- Explore Workout Page
- Workout Details Page

### Mockups

Landing Page

- login
  [click here](./login.png)

- Register
  [click here](./register.png)

- dashboard
  [click here](./dashboard.png)

- daily Tracker
  [click here](./dailytracker.png)

- explore workouts
  [click here](./explore-workouts.png)

-workout Details
[click here](./exercise-details.png)

### Data

![click here](mock-db.png)

### Endpoints

**POST /users/register**

- Add a new user account

Parameters:

- firstname: User's first Name
- lastname: User's last Name
- Gender: User's Gender
- Email
- Password
- Confirm Password

Response:

```
{
  message: registered Sucessfully
}
```

**POST /users/login**

- Allow user to login if already Registered

Parameters:

- Email: user's email address during registration
- Password : user's password provided during registration

Response:

```
{
   "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

## Roadmap

**Milestone 1**

- Basic Setup

  - Create Server

    - express project with routing all the dependecies installed
    - Create Migrations and seed
      - Excercise Table
        - Organize diverse workout categories into subcategories based on target body parts, along with detailed exercise information for each
      - User-info Table
        - Create a table according to Mock db diagram with dummy data
          -User-data Table
        - Create a Table according to Mock db Diagram with dummy data

  - Create Client
    - Setup react projects by installing all the basic dependencies required
    - Setup Routing and styling for the Application

**Milestone 2**

- Authentication

  - Server

    - Feature:
      - Create EndPoints for POST /users/login, POST /users/register
      - handle Authentication while creating post apis

  - Client
    - Feature:
      - Create Login Page UI and Ingegrate it with Created API
      - Create Register Page UI and Integrate it with Created API

**Milestone 3**

- Dashboard

  - Server
    - Feature:
      - Create Endpoints to get stepCount of the User for past one week
      - Create API to get User Data like BMI, Liked Excercises, Previous Performed Excercises etc
  - Client
    - Feature:
      - Create UI according to Mockup to Visualize the stepcount for a week
      - Create UI according to Mockup to Visualize the Categories of excercises Available and no of Sub Categories

**Milestone 4**

- explore Excercises

  - Server
    - Feature:
      - Create API to get all the categories of Excercises available
      - Filter Feature:
        - Create API to get the Exercise by duration, body part
  - Client
    - Feature:
      - Create UI according to mockup to display Excercises and add dropdown elements as filters to get Excercise by body part and duration.

**Milestone 5**

- Excercise Details

  - Server
    - Feature:
      - Create an API to get exercise details
  - Client
    - Feature:
      - Create a UI according to Mockup to display the details of the Excercises.

**Milestone 6**

- Daily Tracker

  - Server
    - Feature:
      - Create Endpoints to post the previous day Excercise information and no of steps taken
  - Client
    - Feature:
      - Create a Form UI in the daily Tracker Tab and integrate it with the dailyTracker endpoint

--- Bug Fixes

--- Demo

## Future Implementations

--step count visualization
