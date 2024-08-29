
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
var html

$(function () {

    //setTimeout(function () {
    //    window.location.href = 'Login.html'
    //}, 1200000);


    //if ($("#chkLocationStatus").is(':checked')) {

    //}


    $("#btnSearch").click(function () {
        $('body').mLoading({
            text: "Please Wait..",
        });
        if ($("#txtScanMAWB").val() == '') {
            $("body").mLoading('hide');
            errmsg = "Please enter Barcode No.</br>";
            $.alert(errmsg);
            return;
        } else {
            inputxml = "<Root><GroupID>" + $("#txtScanMAWB").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
            searchDetails(inputxml);
        }

    });
    $('#tableRecords').hide();
    $("#btnDiv").hide();
    $("#tbTable").hide('slow');

    // $("#btnSubmit").click(function () {
    //     $('body').mLoading({
    //         text: "Please Wait..",
    //     });
    //     if ($("#txtWDONo").val() == '') {
    //         $("body").mLoading('hide');
    //         errmsg = "Please enter WDO No.</br>";
    //         $.alert(errmsg);
    //         return;
    //     } else {
    //         inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><Username>" + Userid + "</Username>" + LocXML + "</Root>";
    //         SaveWDODetails(inputxml);
    //     }
    // });

    $('#txtScanMAWB').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtScanMAWB").val() == '') {
                $("body").mLoading('hide');
                errmsg = "Please Scan No.</br>";
                $.alert(errmsg);
                return;
            } else {
                inputxml = "<Root><GroupID>" + $("#txtScanMAWB").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                searchDetails(inputxml);
            }
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });


    $('#txtLocation2').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            moveLocDetails();
        }
    });


    var language = window.localStorage.getItem("Language");

    switch (language) {
        case "English":
            //setEnglish();
            break;
        case "Hungarian":
            setHungarian();
            break;
    }


});

function setHungarian() {

    $('#lbPageName').text("Számlázási képernyő");
    $('#lblScan').text("Szkennelés");
    $('#lblLoc').text("Lokáció");
    $('#lblNOG').text("Áru darabszám");
    $('#lblSugg').text("Javaslatok");
    $('#BtnMove').text("Mozgatás");
    $('#btnClear').text("Törlés");

}

function setTurkish() {
    $('#lblRotationNo').text("Ticket");
    $('#lblWDO').text("WDO Nr.");
    $('#lblAWB').text("AWB No.");
    $('#lblHAWB').text("HAWB No.");
    $('#lblPcs').text("Paket Sayisi");
    $('#lblWt').text("ağırlık");
    $('#lblLoc').text("konum kodu");
    $('#lblDeliver').text("teslim");
    $('#btnExcLanded').val("çikiş");
    $('#btnModify').val("göndermek");
}

function detailPage() {
    window.location.href = "CourierFlightCheckInDetail.html";
}

function openScanner() {
    var ScanCode = $('#txtScanMAWB').val();
    if (($("#txtScanMAWB").val() == '')) {

        return;
    }

    //if (($("#txtScanMAWB").val().length != 11)) {
    //    errmsg = "Please enter valid AWB No.</br>";
    //    $.alert(errmsg);
    //    $("#txtScanMAWB").val('');
    //    return;
    //}

    //if (ScanCode.length >= 11) {
    //    $('body').mLoading({
    //        text: "Please Wait..",
    //    });
    //    inputxml = "<Root><GroupID>" + $("#txtScanMAWB").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
    //    searchDetails(inputxml);
    //}
    inputxml = "<Root><GroupID>" + $("#txtScanMAWB").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
    searchDetails(inputxml);
}


//function openScanner() {
//    cordova.plugins.barcodeScanner.scan(
//        function (result) {

//            barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
//            if (result.text != "") {
//                $("#txtScanMAWB").val(barCodeResule);
//                $('body').mLoading({
//                    text: "Please Wait..",
//                });
//                inputxml = "<Root><GroupID>" + $("#txtScanMAWB").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
//                searchDetails(inputxml);
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
    window.location.href = 'ImportOperations.html';
}

