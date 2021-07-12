using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarWash.Model.Models
{
    public class ClienteModel
    {
        public int cl_id { get; set; }
        public string cl_nombre { get; set; }
        public string cl_apellidoMaterno { get; set; }
        public string cl_apellidoPaterno { get; set; }
        public string cl_direccion { get; set; }
        public string cl_email { get; set; }
        public string cl_telefono { get; set; }
        public string cl_athorization { get; set; }

    }
}
