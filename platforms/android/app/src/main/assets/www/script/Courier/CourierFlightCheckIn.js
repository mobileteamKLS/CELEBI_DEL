
var Userid = window.localStorage.getItem("Userid");
var User_Name = window.localStorage.getItem("User_Name");
var User_group = window.localStorage.getItem("User_group");
var ARE_USER_MOVEMENTS_LOGGED = window.localStorage.getItem("ARE_USER_MOVEMENTS_LOGGED");
var ISO_COUNTRY_CODE = window.localStorage.getItem("ISO_COUNTRY_CODE");
var SHED_AIRPORT_CITY = window.localStorage.getItem("SHED_AIRPORT_CITY");
var NAME_OF_CITY_I300 = window.localStorage.getItem("NAME_OF_CITY_I300");
var SHED_CODE = window.localStorage.getItem("SHED_CODE");
var SHED_DESCRIPTION = window.localStorage.getItem("SHED_DESCRIPTION");
var PRIMARY_CURRENCY_CODE_I606 = window.localStorage.getItem("PRIMARY_CURRENCY_CODE_I606");
var CompanyCode = window.localStorage.getItem("CompanyCode");
var c_flag = window.localStorage.getItem("c_flag");
var txtScanMAWB = window.localStorage.getItem("txtScanMAWB");
var flightNo = window.localStorage.getItem("flightNo");
var flightDate = window.localStorage.getItem("flightDate");
var groupId = window.localStorage.getItem("groupId");
var _Status;
var _StrMessage;
var _WDOStatus;
var _totPkgs;
var _totWgt;
var _NOP;
var _LOCCODE;
var _STOCKID
var _WEIGHT
var _IsSeized
var _ID
var _WDONo
var _AirportCity
var _Culture
var flightSeqNo;
var ISCROWID = "";
$(function () {

    //setTimeout(function () {
    //    window.location.href = 'Login.html'
    //}, 1200000);

   

    $("#btnComplete").click(function () {
        $("#groupId").val('');
        $("#groupId").focus();
    });


    if (c_flag == '1') {
        //$("#txtScanMAWB").removeAttr('autofocus');
        $("#txtScanMAWB").val(txtScanMAWB);
        $("#flightNo").val(flightNo);
        $("#flightDate").val(flightDate);
        $("#groupId").val(groupId);
    }
    $("#btntrash").click(function () {
        $("#txtScan").val('');
        $("#MAWB").val('');
        $("#HAWB").val('');
        $("#MPS").val('');
        $("#Pieces").val('');
        $("#Weight").val('');
        $("#txtScan").focus();
        $(".ibiSuccessMsg1").text('');


    });


    $("#btnSearch").click(function () {
        $('body').mLoading({
            text: "Please Wait..",
        });
        if ($("#txtScanMAWB").val() == '') {
            $("body").mLoading('hide');
            errmsg = "Please enter Flight No.</br>";
            $.alert(errmsg);

            return;
        } else {
            inputxml = "<Root><ScanCode>" + $("#txtScanMAWB").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
            GetImportFlightCourierDetailsV2(inputxml);
        }

    });

    $("#btnDiv").hide();
    $("#tbTable").hide('slow');

    $("#btnSubmit").click(function () {
        $('body').mLoading({
            text: "Please Wait..",
        });
        if ($("#txtWDONo").val() == '') {
            $("body").mLoading('hide');
            errmsg = "Please enter WDO No.</br>";
            $.alert(errmsg);
            return;
        } else {
            chkValue = $("#chkLocationStatus").val();
            LocXML = '<LocDetails><Rows><StockId>' + _STOCKID + '</StockId><IsSelect>' + chkValue + '</IsSelect><LocCode>' + _LOCCODE + '</LocCode><Pieces>' + _NOP + '</Pieces><ActualPieces>' + _NOP + '</ActualPieces><IsSeized>' + _IsSeized + '</IsSeized></Rows></LocDetails>';
            inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><Username>" + Userid + "</Username>" + LocXML + "</Root>";
            SaveWDODetails(inputxml);
        }
    });


    $('#txtScanMAWB').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //$('body').mLoading({
            //    text: "Please Wait..",
            //});
            //if ($("#txtScanMAWB").val() == '') {
            //    $("body").mLoading('hide');
            //    errmsg = "Please enter AWB No.</br>";
            //    $.alert(errmsg);
            //    return;
            //} else {

            //}
            openScanner();
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });


    $('#groupId').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            onFocus();
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });

    $('#txtScan').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            searchRecord();
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });


    var language = window.localStorage.getItem("Language");
    switch (language) {
        case "English":
            //setEnglish();
            break;
        case "Hungarian":
            setHungarian();
            break;
        case "Turkish":
            setTurkish();
            break;
    }


});

