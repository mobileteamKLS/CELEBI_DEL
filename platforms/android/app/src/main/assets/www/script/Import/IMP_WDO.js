
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
var LocXML;
var rowCollection = [];
var arrayofStockId = [];
var checkBoxCheckStatus = '';
var arrayOfRows;
var mpsNoCheck;
$(function () {

    //setTimeout(function () {
    //    window.location.href = 'Login.html'
    //}, 1200000);


    //if ($("#chkLocationStatus").is(':checked')) {
    //    alert('l');
    //}


    $("#btnSearch").click(function () {
        $('body').mLoading({
            text: "Please Wait..",
        });
        if ($("#txtWDONo").val() == '') {
            $("body").mLoading('hide');
            errmsg = "Please enter WDO No.</br>";
            $.alert(errmsg);
            return;
        } else {
            inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
            GetWDODetails(inputxml);
        }

    });

    $("#btnDiv").hide();
    $("#tbTable").hide('slow');

    //$("#btnSubmit").click(function () {

    //});


    $('#txtWDONo').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtWDONo").val() == '') {
                $("body").mLoading('hide');
                errmsg = "Please enter WDO No.</br>";
                $.alert(errmsg);
                return;
            } else {
                inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
                GetWDODetails(inputxml);
            }
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });


    $('#txtMPSNo').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });

            inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><MPSNo>" + $("#txtMPSNo").val() + "</MPSNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";

            GetWDOMPSDetailsBL(inputxml);

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

    $('#lblWDONo').text("Árukiadási jegy szám");
    $('#lblPcsWtshow').text("Darab / súly");
    $('#lblSelect').text("Kiválasz");
    $('#lblLocationcode').text("Lokáció kód");
    $('#lblPcs').text("Darabszám");
    $('#btnClose').text("Kilépés");
    $('#btnClear').text("Törlés");
    $('#btnSubmit').text("Jóváhagyás");
}


function setTurkish() {
    $('#lblWDONo').text("Depo Teslim Siparişi");
    $('#lblPcsWtshow').text("Kap/Agirlik");
    $('#lblSelect').text("Sec");
    $('#lblLocationcode').text("Lokasyon Kodu");
    $('#lblPcs').text("Parca");
    $('#btnClose').text("Çıkış");
    $('#btnClear').text("Temizle");
    $('#btnSubmit').text("Gönder");
}



function saveWDO() {

    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtWDONo").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter WDO No.</br>";
        $.alert(errmsg);
        return;
    } else {
        //  chkValue = $("#chkLocationStatus").val();
        getRowData();
        inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><Username>" + Userid + "</Username><LocDetails>" + arrayOfRows + "</LocDetails></Root>";
        console.log(inputxml);
        SaveWDODetails(inputxml);
        //  var all_checkboxes = $('#tbTable input[type="checkbox"]');

        //if (all_checkboxes.length === all_checkboxes.filter(":checked").length) {

        //} else {
        //    $("body").mLoading('hide');
        //    errmsg = "Please check all record</br>";
        //    $.alert(errmsg);
        //    return;
        //}
        // SaveWDODetails(inputxml);
    }

}


function openScanner() {
    var ScanCode = $('#txtWDONo').val();
    $('body').mLoading({
        text: "Please Wait..",
    });
    //if (ScanCode.length >= 11) {
    //    $('body').mLoading({
    //        text: "Please Wait..",
    //    });
    //    $('.ibiSuccessMsg1').text('');
    //    inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
    //    GetWDODetails(inputxml);
    //}
    inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
    GetWDODetails(inputxml);
}

function openMPSNumber() {
    var ScanCode = $('#txtWDONo').val();
    $('body').mLoading({
        text: "Please Wait..",
    });
    //if (ScanCode.length >= 11) {
    //    $('body').mLoading({
    //        text: "Please Wait..",
    //    });
    //    inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><MPSNo>" + $("#txtMPSNo").val() + "</MPSNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";

    //    GetWDOMPSDetailsBL(inputxml);
    //}
    inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><MPSNo>" + $("#txtMPSNo").val() + "</MPSNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";

    GetWDOMPSDetailsBL(inputxml);
}




