
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
var _textofHawb="";
var currentLocID;
var NPR;
var ShipmentWeight;
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
        $("#txtMovePkgs").val('');
        $("#textMoveWght").val('');
        $("#txtLocation").val('');
        // ASI(_vlaueofHawb);
        $("#txtBinnPkgs").val(_vlaueofHawb);
        //$("#txtReceived").val(Received);
        //$("#txtRemaining").val(Remaining);

        _InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
        _GetBinningLocPkgDetails(_InputXML);

        _InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO>" + _textofHawb + "</HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>I</EventType></Root>"
        getIGMNoList(_InputXML);

        $(".ibiSuccessMsg1").text('');
    });

    //$("#tblLocation").on('click', function () {
    //    var $item = $(this).closest("tr").find('td');
    //    console.log($item);
    //})



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


function setTurkish() {
    $('#lblIntlMove').text("İç hareket");
    $('#lblMAwbNo').text("Ana Konsimento");
    $('#lblbHWABNo').text("Ara Konsimento No");
    $('#lblFltChk').text("Ucus Detayları");
    $('#lblFromLocPcs').text("Nerden / Parca");
    $('#lblNewLoc').text("Yeni Lokasyon");
    $('#lblMovePcs').text("Paketleri Tasi");
    $('#lblOri').text("Cikis/Varis");
    $('#btnExit').text("Çıkış");
    $('#btnClear').text("Temizle");
    $('#btnSubmit').text("Gönder");
    $('#lblOrgDest').text("Származási hely / Végállomás");
}


function setHungarian() {

    $('#lblIntlMove').text("Átlokálás");
    $('#lblMAwbNo').text("Főfuvarlevél szám");
    $('#lblbHWABNo').text("Házi  fuvarlevél szám");
    $('#lblFltChk').text("Járat szám / dátum");
    $('#btnExit').text("Kilépés");
    $('#btnClear').text("Törlés");
    $('#btnSubmit').text("Jóváhagyás");
    $('#lblFromLocPcs').text("Lokációból / darab");
    $('#lblNewLoc').text("Új lokáció");
    $('#lblMovePcs').text("Darabok átrakása");

    $('#lblLoc1').text("Darabszám");
    $('#lblPcs').text("Lokáció");
    $('#lblOrgDest').text("Cikis/Varis");
}

