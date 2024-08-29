
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
var _WDOStatus;
var _totPkgs;
var _totWgt;
var _NOP;
var _LOCCODE;
var _STOCKID;
var _WEIGHT;
var _IsSeized;
var _ID;
var _WDONo;
var _AirportCity;
var _Culture;
var AirlinePrefix;
var AWBNo;
var MAWBInd;
var Manifested;
var Received;
var Remaining;
var ShipmentWtExp;
var ShipmentWtRec;
var IMPAWBROWID;
var IMPSHIPROWID;
var HouseSeqNo;
var FltAir;
var FltNo;
var STA;
var FltSeqNo;
var ATA;
var FltStatus;
var IsFinalized;
var IsComplete;
var AWBID;
var HAWBID;
var allTxtValue;
var imageDataFromCamera = "";
var _vlaueofHawb;
var HouseNo;
var HWABIDSEND;
var _vlaueofHawbText;
var _vlaueofHawbforflight;
var _vlaueofHawbforflightText;
var DmgSeqNo;
var DmgContainer;
var DmgNOP;
var DmgWeight;
var DmgRemorks;
var saveIMPSHIPROWID;
var saveFltSeqNo = '';
var _AAC;
var _AML;
var dmgIMPAWBROWID;
var dmgIMPSHIPROWID;
var FltDetails;
$(function () {

    //setTimeout(function () {
    //    alert('l');
    //    $("#txtScanMAWB").focus();
    //}, 500);

    //setInterval(function () {
    //    $("#txtContainerAAC").focus();
    //}, 50000);



    //$('#btnImageGetFromCamera').click(function () {
    //    var options = {
    //        quality: 50,
    //        destinationType: Camera.DestinationType.DATA_URL,
    //        sourceType: Camera.PictureSourceType.CAMERA,
    //        mediaType: Camera.MediaType.CAMERA,
    //        encodingType: Camera.EncodingType.JPEG,
    //        saveToPhotoAlbum: true
    //    };
    //    navigator.camera.getPicture(onImageSuccess, onImageFail, options);
    //});
    //function onImageSuccess(imageData) {
    //    //var image = document.getElementById('myImage');
    //    //image.src = "data:image/jpeg;base64," + imageData;
    //    //imageFile = imageData;
    //    $('#imgCameraImage').show();
    //    var image = document.getElementById('imgCameraImage');
    //    image.style.display = 'block';
    //    image.src = "data:image/jpeg;base64," + imageData;
    //    imageDataFromCamera = imageData;
    //}
    //function onImageFail(message) {
    //    // alert('Failed because: ' + message);
    //}

    $('#txtDamagePkgs').keyup(function (event) {

        var currentVal = $(this).val();

        if (currentVal.length == 1 && (event.which == 48 || event.which == 96)) {
            currentVal = currentVal.slice(0, -1);
        }
        $(this).val(currentVal);
    });

    $('#txArrivedPakg').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#txtGroupCode').focus();
        }
        event.stopPropagation();
    });

    //setTimeout(function () {
    //    window.location.href = 'Login.html'
    //}, 1200000);


    $("#AddHWABModal").click(function () {

        openModalForHWABNo();
    });

    $("#btnDamagePackgs").click(function () {
        if ($("#txtScanMAWB").val() == '' && $("#ddlFlightDate").val() == '') {
            errmsg = "Please enter AWB No.</br>";
            $.alert(errmsg);
            return;
        } else {
            if ($("#txtDamagePkgs").val() == '') {
                errmsg = "Please enter Damage Packages</br>";
                $.alert(errmsg);
                return;
            } else {
                inputxml = "<Root><AWBId>" + dmgIMPAWBROWID + "</AWBId><SHIPId>" + dmgIMPSHIPROWID + "</SHIPId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

                ImportGetDamageDetails(inputxml);
                $("#lblDamagePkgs").text($("#txtDamagePkgs").val());

                $('#modalDamageDetail').modal('show');
                myFunction();

            }
        }
    });




    $("#btnDiv").hide();
    $("#tbTable").hide('slow');


    $("#ddlHAWBList").change(function () {
        _vlaueofHawb = $('option:selected', this).val();
        _vlaueofHawbText = $('option:selected', this).text();

        ASI(_vlaueofHawb);
        //$("#txtManifested").val(Manifested);
        //$("#txtReceived").val(Received);
        //$("#txtRemaining").val(Remaining);

        inputxml = "<Root><ScanCode>" + _vlaueofHawbText + "</ScanCode><AWBId></AWBId><SHIPId></SHIPId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

        GetImportCargoCheckInDetailsOnChange(inputxml);

    });

    $("#ddlflightNoAndDate").change(function () {
        _vlaueofHawbforflight = $('option:selected', this).val();
        _vlaueofHawbforflightText = $('option:selected', this).text();

        ASIforFlight(_vlaueofHawbforflight, _vlaueofHawbforflightText);
        $("#txArrivedPakg").focus();
        //$("#txtManifested").val(Manifested);
        //$("#txtReceived").val(Received);
        //$("#txtRemaining").val(Remaining);



    });


    //$("#target").on("keypress", function (event) {
    //    if (event.keyCode === 13) {
    //        alert("The enter key was pressed");
    //        event.preventDefault();
    //    }
    //});

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
                inputxml = "<Root><ScanCode>" + $("#txtScanMAWB").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                // console.log(inputxml)
                GetImportCargoCheckInDetails(inputxml);
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

    $('#lblAWBNo').text("Konsimento No");
    $('#lblHAWBNo').text("Ara Konsimento No");
    $('#lblFltNo1').text("Ucus No/Tarih");
    $('#lblManRcRem').text("Manifesto Kap");
    $('#lblArrivedPcs').text("Paketler Geldi");
    $('#btnExit').text("Çıkış");
    $('#btnClear').text("Temizle");
    $('#btnSubmit').text("Gönder");
    $('#divFlightCheckIn').text('Ucus Check In');
}


