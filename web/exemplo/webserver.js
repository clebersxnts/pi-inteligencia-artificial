var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serverurl = 'http://exemplo-1-api:3000/'
app.set("view engine", "ejs");
var axios = require('axios');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    axios.get(serverurl)
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        let retorno = [];
        console.log(data.data)
        let newdata = data.data;
        newdata.forEach(function(image) {
//            const buffer = Buffer.from(image.img.data, "base64");
            var item = {
                name: image.name,
                desc: image.desc,
                img: {
                    data: image.img.data,
                    contentType: image.img.contentType
                }
            }
            retorno.push(item);
        });
        console.log(retorno)
        res.render('imagepage',{items: retorno})
    });
});

var port = process.env.PORT || '8080'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})

