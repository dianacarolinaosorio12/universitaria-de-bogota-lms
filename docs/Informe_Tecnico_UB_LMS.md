# Informe Técnico - Plataforma LMS Universitaria de Bogotá

**Fecha:** 12 de febrero de 2026
**Versión:** 1.0 - Fase 1 (Identity + Auth)
**Autor:** Equipo de Desarrollo UB LMS

---

## 1. Resumen Ejecutivo

La plataforma LMS de la Universitaria de Bogotá es un sistema de gestión de aprendizaje construido con arquitectura de microservicios, diseñado para escalar de 1,000 a 15,000 estudiantes concurrentes. Esta primera fase implementa el servicio de identidad (autenticación JWT), API Gateway con YARP, y micro-frontends con React 19.

---

## 2. Pruebas Realizadas

### 2.1 Suite de Tests API (12/12 PASS)

| # | Test | Endpoint | Resultado |
|---|------|----------|-----------|
| 1 | API Gateway Status | `GET http://localhost:5000/` | PASS - Status: Running |
| 2 | Identity Health Check | `GET http://localhost:5001/health` | PASS - Healthy |
| 3 | Swagger OpenAPI | `GET http://localhost:5001/swagger/v1/swagger.json` | PASS - JSON schema disponible |
| 4 | Login Student | `POST /api/v1/auth/login` | PASS - JWT generado, Role: Student |
| 5 | Login Teacher | `POST /api/v1/auth/login` | PASS - JWT generado, Role: Teacher |
| 6 | Login Admin | `POST /api/v1/auth/login` | PASS - JWT generado, Role: Admin |
| 7 | GET /me (autenticado) | `GET /api/v1/auth/me` con Bearer token | PASS - Retorna datos del usuario |
| 8 | Refresh Token | `POST /api/v1/auth/refresh` | PASS - Nuevo access + refresh token |
| 9 | Credenciales inválidas | `POST /api/v1/auth/login` con datos incorrectos | PASS - 401 Unauthorized |
| 10 | Gateway Proxy | `POST http://localhost:5000/api/v1/auth/login` | PASS - Proxy transparente |
| 11 | Registro duplicado | `POST /api/v1/auth/register` email existente | PASS - 409 Conflict |
| 12 | Frontend accesible | `GET http://localhost:3000/` | PASS - HTML con "Universitaria" |

### 2.2 Usuarios de Prueba Registrados

| Rol | Email | Nombre | Departamento |
|-----|-------|--------|--------------|
| Student | estudiante@universitariadebogota.edu.co | Carlos Rodríguez | Ingeniería en IA |
| Teacher | docente@universitariadebogota.edu.co | María López | Ciencias de la Computación |
| Admin | admin@universitariadebogota.edu.co | Juan Martínez | Administración |

### 2.3 Pruebas Funcionales del Frontend

| Componente | Ruta | Descripción | Estado |
|------------|------|-------------|--------|
| Landing Page | `/` | Hero + Programas + Login + Beneficios + Footer | Implementado |
| Login Page | `/auth/login` | Formulario con email/password + SSO | Implementado |
| Dashboard Redirect | `/dashboard` | Redirección por rol tras login | Implementado |
| Auth MFE Login | `:3001/auth/login` | Login standalone | Implementado |
| Auth MFE Recovery | `:3001/auth/forgot-password` | Recuperación de contraseña | Implementado |

---

## 3. Arquitectura C4

### 3.1 Nivel 1: Contexto del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    ACTORES EXTERNOS                      │
├──────────┬──────────┬──────────┬────────────────────────┤
│Estudiante│ Docente  │  Admin   │ Azure AD (SSO)         │
│          │          │          │ Microsoft Teams        │
│          │          │          │ OpenAI/Claude API      │
└────┬─────┴────┬─────┴────┬─────┴──────────┬─────────────┘
     │          │          │                │
     ▼          ▼          ▼                ▼
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           PLATAFORMA LMS - UNIVERSITARIA DE BOGOTÁ      │
│                                                         │
│  Sistema de gestión de aprendizaje con gamificación,    │
│  predicciones IA, y Microsoft Teams integrado.          │
│  Escala: 1,000 - 15,000 usuarios concurrentes          │
│                                                         │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │    PostgreSQL 17     │
              │    Redis 7           │
              │    RabbitMQ 3        │
              └──────────────────────┘
