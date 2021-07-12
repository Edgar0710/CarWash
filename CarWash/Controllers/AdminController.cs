using CarWash.Model;
using CarWash.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using appConn = CarWash.BusinessLogic.ApiConexion;

namespace CarWash.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        #region get
        /*   [HttpGet]
           public JsonResult GetEstadosCuenta(string datefin, string dateinit, int grupo, int sucursal, int pagenumber, int pagesize, string qry, int nivel)
           {

               ResponseModel<object> result = new ResponseModel<object>();
               try
               {
                   var parametros = new Dictionary<string, string>() {
                       {"datefin",datefin},
                       {"dateinit",dateinit},
                       {"grupo",grupo.ToString()},
                       {"sucursal",sucursal.ToString()},
                       {"pagenumber",pagenumber.ToString()},
                       {"pagesize",pagesize.ToString()},
                       {"qry",qry},
                       {"nivel",nivel.ToString()},
                   };
                   result = appConn.Query("EstadoCuenta/GetEstadosCuenta", parametros, token: UserSession.Token).Result;
               }
               catch (Exception ex)
               {
                   result.Code = HttpStatusCode.InternalServerError;
                   result.Message = "Algo Salio Mal";
               }
               return Json(result, JsonRequestBehavior.AllowGet);
           }*/

        [HttpGet]
        public JsonResult AllCitas()
        {

            ResponseModel<object> result = new ResponseModel<object>();
            try
            {
               
                result = appConn.Query("Services/AllCitas", token: UserSession.Token).Result;
            }
            catch (Exception ex)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Algo Salio Mal";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region post

        #endregion

    }
}