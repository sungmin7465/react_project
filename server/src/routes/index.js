import express from 'express';
import account from './account';
import etc from './etc';

const router = express.Router();
router.use('/account', account);
router.use('/etc', etc);

export default router;
