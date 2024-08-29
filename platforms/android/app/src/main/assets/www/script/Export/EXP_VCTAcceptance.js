
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
var language = window.localStorage.getItem("Language");
var doorOptionforback = window.localStorage.getItem("doorOption");


var flag = localStorage.getItem('flag');


var IsSealed;
var REM;
var AcceptedPkg;
var TOTNOP;
var Weight;
var AWBULDC;
var DOOR;
var VCTStatus;
var VCTNo;
var VCTId;
var IsDocInDone;
var IsDocOutDone;
var ScannedNo;
var txtVCTNo = window.localStorage.getItem("txtVCTNo");
var txtScannedNo = window.localStorage.getItem("txtScannedNo");
var Code;
var doorOption;
$(function () {

    if (flag == '1') {
        if (txtVCTNo != '') {
            localStorage.setItem('isVCTNo', '1');
            inputxml = "<Root><VCTNo>" + txtVCTNo + "</VCTNo><ScannedNo></ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
            _GetVCTDetails(inputxml);
        } else if (txtScannedNo != '') {
           
            if (txtScannedNo.startsWith('T') || txtScannedNo.startsWith('S')) {
                inputxml = "<Root><VCTNo>" + txtScannedNo + "</VCTNo><ScannedNo></ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
                _GetVCTDetails(inputxml);
            }
            else {
                localStorage.setItem('isVCTNo', '0');
                inputxml = "<Root><VCTNo></VCTNo><ScannedNo>" + txtScannedNo + "</ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
                _GetVCTDetails(inputxml);
            }
        }
    }
   
   
   
    $("#ddlDoorList").trigger('change');

    $("#ddlDoorList").change(function () {
        doorOption = $(this).find("option:selected").text();
        
        localStorage.setItem('doorOption', doorOption);

    });

    $("#btnAdd").click(function () {

    });

    $("#btnDockIn").prop("disabled", true).css('background-color', '#a7a7a7');
    $("#btnNext").prop('disabled', true).css('background-color', '#a7a7a7');
    $("#btnDockOut").prop('disabled', true).css('background-color', '#a7a7a7');

    $('#txtScannedNo').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            GetVCTDetails();
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });


    $('#txtVCTNo').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            GetVCTDetails();
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });

    $("#btnUnScanned").click(function () {
        getAllDetailOfHAWB();
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
    $('#lblPageName').text("Kamyon Kabul");
   // $('#lblVCTNo').text("Kamyon Kabul");
    $('#lblBar').text("Barkod Tara");
    $('#lblVCTNo').text("Kamyon No");
    $('#lblDoor').text("Kapi");
    $('#chkIsSealed1').text("Muhurlu");
    $('#lbloTotPcs').text("");
    $('#lblTotWt').text("Toplam Agirlik");
    $('#lblAccPcs').text("Kabul adet");
    $('#lblRemPcs').text("Kalan Parçalar");
    $('#lblAwbCount').text("Konsimento Sayısı");
    $('#btnClear').text("Temizle");
    $('#btnNext').text("Sonraki");
    $('#btnUnScanned').text("Taranmamıs");
}

function setHungarian() {

    $('#lblScan').text("Bárkód szkennelése");
    $('#lblVCTNo').text("VCT szám.");
    $('#lblDoor').text("Kapu");
    $('#btnDockIn').text("Dokkolás");
    $('#chkIsSealed1').text("Plombálva");
    $('#lbloTotPcs').text("Total darabszám");
    $('#lblTotWt').text("Total súly");
    $('#lblAccPcs').text("Átvett darabszám");
    $('#lblRemPcs').text("Fennmaradó darabszám");
    $('#lblAwbCount').text("Fuvarlevél darab");
    $('#btnClear').text("Törlés");
    $('#btnNext').text("Következő");
    $('#btnUnScanned').text("Nem szkennelt");
    $('#btnDockOut').text("Kidokkolás");
    $('#lblPageName').text("Áruátvétel");


}


function GetVCTDetails() {


    //if ($("#txtScannedNo").val() == '') {
    //    return;
    //}


    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScannedNo").val() != '' || $("#txtVCTNo").val() != '') {
        if ($("#txtVCTNo").val() != '') {
            localStorage.setItem('isVCTNo', '1');
            inputxml = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><ScannedNo></ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
            _GetVCTDetails(inputxml);
        } else if ($("#txtScannedNo").val() != '') {
            
            if ($("#txtScannedNo").val().startsWith('T') || $("#txtScannedNo").val().startsWith('S')) {
                inputxml = "<Root><VCTNo>" + $("#txtScannedNo").val() + "</VCTNo><ScannedNo></ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
                _GetVCTDetails(inputxml);
            }
            else {
                localStorage.setItem('isVCTNo', '0');
                inputxml = "<Root><VCTNo></VCTNo><ScannedNo>" + $("#txtScannedNo").val() + "</ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
                _GetVCTDetails(inputxml);
            }

        }

    } else {
        HideLoader();
        //errmsg = "Please enter Scanning No. or VCT No.</br>";
        //$.alert(errmsg);
        return;
    }
}



