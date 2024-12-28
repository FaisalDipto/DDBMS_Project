-- Create separate databases for each blood group
CREATE DATABASE donors_a;
CREATE DATABASE donors_b;
CREATE DATABASE donors_ab;
CREATE DATABASE donors_o;

-- A+ Database
USE donors_a;
CREATE TABLE a_positive (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    last_donation_date DATE,
    medical_history TEXT,
    eligibility_status BOOLEAN DEFAULT TRUE,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL
);

-- A- Database
USE donors_a;
CREATE TABLE a_negative (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    last_donation_date DATE,
    medical_history TEXT,
    eligibility_status BOOLEAN DEFAULT TRUE,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL
);

-- B+ Database
USE donors_b;
CREATE TABLE b_positive (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    last_donation_date DATE,
    medical_history TEXT,
    eligibility_status BOOLEAN DEFAULT TRUE,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL
);

-- B- Database
USE donors_b;
CREATE TABLE b_negative (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    last_donation_date DATE,
    medical_history TEXT,
    eligibility_status BOOLEAN DEFAULT TRUE,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL
);

-- AB+ Database
USE donors_ab;
CREATE TABLE ab_positive (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    last_donation_date DATE,
    medical_history TEXT,
    eligibility_status BOOLEAN DEFAULT TRUE,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL
);

-- AB- Database
USE donors_ab;
CREATE TABLE ab_negative (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    last_donation_date DATE,
    medical_history TEXT,
    eligibility_status BOOLEAN DEFAULT TRUE,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL
);

-- O+ Database
USE donors_o;
CREATE TABLE o_positive (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    last_donation_date DATE,
    medical_history TEXT,
    eligibility_status BOOLEAN DEFAULT TRUE,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL
);

-- O- Database
USE donors_o;
CREATE TABLE o_negative (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    last_donation_date DATE,
    medical_history TEXT,
    eligibility_status BOOLEAN DEFAULT TRUE,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL
);