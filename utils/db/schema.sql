-- Boussole du Savoir — Complete Database Schema
-- Run this file with: psql $DATABASE_URL -f utils/db/schema.sql

-- Create ENUM types
CREATE TYPE user_level AS ENUM ('primaire', 'college', 'lycee', 'universite');
CREATE TYPE question_type AS ENUM ('multiple_choice', 'true_false', 'short_answer');
CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed');

-- ============================================================================
-- Users & Profiles
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    level user_level DEFAULT 'primaire',
    class_details VARCHAR(50),                  -- e.g., "6eme", "2nde_A", "Terminale_C"
    university_domain VARCHAR(100),             -- e.g., "ia", "informatique", "medecine"
    avatar_url TEXT,
    bio TEXT,
    language VARCHAR(10) DEFAULT 'fr',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Content Structure
-- ============================================================================

CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    level user_level,
    icon_url TEXT,
    order_index INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    level_number INT,
    description TEXT,
    theme VARCHAR(100),
    illustration_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    level_id INTEGER REFERENCES levels(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    total_questions INT DEFAULT 10,
    passing_score INT DEFAULT 70,
    video_url TEXT,
    estimated_duration_minutes INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(subject_id, level_id)
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type question_type DEFAULT 'multiple_choice',
    order_index INT,
    difficulty INT DEFAULT 1,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS answer_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    order_index INT
);

-- ============================================================================
-- User Progress & Scores
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    score INT,
    hearts_remaining INT DEFAULT 3,
    status progress_status DEFAULT 'not_started',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, quiz_id)
);

CREATE TABLE IF NOT EXISTS user_answers (
    id SERIAL PRIMARY KEY,
    user_progress_id INTEGER REFERENCES user_progress(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questions(id),
    selected_option_id INTEGER REFERENCES answer_options(id),
    is_correct BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    badge_name VARCHAR(100),
    description TEXT,
    icon_url TEXT,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_name)
);

-- ============================================================================
-- Content Cache (Generated via Claude API)
-- ============================================================================

CREATE TABLE IF NOT EXISTS content_cache (
    id SERIAL PRIMARY KEY,
    cache_key VARCHAR(500) UNIQUE NOT NULL,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    content_type VARCHAR(50),                  -- 'questions', 'topo', 'explanation'
    generated_content JSONB NOT NULL,
    token_cost INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    hit_count INT DEFAULT 0,
    last_accessed TIMESTAMP
);

-- ============================================================================
-- Chat History
-- ============================================================================

CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user',           -- 'user' or 'assistant'
    context_subject_id INTEGER REFERENCES subjects(id),
    context_quiz_id INTEGER REFERENCES quizzes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_level ON profiles(level);

CREATE INDEX idx_subjects_level ON subjects(level);
CREATE INDEX idx_quizzes_subject ON quizzes(subject_id);
CREATE INDEX idx_quizzes_level ON quizzes(level_id);
CREATE INDEX idx_questions_quiz ON questions(quiz_id);
CREATE INDEX idx_answer_options_question ON answer_options(question_id);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_quiz ON user_progress(quiz_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
CREATE INDEX idx_user_answers_progress ON user_answers(user_progress_id);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);

CREATE INDEX idx_cache_key ON content_cache(cache_key);
CREATE INDEX idx_cache_expiry ON content_cache(expires_at);
CREATE INDEX idx_cache_quiz ON content_cache(quiz_id);

CREATE INDEX idx_chat_user ON chat_messages(user_id, created_at DESC);
CREATE INDEX idx_chat_context ON chat_messages(context_quiz_id);

-- ============================================================================
-- End of Schema
-- ============================================================================

-- Grant permissions (if using Vercel Postgres with default user)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "default";
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "default";
