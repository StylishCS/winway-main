const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "bykoxpxsybzqzwzbmww8-mysql.services.clever-cloud.com",
    user: "u4ptjd6izxqtlgbq",
    password: "bgfPeCuyrFUVFI6eYEP7",
    database: "bykoxpxsybzqzwzbmww8",
    port: "3306",
});

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "db",
//     port: "3306",
// });

connection.connect((err) => {
    if (err) throw err;
    console.log("DB CONNECTED");
});

module.exports = {connection};