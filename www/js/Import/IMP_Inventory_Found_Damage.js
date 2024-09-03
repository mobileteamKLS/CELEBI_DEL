
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var flagOfDamage = localStorage.getItem('comeFromDamage');
var HAWBId=localStorage.getItem('HawbrowID');
var IGMRowId=localStorage.getItem('IGMrowID');
var DamNOP=localStorage.getItem('DamagedNOP');
var DamWt=localStorage.getItem('DamagedWt');
var LocId=localStorage.getItem('InvLocId');
var Location=localStorage.getItem('InvLocation');
var Groupid=localStorage.getItem('Groupid');

$(function () {
    
    $('#txtDamagePkgsView').val(DamNOP);
    $('#txtDamageWtView').val(DamWt);
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

    if (flagOfDamage == 'D') {
        $("#rdoDamageCargo").prop("checked", true);
        EnableFoundCargo();
    }
    else{
        $("#rdoFoundCargo").prop("checked", true);
        EnableFoundCargo();
    }
});

function oneNumberCheck() {
    val = parseInt($('#txtRecievedPkgs').val());
    if (val > 1) {
        $('#spnErrormsg').text('More then 1 pieces not allow.').css('color', 'red');
        $('#txtRecievedPkgs').val('1')
    } else {
        $('#spnErrormsg').text('');
    }

}

function goToDamage() {
    localStorage.removeItem('comeFromDamage');
    window.location.href = 'IMP_Inventory_Management_Save.html'
}

function EnableFoundCargo() {

    clearALL();
    if (document.getElementById('rdoFoundCargo').checked) {
        $('#divNormalCargo').hide();
        $('#divNormalCargoHawb').hide();
        $('#divFoundCargo').show();
        $('#foundCargoHint').show();
        $('#divArrivedPkgs').hide();
        $('#divFoundCgoDetails').show();
        $('#btnSubmit').removeAttr('disabled');
        $('#txtDamagePkgs').removeAttr('disabled');
        $('#txtDamagePkgsView').removeAttr('disabled');
        $('#txtDamageWt').removeAttr('disabled');
        $('#txtDamageWtView').removeAttr('disabled');
        $('#ddlDamageType').removeAttr('disabled');
        $('#txtDamagePkgsView').attr('disabled', 'disabled');
        $('#txtDamageWtView').attr('disabled', 'disabled');
        //$('#ddlDamageType').val(0);
        isFoundCargo = true;
        foundCargoCheckChange();
        //  $('#ddlDamageType').empty();
        $('#txtFoundMAWB').val('');
        $('#txtFoundMAWB').focus();
        $('#txtFoundMPSNo').val('');
        $('#chkMPSNo').attr('disabled', 'disabled');
        // $(xmlDamageType).find('Table5').each(function () {

            var AWBId;
            var AWBNo;
            DamageCode = $(this).find('DamageCode').text();
            DamageType = $(this).find('DamageType').text();

            var newOption = $('<option></option>');
            newOption.val(DamageCode).text(DamageType);
            newOption.appendTo('#ddlDamageType');

        // });

    }
    else {
        $('#divNormalCargo').show();
        $('#divFoundCargo').hide();
        $('#divNormalCargoHawb').show();
        $('#foundCargoHint').hide();
        $('#divArrivedPkgs').show();
        $('#divFoundCgoDetails').hide();
        //$('#ddlDamageType').val(0);
        isFoundCargo = '';
        $('#btnSubmit').removeAttr('disabled');
        $('#txtDamagePkgs').removeAttr('disabled', 'disabled');
        $('#txtDamagePkgsView').attr('disabled', 'disabled');
        $('#txtDamageWt').removeAttr('disabled', 'disabled');
        $('#txtDamageWtView').attr('disabled', 'disabled');
        $('#ddlDamageType').removeAttr('disabled', 'disabled');
        $('#chkMPSNo').removeAttr('disabled');
        $('#txtScanAWBNo').focus();
        $(xmlDamageType).find('Table5').each(function () {

            var AWBId;
            var AWBNo;
            DamageCode = $(this).find('DamageCode').text();
            DamageType = $(this).find('DamageType').text();

            var newOption = $('<option></option>');
            newOption.val(DamageCode).text(DamageType);
            newOption.appendTo('#ddlDamageType');

        });
    }
}

function foundCargoCheckChange() {
    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";


    ////inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    // inputxml = '<Root><IsMPSNo>' + IsMPSNo + '</IsMPSNo><IsAuto>' + IsAuto + '</IsAuto><FltSeqNo>' + flightSeqNo + '</FltSeqNo><BarCode>' + $("#txtFoundMAWB").val() + '</BarCode><AirportCity>' + AirportCity + '</AirportCity></Root>';
    inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AWBId></AWBId><HAWBId></HAWBId><AirportCity>' + AirportCity + '</AirportCity><ShowAll>N</ShowAll></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImportULDDetailsV3",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                $("body").mLoading('hide');
                $('#ddlDamageType').empty();
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                xmlDamageType = xmlDoc;
                $('#spnErrormsg').text('');
                $(xmlDoc).find('Table5').each(function (index) {
                    DamageCode = $(this).find('DamageCode').text();
                    DamageType = $(this).find('DamageType').text();

                    var newOption = $('<option></option>');

                    //if (index == 0) {
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlDamageType');
                    //}

                    newOption.val(DamageCode).text(DamageType);
                    newOption.appendTo('#ddlDamageType');
                    //if (DAMAGE_CONTAINER != "") {
                    //    $("#ddlDamageType").val(DAMAGE_CONTAINER);
                    //}

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
        return false;
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

function foundCargo() {
    if ($('#txtScanGroupIdFoundCargo').val().length == 14) {
        $('#txtFoundPkgs').focus();
    }
}

function clearALL() {
    $('#txtFoundMAWB').val('');
    $('#txtFoundHAWB').val('');
    $('#txtGroupID').val('');
    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#ddlDamageType').empty();
    $('#spnErrormsg').text('');

}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}

function saveDamageCargoDetails(){
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_SaveDamageCargoDetails",
            data: JSON.stringify({
                'pi_intHawbId': HAWBId,
                'pi_intIGMRowid': IGMRowId,
                'pi_intLocID': $("#txtLoc").val(),
                'pi_strLocation': $("#txtScanLocation").val(),
                'pi_strGroupID': groupId,
                'pi_intDamageNop': $("#txtDamagePkgs").val(),
                'pi_dcDamageWt':$("#txtDamageWt").val(),
                'pi_DamageType': '',
                'pi_strDamageRemarks':$("#txtRemark").val(),
                'pi_strUser': '',
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

function saveFoundCargoDetails(){
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Inventory_SaveFoundCargoDetails",
            data: JSON.stringify({
                'pi_strMawbNo': $("#txtFoundMAWB").val(),
                'pi_strHawbNo': $("#txtFoundHAWB").val(),
                'pi_intIGMNo': $("#txtLoc").val(),
                'pi_strGroupID': $("#txtGroupID").val(),
                'pi_intFoundNop': parseInt($("#txtFoundPkgs").val()),
                'pi_dcFoundWt': parseFloat($("#txtFoundPkgsWt").val()),
                'pi_intDamageNop': parseInt($("#txtDamagePkgs").val()),
                'pi_dcDamageWt': parseFloat($("#txtDamageWt").val()),
                'pi_DamageType': '',
                'pi_strRemarks':$("#txtRemark").val(),
                'pi_strUser':'',
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
