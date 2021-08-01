using CarWash.Model;
using CarWash.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using appConn = CarWash.BusinessLogic.ApiConexion;

namespace CarWash.Areas.Api.Controllers
{
    public class ServicesController : Controller
    {
        #region Get
        [HttpGet]
        public JsonResult CitasCliente()
        {
            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
                var parametros = new Dictionary<string, string>()
                {
                    { "cliente",UserSession.UserId.ToString() },
                

                };
                result = appConn.Query("Services/CitasCliente", parametros, token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult AutosCliente()
        {
            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
                var parametros = new Dictionary<string, string>()
                {
                    { "cliente",UserSession.UserId.ToString() },


                };
                result = appConn.Query("Services/AutosCliente", parametros, token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Servicios()
        {
            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
           
                result = appConn.Query("Services/Servicios", token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region  Post
        [HttpPost]
        public JsonResult CrearCita(int auto, int servicio, string fecha, string hora)
        {
            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
                var parametros = new Dictionary<string, string>()
                {
                    { "auto", auto.ToString()},
                    { "servicio", servicio.ToString()},
                    { "fecha", fecha},
                    { "hora", hora},


                };
                result = appConn.Query("Services/CrearCita", parametros,true, token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result);
        }
        [HttpPost]
        public JsonResult CrearAuto( string tipoAuto)
        {
            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
                var parametros = new Dictionary<string, string>()
                {
                    { "cliente", UserSession.UserId.ToString()},
                    { "tipoAuto", tipoAuto},
               


                };
                result = appConn.Query("Services/CrearAuto", parametros,true, token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result);
        }
        [HttpPost]
        public JsonResult AprobarCita(int cita)
        {
            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
                var parametros = new Dictionary<string, string>()
                {
                   
                    { "cita", cita.ToString()},



                };
                result = appConn.Query("Services/AprobarCita", parametros, true, token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result);
        }  
        [HttpPost]
        public JsonResult MarcarPago(int cita)
        {
            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
                var parametros = new Dictionary<string, string>()
                {
                   
                    { "cita", cita.ToString()},



                };
                result = appConn.Query("Services/MarcarPago", parametros, true, token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result);
        }





        [HttpPost]
        public JsonResult CrearServicio(string se_nombre, decimal se_precio, string se_descripcion)
        {
            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
                var parametros = new Dictionary<string, string>()
                {
                    { "se_nombre", se_nombre},
                    { "se_precio", se_precio.ToString()},
                    { "se_descripcion", se_descripcion},
                    { "us_id", UserSession.UserId.ToString()},


                };
                result = appConn.Query("Services/CrearServicio", parametros, true, token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result);
        }


        [HttpPost]
        public JsonResult ActualizarServicio(int servicio, string nombre, decimal precio, string descripcion)
        {
            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
                var parametros = new Dictionary<string, string>()
                {
                    { "servicio", servicio.ToString()},
                    { "precio", precio.ToString()},
                    { "descripcion", descripcion},
                    { "nombre", nombre},


                };
                result = appConn.Query("Services/ActualizarServicio", parametros, true, token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result);
        }
        #endregion
    }
}