_GetVCTDetails = function (InputXML) {
    console.log(InputXML);
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetVCTDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            $("#ddlDoorList").empty()
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

                    IsSealed = $(this).find('IsSealed').text();
                    REM = $(this).find('REM').text();
                    AcceptedPkg = $(this).find('AcceptedPkg').text();
                    TOTNOP = $(this).find('TOTNOP').text();
                    Weight = $(this).find('Weight').text();
                    AWBULDC = $(this).find('AWBULDC').text();
                    DOOR = $(this).find('DOOR').text();
                    VCTStatus = $(this).find('VCTStatus').text();
                    VCTNo = $(this).find('VCTNo').text();
                    VCTId = $(this).find('VCTId').text();
                    IsDocInDone = $(this).find('IsDocInDone').text();
                    IsDocOutDone = $(this).find('IsDocOutDone').text();
                    ScannedNo = $(this).find('ScannedNo').text();
                    // changes done here
                    IsAccepted = $(this).find('flag').text();
                    AcceptanceStatus = $(this).find('AcceptanceStatus').text();
                    var newOption = $('<option></option>');
                    // if (flag == '0') {
                    newOption.val(DOOR).text(DOOR);
                    newOption.appendTo('#ddlDoorList');

                    //  }
                    //else if (flag == '1') {

                    //    newOption.val(doorOptionforback).text(doorOptionforback);
                    //    newOption.appendTo('#ddlDoorList');
                    //}


                    $('#ddlDoorList option').filter(function () {
                        return ($(this).val().trim() == "" && $(this).text().trim() == "");
                    }).remove();

                    var a = new Array();
                    $("#ddlDoorList").children("option").each(function (x) {
                        test = false;
                        b = a[x] = $(this).text();
                        for (i = 0; i < a.length - 1; i++) {
                            if (b == a[i]) test = true;
                        }
                        if (test) $(this).remove();
                    });


                    $("#txtVCTNo").val(VCTNo);
                    $("#spnTotalPieces").text(TOTNOP);
                    $("#spnTotalWt").text(Weight);
                    $("#spnAcceptedPieces").text(AcceptedPkg);
                    $("#spnRemainingPieces").text(REM).css('color', 'red');;
                    $("#spnAWBCount").text(AWBULDC);
                    $("#lblDockName").text(VCTStatus).css('color', 'red');
                    //here
                    if (AcceptanceStatus == 'Dock-In') {

                        if (flag == '0') {
                            if ($("#txtScannedNo").val().startsWith('T') || $("#txtScannedNo").val().startsWith('S')){
                                window.localStorage.setItem("txtScannedNo", '');
                            }
                            else{
                                window.localStorage.setItem("txtScannedNo", $("#txtScannedNo").val());
                            }
                            window.localStorage.setItem("txtVCTNo", $("#txtVCTNo").val());
                            window.localStorage.setItem("VCTNo", $("#txtVCTNo").val());
                            window.localStorage.setItem("VCTId", VCTId);
                            window.location.href = 'EXP_VCTAcceptanceChild.html';
                        }
                        $("#btnDockIn").prop("disabled", true).css('background-color', '#a7a7a7');
                        $("#btnNext").prop('disabled', false).css('background-color', '#3c7cd3');
                        if(VCTStatus=='Dock-Out'){
                            $("#btnDockOut").prop('disabled', true).css('background-color', '#a7a7a7');
                        }
                        else{
                            $("#btnDockOut").prop('disabled', false).css('background-color', '#3c7cd3');   
                        }
                        
                    } else if (AcceptanceStatus == 'Dock-Out') {
                        $("#btnDockIn").prop("disabled", true).css('background-color', '#a7a7a7');
                        $("#btnNext").prop('disabled', true).css('background-color', '#a7a7a7');
                        $("#btnDockOut").prop('disabled', true).css('background-color', '#a7a7a7');
                      //here
                    } else if (AcceptanceStatus == 'Pending') {
                        $("#btnNext").prop('disabled', true).css('background-color', '#a7a7a7');
                        $("#btnDockOut").prop('disabled', true).css('background-color', '#a7a7a7');
                        $("#btnDockIn").prop("disabled", false).css('background-color', '#3c7cd3');
                    }

                    if (IsSealed == 'Y') {
                        $("#chkIsSealed").prop("checked", true);

                    } else if (IsSealed == 'N') {
                        $("#chkIsSealed").prop("checked", false);

                    }



                });

                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                });
                // $("#ddlDoorList").text('');
                $(xmlDoc).find('Table2').each(function (index) {
                    Code = $(this).find('Code').text();
                    Name = $(this).find('Name').text();
                    var newOption = $('<option></option>');
                    newOption.val(Code).text(Name);
                    newOption.appendTo('#ddlDoorList');
                    //if (flag == '0') {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(Code).text(Name);
                    //    newOption.appendTo('#ddlDoorList');
                    //}

                });

                //if (flag == '1') {
                //    var newOption = $('<option></option>');
                //    newOption.val(doorOptionforback).text(doorOptionforback);
                //    newOption.appendTo('#ddlDoorList');
                //}
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


