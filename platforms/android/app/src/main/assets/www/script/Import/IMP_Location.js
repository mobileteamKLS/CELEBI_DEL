
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
var _IGMNo;
var Origin;
var Destination;
var Commodity;
var LocId;
var LocPieces;
var PendingPieces;
var LocCode;
var MAWBId;
var HAWBNo;
var _vlaueofHawb;
var _textofHawb;
var isDataAvail;
var ShipmentWeight;
var NPR;
var isDataAvail = false;

$(function () {

    // $("#ddlHAWBList").trigger('change'); _textofHawb

    $("#ddlHAWBList").change(function () {
        _vlaueofHawb = $('option:selected', this).val();
        if($('option:selected', this).text()=="Select" || $('option:selected', this).text()==null){
            _textofHawb="";
        }
        else{
        _textofHawb = $('option:selected', this).text();
       }
        
        $("#txtLocation").val('');
        $("#txtBinnPkgs").val('');
        $("#txtWght").val('');
        // ASI(_vlaueofHawb);
        // $("#txtBinnPkgs").val(_vlaueofHawb);
        //$("#txtReceived").val(Received);
        //$("#txtRemaining").val(Remaining);

        _InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
        _GetBinningLocPkgDetails(_InputXML);

        _InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO>" + _textofHawb + "</HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>I</EventType></Root>"
        getIGMNoList(_InputXML);

        $(".ibiSuccessMsg1").text('');
    });


    $('#txtScanMAWB').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtScanMAWB").val() == '') {
                $("body").mLoading('hide');
                errmsg = "Please enter AWB No.</br>";
                $.alert(errmsg);
                return;
            } else {
                InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
                getHWABNoList(InputXML);
            }
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


function setHungarian() {
    $('#lblPageName').text("Lokáció");
    $('#lblMAWBNo').text("MAWB szám");
    $('#lblHAWBNo').text("HAWB szám");
    $('#lblfltNo').text("Járat szám / dátum");
    $('#lblLocation').text("Lokáció");
    $('#lblExit').text("Kilépés");
    $('#lblClear').text("Törlés");
    $('#lblSubmit').text("Jóváhagy");
    $('#lblBinPcs').text("Belokált darabszám");
    $('#lblOrDes').text("Származási hely / Végállomás");
    $('#lblComd').text("Áru jellege");
    $('#lblPcs').text("Darabszám");



}


function setTurkish() {
    $('#lblMAWBNo').text("Ana Konsimento");
    $('#lblHAWBNo').text("Ara Konsimento No");
    $('#lblfltNo').text("Ucus Detayları");
    $('#lblLocation').text("Lokasyon");
    $('#lblPcs').text("Depolanan Kap");
    $('#lblExit').text("Çıkış");
    $('#lblClear').text("Temizle");
    $('#lblSubmit').text("Gönder");
    $('#lblOrDes').text("Cikis/Varis");
    $('#lblComd').text("Cinsi");
    $('#lblBinPcs').text("Depolama/ Toplam Kap");
    $('#lblPageName').text("Lokasyon");
}

function calculateWeight() {
    if (!isDataAvail) {
        return;
    }
    if ($("#txtBinnPkgs").val() == '') {
        $("#txtWght").val(" ")
        return;
    }
    locNOP = $("#txtBinnPkgs").val()
    locWeight = (parseFloat(locNOP) * parseFloat(ShipmentWeight).toFixed(3)) / parseFloat(NPR);
    $("#txtWght").val(locWeight.toFixed(3))
}

function SaveBinning() {
    $('body').mLoading({
        text: "Please Wait..",
    });

    if ($("#txtScanMAWB").val() == '') {
        HideLoader();
        errmsg = "Please enter MAWB No.</br>";
        $.alert(errmsg);
        return;

    }
    else if ($("#txtLocation").val() == '') {
        HideLoader();
        errmsg = "Please Enter Location</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtBinnPkgs").val() == '') {
        HideLoader();
        errmsg = "Please Enter Binn Pkgs</br>";
        $.alert(errmsg);
        return;
    }
    else if ($("#txtWght").val() == '') {
        HideLoader();
        errmsg = "Please Enter Weight</br>";
        $.alert(errmsg);
        return;
    }
    else {
        if ($("#ddlHAWBList").val() == '0') {
            if (HAWBNo != '') {
                HideLoader();
                errmsg = "Please select HAWB No.</br>";
                $.alert(errmsg);
                return;
            } else {
                if (HAWBNo == '') {
                    inputxml = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><LocCode>" + $("#txtLocation").val() + "</LocCode><LocId>-1</LocId><NOP>" + $("#txtBinnPkgs").val() + "</NOP><Weight>" + $('#txtWght').val() + "</Weight><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                    _SaveBinning(inputxml);
                    console.log(inputxml);
                } else {
                    inputxml = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><LocCode>" + $("#txtLocation").val() + "</LocCode><LocId>-1</LocId><NOP>" + $("#txtBinnPkgs").val() + "</NOP><Weight>" + $('#txtWght').val() + "</Weight><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                    _SaveBinning(inputxml);
                    console.log(inputxml);
                }
            }
        } else {
            if (HAWBNo == '') {
                inputxml = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><LocCode>" + $("#txtLocation").val() + "</LocCode><LocId>-1</LocId><NOP>" + $("#txtBinnPkgs").val() + "</NOP><Weight>" + $('#txtWght').val() + "</Weight><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                _SaveBinning(inputxml);
                console.log(inputxml);
            } else {
                inputxml = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><LocCode>" + $("#txtLocation").val() + "</LocCode><LocId>-1</LocId><NOP>" + $("#txtBinnPkgs").val() + "</NOP><Weight>" + $('#txtWght').val() + "</Weight><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                _SaveBinning(inputxml);
                console.log(inputxml);
            }
        }
    }

}