//function openScanner() {
//    cordova.plugins.barcodeScanner.scan(
//    function (result) {
//        barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
//        if (!result.cancelled) {
//            $('body').mLoading({
//                text: "Please Wait..",
//            });
//            $("#txtWDONo").val(barCodeResule)
//            if ($("#txtWDONo").val() == '') {
//                $("body").mLoading('hide');
//                errmsg = "Please enter WDO No.</br>";
//                $.alert(errmsg);
//                return;
//            } else {
//                inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
//                GetWDODetails(inputxml);
//            }
//        }
//        else {
//            alert("You have cancelled scan");
//            $("#txtWDONo").focus();

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
function fnExit() {
    window.location.href = 'ImportOperations.html';
}
function fnClear() {
    $("#txtWDONo").val('');
    $("#txtMPSNo").val('');
    $("#tbTable").hide('slow');
    $("#lblPkgsWgt").html('');
    $("#lblMawbNo").html('');
    $("#lblHawbNo").html('');
    $("#lblStatus").html('');
    $("#txtScanMAWB").focus();
    $("#txtWDONo").focus();
    // $(".ibiSuccessMsg1").text('');
    $("#locationShow").text('');


}

function fnClearonClear() {
    $("#txtWDONo").val('');
    $("#txtMPSNo").val('');
    $("#tbTable").hide('slow');
    $("#lblPkgsWgt").html('');
    $("#lblMawbNo").html('');
    $("#lblHawbNo").html('');
    $("#lblStatus").html('');
    $("#txtScanMAWB").focus();
    $("#txtWDONo").focus();
    $(".ibiSuccessMsg1").text('');
    $("#locationShow").text('');


}

GetWDOMPSDetailsBL = function (InputXML) {
    //console.log(InputXML)
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetWDOMPSDetailsBL",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            // console.log(response.d)
            HideLoader();
            var str = response.d;
            // $('#tbTable').empty();
            var xmlDoc = $.parseXML(str);
            if (str != null && str != "" && str != "<NewDataSet />") {

                $(xmlDoc).find('Table1').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {

                    } else if (Status == 'S') {

                    }

                });
                $(xmlDoc).find('Table1').each(function (index) {



                    STOCKID = $(this).find('STOCKID').text();
                    LOCCODE = $(this).find('LOCCODE').text();
                    NOP = $(this).find('NOP').text();
                    WEIGHT = $(this).find('WEIGHT').text();

                    for (i = 0; i < arrayofStockId.length; i++) {
                        if (arrayofStockId[i] == STOCKID) {
                            //  $('<tr></tr>').html('<td>' + '<input type="checkbox" name="chk"  checked   class="xmlCheck" />' + '</td><td>' + _LOCCODE + '</td><td><input type="text" style="text-align:right;" value="' + _NOP + '"></td>').appendTo('#tbTable');
                            // console.log($('input[id="' + STOCKID + '"]')[0])

                            //  $('input[id="' + STOCKID + '"]').checked();
                            mpsNoCheck = $('input[id="' + STOCKID + '"]')[0].checked = true;
                            $("#txtMPSNo").val('');
                            //inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
                            //GetWDODetails(inputxml);
                        }
                        else {
                            // alert('0');
                        }
                    }







                    //var filteredCCode = arrayofStockId.find(function (item, i) {
                    //    if (item === STOCKID) {
                    //        alert('0k')
                    //    }
                    //    else {
                    //        return "0";
                    //    }
                    //});


                    //else if (PFStatus == 'F') {

                    //    $('<tr></tr>').html('<td>' + '<input type="checkbox" checked="checked" class="xmlCheck" />' + '</td><td>' + _LOCCODE + '</td><td><input type="text" style="text-align:right;" value="' + _NOP + '"></td>').appendTo('#tbTable');
                    //}

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
            // alert('Server not responding...');
        }
    });
}

