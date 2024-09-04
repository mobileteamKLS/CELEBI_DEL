
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var Terminal = window.localStorage.getItem("Terminal");
var Area = window.localStorage.getItem("Area");
var LocType= window.localStorage.getItem("LocationType");
var HAWBId;
var IGMRowId;

var availableLoc = [];
$(function () {
    // if(LocType=="E"){
    //     $('#divHAWB').hide();
    // }
    // else{
    //     $('#divHAWB').show();
    // }

    getLocationCode(Terminal, Area);
    $("#txtScanLocation").autocomplete({
        source: function (request, response) {
            var filteredLoc = availableLoc.filter(function (loc) {
                return loc.toLowerCase().startsWith(request.term.toLowerCase());
            });
            var topLoc = filteredLoc.slice(0, 8);
            response(topLoc);
        }
    });

    $('#ddlDamageType').change(function () {
        dmgType = $(this).val();
    });


    $("input").keyup(function () {
        var string = $(this).val();
        // var string = $('#txtOrigin').val();
        if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });
});

function getLocationCode(Terminal, Area) {
    $(".ibiSuccessMsg1").text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_LoadLocationMaster",
            data: JSON.stringify({
                'pi_strfilter': Terminal + "|" + Area, 'pi_strSelection': "A",
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
                availableLoc.length = 0;
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



function GetEWRNo() {
    clearBeforePopulate();
    $('#ddlEWRNo').empty();
    // var newOption = $('<option></option>');
    // newOption.val(0).text('Select');
    // newOption.appendTo('#ddlEWRNo');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var outmsg="";
    var AWBNo = $('#txtAWBNo').val();     

    if (AWBNo == '') {        
        return;
    }

    if (AWBNo != '' && AWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetEWRnumberForAWB_PDA",
            data: JSON.stringify({ 'pi_strAWBNo': AWBNo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;

                strXmlStore = str;

                if (str != null && str != "") {
                                    
                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        outmsg=$(this).find('OutMsg').text();
                        if (outmsg != '')
                        {
                            $.alert(outmsg);
                            return;
                        }

                        EWRval = $(this).find('EWRNo').text();
                        EWRno = $(this).find('EWRNo').text();

                        var newOption = $('<option></option>');
                        newOption.val(EWRval).text(EWRno);
                        newOption.appendTo('#ddlEWRNo');
                   
                        
                    }); 
                    if (outmsg == '') {
                        if ($("#ddlEWRNo option:selected").val() != '' || $("#ddlEWRNo option:selected").val() != '0') {
                            GetLocationDetails();
                        }
                    }
                                 

                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function getIGMFromHAWB() {
    $(".ibiSuccessMsg1").text('');
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetHAWBNumbersForMAWBNumber_PDA",
            data: JSON.stringify({ 'pi_strMAWBNo': MAWBNo, 'pi_strHAWBNo': HAWBNo, 'pi_strAirport': AirportCity, 'pi_strEvent': 'I' }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;                
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    var outMsg = $(this).find('Status').text();

                    if (outMsg == 'E') {
                        $.alert($(this).find('StrMessage').text());
                        return;
                    }
                    else {

                        var IGMid = $(this).find('Process').text();
                        var IGMNo = $(this).find('IGMNo').text();

                        if (IGMNo != '') {

                            var newOption = $('<option></option>');
                            newOption.val(IGMid).text(IGMNo);
                            newOption.appendTo('#ddlIGM');
                        }
                    }
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function GetLocationDetails() {
    $(".ibiSuccessMsg1").text('');
    if ($("#txtScanLocation").val() == "") {
        errmsg = "Please enter location.</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter Mawb No.</br>";
        $.alert(errmsg);
        return;
    }
    var ERValue = "";
    if ($("#ddlEWRNo option:selected").val() == '' || $("#ddlEWRNo option:selected").val() == '0') {
        ERValue = "";
    }
    else {
        ERValue = $("#ddlEWRNo option:selected").text();
    }

    var operation = "", groupId = "";
    if (document.getElementById("rdoAWBNo").checked) {

        operation = "S";
        groupId = "";
        console.log(operation);
    }
    if (document.getElementById("rdoGroupID").checked) {
        operation = "G";
        groupId = $("#txtGroupID").val();
        console.log(operation);
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_EXP_GetLocationDetails",
            data: JSON.stringify({
                'pi_strSelection': operation,
                'pi_strAWBNo': $("#txtAWBNo").val(),
                'Pi_strEWRNo': ERValue,
                'pi_GroupID': groupId,
                'pi_strUser': UserID,
                'po_strStatus': '',
                'po_strMessage': ''
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
                    var outMsg = $(this).find('Status').text();

                    if (outMsg == 'E') {
                        $.alert($(this).find('StrMessage').text());
                        return;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    $('#txtLoc').val($(this).find('Location').text());
                    $('#txtPcs').val($(this).find('locPcs').text());
                    HAWBId = parseInt($(this).find('HawbrowID').text());
                    IGMRowId = parseInt($(this).find('IGMrowID').text());
                    var LocID=parseInt($(this).find('LocID').text());
                    var Location=$(this).find('Location').text();
                    window.localStorage.setItem("HawbrowID",HAWBId);
                    window.localStorage.setItem("IGMrowID",IGMRowId);
                    window.localStorage.setItem("InvLocId",LocID);
                    window.localStorage.setItem("InvLocation",Location);
                    window.localStorage.setItem("Groupid",groupId);
                });

                $(xmlDoc).find('Table2').each(function (index) {
                    $('#txtDamagePkgsView').val($(this).find('DamagedNOP').text());
                    $('#txtDamageWtView').val($(this).find('DamagedWt').text());
                    var dNop=parseFloat($(this).find('DamagedNOP').text());
                    var dWT=parseFloat($(this).find('DamagedWt').text());
                    window.localStorage.setItem("DamagedNOP",dNop);
                    window.localStorage.setItem("DamagedWt",dWT);
                    
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

function SaveLocationDetails() {
    $(".ibiSuccessMsg1").text('');
    if ($("#txtScanLocation").val() == "") {
        errmsg = "Please enter location.</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtAWBNo").val() == "") {
        errmsg = "Please enter Mawb No.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtInvPcs").val() == "") {
        errmsg = "Please enter Inventory Pieces</br>";
        $.alert(errmsg);
        return;
    }

    var groupId = "";
    if (document.getElementById("rdoAWBNo").checked) {
        groupId = "";
    }
    if (document.getElementById("rdoGroupID").checked) {
        groupId = $("#txtGroupID").val();
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_SaveLocationDetails",
            data: JSON.stringify({
                'pi_intHawbId': HAWBId,
                'pi_intIGMRowid': IGMRowId,
                'pi_strFromLocation': $("#txtLoc").val(),
                'pi_strToLocation': $("#txtScanLocation").val(),
                'pi_strGroupID': groupId,
                'Pi_intInvPieces': $("#txtInvPcs").val(),
                'pi_strUser': UserID,
                'po_strStatus': '',
                'po_strMessage': '',
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
                    var msg = $(this).find('Message').text()
                    if (status == "S") {
                        clearALL();
                        $(".ibiSuccessMsg1").text(msg).css({ "color": "Green", "font-weight": "bold" });
                    }
                    else {
                        clearALL();
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

function goToDamage(type) {
    localStorage.setItem('comeFromDamage', type);
    window.location.href = 'IMP_Inventory_Found_Damage.html'
}

function oneNumberCheck() {
    val = parseInt($('#txtRecievedPkgs').val());
    if (val > 1) {
        $('#spnErrormsg').text('More then 1 pieces not allow.').css('color', 'red');
        $('#txtRecievedPkgs').val('1')
    } else {
        $('#spnErrormsg').text('');
    }

}

function EnableFoundCargo() {

    clearALL();
    if (document.getElementById('rdoAWBNo').checked) {
        $('#divGroupID').hide();
        $('#txtGroupID').val('');
        $('#txtScanLocation').focus();

    }
    else {

        $('#divGroupID').show();
        //$('#divHAWB').hide();
        //$('#divMAWB').hide();
        $('#ddlEWRNo').empty();
        $('#txtAWBNo').val('');
        $('#txtScanLocation').focus();
    }
}

function checkDamagePcs() {
    var foundPcs = parseInt($('#txtFoundPkgs').val());
    var damagePcs = parseInt($('#txtDamagePkgs').val());
    if (damagePcs > foundPcs) {
        $('#spnErrormsg').text('Damage Pieces should not greater than Found Pieces.').css('color', 'red');
        $('#txtDamagePkgs').val('');
    }


}

function checkDamageWt() {
    var foundPcs = parseFloat($('#txtFoundPkgsWt').val());
    var damagePcs = parseFloat($('#txtDamageWt').val());
    if (damagePcs > foundPcs) {
        $('#spnErrormsg').text('Damage Weight should not greater than Found Weight.').css('color', 'red');
        $('#txtDamageWt').val('');
    }
}

function SelectElement(id, valueToSelect) {
    var element = document.getElementById(id);
    element.value = valueToSelect;
}

function clearALL() {
    $('#txtScanLocation').val('');
    $('#txtGroupID').val('');
    $('#txtAWBNo').val('');
    $('#ddlEWRNo').empty();
    $('#txtLoc').val('');
    $('#txtPcs').val('');
    $('#txtInvPcs').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWt').val('');
    $('#txtDamageWtView').val('');
    $('#ddlDamageType').empty();
    $('#txtRemark').val('');
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}

function updateStatusToPause(path){
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_Updatestatus",
            data: JSON.stringify({
                'pi_strLocationType': LocType,
                'pi_strShed':Terminal,
                'pi_strArea': Area,
                'pi_strLocation': "",
                'pi_strAction':'PS',
                'pi_strUser': UserID,
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
                        window.location.href = path;
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

function clearBeforePopulate(){
    $(".ibiSuccessMsg1").text('');
    $('#ddlEWRNo').empty();
    $('#txtLoc').val('');
    $('#txtPcs').val('');
    $('#txtInvPcs').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWt').val('');
    $('#txtDamageWtView').val('');
    $('#ddlDamageType').empty();
    $('#txtRemark').val('');
}

function goBack(){
    updateStatusToPause('IMP_Inventory_Management.html');
}
function goToHome(){
    updateStatusToPause('GalaxyHome.html');
}

