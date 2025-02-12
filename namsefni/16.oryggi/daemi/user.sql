DROP ROLE IF EXISTS "vef2-user";
CREATE USER "vef2-user" WITH ENCRYPTED PASSWORD '123';
GRANT USAGE ON SCHEMA public TO "vef2-user";
GRANT ALL PRIVILEGES ON DATABASE "vef2-sql" TO "vef2-user";

-- Ef vef2-user notandinn bjó ekki til töflurnar
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "vef2-user";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "vef2-user";

-- Til að dæmi 06.sql-injection.js virki þarf notandinn að eiga töfluna.. :p
ALTER TABLE "students" OWNER TO "vef2-user";

