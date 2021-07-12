const env = {
    database: "realstate",
    username: "root",
    password: "#Iris@2013",
    host: "192.168.40.192",
    port: "3306", 
    dialect: "mysql",
    srvPort: "8180",
    checkIPaddress: "https://api.ipify.org?format=json",
    secret: "@#SDfionli1818685*-+sfsf",
    storageUpload: "./public/uploads",
    mongooseURL:
      "mongodb+srv://homehubdd:X6HCdRhKsjKLdgRV@cluster0.ldvce.mongodb.net/homehubdd?retryWrites=true&w=majority",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    expiresIn: "1h", 
    expiresTime: "3600",
  };
  module.exports = env;