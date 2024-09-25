
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var Uname = window.localStorage.getItem("Uname");
var TotPackages;
var OldLocationId;
var OldLocationPieces;
var strXmlStore;
var locPieces;
var html;
var AL_ROWID_I;
var Zone;
var AWBPkgs;
var TotalScreenedPieces;
$(function () {

    //var name = ['joe', 'mary', 'rose', 'abc', 'xyz'];
    //$.map(name, function (x) {
    //    return $('#ddlExemptCargo').append("<option>" + x + "</option>");
    //});

    //$('#ddlExemptCargo')
    //    .multiselect({
    //        allSelectedText: 'All',
    //        maxHeight: 200,
    //        includeSelectAllOption: true
    //    })
    //    .multiselect('selectAll', false)
    //    .multiselect('updateButtonText');


    //$("#ddlExemptCargo").multiselect("deselectAll", false);


    if (window.localStorage.getItem("RoleExpIntlMvmt") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

});

function temp() {
    var selectedValues = $('#ddlSecurityMethod').val();

}

function GetSecurityType(SC) {

    if (SC == 'EPC') {
        $("#divExemptCargo").show();
    } else {
        $("#divExemptCargo").hide();

    }

    $("#txtScanID").focus();

}

function getAOMValue(code) {

    if (code == 'AOM') {
        $("#txtAOMRemark").removeAttr('disabled');
    } else {
        $("#txtAOMRemark").attr('disabled', 'disabled');
    }

}



function GetEWRNumbersForAWBNumber_HHT() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();

    if (AWBNo == "") {
        //errmsg = "Please enter AWB no.</br>";
        //$.alert(errmsg);
        return;
    }

    if (AWBNo.length != "11") {
        errmsg = "Please enter valid AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "GetEWRNumbersForAWBNumber_HHT",
            data: JSON.stringify({
                'pi_strAWBNo': AWBNo, 'pi_strScreen': ''
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
                var str = response.d
                console.log(response.d);
                var xmlDoc = $.parseXML(str);
                $('#ddlEWRno').empty();
                if (str == '<NewDataSet />') {
                    $.alert('AWB No. Does not exist.');
                    $('.alert_btn_ok').click(function () {

                        $('#txtAWBNo').val('');
                        $('#txtAWBNo').focus()
                    });
                    return;
                }
                $(xmlDoc).find('Table').each(function (index) {

                    EWRNo = $(this).find('EWRNo').text();


                    var newOption = $('<option></option>');
                    newOption.val(EWRNo).text(EWRNo);
                    newOption.appendTo('#ddlEWRno');

                });
                GetAirWayBillByAWB_DIAL_HHT(AWBNo);
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function GetAirWayBillByAWB_DIAL_HHT(AWBNo) {

    // $('#ddlEWRno').empty();

    clearBeforePopulate();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    /* var AWBNo = $('#txtAWBNo').val();*/

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
            url: CMSserviceURL + "GetPieceSecurityScreeningAWBDetails_HHT",
            data: JSON.stringify({
                'pi_strAWBNo': AWBNo,
                'pi_strEWRNo': $('#ddlEWRno').val(),
                'pi_strUsername': Uname,
                'po_strOutput': '',

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
                console.log('GetSecurityScreeningDetails_HHT   ==>   ' + str)
                strXmlStore = str;

                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        AWBPkgs = $(this).find('AWBPkgs').text();
                        AWBGrWt = $(this).find('AWBGrWt').text();
                        AWBChrgWt = $(this).find('AWBChrgWt').text();
                        AL_ROWID_I = $(this).find('AL_ROWID_I').text();
                        Zone = $(this).find('Zone').text();
                        HoldStatus = $(this).find('HoldStatus').text();
                        SecurityStatus = $(this).find('SecurityStatus').text();

                        if (HoldStatus == 'true') {
                            $('#btnHlod').hide();
                            $('#btnUnHlod').show();
                        } else {
                            $('#btnHlod').show();
                            $('#btnUnHlod').hide();
                        }

                        $("#tdPCGRCH").text(AWBPkgs + ' / ' + AWBGrWt + ' / ' + AWBChrgWt);


                        AL_OriginCode_C = $(this).find('AL_OriginCode_C').text();
                        AL_DestinationCode_C = $(this).find('AL_DestinationCode_C').text();


                        $("#tdOrgDes").text(AL_OriginCode_C + ' / ' + AL_DestinationCode_C);

                        TotalScreenedPieces = $(this).find('TotalScreenedPieces').text();
                        ScreeningPieces = $(this).find('ScreeningPieces').text();

                        $("#tdScreePCS").text(TotalScreenedPieces + ' / ' + AWBPkgs);

                        if (parseInt(TotalScreenedPieces) == parseInt(AWBPkgs)) {
                            $("#btnFinalSubmit").removeAttr('disabled');
                            // $("#txtScanID").attr('disabled','disabled');

                        } else {
                            $("#btnFinalSubmit").attr('disabled', 'disabled');
                            // $("#txtScanID").removeAttr('disabled');
                        }

                        if (SecurityStatus == 'true') {
                            $("#btnFinalSubmit").attr('disabled', 'disabled');
                        }

                        //if ($(this).find('LocCode').text() != '') {
                        //    $.alert($(this).find('LocCode').text());
                        //    return;
                        //}

                        //EWRval = $(this).find('EWRNo').text();
                        //EWRno = $(this).find('EWRNo').text();

                        //var newOption = $('<option></option>');
                        //newOption.val(EWRval).text(EWRno);
                        //newOption.appendTo('#ddlEWRno');

                    });



                    //html = '';
                    //html = "<table id='tblNews' border='1' style='table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    //html += "<thead><tr>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Sticker ID</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pieces</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>User ID</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Scan Date/Time</th>";
                    //html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Delete</th>";
                    //html += "</tr></thead>";
                    //html += "<tbody>";

                    //$(xmlDoc).find('Table4').each(function (index) {

                    //    StickerID = $(this).find('StickerID').text();
                    //    Pieces = $(this).find('Pieces').text();
                    //    UserID = $(this).find('UserID').text();
                    //    ScanDatetime = $(this).find('ScanDatetime').text();

                    //    bindPieceDetaildList(StickerID, Pieces, UserID, ScanDatetime);

                    //});

                    //html += "</tbody></table>";
                    //$('#divPieceDetalList').append(html);

                    GetSecurityMethodAndStatus_HHT();
                    GetMachinesForSecScreening_HHT();

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


function GETPCSRefresh(AWBNo) {

    // $('#ddlEWRno').empty();

    //clearBeforePopulate();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    /* var AWBNo = $('#txtAWBNo').val();*/

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
            url: CMSserviceURL + "GetSecurityScreeningDetails_HHT",
            data: JSON.stringify({
                'pi_strAWBNo': AWBNo,
                'pi_strEWRNo': $('#ddlEWRno').val(),
                'pi_strUsername': Uname,
                'po_strOutput': '',

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
                console.log('GetSecurityScreeningDetails_HHT   ==>   ' + str)
                strXmlStore = str;

                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        AWBPkgs = $(this).find('AWBPkgs').text();
                        AWBGrWt = $(this).find('AWBGrWt').text();
                        AWBChrgWt = $(this).find('AWBChrgWt').text();
                        AL_ROWID_I = $(this).find('AL_ROWID_I').text();
                        Zone = $(this).find('Zone').text();
                        HoldStatus = $(this).find('HoldStatus').text();

                        $("#tdPCGRCH").text(AWBPkgs + ' / ' + AWBGrWt + ' / ' + AWBChrgWt);

                        AL_OriginCode_C = $(this).find('AL_OriginCode_C').text();
                        AL_DestinationCode_C = $(this).find('AL_DestinationCode_C').text();


                        $("#tdOrgDes").text(AL_OriginCode_C + ' / ' + AL_DestinationCode_C);

                        TotalScreenedPieces = $(this).find('TotalScreenedPieces').text();
                        ScreeningPieces = $(this).find('ScreeningPieces').text();

                        $("#tdScreePCS").text(TotalScreenedPieces + ' / ' + AWBPkgs);

                        if (parseInt(TotalScreenedPieces) == parseInt(AWBPkgs)) {
                            $("#btnFinalSubmit").removeAttr('disabled');

                            // $("#txtScanID").attr('disabled','disabled');
                            GetEWRNumbersForAWBNumber_HHT();
                        } else {
                            $("#btnFinalSubmit").attr('disabled', 'disabled');
                            // $("#txtScanID").removeAttr('disabled');
                        }
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

function bindPieceDetaildList(StickerID, Pieces, UserID, ScanDatetime, BDRowId) {

    html += "<tr>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;' align='center'>" + StickerID + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;' align='center'>" + Pieces + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;' align='center'>" + UserID + "</td>";
    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;' align='center'>" + ScanDatetime + "</td>";
    html += '<td height="30" onclick="DeleteSecurityScreeningDetails_HHT(\'' + BDRowId + '\')"  style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align: center; vertical-align: middle;" align="center"><span  type="button" id="btnAdd" style="color: red;" class=""><i class="glyphicon glyphicon-trash"></i></span></td>';
    html += "</tr>";

}

function openPiecesListModal() {
    $('#mdlViewPieceID').modal('toggle');
}





function SaveSecurityScreeningDetails_HHT() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();
    var ExemptCargoXml = '';
    var SMXml = '';

    if ($('#txtScanID').val() == "") {
        //errmsg = "Please enter AWB no.</br>";
        //$.alert(errmsg);
        return;
    }

    if (AWBNo == "") {
        //errmsg = "Please enter AWB no.</br>";
        //$.alert(errmsg);
        return;
    }

    if (AWBNo.length != "11") {
        errmsg = "Please enter valid AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    if ($('#ddlMachineNo').val() == "0") {
        errmsg = "Please select Machine No.</br>";
        $.alert(errmsg);
        return;
    }




    var SecurityMethodArray = [];

    $('#divSecurityMethod').each(function () {
        $(this).find("input[type='checkbox']:checked").each(function () {
            /* var id = $(this).attr('id');*/
            SecurityMethodArray.push($(this).attr('id'));
            SMXml += '<ScreeningMethodDtl ScreeningMethodName="' + $(this).attr('id') + '" Pieces = "1" PercPieces = "100" MethodRemark = ""/>';
        });
    });
    SMXml = '<ScreeningMethod>' + SMXml + '</ScreeningMethod>';

    if (SecurityMethodArray.length == 0) {
        errmsg = "Please select at-least one Security Method</br>";
        $.alert(errmsg);
        return;
    }

    if ($('#ddlSecurityStatus').val() == "0") {
        errmsg = "Please select Security Status</br>";
        $.alert(errmsg);
        return;
    }

    if ($('#ddlSecurityType').val() == "0") {
        errmsg = "Please select Security Type</br>";
        $.alert(errmsg);
        return;
    }

    if ($('#ddlSecurityType').val() == "EPC") {
        var ExemptCargoArray = [];

        $('#divExemptCargo').each(function () {
            $(this).find("input[type='checkbox']:checked").each(function () {
                /* var id = $(this).attr('id');*/
                ExemptCargoArray.push($(this).attr('id'));
                ExemptCargoXml += '<ExemptCargoDtl ExemptCargoType="' + $(this).attr('id') + '"  ExemptCargoOTHValue =""/>';
            });
        });
        ExemptCargoXml = '<ExemptCargo>' + ExemptCargoXml + '</ExemptCargo>';

        if (ExemptCargoArray.length == 0) {
            errmsg = "Please select at-least one Exempt Cargo</br>";
            $.alert(errmsg);
            return;
        }
    }

    if (ExemptCargoXml == '') {
        ExemptCargoXml = '<ExemptCargo><ExemptCargoDtl ExemptCargoType=""  ExemptCargoOTHValue ="" />  </ExemptCargo>';
    }




    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "SaveSecurityScreeningDetails_HHT",
            data: JSON.stringify({
                /*'pi_strAWBNo': AWBNo, 'pi_strScreen': ''*/
                'pi_intAWBId': AL_ROWID_I,
                'pi_strEWRNo': $("#ddlEWRno").val(),
                'pi_intScreeningPckg': '1',
                'pi_strScreeningMethod': SMXml, //XML
                'pi_strScreeningStatus': $("#ddlSecurityStatus").val(),
                'pi_strScreeningType': $("#ddlSecurityType").val(),
                'pi_strExemptCargo': ExemptCargoXml,//XML
                'pi_strStartSticker': $("#txtScanID").val(),
                'pi_strEndSticker': '',
                'pi_strRemarks': '',
                'pi_strStatus': '',
                'pi_strUserName': Uname,
                'pi_strInputType': '',
                'pi_strMachineNo': $("#ddlMachineNo").val(),
                'po_strAlert': '',
                'po_strOutput': '',
                'strZone': Zone,
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
                var str = response.d
                // console.log(response.d);
                var xmlDoc = $.parseXML(str);

                //if (str == '<NewDataSet />') {
                //    $.alert('AWB No. Does not exist.');
                //    $('.alert_btn_ok').click(function () {

                //        $('#txtAWBNo').val('');
                //        $('#txtAWBNo').focus()
                //    });
                //    return;
                //}
                $(xmlDoc).find('Table').each(function (index) {
                    Sts = $(this).find('Sts').text();

                    if (Sts == 'C') {
                        $.alert($(this).find('StsMsg').text());
                        $('.alert_btn_ok').click(function () {
                            $('#txtScanID').val('');
                            $('#txtHoldRemark').val('');
                            $('#txtScanID').focus();
                            // $('#txtScanID').val('');

                            GETPCSRefresh(AWBNo);
                        });
                        return;
                    }

                    if (Sts == 'S') {
                        //$.alert($(this).find('StsMsg').text());
                        //$('.alert_btn_ok').click(function () {

                        //});
                        $('#txtScanID').val('');
                        $('#txtHoldRemark').val('');
                        $('#txtScanID').focus();
                        // $('#txtScanID').val('');
                        GETPCSRefresh(AWBNo);
                        return;

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


function Complete_SecuritySecreeningDetails_HHT() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();

    if (AWBNo == "") {
        //errmsg = "Please enter AWB no.</br>";
        //$.alert(errmsg);
        return;
    }

    if (AWBNo.length != "11") {
        errmsg = "Please enter valid AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "Complete_SecuritySecreeningDetails_HHT",
            data: JSON.stringify({
                'pi_strAWBId': AL_ROWID_I,
                'pi_strEWRNo': $("#ddlEWRno").val(),
                'UserName': Uname,
                'Remark': '',
                'Status': 'Y',
                'po_strAlert': '',
                'po_strMessage': '',
                'strZone': Zone
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
                var str = response.d
                // console.log(response.d);
                var xmlDoc = $.parseXML(str);
                $('#ddlEWRno').empty();
                //if (str == '<NewDataSet />') {
                //    $.alert('AWB No. Does not exist.');
                //    $('.alert_btn_ok').click(function () {

                //        $('#txtAWBNo').val('');
                //        $('#txtAWBNo').focus()
                //    });
                //    return;
                //}
                $(xmlDoc).find('Table').each(function (index) {
                    Sts = $(this).find('Sts').text();
                    StsMsg = $(this).find('StsMsg').text();


                    if (Sts == 'C') {
                        $.alert($(this).find('StsMsg').text());
                        $('.alert_btn_ok').click(function () {
                            GetEWRNumbersForAWBNumber_HHT();
                        });
                        return;
                    }


                });
                //GetAirWayBillByAWB_DIAL_HHT(AWBNo);
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}





function SelectLocationInfo(a) {
    //alert(a.rowIndex);

    var xmlDoc = $.parseXML(strXmlStore);

    $(xmlDoc).find('Table').each(function (index) {

        if (index == a.rowIndex - 1) {
            $('#txtFromLocation').val($(this).find('Location').text());
            $('#txtTotalPkg').val($(this).find('LocatedPieces').text());
            OldLocationId = $(this).find('LocationId').text();
        }

    });
}

function clearALL() {
    $('#txtAWBNo').val('');
    $('#ddlEWRno').empty();
    $('#txtHoldRemark').val('')
    $('#tdPCGRCH').text('');
    $('#tdOrgDes').text('');
    $('#tdScreePCS').text('');

    $('#ddlMachineNo').empty('');

    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlMachineNo');

    $('#ddlSecurityStatus').empty('');

    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlSecurityStatus');

    $('#ddlSecurityType').empty('');

    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlSecurityType');

    $('#divSecurityMethod').empty();
    $('#divExemptCargo').empty();

    $('#txtAOMRemark').val('');
    $('#txtScanID').val('');

}

function clearBeforePopulate() {
    $('#txtFromLocation').val('');
    $('#txtTotalPkg').val('');
    $('#txtMovePackages').val('');
    $('#txtNewLocation').val('');

    $('#txtOrigin').val('');
    $('#txtDestination').val('');
    $('#txtCommodity').val('');
    $('#txtTotalPkg').val('');
    $('#txtLoader').val('');

    $('#divAddLocation').empty();
    html = '';
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}


function GetSecurityMethodAndStatus_HHT() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "GetSecurityMethodAndStatus_HHT",
            data: JSON.stringify({

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
                var str = response.d
                //console.log(response.d);
                var xmlDoc = $.parseXML(str);
                $('#divSecurityMethod').empty();
                $('#divExemptCargo').empty();
                $('#divExemptCargo').hide();
                $('#ddlSecurityType').empty();
                $('#ddlSecurityStatus').empty();
                //if (str == '<NewDataSet />') {
                //    $.alert('AWB No. Does not exist.');
                //    $('.alert_btn_ok').click(function () {

                //        $('#txtAWBNo').val('');
                //        $('#txtAWBNo').focus()
                //    });
                //    return;
                //}
                $(xmlDoc).find('Table1').each(function (index) {

                    Code = $(this).find('Code').text();
                    Status = $(this).find('Status').text();
                    IsDefault = $(this).find('IsDefault').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlSecurityStatus');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(Code).text(Status);
                    newOption.appendTo('#ddlSecurityStatus');

                });

                $(xmlDoc).find('Table2').each(function (index) {

                    Code = $(this).find('Code').text();
                    Method = $(this).find('Method').text();
                    IsDefault = $(this).find('IsDefault').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlSecurityType');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(Code).text(Method);
                    newOption.appendTo('#ddlSecurityType');

                });
                var myarray = new Array();
                html2 = '';
                html2 += '<div style="margin-bottom: 5px;" class="col-xs-12 col-form-label"><label id="lblSecurityMethod">Security Method</label>';
                html2 += '<font color = "red">*</font></div>';
                $(xmlDoc).find('Table').each(function (index) {

                    Code = $(this).find('Code').text();
                    Method = $(this).find('Method').text();
                    IsDefault = $(this).find('IsDefault').text();
                    ControlName = $(this).find('ControlName').text();
                    ROWID = $(this).find('ROWID').text();

                    //var newOption = $('<option></option>');
                    //newOption.val(Code).text(Method);
                    //newOption.appendTo('#ddlSecurityMethod');


                    // myarray.push(Method);



                    //REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    //REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                    if (ControlName == 'Chk') {
                        html2 += '<div class="col-xs-12 col-form-label">';
                        html2 += '<label for="' + Code + '" class="checkbox-inline">' + Method + '';
                        html2 += '<input class="chk" onclick="getAOMValue(\'' + Code + '\');" type="checkbox" id="' + Code + '">';
                        html2 += '</label>';
                        html2 += '</div>';
                    }



                });
                $('#divSecurityMethod').append(html2);

                html3 = '';
                html3 += '<div style="margin-bottom: 5px;" class="col-xs-12 col-form-label"><label id="lblSecurityMethod">Exempt Cargo</label>';
                html3 += '<font color = "red">*</font></div>';
                $(xmlDoc).find('Table3').each(function (index) {

                    Code = $(this).find('Code').text();
                    Method = $(this).find('Method').text();


                    //var newOption = $('<option></option>');
                    //newOption.val(Code).text(Method);
                    //newOption.appendTo('#ddlSecurityMethod');


                    // myarray.push(Method);



                    //REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    //REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();

                    html3 += '<div class="col-xs-12 col-form-label">';
                    html3 += '<label for="' + Code + '" class="checkbox-inline">' + Method + '';
                    html3 += '<input type="checkbox" id="' + Code + '">';
                    html3 += '</label>';
                    html3 += '</div>';


                });
                $('#divExemptCargo').append(html3);
                //var TypelVal = myarray.join(",");

                //result = TypelVal.split(',');
                ////  var name = ['joe', 'mary', 'rose'];
                //console.log(result)
                //$.map(result, function (x) {
                //    return $('#ddlSecurityMethod').append("<option>" + x + "</option>");
                //});

                //$('#ddlSecurityMethod')
                //    .multiselect({
                //        allSelectedText: 'Select',
                //        maxHeight: 200,
                //        includeSelectAllOption: true
                //    })
                //    .multiselect('selectAll', false)
                //    .multiselect('updateButtonText');


                //$("#ddlSecurityMethod").multiselect("deselectAll", false);

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function GetMachinesForSecScreening_HHT() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "GetMachinesForSecScreening_HHT",
            data: JSON.stringify({

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
                var str = response.d
                //console.log(response.d);
                var xmlDoc = $.parseXML(str);
                //if (str == '<NewDataSet />') {
                //    $.alert('AWB No. Does not exist.');
                //    $('.alert_btn_ok').click(function () {

                //        $('#txtAWBNo').val('');
                //        $('#txtAWBNo').focus()
                //    });
                //    return;
                //}
                $('#ddlMachineNo').empty();
                $(xmlDoc).find('Table').each(function (index) {

                    MachineNo = $(this).find('MachineNo').text();


                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlMachineNo');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(MachineNo).text(MachineNo);
                    newOption.appendTo('#ddlMachineNo');

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


function GetAirWayBillByAWB_DIAL_HHT_for_Modal() {

    // $('#ddlEWRno').empty();


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

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
            url: CMSserviceURL + "GetPieceSecurityScreeningPieceDetails_HHT",
            data: JSON.stringify({
                'pi_strAWBNo': AWBNo,
                'pi_strEWRNo': $('#ddlEWRno').val(),
                'pi_strUsername': Uname,
                'po_strOutput': '',

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
                // console.log('GetSecurityScreeningDetails_HHT' + str)
                strXmlStore = str;
                $('#divPieceDetalList').empty();
                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);



                    html = '';
                    html = "<table id='tblNews' border='1' style='table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Sticker ID</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pieces</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>User ID</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Scan Date/Time</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Delete</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    $(xmlDoc).find('Table').each(function (index) {

                        StickerID = $(this).find('StickerID').text();
                        Pieces = $(this).find('Pieces').text();
                        UserID = $(this).find('UserID').text();
                        ScanDatetime = $(this).find('ScanDatetime').text();
                        BDRowId = $(this).find('BDRowId').text();

                        bindPieceDetaildList(StickerID, Pieces, UserID, ScanDatetime, BDRowId);

                    });

                    html += "</tbody></table>";
                    $('#divPieceDetalList').append(html);
                    $('#mdlViewPieceID').modal('show');


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


function DeleteSecurityScreeningDetails_HHT(BDRowId) {


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

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
            url: CMSserviceURL + "DeleteSecurityScreeningDetails_HHT",
            data: JSON.stringify({

                'pi_intAWBId': AL_ROWID_I,
                'pi_intBDRowId': '0',
                'pi_strUserName': Uname,
                'pi_strRemarks': BDRowId,
                'po_strAlert': '',
                'po_strOutput': ''

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
                console.log('save' + str)
                strXmlStore = str;
                $('#divPieceDetalList').empty();
                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);
                    $(xmlDoc).find('Table').each(function (index) {
                        Sts = $(this).find('Sts').text();
                        $('#mdlViewPieceID').modal('hide');
                        if (Sts == 'C') {
                            $.alert($(this).find('StsMsg').text());

                            $('.alert_btn_ok').click(function () {
                                GetEWRNumbersForAWBNumber_HHT();

                            });
                            return;
                        }



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


function ScreeningHold_DIAL_HHT(flag) {
    var strHN;
    if (flag == 'true') {
        strHN = 'Hold';
    } else {
        strHN = 'Un-Hold';
    }

    if (confirm('Are you sure want to ' + strHN + ' the shipment?')) {

        var connectionStatus = navigator.onLine ? 'online' : 'offline'
        var errmsg = "";

        var AWBNo = $('#txtAWBNo').val();

        if (AWBNo == '') {
            return;
        }

        if (AWBNo != '' && AWBNo.length != '11') {
            errmsg = "Please enter valid AWB No.";
            $.alert(errmsg);
            return;
        }

        if ($('#txtHoldRemark').val() == '') {
            errmsg = "Please enter the remarks";
            $.alert(errmsg);
            return;
        }

        if (errmsg == "" && connectionStatus == "online") {
            $.ajax({
                type: 'POST',
                url: CMSserviceURL + "ScreeningHold_DIAL_HHT",
                data: JSON.stringify({

                    'pi_strAWBNo': $('#txtAWBNo').val(),
                    'pi_strHoldRemarks': $('#txtHoldRemark').val(),
                    'pi_blnHoldStatus': flag,
                    'pi_strUsername': Uname + '~' + 'HHT',
                    'po_ErrorMsg': '',
                    'po_strOutStatus': ''

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
                    console.log('save' + str)
                    strXmlStore = str;
                    if (flag == 'true') {
                        $('#btnHlod').hide();
                        $('#btnUnHlod').show();
                    } else {
                        $('#btnHlod').show();
                        $('#btnUnHlod').hide();
                    }
                    if (str != null && str != "") {

                        var xmlDoc = $.parseXML(str);
                        $(xmlDoc).find('Table').each(function (index) {
                            Sts = $(this).find('Sts').text();

                            if (Sts == 'C') {
                                $.alert($(this).find('StsMsg').text());

                                $('.alert_btn_ok').click(function () {
                                    $('#txtHoldRemark').val('');
                                    GetEWRNumbersForAWBNumber_HHT();

                                });
                                return;
                            }



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
    } else {
        // Do nothing!
        // console.log('Thing was not saved to the database.');
    }
}