function setHungarian() {
    $('#divFlightCheckIn').text("Járat érkeztetés");
    $('#lblScan').text("Scannelés");
    $('#lblAWBNo').text("Fuvarlevél szám");
    $('#lblHAWBNo').text("Házi fuvarlevél szám");
    $('#lblMan').text("Manifesztált / Érkezett / Maradék");
    $('#lblPkg').text("Érkezett darabszám");
    $('#lblGroupCode').text("Áru kód");
    $('#lbldmgPcs').text("Sérült áru / db");
    $('#lblRecHAWB').text("HAWB rögzítése");
    $('#lblfltno').text("Járatszám / Dátum");
    $('#lblFltNo1').text("Járatszám / Dátum");

    $('#lblPiecesWeight').text("Darab/Súly");
    $('#lblDmgDtl').text("Sérülés jellege");

    $('#btnExit').text("Bezár");
    $('#btnClear').text("Törlés");
    $('#btnClear1').text("Törlés");
    $('#btnSubmit').text("Mentés");

    $('#btnExit').text("Kilépés");
    $('#btnClear').text("Törlés");
    $('#btnSubmit').text("Jóváhagyás");

    $('#btnBack').text("Vissza");
    $('#btnRevoke').text("Felnyitás");
    $('#btnSave1').text("Mentés");

    $('#lblPhoto').text("Fénykép");
    $('#lbldmgType').text("sérülés típusa");
    $('#lblNOP').text("darabszám");

    $('#btnBack1').text("Vissza");
    $('#btnSave2').text("Mentés");

}

var myVar;

function myFunction() {
    myVar = setTimeout(function () {
        $("#txtContainerAAC").focus();
    }, 500);
}

function myStopFunction() {
    clearTimeout(myVar);
}



function openModalForHWABNo() {
    if ($("#txtScanMAWB").val() == '') {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    } else if ($("#ddlFlightDate").val() == '') {
        errmsg = "Please Enter Flight No. / Date</br>";
        $.alert(errmsg);
        return;
    }
    else {

        $("#txtPopHwabFlightNoDate").val(FltNo + ' / ' + STA);
        $("#txtPopHwabMAWB").val(AWBNo);
        $('#modalHAWBNo').modal('show');
        setTimeout(function () {
            $('#txtPopHwabHAWB').focus();
        }, 500);
        // $('#txtPopHwabHAWB').prop('autofocus','true');
        // $(this).find('#txtPopHwabHAWB').focus();
        //$(this).find('#txtPopHwabHAWB').focus();
    }

}


function cameraTakePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        //quality: 100,
        //encodingType: 0,
        //targetWidth: 500,
        //targetHeight: 500,
        //destinationType: Camera.DestinationType.DATA_URL
        quality: 100,
        encodingType: Camera.EncodingType.JPEG,
        //allowEdit: true,
        //correctOrientation: true,
        targetWidth: 250,
        targetHeight: 250,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        // var data = "data:image/jpeg;base64," + imageData;
        // var image = document.getElementById('imgCameraImage');
        image.style.display = 'block';
        image.src = "data:image/jpeg;base64," + imageData;
        imageDataFromCamera = imageData;
        //saveCameraPhoto();
    }

    function onFail(message) {
        // alert('Failed because: ' + message);
    }
}



function searchAWBNo() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScanMAWB").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    } else {
        inputxml = "<Root><ScanCode>" + $("#txtScanMAWB").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
        // console.log(inputxml)
        GetImportCargoCheckInDetails(inputxml);
    }

}


function ASIforFlight(_vlaueofHawbforflight, _vlaueofHawbforflightText) {
    FltDetails = _vlaueofHawbforflightText;
    var array = _vlaueofHawbforflight.split(",");
    //$("#txArrivedPakg").focus();
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
        else if (i == 3) {
            saveFltSeqNo = array[i];
        } else if (i == 4) {
            saveIMPSHIPROWID = array[i];
        }
        else if (i == 5) {
            IMPSHIPROWID = array[i];
            HWABIDSEND = array[i]
        }
    }
}

function ASI(_vlaueofHawb) {

    var array = _vlaueofHawb.split(",");
    for (i = 0; i < array.length; i++) {
        if (i == 0) {
            // $("#txtManifested").val(array[i]);
        }
        else if (i == 1) {
            //$("#txtReceived").val(array[i]);
        }
        else if (i == 2) {
            // $("#txtRemaining").val(array[i]);
        }
        else if (i == 3) {
            // HWABIDSEND = array[i]
        }
    }


    //inputxml = "<Root><ScanCode>" + _vlaueofHawbText + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

}