GetWDODetails = function (InputXML) {

    $('.ibiSuccessMsg1').text('');

    //    inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetWDODetails",
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
                $('#tbTable').empty();
                $(xmlDoc).find('Table').each(function (index) {
                    _Status = $(this).find('Status').text();
                    _StrMessage = $(this).find('StrMessage').text();
                    if (_Status == 'E') {
                        $("#btnDiv").hide();
                        $("#txtWDONo").val('');
                        $("#lblPkgsWgt").html('');
                        $("#lblMawbNo").html('');
                        $("#lblHawbNo").html('');
                        $("#lblStatus").html('');
                        $("#spnSelect").text('');
                        $("#spnLocationCode").text('');
                        $("#spnPieces").text('');
                        errmsg = _StrMessage;
                        $.alert(errmsg);
                        return;
                    } else {
                        _ID = $(this).find('ID').text();
                        _WDONo = $(this).find('WDONo').text();
                        _AirportCity = $(this).find('AirportCity').text();
                        _Culture = $(this).find('Culture').text();

                    }
                });

                $(xmlDoc).find('Table2').each(function (index) {
                    _NOP = $(this).find('NOP').text();
                    _LOCCODE = $(this).find('LOCCODE').text();
                    PFStatus = $(this).find('PFStatus').text();
                    _STOCKID = $(this).find('STOCKID').text();
                    stockIdList = $(this).find('STOCKID').text();
                    _LOCCODE = $(this).find('LOCCODE').text();
                    _NOP = $(this).find('NOP').text();
                    _WEIGHT = $(this).find('WEIGHT').text();
                    _IsSeized = $(this).find('IsSeized').text();
                    arrayofStockId.push(stockIdList);
                    _MAWBNo = $(this).find('AWBno').text();
                    _HAWBNo = $(this).find('HAWBno').text();
                    $("#lblMawbNo").text(_MAWBNo);
                    $("#lblHawbNo").text(_HAWBNo);

                    //$("#spnLocationCode").text(_LOCCODE);
                    //$("#spnPieces").text(_NOP);
                    //$('<tr></tr>').html('<td>' + '<input type="checkbox" checked="checked" class="xmlCheck" />' + '</td><td>' + _LOCCODE + '</td><td>' + _NOP + '</td>').appendTo('#tbTable');

                    bindAllCheckBoxes();

                });


                $(xmlDoc).find('Table1').each(function (index) {
                    _WDOStatus = $(this).find('WDOStatus').text();
                    _totPkgs = $(this).find('PKG').text();
                    _totWgt = $(this).find('WGT').text();
                    MPSNoINWDO = $(this).find('MPSNoINWDO').text();
                    if (MPSNoINWDO == 'Y') {
                        $(".dis").show();
                        $('#txtMPSNo').focus();
                    } else {
                        $(".dis").hide();
                    }
                    $("#lblStatus").text(_WDOStatus);
                    $("#lblPkgsWgt").text(_totPkgs + ' / ' + _totWgt);

                });
                $('#dvRemarkShow').empty();
                var Remark = '';
                $(xmlDoc).find('Table3').each(function (index) {

                    Remark = $(this).find('Remark').text();
                    // Date = $(this).find('Date').text();
                    IsHighPriority = $(this).find('IsHighPriority').text();
                    $('#dvRemarkShow').append(Remark);
                    $('#remarkPriorityShow').modal('show');


                });

                $(xmlDoc).find('Table4').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        $("#btnSubmit").attr('disabled', 'disabled').css('background-color', '#ccc');
                    } else if (Status == 'S') {

                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    } else {
                        $(".ibiSuccessMsg1").text('');
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
            // alert('Server not responding...');
        }
    });
}


