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
var OldLocCode = "", oldLocatedPieces = "", OldLocId = "";
$(function () {

    $('#txtMAWBNO').keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //if ($("#txtMAWBNO").val() == "") {
            //    $.alert("Please Enter MAWB No.");
            //    return;

            //} else {
            //    GetRNoForAWB();
            //}
            openScanner();

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
    $('#lblIntMvmnt').text("İç hareket");
    $('#lblMAWBNo').text("Ana Konsimento");
    $('#lblFromLoc').text("Nerden / Parca");
    $('#lblNLoc').text("Yeni Lokasyon");
    $('#lblMpcs').text("Paketleri Tasi");
    $('#btnExit').text("Çıkış");
    $('#btnClear').text("Temizle");
    $('#btnSubmit').text("Gönder");
    $('#spnOriginDest').text("Cikis/Varis");
    $('#tdLoc').text("Lokasyon");
    $('#lblMpcs').text("Kap");
}

function setHungarian() {

    $('#lblIntMvmnt').text("Átlokálás");
    $('#lblMAWBNo').text("Főfuvarlevél szám");
    $('#lblRNo').text("R szám");
    $('#btnExit').text("Kilépés");
    $('#btnClear').text("Törlés");
    $('#btnSubmit').text("Jóváhagy");
    $('#lblFromLoc').text("Lokációból / Darab");
    $('#lblNLoc').text("Új lokáció");
    $('#lblMpcs').text("Átlokált darabszám");
    $('#spnOriginDest').text("Származási hely / Végállomás");
    $('#tdLoc').text("Lokáció");
    $('#tdLoc1').text("Darabszám");

}


//function GetRNoForAWB() {
//    if ($("#txtMAWBNO").val() == "") {
//        $.alert("Please Enter MAWB No.");
//        return;

//    } else {
//        GetRNoForAWBForGet();
//    }
//}



function fnExit() {
    window.location.href = 'ImportOperations.html';
}
function fnClear() {
    $("#txtMAWBNO").val('');
    // $("#txtFlightNo").val('');
    // $("#fromLocPcs").val('');
    $("#txtNewLocation").val('');
    $("#textMovePkgs").val('');
    $("#spnTxtOriginDest")[0].innerHTML = "";
    $("#txtRNo").empty();
    $("#tblLocation").empty();
    clearOptions("txtRNo");
    // clearOptions("flightNoDate");
    $(".ibiSuccessMsg1").text('');
}

function clearOptions(id) {
    var newOption = $('<option></option>');
    newOption.val('0').text('Select');
    newOption.appendTo('#' + id);
}



function openScanner() {

    if (($("#txtMAWBNO").val() == '')) {

        return;
    }

    if (($("#txtMAWBNO").val().length != 11)) {
        errmsg = "Please enter valid AWB No.</br>";
        $.alert(errmsg);
        $("#txtMAWBNO").val('');
        return;
    }

    var InputXML = "<Root><AWBNO>" + $("#txtMAWBNO").val() + "</AWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture></Root>";

    GetRNoForAWBForGet(InputXML);

    //var ScanCode = $('#txtMAWBNO').val();
    //if (ScanCode.length >= 11) {
    //    $('body').mLoading({
    //        text: "Please Wait..",
    //    });
    //    var InputXML = "<Root><AWBNO>" + $("#txtMAWBNO").val() + "</AWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture></Root>";

    //    GetRNoForAWBForGet(InputXML);
    //}
}

GetRNoForAWBForGet = function (InputXML) {

    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetRNoForAWB",
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

                $("#txtRNo").empty();
                var newOption = $('<option></option>');
                newOption.val('0').text('Select');
                newOption.appendTo('#txtRNo');
                $("#txtNewLocation").val('');
                $("#textMovePkgs").val('');
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    OutMsg = $(this).find('OutMsg').text();
                    if (Status == 'E') {

                        if (Status == 'E') {
                            $("#btnSubmit").attr('disabled', 'disabled').css('background-color', '#a7a7a7');
                            $(".ibiSuccessMsg1").text(OutMsg).css({ "color": "Red", "font-weight": "bold" });

                        } else if (Status == 'S') {
                            $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });
                            $("#btnSubmit").removeAttr('disabled').css('background-color', '#3c7cd3');;
                        } else {
                            $(".ibiSuccessMsg1").text('');
                            $("#btnSubmit").removeAttr('disabled').css('background-color', '#3c7cd3');;
                        }
                    } else {
                        var newOption = $('<option></option>');
                        newOption.val($(this).find('EWRNo').text()).text($(this).find('EWRNo').text());
                        newOption.appendTo('#txtRNo');
                        $("#txtRNo").val($(this).find('EWRNo').text())
                    }
                });
                if ($("#txtRNo").val() != "Select" || $("#txtRNo").val() != "") {
                    GetBinningAWBDetails();
                }

                $(xmlDoc).find('Table1').each(function (index) {

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


GetBinningAWBDetails = function () {
    $("#tblLocation").empty();
    //if ($("#txtMAWBNO").val() == "") {
    //    $.alert("Please Enter Prefix");
    //    return;
    //}

    //if ($("#txtFlightNo").val() == "") {
    //    $.alert("Please Enter AWBNo.");
    //    return;
    //}
    var InputXML = "<Root><AWBNO>" + $("#txtMAWBNO").val() + "</AWBNO><EWRNO>" + $("#txtRNo").val() + "</EWRNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture></Root>";
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetBinningAWBDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d)
            HideLoader();
            var str = response.d;
            $("#tblLocation").empty();
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    OutMsg = $(this).find('OutMsg').text();
                    if (Status == 'E') {
                        // $(".ibiSuccessMsg1").text(OutMsg).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $("#txtNewLocation").focus();
                        // $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });

                    } else {
                        //  $(".ibiSuccessMsg1").text('');
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    $("#spnTxtOriginDest")[0].innerHTML = $(this).find('Origin').text() + "/" + $(this).find('Destination').text();
                    OldLocCode = $(this).find('LocCode').text();
                    LocatedPieces = $(this).find('LocatedPieces').text();
                    OldLocId = $(this).find('LocationId').text();

                    Origin = $(this).find('Origin').text();
                    Destination = $(this).find('Destination').text();
                    Commodity = $(this).find('Commodity').text();
                    LocId = $(this).find('LocId').text();
                    LocPieces = $(this).find('LocatedPieces').text();
                    PendingPieces = $(this).find('PendingPieces').text();
                    LocCode = $(this).find('LocCode').text();
                    LocationStatus = $(this).find('LocationStatus').text();
                    TotalPieces = $(this).find('TotalPieces').text();


                    var sum = LocCode + LocPieces;
                    if (LocCode != '') {
                        $("#LocationDiv").show();

                        $('<tr class="valp"></tr>').html('<td class="text-left .tdVal"  >' + LocCode + '</td><td class="text-right">' + LocPieces + '</td><td style="display:none;">' + LocId + '</td>').appendTo('#tblLocation');
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

                    var selected = $(this).hasClass("highlight");
                    $("#tblLocation tr").removeClass("highlight");
                    if (!selected)
                        $(this).addClass("highlight");
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

function getLocation(data) {
    var str = data;
    var rest = str.substring(0, str.lastIndexOf("/"));
    currentLocID = str.substring(str.lastIndexOf("/") + 1, str.length);
    $("#locationShow").text(rest);
}

SaveInternalMovementDetails = function () {


    if ($("#txtMAWBNO").val() == "") {
        $.alert("Please enter AWB No.");
        return;
    }

    if ($("#txtRNo").val() == "Select" || $("#txtRNo").val() == "") {
        $.alert("Please select R No.");
        return;
    }

    if ($("#txtNewLocation").val() == "") {
        $.alert("Please enter new location");
        return;
    }

    if ($("#textMovePkgs").val() == "") {
        $.alert("Please enter move pieces.");
        return;
    }


    var inputSavexml = "<Root><AWBNO>" + $("#txtMAWBNO").val() + "</AWBNO><EWRNO>" + $("#txtRNo").val() + "</EWRNO><OldLocCode>" + OldLocCode + "</OldLocCode><OldLocPieces>" + LocatedPieces + "</OldLocPieces><OldLocId>" + OldLocId + "</OldLocId><LocCode>" + $("#txtNewLocation").val() + "</LocCode><LocPieces>" + $("#textMovePkgs").val() + "</LocPieces><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture><Username>" + Userid + "</Username></Root>";
    console.log(inputSavexml)
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/SaveInternalMovementDetails",
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
                    OutMsg = $(this).find('OutMsg').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(OutMsg).css({ "color": "Red", "font-weight": "bold" });
                        $("#txtNewLocation").val('');
                        $("#textMovePkgs").val('');
                    } else if (Status == 'S') {
                        $("#txtNewLocation").val('');
                        $("#textMovePkgs").val('');
                        $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });
                        GetBinningAWBDetails();
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

exitFunction = function () {

    location.href = 'ExportOperations.html'
}