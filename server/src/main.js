import express from 'express';
import path from 'path';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import session from 'express-session';
import dbConfig from '../config/db_config';
import cors from 'cors';
import passport from 'passport';
import api from './routes';

var MySQLStore = require('express-mysql-session')(session);


const port = 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());
// preflightContinue: true})); //allow cross domain
app.use(session({
    secret: 'react1231$1$234',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(dbConfig)
}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/', express.static(path.join(__dirname, '../../public')));
app.use('/api', api);
app.use(morgan('dev'));


app.get('/hello', (req, res) => {
    return res.send('Hello CodeLab');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});
