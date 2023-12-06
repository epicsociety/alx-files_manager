import routerMiddle from './routes';

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
routerMiddle(app);

app.listen(port, () => {
  console.log('Server up');
});
