using CarWash.BusinessLogic.Helpers;
using CarWash.Model;
using CarWash.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using appConn = CarWash.BusinessLogic.ApiConexion;

namespace CarWash.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            FormsAuthentication.RedirectToLoginPage();
            return View("index");
        }

        [HttpPost]
        public ActionResult Login(string txt_email, string txt_clave)
        {
            UsuarioModel user;
            JavaScriptSerializer js = new JavaScriptSerializer();
            ResponseModel<object> result;


            var parametros = new Dictionary<string, string>() {
                { "email", txt_email },
                { "password", Encrypt.Base64_Encode(txt_clave) }
            };


            result = appConn.Query("Usuarios/Login", parametros, true).Result;
            user = js.Deserialize<UsuarioModel>(new JavaScriptSerializer().Serialize(result.Result));
            ViewBag.Error = 0;
            if (result.Code == HttpStatusCode.OK && user != null)
            {
                FormsAuthentication.SignOut();
                FormsAuthentication.SetAuthCookie(user.us_usuario, false);
                Session["usuario"] = user;
                Session["tipoUsuario"] = "admin";
                return Redirect("~/Admin/Index");
                // AQUÍ EL CÓDIGO DE VALIDACIÓN DEL USUARIO
            }
            else
            {
                ViewBag.Error = 1;
                ViewBag.Mensaje = "Verifique su usuario y/o contraseña.";
                return View("Index");
            }
        }
    }
}