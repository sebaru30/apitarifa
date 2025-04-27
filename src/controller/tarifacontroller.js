
import {obtenerConexion,sql} from '../database/conexion.js'

export const obtenertarifa = async(req,res)=> 
{
    const conexion = await obtenerConexion();
    const resultado = await conexion.request().query('select * from tarifas');
    //resultado pa la consola (dev)
    console.log(resultado);

    //resultado del navegador
    res.json(resultado.recordset);
}

export const obtenertarifaID = async (req,res)=>
    {
        //recibimos idvehiculo como parametro que llega con la URL
        const {idtarifa} = req.params;
        const conexion = await obtenerConexion();
    
        const resultado = await conexion.request()
        .input('idtarifa',sql.Int, idtarifa)
        .query("select * from tarifas where idtarifa =@idtarifa")
    
        //imprimir consola (DEV)
        console.log(resultado);
    
         //resultado del navegador
         res.json(resultado.recordset);
    }