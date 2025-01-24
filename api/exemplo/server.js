var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var imgSchema = require('./model.js');
var fs = require('fs');
var path = require('path');
app.set("view engine", "ejs");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL)
.then(console.log("DB Connected"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100MB file size limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only! (jpeg, jpg, png, gif)');
    }
  }

  app.get('/', (req, res) => {
    imgSchema.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        let retorno = [];
        data.forEach(function(image) {
            var item = {
                name: image.name,
                desc: image.desc,
                img: {
                    data: image.img.data.toString('base64'),
                    contentType: image.img.contentType
                }
            }
            retorno.push(item)
        })
        console.log(JSON.stringify(retorno))
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(retorno))
//        res.render('imagepage',{items: data})
    })
});

app.get('/teste', (req, res) => {
    imgSchema.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        console.log(data)
//        res.setHeader('Content-Type', 'application/json');
//        res.send(data)
        res.render('imagepage',{items: data})
    })
});

app.post('/', (req, res) => {
    upload(req, res, (err) => { 
        if (err) {
            res.send(err);
        }
        else {
            salvaArquivo(req,res);
        }
    })

    
});


function salvaArquivo(req,res) {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgSchema.create(obj)
    .then ((result) => {
        res.redirect('http://localhost:8000/')
    }).catch((err) => {{

        res.send(err)}
    });
}

var port = process.env.PORT || '3000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})
