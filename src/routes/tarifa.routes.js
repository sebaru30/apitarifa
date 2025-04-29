import { Router} from "express";
const rutas = Router();

import {obtenertarifa,obtenertarifaID,insertarnuevatarifa, borrartarifa,actualizartarifa} from '../controller/tarifacontroller.js';
//esta API devuelve una lista de todos las tarifas de la BD
rutas.get('/tarifas',obtenertarifa);

//esta API me devuelve los datos de un tarifa en funcion del ID
rutas.get('/obtenertarifaID/:idtarifa',obtenertarifaID);

rutas.post('/insertartarifa',insertarnuevatarifa);

rutas.get('/borrartarifa/:idtarifa', borrartarifa);

rutas.put('/tarifas/:idtarifa', actualizartarifa); 

export default rutas;