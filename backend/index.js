const connectToMOngo = require("./db");
const express = require("express");
var cors = require('cors')
connectToMOngo();

const app = express();
const port = 5000;


app.use(express.json());
app.use(cors());
// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`My_Secrets app listening at http://localhost:${port}`);
});
