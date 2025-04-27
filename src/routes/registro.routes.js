import { Router} from "express";
const rutas = Router();


import {obtenerregistro,obtenerregistroID,insertarnuevoregistro,borrarregistro,actualizarregistro} from '../controller/registrocontroller.js';

rutas.get('/registro',obtenerregistro);

rutas.get('/registroid/:idregistro',obtenerregistroID);

rutas.post('/insertarregistro',insertarnuevoregistro);

rutas.get('/borrarregistro/:idregistro', borrarregistro);

rutas.put('/registros/:idregistro', actualizarregistro); 

export default rutas;
