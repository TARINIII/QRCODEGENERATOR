import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from "qr-image";
import fs from "fs";
import { type } from "os";
import {moveFile} from 'move-file';


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var Requiredtext = " ";

function getTheInputText(req, res, next) {
    Requiredtext = req.body["mytext"];
    next();
}

app.use(getTheInputText);

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


app.post("/", (req, res) => {

    var newtext = Requiredtext;

    if(newtext === ""){
        res.sendFile(__dirname + "/public/Error.html");
    }
    else{ 
    function createQRimage(){

        var qr_svg = qr.image(newtext, { type: 'png' });
 
        qr_svg.pipe(fs.createWriteStream('QR.png'));
 

        var svg_string = qr.imageSync(newtext, { type: 'png' });

    }

    createQRimage();

    async function fileMove(){

        await moveFile('D:/WEB DEVELOPEMENT PROJECTS/QR Code Generator/QR.png', 'D:/WEB DEVELOPEMENT PROJECTS/QR Code Generator/public/QR.png');
    
    
        console.log('The file has been moved');
    
    }

    fileMove();
    res.sendFile(__dirname + "/public/index2.html");

    }
    
 
});




app.listen(3000,()=>{
    console.log("Server running on port 3000");
});