

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

function GetGroupIdBaseOnGatepass() {

  

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePass = $('#txtGatePass').val().toUpperCase();

    if (txtGatePass == '') {

        return;
    } else {
        // $('#txtGroupId').focus();
    }
    $('#divVCTDetail').html('');
    $('#divVCTDetail').empty();
    $('#lblMessageSuccess').text('');
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
                url: CMSserviceURL + "GetGroupIdBaseOnGatepass",
                data: JSON.stringify({
                    'pi_strGatepassNo': txtGatePass,
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

                    //$('#divVCTDetail').html('');
                    //$('#divVCTDetail').empty();
                    console.log(xmlDoc);
                    $('#divVCTDetail').empty('');
                    $(xmlDoc).find('Table1').each(function () {
                        var OutMsg = $(this).find('strOutMsg').text();
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

                        //html = '';

                        //html += '<table id="tblNewsForGatePass" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;">';
                        //html += '<thead>';
                        //html += '<tr>';
                        //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Group Id</th>';
                        //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Pieces</th>';
                        //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center">Cancel</th>';
                        //html += '</tr>';
                        //html += '</thead>';
                        //html += '<tbody>';

                        var xmlDoc = $.parseXML(response);
                        var flag = '0';
                        var IsHandOver;
                        var IsLinedup;
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

                            if (index == 0) {
                                GroupID = $(this).find('GroupID').text();
                                NoOfPackages = $(this).find('NoOfPackages').text();
                                GROSSWT = $(this).find('GROSSWT').text();
                                LOCATION = $(this).find('LOCATION').text();
                                IsOutOfWarehouse = $(this).find('IsOutOfWarehouse').text();
                                HAWBRowId = $(this).find('HAWBRowId').text();
                                $('#btnGatePassHandover').removeAttr('disabled');
                                //  VCTNoDetails(GroupID, NoOfPackages, IsOutOfWarehouse);
                                IsHandOver = $(this).find('IsHandOver').text();
                                IsLinedup = $(this).find('IsLinedup').text();
                                EmpID = $(this).find('EmpID').text();
                                Remark = $(this).find('Remark').text();
                                $('#txtPieces').val(NoOfPackages);
                                $('#txtWeight').val(GROSSWT);
                                $('#txtLocation').val(LOCATION);
                                $('#txEmployeeID').val(EmpID);
                               
                                $('#txEmployeeID').focus();
                            }


                        });


                        $(xmlDoc).find('Table2').each(function () {

                            var Status = $(this).find('Status').text();
                            var StrMessage = $(this).find('OutMsg').text();

                            if (Status == 'E') {
                                //$('#txtGroupId').val('');
                                //$('#txtGroupId').focus();
                                //$.alert(StrMessage).css('color', 'red');
                                $('#lblMessageSuccess').text(StrMessage).css('color', 'red');


                            } else {
                                $('#lblMessageSuccess').text(StrMessage).css('color', 'green');

                            }

                        });
                        if (IsHandOver == 'false' && IsLinedup == 'false') {

                            $("#btnGatePassHandover").removeAttr('disabled');
                            $("#txEmployeeID").removeAttr('disabled');

                            $("#btnSubmit").attr('disabled', 'disabled');
                            $("#txRemark").attr('disabled', 'disabled');

                            $("#txRemark").val('');
                        }

                        if (IsHandOver == 'true' && IsLinedup == 'false') {

                            $("#btnGatePassHandover").attr('disabled', 'disabled');
                            $("#txEmployeeID").attr('disabled', 'disabled');

                            $("#btnSubmit").removeAttr('disabled', 'disabled');
                            $("#txRemark").removeAttr('disabled', 'disabled');

                            $("#txRemark").val('');
                        }


                        if (IsLinedup == 'true') {

                            $("#btnGatePassHandover").attr('disabled', 'disabled');
                            $("#txEmployeeID").attr('disabled', 'disabled');

                            $("#btnSubmit").attr('disabled', 'disabled');
                            $("#txRemark").attr('disabled', 'disabled');

                            $('#txRemark').val(Remark);
                        }
                        //if (IsHandOver == 'true') {
                        //    //$.alert($(this).find('OutMsg').text());
                        //    $("#btnGatePassHandover").attr('disabled', 'disabled');
                        //    $("#txEmployeeID").attr('disabled', 'disabled');
                        //    $("#btnSubmit").attr('disabled', 'disabled');
                        //    $("#txRemark").attr('disabled', 'disabled');

                        //} else {
                        //    //  $.alert($(this).find('OutMsg').text());
                        //    $("#btnGatePassHandover").removeAttr('disabled');
                        //    $("#txEmployeeID").removeAttr('disabled');
                        //    $("#btnSubmit").removeAttr('disabled');
                        //    $("#txRemark").removeAttr('disabled');
                        //}


                        //if (IsLinedup == 'true') {
                        //    //$.alert($(this).find('OutMsg').text());
                        //    $("#btnSubmit").attr('disabled', 'disabled');
                        //    $("#txRemark").attr('disabled', 'disabled');
                        //    $("#btnGatePassHandover").attr('disabled', 'disabled');
                        //    $("#txEmployeeID").attr('disabled', 'disabled');

                        //} else {
                        //    //  $.alert($(this).find('OutMsg').text());
                        //    $("#btnSubmit").removeAttr('disabled');
                        //    $("#txRemark").removeAttr('disabled');
                        //    $("#txRemark").val('');

                        //    $("#btnGatePassHandover").removeAttr('disabled');
                        //    $("#txEmployeeID").removeAttr('disabled');
                        //}
                        //html += "</tbody></table>";
                        //if (flag == '1') {
                        //    $('#divVCTDetail').show();
                        //    $('#divVCTDetail').append(html);
                        //}


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



function VCTNoDetails(GroupID, NoOfPackages, IsOutOfWarehouse) {

    html += '<tr>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + GroupID + '</td>';
    html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + NoOfPackages + '</td>';
    if (IsOutOfWarehouse == 'false') {
        //html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:center;color:gray;"><span class="glyphicon glyphicon-remove"></span></td>';
        html += '<td style="font-size:14px;padding: 5px;background: rgb(224, 243, 215);" class="text-center align-middle"><button  class="btn" disabled align="center">Cancel</button></td>';
    } else {
        //html += '<td onclick="SaveOutforWarehouseRevoke(\'' + GroupID + '\');" style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:center;color:red;"><span class="glyphicon glyphicon-remove"></span></td>';
        html += '<td style="font-size:14px;padding: 5px;background: rgb(224, 243, 215);" class="text-center align-middle"><button disabled onclick="SaveOutforWarehouseRevoke(\'' + GroupID + '\');" class="btn" align="center">Cancel</button></td>';
    }

    html += '</tr>';
}


function SaveOutforWarehouse() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePass = $('#txtGatePass').val();
    var txtGroupId = '';// $('#txtGroupId').val();
    var txEmployeeID = $('#txEmployeeID').val();


    if (txtGatePass == "") {
        $('#lblMessage').text('Please scan/enter gate pass.').css('color', 'red');
        return;
    } else {
        $('#lblMessage').text('');
    }

    if (txEmployeeID == "") {
        $('#lblMessage').text('Please enter employee Id.').css('color', 'red');
        $('#txEmployeeID').focus();
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
            url: CMSserviceURL + "SaveOutforWarehouse",
            data: JSON.stringify({
                'pi_strGatepassNo': txtGatePass,
                'pi_strGroupId': txtGroupId,
                'pi_strUserId': UserName,
                'pi_strMode': 'O',
                'pi_strEmpId': txEmployeeID,
                'pi_strRemarks': $('#txRemark').val(),
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
                $("#btnScanAccpt").removeAttr('disabled');
                $('#tblNewsForGatePass').hide();
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {
                    $('#lblMessage').text('');
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('OutMsg').text();

                    if (Status == 'E') {
                        //$('#txtGroupId').val('');
                        //$('#txtGroupId').focus();
                        //$.alert(StrMessage).css('color', 'red');
                        $('#lblMessageSuccess').text(StrMessage).css('color', 'red');
                        $('#txtGatePass').val('');
                        $('#txtPieces').val('');
                        $('#txtWeight').val('');
                        $('#txtLocation').val('');
                        $('#txEmployeeID').val('');
                        $('#txRemark').val('');
                        $('#txtGatePass').focus();

                    } else {
                        $('#lblMessageSuccess').text(StrMessage).css('color', 'green');
                        $('#txtGatePass').val('');
                        $('#txtPieces').val('');
                        $('#txtWeight').val('');
                        $('#txtLocation').val('');
                        $('#txEmployeeID').val('');
                        $('#txRemark').val('');
                        $('#txtGatePass').focus();
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


function SaveOutforWarehouseRevoke(GroupID) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtGatePass = $('#txtGatePass').val();
    // var txtGroupId = $('#txtGroupId').val();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "SaveOutforWarehouse",
            data: JSON.stringify({
                'pi_strGatepassNo': txtGatePass,
                'pi_strGroupId': GroupID,
                'pi_strUserId': UserName,
                'pi_strMode': 'R'
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
                $("#btnScanAccpt").removeAttr('disabled');
                $('#tblNewsForGatePass').hide();
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('OutMsg').text();

                    //if (Status == 'E') {
                    //    $.alert(StrMessage).css('color', 'red');

                    //} else {
                    //    $.alert(StrMessage).css('color', 'green');
                    //}
                    if (Status == 'E') {
                        $('#txtGroupId').val('');
                        $('#txtGroupId').focus();
                        //$.alert(StrMessage).css('color', 'red');
                        $('#lblMessageSuccess').text(StrMessage).css('color', 'red');

                    } else {
                        $('#lblMessageSuccess').text(StrMessage).css('color', 'green');
                    }

                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });

                GetGroupIdBaseOnGatepass();

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
    $('#divVCTDetail').hide();
    $('#divVCTDetail').empty();
    $('#txtFlightDate').val('');
    $('#txtLocation').val('');
    $('#spnMsg').text('');
    $('#lblMessageSuccess').text('');
    $('#lblMessage').text('');
    $('#txtGatePass').focus();
    $('#btnGatePassHandover').attr('disabled', 'disabled');

    $('#txtPieces').val('');
    $('#txtWeight').val('');
    $('#txtLocation').val('');
    $('#txEmployeeID').val('');
    $('#txRemark').val('');
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}


function HandoverGatepass_HHT() {
    if ($("#txtGatePass").val() == "") {
        $('#lblMessage').text('Please enter/scan gate pass.').css('color', 'red');
        return;
    } else {
        $('#lblMessage').text('');
    }

    if ($("#txEmployeeID").val() == "") {
        $('#lblMessage').text('Please enter employee Id.').css('color', 'red');
        return;
    } else {
        $('#lblMessage').text('');
    }



    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "HandoverGatepass_HHT",
            data: JSON.stringify({
                'pi_intHAWBRowId': HAWBRowId,
                'pi_strGatePassNo': $("#txtGatePass").val(),
                'pi_strCreatedBy': window.localStorage.getItem("UserName"),
                'pi_strEmpID': $("#txEmployeeID").val(),
                'pi_Remarks': $("#txRemark").val(),
                'pi_strMode': 'H'
            }),
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
                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function () {
                        $('#lblMessage').text('');
                        var Status = $(this).find('Status').text();
                        var StrMessage = $(this).find('OutMsg').text();

                        if (Status == 'E') {
                            //$('#txtGroupId').val('');
                            //$('#txtGroupId').focus();
                            //$.alert(StrMessage).css('color', 'red');
                            $('#lblMessageSuccess').text(StrMessage).css('color', 'red');
                            $('#txtGatePass').val('');
                            $('#txtPieces').val('');
                            $('#txtWeight').val('');
                            $('#txtLocation').val('');
                            $('#txEmployeeID').val('');
                            $('#txRemark').val('');
                            $('#txtGatePass').focus();

                        } else {
                            $('#lblMessageSuccess').text(StrMessage).css('color', 'green');
                            $('#txtGatePass').val('');
                            $('#txtPieces').val('');
                            $('#txtWeight').val('');
                            $('#txtLocation').val('');
                            $('#txEmployeeID').val('');
                            $('#txRemark').val('');
                            $('#txtGatePass').focus();
                        }

                    });

                    //$(xmlDoc).find('Table').each(function (index) {
                    //    Status = $(this).find('Status').text();
                    //    if (Status == 'S') {
                    //        $.alert($(this).find('OutMsg').text());
                    //        $("#btnGatePassHandover").attr('disabled', 'disabled');
                    //        return false;
                    //    } else {
                    //        $.alert($(this).find('OutMsg').text());
                    //        $("#btnGatePassHandover").removeAttr('disabled');
                    //    }



                    //});

                }
                else {
                    errmsg = 'Data not found.';
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

}


function HandoverGatepass_HHT_OnSubmitRemark() {

    if ($("#txtGatePass").val() == "") {
        $('#lblMessage').text('Please enter/scan gate pass.').css('color', 'red');
        return;
    } else {
        $('#lblMessage').text('');
    }

    if ($("#txRemark").val() == "") {
        $('#lblMessage').text('Please enter remark.').css('color', 'red');
        $("#txRemark").focus()
        return;
    } else {
        $('#lblMessage').text('');
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "HandoverGatepass_HHT",
            data: JSON.stringify({
                'pi_intHAWBRowId': HAWBRowId,
                'pi_strGatePassNo': $("#txtGatePass").val(),
                'pi_strCreatedBy': window.localStorage.getItem("UserName"),
                'pi_strEmpID': $("#txEmployeeID").val(),
                'pi_Remarks': $("#txRemark").val(),
                'pi_strMode': 'R'
            }),
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
                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function () {
                        $('#lblMessage').text('');
                        var Status = $(this).find('Status').text();
                        var StrMessage = $(this).find('OutMsg').text();

                        if (Status == 'E') {
                            $('#lblMessageSuccess').text(StrMessage).css('color', 'red');
                            $('#txRemark').val('');
                        } else {
                            $('#lblMessageSuccess').text(StrMessage).css('color', 'green');
                            $('#txRemark').val('');
                        }

                    });

                    //$(xmlDoc).find('Table').each(function (index) {
                    //    Status = $(this).find('Status').text();
                    //    if (Status == 'S') {
                    //        $.alert($(this).find('OutMsg').text());
                    //        $("#btnGatePassHandover").attr('disabled', 'disabled');
                    //        return false;
                    //    } else {
                    //        $.alert($(this).find('OutMsg').text());
                    //        $("#btnGatePassHandover").removeAttr('disabled');
                    //    }

                    //});

                }
                else {
                    errmsg = 'Data not found.';
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

}