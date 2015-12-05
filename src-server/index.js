import express from 'express';
import cors from 'cors';
import router from './app.js';

let app = express();

app.use('/resources', express.static('resources'));
app.use(cors({
   origin: 'http://localhost:3000'
}));

app.use('/', router);

let server = app.listen(3001, 'localhost', () => {
   let host = server.address().address;
   let port = server.address().port;

   console.log(`Node server listening at http://${host}:${port}`);
});
