import express from 'express';
import PeopleController from '../controllers/PeopleController.js';

const router = express.Router();

router.get('/people', PeopleController.getAllPeople);
router.get('/people/:id', PeopleController.getPeopleById);
router.post('/people', PeopleController.storePeople);
router.put('/people/:id', PeopleController.updatePeople);
router.delete('/people/:id', PeopleController.deletePeople);

router.use((req, res, next) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = process.env.APP_PORT;
  const fullUrl = `${protocol}://${host}:${port}${url}`;
  res.status(404).send({
    devMessage: `Route ${fullUrl} Not Found`,
  });
});
export default router;