function saveCameraPhoto() {
    $('body').mLoading({
        text: "Please Wait..",
    });

    if (HouseNo == '') {
        inputxml = "<Root><GroupId>" + $("#txtGroupCode").val() + "</GroupId><FlightSeqNo>" + saveFltSeqNo + "</FlightSeqNo><AWBId>" + saveIMPSHIPROWID + "</AWBId><HAWBId>0</HAWBId><NPR>" + Received + "</NPR><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
        SaveImportMaifestDetailsV2(inputxml);
    } else {
        inputxml = "<Root><GroupId>" + $("#txtGroupCode").val() + "</GroupId><FlightSeqNo>" + saveFltSeqNo + "</FlightSeqNo><AWBId>" + saveIMPSHIPROWID + "</AWBId><HAWBId>" + $("#ddlHAWBList").val() + "</HAWBId><NPR>" + Received + "</NPR><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
        SaveImportMaifestDetailsV2(inputxml);
    }
}

function saveFlightCheckInDetals() {

    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScanMAWB").val() == '') {

        $("body").mLoading('hide');
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        $("#txtScanMAWB").focus();
        $('.alert_btn_ok').click(function () {
            $("#txtScanMAWB").focus();
        });
        return
    }
    else if ($("#ddlComCode").val() == '0') {
        $("body").mLoading('hide');
        errmsg = "Please select Com. Code</br>";
        $.alert(errmsg);
        return
    }

        //else if ($("#txtNOG").val() == '') {
        //    $("body").mLoading('hide');
        //    errmsg = "Please enter NOG</br>";
        //    $.alert(errmsg);
        //    return
        //}



    else if ($("#txArrivedPakg").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter Arrived Pkgs.</br>";
        $.alert(errmsg);
        return
    } else {

        if (HouseNo == '') {
            inputxml = "<Root><GroupId>" + $("#txtGroupCode").val() + "</GroupId><FlightSeqNo>" + saveFltSeqNo + "</FlightSeqNo><AWBId>" + saveIMPSHIPROWID + "</AWBId><HAWBId></HAWBId><NPR>" + $("#txArrivedPakg").val() + "</NPR><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><NOG>" + $("#txtNOG").val() + "</NOG><CommSrNo>" + $("#ddlComCode").val() + "</CommSrNo></Root>";
            SaveImportMaifestDetailsV2(inputxml);
        } else {
            inputxml = "<Root><GroupId>" + $("#txtGroupCode").val() + "</GroupId><FlightSeqNo>" + saveFltSeqNo + "</FlightSeqNo><AWBId>" + saveIMPSHIPROWID + "</AWBId><HAWBId>" + HWABIDSEND + "</HAWBId><NPR>" + $("#txArrivedPakg").val() + "</NPR><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><NOG>" + $("#txtNOG").val() + "</NOG><CommSrNo>" + $("#ddlComCode").val() + "</CommSrNo></Root>";
            SaveImportMaifestDetailsV2(inputxml);
        }
    }
}




