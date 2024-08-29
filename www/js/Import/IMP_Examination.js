var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var SelectedHawbId;
var SelectedHawbIdCMS;
var SelectedHawbNo;
var IGMno;
var strXmlStore;
var locPieces;
var html;
var FromLoc;
var GHAMawbid;
var Hawbid;
var GHAhawbid;
var IsFlightFinalized;
var GHAflightSeqNo;
var _FlightSeqNo;
var _MAWBNo;
var _HAWBNo;
var _LocId;
var _HAWBId;
var _LocCode;
var _LocPieces;
var _LocNewPieces;
var _IGMNo;
var _GroupId;
var _Remarks;
var CMSGHAFlag;
var autoLocationArray;
$(function () {

    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    // document.addEventListener('deviceready', AddLocation, false);
    //document.addEventListener('deviceready', AddingTestLocation, false);
  //  ImportDataList();
});

//function CheckEmpty() {

//    if ($('#txtGroupId').val() != '') {
//        $('#btnMoveDetail').removeAttr('disabled');
//        $('#txtNewGroupId').removeAttr('disabled');
//        $('#txtPieces').removeAttr('disabled');
//        $('#txtLocation').removeAttr('disabled');
//        $('#btnSearchDetail').removeAttr('disabled');
//    } else {
//        $('#btnMoveDetail').attr('disabled', 'disabled');
//        $('#txtNewGroupId').attr('disabled');
//        $('#txtPieces').attr('disabled');
//        $('#txtLocation').attr('disabled');
//        $('#btnSearchDetail').attr('disabled');
//        return;
//    }

//}

function gatePassChangeFocus() {
    if ($('#txtNewGroupId').val().length == 14) {
        $('#txtPieces').focus();
    }
}

function gateGroupID() {
    if ($('#txtGroupId').val().length == 14) {
        $('#txtNewGroupId').focus();
        GetHAWBDetailsForMAWB();
    }
}

function piecesChangeFocus() {

    $('#txtLocation').focus();

}