function onFocus() {
    $('#txtScan').focus();
}
function setTurkish() {
    $('#lblPageNAme').text("Ucus Check In");

}

function setHungarian() {
    $('#lblPageNAme').text("Járat érkeztetés");
    $('#lblScanFlight').text("Járat szkennelés");
    $('#lblFltDateNo').text("Járatszám");
    $('#lblAccept').text("Átvétel");
   // $('#lblFlCheckIn').text("Auto");
    $('#lblScan').text("Szkennelés");
    $('#lblMAWBNo').text("Főfuvarlevél szám");
    $('#lblHAWBNo').text("Házi Fuvarlevél szám");
    $('#lblMPSNo').text("MPS szám");
    $('#lblPcs').text("Darab");
    $('#lblStatus').text("Státusz");
    $('#btnComplete').text("Kész");
    $('#btnExit').text("Vissza");
    $('#btnClear').text("Törlés");
    $('#btnSbmit').text("Jóváhagyás");

}
//function scanBarCode() {
//    cordova.plugins.barcodeScanner.scan(
//        function (result) {

//            barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
//            if (barCodeResule != "") {
//                $("#txtScan").val(barCodeResule);
//                searchRecord();
//            }
//            //GetVehicleScanning(barCodeResule, '5', CreatedByUserId, OrganizationBranchId, OrganizationId);
//        },
//        function (error) {
//            // alert("Scanning failed: " + error);
//        },
//        {
//            preferFrontCamera: false, // iOS and Android
//            showFlipCameraButton: true, // iOS and Android
//            showTorchButton: true, // iOS and Android
//            torchOn: true, // Android, launch with the torch switched on (if available)
//            saveHistory: true, // Android, save scan history (default false)
//            prompt: "Place a barcode inside the scan area", // Android
//            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
//            formats: "CODE_128,QR_CODE,PDF_417,QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,PDF417,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
//            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
//            disableAnimations: true, // iOS
//            disableSuccessBeep: false // iOS
//        }
//    );
//}


function openScanner() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScanMAWB").val() == '') {
        $("body").mLoading('hide');
        //errmsg = "Please Scan Barcode No.</br>";
        //$.alert(errmsg);

        return;
    } else {
        inputxml = "<Root><ScanCode>" + $("#txtScanMAWB").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
        console.log(inputxml)
        GetImportFlightCourierDetailsV2(inputxml);
    }
}

//function openScanner() {
//    cordova.plugins.barcodeScanner.scan(
//        function (result) {

//            barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
//            if (!result.cancelled) {
//                inputxml = "<Root><ScanCode>" + barCodeResule + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
//                GetImportFlightCourierDetailsV2(inputxml);
//            } else {
//                alert("You have cancelled scan");
//                $("#txtScanMAWB").focus();

//            }
//            //GetVehicleScanning(barCodeResule, '5', CreatedByUserId, OrganizationBranchId, OrganizationId);
//        },
//        function (error) {
//            // alert("Scanning failed: " + error);
//        },
//        {
//            preferFrontCamera: false, // iOS and Android
//            showFlipCameraButton: true, // iOS and Android
//            showTorchButton: true, // iOS and Android
//            torchOn: true, // Android, launch with the torch switched on (if available)
//            saveHistory: true, // Android, save scan history (default false)
//            prompt: "Place a barcode inside the scan area", // Android
//            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
//            formats: "CODE_128,QR_CODE,PDF_417,QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,PDF417,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
//            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
//            disableAnimations: true, // iOS
//            disableSuccessBeep: false // iOS
//        }
//    );
//}


function fnExit() {
    window.location.href = 'Courier.html';
}
function fnClear() {
    $("#txtScanMAWB").val('');
    $("#flightNo").val('');
    $("#flightDate").val('');
    $("#groupId").val('');
    $("#txtScan").val('');
    $("#MAWB").val('');
    $("#HAWB").val('');
    $("#MPS").val('');
    $("#Pieces").val('');
    $("#status").val('');
    $("#Weight").val('');
    $("#txtScanMAWB").focus();
    $(".ibiSuccessMsg1").text('');

}

GetImportFlightCourierDetailsV2 = function (InputXML) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetImportFlightCourierDetailsV2",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d)
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    } else {
                        $(".ibiSuccessMsg1").text('');
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    $("#groupId").focus();
                    $("#flightNo").val($(this).find('FlightAirline').text() + $(this).find('FlightNo').text());
                    flightSeqNo = $(this).find('FlightSeqNo').text()
                    if ($(this).find('FlightDate').text() != "") {
                        $("#flightDate").val(moment($(this).find('FlightDate').text()).format("DD-MMM-YYYY"));
                    }
                    if ($(this).find('IsNext').text() == "Y" && $(this).find('IsNext').text() == "N") {
                        // $('#autoCheckBox').attr('checked', 'checked');
                        $("#autoCheckBox").prop('checked', true)
                    }
                });


            } else {
                $("body").mLoading('hide');
                errmsg = "AWB No. not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            // alert('Server not responding...');
        }
    });
}