bindAllCheckBoxes = function () {
    //var str = responsData.d;
    if (PFStatus == 'P') {
        $('<tr></tr>').html('<td>' + '<input type="checkbox" name="chk" id="' + _STOCKID + '"   class="xmlCheck"  /><input type="hidden" id="' + _NOP + '" name="' + _NOP + '" value="' + _NOP + '"></td><td>' + _LOCCODE + '</td><td><input type="text" style="text-align:right;" value="' + _NOP + '"></td>').appendTo('#tbTable');
    } else if (PFStatus == 'F') {
        $('<tr></tr>').html('<td>' + '<input type="checkbox" name="chk" id="' + _STOCKID + '"  checked="checked" class="xmlCheck" /><input type="hidden" id="' + _NOP + '" name="' + _NOP + '" value="' + _NOP + '"></td><td>' + _LOCCODE + '</td><td><input type="text" style="text-align:right;" value="' + _NOP + '"></td>').appendTo('#tbTable');
    }

    LocXML = '<Rows><StockId>' + _STOCKID + '</StockId><IsSelect>' + checkBoxCheckStatus + '</IsSelect><LocCode>' + _LOCCODE + '</LocCode><Pieces>' + _NOP + '</Pieces><ActualPieces>' + _NOP + '</ActualPieces><IsSeized>' + _IsSeized + '</IsSeized></Rows>';

    // console.log(LocXML)

    rowCollection.push(LocXML);

    arrayOfRows = rowCollection.join('');

    var numberOfChecked = $('input:checkbox:checked').length;
}
var getAllrowsVal = [];
function getRowData() {
    var tblTotalPcs = document.getElementById('tblTotalPcs');

    for (var i = 1; i < tblTotalPcs.rows.length; i++) {

        var valChecked = tblTotalPcs.rows[i].cells[0].children[0].checked;
        var locationName = tblTotalPcs.rows[i].cells[1].innerText;
        var actualPcs = tblTotalPcs.rows[i].cells[2].children[0].value;
        //var actualPcsNotChange = tblTotalPcs.rows[i].cells[2].children[0].value;
        var stockidfromtbl = tblTotalPcs.rows[i].cells[0].children[0].id
        var actualPcsNotChange = tblTotalPcs.rows[i].cells[0].children[1].value
        //var valChecked = tblTotalPcs.rows[i].cells[1].children[0].checked
        LocXML = '<Rows><StockId>' + stockidfromtbl + '</StockId><IsSelect>' + valChecked + '</IsSelect><LocCode>' + locationName + '</LocCode><Pieces>' + actualPcs + '</Pieces><ActualPieces>' + actualPcsNotChange + '</ActualPieces><IsSeized>' + _IsSeized + '</IsSeized></Rows>';
        console.log(LocXML)
        getAllrowsVal.push(LocXML);
        arrayOfRows = getAllrowsVal.join('');
    }

}


SaveWDODetails = function (InputXML) {

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/SaveWDODetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            //console.log(response.d)
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                var Status0;
                var Status1;
                var Status2;
                var Status;
                var StrMessage;
                $(xmlDoc).find('Table').each(function (index) {

                    Status0 = $(this).find('Status').text();
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    //if (Status == 'E') {
                    //    $('#tbTable').empty();
                    //    getAllrowsVal = [];
                    //    LocXML = ' ';
                    //    inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
                    //    GetWDODetails(inputxml);
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    //} else if (Status == 'S') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    //}
                });


                $(xmlDoc).find('Table1').each(function (index) {

                    Status1 = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    //if (Status == 'E') {
                    //    $('#tbTable').empty();
                    //    getAllrowsVal = [];
                    //    LocXML = ' ';
                    //    inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
                    //    GetWDODetails(inputxml);
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    //} else if (Status == 'S') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    //}
                });

                $(xmlDoc).find('Table2').each(function (index) {

                    Status2 = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    //if (Status == 'E') {
                    //    $('#tbTable').empty();
                    //    getAllrowsVal = [];
                    //    LocXML = ' ';
                    //    inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
                    //    GetWDODetails(inputxml);
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    //} else if (Status == 'S') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    //}
                });





                if (Status0 == 'S' || Status1 == 'S' || Status2 == 'S') {
                    // if (StrMessage == 'Location updated successfully.') {
                    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    // }
                    fnClear();

                } else if (Status == 'E') {
                    $('#tbTable').empty();
                    getAllrowsVal = [];
                    LocXML = '';
                    inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
                    // GetWDODetails(inputxml);
                    $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                    fnClear();
                }

            } else {
                $("body").mLoading('hide');
                errmsg = "WDO No. not found</br>";
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