function GetHAWBDetailsForMAWBOnSearchButton() {
    $('#divVCTDetail').hide();
    $('#divVCTDetail').empty();

    $('#txtNewGroupId').val('');
    $('#txtPieces').val('');
    $('#txtLocation').val('');
    $('#txtRemark').val('');
    $('#divVCTDetail').hide();
    $('#divAddTestLocation').empty();
    $('#txtGroupId').focus();
    $('#spnErrormsg').text('');

    IsFlightFinalized = '';
    GHAMawbid = '';
    Hawbid = '';
    GHAhawbid = '';
    IsFlightFinalized = '';
    GHAflightSeqNo = '';
    html = '';
    $('#spnErrormsg').text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = '';// $('#txtAWBNo').val();
    var txtGroupId = $('#txtGroupId').val();

    if ($("#txtGroupId").val() == '') {
        //errmsg = "Please enter Group Id.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter Group Id.").css('color', 'red');
        return;
    } else {
        $('#spnErrormsg').text("");
    }

    //if (txtGroupId == '') {
    //    return;
    //}


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetLocationDetailFromGroupId",
            data: JSON.stringify({ 'pi_strGroupId': txtGroupId }),
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);

                //$('#divVCTDetail').html('');
                //$('#divVCTDetail').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();


                    console.log("Status");
                    console.log(Status);

                    if (Status == 'E') {
                        $('#txtGroupId').val('');
                        $("#txtGroupId").focus('')
                        $('#divVCTDetail').hide();
                        $('#divSplitField').hide();
                        $('#divVCTDetail').empty();
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');

                        

                    } else {
                        $('#spnErrormsg').text('');
                        $('#divSplitField').show();
                        $('#txtNewGroupId').focus();
                    }


                });

                if (response != null && response != "") {
                    $('#divVCTDetail').hide();
                    $('#tblNewsForGatePass').empty();
                    html = '';


                    html += '<table id="tblNewsForGatePass" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" width="100" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 5px;width: auto;font-size:14px" align="left" font-weight:bold">MAWB/HAWB No.</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 5px;width: auto;font-size:14px;width: auto;" align="left" font-weight:bold">Location</th>';
                    html += '<th height="30" width="50" style="background-color:rgb(208, 225, 244);padding: 3px 5px 0px 5px;width: auto;font-size:14px;width: 80px;" align="right" font-weight:bold">Pieces</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
                    $(xmlDoc).find('Table').each(function (index) {
                        $('#lblMessage').text('');
                        flag = '1';

                        _MAWBNo = $(this).find('MAWBNo').text();
                        _HAWBNo = $(this).find('HAWBNo').text();
                        _LocId = $(this).find('LocId').text();
                        _HAWBId = $(this).find('HAWBId').text();
                        _LocCode = $(this).find('LocCode').text();
                        _LocPieces = $(this).find('LocPieces').text();
                        _IGMNo = $(this).find('IGMNo').text();
                        _GroupId = $(this).find('GroupId').text();
                        _Remarks = $(this).find('Remarks').text();
                        _IsOutOfWarehouse = $(this).find('IsOutOfWarehouse').text();
                        CMSGHAFlag = $(this).find('CMSGHAFlag').text();
                        _FlightSeqNo = $(this).find('FlightSeqNo').text();

                        NOG = $(this).find('NOG').text();


                        $('#txtLocationShow').val(_LocCode);
                        $('#txtNOG').val(NOG);
                        $('#txtRemark').val(_Remarks);

                        VCTNoDetails(_MAWBNo, _HAWBNo, _LocCode, _LocPieces);
                    });
                    html += "</tbody></table>";
                    if (_GroupId != '') {
                        $('#divVCTDetail').show();
                        $('#divVCTDetail').append(html);
                    }


                } else {
                    errmsg = 'VCT No. does not exists.';
                    $.alert(errmsg);
                }
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
    $('#divVCTDetail').hide();
    $('#divVCTDetail').empty();

    $('#txtNewGroupId').val('');
    $('#txtPieces').val('');
    $('#txtLocation').val('');
    $('#txtRemark').val('');
    $('#divVCTDetail').hide();
    $('#divAddTestLocation').empty();

    $('#spnErrormsg').text('');

    IsFlightFinalized = '';
    GHAMawbid = '';
    Hawbid = '';
    GHAhawbid = '';
    IsFlightFinalized = '';
    GHAflightSeqNo = '';
    html = '';
    $('#spnErrormsg').text('');
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = '';// $('#txtAWBNo').val();
    var txtGroupId = $('#txtGroupId').val();

    if ($("#txtGroupId").val() == '') {
        //errmsg = "Please enter Group Id.";
        //$.alert(errmsg);
        return;
    }

    if (txtGroupId == '') {
        return;
    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetLocationDetailFromGroupId",
            data: JSON.stringify({ 'pi_strGroupId': txtGroupId }),
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);

                //$('#divVCTDetail').html('');
                //$('#divVCTDetail').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();


                    console.log("Status");
                    console.log(Status);

                    if (Status == 'E') {
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        $("#txtGroupId").val('')
                        $("#txtGroupId").focus('')

                        $('#divVCTDetail').hide();
                        $('#divSplitField').hide();
                        $('#divVCTDetail').empty();



                    } else {
                        $('#txtNewGroupId').focus();
                        $('#spnErrormsg').text('');
                        $('#divSplitField').show();
                    }


                });

                if (response != null && response != "") {
                    $('#divVCTDetail').hide();
                    $('#tblNewsForGatePass').empty();
                    html = '';


                    html += '<table id="tblNewsForGatePass" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" width="100" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 5px;width: auto;font-size:14px" align="left" font-weight:bold">MAWB/HAWB No.</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 5px;width: auto;font-size:14px;width: auto;" align="left" font-weight:bold">Location</th>';
                    html += '<th height="30" width="50" style="background-color:rgb(208, 225, 244);padding: 3px 5px 0px 5px;width: auto;font-size:14px;width: 80px;" align="right" font-weight:bold">Pieces</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
                    $(xmlDoc).find('Table').each(function (index) {
                        $('#lblMessage').text('');
                        flag = '1';

                        _MAWBNo = $(this).find('MAWBNo').text();
                        _HAWBNo = $(this).find('HAWBNo').text();
                        _LocId = $(this).find('LocId').text();
                        _HAWBId = $(this).find('HAWBId').text();
                        _LocCode = $(this).find('LocCode').text();
                        _LocPieces = $(this).find('LocPieces').text();
                        _IGMNo = $(this).find('IGMNo').text();
                        _GroupId = $(this).find('GroupId').text();
                        _Remarks = $(this).find('Remarks').text();
                        _IsOutOfWarehouse = $(this).find('IsOutOfWarehouse').text();
                        CMSGHAFlag = $(this).find('CMSGHAFlag').text();
                        _FlightSeqNo = $(this).find('FlightSeqNo').text();

                        NOG = $(this).find('NOG').text();


                        $('#txtLocationShow').val(_LocCode);
                        $('#txtNOG').val(NOG);
                        $('#txtRemark').val(_Remarks);

                        VCTNoDetails(_MAWBNo, _HAWBNo, _LocCode, _LocPieces);
                    });
                    html += "</tbody></table>";
                    if (_GroupId != '') {
                        $('#divVCTDetail').show();
                        $('#divVCTDetail').append(html);
                    }


                } else {
                    errmsg = 'VCT No. does not exists.';
                    $.alert(errmsg);
                }
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

