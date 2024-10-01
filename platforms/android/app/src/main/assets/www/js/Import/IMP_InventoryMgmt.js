var SHED_AIRPORT_CITY = window.localStorage.getItem("SHED_AIRPORT_CITY");
var Userid = window.localStorage.getItem("UserID");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var UserName = window.localStorage.getItem("UserName");
var selectedLoc;
var selectedShed;
var randomNum;
var availableLoc=[];
$(function () {
    console.log("MGMT");
    getLocationType();    
    randomNumb();
    $("#ddlLocationType").change(function () {
        selectedLoc = $(this).find(":selected").val();
        getTerminalsByLoc(selectedLoc);
    });

    $("#ddlShed").change(function () {
        selectedShed = $(this).find(":selected").val();
        localStorage.setItem('impShedDDL', selectedShed);
        if(selectedShed=="0"){
            $("#lblStatus").text('');
            $('#btnStart').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            $('#btnContinue').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            $('#btnReset').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            $('#btnComplete').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            $('#btnModify').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            return;
        
        }
        getAreaFromTerminal(selectedShed);
    });

    $("#ddlArea").change(function () {
        var selectedArea = $(this).find(":selected").val();
        localStorage.setItem('impAreaDDL', selectedArea);
        if(selectedArea=="0"){
            $("#lblStatus").text('');
            $('#btnStart').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            $('#btnContinue').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            $('#btnReset').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            $('#btnComplete').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            $('#btnModify').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
            return;
        
        }
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
                $("#ddlLocationType").val('I');
                $("#ddlLocationType").trigger('change');
                
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while fetching data');
            }
        });
        return false;
    }
}
function randomNumb(){
     randomNum=Math.floor(Math.random()*100+1);
    
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

                var savedValue1 = localStorage.getItem('impShedDDL');
                if (savedValue1) {
                    $('#ddlShed').val(savedValue1).trigger('change');
                }
                
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

                var savedValue2 = localStorage.getItem('impAreaDDL');
                if (savedValue2) {
                    $('#ddlArea').val(savedValue2).trigger('change');
                }
              
                
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
                'Shed': Terminal,
                'Area':Area, 
                'Location': '',
                'strUser':'',
                'strSession':randomNum,
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
            
                var invStatus = '';
                $(xmlDoc).find('Table1').each(function (index) {
                    $("#lblStatus").text($(this).find('Status').text());
                    invStatus = $(this).find('Status').text();
            
                    // Define an array of buttons
                    var buttons = [
                        { id: '#btnStart', condition: false },
                        { id: '#btnContinue', condition: false },
                        { id: '#btnReset', condition: false },
                        { id: '#btnComplete', condition: false },
                        { id: '#btnModify', condition: false }
                    ];
            
                    if (invStatus == "Pending") {
                        buttons[0].condition = true; // Enable Start
                    } else if (invStatus == "Paused") {
                        buttons[1].condition = true; // Enable Continue
                        buttons[2].condition = true; // Enable Reset
                        buttons[3].condition = true; // Enable Complete
                    } else if (invStatus == "Completed") {
                        buttons[4].condition = true;
                        buttons[0].condition = true; // Enable Start // Enable Modify
                    } else if (invStatus == "In-Progress") {
                        buttons[1].condition = true; // Enable Continue
                        buttons[2].condition = true; // Enable Reset
                        buttons[3].condition = true; // Enable Complete
                    }
            
                    // Update buttons based on conditions
                    buttons.forEach(function(button) {
                        var btn = $(button.id);
                        if (button.condition) {
                            btn.removeAttr("disabled").removeClass("button-disabled").addClass("button-enabled");
                        } else {
                            btn.attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
                        }
                    });
                });
            }
            ,
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
                    if(action!="CL"){
                    setTimeout(function () {
                        window.localStorage.setItem("LocationType",$("#ddlLocationType").val());
                        window.location.href = 'IMP_Inventory_Management_Save.html';
                    }, 2000);
                }
                else{
                    getStatus($("#ddlShed").val(),$("#ddlArea").val());
                }
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
function clearALL() {

    $('#ddlShed').val('0');
    $('#ddlArea').empty();
    $("#lblStatus").text('');
    $('#btnStart').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
    $('#btnContinue').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
    $('#btnReset').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
    $('#btnComplete').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
    $('#btnModify').attr("disabled", "disabled").removeClass("button-enabled").addClass("button-disabled");
}