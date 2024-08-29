var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
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
var _XmlForManPower;
var selected_mawb = '';
var dmgType = '';
var HAWB_Flag;
var showAll = 'N';

$(function () {

    flightPrefix = amplify.store("flightPrefix");
    flightNo = amplify.store("flightNo");
    flightDisplayDate = amplify.store("flightDisplayDate");
    flightDate = amplify.store("flightDate");
    FlightManpower = amplify.store("txtFlightManpower");
    selectedRowULDNo = amplify.store("selectedRowULDNo");
    selectedRowAWBNo = amplify.store("selectedRowAWBNo");
    selectedRowHAWBNo = amplify.store("selectedRowHAWBNo");
    selectedRowULDid = amplify.store("selectedRowULDid");

    if (selectedRowULDNo != '') {
        //showAll = 'Y';
        chkShowAll.checked = true;
    }

    ImportDeStuffingZoneList();

    $('#txtFltNo').text(flightPrefix.toUpperCase() + flightNo.toUpperCase());
    $('#txtFltDate').text(flightDisplayDate);
    $('#txtFlightManpower').text(FlightManpower);

    //$('#txtFltNo').val(flightPrefix + flightNo);
    //$('#txtFltDate').val(flightDisplayDate);
    flightSeqNo = amplify.store("flightSeqNo");
    if (flightSeqNo != "") {
        GetULDDetails();
    }


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
                $("#txtScanULD").val('');
                $("#txtScanULD").focus();
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
                $("#txtScanAWBNo").val('');
                $("#txtScanAWBNo").focus();
                return;
            }
            console.log(dd.selectedIndex);
            $('#successMsg').text('');
            $('#ddlAWBNo').trigger('change');
            //  $('#hawbLists').focus();

            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }
    });


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
                $("#hawbLists").val('');
                $("#hawbLists").focus();
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

    $('#ddlULDNo').on('change', function () {
        uldid = this.value;
        var allULD = $(_XmlForManPower).find('Table1').children[''];
        $(_XmlForManPower).find('Table1').each(function (index) {

            var ULDId;
            var ULD;
            ULDId = $(this).find('ULDId').text();
            ULD = $(this).find('ULD').text();

            if (uldid == ULDId) {
                Manpower = $(this).find('Manpower').text();
                $('#txtUldManpower').val(Manpower);
            }

        });

    });

});

function BacktoFlightCheck() {
    // set urs global variable here
    //amplify.store("flightSeqNo", flightSeqNo)
    amplify.store("flightPrefix", flightPrefix)
    amplify.store("flightNo", flightNo)
    amplify.store("flightDate", flightDate)
    window.location.href = 'IMP_FlightCheck.html';
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
            url: GHAImportFlightserviceURL + "GetImportULDDetails",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                xmlDamageType = xmlDoc;
                _XmlForManPower = xmlDoc;
                $(xmlDoc).find('Table1').each(function (index) {

                    var ULDId;
                    var ULD;
                    ULDId = $(this).find('ULDId').text();
                    ULD = $(this).find('ULD').text();
                    //Manpower = $(this).find('Manpower').text();
                    //$('#txtUldManpower').val(Manpower);
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
                    $('#ddlULDNo').trigger('change');
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


function SaveULDManpowerDetails() {
    if ($("#txtFlightNo").val() == "") {
        $.alert("Please Enter Flight No.");
        return;
    }

    if ($("#FlightDate").val() == "") {
        $.alert("Please Enter Flight Date.");
        return;
    }
    // var InputXML = "<Root><flightSeqNo>" + FltSeqNo + "</flightSeqNo><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><AWBPrefix>" + $("#_txtAWBNo").val().slice(0, 3) + "</AWBPrefix><AWBNo>" + $("#_txtAWBNo").val().slice(3) + "</AWBNo></Root>";
    var InputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><ULDSeqNo>' + ULDSeqNo + '</ULDSeqNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><Manpower>' + $('#txtUldManpower').val() + '</Manpower></Root>';
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: GHAImportFlightserviceURL + "/SaveULDManpowerDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {

                    //Status = $(this).find('Status').text();
                    //StrMessage = $(this).find('StrMessage').text();
                    //if (Status == 'E') {
                    //    $(".uldMessageULDClose").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                    //    $(".uldMessage").text('');
                    //} else if (Status == 'S') {

                    //    $(".uldMessage").text('');
                    //    $(".uldMessageULDClose").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    //}
                    $('#txtUldManpower').val('');
                    $('#txtScanAWBNo').focus();
                    _Status = $(this).find('Status').text();
                    _StrMessage = $(this).find('StrMessage').text();
                    // if (_Status == 'E') {
                    errmsg = _StrMessage;
                    $.alert(errmsg);
                    return;
                    // }
                });



            } else {
                $("body").mLoading('hide');
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });


}

