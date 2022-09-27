// * MODULE
const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const app = express();

// * SETTING
const port = 3000;

// * PARSER
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static("public"));
// * -------------------------------------------------------------------------------







// * BACA & TULIS DATA
// * -------------------------------------------------------------------------------
app.post("/ulasan", (req, res) => {
  const ulasan = req.body;
  fs.readFile("ulasan.json", "utf-8", (err, data) => {
    const json = JSON.parse(data);
    json.push(ulasan);

    const text = JSON.stringify(json, null, 2);
    console.log(data);
    // console.log(json);
    fs.writeFile("ulasan.json", text, (err) => {
      if (err) {
        throw err;
      }
    });

    res.send(json);
  });
});
// * -------------------------------------------------------------------------------


// * PENGAMBILAN DATA SAAT LOAD
// * -------------------------------------------------------------------------------
app.get("/ulasan", (req, res) => {
  fs.readFile("ulasan.json", "utf-8", (err, data) => {
    const json = JSON.parse(data);

    res.send(json);
  });
});
// * -------------------------------------------------------------------------------



// * PENGATURAN PORT
// * -------------------------------------------------------------------------------
app.listen(port, () => console.log(`Listening on port ${port}!`)); //*||
// * -------------------------------------------------------------------------------
