INSERT INTO "User" (
  "id",
  "email",
  "password",
  "role",
  "createdAt"
)
VALUES (
  gen_random_uuid(),
  'admin@dsarportal.com',
  '$2b$10$J8xZxYp6zYFzQ5K1Yx7Y6eQvE6fZ0rE2ZJ7d7c8k6zG9z0F6u',
  'admin',
  NOW()
)
ON CONFLICT ("email") DO NOTHING;
