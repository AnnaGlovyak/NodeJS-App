import express from 'express';
import hbs from 'express-handlebars';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


////######## HBS SETUP ########////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');

//CSS
app.use('/css', express.static(__dirname + '/public/css'))
const jsonPaser = bodyParser.json();

//GET
app.get('/', (req, res) => {
    
    fetch('http://localhost:3004/messages', {
        method: "GET", headers: {
        'Content-Type': 'application/json'
    }})
    .then(response => {
        response.json().then(json => {
            res.render('home', {
               articles: json
            })
        })
    })
    .catch(error => {
        console.log(error);
    })
});

app.get('/add_note', (req, res) => {
    res.render('add_note');
})

//POST
app.post('/api/add_note', jsonPaser, (req, res) => {
    
    fetch('http://localhost:3004/messages', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.status(200).send(response)
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})

