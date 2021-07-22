using CarWash.BusinessLogic.Helpers;
using CarWash.Model;
using CarWash.Model.Helpers;
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


        #region PostCliente
        [HttpPost]
        public ActionResult LoginCliente(FormCollection collection)
        {
            ClienteModel usuarioInfo;
            JavaScriptSerializer js = new JavaScriptSerializer();
            ResponseModel<object> result;
            var parametros = new Dictionary<string, string>()
            {
                {"email",collection["email"].ToString()},
                {"password",Encrypt.Base64_Encode( collection["password"].ToString())},
            };
            result = appConn.Query("Usuarios/LoginCliente", parametros, post: true).Result;
            usuarioInfo = js.Deserialize<ClienteModel>(new JavaScriptSerializer().Serialize(result.Result));
            if (result.Code == HttpStatusCode.OK && usuarioInfo != null)
            {
              
                Session["usuario"] = usuarioInfo;
                Session["tipoUsuario"] = "Client";
                return Redirect("~/Cliente/Index");
            }
            ViewBag.error = "1";
            return Redirect("~/Home/Index");
        }
        [HttpPost]
        public ActionResult RegistroCliente(FormCollection collection)
        {
            
            JavaScriptSerializer js = new JavaScriptSerializer();
            ResponseModel<object> result;
            var parametros = new Dictionary<string, string>()
            {
                {"usuario",collection["emailRegistro"].ToString()},
                {"password",Encrypt.Base64_Encode( collection["passwordRegistro"].ToString())},
            };
            result = appConn.Query("Usuarios/RegistroCiente", parametros,post: true).Result;

            if (result.Code == HttpStatusCode.OK)
            {
                ViewBag.register = "1";
            }
            else { 
                 ViewBag.register = "-1";
            }
            return Redirect("~/Home/Index");
        }
        #endregion
    }
}