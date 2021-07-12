using CarWash.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarWash.Utils
{
    public class UserSession
    {
        public static UserSession Instancia()
        {
            return new UserSession();
        }
        public static string Token { get { return HttpContext.Current.Session["tipoUsuario"].Equals("admin") ? ((UsuarioModel)HttpContext.Current.Session["usuario"]).us_athorization : ((ClienteModel)HttpContext.Current.Session["usuario"]).cl_athorization; } }

    }
}