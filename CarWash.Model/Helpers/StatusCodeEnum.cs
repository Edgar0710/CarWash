using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarWash.Model.Helpers
{
    public enum StatusCodeEnum
    {
        Ok = 200,
        Found = 302,
        Bad_Request = 400,
        Unauthorized = 401,
        Not_Found = 404
    }

    public enum us_rol
    {
        Administrador = 1,
        Gerente = 2,
        Mecanico = 3,
        Dealer = 4
    }

    public enum paso
    {
        stp1 = 1,
        stp2 = 2,
        stp3 = 3
    }
}
