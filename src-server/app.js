import express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
   res.end('Hello World!');
});

export default router;
