import express from 'express';
import hbs from 'express-handlebars';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import path from 'path';
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

app.get('/', (req, res) => {
    res.render('home')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})