function SaveVCTStatus() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#ddlDoorList").val() == '-1') {
        HideLoader();
        errmsg = "Please select Door</br>";
        $.alert(errmsg);
        return;
    } else {
        inputxml = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><VCTId>" + VCTId + "</VCTId><IsSecured>true</IsSecured><EventType>I</EventType><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId><Door>" + $("#ddlDoorList").val() + "</Door></Root>";
        _SaveVCTStatus(inputxml);
    }

}

_SaveVCTStatus = function (InputXML) {

    $.ajax({
        type: 'POST',
        url: ExpURL + "/SaveVCTStatus",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                var Status;
                var StrMessage;
                $(xmlDoc).find('Table').each(function (index) {
                    //Status = $(this).find('Status').text();
                    //StrMessage = $(this).find('StrMessage').text();
                    //if (Status == 'E') {
                    //    clearFunction();
                    //    $("body").mLoading('hide');
                    //    errmsg = StrMessage;
                    //    $.alert(errmsg);
                    //    return;

                    //} else if (Status == 'S') {

                    //}
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        // clearFunction();

                        $("#lblDockName").text('');
                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        GetVCTDetails();
                    } else {
                        $(".ibiSuccessMsg1").text('');
                    }

                });

                $(xmlDoc).find('Table1').each(function (index) {
                    window.localStorage.setItem("ID", $(this).find('ID').text());
                    window.localStorage.setItem("VCTNo", $(this).find('VCTNo').text());
                    window.localStorage.setItem("VCTId", $(this).find('VCTId').text());
                    window.localStorage.setItem("IsSecured", $(this).find('IsSecured').text());
                    window.localStorage.setItem("EventType", $(this).find('EventType').text());
                    window.localStorage.setItem("AirportCity", $(this).find('AirportCity').text());
                    window.localStorage.setItem("UserId", $(this).find('UserId').text());
                    window.localStorage.setItem("Culture", $(this).find('Culture').text());
                    window.localStorage.setItem("txtScannedNo", $("#txtScannedNo").val());
                    window.localStorage.setItem("txtVCTNo", $("#txtVCTNo").val());
                    //  window.localStorage.setItem("doorOption", doorOption);


                    localStorage.setItem('flag', '0');
                    if (Status != 'E') {
                        window.location.href = 'EXP_VCTAcceptanceChild.html';
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
            alert('Server not responding...');
        }
    });
}


function clearFunction() {
    $("#txtScannedNo").val('');
    $("#txtVCTNo").val('');
    $("#spnTotalPieces").text('');
    $("#spnTotalWt").text('');
    $("#spnAcceptedPieces").text('');
    $("#spnRemainingPieces").text('');
    $("#spnAWBCount").text('');
    $("#lblDockName").text('');
    $(".ibiSuccessMsg1").text('');
    $("#ddlDoorList").empty();
    $(".ibiSuccessMsg1").text('');
    flag=0;


}


function getAllDetailOfHAWB() {


    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScannedNo").val() != '' || $("#txtVCTNo").val() != '') {
        if ($("#txtVCTNo").val() != '') {
            $('#modalUnSacnnedDetals').modal('show');
            inputxml = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><ScannedNo></ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
            GetVCTUnScannedDetails(inputxml);
        } else if ($("#txtScannedNo").val() != '') {
            $('#modalUnSacnnedDetals').modal('show');
            inputxml = "<Root><VCTNo></VCTNo><ScannedNo>" + $("#txtScannedNo").val() + "</ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
            GetVCTUnScannedDetails(inputxml);
        }

    } else {
        HideLoader();
        errmsg = "Please enter Scanning No. or VCT No.</br>";
        $.alert(errmsg);
        return;
    }
}

