User Management App

A simple full-stack CRUD app built with Node.js, Express, MySQL and EJS. Users can be viewed, added, edited and deleted, with credential checks before any change.

Features
Home page showing the total number of users
View all users in a table
Add a new user (ID is auto-generated with Faker)
Edit a username after verifying the password
Delete a user after verifying email and password
Tech Stack
Node.js
Express
MySQL (mysql2)
EJS (templating)
method-override (send PATCH and DELETE from HTML forms)
Faker (@faker-js/faker)
Project Structure
project/
├── index.js
├── package.json
└── views/
    ├── home.ejs
    ├── showusers.ejs
    ├── new.ejs
    ├── edit.ejs
    └── delete.ejs
Getting Started
1. Prerequisites
Node.js installed
MySQL installed and running
2. Clone and install
bash
git clone <your-repo-url>
cd <your-project-folder>
npm install

If you are starting from scratch, install the packages manually:

bash
npm install express mysql2 ejs method-override @faker-js/faker
3. Set up the database

Run this in MySQL:

sql
CREATE DATABASE delta_app;
USE delta_app;

CREATE TABLE user (
  ID VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL
);
4. Configure the connection

In index.js, update the connection details to match your MySQL setup:

javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'YOUR_DB_PASSWORD'
});

Do not commit your real password. Move it to an environment variable (for example process.env.DB_PASSWORD) and keep your .env file in .gitignore.

5. (Optional) Seed sample data

Insert the generated fake users once, then remove the code:

javascript
connection.query(
  "INSERT INTO user (ID,username,email,password) VALUES ?",
  [data],
  (err, result) => {
    if (err) return console.log(err);
    console.log(result);
  }
);
6. Run the app
bash
node index.js

Open http://localhost:8080.

Routes
Method	Route	Description
GET	/	Home page with user count
GET	/user	List all users
GET	/user/new	Show the add-user form
POST	/user	Add a new user
GET	/user/:id/edit	Show the edit form
PATCH	/user/:id	Update username (password required)
GET	/user/:id/delete	Show the delete form
DELETE	/user/:id	Delete user (email and password required)
Known Limitations

This is a learning project and is not production-ready:

Passwords are stored in plain text
Some queries are built with template strings, which is open to SQL injection
Future Improvements
Use parameterized queries (? placeholders)
Hash passwords with bcrypt
Load credentials from environment variables
Add input validation and better error pages
Add basic styling
What I Learned
Routing and views with Express and EJS
Connecting Node.js to MySQL
Using method-override for PATCH and DELETE
Handling async callbacks and errors
License

MIT# crud-app-linked-with-sql-database
practice