function fnClear() {
    $("#txtWDONo").val('');
    $("#tbTable").hide('slow');
    $("#lblPkgsWgt").html('');
    $("#lblStatus").html('');
    $(".ibiSuccessMsg1").text('')
}

function createTable() {
    html = '';

    html += "<table class='col-12 table  table-bordered' id='tblNews'border='1' style='table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
    html += "<thead class='theadClass'><tr>";
    html += "<th>MAWB No.</th>";
    html += "<th>HAWB No.</th>";
    html += "<th>Remark</th>";
    html += "<th style='width: 10% !important; '>PCS</th>";
    html += "</tr></thead>";
    html += "<tbody id='tbTable'>";
}

searchDetails = function (InputXML) {
    $('#tableRecords').empty();
    $('#txtLocation1').val('');
    $('#nog').val('');
    $('#txtLocation2').val();
    $('#suggestions').text('');
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetImportActiveLocations",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d)
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                createTable();
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        //clearRecords();
                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        
                    } else {
                        $(".ibiSuccessMsg1").text('');
                    }
                });
                $(xmlDoc).find('Table1').each(function (index) {
                    var MAWB, HAWB, Remarks, NOP;
                    $("#txtLocation1").val($(this).find('LocCode').text());
                    $("#nog").val($(this).find('NOG').text());
                    $("#suggestions").text($(this).find('Suggestion').text());

                    MAWB = $(this).find('MAWB').text();
                    HAWB = $(this).find('HAWB').text();
                    Remarks = $(this).find('Remarks').text();
                    NOP = $(this).find('NOP').text();
                    createDynamicTable(MAWB, HAWB, Remarks, NOP);

                });
                html += "</tbody></table>";

                $('#tableRecords').append(html);
                $('#tableRecords').show();

                $('#txtLocation2').focus();
                $('#dvRemarkShow').empty();
                var Remark = '';
                $(xmlDoc).find('Table3').each(function (index) {

                    Remark = $(this).find('Remark').text();
                    // Date = $(this).find('Date').text();
                    IsHighPriority = $(this).find('IsHighPriority').text();
                    $('#dvRemarkShow').append(Remark);
                    $('#remarkPriorityShow').modal('show');

                });
            } else {
                $("body").mLoading('hide');
                errmsg = "Record not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function createDynamicTable(MAWB, HAWB, Remarks, NOP) {
    html += "<tr>";

    html += "<td>" + MAWB + "</td>";

    html += "<td>" + HAWB + "</td>";

    html += "<td>" + Remarks + "</td>";

    html += "<td>" + NOP + "</td>";

    html += "</tr>";
}

moveLocDetails = function () {
    if ($("#txtScanMAWB").val() == "") {
        $.alert("Please enter Barcode No.");
    } else {
        var inputMoveXml = "<Root><GroupID>" + $("#txtScanMAWB").val() + "</GroupID><LocCode>" + $("#txtLocation2").val().toUpperCase() + "</LocCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
        moveLocation(inputMoveXml);
    }
}

function moveLocation(InputXML) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/UpdateImportLocation",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        $("#txtLocation2").val('');
                        $("#txtLocation2").focus();
                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        openScanner();
                        $("#txtLocation2").val('');
                        $("#txtLocation2").focus();

                    } else {
                        $("#txtLocation1").val($("#txtLocation2").val());
                        $("#txtLocation2").val('')
                    }
                });


            } else {
                $("body").mLoading('hide');
                errmsg = "WDO No. not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function clearRecords() {
    $("#txtScanMAWB").val("");
    $("#txtLocation1").val("");
    $("#txtLocation2").val("");
    $("#nog").val("");
    $("#suggestions").val("");
    $("#status").val("");
    $("#tableRecords").empty();
    $("#txtScanMAWB").focus();
    $(".ibiSuccessMsg1").text('');
}


function successMessageDockOut() {
    swal({
        //title: "Dock-Out updated successfully for VT No. " + _TOKENNO + "",
        ////buttonsStyling: false,
        //confirmButtonClass: 'popup-btn'
        title: '',
        text: 'Dock-Out updated successfully for VT No. ' + _TOKENNO + '',
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
    });
}

