const express = require('express')
const app = express()
const port = 3000


//Librerias necesarias para recibir la imagen
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img') // Agregamos el directorio donde se guardarán los archivos.
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Le pasamos el nombre original del archvio, también podriamos cambiar el nombre concatenando la fecha actual.
    }
});

const upload = multer({storage});

//Librerias Necesarias para escribir la imagen
const { createCanvas, loadImage } = require('canvas')

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hkjajajajja')
})

app.get('/send-image', [upload.single('attachment')], (req, res) => {
    console.log(req.query.image);

    loadImage('public/img/'+req.query.image).then((image) => {
        console.log(image.width);
        let canvas = createCanvas(image.width, image.height);
        ctx = canvas.getContext('2d');
        ctx.drawImage(image, 20, 0, image.width, image.height);
        ctx.font = '22px Helvetica';
        ctx.fillText("El que no llora no mama",image.width/3,image.height-20);
        console.log(image.src);
        console.log(image.dataMode);
        res.send('<img src="' + canvas.toDataURL() + '" />')
      })
})

app.post('/upload', upload.single('file') , (req,res)=> {
    console.log({file:req.file});

    let images = {
        imgOri:"img/"+req.file.originalname,
        imgNew: "hola",
    }

    res.send("img/"+req.file.originalname);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


app.post('/uploadimg', [upload.single('attachment')], (req, res, next) => {
    console.log(req.file)
    loadImage(req.file.path).then((image) => {
        ctx.drawImage(image, 20, 0, 700, 400);
        ctx.font = '22px Helvetica';
        ctx.fillText("El que no llora no mama",200,350);
        res.send('<img src="' + canvas.toDataURL() + '" />')
      })
    
});