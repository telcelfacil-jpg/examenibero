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
    'a650e73e60f72b5239220cd7de0b6868228e1cd92f8b884ecee66241c424e51c',
    '2026-03-18T00:00:00.000Z'
);