function getDetailsbyFilghtChangeEvent(IGMVal) {

    inputData = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + IGMVal + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
    $("#tblLocation").empty();

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetBinningLocPkgDetails",
        data: JSON.stringify({ 'InputXML': inputData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            //console.log(response.d)
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                $("#tblLocation").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    //Status = $(this).find('Status').text();
                    //StrMessage = $(this).find('StrMessage').text();
                    //if (Status == 'E') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    //} else if (Status == 'S') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    //}
                });
                $("#tblLocation").empty();
                $(xmlDoc).find('Table1').each(function (index) {
                    Origin = $(this).find('Origin').text();
                    Destination = $(this).find('Destination').text();
                    Commodity = $(this).find('Commodity').text();
                    LocId = $(this).find('LocId').text();
                    LocPieces = $(this).find('LocPieces').text();
                    PendingPieces = $(this).find('PendingPieces').text();
                    LocCode = $(this).find('LocCode').text();
                    LocationStatus = $(this).find('LocationStatus').text();
                    TotalPieces = $(this).find('TotalPieces').text();
                    LocWeight = $(this).find('LocWeight').text();
                    ShipmentWeight = $(this).find('shipmentWeightExp').text();
                    ExpectedZone=$(this).find("EXPECTED_ZONE").text();
                    NPR = $(this).find('NPR').text();
                    isDataAvail = true;
                    //$("#txtBinnPkgs").val(PendingPieces);
                    //$("#txtLocation").text(LocPieces);
                    $("#spnOriginDist").text(Origin + ' / ' + Destination);
                    $("#spnCommodity").text(Commodity);
                    $("#spnBinnTotPkgs").text(LocationStatus);
                    $("#spnTxtWeight").text($(this).find('LocationWtStatus').text());
                    $("#spnExpectedZone").text(ExpectedZone);

                    if (LocCode != '') {
                        $("#LocationDiv").show();
                        //

                        $('<tr></tr>').html('<td class="text-left">' + LocCode + '</td><td style="text-align:right;">' + LocPieces + '</td><td style="text-align:right;">' + LocWeight + '</td>').appendTo('#tblLocation');

                        //$("#spnlocationName").text(LocCode);
                        //$("#spnlocationPackgs").text(LocPieces);
                    } else {
                        $("#LocationDiv").hide();
                        //$("#spnlocationName").text('');
                        //$("#spnlocationPackgs").text('');
                    }

                });

            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            //alert('Server not responding...');
        }
    });
}

function ASI(_vlaueofHawb) {

    var array = _vlaueofHawb.split(",");

    for (i = 0; i < array.length; i++) {
        if (i == 0) {
            $("#txtManifested").val(array[i]);
        }
        else if (i == 1) {
            $("#txtReceived").val(array[i]);
        }
        else if (i == 2) {
            $("#txtRemaining").val(array[i]);
        }
    }
}

function openScanner() {

    if (($("#txtScanMAWB").val() == '')) {

        return;
    }

    if (($("#txtScanMAWB").val().length != 11)) {
        errmsg = "Please enter valid AWB No.</br>";
        $.alert(errmsg);
        $("#txtScanMAWB").val('');
        return;
    }

    InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    getHWABNoList(InputXML);


    //var ScanCode = $('#txtScanMAWB').val();
    //if (ScanCode.length >= 11) {
    //    $('body').mLoading({
    //        text: "Please Wait..",
    //    });
    //    InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    //    getHWABNoList(InputXML);
    //}
}