function clearALL() {
    $('#txtGroupId').val('');
    $('#txtNewGroupId').val('');
    $('#txtPieces').val('');
    $('#txtLocation').val('');
    $('#txtRemark').val('');
    $('#divVCTDetail').hide();
    $('#divAddTestLocation').empty();
    $('#txtGroupId').focus();
    $('#spnErrormsg').text('');


}

function VCTNoDetails(MAWBNo, HAWBNo, Remarks, LocPieces) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;width: auto;">' + MAWBNo + ' / ' + HAWBNo + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;width: auto;">' + Remarks + '</td>';
    // html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + Remarks + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-right: 5px;font-size:14px;text-align:right;padding-right: 10px;width: 80px;">' + LocPieces + '</td>';
    html += '</tr>';
}

function SplitGroupId() {

    IsFlightFinalized = '';
    //  $("#btnSubmit").removeAttr("disabled");

    html = '';

    //  $('#divAddTestLocation').empty();

    //clearBeforePopulate();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var AWBNo = $('#txtAWBNo').val();
    //var HAWBNo = $("#ddlHAWB option:selected").text();
    //var IgmId = $("#ddlIGM option:selected").val();
    //var IgmNo = $("#ddlIGM option:selected").text();

    //SelectedHawbId = $("#ddlHAWB option:selected").val();

    var txtGroupId = $("#txtGroupId").val().toUpperCase();
    if ($("#txtGroupId").val() == '') {
        //errmsg = "Please enter Group Id.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter Group Id.").css('color', 'red');
        $("#txtGroupId").focus();
        return;
    } else {
        $('#spnErrormsg').text("");
    }

    var txtNewGroupId = $("#txtNewGroupId").val().toUpperCase();
    if ($("#txtNewGroupId").val() == '') {
        //errmsg = "Please enter New Group Id.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter New Group Id.").css('color', 'red');
        $("#txtNewGroupId").focus();
        return;
    } else {
        $('#spnErrormsg').text('');
    }

    _LocNewPieces = $("#txtPieces").val();
    if ($("#txtPieces").val() == '') {
        //errmsg = "Please enter pieces.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter pieces.").css('color', 'red');
        $("#txtPieces").focus();
        return;
    } else {
        $('#spnErrormsg').text('');
    }

    var txtLocation = $("#txtLocation").val().toUpperCase();
    if ($("#txtLocation").val() == '') {
        //errmsg = "Please enter location.";
        //$.alert(errmsg);
        $('#spnErrormsg').text("Please enter location.").css('color', 'red');
        $("#txtLocation").focus();
        return;
    } else {
        $('#spnErrormsg').text('');
    }



    // if (CMSGHAFlag == 'G') {
    //     SaveForwardDetailsForGHA();
    //     return;
    // }

    var totalPieces = Number(_LocPieces) - Number(_LocNewPieces);

    // console.log('pi_strGroupId' + '=' + txtGroupId,
    //             'pi_intGroupPieces' + '=' + totalPieces,
    //             'pi_strNewGroupId' + '=' + txtNewGroupId,
    //             'pi_intNewGroupPieces' + '=' + _LocNewPieces,
    //             'pi_strNewLocation' + '=' + txtLocation,
    //             'pi_intHAWBId' + '=' + _HAWBId,
    //             'pi_intIGMNo' + '=' + _IGMNo,
    //              'pi_strApplication' + '=' + 'H',
    //             'pi_strUserId' + '=' + UserName);

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "SplitGroupId",
            data: JSON.stringify({
                'pi_strGroupId': txtGroupId,
                'pi_intGroupPieces': totalPieces,
                'pi_strNewGroupId': txtNewGroupId,
                'pi_intNewGroupPieces': _LocNewPieces,
                'pi_strNewLocation': txtLocation,
                'pi_intHAWBId': _HAWBId,
                'pi_intIGMNo': _IGMNo,
                'pi_strApplication': 'H',
                'pi_strUserId': UserName,
                'pi_strUserName': UserName

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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {

                    var OutMsg = $(this).find('OutMsg').text();
                    var ColorCode = $(this).find('ColorCode').text();

                    if (OutMsg != '') {
                        //  $('#spnErrormsg').text(OutMsg).css('color', ColorCode);
                        $.alert(OutMsg).css('color', ColorCode);
                        $('#txtGroupId').focus();
                        $('#txtNewGroupId').val('');
                        $('#txtGroupId').val('');
                        $('#txtPieces').val('');
                        $('#txtLocation').val('');
                        GetHAWBDetailsForMAWB();
                    } else {
                        $('#spnErrormsg').text('');
                    }


                });

                //setTimeout(function () {
                //    GetHAWBDetailsForMAWB();
                //}, 6000);


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



function AddTableLocation(loc, locpieces) {

    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + loc + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + locpieces + "</td>";
    html += "</tr>";

}


function ClearIGM() {

    //  $('#ddlIGM').empty();
}

function clearBeforePopulate() {
    // $('#txtFromLoc').val('');
    // $('#txtTotPkgs').val('');
    // $('#txtMovePkgs').val('');
    // $('#txtNewLoc').val('');
}

function ChkAndValidate() {

    // var ScanCode = $('#txtAWBNo').val();
    // ScanCode = ScanCode.replace(/\s+/g, '');
    // ScanCode = ScanCode.replace("-", "").replace("–", "");

    // if (ScanCode.length >= 11) {

    //     $('#txtAWBNo').val(ScanCode.substr(0, 11));
    //     //$('#txtAWBNo').val(ScanCode.substr(3, 8));
    //     //$('#txtScanCode').val('');

    //     //GetShipmentStatus();
    // }
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

$(function () {
    //$("#txtBCDate").datepicker({
    //    dateFormat: "dd/mm/yy"
    //});
    //$("#txtBCDate").datepicker().datepicker("setDate", new Date());
});

function ImportDataList() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "ImportDataList",
            data: JSON.stringify({ 'pi_strQueryType': 'I','pi_strUserName' :UserName,'pi_strSession':''}),
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
              //  console.log(suggestionList);
                var info = suggestionList.slice(Math.max(suggestionList.length - 1000, 0))
                $("#txtLocation").autocomplete({
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