require('dotenv').config();

// const app = require('./app');   
const app = require('./index');

const connection = require('./DatabaseConnection/connection');
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});



