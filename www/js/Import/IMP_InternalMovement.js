var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var SelectedHawbId;
var IGMno;
var strXmlStore;
var locPieces;
var html;
var FromLoc;
var Hawbid;
var flagMovement;
var serviceName;
var locid;
var OldLocationId;
var IsFlightFinalized;
var GHAflightSeqNo;
var _groupID = '';
var isSearch = false;
$(function () {

    if (window.localStorage.getItem("RoleIMPIntlMvmt") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    flagMovement = '';
    serviceName = '';

    $("#rdoIntlMovement").click(function () {
        rdoIntlMovementChecked();
    });

    $("#rdoForwarding").click(function () {
        rdoForwardingChecked();
    });
    // ImportDataList();
});


function ImportDataList() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "ImportDataList",
            data: JSON.stringify({ 'pi_strQueryType': 'I', 'pi_strUserName': UserName, 'pi_strSession': '' }),
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

                var str = response;
                //autoLocationArray = new Array();

                //// This will return an array with strings "1", "2", etc.
                //autoLocationArray = str.split(",");
                //console.log(autoLocationArray)
                var suggestionList = str.split(",");
                for (var i = 0; i < 200; i++) {
                    suggestionList.push({
                        label: 'item' + i,
                        value: i
                    });
                }
                // console.log(suggestionList);

                var info = suggestionList.slice(Math.max(suggestionList.length - 1000, 0));

                $("#txtNewLoc").autocomplete({
                    source: info,
                    minLength: 1,
                    delay: 700,
                    select: function (event, ui) {
                        log(ui.item ?
                            "Selected: " + ui.item.label :
                            "Nothing selected, input was " + this.value);
                    },
                    open: function () {
                        $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                    },
                    close: function () {
                        $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
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


function log(message) {
    $("<div>").text(message).prependTo("#log");
    $("#log").scrollTop(0);
}


function rdoIntlMovementChecked() {
    clearALL();
    $('#divForwarding').hide();
    $('#divInternalMvmt').show();
    $('#divDest').show();
    flagMovement = 'I';
}


function onchangeRDB() {
    if ($('#chkABNo').prop('checked')) {
        $("#ddlHAWB").removeAttr('disabled');
        $("#ddlIGM").removeAttr('disabled');
        $("#btnGetIGMDetail").removeAttr('disabled');

        $('#lblAWBNo').show();
        $('#lblGroupID').hide();
        $('#txtAWBNo').val('');
        $('#txtAWBNo').focus();
        clearBeforePopulate();
    }

    if ($('#chkGroupID').prop('checked')) {
        $("#ddlHAWB").attr('disabled', 'disabled');
        $("#ddlIGM").attr('disabled', 'disabled');
        $("#btnGetIGMDetail").attr('disabled', 'disabled');

        $('#txtAWBNo').val('');
        $('#txtAWBNo').focus();
        $('#lblAWBNo').hide();
        $('#lblGroupID').show();
        clearBeforePopulate();
    }
}

function rdoForwardingChecked() {
    clearALL();
    $('#divInternalMvmt').hide();
    $('#divDest').hide();
    $('#divForwarding').show();
    flagMovement = 'F';
}


function onblureGroupIDORAWBNo() {
    $('#txtMovePkgs').val('').removeAttr('disabled');
    // $('#txtAWBNo').val('');
    if ($('#txtGroupID').val() != '') {
        isSearch = false;
        GetHAWBDetailsForMAWBWithGroupID();
        $("#btnGetIGMDetail").attr('disabled', 'disabled');
        $("#btnGetDetail").attr('disabled', 'disabled');

    } else {
        $("#btnGetIGMDetail").removeAttr('disabled');
        $("#btnGetDetail").removeAttr('disabled');
    }

    //if ($('#txtAWBNo').val() != '') {
    //    GetHAWBDetailsForMAWB();
    //    return;
    //}

}

function GetHAWBDetailsForMAWBWithGroupID() {

    GHAMawbid = '';
    Hawbid = '';
    GHAhawbid = '';
    GHAflightSeqNo = '';
    html = '';

    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtTotalPkg').val('');
    $('#txtCommodity').val('');
    $('#divAddTestLocation').empty();

    var list = new Array();
    var uniqueIgms = [];

    $('#ddlHAWB').empty();
    //var newOption = $('<option></option>');
    //newOption.val(0).text('Select');
    //newOption.appendTo('#ddlHAWB');

    $('#ddlIGM').empty();
    //var newOption = $('<option></option>');
    //newOption.val(0).text('Select');
    //newOption.appendTo('#ddlIGM');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var GroupID = $('#txtGroupID').val();

    //if (MAWBNo == '') {
    //    return;
    //}
    //if ($('#txtAWBNo').val() != '') {
    //    if (MAWBNo.length != '11') {
    //        if (MAWBNo.length != '13') {
    //            errmsg = "Please enter valid AWB No.";
    //            $.alert(errmsg);
    //            $('#txtAWBNo').val('');
    //            return;
    //        }
    //    }
    //}

    //if ($('#txtAWBNo').val() != '') {
    //    event = 'A';
    //    MAWBNo = $('#txtAWBNo').val();
    //} else {
    //    event = 'G';
    //    MAWBNo = $('#txtGroupID').val();
    //}
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetHAWBNumbersForMAWBNumber_PDA",
            data: JSON.stringify({
                'pi_strMAWBNo': GroupID, 'pi_strHAWBNo': '',
                'pi_strAirport': AirportCity, 'pi_strEvent': 'G'
            }),
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
                GetIGMDetailsAutoCall();
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


function GetIGMDetailsAutoCall() {

    GHAMawbid = '';
    Hawbid = '';
    GHAhawbid = '';
    GHAflightSeqNo = '';
    html = '';

    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtTotalPkg').val('');
    $('#txtCommodity').val('');
    $('#divAddTestLocation').empty();

    var list = new Array();
    var uniqueIgms = [];

    $('#ddlIGM').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    var HAWBNo = $("#ddlHAWB option:selected").text();

    if (MAWBNo == '') {
        return;
    }

    if (MAWBNo.length != '11') {
        if (MAWBNo.length != '13') {
            errmsg = "Please enter valid AWB No.";
            $.alert(errmsg);
            $('#txtAWBNo').val('');
            return;
        }
    }

    if (HAWBNo == 'Select') {
        HAWBNo = '';
    }

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
                GetInternalMovementDetailsForGroupID();
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


function GetHAWBDetailsForMAWB() {
    isSearch = true;
    $('#txtMovePkgs').val('').removeAttr('disabled');
    $("#btnGetIGMDetail").removeAttr('disabled');
    $("#btnGetDetail").removeAttr('disabled');
    GHAMawbid = '';
    Hawbid = '';
    GHAhawbid = '';
    GHAflightSeqNo = '';
    html = '';

    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtTotalPkg').val('');
    $('#txtCommodity').val('');
    $('#txtGroupID').val('');
    $('#divAddTestLocation').empty();

    var list = new Array();
    var uniqueIgms = [];

    $('#ddlHAWB').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlHAWB');

    $('#ddlIGM').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlIGM');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

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

    if ($('#txtAWBNo').val() != '') {
        event = 'A';
        MAWBNo = $('#txtAWBNo').val();
    } else {
        event = 'G';
        MAWBNo = $('#txtGroupID').val();
    }
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetHAWBNumbersForMAWBNumber_PDA",
            data: JSON.stringify({
                'pi_strMAWBNo': MAWBNo, 'pi_strHAWBNo': '',
                'pi_strAirport': AirportCity, 'pi_strEvent': event
            }),
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

function GetIGMDetails() {

    GHAMawbid = '';
    Hawbid = '';
    GHAhawbid = '';
    GHAflightSeqNo = '';
    html = '';

    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtTotalPkg').val('');
    $('#txtCommodity').val('');
    $('#divAddTestLocation').empty();

    var list = new Array();
    var uniqueIgms = [];

    $('#ddlIGM').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    var HAWBNo = $("#ddlHAWB option:selected").text();

    if (MAWBNo == '') {
        return;
    }

    if (MAWBNo.length != '11') {
        if (MAWBNo.length != '13') {
            errmsg = "Please enter valid AWB No.";
            $.alert(errmsg);
            $('#txtAWBNo').val('');
            return;
        }
    }

    if (HAWBNo == 'Select') {
        HAWBNo = '';
    }

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

function GetMovementDetails() {
    if (document.getElementById('rdoIntlMovement').checked) {
        serviceName = 'GetImportsInterbalMoventLocationDetails_PDA';
        GetInternalMovementDetails();
    }
    if (document.getElementById('rdoForwarding').checked) {
        serviceName = 'GetImportsInterbalMoventForBCLocationDetails_PDA';
        GetForwardingBCMovementDetails();
    }
}


function GetInternalMovementDetailsForGroupID() {

    //clearBeforePopulate();
    IsFlightFinalized = '';
    $("#btnSubmit").removeAttr("disabled");

    html = '';
    $('#divAddTestLocation').empty();

    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();
    var HAWBNo = $("#ddlHAWB option:selected").text();
    var IgmId = $("#ddlIGM option:selected").val();
    var IgmNo = $("#ddlIGM option:selected").text();
    SelectedHawbId = $("#ddlHAWB option:selected").val();

    if (AWBNo == '') {
        errmsg = "Please enter AWB No.";
        $.alert(errmsg);
        return;
    }

    if (HAWBNo == 'Select') {
        HAWBNo = '';
    }

    if (IgmNo == 'Select' || IgmNo == '') {
        errmsg = "Please select IGM</br>";
        $.alert(errmsg);
        return;
    }

    if (IgmId.match("^G")) {
        IsFlightFinalized = 'false';
        GetMovementDetailsFromGHA();
        return;
    }

    if (IgmId.match("^C")) {
        IsFlightFinalized = 'true';
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + 'GetImportsInterbalMoventLocationDetails_PDA',
            data: JSON.stringify({ 'pi_strMAWBNo': $('#txtGroupID').val(), 'pi_strHAWBNo': '', 'pi_strIGMNo': '0' }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                strXmlStore = str;

                if (str != null && str != "") {

                    $('#divAddTestLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Location</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pkgs.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Group Id</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        var outMsg = $(this).find('OutMsg').text();

                        if (outMsg != '') {
                            $.alert(outMsg);
                            return;
                        }

                        var location;

                        location = $(this).find('LocCode').text().toUpperCase();
                        locPieces = $(this).find('LocPieces').text();
                        $('#txtOrigin').val($(this).find('Origin').text());
                        $('#txtDestination').val($(this).find('Dest').text());

                        _groupID = $(this).find('GroupID').text()
                        GroupID = $(this).find('GroupID').text()

                        Hawbid = $(this).find('HAWBId').text();
                        AddTableLocation(location, locPieces, GroupID);
                    });

                    html += "</tbody></table>";

                    if (locPieces != '0')
                        $('#divAddTestLocation').append(html);
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

function GetInternalMovementDetails() {

    //clearBeforePopulate();
    IsFlightFinalized = '';
    $("#btnSubmit").removeAttr("disabled");

    html = '';
    $('#divAddTestLocation').empty();

    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();
    var HAWBNo = $("#ddlHAWB option:selected").text();
    var IgmId = $("#ddlIGM option:selected").val();
    var IgmNo = $("#ddlIGM option:selected").text();
    SelectedHawbId = $("#ddlHAWB option:selected").val();

    if (AWBNo == '') {
        errmsg = "Please enter AWB No.";
        $.alert(errmsg);
        return;
    }

    if (HAWBNo == 'Select') {
        HAWBNo = '';
    }

    if (IgmNo == 'Select' || IgmNo == '') {
        errmsg = "Please select IGM</br>";
        $.alert(errmsg);
        return;
    }

    if (IgmId.match("^G")) {
        IsFlightFinalized = 'false';
        GetMovementDetailsFromGHA();
        return;
    }

    if (IgmId.match("^C")) {
        IsFlightFinalized = 'true';
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + serviceName,
            data: JSON.stringify({ 'pi_strMAWBNo': AWBNo, 'pi_strHAWBNo': HAWBNo, 'pi_strIGMNo': IgmNo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                strXmlStore = str;

                if (str != null && str != "") {

                    $('#divAddTestLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Location</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pkgs.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Group Id</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        var outMsg = $(this).find('OutMsg').text();

                        if (outMsg != '') {
                            $.alert(outMsg);
                            return;
                        }

                        var location;

                        location = $(this).find('LocCode').text().toUpperCase();
                        locPieces = $(this).find('LocPieces').text();
                        GroupID = $(this).find('GroupID').text();
                        $('#txtOrigin').val($(this).find('Origin').text());
                        $('#txtDestination').val($(this).find('Dest').text());
                        Hawbid = $(this).find('HAWBId').text();
                        AddTableLocation(location, locPieces, GroupID);
                    });

                    html += "</tbody></table>";

                    if (locPieces != '0')
                        $('#divAddTestLocation').append(html);


                    $(xmlDoc).find('Table1').each(function (index) {
                        Remark = $(this).find('Remark').text();
                        Date = $(this).find('Date').text();
                        IsHighPriority = $(this).find('IsHighPriority').text();
                        $('#txtRemark').val(Remark);
                    });
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

function GetMovementDetailsFromGHA() {

   // $('#txtGroupID').val('').removeAttr('disabled');
    $("#btnSubmit").removeAttr("disabled");

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();
    var HAWBNo = $("#ddlHAWB option:selected").text();
    var IgmNo = $("#ddlIGM option:selected").text();

    var IgmVal = $("#ddlIGM option:selected").val();

    if (HAWBNo == 'Select') {
        HAWBNo = '';
    }

    SelectedHawbId = $("#ddlHAWB option:selected").val();

    //var inputXML = '<Root><MAWBID>' + GHAMawbid + '</MAWBID><HAWBID>' + SelectedHawbId + '</HAWBID><IGMNo>' + IgmNo + '</IGMNo><FlightSeqNo>' + GHAflightSeqNo + '</FlightSeqNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + HAWBNo + '</HouseNo><IGMNo>' + IgmVal + '</IGMNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetBinningLocPkgDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                strXmlStore = str;

                if (str != null && str != "") {

                    $('#divAddTestLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Location</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Binned Pkgs.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Group Id</th>";

                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

                        var outMsg = $(this).find('OutMsg').text();

                        if (outMsg != '') {
                            $.alert(outMsg);
                            return;
                        }

                        var location;

                        location = $(this).find('LocCode').text().toUpperCase();
                        locPieces = $(this).find('LocPieces').text();
                        GroupId = $(this).find('GroupId').text();

                        $('#txtOrigin').val($(this).find('Origin').text());
                        $('#txtDestination').val($(this).find('Destination').text());

                        AddTableLocationGHA(location, locPieces, GroupId);

                        if (index == 0) {
                            //$('#txtTotalPkg').val($(this).find('LocationStatus').text());
                            //$('#txtCommodity').val($(this).find('Commodity').text());
                            Hawbid = $(this).find('HAWBId').text();
                        }

                        var remainingPieces = $(this).find('RemainingPieces').text().substr(0, $(this).find('RemainingPieces').text().indexOf('/'));

                        //if (remainingPieces == 0)
                        //    $("#btnSubmit").attr("disabled", "disabled");
                    });

                    html += "</tbody></table>";

                    if (locPieces != '0')
                        $('#divAddTestLocation').append(html);
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

function GetForwardingBCMovementDetails() {

    //clearBeforePopulate();
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var BCNo = $('#txtBCNo').val();

    if (BCNo == '') {
        errmsg = "Please enter BC No.";
        $.alert(errmsg);
        return;
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + serviceName,
            data: JSON.stringify({ 'pi_strBCNo': BCNo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                strXmlStore = str;

                if (str != null && str != "") {

                    $('#divAddTestLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Location</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pkgs.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Group Id</th>";

                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        var outMsg = $(this).find('OutMsg').text();

                        if (outMsg != '') {
                            $.alert(outMsg);
                            return;
                        }

                        var location;

                        location = $(this).find('LocCode').text().toUpperCase();
                        locPieces = $(this).find('LocPieces').text();
                        Hawbid = $(this).find('HAWBId').text();
                        GroupID = $(this).find('GroupID').text();

                        locid = $(this).find('LocId').text();
                        $('#txtOrigin').val($(this).find('Origin').text());
                        $('#txtDestination').val($(this).find('Destination').text());
                        AddTableLocation(location, locPieces, GroupID);
                    });

                    html += "</tbody></table>";

                    if (locPieces != '0')
                        $('#divAddTestLocation').append(html);
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

function SaveMovementDetails() {
    if (document.getElementById('rdoIntlMovement').checked) {
        if (IsFlightFinalized == 'false')
            SaveInternalForwardDetailsForGHA();
        else {
            serviceName = 'SaveImpInternalMovementDetails_PDA';
            SaveInternalForwardDetails();
        }
    }
    if (document.getElementById('rdoForwarding').checked) {
        serviceName = 'SaveImpForwardBCMovementDetails_PDA';
        SaveBCForwardDetails();
    }
}

function SaveInternalForwardDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FromLoc = $('#txtFromLoc').val().toUpperCase();
    var TotalPIECESno = $('#txtTotPkgs').val();
    var MovePIECESno = $('#txtMovePkgs').val();
    var NewLoc = $('#txtNewLoc').val().toUpperCase();


    if (FromLoc == "" || TotalPIECESno == "") {

        errmsg = "From location and pckgs not selected.</br>";
        $.alert(errmsg);
        return;

    }

    if (MovePIECESno == "" || NewLoc == "") {

        errmsg = "Please enter new location.</br>";
        $.alert(errmsg);
        return;

    }

    SelectedHawbNo = $("#ddlHAWB option:selected").text();

    if (SelectedHawbNo == '' || SelectedHawbNo == '0') {
        //SelectedHawbId = Hawbid;
        SelectedHawbNo = '';
    }

    //if (MovePIECESno > TotalPIECESno) {
    //    errmsg = "Move packages cannot be more than total packages.</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    if (IGMno == '') {
        errmsg = "IGM No. could not be found.</br>";
        $.alert(errmsg);
        return;
    }

    var oldGIDplusOldLocation = FromLoc + '~' + _groupID;
    var newGIDplusnewLocation = $('#txtNewLoc').val().toUpperCase() + '~' + $('#txtGroupID').val().toUpperCase();

    if ($('#txtGroupID').val() != '') {
        if (errmsg == "" && connectionStatus == "online") {
            $.ajax({
                type: "POST",
                url: CMSserviceURL + serviceName,
                data: JSON.stringify({
                    'pi_intHAWBNo': SelectedHawbNo, 'pi_intIGMNo': IGMno, 'pi_strFromLoc': OldLocationId, 'pi_strFromLocName': oldGIDplusOldLocation,
                    'pi_intOldLocPieces': TotalPIECESno, 'pi_strNewLoc': newGIDplusnewLocation, 'pi_intNewLocPieces': MovePIECESno,
                    'pi_strUserName': window.localStorage.getItem("UserName"),
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
                    $.alert(response.d);

                    $('#txtFromLoc').val('');
                    $('#txtTotPkgs').val('');
                    $('#txtMovePkgs').val('');
                    $('#txtNewLoc').val('');
                    $('#txtNewLoc').val('');
                    $('#txtMovePkgs').val('');

                    //window.location.reload();

                    //if ($('#txtGroupID').val() != '') {
                    //    onblureGroupIDORAWBNo();
                    //} else {
                    //    GetMovementDetails();
                    //}
                    if (isSearch == true) {
                        GetMovementDetails();
                    } else {
                        onblureGroupIDORAWBNo();
                    }

                },
                error: function (msg) {
                    $("body").mLoading('hide');
                    $.alert(msg.d);
                }
            });
            return false;
        }
    } else {

        if (errmsg == "" && connectionStatus == "online") {
            $.ajax({
                type: "POST",
                url: CMSserviceURL + serviceName,
                data: JSON.stringify({
                    'pi_intHAWBNo': SelectedHawbNo, 'pi_intIGMNo': IGMno, 'pi_strFromLoc': OldLocationId, 'pi_strFromLocName': FromLoc,
                    'pi_intOldLocPieces': TotalPIECESno, 'pi_strNewLoc': NewLoc, 'pi_intNewLocPieces': MovePIECESno,
                    'pi_strUserName': window.localStorage.getItem("UserName"),
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
                    $.alert(response.d);

                    $('#txtFromLoc').val('');
                    $('#txtTotPkgs').val('');
                    $('#txtMovePkgs').val('');
                    $('#txtNewLoc').val('');
                    $('#txtNewLoc').val('');
                    //window.location.reload();

                    //if ($('#txtGroupID').val() != '') {
                    //    onblureGroupIDORAWBNo();
                    //} else {
                    //    GetMovementDetails();
                    //}
                    GetMovementDetails();

                },
                error: function (msg) {
                    $("body").mLoading('hide');
                    $.alert(msg.d);
                }
            });
            return false;
        }
    }
}

function SaveInternalForwardDetailsForGHA() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();

    if (AWBNo == '') {
        errmsg = "Please enter AWB No.";
        $.alert(errmsg);
        return;
    }

    var IgmId = $("#ddlIGM option:selected").val();

    var FromLoc = $('#txtFromLoc').val().toUpperCase();
    var TotalPIECESno = $('#txtTotPkgs').val();
    var MovePIECESno = $('#txtMovePkgs').val();
    var NewLoc = $('#txtNewLoc').val().toUpperCase();


    if (FromLoc == "" || TotalPIECESno == "") {

        errmsg = "From location and pckgs not selected.</br>";
        $.alert(errmsg);
        return;

    }

    if (MovePIECESno == "" || NewLoc == "") {

        errmsg = "Please enter move pckgs and new location.</br>";
        $.alert(errmsg);
        return;

    }

    SelectedHawbNo = $("#ddlHAWB option:selected").text();

    if (SelectedHawbNo == '' || SelectedHawbNo == '0') {
        //SelectedHawbId = Hawbid;
        SelectedHawbNo = '';
    }

    //var inputXML = '<Root><MAWBID>' + GHAMawbid + '</MAWBID><HAWBID>' + GHAhawbid + '</HAWBID><IGMNo>' + IgmNo + '</IGMNo><FlightSeqNo>' + GHAflightSeqNo + '</FlightSeqNo><LocCode>' + location + '</LocCode><NOP>' + BinnPckgs + '</NOP><Weight></Weight><LocId></LocId><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //if ($('#txtGroupID').val() != '') {
    //    var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + SelectedHawbNo + '</HouseNo><IGMNo>' + IgmId + '</IGMNo><LocCode>' + NewLoc + '</LocCode><LocId>' + OldLocationId + '</LocId><NOP>' + MovePIECESno + '</NOP><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity><GroupID>' + $('#txtGroupID').val() + '</GroupID></Root>';
    //} else {
    //    var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + SelectedHawbNo + '</HouseNo><IGMNo>' + IgmId + '</IGMNo><LocCode>' + NewLoc + '</LocCode><LocId>' + OldLocationId + '</LocId><NOP>' + MovePIECESno + '</NOP><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
    //}
    var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + SelectedHawbNo + '</HouseNo><IGMNo>' + IgmId + '</IGMNo><LocCode>' + NewLoc + '</LocCode><LocId>' + OldLocationId + '</LocId><NOP>' + MovePIECESno + '</NOP><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity><GroupID>' + $('#txtGroupID').val() + '</GroupID></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "SaveBinning",
            data: JSON.stringify({ 'InputXML': inputXML }),
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

                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('StrMessage').text() != '')
                        $.alert($(this).find('StrMessage').text());
                    else
                        $.alert('Success');
                });

                $('#txtFromLoc').val('');
                $('#txtTotPkgs').val('');
                $('#txtMovePkgs').val('');
                $('#txtNewLoc').val('');
                GetMovementDetailsFromGHA();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert(msg.d);
            }
        });
        return false;
    }

}

function SaveBCForwardDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FromLoc = $('#txtFromLoc').val().toUpperCase();
    var TotalPIECESno = $('#txtTotPkgs').val();
    var MovePIECESno = $('#txtMovePkgs').val();
    var NewLoc = $('#txtNewLoc').val().toUpperCase();
    var BcNo = $('#txtBCNo').val();


    if (FromLoc == "" || TotalPIECESno == "") {

        errmsg = "From location and pckgs not selected.</br>";
        $.alert(errmsg);
        return;

    }

    if (MovePIECESno == "" || NewLoc == "") {

        errmsg = "Please enter move pckgs and new location.</br>";
        $.alert(errmsg);
        return;

    }

    if (SelectedHawbId == '' || SelectedHawbId == '0') {
        SelectedHawbId = Hawbid;
    }

    //if (MovePIECESno > TotalPIECESno) {
    //    errmsg = "Move packages cannot be more than total packages.</br>";
    //    $.alert(errmsg);
    //    return;
    //}    


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + serviceName,
            data: JSON.stringify({
                'pi_intHAWBid': Hawbid, 'pi_intBCNo': BcNo, 'pi_strFromLoc': OldLocationId,
                'pi_intOldLocPieces': TotalPIECESno, 'pi_strNewLoc': NewLoc, 'pi_intNewLocPieces': MovePIECESno,
                'pi_strUserName': window.localStorage.getItem("UserName"),
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
                $.alert(response.d);

                $('#txtFromLoc').val('');
                $('#txtTotPkgs').val('');
                $('#txtMovePkgs').val('');
                $('#txtNewLoc').val('');
                //window.location.reload();
                GetMovementDetails();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert(msg.d);
            }
        });
        return false;
    }

}

function AddTableLocation(loc, locpieces, GroupID) {

    html += "<tr onclick='SelectLocationInfo(this);'>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + loc + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + locpieces + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + GroupID + "</td>";
    html += "</tr>";

}

function AddTableLocationGHA(loc, locpieces, groupid) {

    html += "<tr onclick='SelectLocationInfoGHA(this);'>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + loc + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + locpieces + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + groupid + "</td>";
    html += "</tr>";

}

function SelectLocationInfo(a) {

    var xmlDoc = $.parseXML(strXmlStore);

    $(xmlDoc).find('Table').each(function (index) {

        if (index == a.rowIndex - 1) {
            $('#txtFromLoc').val($(this).find('LocCode').text());
            $('#txtTotPkgs').val($(this).find('LocPieces').text());

            if ($(this).find('GroupID').text() != '') {
                $('#txtMovePkgs').val($(this).find('LocPieces').text()).attr('disabled', 'disabled');
                // $('#txtGroupID').val($(this).find('GroupID').text()).attr('disabled', 'disabled');
                _groupID = $(this).find('GroupID').text();
                $('#txtNewLoc').focus();
            } else {
                $('#txtMovePkgs').val('').removeAttr('disabled');
            }

            OldLocationId = $(this).find('LocId').text();
            IGMno = $(this).find('IGMNo').text();
            FromLoc = $(this).find('LocId').text();
        }

    });
}

function SelectLocationInfoGHA(a) {

    var xmlDoc = $.parseXML(strXmlStore);

    $(xmlDoc).find('Table1').each(function (index) {

        if (index == a.rowIndex - 1) {
            $('#txtFromLoc').val($(this).find('LocCode').text());
            $('#txtTotPkgs').val($(this).find('LocPieces').text());

            if ($(this).find('GroupId').text() != '') {
                $('#txtMovePkgs').val($(this).find('LocPieces').text()).attr('disabled', 'disabled');
                $('#txtGroupID').val($(this).find('GroupId').text()).attr('disabled', 'disabled');
                _groupID = $(this).find('GroupID').text();
                $('#txtNewLoc').focus();
            } else {
                $('#txtMovePkgs').val('').removeAttr('disabled');
            }
            OldLocationId = $(this).find('LocId').text();
            IGMno = $(this).find('IGMNo').text();
            FromLoc = $(this).find('LocId').text();
        }

    });
}

function ClearIGM() {
    $('#txtRemark').val('');
    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
    $('#divAddTestLocation').empty();
    $('#ddlIGM').empty();
}

function clearALL() {
    isSearch = false;
    $('#txtAWBNo').val('');
    $('#txtGroupID').val('');
    $('#txtGroupID').removeAttr('disabled');
    $('#txtMovePkgs').removeAttr('disabled');
    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
    $('#divAddTestLocation').empty();
    $('#ddlIGM').val(0);
    $('#ddlHAWB').val(0);
    $('#txtBCNo').val('');
    $('#txtAWBNo').focus();


}

function clearBeforePopulate() {
    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
    $('#divAddTestLocation').empty();
    $('#ddlIGM').val(0);
    $('#ddlHAWB').val(0);
    $('#txtBCNo').val('');
    $('#txtAWBNo').focus();
}

function clearBeforePopulate() {
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
}

function ChkAndValidate() {

    var ScanCode = $('#txtAWBNo').val();
    ScanCode = ScanCode.replace(/\s+/g, '');
    ScanCode = ScanCode.replace("-", "").replace("–", "");

    if (ScanCode.length >= 11) {

        $('#txtAWBNo').val(ScanCode.substr(0, 11));
        //$('#txtAWBNo').val(ScanCode.substr(3, 8));
        //$('#txtScanCode').val('');

        //GetShipmentStatus();
    }
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

//$(function () {
//    $("#txtBCDate").datepicker({
//        dateFormat: "dd/mm/yy"
//    });
//    $("#txtBCDate").datepicker().datepicker("setDate", new Date());
//});
