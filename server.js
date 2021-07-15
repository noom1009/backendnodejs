const app = require("./application");
const env = require('./settings/configs/env');

const port = process.env.PORT || env.srvPort;
app.listen(port, () => console.log(`Server is running on port ${port}!`));