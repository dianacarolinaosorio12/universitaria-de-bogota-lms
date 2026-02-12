-- Initialize schemas for each microservice
CREATE SCHEMA IF NOT EXISTS identity;
CREATE SCHEMA IF NOT EXISTS profiles;
CREATE SCHEMA IF NOT EXISTS courses;
CREATE SCHEMA IF NOT EXISTS assessments;
CREATE SCHEMA IF NOT EXISTS gamification;
CREATE SCHEMA IF NOT EXISTS analytics;
CREATE SCHEMA IF NOT EXISTS notifications;
CREATE SCHEMA IF NOT EXISTS forums;
CREATE SCHEMA IF NOT EXISTS ai_service;
CREATE SCHEMA IF NOT EXISTS integrations;

-- Create roles for each service (schema isolation)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'identity_svc') THEN
        CREATE ROLE identity_svc WITH LOGIN PASSWORD 'identity_svc_2026';
    END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'profiles_svc') THEN
        CREATE ROLE profiles_svc WITH LOGIN PASSWORD 'profiles_svc_2026';
    END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'courses_svc') THEN
        CREATE ROLE courses_svc WITH LOGIN PASSWORD 'courses_svc_2026';
    END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'assessments_svc') THEN
        CREATE ROLE assessments_svc WITH LOGIN PASSWORD 'assessments_svc_2026';
    END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'gamification_svc') THEN
        CREATE ROLE gamification_svc WITH LOGIN PASSWORD 'gamification_svc_2026';
    END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'analytics_svc') THEN
        CREATE ROLE analytics_svc WITH LOGIN PASSWORD 'analytics_svc_2026';
    END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'notifications_svc') THEN
        CREATE ROLE notifications_svc WITH LOGIN PASSWORD 'notifications_svc_2026';
    END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'forums_svc') THEN
        CREATE ROLE forums_svc WITH LOGIN PASSWORD 'forums_svc_2026';
    END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'ai_svc') THEN
        CREATE ROLE ai_svc WITH LOGIN PASSWORD 'ai_svc_2026';
    END IF;
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'integrations_svc') THEN
        CREATE ROLE integrations_svc WITH LOGIN PASSWORD 'integrations_svc_2026';
    END IF;
END
$$;

-- Grant schema permissions
GRANT ALL PRIVILEGES ON SCHEMA identity TO identity_svc;
GRANT ALL PRIVILEGES ON SCHEMA profiles TO profiles_svc;
GRANT ALL PRIVILEGES ON SCHEMA courses TO courses_svc;
GRANT ALL PRIVILEGES ON SCHEMA assessments TO assessments_svc;
GRANT ALL PRIVILEGES ON SCHEMA gamification TO gamification_svc;
GRANT ALL PRIVILEGES ON SCHEMA analytics TO analytics_svc;
GRANT ALL PRIVILEGES ON SCHEMA notifications TO notifications_svc;
GRANT ALL PRIVILEGES ON SCHEMA forums TO forums_svc;
GRANT ALL PRIVILEGES ON SCHEMA ai_service TO ai_svc;
GRANT ALL PRIVILEGES ON SCHEMA integrations TO integrations_svc;

-- Grant default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA identity GRANT ALL ON TABLES TO identity_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA profiles GRANT ALL ON TABLES TO profiles_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA courses GRANT ALL ON TABLES TO courses_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA assessments GRANT ALL ON TABLES TO assessments_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA gamification GRANT ALL ON TABLES TO gamification_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA analytics GRANT ALL ON TABLES TO analytics_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA notifications GRANT ALL ON TABLES TO notifications_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA forums GRANT ALL ON TABLES TO forums_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA ai_service GRANT ALL ON TABLES TO ai_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA integrations GRANT ALL ON TABLES TO integrations_svc;
