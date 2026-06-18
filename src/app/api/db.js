// src/app/api/db.js
if (!global.usersDatabase) global.usersDatabase = [];
if (!global.playersDatabase) global.playersDatabase = []; // Tambahkan ini

export const usersDatabase = global.usersDatabase;
export const playersDatabase = global.playersDatabase;