//function openScanner() {
//    cordova.plugins.barcodeScanner.scan(
//    function (result) {
//        barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
//        if (!result.cancelled) {
//            $('body').mLoading({
//                text: "Please Wait..",
//            });
//            $("#txtScanMAWB").val(barCodeResule)
//            if ($("#txtScanMAWB").val() == '') {
//                $("body").mLoading('hide');
//                errmsg = "Please enter AWB No.</br>";
//                $.alert(errmsg);
//                return;
//            } else {
//                InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
//                // console.log(inputxml)
//                getHWABNoList(InputXML);
//            }
//        }
//        else {
//            alert("You have cancelled scan");
//            $("#txtScanMAWB").focus();

//        }
//    },
//    function (error) {
//        // alert("Scanning failed: " + error);
//    },
//    {
//        preferFrontCamera: false, // iOS and Android
//        showFlipCameraButton: true, // iOS and Android
//        showTorchButton: true, // iOS and Android
//        torchOn: true, // Android, launch with the torch switched on (if available)
//        saveHistory: true, // Android, save scan history (default false)
//        prompt: "Place a barcode inside the scan area", // Android
//        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
//        formats: "CODE_128,QR_CODE,PDF_417,QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,PDF417,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
//        orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
//        disableAnimations: true, // iOS
//        disableSuccessBeep: false // iOS
//    }
// );
//}

function Imp_GetHAWBIGMNumbersForMAWBNumber() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScanMAWB").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    } else {
        InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
        // console.log(inputxml)
        getHWABNoList(InputXML);
    }
}

getHWABNoList = function (InputXML) {

    $("#ddlHAWBList").text('');

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetHAWBIGMNumbersForMAWBNumber",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            // console.log(response.d);
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        return;

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    } else {
                        $(".ibiSuccessMsg1").text('');
                    }
                    var Process = $(this).find('Process').text();
                    var IGMNo = $(this).find('IGMNo').text();
                    var FlightDetails = $(this).find('FlightDetails').text();
                    _IGMNo = $(this).find('Process').text();

                    MAWBId = $(this).find('MAWBId').text();
                    HAWBNo = $(this).find('HAWBNo').text();

                    //var newOption = $('<option></option>');
                    //newOption.val(MAWBId).text(HAWBNo);
                    //newOption.appendTo('#ddlHAWBList');

                    if (index == 0) {
                       var newOption = $('<option></option>');
                       newOption.val(0).text('Select');
                       newOption.appendTo('#ddlHAWBList');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(PendingPieces).text(HAWBNo);
                    newOption.appendTo('#ddlHAWBList');
                   $("#ddlHAWBList").trigger('change');
                    $("#txtLocation").focus();
                });
                // $('#dvRemarkShow').empty();
                $(xmlDoc).find('Table1').each(function (index) {

                    Remark = $(this).find('Remark').text();
                    // Date = $(this).find('Date').text();
                    if (Remark != '') {
                        $('#dvRemarkShow').empty();
                        IsHighPriority = $(this).find('IsHighPriority').text();
                        $('#dvRemarkShow').append(Remark);
                        $('#remarkPriorityShow').modal('show');
                    }

                });

                _InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO>" + _textofHawb + "</HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>I</EventType></Root>"
                getIGMNoList(_InputXML);

            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            //alert('Server not responding...');
        }
    });
}

function dialogAlert(Remark) {
    var message = Remark;
    var title = "AWB Remarks";
    var buttonName = "Ok";
    navigator.notification.alert(message, alertCallback, title, buttonName);

    function alertCallback() {
        console.log("Alert is Dismissed!");
    }
}
getIGMNoList = function (InputXML) {
    $("#ddlFlightNoandDate").text('');

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetHAWBIGMNumbersForMAWBNumber",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d)
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    var Process = $(this).find('Process').text();
                    var IGMNo = $(this).find('IGMNo').text();
                    var FlightDetails = $(this).find('FlightDetails').text();
                    _IGMNo = $(this).find('Process').text();

                    var newOption = $('<option></option>');
                    newOption.val(_IGMNo).text(FlightDetails);
                    newOption.appendTo('#ddlFlightNoandDate');


                    var a = new Array();
                    $("#ddlFlightNoandDate").children("option").each(function (x) {
                        test = false;
                        b = a[x] = $(this).text();
                        for (i = 0; i < a.length - 1; i++) {
                            if (b == a[i]) test = true;
                        }
                        if (test) $(this).remove();
                    });


                });
                // $('#dvRemarkShow').empty();
                 var Remark = '';
                $(xmlDoc).find('Table1').each(function (index) {

                    Remark = $(this).find('Remark').text();
                    if (Remark != '') {
                        $('#dvRemarkShow').empty();
                        IsHighPriority = $(this).find('IsHighPriority').text();
                        $('#dvRemarkShow').append(Remark);
                    }
                    // Date = $(this).find('Date').text();



                });
                if (Remark != '') {
                    $('#remarkPriorityShow').modal('show');
                }
               
                _InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
                _GetBinningLocPkgDetails(_InputXML);

            } else {
                $("body").mLoading('hide');
                // errmsg = "WDO No. not found</br>";
                // $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            //alert('Server not responding...');
        }
    });
}



