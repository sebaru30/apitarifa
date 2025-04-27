//archivo de conf para express
import express from 'express';
const app = express();

import config from './config.js';
app.set('port',config.port);

//configurar cliente postman para recibir parametros por body en formato JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}));
import tarifaRuta from './routes/tarifa.routes.js'
import registroruta from './routes/registro.routes.js'
//aplicar configuracion de la ruta 
app.use(tarifaRuta);
app.use(registroruta);

export default app;