```

### 3.2 Nivel 2: Contenedores

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (CDN)                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │  Shell   │  │   Auth   │  │ Student  │  │ Teacher  │  │  Admin   ││
│  │  (Host)  │  │   MFE    │  │ Portal   │  │ Portal   │  │  Panel   ││
│  │ :3000    │  │  :3001   │  │  :3002   │  │  :3003   │  │  :3004   ││
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘│
│       └──────────────┴──────────────┴──────────────┴──────────────┘     │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ HTTP/WebSocket
                                    ▼
                    ┌──────────────────────────────┐
                    │       API GATEWAY (YARP)     │
                    │       Puerto: 5000           │
                    │  - Rate Limiting             │
                    │  - Correlation ID            │
                    │  - CORS                      │
                    │  - Load Balancing            │
                    └──────────────┬───────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Identity Service │  │  Course Service  │  │Gamification Svc  │
│     :5001        │  │     :5002        │  │     :5005        │
│ - Auth JWT       │  │ - CRUD Cursos    │  │ - XP/DP System   │
│ - Register       │  │ - Contenido      │  │ - Badges         │
│ - SSO Azure AD   │  │ - Matrículas     │  │ - Rankings       │
└───────┬──────────┘  └───────┬──────────┘  └───────┬──────────┘
        │                     │                     │
        │  ┌──────────────────┼─────────────────┐   │
        │  │                  │                 │   │
        ▼  ▼                  ▼                 ▼   ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│Assessment Service│  │ Analytics Service│  │Notification Svc  │
│     :5004        │  │     :5006        │  │     :5007        │
│ - Quizzes CAT    │  │ - ML Predictions │  │ - SignalR        │
│ - Tareas         │  │ - Risk Scores    │  │ - Push/Email     │
│ - Calificaciones │  │ - Métricas       │  │ - Alertas        │
└───────┬──────────┘  └───────┬──────────┘  └───────┬──────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────────────────────────────────────────────────────┐
│                     INFRAESTRUCTURA                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │PostgreSQL 17│  │   Redis 7   │  │   RabbitMQ 3        │  │
│  │ Schema/svc  │  │   Cache     │  │   MassTransit v8    │  │
│  │ + PgBouncer │  │   Sessions  │  │   Events Async      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 Nivel 3: Componentes (Identity Service - Hexagonal)

```
┌─────────────────────────────────────────────────────────┐
│                  Identity.API (:5001)                     │
│  ┌─────────────────────────────────────────────────┐    │
│  │ AuthController                                   │    │
│  │  POST /auth/login    POST /auth/register         │    │
│  │  POST /auth/refresh  GET  /auth/me               │    │
│  └──────────────────────┬──────────────────────────┘    │
│  ┌──────────────────────┤                               │
│  │ExceptionHandling     │ JWT Auth Middleware            │
│  │Middleware             │                               │
│  └──────────────────────┘                               │
└─────────────────────────┬───────────────────────────────┘
                          │ MediatR (CQRS)
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Identity.Application                        │
│  ┌────────────────┐  ┌──────────────────┐               │
│  │   Commands      │  │   Validators      │              │
│  │ LoginCommand    │  │ LoginValidator    │              │
│  │ RegisterCommand │  │ RegisterValidator │              │
│  │ RefreshCommand  │  │                   │              │
│  └───────┬────────┘  └──────────────────┘               │
│          │                                               │
│  ┌───────┴────────────────────────────────┐             │
│  │ Ports (Interfaces)                      │             │
│  │ IJwtTokenGenerator  IPasswordHasher     │             │
│  └─────────────────────────────────────────┘             │
└─────────────────────────┬───────────────────────────────┘
                          │ Dependency Injection
                          ▼
┌─────────────────────────────────────────────────────────┐
│           Identity.Infrastructure                        │
│  ┌───────────────────┐  ┌───────────────────────┐       │
│  │ IdentityDbContext  │  │ JwtTokenGenerator     │       │
│  │ (EF Core 9)       │  │ BcryptPasswordHasher  │       │
│  └───────┬───────────┘  └───────────────────────┘       │
│  ┌───────┴───────────┐                                  │
│  │ UserRepository     │                                  │
│  │ RefreshTokenRepo   │                                  │
│  └───────────────────┘                                   │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Identity.Domain                             │
│  ┌────────────────┐  ┌────────────────────┐             │
│  │ Entities        │  │ Value Objects       │             │
│  │ User (Aggregate)│  │ Email               │             │
│  │ RefreshToken    │  │                     │             │
│  └────────────────┘  └────────────────────┘             │
│  ┌────────────────┐  ┌────────────────────┐             │
│  │ Enums           │  │ Ports (Interfaces)  │             │
│  │ UserRole        │  │ IUserRepository     │             │
│  │                 │  │ IRefreshTokenRepo   │             │
│  └────────────────┘  └────────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Modelo Entidad-Relación (Base de Datos)

