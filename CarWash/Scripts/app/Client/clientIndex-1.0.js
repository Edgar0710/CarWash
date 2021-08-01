var ClientIndex = {
    Init() {
        ClientIndex.AddEvents();
        ClientIndex.ListCitas();
        ClientIndex.ListAutos();
        ClientIndex.ListasServicios();
    },
    CreateCita() {
        var url = urlApi+`Api/Services/CrearCita?auto=${$("#ddlAutos").find("option:selected").val()}&servicio=${$("#ddlServicios").find("option:selected").val()}&fecha=${$("#txtFecha").val()}&hora=${$("#txtHora").val()}`;
        $.post(url).done((response) => {
            if (response.Code == 200) {
                Mensaje.Show("success", null, "la cita se creo con exito.")
                $("#frmCitas")[0].reset();
                ClientIndex.ListCitas();

            } else {
                Mensaje.Show("error", null,"Algo salio mal intentalo nuevamente")
            }
        })
    },
    NumAutos: 0,
    NumCitas: 0,
    InitStepper() {

        var stepper = new Stepper($('.bs-stepper')[0]);
        $(" .btn-previous").click(() => { stepper.previous(); });
        $(" .btn-next").click(() => { stepper.next(); });
    },
    ListCitas() {
        var url = urlApi + "Api/Services/CitasCliente";
        $.get(url).done((response) => {
            if (response.Code = 200) {
                var $citas = $(response.Result);
                ClientIndex.NumCitas = citas.length;
                if (response.Result.length > 0) {
                   
                    var strCitas = '';
                    $(".citas-container").empty();
                    $citas.each(function (index, item) {
                        strCitas = ''
                        var strstats = '';
                        switch (item.as_aprobado) {
                            // case 1: break; // Caso para citas NO EXISTE
                            case 1:
                                strstats = 'active';
                                break;
                            case 3:
                                strstats = 'checked';
                                break;
                            case 0:
                                strstats = 'unchecked';
                                break;
                        }
                        var meridian = (item.as_hora.includes('am') ? 'AM' : 'PM'),
                            newDate = new Date(moment(item.as_fecha).format('YYYY-MM-DD')+' '+item.as_hora);

                        var strDate = moment(newDate).format('YYYYMMDD[T]HHmm[00]');
                        var DateFin = moment(newDate).add(40, 'minute').format('YYYYMMDD[T]HHmm[00]');
                        var url_calendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${"Cita lavado de auto"}&details=CarWash&location=Carwash&dates=${strDate}/${DateFin}&ctz=Central+Time`

                        strCitas = `  <div class="col pt-2 p-md-2">
                                <div class="card shadow rounded card-cita ">
                                    <div class="tag-cita tag-cita-${strstats}"></div>
                                    <div class="opt-top-right pr-2">`;
                        if (index == 0) { strCitas += `<a target="_blank" href="${url_calendar}" class="fa fa-calendar my-3 " data-toggle="tooltip" title="Añadir a Google Calendar"></a>`; }
                        if (item.ci_estatus_citas == 2) {
                            strCitas += `<button class="btn min-w-auto fa fa-times btn-inasistencia"  data-toggle = "tooltip" data-placement = "top" title = "Marcar como inasistencia" data-cita="${item.ci_id}"></button>`
                        }
                        strCitas += `</div>
                                    <div class="card-body d-flex flex-column ">
                                        <div class="media-body mt-2">
                                            <h5 class="lg-text"><i class="fas fa-clock  mr-2"></i>Fecha </h5>
                                            <span>${moment(newDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                        </div>
                                        <div class="media-body mt-2">
                                            <h5 class="lg-text"><i class="fas fa-file-contract mr-2"></i>Servicio </h5>
                                            <span>${item.se_descripcion}</span>
                                        </div>
                                        <div class="media-body mt-2">
                                            <h5 class="lg-text"><i class="fas fa-file-contract mr-2"></i>Descripción </h5>
                                            <span>${item.se_descripcion}</span>
                                        </div>
                                                 
                                        `;
                        strCitas += `     
                                    </div>
                                </div>
                            </div>`
                        var cita = $.parseHTML(strCitas);
                     
                        $(".citas-container").append(cita);
                    });

                }

            } else {
                ClientIndex.ListCitas();
            }


        })
    }, ListasServicios() {
        var url = urlApi + "Api/Services/Servicios";
        $.get(url).done((response) => {
            if (response.Code == 200) {
                var servicios = response.Result;
                var strServices = "";
                $(servicios).each((index, item) => {
                    strServices += `<option value="${item.se_id}">${item.se_nombre} $${accounting.format(item.se_precio)}</option>`; 

                });
                $("#ddlServicios").append(strServices);

            } else {
                ClientIndex.ListasServicios();
            }


        })
    },
    ListAutos() {
        var url = urlApi + "Api/Services/AutosCliente";
        $.get(url).done((response) => {
            if (response.Code = 200) {
                var autos = response.Result;
                ClientIndex.NumAutos = autos.length;
                var strAutos = "";
                $(autos).each((index, item) => {
                    strAutos += `<option value="${item.au_id}">aut${item.au_id}  ${item.au_Tipo}</option>`;

                });
                $("#ddlAutos").append(strAutos);

            } else {
                ClientIndex.ListAutos();
            }


        })

    },
    AddEvents() {

        $(".btn-createCitas").click(() => { ClientIndex.CreateCita() });
        $(".tipo-auto").click(function () {
            $(".tipo-auto").prop("checked", false);
            $(this).prop("checked", true);

            //$("#cb1").is(':checked')
           // console.log()
        });
        $(".inset-auto").click(function () {
            if ($(".tipo-auto:checked").length) {
                var url = urlApi + "Api/Services/CrearAuto?tipoAuto=" + $(".tipo-auto:checked").first().val();
                $.post(url).done((response) => {
                    if (response.Code == 200) {
                        Mensaje.Show("question", null, "El auto se añadio correctamente<br/>¿Quieres crear una cita ahora?",true)
                            .then((result) => {
                                if (result.isConfirmed) {
                                    ClientIndex.ListAutos();
                                    ClientIndex.ShowMdlAddCita();
                                } else {
                                    $("#mdlAddAuto").modal('hide');
                                }
                            })
                    } else {

                        Mensaje.Show("error", null, "Algo salio mal intentalo nuevamente");
                    }
                });

            } else {
                Mensaje.Show("warning", null, "Debes seleccionar un auto primero");

            }
        });
        $('.show-add-citas').click(function () {
            ClientIndex.ShowMdlAddCita();
        });
        $('.show-add-autos').click(function () {
            ClientIndex.ShowMdlAddCars();
        });
    },
    ShowMdlAddCars() {
        //$()
        //if (!$('#mdlAddAuto').data('bs.modal')._isShown) {
            $('#mdlAddAuto').modal();
        //}
        $(".add-auto,.title-auto").removeClass('d-none');
        $(".title-cita,.add-cita").addClass('d-none');
    },
    ShowMdlAddCita() {
       // if (!$('#mdlAddAuto').data('bs.modal')._isShown) {
           
        // }
        if (ClientIndex.NumAutos > 0) {
            $('#mdlAddAuto').modal();
            $(".title-cita,.add-cita").removeClass('d-none');
            $(".title-auto,.add-auto").addClass('d-none');
            ClientIndex.InitStepper();
        }
        else {
            Mensaje.Show("warning", null, "Debes agregar un auto antes de crear una cita").then((r) => {
                ClientIndex.ShowMdlAddCars();
            });
           
        }
    }

}

$(document).ready(function () {
    ClientIndex.Init();
    });