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
var NPR;
var ShipmentWeight;
var isDataAvail = false;
var LocWght;
var HAWBROWID = '0';
var hiddenAWBNo;
var currentLoc = "";
var currentLocPiece = "";
var currentLocId = "";
var currentLocWght = "";
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

function calculateWeight() {
    if (!isDataAvail) {
        return;
    }
    if ($("#textMovePkgs").val() == '') {
        $("#textMoveWght").val(" ");
        return;
    }
    locNOP = $("#textMovePkgs").val()
    locWeight = (parseFloat(locNOP) * parseFloat(ShipmentWeight).toFixed(3)) / parseFloat(NPR);
    $("#textMoveWght").val(locWeight.toFixed(3));
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
    $('#textMoveWght').val('');
    $("#spnTxtOriginDest")[0].innerHTML = "";
    $("#txtRNo").empty();
    $("#tblLocation").empty();
    $("#locationShow").text('');
    clearOptions("txtRNo");
    // clearOptions("flightNoDate");
    $(".ibiSuccessMsg1").text('');
    $("#ddlHAWBList").empty();
    //var newOption = $('<option></option>');
    //newOption.val('0').text('Select');
    //newOption.appendTo('#ddlHAWBList');
    currentLoc = "";
    currentLocPiece = "";
    currentLocId = "";
    currentLocWght = "";
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

    // if (($("#txtMAWBNO").val().length != 11)) {
    //     errmsg = "Please enter valid AWB No.</br>";
    //     $.alert(errmsg);
    //     $("#txtMAWBNO").val('');
    //     return;
    // }

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

                $('#txtRNo').empty();
                $('#ddlHAWBList').empty();
                var newOption = $('<option></option>');
                newOption.val('0').text('Select');
                newOption.appendTo('#txtRNo');
                $("#txtNewLocation").val('');
                $("#textMovePkgs").val('');
                $("#textMoveWght").val('');
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    OutMsg = $(this).find('OutMsg').text();
                    hiddenAWBNo = $(this).find("AWBNo").text();
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
                   $(xmlDoc).find('Table1').each(function (index, i) {

                    if ($(xmlDoc).find('Table1').length != 1) {
                        if (index == 0) {
                            var newOption = $('<option></option>');
                            newOption.val('0').text('Select');
                            newOption.appendTo('#ddlHAWBList');
                        }

                        var newOption = $("<option></option>");
                        newOption
                            .val($(this).find("EXPHAWBROWID").text())
                            .text($(this).find("HOUSE_AWB_NUMBER").text());
                        newOption.appendTo("#ddlHAWBList");
                    } else {
                        if (index == 0) {
                            HAWBROWID = $(this).find("EXPHAWBROWID").text();
                            var newOption = $("<option></option>");
                            newOption
                                .val($(this).find("EXPHAWBROWID").text())
                                .text($(this).find("HOUSE_AWB_NUMBER").text());
                            newOption.appendTo("#ddlHAWBList");

                            GetBinningAWBDetails($(this).find("EXPHAWBROWID").text());
                            $('#ddlHAWBList').trigger('change');

                            return true;
                        }
                    }
                    
                // if ($("#txtRNo").val() != "Select" || $("#txtRNo").val() != "") {
              //      GetBinningAWBDetails();
             //   }


                });

                if ($('#ddlHAWBList').find("option").length == 0) {

                    if (HAWBROWID == '0') {
                        GetBinningAWBDetails(HAWBROWID);
                       // $('#ddlHAWBList').trigger('change');

                    }
                }
                $('#dvRemarkShow').empty();
                var Remark = '';
                $(xmlDoc).find('Table2').each(function (index) {

                    Remark = $(this).find('Remark').text();
                    // Date = $(this).find('Date').text();
                    IsHighPriority = $(this).find('IsHighPriority').text();
                    $('#dvRemarkShow').append(Remark);
                    $('#remarkPriorityShow').modal('show');


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


GetBinningAWBDetails = function (HAWBROWID) {
    $("#tblLocation").empty();
    //if ($("#txtMAWBNO").val() == "") {
    //    $.alert("Please Enter Prefix");
    //    return;
    //}

    //if ($("#txtFlightNo").val() == "") {
    //    $.alert("Please Enter AWBNo.");
    //    return;
    //}
   var InputXML =
        "<Root><AWBNO>" +
        hiddenAWBNo +
        "</AWBNO><EWRNO>" +
        $("#txtRNo").val() +
        "</EWRNO><AirportCity>" +
        SHED_AIRPORT_CITY +
        "</AirportCity><Culture></Culture><EXPHAWBROWID>" + HAWBROWID + "</EXPHAWBROWID></Root>";
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
                    LocWght = $(this).find('LocatedWt').text();
                    PendingPieces = $(this).find('PendingPieces').text();
                    LocCode = $(this).find('LocCode').text();
                    LocationStatus = $(this).find('LocationStatus').text();
                    TotalPieces = $(this).find('TotalPieces').text();
                    NPR = $(this).find('NOP').text();
                    ShipmentWeight = $(this).find('Weight').text();
                    // LocWght=$(this).find('Weight').text();
                    isDataAvail = true;

                    var sum = LocCode + LocPieces;
                    if (LocCode != '') {
                        $("#LocationDiv").show();

                        $('<tr class="valp"></tr>').html('<td class="text-left .tdVal"  >' + LocCode + '</td><td class="text-right">' + LocPieces + '</td><td style="display:none;">' + OldLocId + '</td><td class="text-right">' + LocWght + '</td>').appendTo('#tblLocation');
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
                    // console.log(currentRow);

                    var col1 = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                    var col2 = currentRow.find("td:eq(1)").text(); // get current row 2nd TD
                    var col3 = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                    var col4 = currentRow.find("td:eq(3)").text(); // get current row 3rd TD
                    var data = col1 + "/" + col2 + "/" + col3;

                    getLocation(data);
                    console.log(col1 + "/" + col2 + "/" + col3 + "/" + col4);
                    currentLoc = col1;
                    currentLocPiece = col2;
                    currentLocId = col3;
                    currentLocWght = col4;
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

    if ($("#textMoveWght").val() == "") {
        $.alert("Please enter move weight");
        return;
    }
    
     if (currentLoc == "") {
        $.alert("Please select from location and pieces");
        return;
    }
    
   // var inputSavexml = "<Root><AWBNO>" + $("#txtMAWBNO").val() + "</AWBNO><EWRNO>" + $("#txtRNo").val() + "</EWRNO><OldLocCode>" + currentLoc + "</OldLocCode><OldLocPieces>" + currentLocPiece + "</OldLocPieces><OldLocWt>" + currentLocWght + "</OldLocWt><OldLocId>" + currentLocId + "</OldLocId><LocCode>" + $("#txtNewLocation").val().toUpperCase() + "</LocCode><LocPieces>" + $("#textMovePkgs").val() + "</LocPieces><LocWt>" + $("#textMoveWght").val() + "</LocWt><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture><Username>" + Userid + "</Username></Root>";
   

      if ($("#ddlHAWBList option").length > 0) {
          var inputSavexml =
              "<Root><AWBNO>" +
              hiddenAWBNo +
              "</AWBNO><EWRNO>" +
              $("#txtRNo").val() +
              "</EWRNO><OldLocCode>" +
              currentLoc +
              "</OldLocCode><OldLocPieces>" +
              currentLocPiece +
              "</OldLocPieces><OldLocWt>" + currentLocWght + "</OldLocWt><OldLocId>" +
              currentLocId +
              "</OldLocId><LocCode>" +
              $("#txtNewLocation").val() +
              "</LocCode><LocPieces>" +
              $("#textMovePkgs").val() +
              "</LocPieces><LocWt>" + $("#textMoveWght").val() + "</LocWt><AirportCity>" +
              SHED_AIRPORT_CITY +
              "</AirportCity><Culture></Culture><Username>" +
              Userid +
              "</Username><HAWBNumber>" +
              $("#ddlHAWBList option:selected").text() +
              "</HAWBNumber></Root>";
            

    } 
    else {

        var inputSavexml ="<Root><AWBNO>" +hiddenAWBNo +"</AWBNO><EWRNO>" +$("#txtRNo").val() + "</EWRNO><OldLocCode>" +
        currentLoc +
        "</OldLocCode><OldLocPieces>" +
        currentLocPiece +
        "</OldLocPieces><OldLocWt>" + currentLocWght + "</OldLocWt><OldLocId>" +
        currentLocId +
        "</OldLocId><LocCode>" +$("#txtNewLocation").val() +"</LocCode><LocPieces>"+$("#textMovePkgs").val() +"</LocPieces><LocWt>" + $("#textMoveWght").val() + "</LocWt><AirportCity>" +SHED_AIRPORT_CITY +"</AirportCity><Culture></Culture><Username>" +Userid +"</Username></Root>";
        console.log(inputSavexml)   
        console.log($("#txtNewLocation").val());
        console.log($("#textMovePkgs").val());
    }
   
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
                        $("#textMoveWght").val('');

                    } else if (Status == 'S') {
                        $("#txtNewLocation").val('');
                        $("#textMovePkgs").val('');
                        $("#textMoveWght").val('');
                        $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });
                        // GetBinningAWBDetails();
                        if ($('#ddlHAWBList').find("option").length == 0) {

                            if (HAWBROWID == '0') {
                                GetBinningAWBDetails(HAWBROWID);
                               // $('#ddlHAWBList').trigger('change');
        
                            }
                        }
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