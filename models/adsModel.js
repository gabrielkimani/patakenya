const mongoose = require("mongoose");
function join(t, a, s) {
  function format(m) {
    let f = new Intl.DateTimeFormat("en", m);
    return f.format(t);
  }
  return a.map(format).join(s);
}

let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
let date = join(new Date(), a, "-");

const adSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  adName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date(),
  },
  status:{
      type:String,
      default:'review'
  },
  contactViews:Array,
  whatsAppViews:Array,
},{
    timestamps:true,
});

module.exports = mongoose.model("Ad", adSchema);
