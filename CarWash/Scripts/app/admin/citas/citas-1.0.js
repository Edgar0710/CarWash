var urlApi = window.location.origin + "/";
var Citas = {
    Init() {
        Citas.GetCitas();
        Citas.AddEvents();
        Citas.Validate();
    },
    AddEvents() {

    },
    Validate() {

    },
    AprobarCita(cita) {
        Mensaje.Show("question", null, "¿Relmente quieres aprobar esta cita?", true).then(
            (r) => {
                if (r.isConfirmed) {
                    var url = urlApi + "Api/Services/AprobarCita?cita=" + cita;
                    $.post(url).done((response) => {
                        if (response.Code == 200) {
                            Mensaje.Show("success", null, "La cita se aprobo con exito");
                            Citas.GetCitas();
                        } else {
                            Mensaje.Show("error", null, "Algo salio mal intentalo nuevamente");
                        }
                    });
                }
            }
        );
    },
    MarcarPago(cita) {
        Mensaje.Show("question", null, "¿Relmente quieres marcar como pagada esta cita?", true).then(
            (r) => {
                if (r.isConfirmed) {
                    var url = urlApi + "Api/Services/MarcarPago?cita=" + cita;
                    $.post(url).done((response) => {
                        if (response.Code == 200) {

                            Mensaje.Show("success", null, "La cita se marco como pagada");
                            Citas.GetCitas();
                        } else {
                            Mensaje.Show("error", null, "Algo salio mal intentalo nuevamente");
                        }
                    });
                }
            }
        );},
    GetCitas() {
        $.get(urlApi + "Admin/AllCitas").done(function (response) {
            $("#tb_citas>tbody").empty();
            if (response.Code == 200 && response.Result.length>0) {
                $(response.Result).each((index, item) => {
                    var opciones = ` `;
                    if (item.as_aprobado == 1) {
                        if (item.as_pagado == 0) {
                            opciones = ` 
                            <a class="dropdown-item cl-gray btn-marcarpago" href="#">Marcar Pago</a>
                             `;
                        } else {
                            opciones = ` 
                            <a class="dropdown-item cl-gray" href="#">Sin opciones</a>
                             `;
                        }
                    } else {
                        opciones = ` 
                            <a class="dropdown-item cl-gray btn-aprobarcita" href="#">Aprobar Cita</a>
                             `;
                    }

                    newDate = new Date(moment(item.as_fecha).format('YYYY-MM-DD') + ' ' + item.as_hora);
                    var $fieldCitas = $($.parseHTML(`<tr>
                        <td>
                            ${item.au_Tipo}
                        </td>
                        <td>
                            ${item.cl_email}
                        </td>
                        <td>
                            ${moment(newDate).format("DD-MMMM-YYYY HH:MM").toUpperCase()}
                        </td>
                        <td>
                            ${item.se_nombre}
                        </td>
                        <td>
                            ${item.as_aprobado==1?'Aprobado':'Pendiente'}
                        </td>
                         <td>
                          ${item.as_pagado == 1 ? 'Pagado' : 'Por Pagar'}

                        </td>
                         <td>
                            ${accounting.format(item.as_monto)}
                        </td>
                        <td >
                            <div class="dropdown d-inline">
                                           <a class=" btn-alink text-dark fa fa-list-ul" id="ddbtn-${item.as_id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                         <div class="dropdown-menu dropdown-menu-right position-absolute mt-2 " aria-labelledby="ddbtn-${item.as_id}">
                                            ${opciones}
                                        </div>
                                    </div>
                            </td>
                    </tr>`));

                    $fieldCitas.find('.btn-aprobarcita').click(() => { Citas.AprobarCita(item.as_id); });
                    $fieldCitas.find('.btn-marcarpago').click(() => { Citas.MarcarPago(item.as_id); });

                    $("#tb_citas >tbody").append($fieldCitas);
                   

                });
                $("#tb_citas").dataTable({
                    destroy: true,
                    "lengthmenu": [[8, 20, 50, -1], [8, 20, 50, "todos"]],
                    "language": {
                        "sprocessing": "procesando...",
                        "slengthmenu": "mostrar _menu_ registros",
                        "szerorecords": "no se encontraron resultados",
                        "semptytable": "ningún dato disponible en esta tabla",
                        "sinfo": "mostrando registros del _start_ al _end_ de un total de _total_ registros",
                        "sinfoempty": "mostrando registros del 0 al 0 de un total de 0 registros",
                        "sinfofiltered": "(filtrado de un total de _max_ registros)",
                        "sinfopostfix": "",
                        "ssearch": "buscar:",
                        "surl": "",
                        "sinfothousands": ",",
                        "sloadingrecords": "cargando...",
                        "paginate": {
                            "first": "primero",
                            "last": "último",
                            "next": ">",
                            "previous": "<"
                        },
                        "aria": {
                            "ssortascending": ": activar para ordenar la columna de manera ascendente",
                            "ssortdescending": ": activar para ordenar la columna de manera descendente"
                        },
                        "buttons": {
                            "copy": "copiar",
                            "colvis": "visibilidad"
                        }
                    },
                    "paging": true,
                    "ordering": true,
                    "info": true,
                    "lengthchange": false,
                    "searching": true,

                });
                $('[data-toggle="tooltip"]').tooltip();
            } else {

                Mensaje.Show("error",null,"Algo Salio Mal")
            }

        });
    
    }



}
$(document).ready(() => {
    Citas.Init();
})