### 4.1 Schema: `identity`

```
┌──────────────────────────────────────────────┐
│                identity.users                 │
├──────────────────────────────────────────────┤
│ PK  id              UUID          NOT NULL   │
│     external_id     VARCHAR(256)  UNIQUE     │
│     email           VARCHAR(256)  NOT NULL   │◄── UNIQUE INDEX
│     password_hash   VARCHAR(512)             │
│     first_name      VARCHAR(100)  NOT NULL   │
│     last_name       VARCHAR(100)  NOT NULL   │
│     role            VARCHAR(50)   NOT NULL   │
│     department      VARCHAR(200)             │
│     faculty         VARCHAR(200)             │
│     is_active       BOOLEAN       DEFAULT T  │
│     mfa_enabled     BOOLEAN       DEFAULT F  │
│     last_login_at   TIMESTAMP               │
│     created_at      TIMESTAMP     NOT NULL   │
│     updated_at      TIMESTAMP               │
└──────────────────────┬───────────────────────┘
                       │ 1
                       │
                       │ N
┌──────────────────────┴───────────────────────┐
│            identity.refresh_tokens            │
├──────────────────────────────────────────────┤
│ PK  id              UUID          NOT NULL   │
│ FK  user_id         UUID          NOT NULL   │──► identity.users(id)
│     token           VARCHAR(512)  NOT NULL   │◄── UNIQUE INDEX
│     expires_at      TIMESTAMP     NOT NULL   │
│     revoked_at      TIMESTAMP               │
│     created_at      TIMESTAMP     NOT NULL   │
└──────────────────────────────────────────────┘
```

### 4.2 Schemas Futuros (Fase 2-4)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ profiles.users   │     │courses.courses   │     │courses.themes   │
│ ─────────────── │     │ ─────────────── │     │ ─────────────── │
│ user_id (FK→id) │     │ id              │◄───│ course_id (FK) │
│ bio             │     │ title           │     │ title           │
│ avatar_url      │     │ description     │     │ order           │
│ phone           │     │ teacher_id (FK) │     │ content_type    │
│ preferences     │     │ status          │     └─────────────────┘
└─────────────────┘     └────────┬────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
          ┌────────┴────────┐     ┌──────────┴──────────┐
          │courses.enrollments│   │assessments.quizzes   │
          │ ─────────────── │     │ ─────────────────── │
          │ student_id (FK) │     │ course_id (FK)      │
          │ course_id (FK)  │     │ title               │
          │ enrolled_at     │     │ type (CAT/standard) │
          │ progress (%)    │     │ max_attempts        │
          └─────────────────┘     └─────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐
