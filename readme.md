# Project Title

WorkoutWise

## Overview

WorkoutWise is a personalized workout tracking and recommendation app that tailors new workout suggestions based on users' vital information and fitness goals.

### Problem Space

My application helps users achieve an optimal BMI by incorporating a daily tracker for their physical activities and monitoring long-term progress. It provides personalized workout recommendations to support their fitness journey effectively.

### User Profile

Fitness Enthusiast:

- Users aiming to maintain a healthy BMI and overall well-being.
- Individuals seeking to track their workout progress to monitor long-term improvements.
- Fitness enthusiasts looking to explore and incorporate new types of workouts into their routine.
- Users who want the ability to customize and manage their daily workout regimen effectively.

### Features

As a user, If I'm not registered I should be able to register by clicking on the Register button present bellow the login Form
As a user, while registering to the application I should be able to provide the information like firstname, lastname,email, dob, gender, height, weight, preferred workout type, password and confirm password.

As a Registed user, I should be able to login the application by providing my login Creditional such as username and password.

As a logged in user, I should be able to see in the dashboard with my current BMI, stats of my daily workout, Stats of My Step count for one week for each day. The records of Liked Workout workouts and The Records of Previously performed workouts.
As a logged in user, I pop up should be displa after login in dashboard which acts as an indicator to update the daily tracker with the latest data.
As a logged in user, I should be able to redirect to the daily tracker page on clicking on daily tracker in the sidebar.
As a logged in user, After redirecting to the daily tracker page the user should provide the information of their previous day workout.
As a logged in user, I should be able to redirect to the "Explore Workouts page" on clicking on Explore Workouts in the sidebar.
As a logged in user, user should be able to see the default workouts list that are suggested based on their vital details. and sould be able to filter the list based on the workout duration, intensity, name of workout.
As a logged in user, On clicking on any workout. The workout info should be displayed in seperate page with its details like instructions, time, equipement required and multiple video link to see the demo. like button to like the workout and add button to add it to your personalised workout regimen.

## Implementation

### Tech Stack

- React
- TypeScript
- MySQL
- Express
- Client Libraries:
  - React
  - styled-components
  - react-router
  - axios
  - react-query
  - recharts
  - mui
  - formik
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
  
  ![](login.jpg)
- Register
  
  ![](register.jpg)
- dashboard
  
  ![](dashboard.jpg)
- daily Tracker
  
  ![](dailytracker.jpg)
- explore workouts

  ![](explore-workouts.jpg)

### Data

![](mock-db.png)

### Endpoints

**POST /users/register**

- Add a new user account

Parameters:

- firstname: User's first Name
- lastname: User's last Name
- DOB: User's DOB
- Gender: User's Gender
- Workout Frequency per day in Number
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

**GET /excercises**

- Get 10 records of Ecercises

Response:

```
[
{
 "excercise_id": 1,
 "excercise_name": '3/4 Sit-Up',
 "body-part": ["waist", "abs"],
 "intensity": 'medium',
 "duration": 20
},
{
"excercise_id": 4,
 "excercise_name": 'Alternate Heel Touchers',
 "body-part": ["abs"],
 "intensity": 'high',
 "duration": 20
}
]

```

**GET /excercises/:body-part**

- Filter workout based on the body part selected. If Waist selected

Response:

```
[
{
 "excercise_id": 1,
 "excercise_name": '3/4 Sit-Up',
 "body-part": ["waist"],
 "intensity": 'medium',
 "duration": 20
},
{
 "excercise_id": 7,
 "excercise_name": 'Air Bike',
 "body-part": ["waist"],
 "intensity": 'high',
 "duration": 15
}
]

```

**GET /excercises/:id**

- Get all the details of the Excercises By Id

Response:

```
{
  "excercise_id": 1,
  "excercise_name": "3/4 Sit-Up"
  "body_part": ["waist", "abs"],
  "intensity": "medium",
  "duration": 20,
  "imgUrl": "sample.jpg",
  "instructions": [
"Lie flat on your back with your knees bent and feet flat on the ground.",
"Place your hands behind your head with your elbows pointing outwards.",
"Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
"Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
"Repeat for the desired number of repetitions."],
"equipment": "no equipment required",
"reference-video-links": [sample-video-links],
}
```

**POST /daily-tracker**

- Allow user to post the previous day Excercise Information

Parameters:

- Yesterday Date
- Category of Workout
- Name of the Workout
- No of Repeations
- Duration
- Step Count

Response:

```
{
  "user_id": 1,
  "height": 125,
  "weight": 137,
  "bmi": 88,
  "stepCount": 12000,
  "excercise_id": 2,
  "excercise_name": "3/4 Sit-Up",
  "rep_count": 10
}
```

## Roadmap

**Milestone 1**

- Basic Setup

  - Create Server

    - express project with with routing all the dependecies installed
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

-- Calories Burned so far based on the History of Progress
-- Diet Plan Suggestion
-- Different Category Diets
-- Recipes Suggestion based on Category
