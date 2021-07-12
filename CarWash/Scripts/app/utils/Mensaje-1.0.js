const orswal = Swal.mixin()

var Mensaje = {
    Show: function (tipo, titulo, mensaje, question = false) {


        if (question == false) {
            return orswal.fire({
                
                title: titulo,
                html: mensaje,
                icon: tipo,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        } else {
            return orswal.fire({
                html: mensaje,
                icon: tipo,
                confirmButtonText: 'Si',
                showCancelButton: true,
                cancelButtonText: 'No',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        }
    },

    Alerta: function (tipo, mensaje, callback = null) {

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": function () {
                window.location = url_rauto + callback;
            },
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "35000",
            "extendedTimeOut": "35000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        toastr[tipo](mensaje);
    },

    AlertaNotificacion: function (tipo, mensaje, callback = null) {
        
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "35000",
            "extendedTimeOut": "35000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        toastr[tipo](mensaje);

        if (callback != null) {
            switch (callback) {
                case '1':
                    Notificaciones.getNuevasNotificaciones();
                break;

            }

        }

    }
}