# Backend Service Architecture Boundary

## Status: Postponed (Phase P1)
Backend services, database integrations (e.g. Supabase, PostgreSQL), and API layers are intentionally omitted during Phase P1.

### Future Integration Model
When backend services are introduced in later phases, they will:
1. Provide RESTful / GraphQL endpoints for dynamic monument content, verified hotspot ledger data, and multimedia assets.
2. Align with the frontend data contracts defined in `client/src/types/monument.ts`.
3. Support optional user authentication, bookmarks, and community annotations.
