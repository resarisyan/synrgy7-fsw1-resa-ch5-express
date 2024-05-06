import express from 'express';
import PeopleController from '../../controllers/PeopleController.js';
import { idNotFound } from '../../middlewares/error.middleware.js';
import { upload } from '../../middlewares/uploadHandler.js';

const router = express.Router();

router.get('/', PeopleController.getAllPeople);
router.get('/:id', idNotFound, PeopleController.getPeopleById);
router.post('/', PeopleController.storePeople);
router.put('/:id', idNotFound, PeopleController.updatePeople);
router.delete('/:id', idNotFound, PeopleController.deletePeople);
router.post('/upload', upload.single('file'), PeopleController.uploadFile);

export default router;
