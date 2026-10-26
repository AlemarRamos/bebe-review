// Generates complete SQL database schema and seed data for XAMPP / MySQL / phpMyAdmin

export function generateSqlSchema(): string {
  return `-- ====================================================================
-- PHILIPPINE NURSE LICENSURE EXAMINATION (PNLE) PRE-BOARD PRACTICE SYSTEM
-- Complete Database Schema for MySQL / MariaDB (XAMPP / phpMyAdmin)
-- ====================================================================

CREATE DATABASE IF NOT EXISTS \`nursing_preboard\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`nursing_preboard\`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS \`audit_logs\`;
DROP TABLE IF EXISTS \`study_history\`;
DROP TABLE IF EXISTS \`bookmarks\`;
DROP TABLE IF EXISTS \`attempt_questions\`;
DROP TABLE IF EXISTS \`examination_attempts\`;
DROP TABLE IF EXISTS \`question_variants\`;
DROP TABLE IF EXISTS \`questions\`;
DROP TABLE IF EXISTS \`concepts\`;
DROP TABLE IF EXISTS \`topics\`;
DROP TABLE IF EXISTS \`subjects\`;
DROP TABLE IF EXISTS \`users\`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users Table
CREATE TABLE \`users\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`full_name\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('student', 'faculty', 'administrator') NOT NULL DEFAULT 'student',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Subjects Table
CREATE TABLE \`subjects\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`subject_name\` VARCHAR(255) NOT NULL,
  \`short_name\` VARCHAR(50) NOT NULL,
  \`default_quota\` INT NOT NULL DEFAULT 50,
  \`description\` TEXT,
  \`is_active\` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Topics Table
CREATE TABLE \`topics\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`subject_id\` VARCHAR(50) NOT NULL,
  \`topic_name\` VARCHAR(255) NOT NULL,
  \`description\` TEXT,
  \`learning_objective\` TEXT,
  CONSTRAINT \`fk_topics_subject\` FOREIGN KEY (\`subject_id\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Concepts Table
CREATE TABLE \`concepts\` (
  \`id\` VARCHAR(100) PRIMARY KEY,
  \`topic_id\` INT UNSIGNED NOT NULL,
  \`concept_name\` VARCHAR(255) NOT NULL,
  \`concept_description\` TEXT,
  CONSTRAINT \`fk_concepts_topic\` FOREIGN KEY (\`topic_id\`) REFERENCES \`topics\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Questions Table
CREATE TABLE \`questions\` (
  \`id\` VARCHAR(100) PRIMARY KEY,
  \`concept_id\` VARCHAR(100) NOT NULL,
  \`subject_id\` VARCHAR(50) NOT NULL,
  \`topic\` VARCHAR(255) NOT NULL,
  \`learning_objective\` TEXT NOT NULL,
  \`difficulty\` ENUM('Easy', 'Moderate', 'Difficult') NOT NULL DEFAULT 'Moderate',
  \`question_type\` VARCHAR(50) NOT NULL DEFAULT 'clinical_scenario',
  \`question_text\` TEXT NOT NULL,
  \`option_a\` TEXT NOT NULL,
  \`option_b\` TEXT NOT NULL,
  \`option_c\` TEXT NOT NULL,
  \`option_d\` TEXT NOT NULL,
  \`correct_option\` CHAR(1) NOT NULL,
  \`rationale_core\` TEXT NOT NULL,
  \`rationale_why_correct\` TEXT NOT NULL,
  \`reference_text\` VARCHAR(255) DEFAULT NULL,
  \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_subject\` (\`subject_id\`),
  INDEX \`idx_concept\` (\`concept_id\`),
  CONSTRAINT \`fk_questions_subject\` FOREIGN KEY (\`subject_id\`) REFERENCES \`subjects\`(\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Question Variants Table (Concept variant linking for retakes)
CREATE TABLE \`question_variants\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`concept_id\` VARCHAR(100) NOT NULL,
  \`question_id\` VARCHAR(100) NOT NULL,
  \`variant_group_id\` VARCHAR(100) NOT NULL,
  \`validation_status\` ENUM('validated', 'under_review', 'archived') NOT NULL DEFAULT 'validated',
  CONSTRAINT \`fk_qv_question\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Examination Attempts Table (Stores exactly 500-item attempts)
CREATE TABLE \`examination_attempts\` (
  \`id\` VARCHAR(100) PRIMARY KEY,
  \`user_id\` INT UNSIGNED NOT NULL,
  \`attempt_number\` INT NOT NULL DEFAULT 1,
  \`total_questions\` INT NOT NULL DEFAULT 500,
  \`correct_count\` INT NOT NULL DEFAULT 0,
  \`incorrect_count\` INT NOT NULL DEFAULT 0,
  \`unanswered_count\` INT NOT NULL DEFAULT 500,
  \`raw_score\` INT NOT NULL DEFAULT 0,
  \`percentage\` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  \`passed_benchmark\` TINYINT(1) NOT NULL DEFAULT 0,
  \`duration_seconds\` INT NOT NULL DEFAULT 0,
  \`time_allocated_seconds\` INT NOT NULL DEFAULT 36000,
  \`status\` ENUM('in_progress', 'submitted', 'abandoned') NOT NULL DEFAULT 'in_progress',
  \`started_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`submitted_at\` TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT \`fk_exam_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Attempt Questions Snapshot Table
CREATE TABLE \`attempt_questions\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`attempt_id\` VARCHAR(100) NOT NULL,
  \`question_id\` VARCHAR(100) NOT NULL,
  \`question_order\` INT NOT NULL,
  \`selected_option\` CHAR(1) DEFAULT NULL,
  \`is_flagged\` TINYINT(1) NOT NULL DEFAULT 0,
  \`is_correct\` TINYINT(1) DEFAULT NULL,
  \`question_text_snapshot\` TEXT NOT NULL,
  \`option_a_snapshot\` TEXT NOT NULL,
  \`option_b_snapshot\` TEXT NOT NULL,
  \`option_c_snapshot\` TEXT NOT NULL,
  \`option_d_snapshot\` TEXT NOT NULL,
  \`correct_option_snapshot\` CHAR(1) NOT NULL,
  CONSTRAINT \`fk_aq_attempt\` FOREIGN KEY (\`attempt_id\`) REFERENCES \`examination_attempts\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Bookmarks Table
CREATE TABLE \`bookmarks\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT UNSIGNED NOT NULL,
  \`question_id\` VARCHAR(100) NOT NULL,
  \`notes\` TEXT DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT \`fk_bookmarks_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_bookmarks_question\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Study History Table
CREATE TABLE \`study_history\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT UNSIGNED NOT NULL,
  \`question_id\` VARCHAR(100) NOT NULL,
  \`selected_option\` CHAR(1) NOT NULL,
  \`was_correct\` TINYINT(1) NOT NULL,
  \`practiced_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT \`fk_study_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Audit Logs Table
CREATE TABLE \`audit_logs\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT UNSIGNED DEFAULT NULL,
  \`action\` VARCHAR(255) NOT NULL,
  \`ip_address\` VARCHAR(45) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ====================================================================
-- Initial Seed Data: 8 PNLE Subjects
-- ====================================================================
INSERT INTO \`subjects\` (\`id\`, \`subject_name\`, \`short_name\`, \`default_quota\`, \`description\`) VALUES
('fundamentals', 'Fundamentals of Nursing', 'FON', 50, 'Nursing process, vital signs, asepsis, dosage calculation, positioning, catheterization, safety'),
('community_health', 'Community Health Nursing', 'CHN', 65, 'Primary health care, COPAR, EPI, cold chain, DOH health programs, epidemiology, vital statistics'),
('maternal_child', 'Maternal and Child Health Nursing', 'MCHN', 75, 'Antepartum, intrapartum, postpartum, high-risk conditions, APGAR, EINC, pediatric development'),
('medical_surgical', 'Medical-Surgical Nursing', 'MSN', 145, 'Cardiovascular, respiratory, neurological, gastrointestinal, renal, endocrine, oncology, burns'),
('psychiatric', 'Psychiatric and Mental Health Nursing', 'PMHN', 45, 'Therapeutic communication, schizophrenia, mood disorders, defense mechanisms, lithium safety'),
('leadership_ethics', 'Leadership, Management, Ethics & Jurisprudence', 'LMEJ', 45, 'RA 9173 (Philippine Nursing Act), Code of Ethics, delegation, torts, negligence vs malpractice'),
('research', 'Nursing Research & Evidence-Based Practice', 'NREBP', 25, 'Study designs, variables, sampling, validity, statistical significance, Belmont report ethics'),
('integrated_clinical', 'Integrated Clinical Judgment & Competencies', 'ICJC', 50, 'Prioritization (ABCs), mass casualty START triage, sepsis bundle, emergency lab interpretation');

-- Seed Default Admin and Student Users (Password: Nursing2026!)
INSERT INTO \`users\` (\`full_name\`, \`email\`, \`password_hash\`, \`role\`) VALUES
('PNLE Head Administrator', 'admin@pnle-preboard.edu.ph', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeT9/Nn54Rk5V0j7NqO/r1oY.hE21eGfK', 'administrator'),
('Juan Dela Cruz, BSN', 'student@pnle-preboard.edu.ph', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeT9/Nn54Rk5V0j7NqO/r1oY.hE21eGfK', 'student');
`;
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
