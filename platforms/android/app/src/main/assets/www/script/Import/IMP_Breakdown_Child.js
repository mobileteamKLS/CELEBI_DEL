
var Userid = window.localStorage.getItem("Userid");
var User_Name = window.localStorage.getItem("User_Name");
var User_group = window.localStorage.getItem("User_group");
var ARE_USER_MOVEMENTS_LOGGED = window.localStorage.getItem("ARE_USER_MOVEMENTS_LOGGED");
var ISO_COUNTRY_CODE = window.localStorage.getItem("ISO_COUNTRY_CODE");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var NAME_OF_CITY_I300 = window.localStorage.getItem("NAME_OF_CITY_I300");
var SHED_CODE = window.localStorage.getItem("SHED_CODE");
var SHED_DESCRIPTION = window.localStorage.getItem("SHED_DESCRIPTION");
var PRIMARY_CURRENCY_CODE_I606 = window.localStorage.getItem("PRIMARY_CURRENCY_CODE_I606");
var CompanyCode = window.localStorage.getItem("CompanyCode");
var flightSeqNo;
var ULDSeqNo;
var SavedULDSeqNo;
var isFoundCargo;
var flightPrefix;
var flightNo;
var flightDate;
var selectedRowULDNo;
var selectedRowAWBNo;
var selectedRowHAWBNo;
var selectedRowULDid;
var xmlDamageType, HAWBLists = [];
var dmgType = '';
var HAWB_Flag;
var showAll = 'N';