│gamification.xp_trans │     │gamification.badges    │
│ ──────────────────── │     │ ──────────────────── │
│ user_id (FK)         │     │ id                   │
│ points               │     │ name                 │
│ source               │     │ description          │
│ multiplier           │     │ category             │
│ created_at           │     │ icon_url             │
│ (PARTICIONADA/mes)   │     │ criteria             │
└──────────────────────┘     └──────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐
│analytics.risk_scores │     │notifications.alerts  │
│ ──────────────────── │     │ ──────────────────── │
│ student_id (FK)      │     │ user_id (FK)         │
│ risk_score (0-1)     │     │ type                 │
│ predicted_grade      │     │ title                │
│ factors (JSONB)      │     │ message              │
│ model_version        │     │ read_at              │
│ calculated_at        │     │ created_at           │
└──────────────────────┘     └──────────────────────┘
```

### 4.3 Relaciones entre Schemas

```
identity.users ──(1:1)──► profiles.user_profiles
identity.users ──(1:N)──► identity.refresh_tokens
identity.users ──(1:N)──► courses.enrollments (como student)
identity.users ──(1:N)──► courses.courses (como teacher)
identity.users ──(1:N)──► gamification.xp_transactions
identity.users ──(1:N)──► gamification.user_badges
identity.users ──(1:N)──► analytics.risk_scores
identity.users ──(1:N)──► notifications.alerts
courses.courses ──(1:N)──► courses.themes
courses.courses ──(1:N)──► assessments.quizzes
courses.themes  ──(1:N)──► assessments.tasks
```

---

## 5. Estrategia de Escalabilidad Horizontal

### 5.1 Tiers de Escala

```
┌─────────────────────────────────────────────────────────────────┐
│                    TIER 1: 1,000 usuarios                       │
├─────────────────────────────────────────────────────────────────┤
│ Infraestructura:                                                │
│  - 1x API Gateway                                              │
│  - 1x instancia por microservicio                              │
│  - 1x PostgreSQL (single node)                                 │
│  - 1x Redis (standalone)                                       │
│  - 1x RabbitMQ (single node)                                   │
│                                                                 │
│ Recursos: ~4 CPU cores, ~8 GB RAM                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    TIER 2: 5,000 usuarios                       │
├─────────────────────────────────────────────────────────────────┤
│ Infraestructura:                                                │
│  - 2x API Gateway (load balanced)                              │
│  - 2-3x réplicas de servicios con más carga                    │
│  - PostgreSQL + 1 Read Replica + PgBouncer                     │
│  - Redis Sentinel (3 nodos)                                    │
│  - RabbitMQ Cluster (3 nodos)                                  │
│  - CDN para assets estáticos y bundles MFE                     │
│                                                                 │
│ Recursos: ~16 CPU cores, ~32 GB RAM                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    TIER 3: 15,000 usuarios                      │
├─────────────────────────────────────────────────────────────────┤
│ Infraestructura:                                                │
│  - 3x API Gateway (con autoscaling)                            │
│  - 2-8x réplicas por servicio (HPA en Kubernetes)              │
│  - PostgreSQL Primary + 2 Read Replicas + PgBouncer            │
│  - Redis Cluster (6 nodos: 3 masters + 3 replicas)             │
│  - RabbitMQ Cluster (3 nodos) + Federation                     │
│  - CDN global (CloudFront/Azure CDN)                           │
│  - Table Partitioning (xp_transactions, activity_logs)         │
│                                                                 │
│ Recursos: ~48 CPU cores, ~96 GB RAM                            │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Diagrama de Escalamiento Horizontal con Kubernetes

```
                        ┌───────────────┐
                        │  Load Balancer│
                        │  (Ingress)    │
                        └───────┬───────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────┴──────┐ ┌─────┴──────┐ ┌──────┴──────┐
        │ API Gateway  │ │ API Gateway│ │ API Gateway │
        │  Pod 1       │ │  Pod 2     │ │  Pod 3      │
        └───────┬──────┘ └─────┬──────┘ └──────┬──────┘
                └───────────────┼───────────────┘
                                │
         ┌──────────────────────┼──────────────────────┐
         │                      │                      │
    ┌────┴────┐           ┌─────┴────┐           ┌─────┴────┐
    │Identity │           │ Course   │           │Gamificat.│
    │Service  │           │ Service  │           │ Service  │
    │         │           │          │           │          │
    │ Pod 1   │           │ Pod 1    │           │ Pod 1    │
    │ Pod 2   │           │ Pod 2    │           │ Pod 2    │
    │         │           │ Pod 3    │           │ Pod 3    │
    │ HPA:2-4 │           │ HPA:2-8  │           │ HPA:2-6  │
    └────┬────┘           └────┬─────┘           └────┬─────┘
         │                     │                      │
         └─────────────────────┼──────────────────────┘
                               │
    ┌──────────────────────────┼──────────────────────────┐
    │                          │                          │
    ▼                          ▼                          ▼
┌──────────┐          ┌──────────────┐          ┌──────────────┐
│PostgreSQL│          │    Redis     │          │  RabbitMQ    │
│ Primary  │──rep──►  │   Cluster    │          │  Cluster     │
│          │          │  (6 nodos)   │          │  (3 nodos)   │
│ Read Rep1│          │              │          │              │
│ Read Rep2│          │  L1: Memory  │          │  MassTransit │
│+PgBouncer│          │  L2: Redis   │          │  v8          │
└──────────┘          └──────────────┘          └──────────────┘
```

### 5.3 Estrategias Clave de Escalamiento

