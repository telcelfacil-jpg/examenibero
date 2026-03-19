INSERT OR IGNORE INTO users (
    id,
    username,
    display_name,
    role,
    password_salt,
    password_hash,
    created_at
) VALUES (
    'student-ari',
    'ari',
    'Ariadna',
    'student',
    'df42b9528f156f7ce4bf0acdb18f2354',
    '6a5dfcfbae0e930e4c4c00c542a255263232949470d9e81a2f785d969c20ccb5',
    '2026-03-18T00:00:00.000Z'
);
