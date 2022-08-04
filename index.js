const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();

// middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/ads",require("./routes/adsRoute"));

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname , '/client/build', 'index.html'));
}
);



//mongooose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("---------DB connected------"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`-------Server started on port ${port}--------`);
});
