const express = require("express");
const app = express();
const fileparser = require("./fileparser");
require("dotenv").config();

app.set("json spaces", 5); // to pretify json response

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`
    <h2>File Upload With <code>"Node.js"</code></h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Select a file: 
        <input type="file" name="file" multiple="multiple" />
      </div>
      <input type="submit" value="Upload" />
    </form>

  `);
});
app.post("/api/upload", async (req, res) => {
  await fileparser(req)
    .then((data) => {
      res.status(200).json({
        message: "Success",
        data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occurred.",
        error,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
