import express from 'express';
import peopleRouter from './peopleRouter.js';

const router = express.Router();

router.use('/api/v1/people', peopleRouter);

router.use((req, res, next) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = process.env.APP_PORT;
  const fullUrl = `${protocol}://${host}:${port}${url}`;
  res.status(404).send({
    success: false,
    message: `Route ${fullUrl} Not Found`,
  });
});
export default router;
