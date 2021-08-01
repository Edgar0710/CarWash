var productos = {
    Init() {
        productos.GetProductos();
        productos.Validate();
        productos.AddEvents();
       
    },
    Validate() {
        $("#frmCreate").validate({
            lang: 'es',
            errorClass: 'is-invalid',
            submitHandler: function (form) {
                productos.InsertaProducto();
            }
        });
        $("#frmUpdate").validate({
            lang: 'es',
            errorClass: 'is-invalid',
            submitHandler: function (form) {
                productos.ActualizaProducto();
            }
        });
    },
    AddEvents() {
   
    },
    GetProductos() {

        $.get(urlApi + "Services/Servicios").done(function (response) {
            $("#tb_productos > tbody").empty();
            if (response.Code == 200 && response.Result.length > 0) {
                $(response.Result).each((index, item) => {
                    var opciones = `   <a class="dropdown-item cl-gray btn-updateTb" href="#" data-toggle="modal" data-target="#mdlupdateProduct">Actualizar</a> `;

                    var $fieldCitas = $($.parseHTML(`<tr>
                        <td>
                            ${item.se_id}
                        </td>
                        <td>
                            ${item.se_nombre}
                        </td>
                        <td>
                            ${item.se_descripcion}
                        </td>
                        <td>
                            $${accounting.format(item.se_precio)}
                        </td>
                  
                        <td >
                            <div class="dropdown d-inline">
                                           <a class=" btn-alink text-dark fa fa-list-ul" id="ddbtn-${item.se_id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                         <div class="dropdown-menu dropdown-menu-right position-absolute mt-2 " aria-labelledby="ddbtn-${item.se_id}">
                                            ${opciones}
                                        </div>
                                    </div>
                            </td>
                    </tr>`));

                    $fieldCitas.find('.btn-updateTb').click(() => {
                        $("#se_id").val(item.se_id);
                        $("#se_nombrea").val(item.se_nombre);
                        $("#se_precioa").val(item.se_precio);
                        $("#se_descripciona").val(item.se_descripcion);
                    });
                  
                    $("#tb_productos >tbody").append($fieldCitas);


                });
                $("#tb_productos").dataTable({
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

                Mensaje.Show("error", null, "Algo Salio Mal")
            }

        });},
    InsertaProducto() {
        var url = urlApi + `Api/Services/CrearServicio?se_nombre=${$("#se_nombre").val()}&se_precio=${$("#se_precio").val()}&se_descripcion=${$("#se_descripcion").val()}`
        $.post(url).done((response) => {
            if (response.Code == 200) {
                $("#mdlAddProduct").modal("hide");
                Mensaje.Show("success", null, "El registro se realizo con exito");
                productos.GetProductos();
              
            } else {
                Mensaje.Show("error", null, "Algo salio mal intentalo nuevamente");
            }
        });
    },
    ActualizaProducto() {
        var url = urlApi + `Api/Services/ActualizarServicio?servicio=${$("#se_id").val()}&nombre=${$("#se_nombrea").val()}&precio=${$("#se_precioa").val()}&descripcion=${$("#se_descripciona").val()}`
        $.post(url).done((response) => {
            if (response.Code == 200) {
                $("#mdlAddProduct").modal('hide');
                Mensaje.Show("success", null, "El registro se realizo con exito");
                productos.GetProductos();
            } else {
                Mensaje.Show("error", null, "Algo salio mal intentalo nuevamente");
            }
        });
    }




}

$(document).ready(() => {
    productos.Init();
})