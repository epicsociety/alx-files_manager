import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = Router();

router.post('/files', FilesController.postUpload);

router.get('/files/:id', FilesController.getShow);

router.get('/files', FilesController.getIndex);

router.put('/files/:id/publish', FilesController.putPublish);

router.put('/files/:id/unpublish', FilesController.putUnpublish);

router.get('/files/:id/data', FilesController.getFile);

router.get('/connect', AuthController.getConnect);

router.get('/disconnect', AuthController.getDisconnect);

router.get('/users/me', UsersController.getMe);

router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);

router.post('/users', UsersController.postNew);

export default router;