function calculateWeight() {
    if (!isDataAvail) {
        return;
    }
    if ($("#txtMovePkgs").val() == '') {
        $("#textMoveWght").val(" "); 
        return;
    }
    locNOP = $("#txtMovePkgs").val()
    locWeight = (parseFloat(locNOP) * parseFloat(ShipmentWeight)) / parseFloat(NPR);
    $("#textMoveWght").val(locWeight.toFixed(3))
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
    } else if ($("#txtMovePkgs").val() == '') {
        HideLoader();
        errmsg = "Please Enter move Pkgs</br>";
        $.alert(errmsg);
        return;
    } else if ($("#textMoveWght").val() == '') {
        HideLoader();
        errmsg = "Please Enter move Weight</br>";
        $.alert(errmsg);
        return;
    } else {
        if ($("#ddlHAWBList").val() == '0') {
            if (HAWBNo != " ") {
                HideLoader();
                errmsg = "Please select HAWB No.</br>";
                $.alert(errmsg);
                return;
            } else {
                if (HAWBNo == ' ') {
                    if ($("#locationShow").html() == '') {
                        HideLoader();
                        errmsg = "From location and pckgs not selected</br>";
                        $.alert(errmsg);
                        return;
                    } else {
                        inputxml = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><LocCode>" + $("#txtLocation").val() + "</LocCode><LocId>" + currentLocID + "</LocId><NOP>" + $("#txtMovePkgs").val() + "</NOP><Weight>" + $('#textMoveWght').val() + "</Weight><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                        _SaveBinning(inputxml);
                    }

                } else {
                    if ($("#locationShow").html() == '') {
                        HideLoader();
                        errmsg = "From location and pckgs not selected</br>";
                        $.alert(errmsg);
                        return;
                    } else {
                        inputxml = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><LocCode>" + $("#txtLocation").val() + "</LocCode><LocId>" + currentLocID + "</LocId><NOP>" + $("#txtMovePkgs").val() + "</NOP><Weight>" + $('#textMoveWght').val() + "</Weight><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

                        _SaveBinning(inputxml);
                    }
                }
            }
        } else {
            if (HAWBNo == '') {
                if ($("#locationShow").html() == '') {
                    HideLoader();
                    errmsg = "From location and pckgs not selected</br>";
                    $.alert(errmsg);
                    return;
                } else {
                    inputxml = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><LocCode>" + $("#txtLocation").val() + "</LocCode><LocId>" + currentLocID + "</LocId><NOP>" + $("#txtMovePkgs").val() + "</NOP><Weight>" + $('#textMoveWght').val() + "</Weight><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                    _SaveBinning(inputxml);
                }
            } else {
                if ($("#locationShow").html() == '') {
                    HideLoader();
                    errmsg = "From location and pckgs not selected</br>";
                    $.alert(errmsg);
                    return;
                } else {
                    inputxml = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><LocCode>" + $("#txtLocation").val() + "</LocCode><LocId>" + currentLocID + "</LocId><NOP>" + $("#txtMovePkgs").val() + "</NOP><Weight>" + $('#textMoveWght').val() + "</Weight><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                    _SaveBinning(inputxml);
                }
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
            console.log(response.d)
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
                    ShipmentWeight = $(this).find('shipmentWeightExp').text();
                    LocWeight=$(this).find('LocWeight').text();
                    NPR = $(this).find('NPR').text();
                    isDataAvail = true;
                    //$("#txtBinnPkgs").val(PendingPieces);
                    //$("#txtLocation").text(LocPieces);
                    $("#spnOriginDist").text(Origin + ' / ' + Destination);
                    $("#spnCommodity").text(Commodity);
                    $("#spnBinnTotPkgs").text(LocationStatus);

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
    //var ScanCode = $('#txtScanMAWB').val();
    //if (ScanCode.length >= 11) {
    //    $('body').mLoading({
    //        text: "Please Wait..",
    //    });
    //    InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    //    getHWABNoList(InputXML);
    //}

    if (($("#txtScanMAWB").val() == '')) {

        return;
    }

    if (($("#txtScanMAWB").val().length != 11)) {
        errmsg = "Please enter valid AWB No.</br>";
        $("#txtScanMAWB").val('');
        $.alert(errmsg);
        return;
    }

    InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    getHWABNoList(InputXML);
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
                        $("#btnSubmit").attr('disabled', 'disabled').css('background-color', '#a7a7a7');
                    } else if (Status == 'S') {
                        //   $("#btnSubmit").removeAttr('disabled');
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        $("#btnSubmit").removeAttr('disabled').css('background-color', '#3c7cd3');
                        // $("#ddlHAWBList").trigger('change');

                    } else {
                        $(".ibiSuccessMsg1").text('');
                        $("#btnSubmit").removeAttr('disabled').css('background-color', '#3c7cd3');
                        // $("#ddlHAWBList").trigger('change');
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
                
                var Remark = '';
                $(xmlDoc).find('Table1').each(function (index) {

                    Remark = $(this).find('Remark').text();
                    if(Remark!=''){
                    $('#dvRemarkShow').empty();
                    IsHighPriority = $(this).find('IsHighPriority').text();
                    $('#dvRemarkShow').append(Remark);
                    $('#remarkPriorityShow').modal('show');
                    }
                    // Date = $(this).find('Date').text();
                    
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
            // alert('Server not responding...');
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
            //console.log(response.d)
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



                });

               
                var Remark = '';
                $(xmlDoc).find('Table1').each(function (index) {
                   
                    Remark = $(this).find('Remark').text();
                    if(Remark!=''){
                        $('#dvRemarkShow').empty();
                        IsHighPriority = $(this).find('IsHighPriority').text();
                    $('#dvRemarkShow').append(Remark);
                    }
                    // Date = $(this).find('Date').text();
                    


                });
                if (Remark != '') {
                    $('#remarkPriorityShow').modal('show');
                }
                if(HAWBNo==""){
                    _InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
                _GetBinningLocPkgDetails(_InputXML);
                }
                else{
                _InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
                _GetBinningLocPkgDetails(_InputXML);
                }
            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            /// alert('Server not responding...');
        }
    });
}



