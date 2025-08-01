import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    const data = [];
    res.render('work.ejs', { data });
});

app.get('/work1', (req,res)=>{
    const data = [];
    res.render('work1.ejs', { data });
});

app.get('/grain', (req,res) =>{
    const data = [];
    res.render('grain.ejs', { data });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});