function openScanner() {

    if ($("#txtScannedNo").val() != '' || $("#txtVCTNo").val() != '') {
        if ($("#txtVCTNo").val() != '') {
            inputxml = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><ScannedNo></ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
            _GetVCTDetails(inputxml);
        } else if ($("#txtScannedNo").val() != '') {
            inputxml = "<Root><VCTNo></VCTNo><ScannedNo>" + $("#txtScannedNo").val() + "</ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
            _GetVCTDetails(inputxml);
        }

    }
    //else {
    //    HideLoader();
    //    errmsg = "Please enter Scanning No. or VCT No.</br>";
    //    $.alert(errmsg);
    //    return;
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
//            $("#txtScannedNo").val(barCodeResule);

//            if ($("#txtScannedNo").val() != '' || $("#txtVCTNo").val() != '') {
//                if ($("#txtVCTNo").val() != '') {
//                    inputxml = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><ScannedNo></ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
//                    _GetVCTDetails(inputxml);
//                } else if ($("#txtScannedNo").val() != '') {
//                    inputxml = "<Root><VCTNo></VCTNo><ScannedNo>" + $("#txtScannedNo").val() + "</ScannedNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
//                    _GetVCTDetails(inputxml);
//                }

//            } else {
//                HideLoader();
//                errmsg = "Please enter Scanning No. or VCT No.</br>";
//                $.alert(errmsg);
//                return;
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

GetVCTUnScannedDetails = function (InputXML) {
    //  $('#modalUnSacnnedDetals').modal('show');
    $('body').mLoading({
        text: "Please Wait..",
    });
    $("#ddlMAWBNo").text('');
    $("#ddlHAWBNo").text('');
    $("#ddlEquTrolley").text('');
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetVCTUnScannedDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            $("#tblHAWBNoDetail").empty();
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        //clearFunction();
                        //$("body").mLoading('hide');
                        //errmsg = StrMessage;
                        //$.alert(errmsg);
                        //return;

                    } else if (Status == 'S') {


                    }

                });
                $(xmlDoc).find('Table1').each(function (index) {
                    Type = $(this).find('Type').text();
                    ConsignmentRowID = $(this).find('ConsignmentRowID').text();
                    DocumentNo = $(this).find('DocumentNo').text();
                    HAWBNo = $(this).find('HAWBNo').text();
                    RemainingPkg = $(this).find('RemainingPkg').text();
                    RemainingWt = $(this).find('RemainingWt').text();
                    WtUOM = $(this).find('WtUOM').text();
                    IsSecured = $(this).find('IsSecured').text();
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();

                    $('<tr></tr>').html('<td class="text-right">' + DocumentNo + '</td><td>' + HAWBNo + '</td><td class="text-right">' + RemainingPkg + '</td>').appendTo('#tblHAWBNoDetail');

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


function dockOutStatusSave() {
    //window.location.href = 'EXP_VCTAcceptanceChild.html';
    //if (REM != '0') {
    //    HideLoader();
    //    errmsg = "Cargo Acceptance pending. Action Cancelled.</br>";
    //    $.alert(errmsg);
    //    return;
    //} else {
    //    inputxml = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><VCTId>" + VCTId + "</VCTId><IsSecured>true</IsSecured><EventType>O</EventType><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
    //    _SaveVCTStatus(inputxml);
    //}

    inputxml = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><VCTId>" + VCTId + "</VCTId><IsSecured>true</IsSecured><EventType>O</EventType><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId><Door>" + $("#ddlDoorList").val() + "</Door></Root>";
    _SaveVCTStatus(inputxml);
}

function dockInStatusSave() {
    //window.location.href = 'EXP_VCTAcceptanceChild.html';
    //if (REM != '0') {
    //    HideLoader();
    //    errmsg = "Cargo Acceptance pending. Action Cancelled.</br>";
    //    $.alert(errmsg);
    //    return;
    //} else {
    //    inputxml = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><VCTId>" + VCTId + "</VCTId><IsSecured>true</IsSecured><EventType>O</EventType><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
    //    _SaveVCTStatus(inputxml);
    //}

    inputxml = "<Root><VCTNo>" + $("#txtVCTNo").val() + "</VCTNo><VCTId>" + VCTId + "</VCTId><IsSecured>true</IsSecured><EventType>I</EventType><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId><Door>" + $("#ddlDoorList").val() + "</Door></Root>";
    _SaveVCTStatus(inputxml);
}

