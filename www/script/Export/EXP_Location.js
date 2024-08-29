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

    $('#txtMAWBNo').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            GetRNoForAWB();
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
    $('#lblPageName').text("Lokasyon");
    $('#titLoc').text("Lokasyon");
    $('#lblMAWBNo').text("Ana Konsimento");
    $('#lblLocation').text("Lokasyon");
    $('#lblBinPcs').text("Depolanan Kap");
    $('#btnSbmit').text("Gönder");
    $('#spnOrignDest').text("Cikis/Varis");
    $('#spnCommodity').text("Cinsi");
    $('#spnBinnPkgs').text("Depolama/ Toplam Kap");
    $('#btnBackp').text("Temizle");
}

function setHungarian() {
    $('#lblMAWBNo').text("Fő Fuvarlevél szám");
    $('#lblRNo').text("R szám");
    $('#lblLocation').text("Lokáció");
    $('#lblBinPcs').text("Belokált darabszám");
    $('#btnSbmit').text("Jóváhagy");
    $('#spnOrignDest').text("Származási hely / Végállomás");
    $('#spnCommodity').text("Áru jellege");
    $('#spnBinnPkgs').text("Belokált / Total darabszám");
    $('#btnExit').text("Törlés");
    $('#lblLocation').text("Lokáció");
    $('#lblPageName').text("Lokáció");
    $('#btnBackp').text("Kilépés");
    
    
}



function fnBackpage() {
    window.location.href = 'ExportOperations.html';
}
function fnClear() {
    $("#txtMAWBNo").val('');
    $("#txtLocation").val('');
    $("#spnTxtOriginDest")[0].innerHTML = "";
    $("#spnTxtCommodity")[0].innerHTML = "";
    $("#spnTxtbinnPkgs")[0].innerHTML = "";
    $("#txtBinnPkgs").val("");
    $("#ddlHAWBList").empty();
    var newOption = $('<option></option>');
    newOption.val('0').text('Select');
    newOption.appendTo('#ddlHAWBList');
    $("#txtMAWBNo").focus();
    $(".ibiSuccessMsg1").text('');

}

GetRNoForAWB = function () {



    if (($("#txtMAWBNo").val() == '')) {

        return;
    }

    if (($("#txtMAWBNo").val().length != 11)) {
        errmsg = "Please enter valid AWB No.</br>";
        $.alert(errmsg);
        $("#txtMAWBNo").val('');
        return;
    }


    // if ($("#txtMAWBNo").val().length >= 11) {
    var InputXML = "<Root><AWBNO>" + $("#txtMAWBNo").val() + "</AWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity>" + language + "<Culture></Culture></Root>";
    //console.log(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetRNoForAWB",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            //console.log(response.d)
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $("#ddlHAWBList").empty();

                var newOption = $('<option></option>');
                newOption.val('0').text('Select');
                newOption.appendTo('#ddlHAWBList');

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    OutMsg = $(this).find('OutMsg').text();

                    //var newOption = $('<option></option>');
                    //newOption.val($(this).find('EWRNo').text()).text($(this).find('EWRNo').text());
                    //newOption.appendTo('#ddlHAWBList');
                    //$("#ddlHAWBList").val($(this).find('EWRNo').text())
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(OutMsg).css({ "color": "Red", "font-weight": "bold" });
                        $("#txtMAWBNo").val('');
                    } else if (Status == 'S') {
                        $("#txtLocation").focus();
                        $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });
                        var newOption = $('<option></option>');
                        newOption.val($(this).find('EWRNo').text()).text($(this).find('EWRNo').text());
                        newOption.appendTo('#ddlHAWBList');
                        $("#ddlHAWBList").val($(this).find('EWRNo').text())
                    }
                });
                if ($("#ddlHAWBList").val() != "0" && $("#ddlHAWBList").val() != "") {
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
            //alert('Server not responding...');
        }
    });
    // }
}


GetBinningAWBDetails = function () {
    if ($("#txtMAWBNo").val() == "") {
        $.alert("Please Enter AWB No.");
        return;
    }
    if ($("#txtMAWBNo").val().length >= 11) {
        var InputXML = "<Root><AWBNO>" + $("#txtMAWBNo").val() + "</AWBNO><EWRNO>" + $("#ddlHAWBList").val() + "</EWRNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture></Root>";
        //console.log(InputXML)

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
                // console.log(response.d)
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    // $("#btnDiv").show('slow');
                    // $("#tbTable").show('slow');
                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        OutMsg = $(this).find('OutMsg').text();
                        if (Status == 'E') {
                            //  $(".ibiSuccessMsg1").text(OutMsg).css({ "color": "Red", "font-weight": "bold" });

                        } else if (Status == 'S') {
                            // $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });

                        } else {
                            // $(".ibiSuccessMsg1").text('');
                        }
                    });

                    $(xmlDoc).find('Table1').each(function (index) {
                        $("#spnTxtOriginDest")[0].innerHTML = $(this).find('Origin').text() + "/" + $(this).find('Destination').text();
                        $("#spnTxtCommodity")[0].innerHTML = $(this).find('CommodityDesc').text();
                        $("#spnTxtbinnPkgs")[0].innerHTML = $(this).find('RemainingPieces').text();
                    });


                } else {
                    $("body").mLoading('hide');
                    return;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $("body").mLoading('hide');
                // alert('Server not responding...');
            }
        });
    }
}



SaveLocationDetails = function () {
    if ($("#txtMAWBNo").val() == "") {
        $.alert("Please Enter AWB No.");
        return;
    }

    if ($("#ddlHAWBList").val() == "Select" || $("#ddlHAWBList").val() == "") {
        $.alert("Please Select R No.");
        return;
    }

    if ($("#txtLocation").val() == "") {
        $.alert("Please enter location");
        return;
    }

    if ($("#txtBinnPkgs").val() == "") {
        $.alert("Please enter Binn Pkgs.");
        return;
    }


    var inputSavexml = "<Root><AWBNO>" + $("#txtMAWBNo").val() + "</AWBNO><EWRNO>" + $("#ddlHAWBList").val() + "</EWRNO><LocCode>" + $("#txtLocation").val() + "</LocCode><LocPieces>" + $("#txtBinnPkgs").val() + "</LocPieces><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity>>" + language + "<Culture></Culture><Username>" + Userid + "</Username></Root>";
    console.log(inputSavexml)
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/SaveLocationDetails",
        data: JSON.stringify({ 'InputXML': inputSavexml }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);

                $("#txtBinnPkgs").val('');
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    OutMsg = $(this).find('OutMsg').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(OutMsg).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        // GetRNoForAWB();
                        fnClear();
                        $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });

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