function openScanner() {
    var ScanCode = $('#txtScanMAWB').val();
    //if (ScanCode.length >= 11) {
    $('body').mLoading({
        text: "Please Wait..",
    });
    inputxml = "<Root><ScanCode>" + $("#txtScanMAWB").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
    GetImportCargoCheckInDetails(inputxml);
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
//            $("#txtScanMAWB").val(barCodeResule);
//            //if ($("#txtScanMAWB").val() == '') {
//            //    $("body").mLoading('hide');
//            //    errmsg = "Please enter AWB No.</br>";
//            //    $.alert(errmsg);
//            //    return;
//            //} else {

//            inputxml = "<Root><ScanCode>" + $("#txtScanMAWB").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
//            // console.log(inputxml)
//            GetImportCargoCheckInDetails(inputxml);
//            // }
//            //alert("Barcode type is: " + result.format);
//            //alert("Decoded text is: " + result.text);
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
//        torchOn: false, // Android, launch with the torch switched on (if available)
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


GetImportCargoCheckInDetailsOnChange = function (InputXML) {
    //console.log(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetImportCargoCheckInDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            // console.log(response.d)
            HideLoader();

            $("#ddlflightNoAndDate").empty();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show();
                $("#tbTable").show();
                var xmlDoc = $.parseXML(str);
                $("#txArrivedPakg").focus();
                $(xmlDoc).find('Table').each(function (index) {
                    //AirlinePrefix = $(this).find('AirlinePrefix').text();
                    //AWBNo = $(this).find('AWBNo').text();
                    //MAWBInd = $(this).find('MAWBInd').text();
                    //Manifested = $(this).find('Manifested').text();
                    //Received = $(this).find('Received').text();
                    //Remaining = $(this).find('Remaining').text();
                    //ShipmentWtExp = $(this).find('ShipmentWtExp').text();
                    //ShipmentWtRec = $(this).find('ShipmentWtRec').text();
                    //IMPAWBROWID = $(this).find('IMPAWBROWID').text();
                    //IMPSHIPROWID = $(this).find('IMPSHIPROWID').text();
                    //HouseSeqNo = $(this).find('HouseSeqNo').text();
                    //FltAir = $(this).find('FltAir').text();
                    //FltNo = $(this).find('FltNo').text();
                    //STA = $(this).find('STA').text();
                    //FltSeqNo = $(this).find('FltSeqNo').text();
                    //ATA = $(this).find('ATA').text();
                    //FltStatus = $(this).find('FltStatus').text();
                    //IsFinalized = $(this).find('IsFinalized').text();
                    //IsComplete = $(this).find('IsComplete').text();
                    //AWBID = $(this).find('AWBID').text();
                    //HAWBID = $(this).find('HAWBID').text();
                    //HouseNo = $(this).find('HouseNo').text();

                    //$("#txArrivedPakg").val();
                    //$("#txtGroupCode").val();
                    //$("#txtDamagePkgs").val();



                    inputxml = "<Root><ScanCode>" + $("#txtScanMAWB").val() + "</ScanCode><AWBId>" + $(this).find('IMPAWBROWID').text() + "</AWBId><SHIPId>" + $(this).find('IMPSHIPROWID').text() + "</SHIPId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

                    GetImportCargoCheckInDetailsFlightBind(inputxml);

                    //if ($(this).find("HouseNo").is(':empty')) {
                    //    $("#txtManifested").val(Manifested);
                    //    $("#txtReceived").val(Received);
                    //    $("#txtRemaining").val(Remaining);

                    //}
                    //else {
                    //    $("#txtManifested").val(Manifested);
                    //    $("#txtReceived").val(Received);
                    //    $("#txtRemaining").val(Remaining);
                    //}

                    //$("#ddlflightNoAndDate option").val(function (idx, FltAir) {
                    //    $(this).siblings('[value="' + FltAir + '"]').remove();
                    //});



                    //_vlaueofHawb = Manifested + ',' + Received + ',' + Remaining;

                    //var array = _vlaueofHawb.split(",");
                    //for (i = 0; i < array.length; i++) {
                    //    if (i == 0) {
                    //        $("#txtManifested").val(array[i]);
                    //    }
                    //    else if (i == 1) {
                    //        $("#txtReceived").val(array[i]);
                    //    }
                    //    else if (i == 2) {
                    //        $("#txtRemaining").val(array[i]);
                    //    }
                    //}
                    //ASI(_vlaueofHawb);

                    //var newOption = $('<option></option>');
                    //newOption.val(FltAir).text(FltAir + FltNo + ' / ' + STA);
                    //newOption.appendTo('#ddlflightNoAndDate');

                });
                //var newOption = $('<option></option>');
                //newOption.val(FltAir).text(FltAir + FltNo + ' / ' + STA);
                //newOption.appendTo('#ddlflightNoAndDate');
                //if (HouseNo =='') {
                //    $('#ddlflightNoAndDate').trigger('change');
                //}
                //$('#ddlflightNoAndDate').trigger('change');
                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
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


GetImportCargoCheckInDetailsFlightBind = function (InputXML) {
    //console.log(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetImportCargoCheckInDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d)
            HideLoader();

            // $("#ddlflightNoAndDate").empty();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // saveFltSeqNo = '';
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);
                $("#txArrivedPakg").focus();
                $(xmlDoc).find('Table').each(function (index) {
                    AirlinePrefix = $(this).find('AirlinePrefix').text();
                    AWBNo = $(this).find('AWBNo').text();
                    MAWBInd = $(this).find('MAWBInd').text();
                    Manifested = $(this).find('Manifested').text();
                    Received = $(this).find('Received').text();
                    Remaining = $(this).find('Remaining').text();
                    ShipmentWtExp = $(this).find('ShipmentWtExp').text();
                    ShipmentWtRec = $(this).find('ShipmentWtRec').text();
                    IMPAWBROWID = $(this).find('IMPAWBROWID').text();


                    saveIMPSHIPROWID = $(this).find('AWBID').text();
                    IMPSHIPROWID = $(this).find('IMPSHIPROWID').text();

                    HouseSeqNo = $(this).find('HouseSeqNo').text();
                    FltAir = $(this).find('FltAir').text();
                    FltNo = $(this).find('FltNo').text();
                    STA = $(this).find('STA').text();
                    saveFltSeqNo = $(this).find('FltSeqNo').text();
                    ATA = $(this).find('ATA').text();
                    FltStatus = $(this).find('FltStatus').text();
                    IsFinalized = $(this).find('IsFinalized').text();
                    IsComplete = $(this).find('IsComplete').text();
                    AWBID = $(this).find('AWBID').text();
                    HAWBID = $(this).find('HAWBID').text();
                    HouseNo = $(this).find('HouseNo').text();

                    $("#ddlComCode").val($(this).find('commsrno').text());
                    $("#txtNOG").val($(this).find('nog').text());


                    $("#txArrivedPakg").val();
                    $("#txtGroupCode").val();
                    $("#txtDamagePkgs").val();

                    //if ($(this).find("HouseNo").is(':empty')) {
                    //    $("#txtManifested").val(Manifested);
                    //    $("#txtReceived").val(Received);
                    //    $("#txtRemaining").val(Remaining);

                    //}
                    //else {
                    //    $("#txtManifested").val(Manifested);
                    //    $("#txtReceived").val(Received);
                    //    $("#txtRemaining").val(Remaining);
                    //}

                    //$("#ddlflightNoAndDate option").val(function (idx, FltAir) {
                    //    $(this).siblings('[value="' + FltAir + '"]').remove();
                    //});



                    //_vlaueofHawb = Manifested + ',' + Received + ',' + Remaining;

                    //var array = _vlaueofHawb.split(",");
                    //for (i = 0; i < array.length; i++) {
                    //    if (i == 0) {
                    //        $("#txtManifested").val(array[i]);
                    //    }
                    //    else if (i == 1) {
                    //        $("#txtReceived").val(array[i]);
                    //    }
                    //    else if (i == 2) {
                    //        $("#txtRemaining").val(array[i]);
                    //    }
                    //}
                    //ASI(_vlaueofHawb);
                    if (index == 0) {


                        var newOption = $('<option></option>');
                        newOption.val(Manifested + ',' + Received + ',' + Remaining + ',' + saveFltSeqNo + ',' + saveIMPSHIPROWID + ',' + IMPSHIPROWID).text(FltAir + FltNo + ' / ' + STA);
                        newOption.appendTo('#ddlflightNoAndDate');
                        $('#ddlflightNoAndDate').trigger('change');
                    } else {

                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlflightNoAndDate');

                        var newOption = $('<option></option>');
                        newOption.val(Manifested + ',' + Received + ',' + Remaining + ',' + saveFltSeqNo + ',' + saveIMPSHIPROWID + ',' + IMPSHIPROWID).text(FltAir + FltNo + ' / ' + STA);
                        newOption.appendTo('#ddlflightNoAndDate');

                    }
                    //var newOption = $('<option></option>');
                    //newOption.val(Manifested + ',' + Received + ',' + Remaining + ',' + saveFltSeqNo + ',' + saveIMPSHIPROWID).text(FltAir + FltNo + ' / ' + STA);
                    //newOption.appendTo('#ddlflightNoAndDate');

                    //var a = new Array();
                    //$("#ddlflightNoAndDate").children("option").each(function (x) {
                    //    test = false;
                    //    b = a[x] = $(this).text();
                    //    for (i = 0; i < a.length - 1; i++) {
                    //        if (b == a[i]) test = true;
                    //    }
                    //    if (test) $(this).remove();
                    //});

                });
                //var newOption = $('<option></option>');
                //newOption.val(FltAir).text(FltAir + FltNo + ' / ' + STA);
                //newOption.appendTo('#ddlflightNoAndDate');
                //if (HouseNo =='') {
                //    $('#ddlflightNoAndDate').trigger('change');
                //}
                $('#ddlflightNoAndDate').trigger('change');
                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
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

GetImportCargoCheckInDetails = function (InputXML) {

    //if (($("#txtScanMAWB").val().length != 11)) {
    //    errmsg = "Please enter valid AWB No.</br>";
    //    $.alert(errmsg);
    //    $("body").mLoading('hide');
    //    return;
    //}
    //console.log(InputXML);

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetImportCargoCheckInDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            // console.log(response.d)
            HideLoader();
            $("#ddlHAWBList").empty();
            $("#ddlflightNoAndDate").empty();
            $(".ibiSuccessMsg").text('');

            var str = response.d;
            var a = new Array();
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);
                $("#txArrivedPakg").focus();

                $(xmlDoc).find('Table1').each(function (index) {
                    SR_NO = $(this).find('SR_NO').text();
                    COMMODITY_TYPE = $(this).find('COMMODITY_TYPE').text();
                    if (index == 0 && $("#ddlComCode").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlComCode');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(SR_NO).text(COMMODITY_TYPE);
                    newOption.appendTo('#ddlComCode');
                });

                $(xmlDoc).find('Table').each(function (index) {
                    AirlinePrefix = $(this).find('AirlinePrefix').text();
                    AWBNo = $(this).find('AWBNo').text();
                    MAWBInd = $(this).find('MAWBInd').text();
                    Manifested = $(this).find('Manifested').text();
                    Received = $(this).find('Received').text();
                    Remaining = $(this).find('Remaining').text();
                    ShipmentWtExp = $(this).find('ShipmentWtExp').text();
                    ShipmentWtRec = $(this).find('ShipmentWtRec').text();
                    IMPAWBROWID = $(this).find('IMPAWBROWID').text();
                    IMPSHIPROWID = $(this).find('IMPSHIPROWID').text();
                    HouseSeqNo = $(this).find('HouseSeqNo').text();
                    FltAir = $(this).find('FltAir').text();
                    FltNo = $(this).find('FltNo').text();
                    STA = $(this).find('STA').text();
                    FltSeqNo = $(this).find('FltSeqNo').text();
                    ATA = $(this).find('ATA').text();
                    FltStatus = $(this).find('FltStatus').text();
                    IsFinalized = $(this).find('IsFinalized').text();
                    IsComplete = $(this).find('IsComplete').text();
                    AWBID = $(this).find('AWBID').text();
                    HAWBID = $(this).find('HAWBID').text();
                    HouseNo = $(this).find('HouseNo').text();
                    dmgIMPAWBROWID = $(this).find('IMPAWBROWID').text();
                    dmgIMPSHIPROWID = $(this).find('IMPSHIPROWID').text();
                    commsrno = $(this).find('commsrno').text()
                    $("#ddlComCode").val(commsrno);
                    $("#txtNOG").val($(this).find('nog').text());

                    $("#txtAWBNo").val(AWBNo);

                    saveFltSeqNo = $(this).find('FltSeqNo').text();
                    saveIMPSHIPROWID = $(this).find('AWBID').text();
                    HWABIDSEND = HAWBID;
                    //if (index == 0) {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlflightNoAndDate');
                    //}

                    //var newOption = $('<option></option>');
                    //newOption.val(Manifested + ',' + Received + ',' + Remaining).text(FltAir + FltNo + ' / ' + STA);
                    //newOption.appendTo('#ddlflightNoAndDate');
                    //$('#ddlflightNoAndDate').trigger('change');

                    $("#txtManifested").val('');
                    $("#txtReceived").val('');
                    $("#txtRemaining").val('');
                    // $("#ddlHAWBList").val();

                    var newOption = $('<option></option>');
                    newOption.val(Manifested + ',' + Received + ',' + Remaining + ',' + saveFltSeqNo + ',' + saveIMPSHIPROWID + ',' + IMPSHIPROWID).text(FltAir + FltNo + ' / ' + STA);
                    newOption.appendTo('#ddlflightNoAndDate');

                    $('#ddlflightNoAndDate').trigger('change');

                    if ($(this).find("HouseNo").is(':empty')) {

                    }
                    else {

                        if (index == 0) {
                            var newOption = $('<option></option>');
                            newOption.val(0).text('Select');
                            newOption.appendTo('#ddlHAWBList');
                        }

                        var optionValues = [];
                        var houseNumber;

                        var newOption = $('<option></option>');
                        if (jQuery.inArray(HouseNo.toUpperCase(), a) == -1) {
                            newOption.val(Manifested + ',' + Received + ',' + Remaining + ',' + HAWBID).text(HouseNo);
                            newOption.appendTo('#ddlHAWBList');
                            a.push(HouseNo.toUpperCase());
                        }

                        // $("#ddlHAWBList").children("option").each(function (x) {
                        //     test = false;
                        //     b = a[x] = $(this).text();
                        //     for (i = 0; i < a.length - 1; i++) {
                        //         if (b == a[i]) test = true;
                        //     }
                        //     if (test) $(this).remove();
                        // });




                        // $('#ddlHAWBList').trigger('change');
                        //var newOption = $('<option></option>');
                        //newOption.val(0).text('Select');
                        //newOption.val(Manifested + ',' + Received + ',' + Remaining + ',' + HAWBID).text(HouseNo);
                        //newOption.appendTo('#ddlHAWBList');
                        //if (HouseNo != '') {
                        //    $('#ddlHAWBList').trigger('change');
                        //}
                    }

                    //$("#ddlflightNoAndDate option").val(function (idx, FltAir) {
                    //    $(this).siblings('[value="' + FltAir + '"]').remove();
                    //});

                    //_vlaueofHawb = Manifested + ',' + Received + ',' + Remaining;

                    //var array = _vlaueofHawb.split(",");
                    //for (i = 0; i < array.length; i++) {
                    //    if (i == 0) {
                    //        $("#txtManifested").val(array[i]);
                    //    }
                    //    else if (i == 1) {
                    //        $("#txtReceived").val(array[i]);
                    //    }
                    //    else if (i == 2) {
                    //        $("#txtRemaining").val(array[i]);
                    //    }
                    //}
                    //ASI(_vlaueofHawb);

                });


                $(xmlDoc).find('Table2').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        $("#txtScanMAWB").val('');
                        $("#txtAWBNo").val('');
                        $("#ddlHAWBList").val('');
                        $("#ddlflightNoAndDate").val('');
                        $("#txtManifested").val('');
                        $("#txtReceived").val('');
                        $("#txtRemaining").val('');
                        $("#txArrivedPakg").val('');
                        $("#txtGroupCode").val('');
                        $("#txtDamagePkgs").val('');
                        $("#txtScanMAWB").focus();
                    } else if (Status == 'S') {
                        // $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    }
                });
                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                    } else if (Status == 'S') {
                        // $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    }
                });
                if (a.length > 0)
                    $('#ddlHAWBList').focus();
                else
                    $("txArrivedPakg").focus();

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



