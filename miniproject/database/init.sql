-- Create database
CREATE DATABASE IF NOT EXISTS htplus_appointment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE htplus_appointment;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('employee', 'doctor', 'admin') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    reason TEXT,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: password123)
-- Password hash for 'password123'
INSERT INTO users (username, password, role, full_name, email, phone) VALUES
('admin', '$2y$12$exlPpa4NZtL4SOnY534i2OeUjklDgZ9l9pYtUz5Xo9M3RmcpVsbNm', 'admin', 'Administrator', 'admin@htplus.com', '0123456789');

-- Insert sample doctors
INSERT INTO doctors (full_name, specialty, email, phone) VALUES
('Bác sĩ Nguyễn Văn A', 'Nội khoa', 'doctora@htplus.com', '0987654321'),
('Bác sĩ Trần Thị B', 'Ngoại khoa', 'doctorb@htplus.com', '0987654322'),
('Bác sĩ Lê Văn C', 'Tim mạch', 'doctorc@htplus.com', '0987654323');

-- Insert sample employee (password: password123)
INSERT INTO users (username, password, role, full_name, email, phone) VALUES
('employee1', '$2y$12$exlPpa4NZtL4SOnY534i2OeUjklDgZ9l9pYtUz5Xo9M3RmcpVsbNm', 'employee', 'Nhân viên 1', 'emp1@htplus.com', '0123456780');

-- Insert sample doctor user (password: password123)
-- Link doctor user to doctor record
INSERT INTO users (username, password, role, full_name, email, phone) VALUES
('doctor1', '$2y$12$exlPpa4NZtL4SOnY534i2OeUjklDgZ9l9pYtUz5Xo9M3RmcpVsbNm', 'doctor', 'Bác sĩ Nguyễn Văn A', 'doctora@htplus.com', '0987654321');

-- Update doctor record to link with user
UPDATE doctors SET user_id = (SELECT id FROM users WHERE username = 'doctor1') WHERE email = 'doctora@htplus.com';

