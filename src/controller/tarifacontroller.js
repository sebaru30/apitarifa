
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

    

        export const insertarnuevatarifa = async (req,res)=>
    
            {
          
              const {descripcionTarifa,costoTarifa} = req.body;
          
              //validamos que existan los parametros en el body 
          
          
          
              if(descripcionTarifa==null || costoTarifa==null )
          
              {
          
                return res.status(500).json({msg: "parametros insuficientes.."});
          
              }
          
              const conexion = await obtenerConexion();
          
              const resultado = await conexion.request()
          
                .input('descripcionTarifa',descripcionTarifa)
          
                .input('costoTarifa',costoTarifa)
          
                .query("insert into tarifas(descripcionTarifa,costoTarifa) values (@descripcionTarifa,@costoTarifa);")
          
                 //imprimir consola (DEV)
          
              console.log(resultado);
          
              //Resultado al navegador 
          
              res.json({descripcionTarifa,costoTarifa});
            }
    
            export const borrartarifa = async (req,res)=>
    
                {
            
                  //recibimos idtarifa como parametro que llega por la URL
            
                  const{idtarifa}=req.params;
                  const conexion = await obtenerConexion();
                  const resultado = await conexion.request()
            
                    .input('idtarifa',sql.Int,idtarifa)
            
                    .query("DELETE FROM tarifas where idtarifa=@idtarifa")
                    //imprimir consola (DEV)
            
                    console.log(resultado);
            
                    //Resultado al navegador 
            
                    res.json(resultado.recordset);
            
                }
    
                export const actualizartarifa = async (req, res) => {
    
                  try {
                
                    const { idtarifa } = req.params;
                
                    const { descripcionTarifa, costoTarifa } = req.body;
                
                
                
                    // Validación simple
                
                    if (!descripcionTarifa || !costoTarifa) {                
                      return res.status(400).json({ message: 'Todos los campos son obligatorios' });                
                    }
                    const conexion = await obtenerConexion();                    
                    const resultado = await conexion.request()

                       
                        .input('idtarifa', sql.Int, idtarifa)
                        .input('descripcionTarifa', sql.VarChar, descripcionTarifa)
                    
                        .input('costoTarifa', sql.Float,  costoTarifa)                   
                    
                        .query(`
                
                        UPDATE tarifas 
                
                        SET 
                
                          descripcionTarifa = @descripcionTarifa,
                
                          costoTarifa = @costoTarifa
                
                        WHERE idtarifa = @idtarifa 
                
                      `);
                
                
                
                    res.json({ message: 'Registro actualizado exitosamente' });
                
                  } catch (error) {
                
                    console.error('Error al actualizar la tarifa:', error);
                
                    res.status(500).json({ message: 'Error al actualizar tarifa' });
                
                  }
                
                }