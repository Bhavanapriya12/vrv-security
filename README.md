This project has been developed by incorporating all the specified requirements shared via email. Below is a detailed breakdown of the implementation:

Key Features and Functionalities
**Admin Creation Route**

A dummy route has been implemented to create an admin with a role type of 1 (used for role-based access control).
Route: user/register_admin (configured in the user.js file under the routes folder).
Payload can be entered in Postman to create an admin user.
**Admin Login**

Admins can log in using the user/login route.
Upon login, a JSON Web Token (JWT) is generated for secure authentication and authorization. The token has an expiration time of 7 days.
**Authentication Middleware**

A middleware has been implemented to secure routes, ensuring they are accessible only to authenticated users.
This middleware is located in the auth.js file under the middlewares folder.
**Rate Limiting**

A rate limiter has been incorporated to control the number of requests.
This helps prevent brute force attacks and automated requests, enhancing application security.
**API Endpoints**
The following APIs have been implemented:

**Register Main Admin**
Route: user/register_admin
**Login (Available for All Users)**
Route: user/login
**Get Profile (Authenticated Users Only)**
Route: user/get_profile
**Register Users (Admin Only)**
Route: user/register_user
**Get All Users (Admin Only)**
Route: user/get_all_users
All these routes are included in the user.js file under the routes folder. Route configurations are managed in the routeConfig.js file under the helpers folder.

**Code Organization**

Routes are grouped within the routes folder.
Helper functions and configurations (e.g., database connection, rate limiter, CORS) are organized under the helpers folder.
**Request Validation**

Payloads for all APIs are validated using Joi schemas, which are defined in the schema.js file under the helpers folder.
**Database Schema**

A MongoDB schema has been defined for the User model, restricting fields to those explicitly specified and enforcing data types and required fields.
This schema is located in the user_model.js file under the models folder.
**Application Setup**

All files are integrated into app.js to initialize and run the project.

**Instructions to Run the Project**
1]Clone the project repository.
2]Establish the necessary MongoDB connection.
3]Install dependencies by running the command:
---**npm install**
Start the application using the command:
------**node app.js**
Use Postman or a similar tool to interact with the APIs. Payloads for each route should follow the format defined in schema.js.

**Technologies and Tools Used**
**Node.js**: For server-side JavaScript execution.
**Express.js**: To handle routing and middleware efficiently.
**MongoDB**: A NoSQL database for flexible and scalable data management.
**JWT**: For secure authentication and session management.
**Joi**: For schema-based validation of API payloads.
**Rate Limiter**: To prevent abusive behavior and enhance security.
**Postman**: For API testing and debugging.

I feel and believe that this project is a user management system built to demonstrate skills in backend development with features like secure user authentication, role-based access control, and proper code organization.




