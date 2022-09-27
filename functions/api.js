// * MODULE
const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const serverless = require('serverless-http')
const cors = require('cors')


// * SETTING
const app = express();
const router = express.Router();


// * PARSER
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static("public"));
app.use(cors({
  origin:"https://bespoke-douhua-40ca24.netlify.app/"
}))
// * -------------------------------------------------------------------------------


router.get('/', (req,res) => {
  const json = {
    name: "bambang"
  }
  const obj = JSON.stringify(json)
  res.send(obj)
  // res.end(json)
  
})




// * BACA & TULIS DATA
// * -------------------------------------------------------------------------------
router.post("/ulasan", (req, res) => {
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
router.get("/ulasan", (req, res) => {
  fs.readFile("ulasan.json", "utf-8", (err, data) => {
    const json = JSON.parse(data);

    res.send(json);
  });
});
// * -------------------------------------------------------------------------------

app.use('/', router)

// // * PENGATURAN PORT
// // * -------------------------------------------------------------------------------
// app.listen(port, () => console.log(`Listening on port ${port}!`)); //*||
// // * -------------------------------------------------------------------------------


module.exports.handler = serverless(app);