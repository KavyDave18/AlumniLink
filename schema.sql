-- 🧱 Step 1: Create and use the database
CREATE DATABASE IF NOT EXISTS AlumniInteractionDB;
USE AlumniInteractionDB;

-- 🚫 Step 2: Drop existing tables if needed (safe reset)
DROP TABLE IF EXISTS Connections, RSVPs, Messages, Comments, Posts, Jobs, Events, Alumni, Users, Roles;

-- 👤 Step 3: Create Roles Table
CREATE TABLE Roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert default roles
INSERT INTO Roles (role_name) VALUES 
('student'),
('faculty'),
('alumni'),
('admin');

-- 👥 Step 4: Create Users Table (with role_id foreign key)
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT,
    profile_picture TEXT,
    bio TEXT,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id) ON DELETE SET NULL
);

-- 🎓 Step 5: Alumni Table (1:1 with Users)
CREATE TABLE Alumni (
    alumni_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    graduation_year INT,
    degree VARCHAR(100),
    branch VARCHAR(100),
    current_job_title VARCHAR(100),
    company VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 📝 Step 6: Posts Table (1:N with Users)
CREATE TABLE Posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 💬 Step 7: Comments Table (1:N with Posts and Users)
CREATE TABLE Comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    user_id INT,
    comment_text TEXT,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 📩 Step 8: Messages Table (1:N, self-referencing Users)
CREATE TABLE Messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiver_id INT,
    message_text TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 🎫 Step 9: Events Table (1:N with Users)
CREATE TABLE Events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    event_date DATE,
    location VARCHAR(255),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ✅ Step 10: RSVPs Table (1:N with Events and Users)
CREATE TABLE RSVPs (
    rsvp_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    response ENUM('yes', 'no', 'maybe') DEFAULT 'yes',
    responded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE
);

-- 💼 Step 11: Jobs Table (1:N with Users)
CREATE TABLE Jobs (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    posted_by INT,
    title VARCHAR(255),
    description TEXT,
    location VARCHAR(100),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 🤝 Step 12: Connections Table (M:N using self-referencing Users)
CREATE TABLE Connections (
    connection_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id_1 INT,
    user_id_2 INT,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id_1) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_2) REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT unique_connection_pair UNIQUE (user_id_1, user_id_2)
);

-- 🧪 Step 13: Insert Sample Users with Roles
INSERT INTO Users (name, email, password_hash, role_id, bio) VALUES
('Admin One', 'admin@example.com', 'hashed_pwd1', 4, 'Platform administrator.'),
('Alumni Guy', 'alumni@example.com', 'hashed_pwd2', 3, '2005 batch. Working at Google.'),
('Student A', 'student@example.com', 'hashed_pwd3', 1, 'Final year CSE student.'),
('Faculty Sir', 'faculty@example.com', 'hashed_pwd4', 2, 'HOD of CSE Department.');
