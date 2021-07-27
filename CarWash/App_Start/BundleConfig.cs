using System.Web;
using System.Web.Optimization;

namespace CarWash
{
    public class BundleConfig
    {
    
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region General
            bundles.Add(new ScriptBundle("~/bundles/main").Include(
                        "~/Scripts/vendors/jquery/jquery-{version}.js",
                         "~/Scripts/vendors/bootstrap/bootstrap.bundle.min.js",
                        "~/Scripts/vendors/jquery/jquery.validate.min.js",
                        "~/Scripts/vendors/sweetalert2/sweetalert2.all.min.js",
                        "~/Scripts/vendors/moment/moment.min.js",
                         "~/Scripts/vendors/moment/locale/es.js",
                        "~/Scripts/vendors/mask/jquery.mask.js",
                        "~/Scripts/vendors/mask/accounting.js",
                        "~/Scripts/app/utils/Mensaje-{version}.js",
                        "~/Scripts/app/global/main-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/main").Include(
                      "~/Content/css/vendors/bootstrap/bootstrap.min.css", 
                      "~/Content/css/vendors/font-awesome/all.min.css"
                     ));
            bundles.Add(new StyleBundle("~/Content/Admin").Include("~/Content/css/app/site.css"));

            bundles.Add(new StyleBundle("~/Content/Client").Include("~/Content/css/app/style.css"));
            #endregion
            #region Admin
            bundles.Add(new ScriptBundle("~/Scripts/admin/citas").Include("~/Scripts/app/admin/citas/citas-{version}.js"));
            #endregion
            #region Cliente
            bundles.Add(new ScriptBundle("~/Scripts/Client/Home")
                .Include("~/Scripts/app/Client/Home-{version}.js"));
            bundles.Add(new ScriptBundle("~/Scripts/Client/Index")
                .Include("~/Scripts/app/Client/clientIndex-{version}.js"));

            #endregion

        }
    }
}
