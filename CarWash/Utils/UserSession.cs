using CarWash.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarWash.Utils
{
    public static class UserSession
    {
       
        public static string Token { get { return HttpContext.Current.Session["tipoUsuario"].Equals("admin") ? ((UsuarioModel)HttpContext.Current.Session["usuario"]).us_athorization : ((ClienteModel)HttpContext.Current.Session["usuario"]).cl_athorization; } }

        public static int UserId { get { return HttpContext.Current.Session["tipoUsuario"].Equals("admin") ? ((UsuarioModel)HttpContext.Current.Session["usuario"]).us_id : ((ClienteModel)HttpContext.Current.Session["usuario"]).cl_id; } }
    }
}