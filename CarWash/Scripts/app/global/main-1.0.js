var urlApi = window.location.origin + "/";
var asyncRequests = 0,
    step = 1;
var t_notify = 0;
var Main = {
    Init: function () {
        Main.HideLoader();
        Main.validators();
      //  Main.GetAllNotify();
    },
    GetAllNotify: () => {
        $.get(urlApi + "Home/GetAllNotify").done((result) =>
        {
            if (result.Code == 200) {
                var notifys = ``;
           
                if (result.Result) {

                   
                    var disableGenerate = false;

                    $(result.Result).each((idx, item) => {
                        switch (item.tipo) {
                            case 1:
                                disableGenerate = true;
                                break;
                        }

                        notifys += `<div data-role="content" class="scrollable-content" style="width:350px;">
                                <a class="list-group-item dropdown-item" href="javascript:void(0)" role="menuitem">
                                    <div class="media p-0"> 
                                        <div class=" badge badge-primary rounded-circle d-none" style="width:25px;">
                                            
                                            <i class="fa fa-bell text-white" aria-hidden="true"></i>
                                        </div>
                                        <div class="media-body">
                                            <p class="media-meta text-wrap">${item.Mensaje}</p>
                                        </div>
                                    </div>
                                </a>
                             
                            </div>`;

                    });
                    if (disableGenerate) $(".btn-genereateEC").prop("disabled", "disabled").addClass("disabled");
                    
                } else {
                    notifys = `  <div data-role="content" class="scrollable-content">
                                <a class="list-group-item dropdown-item" href="javascript:void(0)" role="menuitem">
                                    <div class="media p-0">
                                        <div class=" badge badge-primary rounded-circle d-none" style="width:25px;">
                                            
                                            <i class="fa fa-bell text-white" aria-hidden="true"></i>
                                        </div>
                                        <div class="media-body">
                                            <p class="media-heading">No hay notificaciones por el momento.</p>
                                        </div>
                                    </div>
                                </a>
                             
                            </div>`;
                }
                $('.notify-count').html(result.Result.length);
                $('.notifyContainer').html(notifys);
            } 
        }
        );
    },
    validators: function () {
        $(`[data-formatter='number']`).on("keypress", function () { return Main.aceptaNumInt(event) });
    }, aceptaNumInt: function (evt) {
        var key = evt.keyCode;
        return (key <= 8 || (key >= 48 && key <= 57));
    }  ,  /**Funcion dedicada a desplasar al usuario al tope de la pagina cuando se llame */
    ScrollTop: function () {
        $("html, body").animate({
            scrollTop: $("body").eq(0).offset().top
        }, 360);
    }
    , addAjaxEvents: function () {

        function showLoader(url) {
            if (url.includes("PostImgAuto")) return false;
            else if (url.includes("https://maps.googleapis.com")) return false;
            else if (url.includes("Notificacion/GetNotificaciones")) return false;
            else if (url.includes("Auto/GetCatalogos?")) return false;
            else if (url.includes("/Files/")) return false;
            else if (url.includes("/EBC/")) return false;
            else return true;
        }

        //Verifica cuantas peticiones se hacen e identifica cuales muestran el loader y cuales no
        $(document).ajaxSend(function (e, jqxhr, setting) {
            var ShowLoader = showLoader(setting.url);
            if (ShowLoader) {
                asyncRequests++;
                Main.ShowLoader();
            }
        });

        //Varifica cuantas peticiones se terminan (sin error), para saber si se debe seguir mostrando el loader
        $(document).ajaxComplete(function (e, jqxhr, setting) {
            var ShowLoader = showLoader(setting.url),
                jsonResp = jqxhr.responseJSON;

            if (ShowLoader) asyncRequests--;
            if (asyncRequests == 0) Main.HideLoader();
            if (jsonResp != undefined) {
                if (jsonResp.Message == "Unauthorized" || jsonResp.Message == "Forbidden") {

                    window.location = window.location.origin+ "/Login/Logout";
                }
            }

        });

        //Varifica cuantas peticiones se terminan (con error), para saber si se debe seguir mostrando el loader
        $(document).ajaxError(function (e, jqxhr, setting, ex) {
            var ShowLoader = showLoader(setting.url);
            var statuscode = parseInt(jqxhr.status);
            switch (statuscode) {
                case 401: //Valida el error 401
                //    Main.CleanSesion(setting);
                    break;
            }

            if (setting.statusCode[401] != undefined) {
            //      Main.CleanSesion(setting);
            }

            if (jqxhr.getResponseHeader('www-authenticate') != null) {
                if (jqxhr.getResponseHeader('www-authenticate').includes('invalid_token')) {
              //      Main.CleanSesion(setting);
                }
            }

            if (ShowLoader) asyncRequests--;
            if (asyncRequests == 0) Main.HideLoader();
        });

        $.ajaxSetup({
            statusCode: {
                //Valida el error 401
                401: function (err) {
                    Main.CleanSesion(err);
                }
            }
        });

        //$('.collapse').on('shown.bs.collapse', function () {
        //    Main.changeHeight();
        //});
        //$('.collapse').on('hidden.bs.collapse', function () {
        //    Main.changeHeight();
        //});
        $('.nav-tabs a').on('shown.bs.tab', function () {
            // Si los tabs son para formularios, por usabilidad pone el cursor en el primer elemento en que se pueda introducir un dato
            $($(this).attr('href')).find('input:visible, select:visible, textarea:visible').first().focus();
            Main.changeHeight();
        });


        $(".tab-next").click(function () {
            var lenght = $('.tab-pane').length;
            var loop = $('#ul-arrow').data().loop;
            if (step == lenght) {
                if (loop) {
                    step = 1;
                } else {
                    $(".tab-next img").addClass('d-none')
                }
            } else {
                step = (step + 1);
            }
            if (step != lenght && step != 1 && !loop) {
                $('.tab-next img').removeClass('d-none')
                $('.tab-previous img').removeClass('d-none')
            }

            Main.ToNav();
        });

        $(".tab-previous").click(function () {
            var lenght = $('.tab-pane').length;
            var loop = $('#ul-arrow').data().loop;
            if (step == 1) {
                if (loop) {
                    step = lenght;
                } else {
                    $('.tab-previous img').addClass('d-none')
                }
            } else {
                step = (step - 1);
            }
            if (step != lenght && step != 1 && !loop) {
                $('.tab-next img').removeClass('d-none')
                $('.tab-previous img').removeClass('d-none')
            }

            Main.ToNav();
        });

        if ($("#im").val() == "registro" || $("#im").val() == "FAQ") {
            window.addEventListener("resize", function () {
                Main.showArrows();
            });
        }
    },
    /**Funcion dedicada solo a mostrar el loader */
    ShowLoader: function () {
        $('#div_loader').addClass('d-flex');
        $('#div_loader').removeClass('d-none');
    },

    /**Funcion dedicada solo a ocultar el loader */
    HideLoader: function () {
        $('#div_loader').addClass('d-none');
        $('#div_loader').removeClass('d-flex');
    },
    ClearPAgination: () => {
        $('#dv_paginacion, #dv_resultados').empty();
        $("#dv_resultados").html(`<p class="cl-gray">No hay paginas disponibles</p>`);
    },
    addPagination: function (total, paginas, paginaActual, pageSize, callback = null) {
        var strPages = '';
        paginaActual = parseInt(paginaActual);
        $('#dv_paginacion, #dv_resultados').empty();
        if (paginas > 1) {
            $('#dv_paginacion').empty().removeClass('d-none');

            if (paginaActual > 1 && paginas > 1) {
                strPages += '<a id="pag_' + (paginaActual - 1) + '" class="fas fa-chevron-left" data-page="' + (paginaActual - 1) + '"></a>';
                strPages += '<a id="pag_' + 1 + '" class="" data-page="' + 1 + '">' + 1 + '</a>';
            }
            if (paginaActual - 1 > 2 && paginas > 1) {
                strPages += '<a >...</a>';
            }
            if (paginaActual - 1 > 1 && paginas > 1) {
                strPages += '<a id="pag_' + (paginaActual - 1) + '" class="" data-page="' + (paginaActual - 1) + '">' + (paginaActual - 1) + '</a>';
            }

            strPages += '<a id="pag_' + paginaActual + '" class="active" data-page="' + paginaActual + '">' + paginaActual + '</a>';

            if (paginas - paginaActual > 1 && paginas > 1) {
                strPages += '<a id="pag_' + (paginaActual + 1) + '" class="" data-page="' + (paginaActual + 1) + '">' + (paginaActual + 1) + '</a>';
            }
            if (paginas - paginaActual > 2 && paginas > 1) {
                strPages += '<a >...</a>';
            }
            if (paginaActual < paginas && paginas > 1) {
                strPages += '<a id="pag_' + (paginas) + '" data-page="' + (paginas) + '">' + paginas + '</a>';
                strPages += '<a id="pag_' + (paginaActual + 1) + '" class="fas fa-chevron-right" data-page="' + (paginaActual + 1) + '"></a>';
            }
            $('#dv_paginacion').append(strPages);

            $('#dv_paginacion > a').click(function () {
                if (callback != null && $(this).data().page != null) callback($(this).data().page);
            });

            $("#pag_" + paginaActual).addClass('active');
        }

        var inicial = (paginaActual == 1 ? 1 : ((paginaActual - 1) * pageSize) + 1),
            final = (paginaActual == paginas ? total : paginaActual * pageSize);

        //$("#dv_resultados").html('Resultados ' + inicial + ' al ' + final + ' de ' + total + ' disponibles.');
        $("#dv_resultados").html(`<p class="cl-gray">Mostrando ${inicial} a ${final} de ${total} filas</p>`);
    },

    GetNthWeekday: function (baseDate, nthWeekday, weekday) {
        // parse base date
        var date = moment(baseDate),
            year = date.year(),
            month = date.month();

        // Create a new date initialized in the day one
        var myMonth = moment({ year: year, month: month, day: 0 });

        var daysFound = 0,
            found = false;

        // check if the given date is in the same month
        while (myMonth.month() == month) {
            if (myMonth.weekday() == weekday) daysFound++;

            if (daysFound == nthWeekday) {
                found = true;
                break;
            }
            else myMonth.add(1, 'd');
        }

        if (found) return myMonth;
        else return null;
    },

    GetLastReportInterval: function () {
        var currentDate = moment().format("YYYY-MM-DD"),
            thirdWednesday = Main.GetNthWeekday(currentDate, 3, 2);

        if (moment().date() > thirdWednesday.date()) {
            return {
                initDate: Main.GetNthWeekday(moment().subtract(1, "month").format("YYYY-MM-DD"), 3, 2),
                endDate: thirdWednesday,
            }
        } else {
            return {
                initDate: Main.GetNthWeekday(moment().subtract(2, "month").format("YYYY-MM-DD"), 3, 2),
                endDate: Main.GetNthWeekday(moment().subtract(1, "month").format("YYYY-MM-DD"), 3, 2),
            }
        }
    }
}

Main.addAjaxEvents();
$(document).ready(Main.Init());