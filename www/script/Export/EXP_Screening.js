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

    var language = window.localStorage.getItem("Language");

    switch (language) {
        case "English":
            //setEnglish();
            break;
        case "Turkish":
            setTurkish();
            break;
    }

    //if ($("#chkLocationStatus").is(':checked')) {
    //    alert('l');
    //}


    $("#btnSearch").click(function () {
        submitScranning();
    });

    $('#txtGrpID').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            submitScranning();
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });


});


submitScranning = function () {
    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtGrpID").val() == '') {
        HideLoader();
        errmsg = "Please enter Group Id</br>";
        $.alert(errmsg);
        return;
    } else {
        inputxml = "<Root><GroupId>" + $("#txtGrpID").val() + "</GroupId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture><UserId>" + Userid + "</UserId></Root>";
        console.log(inputxml)
        GetScreeningAWBDetails(inputxml);
    }

}

function setEnglish() {
    $('#lblUnitization').text("Unitization");
}
function setTurkish() {
    $('#lblRotationNo').text("Ticket");
    $('#lblWDO').text("WDO Nr.");
    $('#lblAWB').text("AWB No.");
    $('#lblHAWB').text("HAWB No.");
    $('#lblPcs').text("Paket Sayisi");
    $('#lblWt').text("ağırlık");
    $('#lblLocationCode').text("konum kodu");
    $('#lblDeliver').text("teslim");
    $('#btnExcLanded').val("çikiş");
    $('#btnModify').val("göndermek");
}
function fnExit() {
    window.location.href = 'ImportOperations.html';
}
function fnClear() {
    $("#txtGrpID").val('');
    $("#txtMachineId").val('');
    $("#spnTextMAWB")[0].innerHTML = "";
    $("#spnTextHAWB")[0].innerHTML = "";
    $("#spnTextOriginDest")[0].innerHTML = "";
    $("#spnTxtPcs")[0].innerHTML = "";
    $("#txtGrpID").focus();
    $(".ibiSuccessMsg1").text('');
}

GetScreeningAWBDetails = function (InputXML) {
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetScreeningAWBDetails",
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
                    OutMsg = $(this).find('OutMsg').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(OutMsg).css({ "color": "Red", "font-weight": "bold" });
                        // $("#assign").attr('disabled', 'disabled');
                        $("#txtGrpID").val('');
                        $("#txtMachineId").val('');
                        $("#spnTextMAWB")[0].innerHTML = "";
                        $("#spnTextHAWB")[0].innerHTML = "";
                        $("#spnTextOriginDest")[0].innerHTML = "";
                        $("#spnTxtPcs")[0].innerHTML = "";
                        $("#txtGrpID").focus();
                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(OutMsg).css({ 'color': 'green', "font-weight": "bold" });
                        //  $("#assign").attr('disabled', 'disabled');
                    } else {
                        $(".ibiSuccessMsg1").text('');
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    $("#spnTextMAWB")[0].innerHTML = $(this).find('MAWBNO').text();
                    $("#spnTextHAWB")[0].innerHTML = $(this).find('HAWBNO').text();
                    $("#spnTextOriginDest")[0].innerHTML = $(this).find('Origin').text() + "/" + $(this).find('Destination').text();
                    $("#spnTxtPcs")[0].innerHTML = $(this).find('Pieces').text();
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



SaveScreeningDetails = function () {
    if ($("#txtGrpID").val() == "") {
        $.alert("Please Enter Group Id");
        return;
    }

    if ($("#txtMachineId").val() == "") {
        $.alert("Please Enter Machine ID");
        return;
    }
    var inputSavexml = "<Root><GroupId>" + $("#txtGrpID").val() + "</GroupId><MachineId>" + $("#txtMachineId").val() + "</MachineId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture><UserId>" + Userid + "</UserId></Root>";
    $.ajax({
        type: 'POST',
        url: ExpURL + "/SaveScreeningDetails",
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

                    } else if (Status == 'S') {
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
            alert('Server not responding...');
        }
    });
}

