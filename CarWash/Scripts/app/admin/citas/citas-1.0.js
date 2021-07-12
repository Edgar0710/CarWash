var urlApi = window.location.origin + "/";
var Citas = {
    Init: () => {
        Citas.GetCitas();
        Citas.AddEvents();
        Citas.Validate();
    },
    AddEvents: () => {

    },
    Validate: () => {

    },
    GetCitas: () => {
        $.get(urlApi + "Admin/AllCitas").done(function (response) {
            $("#tb_citas").empty();
            if (response.Code == 200 && response.Result.length>0) {
                $(response.Result).each((index, item) => {
                    var opciones = ` 
                            <a class="dropdown-item cl-gray" href="#">Sin opciones</a>
                       `;
                    var $fieldCitas = $($.parseHTML(`<tr>
                        <td>
                            ${item.au_Tipo}
                        </td>
                        <td>
                            ${item.cl_email}
                        </td>
                        <td>
                            ${moment(item.as_fecha).format("DD-MMMM-YYYY").toUpperCase()}
                        </td>
                        <td>
                            ${item.se_nombre}
                        </td>
                        <td>
                            ${item.as_aprobado==1?'Aprobado':'Pendiente'}
                        </td>
                         <td>
                          ${item.as_aprobado == 1 ? 'Pagado' : 'Por Pagar'}

                        </td>
                         <td>
                            ${accounting.format(item.as_monto)}
                        </td>
                        <td class="text-center">
                               <div class="dropdown d-inline">
                                        <div class="dropdown-menu dropdown-menu-right position-absolute mt-2" aria-labelledby="ddbtn-${item.as_id}">
                                            ${opciones}
                                        </div>
                                    </div>
                            </td>
                    </tr>`));

                 // $fieldCitas.find('.btn-changeAgent').click(() => { Facturas.ChangeAgentDetail(item.ag_id); });

                    $("#tb_citas").append($fieldCitas);
                   

                });
                //$("#tb_citas").datatable({
                //    destroy: true,
                //    "lengthmenu": [[8, 20, 50, -1], [8, 20, 50, "todos"]],
                //    "language": {
                //        "sprocessing": "procesando...",
                //        "slengthmenu": "mostrar _menu_ registros",
                //        "szerorecords": "no se encontraron resultados",
                //        "semptytable": "ningún dato disponible en esta tabla",
                //        "sinfo": "mostrando registros del _start_ al _end_ de un total de _total_ registros",
                //        "sinfoempty": "mostrando registros del 0 al 0 de un total de 0 registros",
                //        "sinfofiltered": "(filtrado de un total de _max_ registros)",
                //        "sinfopostfix": "",
                //        "ssearch": "buscar:",
                //        "surl": "",
                //        "sinfothousands": ",",
                //        "sloadingrecords": "cargando...",
                //        "opaginate": {
                //            "sfirst": "primero",
                //            "slast": "último",
                //            "snext": ">",
                //            "sprevious": "<"
                //        },
                //        "oaria": {
                //            "ssortascending": ": activar para ordenar la columna de manera ascendente",
                //            "ssortdescending": ": activar para ordenar la columna de manera descendente"
                //        },
                //        "buttons": {
                //            "copy": "copiar",
                //            "colvis": "visibilidad"
                //        }
                //    },
                //    "paging": true,
                //    "ordering": true,
                //    "info": true,
                //    "lengthchange": false,
                //    "searching": true,

                //});
            } else {


            }

        });
    
    }



}
$(document).ready(() => {
    Citas.Init();
})