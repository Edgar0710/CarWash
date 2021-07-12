using CarWash.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

namespace CarWash.BusinessLogic
{
    public static class ApiConexion
    {
        const string strUrl = "https://localhost:44355/api/";
        //const string strUrl = "https://renuevauto.com:8585/gec.api/api/";
        //const string strUrl = "https://renuevauto.com:8086/gec.api/api/";


        /*
         * GetInfo: Permite realizar peticiones al api de RenuevAuto
         * ApiController => Nombre del controlador seguido del la funcion del api ejempló (Auto/GetAuto)
         * parametros=> Todos los parametros necesarios  dentro del api
         * post =>Valor opcional que identifica el tipo de petición
         */
        public static async Task<ResponseModel<object>> Query(string ApiController, Dictionary<string, string> parametros = null, bool post = false, string token = null)
        {
            //Acepta todos los certificados
            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);
            if (parametros == null) parametros = new Dictionary<string, string>();
            ResponseModel<object> result = new ResponseModel<object>();
            string strParametros = "";
            JavaScriptSerializer js = new JavaScriptSerializer();

            try
            {
                //Llenado del string de parametros
                foreach (var prm in parametros)
                {
                    //HttpUtility.UrlEncode=>codifica los parametros para su envio a traves del protocolo http
                    strParametros += (strParametros.Length == 0 ? "?" : "&") + prm.Key + "=" + HttpUtility.UrlEncode(prm.Value);
                }
                var http = new HttpClient();
                if (token != null) { http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token); }

                HttpResponseMessage response;

                //Seleccióm de tipo de petición
                if (!post)
                {
                    response = await http.GetAsync(strUrl + ApiController + strParametros).ConfigureAwait(false);
                }
                else
                {
                    response = await http.PostAsync(strUrl + ApiController + strParametros, null).ConfigureAwait(false);
                }

                //Verificación de la respuesta de exito o no
                if (response.IsSuccessStatusCode)
                {
                    string strResult = response.Content.ReadAsStringAsync().Result;
                    result = js.Deserialize<ResponseModel<object>>(strResult);
                }
                else
                {
                    result.Code = response.StatusCode;
                    result.Message = response.StatusCode.ToString();
                    result.Result = null;
                }
            }
            catch (Exception e)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Error de conexión API." + e;
                result.Result = null;
            }
            return result;
        }
        public static async Task<ResponseModel<object>> QueryFile(string ApiController, Dictionary<string, string> parametros = null, HttpPostedFileBase file = null, string token = null)
        {
            //Acepta todos los certificados
            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);
            if (parametros == null) parametros = new Dictionary<string, string>();
            ResponseModel<object> result = new ResponseModel<object>();
            string strParametros = "";
            JavaScriptSerializer js = new JavaScriptSerializer();

            try
            {
                //Llenado del string de parametros
                foreach (var prm in parametros)
                {
                    //HttpUtility.UrlEncode=>codifica los parametros para su envio a traves del protocolo http
                    strParametros += (strParametros.Length == 0 ? "?" : "&") + prm.Key + "=" + HttpUtility.UrlEncode(prm.Value);
                }
                var http = new HttpClient();
                http.Timeout = TimeSpan.FromMinutes(10);
                if (token != null) { http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token); }

                //MultipartFormDataContent form = new MultipartFormDataContent();
                //Stream stream = file.InputStream;
                //BinaryReader br = new BinaryReader(stream);

                //byte[] fileBytes = br.ReadBytes((Int32)stream.Length);
                //form.Add(new ByteArrayContent(fileBytes), "files", file.FileName);
                HttpResponseMessage response;
                var formContent = new MultipartFormDataContent
                 {
                {new StreamContent(file.InputStream),"file",file.FileName}
                 };
                //Seleccióm de tipo de petición

                response = await http.PostAsync(strUrl + ApiController + strParametros, formContent).ConfigureAwait(false);


                //Verificación de la respuesta de exito o no
                if (response.IsSuccessStatusCode)
                {
                    string strResult = response.Content.ReadAsStringAsync().Result;
                    result = js.Deserialize<ResponseModel<object>>(strResult);
                }
                else
                {
                    result.Code = response.StatusCode;
                    result.Message = response.StatusCode.ToString();
                    result.Result = null;
                }
            }
            catch (Exception e)
            {
                result.Code = HttpStatusCode.InternalServerError;
                result.Message = "Error de conexión API." + e;
                result.Result = null;
            }
            return result;
        }

        public static bool AcceptAllCertifications(object sender, System.Security.Cryptography.X509Certificates.X509Certificate certification, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }
        private static StreamContent CreateFileContent(Stream stream, string fileName, string contentType)
        {
            try
            {
                var fileContent = new StreamContent(stream);
                fileContent.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("form-data")
                {
                    Name = "UploadedFile",
                    FileName = "\"" + fileName + "\""
                };
                fileContent.Headers.ContentType = new MediaTypeHeaderValue(contentType);
                return fileContent;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}