SaveImportMaifestDetailsV2 = function (InputXML) {
    //console.log(InputXML)
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/SaveImportMaifestDetailsV2",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            //console.log(response.d);
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                clearFunction();
                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {

                        $("#txtGroupCode").val('');
                        $("#txArrivedPakg").val('');
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        //inputxml = "<Root><ScanCode>" + $("#txtScanMAWB").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                        //GetImportCargoCheckInDetails(inputxml);
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

function fnClearHAWBAddDetail() {
    $("#txtPopHwabHAWB").val('');
    $("#txtPopHwabPieces").val('');
    $("#txtPopHwabWeight").val('');
    // $('#modalHAWBNo').modal('hide');
    $('#valHawb').html('');
    $(".ibiSuccessMsg").text('');
}

function fnPopupClose() {

    $("#txtPopHwabHAWB").val('');
    $("#txtPopHwabPieces").val('');
    $("#txtPopHwabWeight").val('');
    $('#modalHAWBNo').modal('hide');
    $('#valHawb').html('');

}

function saveHAWBAddDetail() {

    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtPopHwabHAWB").val() == '') {
        $("body").mLoading('hide');
        $("#valHawb").show();
        $("#valHawb").html('Please Enter HAWB No.');

    } else {
        $("#valHawb").hide();
        $("#valHawb").html('');
        inputxml = "<Root><GroupId></GroupId><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><AWBId>" + AWBID + "</AWBId><HAWBNo>" + $("#txtPopHwabHAWB").val() + "</HAWBNo><NPR>" + $("#txtPopHwabPieces").val() + "</NPR><WeightRec>" + $("#txtPopHwabWeight").val() + "</WeightRec><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
        ImportCreateNewHouse(inputxml);
    }
}

function saveImportSaveDamageDetails() {

    $('body').mLoading({
        text: "Please Wait..",
    });
    //Create an Array.
    var selected = new Array();
    var empty = 0;
    //Reference the CheckBoxes and insert the checked CheckBox value in Array.
    $("input[name*='damg']").each(function () {

        if (this.value == "") {
            empty++;
            // $("#error").show('slow');
        } else {
            selected.push(this.parentElement.previousElementSibling.children[0].getAttribute("xmlValue") + "~" + this.value);
        }

    });
    // console.log(selected)
    //Display the selected CheckBox values.
    if (selected.length > 0) {
        allTxtValue = selected.join(",");
    }
    $("#valHawb").hide();
    $("#valHawb").html('');

    if (DmgSeqNo == '') {

        inputxml = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><AWBId>" + IMPAWBROWID + "</AWBId><SHIPId>" + IMPSHIPROWID + "</SHIPId><DmgSeqNo>0</DmgSeqNo><DmgNOP>" + $("#lblDamagePkgs").text() + "</DmgNOP><DmgWeight>0</DmgWeight><DmgContainer>" + allTxtValue + "</DmgContainer><DmgRemarks></DmgRemarks><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    } else {
        inputxml = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><AWBId>" + IMPAWBROWID + "</AWBId><SHIPId>" + IMPSHIPROWID + "</SHIPId><DmgSeqNo>" + DmgSeqNo + "</DmgSeqNo><DmgNOP>" + $("#lblDamagePkgs").text() + "</DmgNOP><DmgWeight>" + DmgWeight + "</DmgWeight><DmgContainer>" + allTxtValue + "</DmgContainer><DmgRemarks></DmgRemarks><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    }

    //console.log(inputxml);
    if (FltStatus != 'Not Arrived') {
        ImportSaveDamageDetails(inputxml);
    } else {
        $("body").mLoading('hide');
        $(".ibiSuccessMsgDamg").text('Cannot receive the shipment as Flight is not arrived yet').css({ "color": "Red", "font-weight": "bold" });
    }
}


ImportCreateNewHouse = function (InputXML) {
    //console.log(InputXML)
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ImportCreateNewHouse",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            //console.log(response.d);
            HideLoader();
            var str = response.d;
            fnClearHAWBAddDetail();
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {

                });

                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        openScanner();
                        $('#modalHAWBNo').modal('hide');
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
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

ImportGetDamageDetails = function (InputXML) {
    console.log(InputXML)
    //xmlDataForDamage = JSON.stringify(InputXML);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ImportGetDamageDetails",
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
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {

                    //  $("#ContainerAAC")[0].innerHTML = $(this).find('REFERENCE_DATA_IDENTIFIER').text() + $(this).find('REFERENCE_DESCRIPTION').text()


                    if (index == 0) {
                        $('#ContainerAAC').text($(this).find('REFERENCE_DESCRIPTION').text());
                        _AAC = $('#ContainerAAC').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 1) {
                        $('#ContainerAML').text($(this).find('REFERENCE_DESCRIPTION').text());
                        _AML = $('#ContainerAML').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 2) {
                        $('#Crushed').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#Crushed').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 3) {
                        $('#Dented').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#Dented').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 4) {
                        $('#Leackage').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#Leackage').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 5) {
                        $('#LoosePacking').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#LoosePacking').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 6) {
                        $('#OuterCover').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#OuterCover').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 7) {
                        $('#OpenCondition').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#OpenCondition').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 8) {
                        $('#Pressed').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#Pressed').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 9) {
                        $('#ReTaped').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#ReTaped').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 10) {
                        $('#ReceivedinWet').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#ReceivedinWet').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 11) {
                        $('#SAA').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#SAA').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 12) {
                        $('#StrapBroken').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#StrapBroken').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 13) {
                        $('#SealBroken').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#SealBroken').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 14) {
                        $('#WithoutLock').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#WithoutLock').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 15) {
                        $('#WithoutSeal').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#WithoutSeal').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 16) {
                        $('#WetDamaged').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#WetDamaged').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 17) {
                        $('#WetVariation').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#WetVariation').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    } else if (index == 18) {
                        $('#Weight').text($(this).find('REFERENCE_DESCRIPTION').text());

                        $('#Weight').attr("xmlValue", $(this).find('REFERENCE_DATA_IDENTIFIER').text());
                    }


                    setTimeout(function () { myStopFunction(); }, 3000);

                });

                $(xmlDoc).find('Table2').each(function (index) {

                    DmgSeqNo = $(this).find('DmgSeqNo').text();
                    DmgContainer = $(this).find('DmgContainer').text();
                    DmgNOP = $(this).find('DmgNOP').text();
                    DmgWeight = $(this).find('DmgWeight').text();
                    DmgRemorks = $(this).find('DmgRemorks').text();

                    //if (DmgNOP != '' || DmgNOP != undefined) {
                    //    $("#lblDamagePkgs").text(DmgNOP);
                    //}

                });

                let text = DmgContainer;
                const myArray = text.split(",");
                if (DmgContainer != '' || DmgContainer != undefined) {
                    for (var i = 0; i < myArray.length; i++) {

                        const a = myArray[i].split('~')

                        //alert(a[0])

                        if (a[0] == 'AAC') {
                            $('#txtContainerAAC').val(a[1]);
                        } else if (a[0] == 'AML') {
                            $('#txtContainerAML').val(a[1]);
                        } else if (a[0] == 'CRS') {
                            $('#txtCrushed').val(a[1]);
                        } else if (a[0] == 'DET') {
                            $('#txtDented').val(a[1]);

                        } else if (a[0] == 'DMG') {
                            $('#txtLeackage').val(a[1]);

                        } else if (a[0] == 'LKG') {
                            $('#txtLoosePacking').val(a[1]);

                        } else if (a[0] == 'LPC') {
                            $('#txtOuterCover').val(a[1]);

                        } else if (a[0] == 'OCD') {
                            $('#txtOpenCondition').val(a[1]);

                        } else if (a[0] == 'OND') {
                            $('#txtPressed').val(a[1]);

                        } else if (a[0] == 'PRR') {
                            $('#txtReTaped').val(a[1]);

                        } else if (a[0] == 'RET') {
                            $('#txtReceivedinWet').val(a[1]);

                        } else if (a[0] == 'RWT') {
                            $('#txtSAA').val(a[1]);

                        } else if (a[0] == 'SAA') {

                            $('#txtStrapBroken').val(a[1]);
                        } else if (a[0] == 'SBK') {
                            $('#txtSealBroken').val(a[1]);

                        } else if (a[0] == 'SLB') {
                            $('#txtWithoutLock').val(a[1]);

                        } else if (a[0] == 'WOL') {
                            $('#txtWithoutSeal').val(a[1]);

                        } else if (a[0] == 'WSL') {
                            $('#txtWetDamaged').val(a[1]);

                        } else if (a[0] == 'WTD') {
                            $('#txtWetVariation').val(a[1]);

                        } else if (a[0] == 'WTV') {
                            $('#txtWeight').val(a[1]);

                        }
                    }
                }



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

ImportSaveDamageDetails = function (InputXML) {
    console.log(InputXML);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ImportSaveDamageDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            //console.log(response.d);
            HideLoader();
            var str = response.d;
            DmgSeqNo = '';
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                allTxtValue = [];
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $('#modalDamageDetail').modal('hide');
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        cleartextboxes();
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {

                        $("#ibiSuccessMsgPopup").show();
                        $("#ibiSuccessMsgError").text(StrMessage);
                        return;
                    } else {
                        $("#ibiSuccessMsgPopup").show();
                        $("#ibiSuccessMsgPopup").text(StrMessage);
                        return;
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
            // alert('Server not responding...');
        }
    });
}