GetImportSaveCourierDetailsV2 = function () {

    if ($("#txtScanMAWB").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter Flight No. </br>";
        $.alert(errmsg);
        return;
    } else {

        var inputSavexml = "<Root><FltSeqNo>" + flightSeqNo + "</FltSeqNo><ISCROWID>" + ISCROWID + "</ISCROWID><GroupID>" + $("#groupId").val() + "</GroupID><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
        console.log(inputSavexml);
        $.ajax({
            type: 'POST',
            url: ACSServiceURL + "/GetImportSaveCourierDetailsV2",
            data: JSON.stringify({ 'InputXML': inputSavexml }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                console.log(response.d);
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    var xmlDoc = $.parseXML(str);


                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        StrMessage = $(this).find('StrMessage').text();
                        if (Status == 'E') {
                            $("#txtScan").val('');
                            $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                        } else if (Status == 'S') {
                            $("#txtScan").focus();
                            $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                        } else {
                            $(".ibiSuccessMsg1").text('');
                        }
                    });


                } else {
                    $("body").mLoading('hide');
                    return;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                //alert('Server not responding...');
            }
        });
    }
}

searchRecord = function () {
    if ($("#txtScanMAWB").val() == "") {
       // $.alert("Please Enter Scan Flight No.");
        return;
    }

    if ($("#txtScan").val() != "") {
        var inputSearchxml = "<Root><FltSeqNo>" + flightSeqNo + "</FltSeqNo><MPSNo>" + $("#txtScan").val() + "</MPSNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
        console.log(inputSearchxml)
        $.ajax({
            type: 'POST',
            url: ACSServiceURL + "/GetImportGetCourierDetailsV2",
            data: JSON.stringify({ 'InputXML': inputSearchxml }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                console.log(response.d);
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    var xmlDoc = $.parseXML(str);
                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        StrMessage = $(this).find('StrMessage').text();
                        if (Status == 'E') {
                            $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                        } else if (Status == 'S') {
                            $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                        } else {
                            $(".ibiSuccessMsg1").text('');
                        }
                    });
                    $('#dvRemarkShow').empty();
                    var Remark = '';
                    $(xmlDoc).find('Table2').each(function (index) {

                        Remark = $(this).find('Remark').text();
                        // Date = $(this).find('Date').text();
                        IsHighPriority = $(this).find('IsHighPriority').text();
                        $('#dvRemarkShow').append(Remark);
                        $('#remarkPriorityShow').modal('show');


                    });

                    $(xmlDoc).find('Table1').each(function (index) {
                        $("#txtScan").val('');
                        $("#MAWB").val($(this).find('AWBNo').text());
                        $("#HAWB").val($(this).find('HouseNo').text());
                        $("#MPS").val($(this).find('MPSNo').text());
                        $("#Pieces").val($(this).find('NPX').text());
                        $("#Weight").val($(this).find('WeightExp').text());
                        ISCROWID = $(this).find('ISCROWID').text()
                    });
                    if ($('#autoCheckBox').is(":checked")) {
                        setTimeout(function () {
                            GetImportSaveCourierDetailsV2();
                        }, 1000);
                    }

                } else {
                    $("body").mLoading('hide');
                    errmsg = "Record not found</br>";
                    $.alert(errmsg);
                    return;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                // alert('Server not responding...');
            }
        });
    } else {
       // $.alert("Please Enter MPS No.");
    }
}


GetImportGetCourierAcceptedDetailsV2 = function () {
    if ($("#txtScanMAWB").val() == "") {

    } else {
        inputxml = "<Root><FltSeqNo>" + $("#txtScanMAWB").val() + "</FltSeqNo><GroupId>" + $("#groupId").val() + "</GroupId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
        window.localStorage.setItem("courierFlightDetails", inputxml);
        window.localStorage.setItem("txtScanMAWB", $("#txtScanMAWB").val());
        window.localStorage.setItem("flightNo", $("#flightNo").val());
        window.localStorage.setItem("flightDate", $("#flightDate").val());
        window.localStorage.setItem("groupId", $("#groupId").val());

        window.location.href = "CourierFlightCheckInDetail.html";
    }

    // if ($("#groupId").val() == "") {
    //     $.alert("Please enter Group ID");
    //     return;
    // } else {

    // }

}
