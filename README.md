🚗 Car Rental Management System — WheelX

📘 Overview

WheelX is a full-stack web application designed to simplify car rental management.
Users can browse available cars, book rentals, and manage their bookings efficiently.
It uses Spring Boot for the backend, React + Tailwind CSS for the frontend, PostgreSQL for database management, and Cloudinary for image hosting.

🏗️ Project Structure
![Project Structure](./Screenshots/Structure.png)

⚙️ Tech Stack
| Layer              | Technology                                  |
| ------------------ | ------------------------------------------- |
| **Frontend**       | React.js, Tailwind CSS                      |
| **Backend**        | Spring Boot (Java)                          |
| **Authentication** | JWT (JSON Web Token)                        |
| **Database**       | PostgreSQL                                  |
| **Cloud Storage**  | Cloudinary                                  |
| **Tools**          | IntelliJ IDEA (backend), VS Code (frontend) |


🗄️ Database Setup (PostgreSQL)
Open pgAdmin 4.
Create a new database named:carental
Update credentials in


    car/src/main/resources/application.properties:

    spring.datasource.url=jdbc:postgresql://localhost:5432/carental
    spring.datasource.username=YOUR_USERNAME
    spring.datasource.password=YOUR_PASSWORD
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true

☁️ Cloudinary Configuration

Update the following values in your application.properties file with your Cloudinary credentials:

cloudinary.url=cloudinary://<api_key>:<api_secret>@<cloud_name>



⚠️ Important: Never commit your real API keys or passwords to GitHub.


▶️ Running Instructions


🧩 Backend (Spring Boot — IntelliJ IDEA)

    Open the car folder in IntelliJ IDEA.

    Allow Maven to build and resolve dependencies.

    Run the main Spring Boot application file (CarApplication.java).

    Once running successfully, the backend will start on:http://localhost:8080

💻 Frontend (React — VS Code)

    Open the CarRental folder in VS Code.

    Install dependencies:npm install
    Start the frontend:npm start
    The frontend will launch automatically at:http://localhost:5173

📸 Screenshots
⚙️ Backend Running in IntelliJ IDEA
![Backend Running](./Screenshots/Backend.png)

🏠 Frontend — Home Page
![Frontend Home](./Screenshots/Home.png)

🚗 Frontend — Available Cars Page
![Frontend Cars](./Screenshots/User%20BookNow.png)

📋 Admin — All Bookings Page
![Admin Bookings](./Screenshots/Admin%20bookings.png)

🧠 Key Features
🔐 Secure JWT-based authentication
🚘 Dynamic car listings with images (via Cloudinary)
📅 Booking management with start/end dates and pricing
🧾 Admin panel to manage cars and bookings
🌐 Responsive UI built using React + Tailwind CSS


💡 Developer Notes
Run backend and frontend separately:
Backend → IntelliJ IDEA
Frontend → VS Code
Ensure PostgreSQL is running before launching the backend.
Update your database and Cloudinary credentials in application.properties.


👨‍💻 Author

Vansh Kamboj
https://github.com/Vanshkamboj1


📜 Copyrights
© Vansh Kamboj
All rights reserved.

🧾 License

This project is created for academic and educational purposes.
Unauthorized redistribution or commercial use is prohibited.