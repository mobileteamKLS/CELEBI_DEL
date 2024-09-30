
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
    if(LocType=="E"){
        $('#divHAWB').hide();
    }
    else{
        $('#divHAWB').show();
    }

    getLocationCode(Terminal, Area);
    getDamageTypes();
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
        if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });
});


function getDamageTypes(){
    $(".ibiSuccessMsg1").text('');
    $("#ddlLocationType").empty();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_GetDamagetypeMaster",
            data: JSON.stringify({
                'pi_strfilter': "", 
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
                $("#ddlDamageType").empty();
                $("#ddlDamageTypeFD").empty();
                $(xmlDoc).find('Table').each(function (index) {
                    if ($("#ddlDamageType option[value='0']").length == 0) {
                        $("#ddlDamageType").append($("<option></option>").val('0').html('Select'));
                    }
                    $("#ddlDamageType").append($("<option></option>").val($(this).find('damageCode').text()).html($(this).find('damageDesc').text()));

                });

                $(xmlDoc).find('Table').each(function (index) {
                    if ($("#ddlDamageTypeFD option[value='0']").length == 0) {
                        $("#ddlDamageTypeFD").append($("<option></option>").val('0').html('Select'));
                    }
                    $("#ddlDamageTypeFD").append($("<option></option>").val($(this).find('damageCode').text()).html($(this).find('damageDesc').text()));

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

function getHawbFromMawb() {
    $(".ibiSuccessMsg1").text('');
    $('#ddlHAWB').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlHAWB');
    var MAWBNo = $('#txtAWBNo').val();
    if (MAWBNo == '') {
        return;
    }
    if ($('#txtAWBNo').val() != '') {
        if (MAWBNo.length != '11') {
            if (MAWBNo.length != '13') {
                errmsg = "Please enter valid AWB No.";
                $.alert(errmsg);
                $('#txtAWBNo').val('');
                return;
            }
        }
    }
    var operation;
    if ($('#txtAWBNo').val() != '') {
        operation = 'A';
        MAWBNo = $('#txtAWBNo').val();
    } else {
        operation = 'G';
        MAWBNo = $('#txtGroupID').val();
    }


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var outMsg="";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "GetHAWBNumbersForMAWBNumber_PDA",
            data: JSON.stringify({
                'pi_strMAWBNo': MAWBNo, 'pi_strHAWBNo': '',
                'pi_strAirport': AirportCity, 'pi_strEvent': operation
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
                //debugger;                
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                     outMsg = $(this).find('Status').text();

                    if (outMsg == 'E') {
                        $.alert($(this).find('StrMessage').text());
                        return;
                    }
                    else {
                        var HawbNo = $(this).find('HAWBNo').text();
                        $('#txtAWBNo').val($(this).find('AirWaybillNo').text());
                        if (HawbNo != '') {

                            var HAWBId;
                            var HAWBNos;

                            HAWBId = $(this).find('HAWBNo').text();
                            HAWBNos = HawbNo;

                            var newOption = $('<option></option>');
                            newOption.val(HAWBId).text(HAWBNos);
                            newOption.appendTo('#ddlHAWB');
                        }
                    }
                });
               if(outMsg=="S" || outMsg==""){
                 
                   var hasMoreThanSelect = $('#ddlHAWB option').filter(function () {
                       return $(this).val() !== "Select" && $(this).val() !== "0"; // Adjust as per your "Select" option value
                   }).length > 0;

                   if (!hasMoreThanSelect) {
                       if ($("#ddlHAWB option:selected").val() == '' || $("#ddlHAWB option:selected").val() == '0') {
                           GetLocationDetails();
                       }
                   } else{
                    $('#txtLoc').val('');
                    $('#txtPcs').val('');
                    $('#txtInvPcs').val('');
                    $('#txtDamagePkgs').val('');
                    $('#txtDamagePkgsView').val('');
                    $('#txtDamageWt').val('');
                    $('#txtDamageWtView').val('');
                    $('#ddlDamageType').val('0');
                    $('#txtRemark').val('');
                   }

                
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
    $('#txtPcs').val('');
    $('#txtInvPcs').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWt').val('');
    $('#txtDamageWtView').val('');
    $('#ddlDamageType').val('0');
    $('#txtRemark').val('');
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
    var HawnValue = "";
    if ($("#ddlHAWB option:selected").val() == '' || $("#ddlHAWB option:selected").val() == '0') {
        HawnValue = "";
    }
    else {
        HawnValue = $("#ddlHAWB option:selected").text();
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
            url: CMSserviceURL + "Inventory_GetLocationDetails",
            data: JSON.stringify({
                'pi_strSelection': operation,
                'pi_strMAWBNo': $("#txtAWBNo").val(),
                'Pi_strHAWBNo': HawnValue,
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
                        $.alert($(this).find('Message').text());
                        return;
                    }
                    if(outMsg=="I"){
                        $(".ibiSuccessMsg1").text($(this).find('Message').text()).css({ "color": "Green", "font-weight": "bold" });
                       
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
                    window.localStorage.setItem("RefMawbNo",$("#txtAWBNo").val());
                });

                $(xmlDoc).find('Table2').each(function (index) {
                    $('#txtDamagePkgsView').val($(this).find('DamagedNOP').text());
                    $('#txtDamageWtView').val($(this).find('DamagedWt').text());
                    if($(this).find('DamageType').text()==''){
                        ('#ddlDamageType').val('0');
                    }
                    else{
                        $('#ddlDamageType').val($(this).find('DamageType').text());
                    }
                    
                    $('#txtRemark').val($(this).find('DamageRemarks').text());
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

function GetLocationDetailsByGroupId() {
    $(".ibiSuccessMsg1").text('');
    $('#txtPcs').val('');
    $('#txtInvPcs').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWt').val('');
    $('#txtDamageWtView').val('');
    $('#ddlDamageType').val('0');
    $('#txtRemark').val('');
    if ($("#txtScanLocation").val() == "") {
        errmsg = "Please enter location.</br>";
        $.alert(errmsg);
        return;
    }
    // if ($("#txtAWBNo").val() == "") {
    //     errmsg = "Please enter Mawb No.</br>";
    //     $.alert(errmsg);
    //     return;
    // }
    var HawnValue = "";
    // if ($("#ddlHAWB option:selected").val() == '' || $("#ddlHAWB option:selected").val() == '0') {
    //     HawnValue = "";
    // }
    // else {
    //     HawnValue = $("#ddlHAWB option:selected").text();
    // }

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
            url: CMSserviceURL + "Inventory_GetLocationDetails",
            data: JSON.stringify({
                'pi_strSelection': operation,
                'pi_strMAWBNo': $("#txtAWBNo").val(),
                'Pi_strHAWBNo': HawnValue,
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
                        $.alert($(this).find('Message').text());
                        return;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    var HawbNo = $(this).find('Hawb').text();
                    $('#txtAWBNo').val($(this).find('Mawb').text());
                    if (HawbNo != '') {

                        var hid;
                        var HAWBNos;

                        hid = $(this).find('Hawb').text();
                        HAWBNos = HawbNo;

                        var newOption = $('<option></option>');
                        newOption.val(hid).text(HAWBNos);
                        newOption.appendTo('#ddlHAWB');
                    }
                    $('#txtLoc').val($(this).find('Location').text());
                    $('#txtPcs').val($(this).find('locPcs').text());
                    HAWBId = parseInt($(this).find('HawbrowID').text());
                    console.log("_____"+HAWBId);
                    IGMRowId = parseInt($(this).find('IGMrowID').text());
                    var LocID=parseInt($(this).find('LocID').text());
                    var Location=$(this).find('Location').text();
                    window.localStorage.setItem("HawbrowID",HAWBId);
                    window.localStorage.setItem("IGMrowID",IGMRowId);
                    window.localStorage.setItem("InvLocId",LocID);
                    window.localStorage.setItem("InvLocation",Location);
                    window.localStorage.setItem("Groupid",groupId);
                    window.localStorage.setItem("RefMawbNo",$("#txtAWBNo").val());
                });

                $(xmlDoc).find('Table2').each(function (index) {
                    $('#txtDamagePkgsView').val($(this).find('DamagedNOP').text());
                    $('#txtDamageWtView').val($(this).find('DamagedWt').text());
                    if($(this).find('DamageType').text()==''){
                        ('#ddlDamageType').val('0');
                    }
                    else{
                        $('#ddlDamageType').val($(this).find('DamageType').text());
                    }
                    $('#txtRemark').val($(this).find('DamageRemarks').text());
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
    // if ($("#ddlDamageType option:selected").val() == '' || $("#ddlDamageType option:selected").val() == '0'){
    //     errmsg = "Please select Damage Type</br>";
    //     $.alert(errmsg);
    //     return;
    // }

    var groupId = "";
    if (document.getElementById("rdoAWBNo").checked) {
        groupId = "";
    }
    if (document.getElementById("rdoGroupID").checked) {
        groupId = $("#txtGroupID").val();
    }
    console.log("++++++"+HAWBId);
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
                'Pi_intInvPieces':parseInt( $("#txtInvPcs").val()),
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
    if ($("#txtAWBNo").val() == "" && $("#txtInvPcs").val() == "" ) {
        errmsg = "Please enter Master details</br>";
        localStorage.setItem('isMasterPresent', "0");
        $.alert(errmsg);
        return;
    }
    localStorage.setItem('comeFromDamage', type);
    localStorage.setItem('isMasterPresent', "1");
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
        $("#divNormalCargo").show();
        $("#divNormalCargoButton").show();
        $("#divNormalCargoButton1").show();
        $('#divGroupID').hide();
        $('#txtGroupID').val('');
        $('#txtScanLocation').focus();

        $('#divFoundCargo').hide();
        $('#divFoundCgoDetails').hide();
        $('#divFoundCgoDetails1').hide();
        $('#foundCargoHint').hide();
        $('#divFoundbutton').hide();
        $(".ibiSuccessMsg1").text('');

    }
    else if(document.getElementById('rdoGroupID').checked){
        $("#divNormalCargo").show();
        $("#divNormalCargoButton").show();
        $("#divNormalCargoButton1").show();
        $('#divGroupID').show();
        $('#ddlHAWBNo').empty();
        $('#txtAWBNo').val('');
        $('#txtScanLocation').focus();
        $('#divFoundCargo').hide();
        $('#divFoundCgoDetails').hide();
        $('#divFoundCgoDetails1').hide();
        $('#foundCargoHint').hide();
        $('#divFoundbutton').hide();
        $(".ibiSuccessMsg1").text('');
    }
    else{
        $("#divNormalCargo").hide();
        $("#divNormalCargoButton").hide();
        $("#divNormalCargoButton1").hide();
        $('#divGroupID').hide();
        $('#divFoundCargo').show();
        $('#divFoundCgoDetails').show();
        $('#divFoundCgoDetails1').show();
        $('#foundCargoHint').show();
        $('#divFoundbutton').show();
        $(".ibiSuccessMsg1").text('');


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
    $('#ddlHAWB').empty();
    $('#txtLoc').val('');
    $('#txtPcs').val('');
    $('#txtInvPcs').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWt').val('');
    $('#txtDamageWtView').val('');
    $('#ddlDamageType').val('0');
    $('#txtRemark').val('');
}
function clearFoundCargoDetails() {
    $('#txtFoundMAWB').val('');
    $('#txtFoundHAWB').val('');
    $('#txtFoundGroupID').val('');
    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#ddlDamageType').val('0');
    $('#spnErrormsg').text('');
    $(".ibiSuccessMsg2").text('');
    $("#txtRemark").val('');
}

function clearFoundCargoDetailsForGet() {

    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#ddlDamageType').val('0');
    $('#spnErrormsg').text('');
    $(".ibiSuccessMsg2").text('');
    $("#txtRemark").val('');
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

function goBack(){
    updateStatusToPause('IMP_Inventory_Management.html');
}
function goToHome(){
    updateStatusToPause('GalaxyHome.html');
}

function getFoundCargoDetails(operation){
    $(".ibiSuccessMsg2").text('');
    if(operation=="S"){
        if ($("#txtFoundMAWB").val() == "") {
            return;
        }
        // if ($('#txtFoundMAWB').val() != '') {
        //     if ($('#txtFoundMAWB').val().length != '11') {
        //         if ($('#txtFoundMAWB').val().length != '13') {
        //             errmsg = "Please enter valid AWB No.";
        //             $.alert(errmsg);
        //             $('#txtAWBNo').val('');
        //             return;
        //         }
        //     }
        // }
    }
    else{
        if ($("#txtFoundGroupID").val() == "") {
            // errmsg = "Please enter Group ID</br>";
            // $.alert(errmsg);
            return;
        }
    }
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_GetFoundCargoDetails",
            data: JSON.stringify({
                'strModule': 'I',
                'Selection': operation,
                'MawbNo': $('#txtFoundMAWB').val(),
                'SBorHawb': $('#txtFoundHAWB').val(),
                'GroupId': $("#txtFoundGroupID").val(),
                'UserId': UserID
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
                    var outMsg=$(this).find('Message').text();

                    if (status == 'E') {
                        clearFoundCargoDetailsForGet()
                        $(".ibiSuccessMsg2").text(outMsg).css({ "color": "Red", "font-weight": "bold" });
                        
                        return;
                    }
                });
                
                $(xmlDoc).find('Table1').each(function (index) {
                    $('#txtFoundMAWB').val($(this).find('MawbNo').text());
                    $('#txtFoundHAWB').val($(this).find('HawbNo').text());
                    $('#txtFoundGroupID').val($(this).find('GroupID').text());
                    $('#txtFoundPkgs').val($(this).find('FoundNop').text());
                    $('#txtFoundPkgsWt').val($(this).find('FoundWt').text());
                    $('#txtDamagePkgs').val($(this).find('DamageNop').text());
                    $('#txtDamageWt').val($(this).find('DamageWt').text());
                    if($(this).find('DamageType').text()==""){
                        $('#ddlDamageType').val("0");
                    }
                    else{
                        $('#ddlDamageType').val($(this).find('DamageType').text());
                    }
                    $('#txtRemark').val($(this).find('Remarks').text());
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

function saveFoundCargoDetails(){

    if ($("#txtFoundMAWB").val() == "") {
        errmsg = "Please enter Mawb No.</br>";
        $.alert(errmsg);
        return;
    }
   
    if ($("#txtFoundPkgs").val() == "") {
        errmsg = "Please enter Found Pieces</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtFoundPkgsWt").val() == "") {
        errmsg = "Please enter Found Weight</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtDamagePkgs").val() == "") {
        errmsg = "Please enter Damaged Pieces</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtDamageWt").val() == "") {
        errmsg = "Please enter Damaged Weight</br>";
        $.alert(errmsg);
        return;
    }
    // if ($("#ddlDamageTypeFD option:selected").val() == '' || $("#ddlDamageTypeFD option:selected").val() == '0'){
    //     errmsg = "Please select Damage Type</br>";
    //     $.alert(errmsg);
    //     return;
    // }


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if(IGMRowId==null){
        IGMRowId=0;
    }
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_SaveFoundCargoDetails",
            data: JSON.stringify({
                'pi_strMawbNo': $("#txtFoundMAWB").val(),
                'pi_strHawbNo': $("#txtFoundHAWB").val(),
                'pi_intIGMNo': IGMRowId,
                'pi_strGroupID': $("#txtFoundGroupID").val(),
                'pi_intFoundNop': parseInt($("#txtFoundPkgs").val()),
                'pi_dcFoundWt': parseFloat($("#txtFoundPkgsWt").val()),
                'pi_intDamageNop': parseInt($("#txtDamagePkgs").val()),
                'pi_dcDamageWt': parseFloat($("#txtDamageWt").val()),
                'pi_DamageType': '',
                'pi_strRemarks':$("#txtRemark").val(),
                'pi_ReferenceMawbNo':'',
                'pi_strUser':UserID,
                'po_strStatus':'',
                'po_strMessage':'',
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
                        clearFoundCargoDetails();
                        $(".ibiSuccessMsg2").text(msg).css({ "color": "Green", "font-weight": "bold" });
                    }
                    else {
                        clearFoundCargoDetails();
                        $(".ibiSuccessMsg2").text(msg).css({ "color": "Red", "font-weight": "bold" });
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

