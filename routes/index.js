import UsersController from '../controllers/UsersController';
import AppController from '../controllers/AppController';

function routerMiddle(app) {
  app.get('/status', AppController.getStatus);
  app.get('/stats', AppController.getStats);
  app.post('/status', UsersController.postNew);
}

export default routerMiddle;
