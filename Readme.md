🎓 University Assignment Approval System


A modern full-stack platform built to digitalize assignment workflows inside universities.
It provides secure assignment submission, multi-level approval, and a fully-controlled admin management system with department-wise access.

✨ Features Overview
🔐 Authentication & Authorization

JWT-based authentication

Role-based protected APIs (Admin / Student / Professor / HOD)

Password hashing using bcrypt

Password reset with auto-generated password via email

👑 Admin Features

Create users (Student, Professor, HOD)

Create & update departments

Assign users to departments

Reset user passwords

View department structure with HOD/Professors/Students

🎓 Student Features

Upload single/multiple assignment files

Track assignment status in real-time

View professor/HOD remarks

See submission history

👨‍🏫 Professor Features

View all assignments from their department

Approve or reject submissions

Provide remarks & feedback

🧑‍💼 HOD Features

View department-wide submissions

Give final approval

Add final remarks

🛠 Tech Stack
⚡ Frontend

Next.js 14

React

Tailwind CSS

Axios

React Hooks + Context API

🔥 Backend

Node.js

Express.js

Mongoose (ODM)

🗄 Database

MongoDB (Atlas)

Advanced relations via Mongoose populate()

☁️ Cloud & File Handling

Cloudinary (secure file storage)

Multer (multi-file upload)

📧 Email / Notifications

Nodemailer

🔐 Security

JWT

bcrypt

Role-based Access Control (RBAC)

🗂 Folder Structure
root/
 ├── client/                 # Next.js frontend
 ├── server/                 # Node.js backend
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   ├── utils/
 │   └── config/
 ├── README.md
 ├── .gitignore
 └── package.json

📘 API Documentation
🔐 Auth Routes
POST /api/auth/login

Login user (Student / Professor / HOD / Admin)

POST /api/admin/create-user

Admin creates a new user with role + department.

🏛 Department Routes
POST /api/admin/department

Create a new department

PUT /api/admin/department/:id

Update department details

GET /api/student/my-department

Student/Professor/HOD fetches own department details

📁 Assignment Routes
POST /api/student/assignment

Upload single/multiple assignments
Body: title, description, files

GET /api/student/my-assignments

Fetch logged-in student’s assignments

GET /api/professor/assignments

Professor fetches assignments from their department

PUT /api/professor/assignment/:id

Professor approves/rejects assignment

PUT /api/hod/assignment/:id

HOD final approval

🔧 Admin Utility
PUT /api/admin/updateUserPassword/:id

Reset user password and send email

⚙️ Setup Instructions
1️⃣ Clone repo
git clone https://github.com/your-username/your-repo.git

2️⃣ Install dependencies

Backend:

cd server
npm install


Frontend:

cd client
npm install

3️⃣ Add environment variables
Backend .env
MONGO_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=

Frontend .env.local
NEXT_PUBLIC_API_URL=

4️⃣ Run servers

Backend:

npm run dev


Frontend:

npm run dev