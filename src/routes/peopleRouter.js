import express from 'express';
import PeopleController from '../controllers/PeopleController.js';

const router = express.Router();

router.get('/', PeopleController.getAllPeople);
router.get('/:id', PeopleController.getPeopleById);
router.post('/', PeopleController.storePeople);
router.put('/:id', PeopleController.updatePeople);
router.delete('/:id', PeopleController.deletePeople);

export default router;
