

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var html;
var LocationRowID;
var AWBRowID;
var HAWBId;
var inputRowsforLocation = "";
var _ULDFltSeqNo;
var HAWBRowId;
//document.addEventListener("pause", onPause, false);
//document.addEventListener("resume", onResume, false);
//document.addEventListener("menubutton", onMenuKeyDown, false);

//function onPause() {

//    HHTLogout();
//}

//function onResume() {
//    HHTLogout();
//}

//function onMenuKeyDown() {
//    HHTLogout();
//}



$(function () {

    if (window.localStorage.getItem("RoleIMPFinalDelivery") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }


    //var formattedDate = new Date();
    //var d = formattedDate.getDate();
    //if (d.toString().length < Number(2))
    //    d = '0' + d;
    //var m = formattedDate.getMonth();
    //m += 1;  // JavaScript months are 0-11
    //if (m.toString().length < Number(2))
    //    m = '0' + m;
    //var y = formattedDate.getFullYear();
    //var t = formattedDate.getTime();
    //var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    //newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    //$('#txtFlightDate').val(newDate);

    //var h = date.getHours();
    //var m = date.getMinutes();
    //var s = date.getSeconds();

});


function checkLocation() {
    var location = $('#txtLocation').val().toUpperCase();
    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });

        return;
    } else {
        $('#txtSacnULD').focus();
        $("#spnMsg").text('');
    }
}



function gatePassChangeFocus() {
    if ($('#txtGatePass').val().length == 14) {
        $('#txtGroupId').focus();
    }
}

