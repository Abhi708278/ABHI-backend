require('dotenv').config(); 
const app = require('./index');
const connection = require('./DatabaseConnection/connection');
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});





