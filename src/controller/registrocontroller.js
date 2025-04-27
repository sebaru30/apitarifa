import {obtenerConexion,sql} from '../database/conexion.js'

export const obtenerregistro = async (req, res) => {

    const conexion = await obtenerConexion();
  
    const result = await conexion.request().query(`
  
      SELECT 
  
        idregistro,
  
        CONVERT(varchar(10), fecharegistro, 120) AS fecharegistro,
  
        CONVERT(varchar(8), horaregistro, 108) AS horaregistro,
  
        vehiculo,
  
        horasparqueo,
  
        costototal,
  
        idtarifa
  
        FROM registrovehicular
  
      `);
  
    console.log(result);
  
    res.json(result.recordset);
  
  }

  export const obtenerregistroID = async (req,res)=>
    {
        //recibimos idvehiculo como parametro que llega con la URL
        const {idregistro} = req.params;
        const conexion = await obtenerConexion();
    
        const resultado = await conexion.request()
        .input('idregistro',sql.Int, idregistro)
        .query(`
      SELECT 
  
        idregistro,
  
        CONVERT(varchar(10), fecharegistro, 120) AS fecharegistro,
  
        CONVERT(varchar(8), horaregistro, 108) AS horaregistro,
  
        vehiculo,
  
        horasparqueo,
  
        costototal,
  
        idtarifa
  
        FROM registrovehicular WHERE idregistro = @idregistro`)
    
        //imprimir consola (DEV)
        console.log(resultado);
    
         //resultado del navegador
         res.json(resultado.recordset);
    }


    export const insertarnuevoregistro = async (req,res)=>

        {
      
          const {fecharegistro,horaregistro,vehiculo,horasparqueo,costototal,idtarifa} = req.body;
      
          //validamos que existan los parametros en el body 
      
      
      
          if(fecharegistro==null || horaregistro==null || vehiculo==null || horasparqueo==null || costototal==null || idtarifa==null)
      
          {
      
            return res.status(500).json({msg: "parametros insuficientes.."});
      
          }
      
          const conexion = await obtenerConexion();
      
          const resultado = await conexion.request()
      
            .input('fecharegistro',fecharegistro)
      
            .input('horaregistro',horaregistro)
      
            .input('vehiculo', vehiculo)
      
            .input('horasparqueo',horasparqueo)
      
            .input('costototal',costototal)

            .input('idtarifa',idtarifa)
      
            .query("insert into registrovehicular(fecharegistro,horaregistro,vehiculo,horasparqueo,costototal,idtarifa) values (@fecharegistro,@horaregistro,@vehiculo,@horasparqueo,@costototal,@idtarifa);")
      
             //imprimir consola (DEV)
      
          console.log(resultado);
      
          //Resultado al navegador 
      
          res.json({fecharegistro,horaregistro,vehiculo,horasparqueo,costototal,idtarifa});
      
          
      
        }

        export const borrarregistro = async (req,res)=>

            {
        
              //recibimos idVehiculo como parametro que llega por la URL
        
              const{idregistro}=req.params;
              const conexion = await obtenerConexion();
              const resultado = await conexion.request()
        
                .input('idregistro',sql.Int,idregistro)
        
                .query("DELETE FROM registrovehicular where idregistro=@idregistro")
                //imprimir consola (DEV)
        
                console.log(resultado);
        
                //Resultado al navegador 
        
                res.json(resultado.recordset);
        
            }

            export const actualizarregistro = async (req, res) => {

              try {
            
                const { idregistro } = req.params;
            
                const { fecharegistro, horaregistro, vehiculo, horasparqueo, costototal, idtarifa } = req.body;
            
            
            
                // Validación simple
            
                if (!fecharegistro || !horaregistro || !vehiculo || horasparqueo == null || costototal == null || idtarifa == null) {
            
                  return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            
                }
                const conexion = await obtenerConexion();
                const resultado = await conexion.request()
            
                  .input('idregistro', sql.Int, idregistro)
            
                  .input('fecharegistro', fecharegistro)
            
                  .input('horaregistro', horaregistro)
            
                  .input('vehiculo', vehiculo)
            
                  .input('horasparqueo', horasparqueo)
            
                  .input('costototal', costototal)
            
                  .input('idtarifa', idtarifa)
            
                  .query(`
            
                    UPDATE registrovehicular 
            
                    SET 
            
                      fecharegistro = @fecharegistro,
            
                      horaregistro = @horaregistro,
            
                      vehiculo = @vehiculo,
            
                      horasparqueo = @horasparqueo,
            
                      costototal = @costototal,
            
                      idtarifa = @idtarifa
            
                    WHERE idregistro = @idregistro
            
                  `);
            
            
            
                res.json({ message: 'Registro actualizado exitosamente' });
            
              } catch (error) {
            
                console.error('Error al actualizar registro:', error);
            
                res.status(500).json({ message: 'Error al actualizar registro' });
            
              }
            
            }//