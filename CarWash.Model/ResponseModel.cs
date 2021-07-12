using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace CarWash.Model
{
    public class ResponseModel<T>
    {
        public HttpStatusCode Code { get; set; }
        public string Message { get; set; }
        public T Result { get; set; }
    }
}
