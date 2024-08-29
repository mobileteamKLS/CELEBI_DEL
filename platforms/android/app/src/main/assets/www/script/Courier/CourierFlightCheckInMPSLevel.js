
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
var IsATA10Days;
var FlightSeqNo;
var rcvdPieces;

$(function () {

    //setTimeout(function () {
    //    window.location.href = 'Login.html'
    //}, 1200000);

    window.onload = function() {
        $("#txtScan").trigger('focus');
      }

    $("#btnComplete").click(function () {
        $("#groupId").val('');
        //$("#groupId").focus();
        $("#groupId").trigger('focus');
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
        //$("#txtScan").focus();
        $("#txtScan").trigger('focus');
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
    }



    $("#btnDamagePackgs").click(function () {

        if ($("#txtDamagePkgs").val() == '') {
            //errmsg = "Please enter Damage Packages</br>";
            //$.alert(errmsg);
            //return;

            inputxml = "<Root><AWBId>" + IMPAWBROWID + "</AWBId><SHIPId>" + IMPSHIPROWID + "</SHIPId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

            ImportGetDamageDetails(inputxml);
            $("#lblDamagePkgs").text($("#txtDamagePkgs").val());

            $('#modalDamageDetail').modal('show');
            onFocusDamDtlText();

        } else {
            inputxml = "<Root><AWBId>" + IMPAWBROWID + "</AWBId><SHIPId>" + IMPSHIPROWID + "</SHIPId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

            ImportGetDamageDetails(inputxml);
            $("#lblDamagePkgs").text($("#txtDamagePkgs").val());

            $('#modalDamageDetail').modal('show');
            onFocusDamDtlText();

        }

        //if ($("#txtScanMAWB").val() == '' && $("#ddlFlightDate").val() == '') {
        //    //errmsg = "Please enter/scan MPS No.</br>";
        //    //$.alert(errmsg);
        //    //return;
        //} else {
        //    if ($("#txtDamagePkgs").val() == '') {
        //        //errmsg = "Please enter Damage Packages</br>";
        //        //$.alert(errmsg);
        //        //return;
        //    } else {
        //        inputxml = "<Root><AWBId>" + dmgIMPAWBROWID + "</AWBId><SHIPId>" + dmgIMPSHIPROWID + "</SHIPId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

        //        ImportGetDamageDetails(inputxml);
        //        $("#lblDamagePkgs").text($("#txtDamagePkgs").val());

        //        $('#modalDamageDetail').modal('show');
        //        onFocusDamDtlText();

        //    }
        //}
    });


    //$('#ddlFlightNoDate').change(function () {
    //    var flightVal = $('#ddlFlightNoDate').val();
    //    FlightSeqNo = flightVal.split(',')[0];
    //    IsATA10Days = flightVal.split(',')[1];
    //    ISCROWID = flightVal.split(',')[2];

    //});


});


var myVar;

function onFocusDamDtlText() {
    myVar = setTimeout(function () {
      //  $("#txtContainerAAC").focus();
        $("#txtContainerAAC").trigger('focus');
    }, 500);
}

function myStopFunction() {
    clearTimeout(myVar);
}

function onFocus() {
    //$('#txtScan').focus();
    $("#txtScan").trigger('focus');
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
    console.log("***************** openScanner *******************");
    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScanMAWB").val() == '') {
        $("body").mLoading('hide');
        //errmsg = "Please Scan Barcode No.</br>";
        //$.alert(errmsg);

        return;
    } else {
        console.log("openScanner else loop");
        inputxml = "<Root><ScanCode>" + $("#txtScanMAWB").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
        console.log(inputxml);
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
function fnClear(boolVal) {
    console.log("***************** fnClear *******************");
    $("#ddlFlightNoDate").empty();
    $("#txtScanMAWB").val('');
    $("#flightNo").val('');
    $("#flightDate").val('');
    $("#groupId").val('');
    if (boolVal == false)
    {
    $("#txtScan").val('');
    }
    $("#MAWB").val('');
    $("#HAWB").val('');
    $("#MPS").val('');
    $("#ArrivedPieces").val('');
    $("#ManiPieces").val('');
    $("#DeclPieces").val('');
    $("#RcvPieces").val('');
    $("#txtDamagePkgs").val('');
    

    $("#status").val('');
    $("#Weight").val('');
    //$("#txtScanMAWB").focus();
    $(".ibiSuccessMsg1").text('');
    $("#txtScan").trigger('focus');
}



GetImportFlightCourierDetailsV2 = function (InputXML) {
    console.log("***************** GetImportFlightCourierDetailsV2 *******************");
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
                    //$("#groupId").focus();
                    $("#groupId").trigger('focus');
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



searchRecord = function () {
    console.log("***************** searchRecord *******************");
    fnClear(true);

    if ($("#txtScan").val() == "") {
        $.alert("Please Enter/Scan MPS No.");
        return;
    }

    if ($("#txtScan").val() != "") {
        $("#txtDamagePkgs").val('');
        $('body').mLoading({
            text: "Please Wait..",
        });
        var inputSearchxml = "<Root><MPSNo>" + $("#txtScan").val() + "</MPSNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
        console.log(inputSearchxml)
        $.ajax({
            type: 'POST',
            url: ACSServiceURL + "/GetImportGetCourierDetailsV3",
            data: JSON.stringify({ 'InputXML': inputSearchxml }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                console.log(response.d);
                $("#ddlFlightNoDate").empty();
                HideLoader();
              
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    var xmlDoc = $.parseXML(str);
                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        StrMessage = $(this).find('StrMessage').text();

                        console.log("Status");
                        console.log(Status);

                        console.log("StrMessage");
                        console.log(StrMessage);

                        if (Status == 'E') {
                            $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                            $("#txtScan").val('');
                        } else if (Status == 'S') {
                            $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                        } else {
                            $(".ibiSuccessMsg1").text('');
                        }
                    });


                    $(xmlDoc).find('Table1').each(function (index) {

                 
                        $("#MAWB").val($(this).find('AWBNo').text());
                        $("#HAWB").val($(this).find('HouseNo').text());
                        $("#MPS").val($(this).find('MPSNo').text());
                        $("#ArrivedPieces").val($(this).find('NPX').text());
                        $("#Weight").val($(this).find('WeightExp').text());

                        // rcvdPieces = $(this).find('ReceivedPcs').text();
                        // console.log(" searchRecord rcvdPieces");
                        // console.log(rcvdPieces);
                        // if (hasError == false)
                        // {
                        // rcvdPieces++;
                        // }
                        $("#DeclPieces").val($(this).find('DeclaredPcs').text());
                        $("#RcvPieces").val($(this).find('ReceivedPcs').text());
                        $("#RcvPieces").val(rcvdPieces);
                        $("#ManiPieces").val($(this).find('ManifestedPcs').text());
                        IMPSHIPROWID = $(this).find('IMPSHIPROWID').text();
                        FlightSeqNo = $(this).find('FlightSeqNo').text()
                        IMPAWBROWID = $(this).find('IMPAWBROWID').text()
                       

                    });

                    $(xmlDoc).find('Table2').each(function (index) {
                        

                        FlightSeqNo = $(this).find('FlightSeqNo').text()
                        FlightDet = $(this).find('FlightDet').text()
                        IsATA10Days = $(this).find('IsATA10Days').text()
                        ISCROWID = $(this).find('ISCROWID').text()

                        if ($(xmlDoc).find('Table2').length > 1) {
                            if (index == 0) {
                                var newOption = $('<option></option>');
                                newOption.val(0).text('Select');
                                newOption.appendTo('#ddlFlightNoDate');
                            }
                            var newOption = $('<option></option>');
                            newOption.val(FlightSeqNo + ',' + IsATA10Days + ',' + ISCROWID).text(FlightDet);
                            newOption.appendTo('#ddlFlightNoDate');
                        } else {
                            var newOption = $('<option></option>');
                            newOption.val(FlightSeqNo + ',' + IsATA10Days + ',' + ISCROWID).text(FlightDet);
                            newOption.appendTo('#ddlFlightNoDate');

                            $('#ddlFlightNoDate').trigger('change');
                        }
                        

                       


                        //if (index == 0 && $("#ddlFlightNoDate").val() != "0") {
                        //    $('#ddlFlightNoDate').val(FlightSeqNo + ',' + IsATA10Days + ',' + ISCROWID);
                        //}

                    });
                    // alert($('#ddlFlightNoDate').length)

                    //if ($('#ddlFlightNoDate').children('option').length == 1) {

                    $('#dvRemarkShow').empty();
                    var Remark = '';
                    $(xmlDoc).find('Table3').each(function (index) {

                        Remark = $(this).find('Remark').text();
                        // Date = $(this).find('Date').text();
                        IsHighPriority = $(this).find('IsHighPriority').text();
                        $('#dvRemarkShow').append(Remark);
                        $('#remarkPriorityShow').modal('show');

                    });


                    //}

                    //$('#ddlFlightNoDate').trigger('change');



                    //if ($('#autoCheckBox').is(":checked")) {
                    //    setTimeout(function () {
                    //        GetImportSaveCourierDetailsV2();
                    //    }, 1000);
                    //}

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
        $.alert("Please Enter MPS No.");
    }
}


GetFlightChangeCourierDetails = function (FlightVal) {
    console.log("***************** GetFlightChangeCourierDetails *******************");
 
    if (FlightVal == 0) {
        return;
    }
    var flightVal = FlightVal;
    FlightSeqNo = flightVal.split(',')[0];
    IsATA10Days = flightVal.split(',')[1];
    ISCROWID = flightVal.split(',')[2];

    if ($("#txtScan").val() != "") {
        $('body').mLoading({
            text: "Please Wait..",
        });
        var inputSearchxml = "<Root><ISCROWID>" + ISCROWID + "</ISCROWID></Root>"
        console.log(inputSearchxml)
        $.ajax({
            type: 'POST',
            url: ACSServiceURL + "/GetFlightChangeCourierDetails",
            data: JSON.stringify({ 'InputXML': inputSearchxml }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                console.log(response.d);

                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {
                        rcvdPieces = $(this).find('ReceivedPcs').text()
                        $("#DeclPieces").val($(this).find('DeclaredPcs').text());
                        $("#RcvPieces").val($(this).find('ReceivedPcs').text());
                       
                        $("#ManiPieces").val($(this).find('ManifestedPcs').text());
                        
                       


                    });




                    onSubmitFunction();

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
        $.alert("Please Enter MPS No.");
    }
}

GetImportGetCourierAcceptedDetailsV2 = function () {
    console.log("***************** GetImportGetCourierAcceptedDetailsV2 *******************");
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



function onSubmitFunction() {
    //  IsATA10Days = 'Y'
    if (IsATA10Days == 'Y') {
        if (confirm("Flight arrived more than 10 days ago, do you want to accept the shipment?") == true) {
            GetImportSaveCourierDetailsV2();
        } else {
            fnClear(false);
        }
    } else if (IsATA10Days == 'N') {
        GetImportSaveCourierDetailsV2();
    }

}

GetImportSaveCourierDetailsV2 = function () {
    console.log("***************** GetImportSaveCourierDetailsV2 *******************");

    if ($("#txtScan").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter/scan MPS No. </br>";
        $.alert(errmsg);
        return;
    } else if ($("#ddlFlightNoDate").val() == '0') {
        $("body").mLoading('hide');
        errmsg = "Please select flight No. </br>";
        $.alert(errmsg);
        return;
    } else {
        $('body').mLoading({
            text: "Please Wait..",
        });
        var inputSavexml = "<Root><FltSeqNo>" + FlightSeqNo + "</FltSeqNo><ISCROWID>" + ISCROWID + "</ISCROWID><GroupID></GroupID><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
        console.log(inputSavexml);
        $.ajax({
            type: 'POST',
            url: ACSServiceURL + "/GetImportSaveCourierDetailsV2",
            data: JSON.stringify({ 'InputXML': inputSavexml }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                $("#txtScan").val('');
                console.log(response.d);
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    var xmlDoc = $.parseXML(str);


                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        StrMessage = $(this).find('StrMessage').text();

                        console.log("GetImportSaveCourierDetailsV2 Status = " + Status);
                        console.log("GetImportSaveCourierDetailsV2 StrMessage ="+StrMessage);


                        if (Status == 'E') {
                            $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "red", "font-weight": "bold" });

                        } else if (Status == 'S') {
                            //$("#txtScan").focus();
                            $("#txtScan").trigger('focus');
                            $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                            rcvdPieces++;
                            $("#RcvPieces").val(rcvdPieces);

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


ImportGetDamageDetails = function (InputXML) {
    console.log("***************** ImportGetDamageDetails *******************");
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
            DmgSeqNo = 0;
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
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
    console.log("***************** ImportSaveDamageDetails *******************");
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
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $('#modalDamageDetail').modal('hide');
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
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
function saveImportSaveDamageDetails() {
    console.log("***************** saveImportSaveDamageDetails *******************");

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

        inputxml = "<Root><FlightSeqNo>" + FlightSeqNo + "</FlightSeqNo><AWBId>" + IMPAWBROWID + "</AWBId><SHIPId>" + IMPSHIPROWID + "</SHIPId><DmgSeqNo>0</DmgSeqNo><DmgNOP>" + $("#lblDamagePkgs").text() + "</DmgNOP><DmgWeight>0</DmgWeight><DmgContainer>" + allTxtValue + "</DmgContainer><DmgRemarks></DmgRemarks><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    } else {
        inputxml = "<Root><FlightSeqNo>" + FlightSeqNo + "</FlightSeqNo><AWBId>" + IMPAWBROWID + "</AWBId><SHIPId>" + IMPSHIPROWID + "</SHIPId><DmgSeqNo>" + DmgSeqNo + "</DmgSeqNo><DmgNOP>" + $("#lblDamagePkgs").text() + "</DmgNOP><DmgWeight>" + DmgWeight + "</DmgWeight><DmgContainer>" + allTxtValue + "</DmgContainer><DmgRemarks></DmgRemarks><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    }

    //console.log(inputxml);
    if (FltStatus != 'Not Arrived') {
        ImportSaveDamageDetails(inputxml);
    } else {
        $("body").mLoading('hide');
        $(".ibiSuccessMsgDamg").text('Cannot receive the shipment as Flight is not arrived yet').css({ "color": "Red", "font-weight": "bold" });
    }
}

function saveImportRevokeDamageDetails() {
    console.log("***************** saveImportRevokeDamageDetails *******************");

    $('body').mLoading({
        text: "Please Wait..",
    });
    $("#valHawb").hide();
    $("#valHawb").html('');
    inputxml = "<Root><FlightSeqNo>" + FlightSeqNo + "</FlightSeqNo><AWBId>" + IMPAWBROWID + "</AWBId><SHIPId>" + IMPSHIPROWID + "</SHIPId><DmgSeqNo>" + DmgSeqNo + "</DmgSeqNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    console.log(inputxml);
    ImportRevokeDamageDetails(inputxml);


}

ImportRevokeDamageDetails = function (InputXML) {
    console.log("***************** ImportRevokeDamageDetails *******************");
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
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $('#modalDamageDetail').modal('hide');
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
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

    InputXML = "<Root><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><Description>TestDesc</Description><FlightSeqNo>" + FlightSeqNo + "</FlightSeqNo><UShipRowId>-1</UShipRowId><Type>I</Type><UAWBRowId>" + IMPAWBROWID + "</UAWBRowId><ULDId>1</ULDId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    SaveFileUploadDetails(InputXML, imageDataFromCamera);

}

SaveFileUploadDetails = function (InputXML, InputImage) {
    console.log("***************** SaveFileUploadDetails *******************");

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
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
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

function saveCameraPhoto() {
    $('body').mLoading({
        text: "Please Wait..",
    });

    InputXML = "<Root><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><Description>TestDesc</Description><FlightSeqNo>" + FlightSeqNo + "</FlightSeqNo><UShipRowId>-1</UShipRowId><Type>I</Type><UAWBRowId>" + IMPAWBROWID + "</UAWBRowId><ULDId>1</ULDId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    SaveFileUploadDetails(InputXML, imageDataFromCamera);

}



function cleartextboxes() {
    $("#modalDamageDetail input:text").val("");
}