| Componente | Estrategia | Detalle |
|------------|-----------|---------|
| **API Gateway** | HPA 2-3 pods | Autoscaling por CPU > 70% |
| **Microservicios** | HPA 2-8 pods | Cada servicio escala independientemente |
| **PostgreSQL** | Read Replicas + PgBouncer | Primary para writes, replicas para reads |
| **Redis** | Cluster mode (6 nodos) | HybridCache .NET 9: L1 memory + L2 Redis |
| **RabbitMQ** | Cluster + mirrored queues | Eventos async entre servicios |
| **Frontend** | CDN + Module Federation | Bundles MFE cacheados en CDN global |
| **Tablas grandes** | Partitioning por mes | xp_transactions, activity_logs, audit_trail |
| **Base de datos** | Schema-per-service | Aislamiento: cada servicio tiene su schema y rol |
| **Caché** | TTL por tipo de dato | Rankings: 30s, Perfiles: 5min, Cursos: 15min |
| **WebSocket** | SignalR + Redis Backplane | Notificaciones real-time multi-instancia |

### 5.4 Kubernetes HPA Configuration

```yaml
# Ejemplo: Course Service (servicio con más carga)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: course-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: course-service
  minReplicas: 2
  maxReplicas: 8
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### 5.5 PgBouncer Connection Pooling

```
┌─────────────────────────┐
│     Microservicios      │
│  (N instancias cada uno)│
│  Identity: 4 pods       │
│  Course: 8 pods         │
│  Gamification: 6 pods   │
│  ... (total ~40 pods)   │
└───────────┬─────────────┘
            │ ~200 conexiones
            ▼
┌─────────────────────────┐
│       PgBouncer         │
│  Mode: Transaction      │
│  Max client conn: 500   │
│  Default pool size: 20  │
│  Reserve pool: 5        │
└───────────┬─────────────┘
            │ ~25 conexiones reales
            ▼
┌─────────────────────────┐
│     PostgreSQL 17       │
│  max_connections: 100   │
│  shared_buffers: 4GB    │
│  effective_cache: 12GB  │
└─────────────────────────┘
```

---

## 6. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend Framework | ASP.NET Core | 9.0 |
| Arquitectura | Hexagonal + CQRS + MediatR | 12.4.1 |
| API Gateway | YARP | 2.3.0 |
| ORM | Entity Framework Core | 9.0.4 |
| Base de Datos | PostgreSQL | 17 |
| Cache | Redis + .NET HybridCache | 7 |
| Message Broker | RabbitMQ + MassTransit | v8 |
| Frontend Framework | React | 19 |
| Build Tool | Vite | 6 |
| Micro-frontends | Module Federation | Vite plugin |
| State Management | Zustand + TanStack Query | 5.x / 5.x |
| Monorepo | pnpm + Turborepo | 10.x / 2.x |
| Contenedores | Docker + Kubernetes | latest |
| CI/CD | GitHub Actions | - |
| Observabilidad | OpenTelemetry + Prometheus + Grafana | - |

---

## 7. Estructura del Proyecto

```
universitaria-de-bogota-lms/
├── src/
│   ├── Gateway/UB.ApiGateway/         # YARP Reverse Proxy (:5000)
│   ├── SharedKernel/UB.SharedKernel/  # DDD base classes + events
│   └── Services/
│       └── IdentityService/
│           ├── Identity.Domain/       # Entities, ValueObjects, Ports
│           ├── Identity.Application/  # Commands, Queries, DTOs
│           ├── Identity.Infrastructure/ # EF Core, JWT, BCrypt
│           └── Identity.API/          # Controllers, Middleware
├── frontend/
│   ├── apps/
│   │   ├── shell/                     # Host MFE + Landing Page (:3000)
│   │   └── auth/                      # Login + Forgot Password (:3001)
│   └── packages/
│       ├── ui-components/             # Design system (colores UB)
│       ├── api-client/                # HTTP client + auth
│       └── shared-types/              # TypeScript interfaces
├── infrastructure/
│   └── docker/
│       ├── docker-compose.yml         # PostgreSQL, Redis, RabbitMQ
│       └── init-db.sql                # Schemas + roles por servicio
└── UB.LMS.sln                         # .NET Solution (6 proyectos)
```

---

## 8. Próximas Fases

| Fase | Alcance | Servicios |
|------|---------|-----------|
| **Fase 2** | Core Platform | Course Service, Assessment Service, Student Portal MFE, Teacher Portal MFE |
| **Fase 3** | Gamificación | Gamification Service (XP/DP), Forum Service, Integration Service (Teams), Notification Service (SignalR) |
| **Fase 4** | Inteligencia | AI Service (Chatbot), Analytics Service (ML predictions), Admin Panel MFE |
| **Fase 5** | Escala | Kubernetes + Helm, HPA, PgBouncer, Redis Cluster, CDN, Load Testing 15K |
