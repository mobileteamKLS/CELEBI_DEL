
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
var FlightSeqNo;
var UAWBRowId;
var UShipRowId;
var imageDataFromCamera = "";

$(function () {



    $("#cameraTakePicture").attr('disabled', true).css('background-color', '#ccc');
    document.getElementById("cameraTakePicture").addEventListener
        ("click", cameraTakePicture);
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
    //    //$('#imgCameraImage').show();
    //    //var image = document.getElementById('imgCameraImage');
    //    //image.style.display = 'block';
    //    //image.src = "data:image/jpeg;base64," + imageData;
    //    imageDataFromCamera = imageData;
    //    saveCameraPhoto();
    //}
    //function onImageFail(message) {
    //    // alert('Failed because: ' + message);
    //}

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
                InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
                _GetFileUploadDetails(InputXML);
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
    $('#lblPageName').text("Okmány feltöltés");
    $('#lblMAWBNo').text("Fő fuvarlevéls szám");
    $('#lblHAWBNo').text("Házi fuvarlevél szám");
    $('#lblfltDetal').text("Járat információ");
    $('#lblDesc').text("Leírás");
    $('#btnExit').text("Kilépés");
    $('#btnClear').text("Törlés");
    $('#cameraTakePicture').text("Feltöltés");


}

function setTurkish() {
    $('#lblMAWBNo').text("Ana Konsimento");
    $('#lblHAWBNo').text("Ara Konsimento No");
    $('#lblfltDetal').text("Ucus Detayları");
    $('#lblDesc').text("Tanım");
    $('#btnExit').text("Çıkış");
    $('#btnClear').text("Temizle");
    $('#cameraTakePicture').text("Yukle");
    $('#lblPageName').text("Belge Yukleme");
}

function cameraTakePicture() {


    //if ($("#txtScanMAWB").val() == '') {
    //    $("body").mLoading('hide');
    //    errmsg = "Please enter AWB No.</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    //if ($("#txtDescription").val() == '') {
    //    $("body").mLoading('hide');
    //    errmsg = "Please enter Description</br>";
    //    $.alert(errmsg);
    //    return;
    //}


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
        //var image = document.getElementById('myImage');
        //var data = "data:image/jpeg;base64," + imageData;
        imageDataFromCamera = imageData;
        saveCameraPhoto();
    }

    function onFail(message) {
        //alert('Failed because: ' + message);
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


    InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
    _GetFileUploadDetails(InputXML);

    //var ScanCode = $('#txtScanMAWB').val();
    //if (ScanCode.length >= 11) {
    //    $('body').mLoading({
    //        text: "Please Wait..",
    //    });
    //    InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
    //    _GetFileUploadDetails(InputXML);
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
//                InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
//                // console.log(inputxml)
//                _GetFileUploadDetails(InputXML);
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

//function saveCameraPhoto() {
//    $('body').mLoading({
//        text: "Please Wait..",
//    });
//    inputxml = "<Root><GroupId>" + $("#txtGroupCode").val() + "</GroupId><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><AWBId>" + IMPAWBROWID + "</AWBId><HAWBId>" + HAWBID + "</HAWBId><NPR>" + Received + "</NPR><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
//    SaveImportMaifestDetailsV2(inputxml);
//}
function GetFileUploadDetails() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScanMAWB").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#txtDescription").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter description</br>";
        $.alert(errmsg);
        return;
    }



    InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
    // console.log(inputxml)
    _GetFileUploadDetails(InputXML);

}

_GetFileUploadDetails = function (InputXML) {
    $('#ddlHAWBList').text('');
    $('#ddlFlightNoandDate').text('');

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetFileUploadDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            //console.log(response.d)
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#cameraTakePicture").attr('disabled', false).css('background-color', '#3c7cd3 ');

                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        $.alert(errmsg);
                        return;
                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        return;
                    }

                });

                $(xmlDoc).find('Table1').each(function (index) {
                    var HouseNo = $(this).find('HouseNo ').text();
                    if ($(this).find("HouseNo").is(':empty')) {

                    }
                    else {

                        var newOption = $('<option></option>');
                        newOption.val(HouseNo).text(HouseNo);
                        newOption.appendTo('#ddlHAWBList');
                    }

                });
                $(xmlDoc).find('Table2').each(function (index) {

                    FlightSeqNo = $(this).find('FlightSeqNo').text();
                    UAWBRowId = $(this).find('UAWBRowId').text();
                    UShipRowId = $(this).find('UShipRowId').text();

                    var Flight = $(this).find('Flight').text();
                    var newOption = $('<option></option>');
                    newOption.val(Flight).text(Flight);
                    newOption.appendTo('#ddlFlightNoandDate');
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
            alert('Server not responding...');
        }
    });
}

function exitFunction() {
    window.location.href = 'ImportOperations.html';
}

function clearFunction() {
    $("#txtScanMAWB").val('');
    $("#ddlHAWBList").val('');
    $("#ddlFlightNoandDate").val('');
    $("#txtDescription").val('');
    $("#txtScanMAWB").focus();
    $(".ibiSuccessMsg").text('');

}

function saveCameraPhoto() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScanMAWB").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    } else {
        InputXML = "<Root><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><Description>" + $("#txtDescription").val() + "</Description><FlightSeqNo>" + FlightSeqNo + "</FlightSeqNo><UShipRowId>" + UAWBRowId + "</UShipRowId><Type>I</Type><UAWBRowId>" + UShipRowId + "</UAWBRowId><ULDId>1</ULDId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
        SaveFileUploadDetails(imageDataFromCamera, InputXML);
    }


}

SaveFileUploadDetails = function (InputImage, InputXML) {
    console.log(InputImage + '@@' + InputXML);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/SaveFileUploadDetails",
        data: JSON.stringify({ 'InputImage': InputImage, 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                // clearFunction();
                $(xmlDoc).find('Table').each(function (index) {

                });

                $(xmlDoc).find('Table1').each(function (index) {
                    navigator.notification.confirm('Document uploaded successfully.', onConfirm, 'Success', ['Ok']);
                    clearFunction();
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
            alert('Server not responding...');
        }
    });
}

function onConfirm(buttonIndex) {
    //  alert('You selected button ' + buttonIndex);
}