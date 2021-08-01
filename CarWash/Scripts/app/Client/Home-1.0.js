var urlApi = window.location.origin + "/";
var HomeClient = {
    Init: () => {
        HomeClient.AddEvents();
        HomeClient.Validate();
        HomeClient.CheckMessagesAlert();
    },
    AddEvents: () => {
        $("#modalRegister").on('show.bs.modal', function () {
            $("#loginModal").modal('hide');
        });
        $("#loginModal").on('show.bs.modal', function () {
            $("#modalRegister").modal('hide');
        });
    },
    Validate: () => {
        $("#frm_register").validate({
            rules: {
                emailRegistro:"required",
                passwordRegistro: "required",
                passwordRegisterConfirmed: {
                    equalTo: "#passwordRegistro"
                }
            },
           /* submitHandler: (form) => {
                $("#frm_register").submit();
            }*/
        })
    },
    CheckMessagesAlert: () => {
        var msgreg = $("#hddregister").val();
        var msgerr = $("#hdderror").val() == '' ? 0 : $("#hdderror").val();
        switch (msgreg) {
            case "1":
                Mensaje.Show("success", null, "El registro se realizo con exito");
                break;
            case "2":
                Mensaje.Show("error", null, "Algo salio intentelo nuevamente.");
                break;
        }
        switch (msgerr) {
            case "1":
                Mensaje.Show("error", null, "Usuario o contraseña incorrecto intentelo nuevamente.");
                break;
        }
    

    },

}
$(document).ready(() => {
    HomeClient.Init();
})