function GetGPCountSummary_HHT() {

    $('#divGatePassLineUpSummary').html('');
    $('#divGatePassLineUpSummary').empty();
    $('#lblMessageSuccess').text('');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePass = $('#txtGatePass').val().toUpperCase();

    if (txtGatePass == '') {

        return;
    } else {
        // $('#txtGroupId').focus();
    }

    //if (txtGatePass.length == '14') {
    //    //errmsg = "Please enter valid AWB No.";
    //    //$.alert(errmsg);
    //    //$('#txtAWBNo').val('');
    //    return;
    //}


    //if (txtVCTNo != "") {
    //    $('#btnGoodsDelever').removeAttr('disabled');
    //} else {
    //    $('#btnGoodsDelever').atrr('disabled', 'disabled');
    //    return;
    //}

    $('#lblMessage').text('');
    if (txtGatePass.length >= '8') {
        if (errmsg == "" && connectionStatus == "online") {
            $.ajax({
                type: 'POST',
                url: CMSserviceURL + "GetGPCountSummary_HHT",
                data: JSON.stringify({
                    'GetGPCountSummary_HHTResult': txtGatePass,
                    //'strUserId': UserId,
                    //'strVal': deviceUUID
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

                    //$('#divGatePassLineUpSummary').html('');
                    //$('#divGatePassLineUpSummary').empty();
                    console.log(xmlDoc);
                    $('#divGatePassLineUpSummary').empty('');
                    $(xmlDoc).find('Table1').each(function () {
                        var OutMsg = $(this).find('OutMsg').text();
                        var Status = $(this).find('Status').text();
                        if (Status == 'E') {
                            //$('#lblMessageSuccess').text('');
                            $('#lblMessageSuccess').text(OutMsg).css('color', 'red');
                            //$('#txtGatePass').val('');
                            //$('#txtGatePass').focus();
                            $('#txtGatePass').val('');
                            $('#txtPieces').val('');
                            $('#txtWeight').val('');
                            $('#txtLocation').val('');
                            $('#txEmployeeID').val('');
                            $('#txRemark').val('');
                            $('#txtGatePass').focus();
                        } else {

                            $('#lblMessage').text('');
                        }

                        // var Status = $(this).find('Status').text();
                        //var StrMessage = $(this).find('strOutMsg').text();
                        //$.alert(StrMessage).css('color', 'red');



                    });

                    if (response != null && response != "") {

                        html = '';

                        html += '<table id="tblNewsForGatePass" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;">';
                        html += '<thead>';

                        html += '<tr>';
                        html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">GP Summary</th>';
                        html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Count</th>';
                        //  html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Summary Date</th>';
                        html += '</tr>';
                        html += '</thead>';
                        html += '<tbody>';

                        var xmlDoc = $.parseXML(response);
                        var flag = '0';
                        $(xmlDoc).find('Table').each(function (index) {
                            $('#lblMessage').text('');
                            //var Status = $(this).find('Status').text();
                            //var StrMessage = $(this).find('StrMessage').text();
                            //if (Status == 'E') {
                            //    $.alert(StrMessage);
                            //    $('#divULDNumberDetails').empty();
                            //    $('#divULDNumberDetails').hide();
                            //    html = '';
                            //    return;
                            //}

                            flag = '1';
                            //if (index == 0) {
                            gpSummary = $(this).find('gpSummary').text();
                            gpTotal = $(this).find('gpTotal').text();
                            CurrentDt = $(this).find('CurrentDt').text();

                            gpSummaryDetails(gpSummary, gpTotal, CurrentDt);


                            //  }
                            if (index == 0) {
                                $('#hSummaryDate').text(CurrentDt);
                            }

                        });
                        html += "</tbody></table>";
                        if (flag == '1') {
                            $('#divGatePassLineUpSummary').show();
                            $('#divGatePassLineUpSummary').append(html);
                        }
                        LineupGatepass_HHT();

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
        } else if (connectionStatus == "offline") {
            $("body").mLoading('hide');
            $.alert('No Internet Connection!');
        } else if (errmsg != "") {
            $("body").mLoading('hide');
            $.alert(errmsg);
        } else {
            $("body").mLoading('hide');
        }
    }
}



function gpSummaryDetails(gpSummary, gpTotal, CurrentDt) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + gpSummary + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + gpTotal + '</td>';
    // html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + CurrentDt + '</td>';
    //if (IsOutOfWarehouse == 'false') {
    //    //html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:center;color:gray;"><span class="glyphicon glyphicon-remove"></span></td>';
    //    html += '<td style="font-size:14px;padding: 5px;background: rgb(224, 243, 215);" class="text-center align-middle"><button  class="btn" disabled align="center">Cancel</button></td>';
    //} else {
    //    //html += '<td onclick="SaveOutforWarehouseRevoke(\'' + GroupID + '\');" style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:center;color:red;"><span class="glyphicon glyphicon-remove"></span></td>';
    //    html += '<td style="font-size:14px;padding: 5px;background: rgb(224, 243, 215);" class="text-center align-middle"><button disabled onclick="SaveOutforWarehouseRevoke(\'' + GroupID + '\');" class="btn" align="center">Cancel</button></td>';
    //}

    html += '</tr>';
}


function LineupGatepass_HHT() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePass = $('#txtGatePass').val();

    if (txtGatePass == "") {
        // $('#lblMessage').text('Please scan/enter gate pass.').css('color', 'red');
        return;
    } else {
        $('#lblMessage').text('');
    }


    //if (txtGroupId == '') {
    //    $('#lblMessageSuccess').text('');
    //    GetGroupIdBaseOnGatepass();
    //    return;
    //}

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "LineupGatepass_HHT ",
            data: JSON.stringify({
                'pi_strGatePassNo': txtGatePass,
                'pi_strCreatedBy': UserName,
                'po_strOut': '',
                'po_strStatus': '',

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
                $('#lblMessage').text('');
                $('#lblMessageSuccess').text('');
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                //$("#btnScanAccpt").removeAttr('disabled');
                //$('#tblNewsForGatePass').hide();
                //$('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {
                    // $('#lblMessage').text('');
                    var Status = $(this).find('Sts').text();
                    var StrMessage = $(this).find('StsMsg').text();

                    if (Status == 'E') {
                        //$('#txtGroupId').val('');
                        //$('#txtGroupId').focus();
                        //$.alert(StrMessage).css('color', 'red');
                        $('#lblMessageSuccess').text(StrMessage).css('color', 'red');
                        //  $('#txtGatePass').val('');
                        //$('#txtPieces').val('');
                        //$('#txtWeight').val('');
                        //$('#txtLocation').val('');
                        //$('#txEmployeeID').val('');
                        //$('#txRemark').val('');
                        // $('#txtGatePass').focus();

                    } else {
                        $('#lblMessageSuccess').text(StrMessage).css('color', 'green');
                        $('#txtGatePass').val('');
                        //$('#txtPieces').val('');
                        //$('#txtWeight').val('');
                        //$('#txtLocation').val('');
                        //$('#txEmployeeID').val('');
                        //$('#txRemark').val('');
                        // $('#txtGatePass').focus();
                    }

                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });
                // GetGroupIdBaseOnGatepass();


            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}



function clearAWBDetails() {
    $('#txtGatePass').val('');
    $('#txtGroupId').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#divGatePassLineUpSummary').hide();
    $('#divGatePassLineUpSummary').empty();
    $('#txtFlightDate').val('');
    $('#txtLocation').val('');
    $('#spnMsg').text('');
    $('#lblMessageSuccess').text('');
    $('#lblMessage').text('');
    $('#txtGatePass').focus();
    $('#btnGatePassHandover').attr('disabled', 'disabled');
    
    $('#hSummaryDate').text('');
    $('#txtPieces').val('');
    $('#txtWeight').val('');
    $('#txtLocation').val('');
    $('#txEmployeeID').val('');
    $('#txRemark').val('');
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}


