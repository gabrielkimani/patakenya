const mongoose = require("mongoose");
function join(t, a, s) {
  function format(m) {
     let f = new Intl.DateTimeFormat('en', m);
     return f.format(t);
  }
  return a.map(format).join(s);
}

let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
let date = join(new Date, a, '-');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: date,
  },
  location: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default:
      "https://res.cloudinary.com/patakenya/image/upload/v1652698202/pata_uploads/avatar-3_byvqtw.png",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
