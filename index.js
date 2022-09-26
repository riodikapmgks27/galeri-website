const express = require('express')
const bodyparser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3000

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.static('public'))



app.post('/ulasan', (req, res) => {
    const ulasan = req.body
    fs.readFile("ulasan.json", "utf-8", (err, data) => {
        // console.log(data)
        const json = JSON.parse(data)
        json.push(ulasan)

        const text =  JSON.stringify(json, null, 2)
        // const arr = JSON.parse(json)
        console.log(data)
        console.log(json)
        // console.log(arr)
        fs.writeFile('ulasan.json', text, err =>{ 
            if (err) {
                throw err
            }
        })

        res.send(json)
    })


    // fs.writeFile("ulasan.json", teks, err => {
    //     if (err) {
    //         throw err
    //     }
    // })

    // console.log(ulasan)s
    // res.send(ulasan)
})

app.get('/ulasan', (req, res) => {
    fs.readFile("ulasan.json", "utf-8", (err, data) => {
        const json = JSON.parse(data)

        res.send(json)
    })

})


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })




app.listen(port, () => console.log(`Example app listening on port ${port}!`))

