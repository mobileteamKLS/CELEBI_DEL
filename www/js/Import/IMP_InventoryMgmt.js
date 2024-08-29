var SHED_AIRPORT_CITY = window.localStorage.getItem("SHED_AIRPORT_CITY");
var Userid = window.localStorage.getItem("UserID");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var UserName = window.localStorage.getItem("UserName");
var selectedLoc;
var selectedShed;
var availableLoc=[];
$(function () {
    console.log("MGMT");
    getLocationType();
    $("#ddlLocationType").change(function () {
        selectedLoc = $(this).find(":selected").val();
        getTerminalsByLoc(selectedLoc);
    });

    $("#ddlShed").change(function () {
        selectedShed = $(this).find(":selected").val();
        getAreaFromTerminal(selectedShed);
    });

    $("#ddlArea").change(function () {
        var selectedArea = $(this).find(":selected").val();
        getStatus(selectedShed,selectedArea);
    });

    $( "#txtScanLocation" ).autocomplete({
        source: function(request, response) {
            var filteredLoc = availableLoc.filter(function(loc) {
                return loc.toLowerCase().startsWith(request.term.toLowerCase());
            });
            var topLoc = filteredLoc.slice(0, 8);
            response(topLoc);
        }
    });

});

function getLocationType(){
    $(".ibiSuccessMsg1").text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_LoadLocationMaster",
            data: JSON.stringify({
                'pi_strfilter': "", 'pi_strSelection': "",
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $("#ddlLocationType").empty();
                $(xmlDoc).find('Table').each(function (index) {
                    if ($("#ddlLocationType option[value='0']").length == 0) {
                        $("#ddlLocationType").append($("<option></option>").val('0').html('Select'));
                    }
                    $("#ddlLocationType").append($("<option></option>").val($(this).find('LocaTypeCode').text()).html($(this).find('Column1').text()));

                });
                
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while fetching data');
            }
        });
        return false;
    }
}

function getTerminalsByLoc(Loc){
    $(".ibiSuccessMsg1").text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_LoadLocationMaster",
            data: JSON.stringify({
                'pi_strfilter': Loc, 'pi_strSelection': "L",
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $("#ddlShed").empty();
                $(xmlDoc).find('Table').each(function (index) {
                    if ($("#ddlShed option[value='0']").length == 0) {
                        $("#ddlShed").append($("<option></option>").val('0').html('Select'));
                    }
                    $("#ddlShed").append($("<option></option>").val($(this).find('Shed').text()).html($(this).find('Shed').text()));

                });
                
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while fetching data');
            }
        });
        return false;
    }
}
function getAreaFromTerminal(Terminal){
    $(".ibiSuccessMsg1").text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_LoadLocationMaster",
            data: JSON.stringify({
                'pi_strfilter': Terminal, 'pi_strSelection': "T",
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                $("#ddlArea").empty();
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function (index) {
                    if ($("#ddlArea option[value='0']").length == 0) {
                        $("#ddlArea").append($("<option></option>").val('0').html('Select'));
                    }
                    $("#ddlArea").append($("<option></option>").val($(this).find('Area').text()).html($(this).find('Area').text()));

                });
              
                
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}

function getStatus(Terminal,Area){
    $(".ibiSuccessMsg1").text('');
    window.localStorage.setItem("Terminal",Terminal);
    window.localStorage.setItem("Area",Area);
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_Getstatus",
            data: JSON.stringify({
                'Shed': Terminal,'Area':Area, 'Location': '',
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
               
                $(xmlDoc).find('Table').each(function (index) {
                    var status = $(this).find('Status').text();
                    var msg = $(this).find('Message').text();
                    if(status=="E"){
                        $(".ibiSuccessMsg1").text(msg).css({ "color": "Red", "font-weight": "bold" });
                    }
                    return;
                    
                });
                var invStatus='';
                $(xmlDoc).find('Table1').each(function (index) {
                   $("#lblStatus").text($(this).find('Status').text());
                   invStatus=$(this).find('Status').text();

                    if (invStatus == "Pending") {
                        $('#btnStart').removeAttr("disabled");
                        $('#btnContinue').attr("disabled", "disabled");
                        $('#btnReset').attr("disabled", "disabled");
                        $('#btnComplete').attr("disabled", "disabled");
                        $('#btnModify').attr("disabled", "disabled");
                    }
                    else if (invStatus == "Paused") {
                        $('#btnContinuebtnStart').removeAttr("disabled");
                        $('#btnStart').attr("disabled", "disabled");
                        $('#btnReset').attr("disabled", "disabled");
                        $('#btnComplete').attr("disabled", "disabled");
                        $('#btnModify').attr("disabled", "disabled");
                    }
                    else if (invStatus == "Completed") {
                        $('#btnModify').removeAttr("disabled");
                        $('#btnContinue').attr("disabled", "disabled");
                        $('#btnReset').attr("disabled", "disabled");
                        $('#btnComplete').attr("disabled", "disabled");
                        $('#btnStart').attr("disabled", "disabled");
                    }
                    else if (invStatus == "In-Progress") {
                        $('#btnContinue').removeAttr("disabled");
                        $('#btnStart').attr("disabled", "disabled");
                        $('#btnReset').removeAttr("disabled");
                        $('#btnComplete').attr("disabled", "disabled");
                        $('#btnModify').attr("disabled", "disabled");
                    }
                });
                
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}

function updateStatus(action){
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_Updatestatus",
            data: JSON.stringify({
                'pi_strLocationType': $("#ddlLocationType").val(),
                'pi_strShed':$("#ddlShed").val(),
                'pi_strArea': $("#ddlArea").val(),
                'pi_strLocation': "",
                'pi_strAction':action,
                'pi_strUser': Userid,
                'po_strStatus': "",
                'po_strMessage':"",
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
               
                $(xmlDoc).find('Table').each(function (index) {
                   var status=$(this).find('Status').text();
                   var msg=$(this).find('Message').text()
                   if(status=="S"){
                    $(".ibiSuccessMsg1").text(msg).css({ "color": "Green", "font-weight": "bold" });
                    setTimeout(function () {
                        window.location.href = 'IMP_Inventory_Management_Save.html';
                    }, 2000);
                    
                   }
                   else{
                    $(".ibiSuccessMsg1").text(msg).css({ "color": "Red", "font-weight": "bold" });
                   }
                });
                
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}

function getLocationCode(Terminal,Area){
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_LoadLocationMaster",
            data: JSON.stringify({
                'pi_strfilter': Terminal+"|"+Area, 'pi_strSelection': "A",
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                availableLoc.length=0;
                $(xmlDoc).find('Table').each(function (index) {
                    availableLoc.push($(this).find('LocationCode').text());
                });
                
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}