function goToAWBNoTextBox() {

    $("#txtScanAWBNo").focus();
}

function GetAWBDetailsForULD(ULDid) {

    //$("#txtScanULD").val('');
    //$("#txtScanAWBNo").val('');
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
            url: GHAImportFlightserviceURL + "GetImportULDDetails",
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
                _XmlForManPower = xmlDoc;
                $(xmlDoc).find('Table1').each(function (index) {

                    var ULDId;
                    var ULD;
                    ULDId = $(this).find('ULDId').text();
                    ULD = $(this).find('ULD').text();

                    //if (ULD != '0') {
                    //    Manpower = $(this).find('Manpower').text();
                    //    $('#txtUldManpower').val(Manpower);
                    //} else {
                    //    $('#txtUldManpower').val(0);
                    //}


                });

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

                    $("#txtUldManpower").focus();

                    var a = new Array();
                    $("#ddlAWBNo").children("option").each(function (x) {
                        test = false;
                        b = a[x] = $(this).text();
                        for (i = 0; i < a.length - 1; i++) {
                            if (b == a[i]) test = true;
                        }
                        if (test) $(this).remove();
                    });

                });


                $(xmlDoc).find('Table2').each(function (index) {

                    var AWBId;
                    var AWBNo;
                    AWBId = $(this).find('AWBID').text();
                    AWBNo = $(this).find('AWBPrefix').text() + '-' + $(this).find('AWBNo').text();

                    var HawbNoList = 0;
                    //alert(AWBId);
                    //alert(selected_mawb);
                    ////   for (var i = 0; i < $(xmlDoc).find('Table2').length; i++) {
                    //alert($(xmlDoc).find('Table2')[i].find('AWBID').text())
                    if (AWBId == selected_mawb) {
                        // HawbNoList = 1;
                        //alert('call');
                        console.log(selected_mawb);
                        console.log(AWBNo);

                        $("#ddlAWBNo").val(selected_mawb);
                        // $("#ddlAWBNo").trigger('change');
                        GetHAWBDetails(selected_mawb);
                    }
                    //  }

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

function UpdateAWBDetails() {

    var isOverride = 'N';

    SavedULDSeqNo = '';

    var selectedUld;
    var selectedAWB;
    var selectedHAWB;



    selectedUld = $('#ddlULDNo').find('option:selected').text();
    selectedAWB = $('#ddlAWBNo').find('option:selected').text();
    selectedHAWB = $('#ddlHAWBNo').find('option:selected').text();

    //if ($('#txtFlightManpower').val() == '') {
    //    errmsg = "Please enter flight manpower";
    //    $.alert(errmsg);
    //    return;
    //}
    if ($('#ddlLocation').val() == "-1" || $('#ddlLocation').val() == null || $('#ddlLocation').val() == undefined || $('#ddlLocation').val() == "") {
        errmsg = "Please select zone.";
        $.alert(errmsg);
        return;
    }
    if (document.getElementById('chkFoundCgo').checked) {

        if ($('#txtFoundMAWB').val() == "" && $('#txtFoundHAWB').val() == "") {
            errmsg = "Please enter found cargo MAWB/HAWB No.";
            $.alert(errmsg);
            return;
        }

        if ($('#txtFoundPkgs').val() == "") {
            errmsg = "Please enter found pkgs.";
            $.alert(errmsg);
            return;
        }

        if ($('#txtFoundPkgsWt').val() == "") {
            errmsg = "Please enter found pkgs wt.";
            $.alert(errmsg);
            return;
        }
    }
    else {

        if ($('#ddlAWBNo').val() == "0") {
            errmsg = "Please select MAWB No.";
            $.alert(errmsg);
            return;
        }

        if ($("#ddlHAWBNo option").length > 1) {
            if ($('#ddlHAWBNo').val() == "0") {
                errmsg = "Please select HAWB No.";
                $.alert(errmsg);
                return;
            }
        }


        if ($('#txtArrivedPkgs').val() == "" && $('#txtDamagePkgs').val() == "") {
            errmsg = "Please enter Arrived pkgs";
            $.alert(errmsg);
            return;
        }
    }

    if (document.getElementById('chkModify').checked)
        isOverride = 'Y';
    else
        isoverride = 'N';

    if ($('#txtDamagePkgs').val() != '' && $('#txtDamageWt').val() == '') {
        errmsg = "Please enter damage weight";
        $.alert(errmsg);
        return;
    }

    if ($('#txtDamagePkgs').val() != '' && $('#ddlDamageType').find('option:selected').text() == 'Select') {
        errmsg = "Please select damage type";
        $.alert(errmsg);
        return;
    }

    var inputXML;
    var serviceName;

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (isFoundCargo == true) {
        var GroupId = $('#txtScanGroupIdFoundCargo').val();
        //inputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + ULDSeqNo + '</UlDSeqNo><AWBNO>MLM</AWBNO><HAWBNO></HAWBNO><NPR>' + $('#txtFoundPkgs').val() + '</NPR><WtRec>' + $('#txtFoundPkgsWt').val() + '</WtRec><DMGPsc>' + $('#txtDamagePkgs').val() + '</DMGPsc><DMGWt></DMGWt><DMGCode></DMGCode><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
        inputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + ULDSeqNo + '</UlDSeqNo><AWBNO>' + $('#txtFoundMAWB').val() + '</AWBNO><HAWBNO>' + $('#txtFoundHAWB').val() + '</HAWBNO><NPR>' + $('#txtFoundPkgs').val() + '</NPR><WtRec>' + $('#txtFoundPkgsWt').val() + '</WtRec><DMGPsc>' + $('#txtDamagePkgs').val() + '</DMGPsc><DMGWt>' + $('#txtDamageWt').val() + '</DMGWt><DMGCode>' + $('#ddlDamageType').val() + '</DMGCode><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity><GroupID>' + GroupId + '</GroupID><LocCode>' + $('#ddlLocation').val() + '</LocCode></Root>';
        serviceName = 'SaveImportFoundCargoDetails';
    }
    else {
        var GroupId = $('#txtScanGroupId').val();
        inputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + ULDSeqNo + '</UlDSeqNo><AWBId>' + $('#ddlAWBNo').find('option:selected').val() + '</AWBId><HAWBId>' + $('#ddlHAWBNo').find('option:selected').val() + '</HAWBId><NPR>' + $('#txtArrivedPkgs').val() + '</NPR><DMGPsc>' + $('#txtDamagePkgs').val() + '</DMGPsc><DMGWt>' + $('#txtDamageWt').val() + '</DMGWt><DMGCode>' + $('#ddlDamageType').val() + '</DMGCode><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity><IsOverride>' + isOverride + '</IsOverride><GroupId>' + GroupId + '</GroupId><LocCode>' + $('#ddlLocation').val() + '</LocCode></Root>';
        //inputXML = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><ID>' + $('#ddlAWBNo').find('option:selected').val() + '</ID><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
        console.log(inputXML)
        serviceName = 'SaveImportMaifestDetails';
    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + serviceName,
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
                    // console.log('i am before alert....')
                    // $.alert('i am before if!!!...');

                    if ($(this).find('StrMessage').text() != '') {
                        $.alert($(this).find('StrMessage').text());

                        window.localStorage.setItem('selected_mawb', $('#ddlAWBNo').val()); //new
                        selected_mawb = window.localStorage.getItem('selected_mawb');

                        // alert('success');

                        // selected_mawb = window.localStorage.getItem('selected_mawb');
                        //console.log('previously selected MAWB: ', selected_mawb);
                        //GetHAWBDetails(selected_mawb);

                        // console.log('StrMessage is here', StrMessage);
                        // $.alert('i am before clearsome...');
                        // clearAWBData();
                        // document.getElementById("ddlAWBNo").value = 0;
                        // GetAWBDetailsForULD($('#ddlULDNo').val());
                        // console.log('i am after last function....')
                    }

                    else
                        $.alert('Success');

                    //clearAWBData();
                    $('#txtScanAWBNo').focus();
                    $('#ddlAWBNo').val('0');
                    $('#ddlHAWBNo').val('0');
                    $('#txtAwbNo').val('');
                    $('#txtFoundMAWB').val('')
                    $('#txtFoundHAWB').val('');
                    $('#txtMnifestedPkg').val('');
                    $('#txtArrivedPkgs').val('');
                    $('#txtDamagePkgs').val('');
                    $('#txtDamageWt').val('');
                    $('#ddlDamageType').val(0);
                    // $('#ddlLocation').val('-1');
                    $('#txtFoundPkgs').val('');
                    $('#txtFoundPkgsWt').val('');
                    $('#hawbLists').val('');
                    $('#txtScanGroupId').val('');


                    GetAWBDetailsForULD($('#ddlULDNo').val());

                    // GetAWBDetailsForULD($('#ddlULDNo').val())
                    // GetHAWBDetails($('#ddlAWBNo').val())
                    // var ULDVal = $('#ddlULDNo').val();
                    // GetHAWBDetails($('#ddlAWBNo').val())
                    // $('#ddlAWBNo').empty();
                    // GetULDDetails();
                });

                // $('#ddlAWBNo').val(0);
                // $('#ddlHAWBNo').val(0);
                // $('#txtAwbNo').val('');
                // $('#txtFoundMAWB').val('')
                // $('#txtFoundHAWB').val('');
                // $('#txtMnifestedPkg').val('');
                // $('#txtArrivedPkgs').val('');
                // $('#txtDamagePkgs').val('');
                // $('#txtDamageWt').val('');
                // $('#ddlDamageType').val(0);
                // $('#txtFoundPkgs').val('');
                // $('#txtFoundPkgsWt').val('');

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

function SelectElement(id, valueToSelect) {
    var element = document.getElementById(id);
    element.value = valueToSelect;
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

function GetHAWBDetails(AWBid) {

    if ($("#ddlAWBNo").val() == '0') {
        $("#txtRemark").empty();
        $("#txtMnifestedPkg").val('');
        $("#txtRemainingPkgs").val('');
        $("#txtScanGroupId").val('');
        $("#txtArrivedPkgs").val('');
        $("#txtDamagePkgs").val('');
        $("#txtDamageWt").val('');
        return;
    }

    //if ($("#txtScanAWBNo").val() != $("#ddlAWBNo option:selected").text()) {
    //    $("#txtScanAWBNo").val('');
    //}

    HAWB_Flag = AWBid.split("~")[3];

    if (HAWB_Flag == 'M') {
        $("#hawbLists").focus();

    } else if (HAWB_Flag == 'B') {
        $("#txtScanGroupId").focus();
    }

    HAWBLists = [];
    $("#hawbLists").val('');
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
            url: GHAImportFlightserviceURL + "GetImportULDDetails",
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
                    }

                    if ($(this).find('DmgPkgs').text() != 0) {
                        $('#txtDamagePkgsView').val($(this).find('DmgPkgs').text());
                        $('#txtDamageWtView').val($(this).find('DmgWt').text());
                    }

                });
                $('#txtRemark').empty();
                $(xmlDoc).find('Table6').each(function () {
                    html = $(this).find('Remark').text();
                    /// $('#txtRemark').text($(this).find('Remark').text());
                    $('#txtRemark').append(html);
                });




                // $('#hawbLists').focus();

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


    if ($("#hawbLists").val() != $("#ddlHAWBNo option:selected").text()) {
        $("#hawbLists").val('');
    }
    

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
            url: GHAImportFlightserviceURL + "GetImportULDDetails",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                $('#txtRemark').empty();
                $(xmlDoc).find('Table4').each(function () {

                    $('#txtMnifestedPkg').val($(this).find('NPX').text());
                    $('#txtReceivedPkgs').val($(this).find('NPR').text());
                    $('#txtRemainingPkgs').val($(this).find('RemNOP').text());

                    $('#txtDamagePkgsView').val($(this).find('DmgPkgs').text());
                    $('#txtDamageWtView').val($(this).find('DmgWt').text());
                    $('#txtScanGroupId').focus();
                });

                $(xmlDoc).find('Table6').each(function () {
                    html = $(this).find('Remark').text();
                    /// $('#txtRemark').text($(this).find('Remark').text());
                    $('#txtRemark').append(html);
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
    else {
        $('#divNormalCargo').show();
        $('#divFoundCargo').hide();
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
}

function clearALL() {
    //$('#txtAwbNo').val('');
    //$('#txtFoundMAWB').val('')
    //$('#txtFoundHAWB').val('');
    //$('#txtMnifestedPkg').val('');
    //$('#txtArrivedPkgs').val('');
    //$('#txtDamagePkgs').val('');
    //$('#txtDamageWt').val('');
    //$('#ddlDamageType').val(0);
    //$('#txtFoundPkgs').val('');
    //$('#txtFoundPkgsWt').val('');
    //$('#ddlAWBNo').val(0);
    //$('#ddlHAWBNo').val(0);
    //$('#txtReceivedPkgs').val('');
    //$('#txtRemainingPkgs').val('');
    //$('#txtDamagePkgsView').val('');
    //$('#txtDamageWtView').val('');
    //$("#hawbLists").val('');
    //$('#ddlLocation').val('-1');
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

}

function clearAWBData() {
    $('#ddlAWBNo').val('0');
    $('#ddlHAWBNo').val('0');
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


    // $.alert('in clear some function!!!');
    // $('#ddlAWBNo').val(0);
    // $('#ddlHAWBNo').val(0);
    $('#txtReceivedPkgs').val('');
    $('#txtRemainingPkgs').val('');
    $('#txtMnifestedPkg').val('');

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
    $('#txtRemark').val('');
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function ClearFields() {
    $('.ClearFields input[type=text]').val("");
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


function ImportDeStuffingZoneList() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    inputxml = '<Root><ShedCode>BRD</ShedCode><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            //url: GHAImportFlightserviceURL + "GetImportHouseDetails",
            url: GHAImportFlightserviceURL + "ImportDeStuffingZoneList",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(xmlDoc).find('Table1').each(function () {

                    LOC_CODE = $(this).find('LOC_CODE').text();
                    LOC_DESC = $(this).find('LOC_DESC').text();


                    var newOption = $('<option></option>');
                    newOption.val(LOC_CODE).text(LOC_DESC);
                    newOption.appendTo('#ddlLocation');


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
//ImportDeStuffingZoneList



function UpdateImportULDClose() {


    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";




    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo>' + ULDid + '</UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity><ShowAll>' + showAll + '</ShowAll></Root>';
    inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULDNo').val() + '</ULDSeqNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity><IsConfirm>N</IsConfirm></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "UpdateImportULDClose",
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
    inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULDNo').val() + '</ULDSeqNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity><IsConfirm>Y</IsConfirm></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "UpdateImportULDClose",
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
