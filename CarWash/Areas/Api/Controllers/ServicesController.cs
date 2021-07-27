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
                result = appConn.Query("Services/CrearCita", parametros, token: UserSession.Token).Result;
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
                    { "auto", UserSession.UserId.ToString()},
                    { "servicio", tipoAuto},
               


                };
                result = appConn.Query("Services/CrearAuto", parametros, token: UserSession.Token).Result;
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