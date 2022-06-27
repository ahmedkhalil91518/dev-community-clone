const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const port = process.env.PORT;
 
main().catch((err) => console.log(err));
 
async function main() {
 await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
//  const userSchema = new mongoose.Schema({
//    firstName: String,
//    lastName: String,
//    email: String,
//    password: String,
//    role: String,
//    summary: String
//  });
//  const User = mongoose.model('User', userSchema);
//   app.post('/',  async (req, res) => {
//    const user = new User({
//      firstName: 'String',
//      lastName: 'String',
//      email: 'String',
//      password: 'String',
//      role: 'String',
//      summary: 'String',
//    });
//     await user.save();
//     res.send(user);
//  });
}

 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