$(function () {

    flightPrefix = amplify.store("flightPrefix");
    flightNo = amplify.store("flightNo");
    flightDisplayDate = amplify.store("flightDisplayDate");
    flightDate = amplify.store("flightDate");

    selectedRowULDNo = amplify.store("selectedRowULDNo");
    selectedRowAWBNo = amplify.store("selectedRowAWBNo");
    selectedRowHAWBNo = amplify.store("selectedRowHAWBNo");
    selectedRowULDid = amplify.store("selectedRowULDid");

    if (selectedRowULDNo != '') {
        //showAll = 'Y';
        chkShowAll.checked = true;
    }

    $('#txtFltNo').text(flightPrefix.toUpperCase() + flightNo.toUpperCase());
    $('#txtFltDate').text(flightDisplayDate);
    flightSeqNo = amplify.store("flightSeqNo");
    if (flightSeqNo != "") {

        GetULDDetails();
    }

    //$('#ddlULDNo').select2();
    //$('#ddlAWBNo').select2();


    //$('#txtScanULD').on('blure', function () {
    $("#txtScanULD").blur(function () {

        if ($("#txtScanULD").val() != '') {
            var value = this.value;// parseInt(this.value, 10),
            var result = value.replace(/^(.{3})(.{5})(.*)$/, "$1 $2 $3");
            dd = document.getElementById('ddlULDNo'),
                index = 0;

            $.each(dd.options, function (i) {
                if (this.text == result) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                //errmsg = "Please scan/enter valid ULD No.";
                //$.alert(errmsg);
                $('#successMsg').text('Please scan/select valid ULD No.').css('color', 'red');
                return;
            } else {
                $('#successMsg').text('');
            }
            console.log(dd.selectedIndex);
            $('#ddlULDNo').trigger('change');
        }
    });




    $("#txtScanAWBNo").blur(function () {

        if ($("#txtScanAWBNo").val() != '') {
            var value = this.value;// parseInt(this.value, 10),

            var res = value.replace(/(\d{3})/, "$1-")
            dd = document.getElementById('ddlAWBNo'),
                index = 0;

            $.each(dd.options, function (i) {
                console.log(this.text);
                if (this.text == res) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                // errmsg = "Please scan/enter valid AWB No.";
                // $.alert(errmsg);
                $('#successMsg').text('Please scan/enter valid AWB No.').css('color', 'red');
                return;
            }
            console.log(dd.selectedIndex);
            $('#successMsg').text('');
            $('#ddlAWBNo').trigger('change');
            //  $('#hawbLists').focus();

            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }
    });



    //$('#hawbLists').off('touchstart mousedown').on('touchstart mousedown', function (e) {
    //    e.stopPropagation();
    //});

    $("#hawbLists").blur(function () {

        if ($("#hawbLists").val() != '') {
            var value = this.value;// parseInt(this.value, 10),
            dd = document.getElementById('ddlHAWBNo'),
                index = 0;

            $.each(dd.options, function (i) {
                console.log(this.text);
                if (this.text == value) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                // errmsg = "Please scan/enter valid HAWB No.";
                // $.alert(errmsg);
                $('#successMsg').text('Please scan/enter valid HAWB No.').css('color', 'red');
                return;
            }
            console.log(dd.selectedIndex);
            $('#successMsg').text('');
            $('#ddlHAWBNo').trigger('change');


            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }
    });



    $('#ddlDamageType').change(function () {
        dmgType = $(this).val();

    });

    //var stringos = 'ECC,PER,GEN,DGR,HEA,AVI,BUP,EAW,EAP';
    //SHCSpanHtml(stringos);

});

function BacktoFlightCheck() {
    // set urs global variable here
    //amplify.store("flightSeqNo", flightSeqNo)
    amplify.store("flightPrefix", flightPrefix)
    amplify.store("flightNo", flightNo)
    amplify.store("flightDate", flightDate)
    window.location.href = 'IMP_Breakdown_Parant.html';
}


//function getULDtext() {

//    var value = this.value;// parseInt(this.value, 10),
//    dd = document.getElementById('ddlULDNo'),
//    index = 0;

//    $.each(dd.options, function (i) {
//        if (this.text <= value) {
//            index = i;
//        }
//    });

//    dd.selectedIndex = index; // set selected option
//    console.log(dd.selectedIndex)

//}


function SHCSpanHtml(newSHC) {
    var spanStr = "<tr class=''>";
    var newSpanSHC = newSHC.split(',');
    var filtered = newSpanSHC.filter(function (el) {
        return el != "";
    });
    //for (var n = 0; n < filtered.length; n++) {
    //    spanStr += "<td class='foo'>" + filtered[n] + "</td>";
    //    if (filtered[n] == "DGR") {

    //        spanStr += "<td class='blink_me'>" + filtered[n] + "</td>";

    //    }
    //}

    for (var n = 0; n < filtered.length; n++) {
        var blink = filtered[n].split('~');

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'Y' && filtered[n] != '~Y') {
                spanStr += "<td class='blink_me'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}





function CheckVAlidationHAWB() {
    if (HAWB_Flag == 'M' && $('#ddlHAWBNo').val() == '0') {
        $('#successMsg').text('Please select HAWB No.').css('color', 'red');
        //  $('#hawbLists').focus();
        $('#txtScanGroupId').val('');
        return;
    } else {
        $('#successMsg').text('');
    }
}

function GetULDDetails() {

    clearPiecesInfo();

    $('#ddlULDNo').empty();
    $('#ddlDamageType').empty();

    $('#ddlAWBNo').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlAWBNo');

    $('#ddlHAWBNo').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlHAWBNo');

    if (chkShowAll.checked || selectedRowULDNo != '')
        showAll = 'Y';
    else
        showAll = 'N';

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    var flightCheckUldSeqNo = '';

    if (selectedRowULDid > Number(0))
        flightCheckUldSeqNo = selectedRowULDid;

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + flightCheckUldSeqNo + '</UlDSeqNo><AWBId></AWBId><HAWBId></HAWBId><AirportCity>' + AirportCity + '</AirportCity><ShowAll>' + showAll + '</ShowAll></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: ACSServiceURL + "/GetImportULDDetailsV3",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                xmlDamageType = xmlDoc;

                $(xmlDoc).find('Table1').each(function (index) {

                    var ULDId;
                    var ULD;
                    ULDId = $(this).find('ULDId').text();
                    ULD = $(this).find('ULD').text();

                    var newOption = $('<option></option>');
                    newOption.val(ULDId).text(ULD);
                    newOption.appendTo('#ddlULDNo');

                    if (selectedRowULDNo != '') {
                        $("#ddlULDNo option").each(function () {
                            if ($(this).text() == selectedRowULDNo) {
                                $(this).attr('selected', 'selected');
                                var selectedMawbId = $(this).val();

                                GetHAWBDetails(selectedMawbId);
                            }
                        });

                    }

                    if (index == 0) {
                        ULDSeqNo = ULDId;
                    }

                    amplify.store("flightSeqNo", "")
                    amplify.store("flightPrefix", "")
                    amplify.store("flightNo", "")
                    amplify.store("flightDate", "")
                    amplify.store("flightDisplayDate", "")

                    amplify.store("selectedRowULDNo", "")
                    amplify.store("selectedRowAWBNo", "")
                    amplify.store("selectedRowHAWBNo", "")
                    amplify.store("selectedRowULDid", "")

                });



                $("#ddlULDNo option").each(function () {
                    if ($(this).val() == SavedULDSeqNo) {
                        $(this).attr('selected', 'selected');
                    }
                });

                $(xmlDoc).find('Table2').each(function () {

                    _AWBLength = $(xmlDoc).find('Table2').length;
                    console.log(_AWBLength);
                    var AWBId;
                    var AWBNo;
                    AWBId = $(this).find('AWBID').text();
                    AWBNo = $(this).find('AWBPrefix').text() + '-' + $(this).find('AWBNo').text();

                    var newOption = $('<option></option>');
                    newOption.val(AWBId).text(AWBNo);
                    newOption.appendTo('#ddlAWBNo');

                    var a = new Array();
                    $("#ddlAWBNo").children("option").each(function (x) {
                        test = false;
                        b = a[x] = $(this).text();
                        for (i = 0; i < a.length - 1; i++) {
                            if (b == a[i]) test = true;
                        }
                        if (test) $(this).remove();
                    });

                    if (selectedRowAWBNo != '') {
                        $("#ddlAWBNo option").each(function () {
                            if ($(this).text() == selectedRowAWBNo) {
                                $(this).attr('selected', 'selected');
                                var selectedMawbId = $(this).val();

                                GetHAWBDetails(selectedMawbId);
                            }
                        });
                    }

                });

                $(xmlDoc).find('Table5').each(function () {

                    var AWBId;
                    var AWBNo;
                    DamageCode = $(this).find('DamageCode').text();
                    DamageType = $(this).find('DamageType').text();

                    var newOption = $('<option></option>');
                    newOption.val(DamageCode).text(DamageType);
                    newOption.appendTo('#ddlDamageType');

                });

                //var selected_ddlDamageType = window.localStorage.getItem('selected_ddlDamageType');
                //SelectElement("ddlDamageType", selected_ddlDamageType);
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
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

function GetAWBDetailsForULD(ULDid) {

    $("#hawbLists").val('');
    if (chkShowAll.checked || selectedRowULDNo != '')
        showAll = 'Y';
    else
        showAll = 'N';

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    clearPiecesInfo();

    ULDSeqNo = ULDid;

    inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + ULDid + '</UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity><ShowAll>' + showAll + '</ShowAll></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: ACSServiceURL + "/GetImportULDDetailsV3",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                $(ddlAWBNo).empty();
                var newOption = $('<option></option>');
                newOption.val(0).text('Select');
                newOption.appendTo('#ddlAWBNo');
                $(xmlDoc).find('Table2').each(function (index) {

                    var AWBId;
                    var AWBNo;
                    AWBId = $(this).find('AWBID').text();
                    AWBNo = $(this).find('AWBPrefix').text() + '-' + $(this).find('AWBNo').text();

                    if (index == 0 && $("#ddlAWBNo").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlAWBNo');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(AWBId).text(AWBNo);
                    newOption.appendTo('#ddlAWBNo');

                    var a = new Array();
                    $("#ddlAWBNo").children("option").each(function (x) {
                        test = false;
                        b = a[x] = $(this).text();
                        for (i = 0; i < a.length - 1; i++) {
                            if (b == a[i]) test = true;
                        }
                        if (test) $(this).remove();
                    });

                    $("#txtScanAWBNo").focus();


                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
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


function UpdateImportULDClose() {


    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";




    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + ULDid + '</UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity><ShowAll>' + showAll + '</ShowAll></Root>';
    inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULDNo').val() + '</ULDSeqNo><UserId>' + Userid + '</UserId><AirportCity>' + AirportCity + '</AirportCity><IsConfirm>N</IsConfirm></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: ACSServiceURL + "/UpdateImportULDClose",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                $(ddlAWBNo).empty();
                var newOption = $('<option></option>');
                newOption.val(0).text('Select');
                newOption.appendTo('#ddlAWBNo');
                $(xmlDoc).find('Table').each(function (index) {

                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'S') {
                        $('#successMsg').text(StrMessage).css('color', 'green');

                    } else if (Status == 'E') {

                        $('#successMsg').text(StrMessage).css('color', 'red');
                    } else if (Status == 'C') {

                        if (confirm(StrMessage)) {
                            // Save it!
                            UpdateImportULDCloseOnconfirm();
                            //console.log('Thing was saved to the database.');
                        } else {
                            // Do nothing!
                            // console.log('Thing was not saved to the database.');
                        }

                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
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


function UpdateImportULDCloseOnconfirm() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";




    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + ULDid + '</UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity><ShowAll>' + showAll + '</ShowAll></Root>';
    inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULDNo').val() + '</ULDSeqNo><UserId>' + Userid + '</UserId><AirportCity>' + AirportCity + '</AirportCity><IsConfirm>Y</IsConfirm></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: ACSServiceURL + "/UpdateImportULDClose",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                $(ddlAWBNo).empty();
                var newOption = $('<option></option>');
                newOption.val(0).text('Select');
                newOption.appendTo('#ddlAWBNo');
                $(xmlDoc).find('Table').each(function (index) {

                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'S') {
                        $('#successMsg').text(StrMessage).css('color', 'green');

                    } else if (Status == 'E') {

                        $('#successMsg').text(StrMessage).css('color', 'red');
                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
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


function checkLocation() {

    gid = $('#txtScanGroupId').val();
    $('#txtScanGroupId').val(gid);
    // $('#txtArrivedPkgs').focus();



    //if (HAWBLists.length > 0) {

    //    $('#successMsg').text('Please select HAWB No.').css('color', 'red');
    //    $('#hawbLists').focus();
    //    return;

    //} else {
    //    $('#successMsg').text('');

    //}


}


function UpdateAWBDetails() {

    if (isFoundCargo == true) {
        SaveImportFoundCargoDetailsV3();

    }

    else {
        SaveImportMaifestDetailsV3();
    }

}

function SaveImportFoundCargoDetailsV3() {

    var isOverride = 'N';

    SavedULDSeqNo = '';

    var selectedUld;
    var selectedAWB;
    var selectedHAWB;
    var GroupId = $('#txtScanGroupId').val();

    selectedUld = $('#ddlULDNo').find('option:selected').text();
    selectedAWB = $('#ddlAWBNo').find('option:selected').text();
    selectedHAWB = $('#ddlHAWBNo').find('option:selected').text();

    if (document.getElementById('chkFoundCgo').checked) {

        if ($('#txtFoundMAWB').val() == "" && $('#txtFoundHAWB').val() == "") {
            //errmsg = "Please enter found cargo MAWB/HAWB No.";
            //$.alert(errmsg);
            $('#successMsg').text('Please enter found cargo MAWB/HAWB No.').css('color', 'red');
            $('#txtFoundMAWB').focus();
            return;
        } else {
            $('#successMsg').text('');
        }

        //if ($('#txtScanGroupId').val() == '') {
        //    errmsg = "Please scan/enter group Id.";
        //    $.alert(errmsg);
        //    return;
        //}

        if ($('#txtFoundPkgs').val() == "") {
            //errmsg = "Please enter found pkgs";
            //$.alert(errmsg);
            //return;
            $('#successMsg').text('Please enter found pkgs').css('color', 'red');
            $('#txtFoundPkgs').focus();
            return;
        } else {
            $('#successMsg').text('');
        }

        if ($('#txtFoundPkgsWt').val() == "") {
            //errmsg = "Please enter found pkgs wt.";
            //$.alert(errmsg);
            //return;
            $('#successMsg').text('Please enter found pkgs wt.').css('color', 'red');
            $('#txtFoundPkgsWt').focus();
            return;
        } else {
            $('#successMsg').text('');
        }
    }
    else {

        //if ($('#txtScanGroupId').val() == '') {
        //    errmsg = "Please scan/enter group Id.";
        //    $.alert(errmsg);
        //    return;
        //}

        if ($('#txtArrivedPkgs').val() == "" && $('#txtDamagePkgs').val() == "") {
            //errmsg = "Please enter Arrived pkgs";
            //$.alert(errmsg);
            //return;
            $('#successMsg').text('Please enter Arrived pkgs').css('color', 'red');
            $('#txtArrivedPkgs').focus();
            return;
        } else {
            $('#successMsg').text('');
        }
    }

    if (document.getElementById('chkModify').checked)
        isOverride = 'Y';
    else
        isoverride = 'N';

    if ($('#txtDamagePkgs').val() != '' && $('#txtDamageWt').val() == '') {
        //errmsg = "Please enter damage weight";
        //$.alert(errmsg);
        //return;
        $('#successMsg').text('Please enter damage weight').css('color', 'red');
        $('#txtDamagePkgs').focus();
        return;
    } else {
        $('#successMsg').text('');
    }

    if ($('#txtDamagePkgs').val() != '' && $('#ddlDamageType').find('option:selected').text() == 'Select') {
        //errmsg = "Please select damage type";
        //$.alert(errmsg);
        //return;
        $('#successMsg').text('Please select damage type').css('color', 'red');
        $('#txtDamagePkgs').focus();
        return;
    } else {
        $('#successMsg').text('');
    }

    if ($('#txtScanGroupIdFoundCargo').val() == '') {
        //errmsg = "Please enter group Id.";
        //$.alert(errmsg);
        //return;
        $('#successMsg').text('Please enter group Id.').css('color', 'red');
        $('#txtScanGroupIdFoundCargo').focus();
        return;
    } else {
        $('#successMsg').text('');
    }

    var inputXML;
    var serviceName;

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (dmgType != '') {
        dmgType = $('#ddlDamageType').val();
    }

    //inputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + ULDSeqNo + '</UlDSeqNo><AWBNO>MLM</AWBNO><HAWBNO></HAWBNO><NPR>' + $('#txtFoundPkgs').val() + '</NPR><WtRec>' + $('#txtFoundPkgsWt').val() + '</WtRec><DMGPsc>' + $('#txtDamagePkgs').val() + '</DMGPsc><DMGWt></DMGWt><DMGCode></DMGCode><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
    inputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + $('#ddlULDNo').val() + '</UlDSeqNo><AWBNO>' + $('#txtFoundMAWB').val() + '</AWBNO><HAWBNO>' + $('#txtFoundHAWB').val() + '</HAWBNO><NPR>' + $('#txtFoundPkgs').val() + '</NPR><WtRec>' + $('#txtFoundPkgsWt').val() + '</WtRec><DMGPsc>' + $('#txtDamagePkgs').val() + '</DMGPsc><DMGWt>' + $('#txtDamageWt').val() + '</DMGWt><DMGCode>' + dmgType + '</DMGCode><UserId>' + Userid + '</UserId><AirportCity>' + AirportCity + '</AirportCity><GroupId>' + $('#txtScanGroupIdFoundCargo').val().toUpperCase() + '</GroupId></Root>';
    serviceName = 'SaveImportFoundCargoDetailsV3';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: ACSServiceURL + '/SaveImportFoundCargoDetailsV3',
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
                //setting select value in local storage
                var e = document.getElementById("ddlDamageType");
                // var ddlDamageType = e.options[e.selectedIndex].value;

                // var e = document.getElementById("ddlViewBy");
                // var ddlDamageType = e.options[e.selectedIndex].text;
                // console.log("ddlDamageType selected ", ddlDamageType);
                window.localStorage.setItem('selected_ddlDamageType', ddlDamageType);
                $(xmlDoc).find('Table').each(function () {

                    //if ($(this).find('StrMessage').text() != '')
                    //    $.alert($(this).find('StrMessage').text());
                    //else
                    //    $.alert('Success');
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'S') {
                        $('#successMsg').text(StrMessage).css('color', 'green');
                        GetAWBDetailsForULD($('#ddlULDNo').val())

                        $('#txtScanAWBNo').focus();
                        $('#ddlAWBNo').val(0);
                        $('#ddlHAWBNo').val(0);
                        $('#txtAwbNo').val('');
                        $('#txtFoundMAWB').val('')
                        $('#txtFoundHAWB').val('');
                        $('#txtMnifestedPkg').val('');
                        $('#txtArrivedPkgs').val('');
                        $('#txtDamagePkgs').val('');
                        $('#txtDamageWt').val('');
                        $('#ddlDamageType').val(0);
                        $('#txtFoundPkgs').val('');
                        $('#txtFoundPkgsWt').val('');
                        GetULDDetails();
                        // GetAWBDetailsForULD($('#ddlULDNo').val())
                        // GetHAWBDetails($('#ddlAWBNo').val())
                        var ULDVal = $('#ddlULDNo').val();
                        // GetHAWBDetails($('#ddlAWBNo').val())
                        $('#ddlAWBNo').empty();
                        // GetULDDetails();
                    } else if (Status == 'E') {
                        GetAWBDetailsForULD($('#ddlULDNo').val());
                        $('#txtScanGroupIdFoundCargo').val('');
                        $('#txtScanGroupIdFoundCargo').focus();
                        $('#successMsg').text(StrMessage).css('color', 'red');
                    }


                });



                // GetULDDetails();

                SavedULDSeqNo = ULDSeqNo;

                //$("#ddlULDNo option").each(function () {
                //    if ($(this).val() == ULDSeqNo) {
                //        $(this).attr('selected', 'selected');
                //    }
                //});                

                //$('#ddlULDNo option[value="742"]').attr('selected', true)
                //if (flightSeqNo != "") {
                //    GetULDDetails();
                //}

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}




function SaveImportMaifestDetailsV3() {



    var isOverride = 'N';

    SavedULDSeqNo = '';

    var selectedUld;
    var selectedAWB;
    var selectedHAWB;
    var GroupId = $('#txtScanGroupId').val();

    selectedUld = $('#ddlULDNo').find('option:selected').text();
    selectedAWB = $('#ddlAWBNo').find('option:selected').text();
    selectedHAWB = $('#ddlHAWBNo').find('option:selected').text();

    if (document.getElementById('chkFoundCgo').checked) {

        if ($('#txtFoundMAWB').val() == "" && $('#txtFoundHAWB').val() == "") {
            //errmsg = "Please enter found cargo MAWB/HAWB No.";
            //$.alert(errmsg);
            $('#successMsg').text('Please enter found cargo MAWB/HAWB No.').css('color', 'red');
            return;
        } else {
            $('#successMsg').text('');
        }

        //if ($('#txtScanGroupId').val() == '') {
        //    errmsg = "Please scan/enter group Id.";
        //    $.alert(errmsg);
        //    return;
        //}

        if ($('#txtFoundPkgs').val() == "") {
            //errmsg = "Please enter found pkgs";
            //$.alert(errmsg);
            $('#successMsg').text('Please enter found pkgs').css('color', 'red');
            $('#txtFoundPkgs').focus();
            return;
        } else {
            $('#successMsg').text('');
        }

        if ($('#txtFoundPkgsWt').val() == "") {
            //errmsg = "Please enter found pkgs wt.";
            //$.alert(errmsg);
            $('#successMsg').text('Please enter found pkgs wt.').css('color', 'red');
            $('#txtFoundPkgsWt').focus();
            return;
        } else {
            $('#successMsg').text('');
        }
    }
    else {

         if ($('#ddlAWBNo').val() == '0') {
            errmsg = "Please scan/select MAWB No.";
            $.alert(errmsg);
            return;
         }

         if ($('#ddlAWBNo').val() == "0") {
             //errmsg = "Please enter Arrived pkgs";
             //$.alert(errmsg);
             $('#successMsg').text('Please scan/select MAWB No.').css('color', 'red');
             $('#txtScanAWBNo').focus();
             return;
         } else {
             $('#successMsg').text('');
         }

         if ($("#ddlHAWBNo option").length > 1) {
             //errmsg = "Please enter Arrived pkgs";
             //$.alert(errmsg);
             $('#successMsg').text('Please scan/select HAWB No.').css('color', 'red');
             $('#txtScanAWBNo').focus();
             return;
         } else {
             $('#successMsg').text('');
         }

         if ($('#txtArrivedPkgs').val() == "" && $('#txtDamagePkgs').val() == "") {
             //errmsg = "Please enter Arrived pkgs";
             //$.alert(errmsg);
             $('#successMsg').text('Please enter Arrived NoP.').css('color', 'red');
             $('#txtArrivedPkgs').focus();
             return;
         } else {
             $('#successMsg').text('');
         }
    }

    if (document.getElementById('chkModify').checked)
        isOverride = 'Y';
    else
        isoverride = 'N';

    if ($('#txtDamagePkgs').val() != '' && $('#txtDamageWt').val() == '') {
        //errmsg = "Please enter damage weight";
        //$.alert(errmsg);
        $('#successMsg').text('Please enter damage weight').css('color', 'red');
        $('#txtDamagePkgs').focus();
        return;
    } else {
        $('#successMsg').text('');
    }

    if ($('#txtDamagePkgs').val() != '' && $('#ddlDamageType').find('option:selected').text() == 'Select') {
        //errmsg = "Please select damage type";
        //$.alert(errmsg);
        $('#successMsg').text('Please select damage type').css('color', 'red');
        $('#txtDamagePkgs').focus();
        return;
    } else {
        $('#successMsg').text('');
    }

    //if ($(this).find('StrMessage').text() != '') {
    //    $('#successMsg').text($(this).find('StrMessage').text()).css('color', 'green');
    //} else {
    //    $('#successMsg').text('');
    //}

    // if ($('#txtScanGroupId').val() == '') {
    //     //errmsg = "Please enter group Id.";
    //     //$.alert(errmsg);
    //     $('#successMsg').text('Please enter group Id.').css('color', 'red');
    //     $('#txtScanGroupId').focus();
    //     return;
    // } else {
    //     $('#successMsg').text('');
    // }


    //if (HAWBLists.length > 0) {
    //    $('#successMsg').text('Please select HAWB No.').css('color', 'red');
    //    $('#hawbLists').focus();
    //    return;
    //} else {
    //    $('#successMsg').text('');
    //}


    var inputXML;
    var serviceName;

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (dmgType != '') {
        dmgType = $('#ddlDamageType').val();
    }

    inputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + $('#ddlULDNo').val() + '</UlDSeqNo><AWBId>' + $('#ddlAWBNo').find('option:selected').val() + '</AWBId><HAWBId>' + $('#ddlHAWBNo').find('option:selected').val() + '</HAWBId><NPR>' + $('#txtArrivedPkgs').val() + '</NPR><DMGPsc>' + $('#txtDamagePkgs').val() + '</DMGPsc><DMGWt>' + $('#txtDamageWt').val() + '</DMGWt><DMGCode>' + dmgType + '</DMGCode><UserId>' + Userid + '</UserId><AirportCity>' + AirportCity + '</AirportCity><IsOverride>' + isOverride + '</IsOverride><GroupId>' + GroupId + '</GroupId></Root>';
    //inputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><ID>' + $('#ddlAWBNo').find('option:selected').val() + '</ID><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
    console.log(inputXML)
    serviceName = 'SaveImportMaifestDetailsV3';



    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: ACSServiceURL + "/" + serviceName,
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
                //setting select value in local storage
                var e = document.getElementById("ddlDamageType");
                // var ddlDamageType = e.options[e.selectedIndex].value;

                // var e = document.getElementById("ddlViewBy");
                // var ddlDamageType = e.options[e.selectedIndex].text;
                // console.log("ddlDamageType selected ", ddlDamageType);
                window.localStorage.setItem('selected_ddlDamageType', ddlDamageType);
                $(xmlDoc).find('Table').each(function () {

                    //if ($(this).find('StrMessage').text() != '')
                    //    $.alert($(this).find('StrMessage').text());
                    //else
                    //    $.alert('Success');
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'S') {
                        $('#successMsg').text(StrMessage).css('color', 'green');

                        GetAWBDetailsForULD($('#ddlULDNo').val())

                        $('#txtScanAWBNo').focus();
                        $('#ddlAWBNo').val(0);
                        $('#ddlHAWBNo').val(0);
                        $('#txtAwbNo').val('');
                        $('#txtFoundMAWB').val('')
                        $('#txtFoundHAWB').val('');
                        $('#txtMnifestedPkg').val('');
                        $('#txtArrivedPkgs').val('');
                        $('#txtDamagePkgs').val('');
                        $('#txtDamageWt').val('');
                        $('#ddlDamageType').val(0);
                        $('#txtFoundPkgs').val('');
                        $('#txtFoundPkgsWt').val('');


                        GetULDDetails();
                        // GetHAWBDetails($('#ddlAWBNo').val())
                        var ULDVal = $('#ddlULDNo').val();
                        // GetHAWBDetails($('#ddlAWBNo').val())
                        $('#ddlAWBNo').empty();
                        // GetULDDetails();
                    } else if (Status == 'E') {
                        $('#txtScanGroupId').val('');
                        $('#txtScanGroupId').focus();
                        $('#successMsg').text(StrMessage).css('color', 'red');
                    }


                });


                SavedULDSeqNo = ULDSeqNo;

                //$("#ddlULDNo option").each(function () {
                //    if ($(this).val() == ULDSeqNo) {
                //        $(this).attr('selected', 'selected');
                //    }
                //});                

                //$('#ddlULDNo option[value="742"]').attr('selected', true)
                //if (flightSeqNo != "") {
                //    GetULDDetails();
                //}

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }
}

function SelectElement(id, valueToSelect) {
    var element = document.getElementById(id);
    element.value = valueToSelect;
}

function onFocusGroupId() {

    if ($('#txtScanGroupId').val().length == 14) {
        if (HAWB_Flag == 'M' && $('#ddlHAWBNo').val() == '0') {
            $('#successMsg').text('Please select HAWB No.').css('color', 'red');
            $('#hawbLists').focus();
            ///  $('#txtScanGroupId').val('');
            return;
        } else {
            $('#successMsg').text('');

            $('#txtArrivedPkgs').focus();
        }

    }

    //if ($('#txtScanGroupId').val().length != 14) {
    //    if (HAWB_Flag == 'M' && $('#ddlHAWBNo').val() == '0') {
    //        $('#successMsg').text('Please select HAWB No.').css('color', 'red');
    //        $('#hawbLists').focus();
    //       // $('#txtScanGroupId').val('');
    //        return;
    //    } else {
    //        $('#successMsg').text('');
    //        $('#txtArrivedPkgs').focus();
    //    }

    //}
    // $('#hawbLists').focus();
}

function foundCargo() {
    if ($('#txtScanGroupIdFoundCargo').val().length == 14) {
        $('#txtFoundPkgs').focus();
    }
}

function onFocusArrivedPkgs() {

    $('#txtArrivedPkgs').focus();

}

function GetHAWBDetails(AWBid) {




    if ($("#ddlAWBNo").val() == '0') {
        return;
    }

    HAWB_Flag = AWBid.split("~")[3];

    if (HAWB_Flag == 'M') {
        $("#hawbLists").focus();

    } else if (HAWB_Flag == 'B') {
        $("#txtScanGroupId").focus();
    }

    HAWBLists = [];
    $("#hawbLists").val('');
    // $("#hawbLists").focus();


    if (chkShowAll.checked || selectedRowULDNo != '')
        showAll = 'Y';
    else
        showAll = 'N';

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    clearPiecesInfo();

    var UldId = $("#ddlULDNo option:selected").val();

    inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + UldId + '</UlDSeqNo><AWBId>' + AWBid + '</AWBId><HAWBId></HAWBId><AirportCity>' + AirportCity + '</AirportCity><ShowAll>' + showAll + '</ShowAll></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: ACSServiceURL + "/GetImportULDDetailsV3",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(ddlHAWBNo).empty();
                var newOption = $('<option></option>');
                newOption.val('0').text('Select');
                newOption.appendTo('#ddlHAWBNo');

                var houseCount = 0;

                $(xmlDoc).find('Table3').each(function (index) {
                    houseCount++;
                });


                $(xmlDoc).find('Table3').each(function (index) {

                    var HAWBId;
                    var HAWBNo;
                    HAWBId = $(this).find('HAWBID').text();
                    HAWBNo = $(this).find('HouseNo').text();
                    var newOption = $('<option></option>');
                    newOption.val(HAWBId).text(HAWBNo);
                    newOption.appendTo('#ddlHAWBNo');

                    HAWBLists.push({ 'value': HAWBId, 'label': HAWBNo })

                    if (selectedRowHAWBNo != '') {
                        //TODO :Change selectedRowHAWBNo to  $("#hawbLists").val()
                        $("#ddlHAWBNo option").each(function () {
                            if ($(this).text() == selectedRowHAWBNo) {
                                $(this).attr('selected', 'selected');
                                var selectedHawbId = $(this).val();

                                GetHAWBLevelPiecesDetails(selectedHawbId);
                            }
                        });
                    }

                });

                if (HAWBLists.length > 0) {
                    $("#hawbLists").autocomplete({
                        minLength: 0,
                        source: HAWBLists,
                        focus: function (event, ui) {
                            // if (this.value == "") {
                            //     $(this).autocomplete("search");
                            // }
                            $("#hawbLists").focus();
                            $("#hawbLists").val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            $("#hawbLists").val(ui.item.label);
                            $('#ddlHAWBNo').val(ui.item.value)
                            GetHAWBLevelPiecesDetails($('#ddlHAWBNo').val());
                            // $("#project-id").val(ui.item.label);
                            return false;
                        }
                    })
                    $("#hawbLists").focus(function () {
                        $(this).autocomplete("search", $(this).val());
                    });

                }


                $(xmlDoc).find('Table4').each(function () {

                    if (houseCount == 0) {
                        $('#txtMnifestedPkg').val($(this).find('NPX').text());

                        $('#txtReceivedPkgs').val($(this).find('NPR').text());
                        $('#txtRemainingPkgs').val($(this).find('RemNOP').text());
                        var newSHC = $(this).find('SHCAll').text();
                        $("#TextBoxDiv").empty();
                        SHCSpanHtml(newSHC);

                    }

                    if ($(this).find('DmgPkgs').text() != 0) {
                        $('#txtDamagePkgsView').val($(this).find('DmgPkgs').text());
                        $('#txtDamageWtView').val($(this).find('DmgWt').text());
                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
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

function GetHAWBLevelPiecesDetails(HAWBid) {

    if (chkShowAll.checked)
        showAll = 'Y';
    else
        showAll = 'N';

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    clearPiecesInfo();

    var AWBId = $("#ddlAWBNo option:selected").val();

    var UldId = $("#ddlULDNo option:selected").val();

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + UldId + '</UlDSeqNo><AWBId>' + AWBid + '</AWBId><HAWBId></HAWBId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    inputxml = ' <Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + UldId + '</UlDSeqNo><AWBId>' + AWBId + '</AWBId><HAWBId>' + HAWBid + '</HAWBId><AirportCity>' + AirportCity + '</AirportCity><ShowAll>' + showAll + '</ShowAll></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            //url: GHAImportFlightserviceURL + "GetImportHouseDetails",
            url: ACSServiceURL + "/GetImportULDDetailsV3",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(xmlDoc).find('Table4').each(function () {

                    $('#txtMnifestedPkg').val($(this).find('NPX').text());
                    $('#txtReceivedPkgs').val($(this).find('NPR').text());
                    $('#txtRemainingPkgs').val($(this).find('RemNOP').text());

                    $('#txtDamagePkgsView').val($(this).find('DmgPkgs').text());
                    $('#txtDamageWtView').val($(this).find('DmgWt').text());
                    var newSHC = $(this).find('SHCAll').text();
                    $("#TextBoxDiv").empty();
                    SHCSpanHtml(newSHC);
                    $('#txtScanGroupId').focus();


                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
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

function EnableFoundCargo() {
    clearALL();
    if (document.getElementById('chkFoundCgo').checked) {

        $('#divNormalCargo').show();
        $('#divFoundCargo').hide();
        $('#divNormalCargoHawb').show();
        $('#foundCargoHint').hide();
        $('#divArrivedPkgs').show();
        $('#divFoundCgoDetails').hide();
        //$('#ddlDamageType').val(0);
        isFoundCargo = '';

        $('#ddlDamageType').empty();
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
    else {


        $('#divNormalCargo').hide();
        $('#divNormalCargoHawb').hide();
        $('#divFoundCargo').show();
        $('#foundCargoHint').show();
        $('#divArrivedPkgs').hide();
        $('#divFoundCgoDetails').show();
        //$('#ddlDamageType').val(0);
        isFoundCargo = true;

        $('#ddlDamageType').empty();
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

function clearALL() {
    $('#txtAwbNo').val('');
    $('#txtFoundMAWB').val('')
    $('#txtFoundHAWB').val('');
    $('#txtMnifestedPkg').val('');
    $('#txtArrivedPkgs').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#ddlDamageType').val(0);
    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#ddlULDNo').val(0);
    $('#ddlAWBNo').val(0);
    $('#ddlHAWBNo').val(0);
    $('#txtReceivedPkgs').val('');
    $('#txtRemainingPkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWtView').val('');
    $("#hawbLists").val('');
    $("#txtScanGroupId").val('');
    $("#txtScanGroupIdFoundCargo").val('');
    $("#txtScanULD").val('');
    $("#txtScanAWBNo").val('');
    $("#txtScanAWBNo").val('');
    $("#txtScanHAWBNo").val('');
    $("#successMsg").text('');
    $('#txtScanULD').focus();
    //$('#chkFoundCgo').attr('checked', false);
    //$('#chkShowAll').attr('checked', false);
    $("#TextBoxDiv").empty();
}

function ShowALLRefresh() {
    clearALL();

    GetULDDetails()
}

function clearPiecesInfo() {
    //  $("#ddlULDNo").trigger('change');
    // GetAWBDetailsForULD($('#ddlULDNo').val())
    $('#txtMnifestedPkg').val('');
    $('#txtArrivedPkgs').val('');
    $('#txtFoundPkgs').val('');
    $('#txtFoundPkgsWt').val('');
    $('#txtReceivedPkgs').val('');
    $('#txtRemainingPkgs').val('');
    $('#txtDamagePkgsView').val('');
    $('#txtDamageWtView').val('');
    $('#txtDamagePkgs').val('');
    $('#txtDamageWt').val('');
    $('#txtScanGroupId').val('');
    $("#txtScanGroupIdFoundCargo").val('');
    $("#TextBoxDiv").empty();
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}