_GetBinningLocPkgDetails = function (InputXML) {
    // console.log(InputXML)
    $("#tblLocation").empty();

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetBinningLocPkgDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            //console.log(response.d)
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                $("#tblLocation").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    //Status = $(this).find('Status').text();
                    //StrMessage = $(this).find('StrMessage').text();
                    //if (Status == 'E') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    //} else if (Status == 'S') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    //}
                });
                $("#tblLocation").empty();
                $(xmlDoc).find('Table1').each(function (index) {
                    Origin = $(this).find('Origin').text();
                    Destination = $(this).find('Destination').text();
                    Commodity = $(this).find('Commodity').text();
                    LocId = $(this).find('LocId').text();
                    LocPieces = $(this).find('LocPieces').text();
                    PendingPieces = $(this).find('PendingPieces').text();
                    LocCode = $(this).find('LocCode').text();
                    LocationStatus = $(this).find('LocationStatus').text();
                    TotalPieces = $(this).find('TotalPieces').text();
                    LocWeight = $(this).find('LocWeight').text();
                    ShipmentWeight = $(this).find('shipmentWeightExp').text();
                    ExpectedZone=$(this).find("EXPECTED_ZONE").text();
                    NPR = $(this).find('NPR').text();
                    isDataAvail = true;

                    //$("#txtBinnPkgs").val(PendingPieces);
                    //$("#txtLocation").text(LocPieces);
                    $("#spnOriginDist").text(Origin + ' / ' + Destination);
                    $("#spnCommodity").text(Commodity);
                    $("#spnBinnTotPkgs").text(LocationStatus);
                    $("#spnTxtWeight").text($(this).find('LocationWtStatus').text());
                    $("#spnExpectedZone").text(ExpectedZone);

                    if (LocCode != '') {
                        $("#LocationDiv").show();
                        //

                        $('<tr></tr>').html('<td class="text-left">' + LocCode + '</td><td style="text-align:right;">' + LocPieces + '</td><td style="text-align:right;">' + LocWeight + '</td>').appendTo('#tblLocation');

                        //$("#spnlocationName").text(LocCode);
                        //$("#spnlocationPackgs").text(LocPieces);
                    } else {
                        $("#LocationDiv").hide();
                        //$("#spnlocationName").text('');
                        //$("#spnlocationPackgs").text('');
                    }

                });

            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            //alert('Server not responding...');
        }
    });
}


_SaveBinning = function (InputXML) {
    console.log(InputXML);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/SaveBinning",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d)
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        $("#txtLocation").val('');
                        $("#txtLocation").focus();
                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        $("#txtBinnPkgs").val('');
                        $("#txtWght").val('');
                        $("#txtLocation").val('');
                        //$("#btnSearch").trigger("click");
                        //if (true) {

                        //}
                        //clearFunction();
                    }
                });

                _InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
                _GetBinningLocPkgDetails(_InputXML);
            } else {
                $("body").mLoading('hide');
                $(".ibiSuccessMsg1").text('Please enter valid location pieces').css({ "color": "Red", "font-weight": "bold" });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function exitFunction() {
    window.location.href = 'ImportOperations.html';
}

function clearFunction() {
    $("#tbTable").hide();
    $("#tblLocation").hide();
    $("#txtScanMAWB").val('');
    $("#ddlHAWBList").text('');
    $("#ddlFlightNoandDate").val('');
    $("#txtLocation").val('');
    $("#txtBinnPkgs").val('');
    $("#txtWght").val('');
    $("#spnOriginDist").text('');
    $("#spnCommodity").text('');
    $("#spnBinnTotPkgs").text('');
    $("#txtScanMAWB").focus();
    $(".ibiSuccessMsg1").text('');
    //$("#tbTable").empty();

    //$("#tblLocation").empty();




}


//FillGrid = function (response) {
//    var obj = JSON.parse(response.d);

//    var count = 0;
//    var row = '';
//    if (obj.length > 0) {
//        $.each(obj, function (i, d) {
//            row += '<tr>';
//            row += '<td><span id="spnlocationName"></span></td>';
//            row += '<td class="text-right"><span id="spnlocationPackgs"></span></td>';
//            row += '</tr>';
//            count++;
//        });
//        $("#tblLocation").html(row);
//    }
//}


