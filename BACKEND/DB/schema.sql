CREATE DATABASE IF NOT EXISTS AlumniInteractionDB;
USE AlumniInteractionDB;
-- Drop all tables if they exist (for clean re-run)
DROP TABLE IF EXISTS Connections, RSVPs, Messages, Comments, Posts, Jobs, Events, Alumni, Users;

-- Users table
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50), -- e.g., 'student', 'alumni', 'admin'
    profile_picture TEXT,
    bio TEXT
);

-- Alumni table (One-to-One with Users)
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

-- Posts table (One-to-Many with Users)
CREATE TABLE Posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Comments table (One-to-Many with Posts and Users)
CREATE TABLE Comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    user_id INT,
    comment_text TEXT,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Messages table (Self-referencing One-to-Many with Users)
CREATE TABLE Messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiver_id INT,
    message_text TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Events table (One-to-Many with Users)
CREATE TABLE Events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    event_date DATE,
    location VARCHAR(255),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- RSVPs table (One-to-Many with Users and Events)
CREATE TABLE RSVPs (
    rsvp_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_id INT,
    response ENUM('yes', 'no', 'maybe') DEFAULT 'yes',
    responded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE
);

-- Jobs table (One-to-Many with Users)
CREATE TABLE Jobs (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    posted_by INT,
    title VARCHAR(255),
    description TEXT,
    location VARCHAR(100),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Connections table (Many-to-Many using junction table with Users)
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