import { getConnection, querys, sql } from "../database";
import jwt from "jsonwebtoken";

export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProducts);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

function fomatearFecha(fechaActual){

  // Obtener día, mes y año
var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1;
var anio = fechaActual.getFullYear().toString().slice(-2);

// Formatear día, mes y año
var diaFormateado = dia < 10 ? '0' + dia : dia;
var mesFormateado = mes < 10 ? '0' + mes : mes;

// Obtener horas y minutos
var horas = fechaActual.getHours();
var minutos = fechaActual.getMinutes();

// Formatear horas y minutos
var horasFormateadas = horas < 10 ? '0' + horas : horas;
var minutosFormateados = minutos < 10 ? '0' + minutos : minutos;

// Concatenar fecha y hora formateadas
var fechaHoraFormateada = diaFormateado + "-"+ mesFormateado +"-" + anio + ' ' + horasFormateadas + ':' + minutosFormateados;

return fechaHoraFormateada;


}

 function SumarDias(Minutos){

  var fechaActual = new Date();

// Obtener timestamp en milisegundos
var timestamp = fechaActual.getTime();

// Sumar segundos
var segundosASumar = Minutos;
timestamp += segundosASumar * 1000; // Multiplicar por 1000 para convertir segundos a milisegundos

// Crear una nueva instancia de Date con el timestamp modificado
var nuevaFecha = new Date(timestamp);

return  nuevaFecha;
 }

export const  sendLogin  =  async (req, res) => {
  const { usuario } = req.body;

  const datarequest = req.body;
  
  console.log(usuario) 

  const user = { usuario : usuario, clave : usuario };

   // Create a token
   const token = jwt.sign({ id: datarequest.usuario }, "secretykey", {
    expiresIn: 86400, // 24 hours
  });
  var fechaActual = new Date();
  res.status(200).json( {
    data : datarequest,
    token: token,
    fechaExppiracionToken :  fomatearFecha(SumarDias(86400)) 

  });

  //res.json(datarequest);
};



export const getTest  =   (req,res) => res.send('TEST PPRODUCTOS!!!')




export const createNewProduct = async (req, res) => {
  const { name, description } = req.body;
  let { quantity } = req.body;

  // validating
  if (description == null || name == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (quantity == null) quantity = 0;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .query(querys.addNewProduct);

    res.json({ name, description, quantity });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.getProducById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.deleteProduct);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalProducts = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request().query(querys.getTotalProducts);
  console.log(result);
  res.json(result.recordset[0][""]);
};

export const updateProductById = async (req, res) => {
  const { description, name, quantity } = req.body;

  // validating
  if (description == null || name == null || quantity == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .input("id", req.params.id)
      .query(querys.updateProductById);
    res.json({ name, description, quantity });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};




function verifyToken(req,res,next){
  const beare=  req.headers['authorization'];

  if(typeof beare !=='undefined'){
    const token = beare.split(" ")[1];
    req.token = token;
    next();
  }else{
    req.sendStatus(403);
  }

}