# Philippine Nurse Licensure Examination (PNLE) Pre-Board Examination Practice System

A complete, fully functional 500-item Nursing Pre-Board Examination practice system designed for BS Nursing students preparing for the Philippine Nurse Licensure Examination administered by the Professional Regulation Commission (PRC) Board of Nursing.

---

## System Features

1. **Exact 500-Item Examination**:
   Every full attempt generates exactly 500 multiple-choice questions aligned with the verified PNLE Table of Specifications / Blueprint:
   - Fundamentals of Nursing (50 items)
   - Community Health Nursing (65 items)
   - Maternal and Child Health Nursing (75 items)
   - Medical-Surgical Nursing (145 items)
   - Psychiatric and Mental Health Nursing (45 items)
   - Leadership, Management, Ethics & Jurisprudence (45 items)
   - Nursing Research & Evidence-Based Practice (25 items)
   - Integrated Clinical Judgment & Competencies (50 items)
   - **TOTAL: 500 items**

2. **Retake Examination with Concept Variants**:
   Generates a different 500-question test on every retake, pulling alternate validated question variants from the same concept groups with recalculated answer keys and shuffled option positions.

3. **Real-Time Countdown Timer & Progress Tracking**:
   Default 600-minute simulation timer with persistent local and database storage, pause/resume, and auto-submission on expiration.

4. **1 to 500 Question Navigator Grid**:
   Instant filtering by Answered, Unanswered, Flagged for Review, and Subject area with direct question jump.

5. **Server-Side Scoring & Immediate Results**:
   Automated scoring, raw score out of 500, percentage calculation, and 75% practice benchmark status indicator.

6. **Full Question Rationales & Distractor Analysis**:
   Detailed explanations for all 500 questions, explaining why the correct answer is prioritized and analyzing the distractors, supported by textbook and statutory references.

7. **Self-Paced Study Mode & Bookmarks**:
   Practice drills by subject and difficulty with immediate answer reveal.

---

## Local XAMPP Setup Instructions

### 1. Requirements
- XAMPP for Windows / macOS / Linux
- PHP 8.0, 8.1, or 8.2 with PDO MySQL extension
- Apache Web Server
- MariaDB / MySQL 5.7+

### 2. Database Import via phpMyAdmin
1. Start **Apache** and **MySQL** in your XAMPP Control Panel.
2. Open your web browser and go to: `http://localhost/phpmyadmin/`.
3. Click the **Import** tab on the top menu.
4. Choose the `nursing_preboard_schema.sql` file provided in this package.
5. Click **Go** at the bottom of the page. This will automatically create the `nursing_preboard` database and all 11 relational tables with initial seed subjects.

### 3. File Deployment
1. Copy the contents of this project folder into your XAMPP web root:
   - On Windows: `C:\xampp\htdocs\nursing-preboard\`
   - On macOS: `/Applications/XAMPP/htdocs/nursing-preboard/`
   - On Linux: `/opt/lampp/htdocs/nursing-preboard/`
2. Configure database credentials in `config/database.php` (default is host: `localhost`, user: `root`, password: empty).

### 4. Running the Application
Open your web browser and navigate to:
```
http://localhost/nursing-preboard/
```

Default credentials:
- **Student**: `student@pnle-preboard.edu.ph` / `Nursing2026!`
- **Administrator**: `admin@pnle-preboard.edu.ph` / `Nursing2026!`
