import express from 'express';
import peopleRouter from './peopleRouter.js';
import { notFound, appError } from '../middlewares/error.middleware.js';

const router = express.Router();

router.use('/api/v1/people', peopleRouter);
router.use(notFound);
router.use(appError);
export default router;
