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
$(function () {

    //setTimeout(function () {
    //    window.location.href = 'Login.html'
    //}, 1200000);

    var language = window.localStorage.getItem("Language");

    switch (language) {
        case "English":
            //setEnglish();
            break;
        case "Turkish":
            setTurkish();
            break;
    }

    //if ($("#chkLocationStatus").is(':checked')) {
    //    alert('l');
    //}


    // $("#btnSearch").click(function () {
    //     submitScranning();
    // });
    $("#btnGateIn").attr('disabled', 'disabled').css('background-color', '#ccc');
    $('#txtVCTNo').keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var InputXML = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><ScannedNo></ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
            GetVCTDetailsByVCTNo(InputXML);
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });


});



function setEnglish() {
    $('#lblUnitization').text("Unitization");
}
function setTurkish() {
    $('#lblRotationNo').text("Ticket");
    $('#lblWDO').text("WDO Nr.");
    $('#lblAWB').text("AWB No.");
    $('#lblHAWB').text("HAWB No.");
    $('#lblPcs').text("Paket Sayisi");
    $('#lblWt').text("ağırlık");
    $('#lblLocationCode').text("konum kodu");
    $('#lblDeliver').text("teslim");
    $('#btnExcLanded').val("çikiş");
    $('#btnModify').val("göndermek");
}
function fnExit() {
    window.location.href = 'ExportOperations.html';
}
function fnClear() {
    $("#spnGateInDateTime").text('');
    $("#txtVCTNo").val('');
    $("#txtScanNoforShow").val('');
    $("#txtVCTNo").focus();
    $(".ibiSuccessMsg1").text('');
    $("#btnGateIn").attr('disabled', 'disabled').css('background-color', '#ccc');
}

GetVCTDetailsByVCTNo = function (InputXML) {
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetVCTDetailsByVCTNo",
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
                GateInDT = '';
                $(xmlDoc).find('Table').each(function (index) {
                    VCTRowId = $(this).find('VCTRowId').text();
                    VCTNo = $(this).find('VCTNo').text();
                   
                    $("#txtScanNoforShow").val(VCTNo);

                    GateInDT = $(this).find('GateInDT').text();
                    $("#spnGateInDateTime").text(GateInDT);
                    if (GateInDT == '') {
                        $("#btnGateIn").removeAttr("disabled").css('background-color', '#3c7cd3');
                    }

                    Status = $(this).find('Status').text();
                    OutMsg = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(OutMsg).css({ "color": "Red", "font-weight": "bold" });
                        $("#btnGateIn").attr('disabled', 'disabled').css('background-color', '#ccc');
                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });
                        $("#btnGateIn").removeAttr("disabled").css('background-color', '#3c7cd3');
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
            alert('Server not responding...');
        }
    });
}



SaveVCTGateInOut = function () {
    if ($("#txtVCTNo").val() == "") {
        $.alert("Please VCT No.");
        return;
    }

    var inputSavexml = "<Root><VCTNo>" + $("#txtScanNoforShow").val() + "</VCTNo><EventType>I</EventType><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";

    $.ajax({
        type: 'POST',
        url: ExpURL + "/SaveVCTGateInOut",
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
                    OutMsg = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(OutMsg).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });
                        $("#spnGateInDateTime").text('');
                        $("#txtVCTNo").val('');
                        $("#txtVCTNo").focus();
                        $("#txtScanNoforShow").val('');
                        $("#btnGateIn").attr('disabled', 'disabled').css('background-color', '#ccc');

                    } else {
                        $(".ibiSuccessMsg1").text('');
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    GateInDT = $(this).find('GateInTime').text();
                    $("#spnGateInDateTime").text(GateInDT);
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

function openScannerForGroupIDScan() {
   
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            // alert(result);
            barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            var str = barCodeResule;
            console.log('barCodeResule', barCodeResule)
            $("#txtVCTNo").val(str);
            document.activeElement.blur();

            var InputXML = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><ScannedNo></ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
            GetVCTDetailsByVCTNo(InputXML);

        },
        function (error) {
            // alert("Scanning failed: " + error);
        },
        {
            // preferFrontCamera: false, // iOS and Android
            // showFlipCameraButton: true, // iOS and Android
            // showTorchButton: true, // iOS and Android
            // torchOn: true, // Android, launch with the torch switched on (if available)
            // saveHistory: true, // Android, save scan history (default false)
            // prompt: "Place a barcode inside the scan area", // Android
            // resultDisplayDuration: 1500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            // formats: "CODE_128,QR_CODE,PDF_417,QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,PDF417,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
            // orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            // disableAnimations: true, // iOS
            // disableSuccessBeep: false // iOS
        }
    );

}