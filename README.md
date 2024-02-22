Food Ordering App
Welcome to my Food Ordering App! This application allows users to register, login, view meals, place orders, and more. It is built using MongoDB, Express.js, and implements user authentication and authorization.

Features
User Registration: Users can sign up for an account.
User Authentication: Passwords are hashed for security.
User Login: Registered users can log in securely.
Token Generation: Upon successful login, a token with an expiry date is generated.
Admin Privileges: Only admin users can add, edit, or delete meals.
User Orders: Logged-in users can place orders.
MongoDB Integration: Data is stored in a MongoDB database.
Express.js Backend: Backend server is implemented using Express.js.

Setup
Clone the repository:
git clone <repository_url>

cd food-ordering-app

Install dependencies:
npm install

Set up environment variables:
Create a .env file in the root directory and add the following variables:

MONGODB_URI=<your_mongodb_uri>
SECRET_KEY=<your_secret_key>

Run the application:
npm start

Security
Passwords are hashed using bcrypt for security.
JSON Web Tokens (JWT) are used for authentication and authorization.
Only admin users have access to certain endpoints (meals CRUD operations).

Technologies Used
MongoDB
Express.js
bcrypt
JSON Web Tokens (JWT)

Contributors
Rashidatu Mohammed