function saveImportRevokeDamageDetails() {

    $('body').mLoading({
        text: "Please Wait..",
    });
    $("#valHawb").hide();
    $("#valHawb").html('');
    inputxml = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><AWBId>" + dmgIMPAWBROWID + "</AWBId><SHIPId>" + dmgIMPSHIPROWID + "</SHIPId><DmgSeqNo>" + DmgSeqNo + "</DmgSeqNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    console.log(inputxml);
    ImportRevokeDamageDetails(inputxml);


}

ImportRevokeDamageDetails = function (InputXML) {
    //console.log(InputXML);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ImportRevokeDamageDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            // console.log(response.d);
            HideLoader();
            var str = response.d;


            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                allTxtValue = [];
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $('#modalDamageDetail').modal('hide');
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        cleartextboxes();
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $("#ibiSuccessMsgPopup").show();
                        $("#ibiSuccessMsgError").text(StrMessage);
                        return;
                    } else {
                        $("#ibiSuccessMsgPopup").show();
                        $("#ibiSuccessMsgPopup").text(StrMessage);
                        return;
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
            // alert('Server not responding...');
        }
    });
}




function saveCameraPhoto() {
    $('body').mLoading({
        text: "Please Wait..",
    });

    InputXML = "<Root><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><Description>TestDesc</Description><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><UShipRowId>-1</UShipRowId><Type>I</Type><UAWBRowId>" + IMPAWBROWID + "</UAWBRowId><ULDId>1</ULDId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    SaveFileUploadDetails(InputXML, imageDataFromCamera);

}

SaveFileUploadDetails = function (InputXML, InputImage) {

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/SaveFileUploadDetails",
        data: JSON.stringify({ 'InputXML': InputXML, 'InputImage': InputImage }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            //console.log(response.d);
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                allTxtValue = [];
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        alert(StrMessage);
                    } else if (Status == 'S') {
                        alert(StrMessage);
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
            // alert('Server not responding...');
        }
    });
}

function clearFunction() {
    $("#txtScanMAWB").val('');
    $("#txtAWBNo").val('');
    $("#ddlHAWBList").val('');
    $("#ddlflightNoAndDate").val('');
    $("#txtManifested").val('');
    $("#txtReceived").val('');
    $("#txtRemaining").val('');
    $("#txArrivedPakg").val('');
    $("#txtGroupCode").val('');
    $("#txtDamagePkgs").val('');
    $("#ddlComCode").val('0');
    $("#txtNOG").val('');
    $("#txtScanMAWB").focus();
    $(".ibiSuccessMsg").text('');

}

function exitFunction() {
    window.location.href = 'ImportOperations.html';
}

function cleartextboxes() {
    $("#modalDamageDetail input:text").val("");
}


