
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var Terminal = window.localStorage.getItem("Terminal");
var Area = window.localStorage.getItem("Area");
var LocType= window.localStorage.getItem("LocationType");
var AWBId;
var EWRNo;

var availableLoc = [];
$(function () {
    // if(LocType=="E"){
    //     $('#divHAWB').hide();
    // }
    // else{
    //     $('#divHAWB').show();
    // }

    getLocationCode(Terminal, Area);
    getDamageTypes();
    var savedValue1 = localStorage.getItem('ExpAWBNo');
    if (savedValue1) {
        $('#txtAWBNo').val(savedValue1);
        $('#txtScanLocation').val(localStorage.getItem('ExpLocCode'));
        GetEWRNo();
        // localStorage.getItem('ImpLocCode');
        // localStorage.getItem('ImpAWBNo');
        // localStorage.getItem('ImpGroupId');
        // localStorage.getItem('ImpHawbNo');     
        // $('#ddlShed').val(savedValue1).trigger('change');
    }
    $("#txtScanLocation").autocomplete({
        source: function (request, response) {
            var filteredLoc = availableLoc.filter(function (loc) {
                return loc.toLowerCase().startsWith(request.term.toLowerCase());
            });
            var topLoc = filteredLoc.slice(0, 8);
            response(topLoc);
        }
    });

    $("#txtScanLocationFD").autocomplete({
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

function getLocationCode(Terminal, Area) {
    $(".ibiSuccessMsg1").text('');
    $('#spnErrormsg').text('');
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

function GetLocationDetails() {
    $(".ibiSuccessMsg1").text('');
    $('#spnErrormsg').text('');
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
                        $.alert($(this).find('Message').text());
                        return;
                    }
                    if(outMsg=="I"){
                        $(".ibiSuccessMsg1").html($(this).find('Message').text().replace(/\n/g, '<br/>')).css({ "color": "Green", "font-weight": "bold" });                  
                    }
                    $("#btnSaveLoc").prop("disabled",false);
                    $("#btnEditLoc").prop("disabled",false);
                });
                var lastLoc="0";
                $(xmlDoc).find('Table1').each(function (index) {
                    lastLoc=$(this).find('Location').text();
                    var newOption = $('<option></option>');
                    newOption.val($(this).find('Location').text()).text($(this).find('Location').text());
                    newOption.appendTo('#txtLoc');
                    $('#txtPcs').val($(this).find('locPcs').text());
                    AWBId = parseInt($(this).find('AwbrowID').text());
                    EWRNo = $(this).find('EWRNo').text();
                    var LocID=parseInt($(this).find('LocID').text());
                    var Location=$(this).find('Location').text();
                    window.localStorage.setItem("AwbrowID",AWBId);
                    window.localStorage.setItem("AwbRefNo",$("#txtAWBNo").val());
                    window.localStorage.setItem("EWRNo",EWRNo);
                    window.localStorage.setItem("InvLocId",LocID);
                    window.localStorage.setItem("InvLocation",Location);
                    window.localStorage.setItem("Groupid",groupId);
                });
                $('#txtLoc').val(lastLoc);
                $(xmlDoc).find('Table2').each(function (index) {
                    $('#txtDamagePkgsView').val($(this).find('DamagedNOP').text());
                    $('#txtDamageWtView').val($(this).find('DamagedWt').text());
                    if($(this).find('DamageType').text()=='' || $(this).find('DamageType').text()==null){
                        ('#ddlDamageType').val('0');
                    }
                    else{
                        $('#ddlDamageType').val($(this).find('DamageType').text());
                    }
                    
                    $('#txtRemark').val($(this).find('DamageRemarks').text());
                    var dNop=parseFloat($(this).find('WHDamagedNOP').text());
                    var dWT=parseFloat($(this).find('WHDamagedWt').text());
                    if(dNop==null){
                        dNop="";
                    }
                    if(dWT==null){
                        dWT="";
                    }
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

function SaveLocationDetails(isEdit) {
    $(".ibiSuccessMsg1").text('');
    $('#spnErrormsg').text('');
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
            url: CMSserviceURL + "Inventory_EXP_SaveLocationDetails",
            data: JSON.stringify({
                'pi_intAwbId': AWBId,
                'pi_strShed':Terminal,
                'pi_strArea':Area,
                'pi_EWRNo': $('#ddlEWRNo').val(),
                'pi_strFromLocation': $("#txtLoc").val(),
                'pi_strToLocation': $("#txtScanLocation").val(),
                'pi_strGroupID': groupId,
                'Pi_intInvPieces':parseInt( $("#txtInvPcs").val()),
                'pi_strUser': UserID,
                'po_strStatus': '',
                'po_strMessage': '',
                'pi_IsEdit': isEdit=='1'?"1":"0"
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
    $(".ibiSuccessMsg1").text('');
    if ($("#txtAWBNo").val() == "" && $("#txtInvPcs").val() == "" ) {
        errmsg = "Please enter Master details</br>";
        localStorage.setItem('isMasterPresent', "0");
        $.alert(errmsg);
        return;
    }
    localStorage.setItem('comeFromDamage', type);
    localStorage.setItem('ExpLocCode', $("#txtScanLocation").val());
    localStorage.setItem('ExpAWBNo', $("#txtAWBNo").val());
    // localStorage.setItem('ImpGroupId', type);
    // localStorage.setItem('ImpHawbNo', type);
    window.location.href = 'EXP_Inventory_Found_Damage.html'
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
        $('#spnErrormsg').text('');

    }
    else if(document.getElementById('rdoGroupID').checked){
        $("#divNormalCargo").show();
        $("#divNormalCargoButton").show();
        $("#divNormalCargoButton1").show();
        $('#divGroupID').show();
        //$('#divHAWB').hide();
        //$('#divMAWB').hide();
        $('#ddlEWRNo').empty();
        $('#txtAWBNo').val('');
        $('#txtScanLocation').focus();
        $('#divFoundCargo').hide();
        $('#divFoundCgoDetails').hide();
        $('#divFoundCgoDetails1').hide();
        $('#foundCargoHint').hide();
        $('#divFoundbutton').hide();
        $(".ibiSuccessMsg1").text('');
        $('#spnErrormsg').text('');
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
        $('#spnErrormsg').text('');


    }
}

function checkInvPcs() {
    var awbPCS = parseInt($('#txtPcs').val());
    var InvPcs = parseInt($('#txtInvPcs').val());
    $(".ibiSuccessMsg1").text('');
    if($('#txtPcs').val()==""){
        return;
    }
    if (InvPcs > awbPCS) {
        $('.ibiSuccessMsg1').text('Inventory Pieces should not greater than AWB Pieces.').css('color', 'red');
        $('#txtInvPcs').val('');
    }
}

function checkDamagePcs() {
    $('#spnErrormsg').text('');
    var foundPcs = parseInt($('#txtFoundPkgs').val());
    var damagePcs = parseInt($('#txtDamagePkgs').val());
    if (damagePcs > foundPcs) {
        $('#spnErrormsg').text('Damage Pieces should not greater than Found Pieces.').css('color', 'red');
        $('#txtDamagePkgs').val('');
    }
}

function checkDamageWt() {
    $('#spnErrormsg').text('');
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
    $(".ibiSuccessMsg1").text('');
    $('#txtScanLocation').val('');
    $('#txtGroupID').val('');
    $('#txtAWBNo').val('');
    $('#ddlEWRNo').empty();
    $('#txtLoc').empty();
    $('#txtPcs').val('');
    $('#txtInvPcs').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWt').val('');
    $('#txtDamageWtView').val('');
    $('#ddlDamageType').val('0');
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
                                   
                   }
                //    else{
                //     $(".ibiSuccessMsg1").text(msg).css({ "color": "Red", "font-weight": "bold" });
                //    }
                localStorage.removeItem("ExpLocCode");
                localStorage.removeItem("ExpAWBNo"); 
                 
                setTimeout(function () {
                    window.location.href = path;
                }, 2000); 

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
    $('#spnErrormsg').text('');
    $('#ddlEWRNo').empty();
    $('#txtLoc').empty();
    $('#txtPcs').val('');
    $('#txtInvPcs').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWt').val('');
    $('#txtDamageWtView').val('');
    $('#ddlDamageType').val('0');
    $('#txtRemark').val('');
}

function goBack(){
    updateStatusToPause('EXP_Inventory_Management.html');
}
function goToHome(){
    localStorage.removeItem("expShedDDL");
    localStorage.removeItem("expAreaDDL");
    localStorage.removeItem("ExpLocCode");
    localStorage.removeItem("ExpAWBNo"); 
    updateStatusToPause('GalaxyHome.html');
}


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
                'pi_strfilter': "export", 
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
function clearFoundCargoDetails() {
    $('#txtFoundMAWB').val('');
    $('#txtFoundHAWB').val('');
    $('#txtFoundGroupID').val('');
    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#ddlDamageTypeFD').val('0');
    $('#spnErrormsg').text('');
    $(".ibiSuccessMsg2").text('');
    $("#txtRemarkFD").val('');
    $("#txtScanLocationFD").val('');
    $("#txtFoundPkgs").prop('disabled', false);
    $("#txtFoundPkgsWt").prop('disabled', false);
    $('#txtDamagePkgsViewFD').val("");
    $('#txtDamageWtViewFD').val("");
}

function clearFoundCargoDetailsForGet() {

    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#ddlDamageTypeFD').val('0');
    $('#spnErrormsg').text('');
    $(".ibiSuccessMsg1").text('');
    $('#spnErrormsg').text('');
    $("#txtRemarkFD").val('');
    $("#txtFoundPkgs").prop('disabled', false);
    $("#txtFoundPkgsWt").prop('disabled', false);
    $('#txtDamagePkgsViewFD').val("");
    $('#txtDamageWtViewFD').val("");
}

function getFoundCargoDetails(operation){
    $(".ibiSuccessMsg2").text('');
    clearFoundCargoDetailsForGet()
    if(operation=="S"){
        if ($("#txtFoundMAWB").val() == "") {
            return;
        }  
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
                'strModule': 'E',
                'Selection': operation,
                'MawbNo': $('#txtFoundMAWB').val(),
                'SBorHawb': "",
                'GroupId': "",
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
                    $('#txtScanLocationFD').val($(this).find('Location').text());
                    $('#txtFoundMAWB').val($(this).find('MawbNo').text());
                    $('#txtFoundHAWB').val($(this).find('HawbNo').text());
                    $('#txtFoundGroupID').val($(this).find('GroupID').text());
                    $('#txtFoundPkgs').val($(this).find('FoundNop').text());
                    $('#txtFoundPkgsWt').val($(this).find('FoundWt').text());
                    $('#txtDamagePkgsViewFD').val($(this).find('DamageNop').text());
                    $('#txtDamageWtViewFD').val($(this).find('DamageWt').text());
                    $("#txtFoundPkgs").prop('disabled', true);
                    $("#txtFoundPkgsWt").prop('disabled', true);
                    if($(this).find('DamageType').text()=="" || $(this).find('DamageType').text()==null){
                        $('#ddlDamageTypeFD').val("0");
                    }
                    else{
                        $('#ddlDamageTypeFD').val($(this).find('DamageType').text());
                    }
                    $('#txtRemarkFD').val($(this).find('Remarks').text());
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

    // if ($("#txtGroupID").val() == "") {
    //     errmsg = "Please enter SB No.</br>";
    //     $.alert(errmsg);
    //     return;
    // }

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
    // if ($("#txtDamagePkgs").val() == "") {
    //     errmsg = "Please enter Damaged Pieces</br>";
    //     $.alert(errmsg);
    //     return;
    // }
    // if ($("#txtDamageWt").val() == "") {
    //     errmsg = "Please enter Damaged Weight</br>";
    //     $.alert(errmsg);
    //     return;
    // }
    // if ($("#ddlDamageTypeFD option:selected").val() == '' || $("#ddlDamageTypeFD option:selected").val() == '0'){
    //     errmsg = "Please select Damage Type</br>";
    //     $.alert(errmsg);
    //     return;
    // }
    
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_EXP_SaveFoundCargoDetails",
            data: JSON.stringify({
                'pi_strAwbNo': $("#txtFoundMAWB").val(),
                'pi_strSBNo':"",
                'pi_intFoundNop': parseInt($("#txtFoundPkgs").val()),
                'pi_dcFoundWt': parseFloat($("#txtFoundPkgsWt").val()),
                'pi_intDamageNop':$("#txtDamagePkgs").val()==""?0: parseInt($("#txtDamagePkgs").val()),
                'pi_dcDamageWt':$("#txtDamageWt").val()==""?0.0: parseFloat($("#txtDamageWt").val()),
                'pi_DamageType': $("#ddlDamageTypeFD").val(),
                'pi_strRemarks':$("#txtRemarkFD").val(),
                'pi_strUser':UserID,
                'pi_strGroupID':""+","+$("#txtScanLocationFD").val(),
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