_GetBinningLocPkgDetails = function (InputXML) {
    //console.log(InputXML)
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

            $("#tblLocation").empty();
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
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
                    ShipmentWeight = $(this).find('shipmentWeightExp').text();
                    LocWeight=$(this).find('LocWeight').text();
                    NPR = $(this).find('NPR').text();
                    isDataAvail = true;
                    $("#txtBinnPkgs").val(PendingPieces);
                    //$("#txtLocation").text(LocPieces);
                    $("#spnOriginDist").text(Origin + ' / ' + Destination);
                    $("#spnCommodity").text(Commodity);
                    $("#spnBinnTotPkgs").text(LocationStatus);
                    var sum = LocCode + LocPieces;
                    if (LocCode != '') {
                        $("#LocationDiv").show();

                        $('<tr class="valp"></tr>').html('<td class="text-left .tdVal"  >' + LocCode + '</td><td style="text-align:right;">' + LocPieces + '</td><td style="display:none;">' + LocId + '</td><td style="text-align:right;">' + LocWeight + '</td>').appendTo('#tblLocation');
                        //$('<tr></tr>').html('<td class="text-left tdVal">' + LocCode + '</td><td>' + LocPieces + '</td>').appendTo('#tblLocation');

                        //$("#spnlocationName").text(LocCode);
                        //$("#spnlocationPackgs").text(LocPieces);
                    } else {
                        $("#LocationDiv").hide();
                        //$("#spnlocationName").text('');
                        //$("#spnlocationPackgs").text('');
                    }

                });
                $("#tblLocation").on('click', '.valp', function () {
                    // get the current row
                    var currentRow = $(this).closest("tr");

                    var col1 = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                    var col2 = currentRow.find("td:eq(1)").text(); // get current row 2nd TD
                    var col3 = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                    //  var col3 = currentRow.find("td:eq(2)").text(); // get current row 3rd TD
                    var data = col1 + "/" + col2 + "/" + col3;

                    getLocation(data);
                    $('#txtLocation').focus();

                    var selected = $(this).hasClass("highlight");
                    $("#tblLocation tr").removeClass("highlight");
                    if (!selected)
                        $(this).addClass("highlight");
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

function getLocation(data) {
    var str = data;
    var rest = str.substring(0, str.lastIndexOf("/"));
    currentLocID = str.substring(str.lastIndexOf("/") + 1, str.length);
    $("#locationShow").text(rest);
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
            //console.log(response.d)
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

                        //$("#btnSearch").trigger("click");
                        //if (true) {

                        //}
                        //clearFunction();
                        $("#txtLocation").val('');
                        $("#txtMovePkgs").val('');
                        $("#textMoveWght").val('');
                        $('#locationShow').text('');
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
            // alert('Server not responding...');
        }
    });
}

function exitFunction() {
    window.location.href = 'ImportOperations.html';
}

function clearFunction() {
    $("#txtScanMAWB").val('');
    $("#ddlHAWBList").text('');
    $("#ddlFlightNoandDate").val('');
    $("#txtLocation").val('');
    $("#txtMovePkgs").val('');
    $("#textMoveWght").val('');
    $("#spnOriginDist").text('');
    $("#spnCommodity").text('');
    $("#spnBinnTotPkgs").text('');
    $("#txtScanMAWB").focus();
    $(".ibiSuccessMsg1").text('');
    $("#locationShow").text('');
    $("#LocationDiv").hide();
    $("#tblLocation").empty();
    $(".ibiSuccessMsg1").text('');
    _textofHawb="";
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

