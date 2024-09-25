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
var isHAWBNo = '0';
var HAWBRowId = '';
var OldLocCode = "", oldLocatedPieces = "", OldLocId = "",
    Offpoint = "", offPointLoaded = false, FltSeqNo = "", ShipmentId = "", Weight = "";
$(function () {

    $("#divbtnInfo1").hide();
    $("#AWB").hide();
    setDate();
    commonFunc();
    $('#tableRecords').hide();



    $("#txtHAWBNo").blur(function () {

        if ($("#txtHAWBNo").val() != '') {
            var value = this.value;// parseInt(this.value, 10),

            var res = value.replace(/(\d{3})/, "$1-")
            dd = document.getElementById('ddlHAWBNo'),
                index = 0;

            $.each(dd.options, function (i) {
                console.log(this.text);
                if (this.text == res) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                errmsg = "Please scan valid HAWB No.";
                $.alert(errmsg);
                // $('#successMsg').text('Please scan/enter valid AWB No.').css('color', 'red');
                return;
            }
            console.log(dd.selectedIndex);
            //  $('#successMsg').text('');
            $('#ddlHAWBNo').trigger('change');
            //  $('#hawbLists').focus();

            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }
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

    $("#btnAddEquipment").prop("disabled", true).css('background-color', '#a7a7a7');

    $("#btnAddEquipment").click(function () {
        $("#lblUldNumber").text($("#uldLists option:selected").text());

        if ($("#bulkCheckBox").prop("checked")) {
            type = "T";
            if ($("#trolleyLists").val() == "0" || $("#trolleyLists").val() == "") {
                $.alert("Please Select Trolley.");
                return;
            }
            ULDSeqNo = $("#trolleyLists").val();
            selectedULD = $("#trolleyLists :selected").text()
        } else if ($("#ULDCheckbox").prop("checked")) {
            type = "U";
            if ($("#uldLists").val() == "0" || $("#uldLists").val() == "") {
                $.alert("Please Select ULD's.");
                return;
            }
            ULDSeqNo = $("#uldLists").val();
            selectedULD = $("#uldLists :selected").text()

        } else { }

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
                inputxml = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>" + ULDSeqNo + "</ULDSeqNo><IsTrolley>" + type + "</IsTrolley><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

                GetULDMaterial(inputxml);

                $('#modalEquipmentDetail').modal('show');

            }
        }
    });

});


function setTurkish() {
    $('#titUni').text("Gruplandirma");
    $('#lblFltNo').text("Ucus No");
    $('#lblDate').text("Ucus Tarih");
    $('#btnExit').text("Temizle");
    $('#btnGet').text("Detayları Getir");
    $('#lblOff').text("Varis Noktasi");
    $('#lblUldO').text("ULD Tip / No / Sahibi");
    $('#btnULDSubmit').text("ULD / Toplu Ekle");
    $('#lblUld').text("ULDLER");
    $('#lblSca').text("Tartilan Agirlik");
    $('#lblCont').text("Kontur");
    $('#lblBlk').text("Toplu Tip / Hayır / Sahip");
    $('#btnBulkSubmit').text("ULD / Toplu Ekle");
    $('#lblTro').text("tramvay");
    $('#lblScab').text("Tartilan Agirlik");
    $('#lblAWB').text("Konsimento No");
    $('#lblUn').text("Unt. / Toplam Paketler");
    $('#lblPc').text("Parca");
    $('#btnClose').text("ULD'yi kapatın / Toplu");
    $('#btnAddAWB').text("AWB ekle");
    $('#btnBack').text("Geri");
    $('#btnAWBClear').text("Temizle");
    $('#btnAWBSbmt').text("Gönder");
}


function setHungarian() {

    $('#titUni').text("Járat építés");
    $('#lblFltNo').text("Járatszám");
    $('#lblDate').text("Járat dátum");
    $('#btnExit').text("Törlés");
    $('#btnGet').text("Adatok lehívása");
    $('#lblOff').text("Lerakodás helye");
    $('#lblManpower').text("Járatra beosztott munkaerő");
    $('#btSaveManpower').text("Mentés");
    //$('#tdLoc').text("ULD");
    //$('#tdLoc').text("BULK");
    $('#lblUldO').text("ULD típusa / száma / tulajdonosa");
    $('#btnULDSubmit').text("ULD / BULK hozzáadás");
    $('#lblSca').text("Mért súly");
    $('#lblCont').text("Kontúr");
    $('#lblUldMan').text("ULD munkaerő");
    $('#btnSaveULD').text("Mentés");
    $('#btnAddAWB').text("Fuvarlevél hozzáadása");
    $('#lblBlk').text("Bulk típusa / száma / tulajdonosa");
    $('#lblScab').text("Mért súly");
    $('#lblTro').text("Targonca");

    $('#lblUld').text("ULD száma");
    $('#lblAWB').text("AWB száma");
    $('#lblUn').text("Járat építés/Összes Darabszám");
    $('#lblPc').text("Darabszám");
    $('#lblRNOAWB').text("R száma");

    $('#btnBack').text("Vissza");
    $('#btnAWBClear').text("Törlés");
    $('#btnAWBSbmt').text("Jóváhagy");
    $('#btnAddEquipment').text("Felszerelés hozzáadása");
    $('#lblUldNum').text("ULD száma");
    $('#eqpTitale').text("Felszerelés hozzáadása");
    $('#equpTh').text("Felszerelés");
    $('#quntTh').text("Mennyiség");
    $('#btnSaveEQ').text("Mentés");
    $('#btnSubBack').text("Vissza");
    $('#lblMaterialList').text("Anyaglista");



}


// UnitizeAWB - Submit Button on next page
//GetUnitizedShipmentDetails - Add AWB

function setDate() {
    $("#FlightDate").val(moment(new Date()).format("YYYY-MM-DD"))
}
function setEnglish() {
    $('#lblUnitization').text("Unitization");
}
function setTurkish() {
    $('#titUni').text("Gruplandirma");
    $('#lblFltNo').text("Ucus No");
    $('#lblDate').text("Ucus Tarih");
    $('#btnExit').text("Temizle");
    $('#btnGet').text("Detayları Getir");
    $('#lblOff').text("Varis Noktasi");
    $('#lblUldO').text("ULD Tip / No / Sahibi");
    $('#btnULDSubmit').text("ULD / Toplu Ekle");
    $('#lblUld').text("ULDLER");
    $('#lblSca').text("Tartilan Agirlik");
    $('#lblCont').text("Kontur");
    $('#lblBlk').text("Toplu Tip / Hayır / Sahip");
    $('#btnBulkSubmit').text("ULD / Toplu Ekle");
    $('#lblTro').text("tramvay");
    $('#lblScab').text("Tartilan Agirlik");
    $('#lblAWB').text("Konsimento No");
    $('#lblUn').text("Unt. / Toplam Paketler");
    $('#lblPc').text("Parca");
    $('#btnClose').text("ULD'yi kapatın / Toplu");
    $('#btnAddAWB').text("AWB ekle");
    $('#btnBack').text("Geri");
    $('#btnAWBClear').text("Temizle");
    $('#btnAWBSbmt').text("Gönder");
}
function fnExit() {
    window.location.href = 'ImportOperations.html';
}

function createTable() {
    html = '';
    html += '<div class="form-group col-xs-12 col-sm-6 col-md-6 NoPadding">'
    html += "<table id='tblNews'border='1' style='table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;    width: 100%;'>";
    html += "<thead class='theadClass'><tr>";
    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>AWB No.</th>";
    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pkgs.</th>";
    html += "</tr></thead>";
    html += "<tbody id='tbTable'>";
}

function clearAWB() {

    $("#txtFlightNo").val('');
    $("#FlightDate").val('');
    $("#txtFlightAirlineNo").val('');
    $(".uldMessage").text('');

}


function fnClear() {
    $("#txtULDType").val('');
    $("#txtULDNo").val('');
    $("#txtULDOwner").val('');
    $("#bulkType").val('');
    $("#bulkNo").val('');
    $("#bulkScaleWt").val('');
    $("#ULDScaleWt").val('');
    $("#offPointLists").empty();
    $("#uldLists").empty();
    $("#counterLists").empty();
    $("#trolleyLists").empty();
    clearOptions("offPointLists");
    clearOptions("uldLists");
    clearOptions("counterLists");
    clearOptions("trolleyLists");
    $("#ULDCheckbox").prop("checked", true);
    commonFunc();
    $(".uldMessageSuccess").text('');
}

function GetUnitizedShipmentDetails() {
    var type = "", ULDSeqNo = "", selectedULD = "";


    $(".uldMessageULDClose").text('');
    $("#txtFlightManpower").val('');

    if ($("#txtFlightNo").val() == "") {
        $.alert("Please Enter Flight No.");
        return;
    }

    if ($("#FlightDate").val() == "") {
        $.alert("Please Enter Flight Date.");
        return;
    }

    if ($("#bulkCheckBox").prop("checked")) {
        type = "T";
        if ($("#trolleyLists").val() == "0" || $("#trolleyLists").val() == "") {
            $.alert("Please Select Trolley.");
            return;
        }
        ULDSeqNo = $("#trolleyLists").val();
        selectedULD = $("#trolleyLists :selected").text()
    } else if ($("#ULDCheckbox").prop("checked")) {
        type = "U";
        if ($("#uldLists").val() == "0" || $("#uldLists").val() == "") {
            $.alert("Please Select ULD's.");
            return;
        }
        ULDSeqNo = $("#uldLists").val();
        selectedULD = $("#uldLists :selected").text()

    } else { }

    $("#_txtULDNo").val(selectedULD);

    var InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>" + ULDSeqNo + "</ULDSeqNo><Type>" + type + "</Type><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetUnitizedShipmentDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            $('#tableRecords').empty();
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);
                //  createTable();
                $(".uldMessageULDClose").text('');
                $(xmlDoc).find('Table').each(function (index) {
                    _Status = $(this).find('Status').text();
                    _StrMessage = $(this).find('StrMessage').text();
                    if (_Status == 'E') {
                        errmsg = _StrMessage;
                        $.alert(errmsg).css('color', 'green');
                        return;
                    }

                    if (_Status == 'S') {
                        $("#ULDBULK").hide();
                        $("#divbtnInfo").hide();
                        $("#divbtnInfo1").show();
                        $("#AWB").show();

                        $("#txtFlightAirlineNo").attr('disabled', 'disabled');
                        $("#txtFlightNo").attr('disabled', 'disabled');
                        $("#FlightDate").attr('disabled', 'disabled');
                        $("#btnExit").attr('disabled', 'disabled');
                        $("#btnGet").attr('disabled', 'disabled');
                        $("#offPointLists").attr('disabled', 'disabled');
                        $("#txtFlightManpower").attr('disabled', 'disabled');
                        $("#btSaveManpower").attr('disabled', 'disabled');

                    }
                });

                if (str != null && str != "") {

                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";

                    if (language == 'Hungarian') {

                        //$('#dynlblAWBNo').text("AWB száma");
                        //$('#dynlblPcs').text("Darabszám");

                        html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold' id='dynlblAWBNo'>AWB száma</th>";
                        html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold' id='dynlblPcs'>Darabszám</th>";

                    } else {

                        html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold' id='dynlblAWBNo'>AWB No.</th>";
                        html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold' id='dynlblPcs'>Pieces</th>";
                    }
                    html += "</tr></thead>";
                    html += "<tbody id='TextBoxesGroup'>";

                    var xmlDoc = $.parseXML(str);



                    $(xmlDoc).find('Table1').each(function (index) {

                        createDynamicTable($(this).find('AWBNo').text(), $(this).find('NOP').text());
                    });


                    $(xmlDoc).find('Table2').each(function (index) {

                        //totalPkgs = $(this).find('NOP').text();
                        Column1 = $(this).find('Column1').text();
                        totalPkgs = $(this).find('NOP').text();


                        html += "<tr>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'>" + Column1 + "</td>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'>" + totalPkgs + "</td>";
                        html += "</tr>";


                    });

                    html += "</tbody></table>";
                    $('#tableRecords').append(html);
                    $('#tableRecords').show();
                    $('#_txtAWBNo').focus();

                    //   $('#divAddTestLocation').append(html);

                } else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

                //$(xmlDoc).find('Table1').each(function (index) {

                //    createDynamicTable($(this).find('AWBNo').text(), $(this).find('NOP').text());
                //    html += "</tbody></tbody>";


                //});
                //$('#tableRecords').append(html);
                //$('#tableRecords').show();
                //$('#_txtAWBNo').focus();

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

function createDynamicTable(AWBNo, Pkgs) {
    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + AWBNo + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + Pkgs + "</td>";


    html += "</tr>";
}



function UnitizationSaveFlightManDetails() {
    if ($("#txtFlightNo").val() == "") {
        $.alert("Please Enter Flight No.");
        return;
    }

    if ($("#FlightDate").val() == "") {
        $.alert("Please Enter Flight Date.");
        return;
    }
    // var InputXML = "<Root><flightSeqNo>" + FltSeqNo + "</flightSeqNo><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><AWBPrefix>" + $("#_txtAWBNo").val().slice(0, 3) + "</AWBPrefix><AWBNo>" + $("#_txtAWBNo").val().slice(3) + "</AWBNo></Root>";
    var InputXML = '<Root><FlightSeqNo>' + FltSeqNo + '</FlightSeqNo><AirportCity>' + SHED_AIRPORT_CITY + '</AirportCity><UserId>' + Userid + '</UserId><Manpower>' + $("#txtFlightManpower").val() + '</Manpower></Root>';
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizationSaveFlightManDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);
                $("#txtFlightManpower").val('');
                $(xmlDoc).find('Table').each(function (index) {

                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".uldMessageULDClose").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        $(".uldMessage").text('');
                    } else if (Status == 'S') {

                        $(".uldMessage").text('');
                        $(".uldMessageULDClose").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    }
                    //_Status = $(this).find('Status').text();
                    //_StrMessage = $(this).find('StrMessage').text();
                    //// if (_Status == 'E') {
                    //errmsg = _StrMessage;
                    //$.alert(errmsg);
                    //return;
                    //// }
                });
                GetULDs($("#offPointLists").val());
               // GetExportFlightDetails(true);

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


function UnitizationPendingAWBDetails() {

    if ($("#_txtAWBNo").val() == '') {

        return;
    }
    if ($("#_txtAWBNo").val().length != 11) {
        $.alert("Please Enter Valid AWB No.");
        $(".alert_btn_ok").click(function () {
            $("#_txtAWBNo").val('');
            $("#_txtAWBNo").focus();
        });
        return;
    }

    isHAWBNo = '0';
    if ($("#_txtAWBNo").val().length >= 11) {
        var InputXML = "<Root><flightSeqNo>" + FltSeqNo + "</flightSeqNo><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><AWBPrefix>" + $("#_txtAWBNo").val().slice(0, 3) + "</AWBPrefix><AWBNo>" + $("#_txtAWBNo").val().slice(3) + "</AWBNo></Root>";
        $('body').mLoading({
            text: "Please Wait..",
        });
        $.ajax({
            type: 'POST',
            url: ExpURL + "/UnitizationPendingAWBDetails",
            data: JSON.stringify({ 'InputXML': InputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, xhr, textStatus) {
                HideLoader();
                var str = response.d;
                $('#ddlHAWBNo').empty();


                if (str != null && str != "" && str != "<NewDataSet />") {
                    // $("#btnDiv").show('slow');
                    // $("#tbTable").show('slow');
                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        _Status = $(this).find('Status').text();
                        _StrMessage = $(this).find('StrMessage').text();
                        if (_Status == 'E') {
                            errmsg = _StrMessage;
                            $.alert(errmsg);

                            $(".alert_btn_ok").click(function () {
                                $("#_txtAWBNo").val('');
                                $("#_txtAWBNo").focus();
                            });

                            return;
                        }
                    });



                    $(xmlDoc).find('Table2').each(function (index) {
                        isHAWBNo = '1';
                        if (index == 0 && $("#ddlHAWBNo").val() != "0") {
                            var newOption = $('<option></option>');
                            newOption.val(0).text('Select');
                            newOption.appendTo('#ddlHAWBNo');
                        }

                        HAWBRowId = $(this).find('HAWBRowId').text()
                        HOUSE_AWB_NUMBER = $(this).find('HOUSE_AWB_NUMBER').text()

                        var newOption = $('<option></option>');
                        newOption.val(HAWBRowId).text(HOUSE_AWB_NUMBER);
                        newOption.appendTo('#ddlHAWBNo');

                    });

                    $(xmlDoc).find('Table1').each(function (index) {
                        var newOption = $('<option></option>');
                        newOption.val($(this).find('RNo').text()).text($(this).find('RNo').text());
                        newOption.appendTo('#_txtRNoLists');

                        if (isHAWBNo == '0') {
                            $("#_txtRNoLists").val($(this).find('RNo').text());
                            $("#_txtUnt").text($(this).find('ManNOP').text());
                            $("#_txtTotalPkgs").text($(this).find('NOP').text());
                            Weight = $(this).find('Weight').text();
                            ShipmentId = $(this).find('EXPSHIPROWID').text();
                        }
                    });

                    if (isHAWBNo == '1') {

                        $("#divHAWBNo1").show();
                        $("#divHAWBNo2").show();
                        $("#divHAWBNo3").show();
                        $("#divHAWBNo4").show();
                        $("#txtHAWBNo").focus();

                    } else {
                        $('#_txtPices').focus();
                        $("#divHAWBNo1").hide();
                        $("#divHAWBNo2").hide();
                        $("#divHAWBNo3").hide();
                        $("#divHAWBNo4").hide();
                    }


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

}




function UnitizationPendingAWBDetailsWiithHWABNo(HAWBNo) {



    var InputXML = "<Root><flightSeqNo>" + FltSeqNo + "</flightSeqNo><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><AWBPrefix>" + $("#_txtAWBNo").val().slice(0, 3) + "</AWBPrefix><AWBNo>" + $("#_txtAWBNo").val().slice(3) + "</AWBNo><HAWBRowId>" + HAWBNo + "</HAWBRowId><HAWBNo>" + $("#ddlHAWBNo option:selected").text() + "</HAWBNo></Root>";
    $('body').mLoading({
        text: "Please Wait..",
    });

    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizationPendingAWBDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;

            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    _Status = $(this).find('Status').text();
                    _StrMessage = $(this).find('StrMessage').text();
                    if (_Status == 'E') {
                        errmsg = _StrMessage;
                        $.alert(errmsg);
                        return;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    var newOption = $('<option></option>');
                    newOption.val($(this).find('RNo').text()).text($(this).find('RNo').text());
                    newOption.appendTo('#_txtRNoLists');


                    $("#_txtRNoLists").val($(this).find('RNo').text());
                    $("#_txtUnt").text($(this).find('ManNOP').text());
                    $("#_txtTotalPkgs").text($(this).find('NOP').text());
                    Weight = $(this).find('Weight').text()
                    ShipmentId = $(this).find('EXPSHIPROWID').text()
                });


                $(xmlDoc).find('Table3').each(function (index) {


                    $("#_txtUnt").text($(this).find('ManNOP').text());
                    $("#_txtTotalPkgs").text($(this).find('NOP').text());

                });


                $('#_txtPices').focus();

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

function onBack() {
    $("#ULDBULK").show();
    $("#divbtnInfo").show();
    $("#divbtnInfo1").hide();
    $("#AWB").hide();
    $("#tableRecords").empty();

    $("#_txtULDNo").val('');
    $("#txtHAWBNo").val('');
    $("#_txtAWBNo").val('');
    $("#_txtUnt").text('');
    $("#_txtTotalPkgs").text('');
    $("#_txtPices").val('');
    $("#_txtRNoLists").empty();
    $("#ddlHAWBNo").empty();
    clearOptions("_txtRNoLists");
    $("#tableRecords").empty();
    $(".uldMessageSuccess").text('');
    $("#divHAWBNo1").hide();
    $("#divHAWBNo2").hide();
    $("#divHAWBNo3").hide();
    $("#divHAWBNo4").hide();


    $("#txtFlightAirlineNo").removeAttr('disabled');
    $("#txtFlightNo").removeAttr('disabled');
    $("#FlightDate").removeAttr('disabled');
    $("#btnExit").removeAttr('disabled');
    $("#btnGet").removeAttr('disabled');
    $("#offPointLists").removeAttr('disabled');
    $("#txtFlightManpower").removeAttr('disabled');
    $("#btSaveManpower").removeAttr('disabled');

}



function UnitizeAWB() {
    var type = "", ULDSeqNo = "", ULDType = "", ULDNumber = "", ULDOwner = "";
    if ($("#_txtAWBNo").val() == "") {
        $.alert("Please Enter AWB No.");
        return;
    }

    if (isHAWBNo == '1') {

        if ($("#ddlHAWBNo").val() == '0') {
            $.alert("Please select HAWB No.");
            return;
        }
    }

    if ($("#_txtRNoLists").val() == "" || $("#_txtRNoLists").val() == "0") {
        $.alert("Please Select R No.");
        return;
    }

    if ($("#_txtPices").val() == "") {
        $.alert("Please Enter Pieces");
        return;
    }

    if ($("#bulkCheckBox").prop("checked")) {
        type = "T";

        ULDSeqNo = $("#trolleyLists").val();
    } else if ($("#ULDCheckbox").prop("checked")) {
        type = "U";

        ULDSeqNo = $("#uldLists").val();
    } else { }





    //if (isHAWBNo == '1') {
    //    var InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>" + ULDSeqNo + "</ULDSeqNo><Type>" + type + "</Type><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserID>" + Userid + "</UserID><ULDType>" + ULDType + "</ULDType><ULDNumber>" + ULDNumber + "</ULDNumber><ULDOwner>" + ULDOwner + "</ULDOwner><AWBId>-1</AWBId><ShipmentId>" + ShipmentId + "</ShipmentId><AWBNo>" + $("#_txtAWBNo").val() + "</AWBNo><NOP>" + $("#_txtPices").val() + "</NOP><Weight>-1</Weight><Volume>-1</Volume><HAWBRowId>" + HAWBRowId + "</HAWBRowId></Root>";
    //} else {

    //    var InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>" + ULDSeqNo + "</ULDSeqNo><Type>" + type + "</Type><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserID>" + Userid + "</UserID><ULDType>" + ULDType + "</ULDType><ULDNumber>" + ULDNumber + "</ULDNumber><ULDOwner>" + ULDOwner + "</ULDOwner><AWBId>-1</AWBId><ShipmentId>" + ShipmentId + "</ShipmentId><AWBNo>" + $("#_txtAWBNo").val() + "</AWBNo><NOP>" + $("#_txtPices").val() + "</NOP><Weight>-1</Weight><Volume>-1</Volume></Root>";
    //}

    var InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>" + ULDSeqNo + "</ULDSeqNo><Type>" + type + "</Type><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserID>" + Userid + "</UserID><ULDType>" + ULDType + "</ULDType><ULDNumber>" + ULDNumber + "</ULDNumber><ULDOwner>" + ULDOwner + "</ULDOwner><AWBId>-1</AWBId><ShipmentId>" + ShipmentId + "</ShipmentId><AWBNo>" + $("#_txtAWBNo").val() + "</AWBNo><NOP>" + $("#_txtPices").val() + "</NOP><Weight>-1</Weight><Volume>-1</Volume><HAWBRowId>" + HAWBRowId + "</HAWBRowId></Root>";

    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizeAWB",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    //_Status = $(this).find('Status').text();
                    //_StrMessage = $(this).find('StrMessage').text();
                    //if (_Status == 'E') {
                    //    errmsg = _StrMessage;
                    //    $.alert(errmsg);
                    //    return;
                    //}
                    //if (_Status == "S") {
                    //    $.alert(errmsg);
                    //    GetUnitizedShipmentDetails();
                    //}

                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".uldMessageSuccess").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".uldMessageSuccess").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                        $("#txtHAWBNo").val('');
                        $("#_txtAWBNo").val('');
                        $("#_txtUnt").text('');
                        $("#_txtTotalPkgs").text('');
                        $("#_txtPices").val('');
                        $("#_txtRNoLists").empty();
                        $("#ddlHAWBNo").empty();
                        $("#_txtAWBNo").focus();
                        GetUnitizedShipmentDetails();
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



function GetExportFlightDetails(shouldClearRecord) {


    if ($("#txtFlightNo").val() == "") {
        $.alert("Please Enter Flight No.");
        return;
    }

    if ($("#FlightDate").val() == "") {
        $.alert("Please Enter Flight Date.");
        return;
    }

    var InputXML = "<Root><FlightAirline>" + $("#txtFlightAirlineNo").val() + "</FlightAirline><FlightNo>" + $("#txtFlightNo").val() + "</FlightNo><FlightDate>" + $("#FlightDate").val() + "</FlightDate><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetExportFlightDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');

                var xmlDoc = $.parseXML(str);
                if (shouldClearRecord) { fnClear(); }
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        errmsg = StrMessage;
                        $.alert(errmsg);
                        return;
                    }
                });
                $(xmlDoc).find('Table1').each(function (index) {
                    FltSeqNo = $(this).find('FltSeqNo').text();
                    Manpower = $(this).find('Manpower').text();

                    $("#txtFlightManpower").val(Manpower);

                });

                $(xmlDoc).find('Table2').each(function (index) {
                    var newOption = $('<option></option>');
                    newOption.val($(this).find('FLIGHT_AIRPORT_CITY').text()).text($(this).find('FLIGHT_AIRPORT_CITY').text());
                    newOption.appendTo('#offPointLists');
                    // $('#offPointLists').trigger('change');
                    $("#offPointLists").val($(this).find('FLIGHT_AIRPORT_CITY').text());
                    Offpoint = $(this).find('FLIGHT_AIRPORT_CITY').text();
                });

                $(xmlDoc).find('Table3').each(function (index) {
                    var newOption2 = $('<option></option>');
                    newOption2.val($(this).find('ULD_SEQUENCE_NUMBER').text()).text($(this).find('ULDBULKNO').text());
                    newOption2.appendTo('#uldLists');
                    $("#uldLists").val($(this).find('ULD_SEQUENCE_NUMBER').text());
                    $("#btnAddEquipment").prop("disabled", false).css('background-color', '#3c7cd3');
                });

                $(xmlDoc).find('Table4').each(function (index) {
                    var newOption1 = $('<option></option>');
                    newOption1.val($(this).find('Value').text()).text($(this).find('Text').text());
                    newOption1.appendTo('#counterLists');
                });

                $(xmlDoc).find('Table5').each(function (index) {
                    var newOption2 = $('<option></option>');
                    newOption2.val($(this).find('TrolleySeqNo').text()).text($(this).find('TrolleyNo').text());
                    newOption2.appendTo('#trolleyLists');
                    $("#trolleyLists").val($(this).find('TrolleySeqNo').text());
                });
                //if (Offpoint != "" && !offPointLoaded) {
                //    offPointLoaded = true;
                //    GetExportFlightDetails(true);
                //}

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

function clearOptions(id) {
    var newOption = $('<option></option>');
    newOption.val('0').text('Select');
    newOption.appendTo('#' + id);
}

function UnitizationSaveULDDetails() {
    if ($("#txtULDType").val() == "") {
        $.alert("Please Enter ULD Type and No.");
        return;
    }

    if ($("#txtULDNo").val() == "") {
        $.alert("Please Enter ULD Type and No.");
        return;
    }

    if ($("#txtULDOwner").val() == "") {
        $.alert("Please Enter ULD Type and No.");
        return;
    }



    var InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDType>" + $("#txtULDType").val() + "</ULDType><ULDNo>" + $("#txtULDNo").val() + "</ULDNo><ULDOwner>" + $("#txtULDOwner").val() + "</ULDOwner><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizationSaveULDDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    //_Status = $(this).find('Column1').text();
                    //_StrMessage = $(this).find('Column2').text();
                    //if (_Status == 'E') {
                    //    errmsg = _StrMessage;
                    //    $.alert(_StrMessage);
                    //    return;

                    //    uldMessage
                    //}
                    //if (_Status == "S") {
                    //    $.alert(_StrMessage);
                    //    GetExportFlightDetails(true);
                    //    // return;
                    //}

                    Status = $(this).find('Column1').text();
                    StrMessage = $(this).find('Column2').text();
                    if (Status == 'E') {
                        $(".uldMessage").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".uldMessage").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        GetULDs($("#offPointLists").val());
                        //  GetExportFlightDetails(true);
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

// TODO:
function UnitizationSaveTrolleyDetails() {

    if ($("#bulkType").val() == "") {
        $.alert("Please Enter Bulk Type");
        return;
    }

    if ($("#bulkNo").val() == "") {
        $.alert("Please Enter Bulk No.");
        return;
    }




    var InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDType>" + $("#bulkType").val() + "</ULDType><ULDNo>" + $("#bulkNo").val() + "</ULDNo><ULDOwner></ULDOwner><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizationSaveTrolleyDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    //_Status = $(this).find('Column1').text();
                    //_StrMessage = $(this).find('Column2').text();
                    //if (_Status == 'E') {
                    //    errmsg = _StrMessage;
                    //    $.alert(_StrMessage);
                    //    return;
                    //}
                    //if (_Status == "S") {
                    //    $.alert(_StrMessage);
                    //    $("#bulkType").val('');
                    //    $("#bulkNo").val('');
                    //    GetExportFlightDetails(false);
                    //    // return;
                    //}

                    Status = $(this).find('Column1').text();
                    StrMessage = $(this).find('Column2').text();
                    if (Status == 'E') {
                        $(".uldMessage").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".uldMessage").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        // GetExportFlightDetails(true);
                        GetULDs($("#offPointLists").val());
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

function commonFunc() {
    if ($("#bulkCheckBox").prop("checked")) {
        $("#ULD").hide();
        $("#BULK").show();
    } else if ($("#ULDCheckbox").prop("checked")) {
        $("#ULD").show();
        $("#BULK").hide();
    } else {

    }
}

GetRNoForAWB = function () {


    if ($("#txtFlightNo").val() == "") {
        $.alert("Please Enter AWBNo.");
        return;
    }
    var InputXML = "<Root><AWBNO>" + $("#txtFlightNo").val() + "</AWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture></Root>";
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
                    _Status = $(this).find('Status').text();
                    _StrMessage = $(this).find('OutMsg').text();
                    if (_Status == 'E') {
                        errmsg = _StrMessage;
                        $.alert(errmsg);
                        return;
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

    if ($("#txtFlightNo").val() == "") {
        $.alert("Please Enter AWBNo.");
        return;
    }
    var InputXML = "<Root><AWBNO>" + $("#txtFlightNo").val() + "</AWBNO><EWRNO>" + $("#txtRNo").val() + "</EWRNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture></Root>";
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
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    _Status = $(this).find('Status').text();
                    _StrMessage = $(this).find('OutMsg').text();
                    if (_Status == 'E') {
                        errmsg = _StrMessage;
                        $.alert(errmsg);
                        return;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    $("#spnTxtOriginDest")[0].innerHTML = $(this).find('Origin').text() + "/" + $(this).find('Destination').text();
                    OldLocCode = $(this).find('LocCode').text();
                    LocatedPieces = $(this).find('LocatedPieces').text();
                    OldLocId = $(this).find('LocationId').text();
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



SaveInternalMovementDetails = function () {


    if ($("#txtFlightNo").val() == "") {
        $.alert("Please Enter AWBNo.");
        return;
    }

    if ($("#txtRNo").val() == "Select" || $("#txtRNo").val() == "") {
        $.alert("Please Select R No.");
        return;
    }

    if ($("#txtNewLocation").val() == "") {
        $.alert("Please enter location");
        return;
    }

    if ($("#textMovePkgs").val() == "") {
        $.alert("Please enter Binn Pkgs.");
        return;
    }


    var inputSavexml = "<Root><AWBNO>" + $("#txtFlightNo").val() + "</AWBNO><EWRNO>" + $("#txtRNo").val() + "</EWRNO><OldLocCode>" + OldLocCode + "</OldLocCode><OldLocPieces>" + LocatedPieces + "</OldLocPieces><OldLocId>" + OldLocId + "</OldLocId><LocCode>" + $("#txtNewLocation").val() + "</LocCode><LocPieces>" + $("#textMovePkgs").val() + "</LocPieces><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture></Culture><Username>" + User_Name + "</Username></Root>";
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
                    _Status = $(this).find('Status').text();
                    _StrMessage = $(this).find('OutMsg').text();
                    if (_Status == 'E') {
                        errmsg = _StrMessage;
                        $.alert(errmsg);
                        return;
                    } else {
                        $.alert(_StrMessage);
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

function closeULDBulk() {
    if ($("#bulkCheckBox").prop("checked")) {
        EXPTrolleyClose();
    } else if ($("#ULDCheckbox").prop("checked")) {
        EXPULDClose();
    } else { }
}

function EXPULDClose() {
    var counterCode, ULDSeqNo;


    if ($("#txtFlightNo").val() == "") {
        $.alert("Please Enter AWBNo.");
        return;
    }

    if ($("#FlightDate").val() == "") {
        $.alert("Please Enter Flight Date");
        return;
    }
    //if ($("#txtULDType").val() == "") {
    //    $.alert("Please Enter ULD Type and No.");
    //    return;
    //}

    //if ($("#txtULDNo").val() == "") {
    //    $.alert("Please Enter ULD Type and No.");
    //    return;
    //}

    //if ($("#txtULDOwner").val() == "") {
    //    $.alert("Please Enter ULD Type and No.");
    //    return;
    //}

    if ($("#uldLists").val() == "0" || $("#uldLists").val() == "") {
        $.alert("Please Select ULD's.");
        return;
    }
    if ($("#uldLists").val() == "0") {
        ULDSeqNo = ""
    } else {
        ULDSeqNo = $("#uldLists").val();
    }

    if ($("#counterLists").val() == "0") {
        counterCode = ""
    } else {
        counterCode = $("#counterLists").val();
    }
    $('body').mLoading({
        text: "Please Wait..",
    });

    var ULD = $("#uldLists option:selected").text();

    var str = "How are you doing today?";
    var res = ULD.split(" ");

    var _Type = res[0];
    var _No = res[1];
    var _Owner = res[2];

    console.log("ULDType" + _Type,
        "ULDNo" + _No,
        "ULDOwner" + _Owner,
        "ULDSequenceNo" + ULDSeqNo,
        "AirportCity" + SHED_AIRPORT_CITY,
        "ScaleWeight" + $("#ULDScaleWt").val(),
        "ContourCode" + counterCode,
        "CompanyCode" + CompanyCode,
        "strUserID" + Userid,
        "FlightSeqNumber" + FltSeqNo,
        "routepoint" + $("#offPointLists").val())

    var temp = "ULDType === " + _Type + ' ' +
        "ULDNo===" + _No + ' ' +
        "ULDOwner===" + _Owner + ' ' +
        "ULDSequenceNo===" + ULDSeqNo + ' ' +
        "AirportCity===" + SHED_AIRPORT_CITY + ' ' +
        "ScaleWeight===" + $("#ULDScaleWt").val() + ' ' +
        "ContourCode===" + counterCode + ' ' +
        "CompanyCode===" + CompanyCode + ' ' +
        "strUserID===" + Userid + ' ' +
        "FlightSeqNumber===" + FltSeqNo + ' ' +
        "routepoint===" + $("#offPointLists").val() + ' ' +
        "ULDManpower===" + $("#txtULDManpower").val()

    $.ajax({
        type: 'POST',
        url: ExpURL + "/EXPULDClose",
        data: JSON.stringify({
            "ULDType": _Type,
            "ULDNo": _No,
            "ULDOwner": _Owner,
            "ULDSequenceNo": ULDSeqNo,
            "AirportCity": SHED_AIRPORT_CITY,
            "ScaleWeight": $("#ULDScaleWt").val(),
            "ContourCode": counterCode,
            "CompanyCode": CompanyCode,
            "strUserID": Userid,
            "FlightSeqNumber": FltSeqNo,
            "routepoint": $("#offPointLists").val(),
            "ULDManpower": $("#txtULDManpower").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);


                $(xmlDoc).find('Table').each(function (index) {
                    //_Status = $(this).find('Status').text();
                    //_StrMessage = $(this).find('StrMessage').text();
                    //if (_Status == 'E') {
                    //    errmsg = _StrMessage;
                    //    $.alert(errmsg);
                    //    return;
                    //} else {
                    //    $.alert(_StrMessage);
                    //}
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".uldMessageULDClose").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        $(".uldMessage").text('');
                    } else if (Status == 'S') {

                        $(".uldMessage").text('');
                        $(".uldMessageULDClose").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    }
                   // GetExportFlightDetails(true);
                    GetULDs($("#offPointLists").val());

                    $("#txtULDManpower").val('');

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


function EXPTrolleyClose() {
    if ($("#trolleyLists").val() == "0" || $("#trolleyLists").val() == "") {
        $.alert("Please Select Trolley.");
        return;
    }
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/EXPTrolleyClose",
        data: JSON.stringify({ "ULDSequenceNo": $("#trolleyLists").val(), "AirportCity": SHED_AIRPORT_CITY, "ScaleWeight": $("#bulkScaleWt").val(), "CompanyCode": CompanyCode, "strUserID": Userid, "FlightSeqNumber": FltSeqNo, "routepoint": $("#offPointLists").val() }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);


                $(xmlDoc).find('Table').each(function (index) {
                    //_Status = $(this).find('Status').text();
                    //_StrMessage = $(this).find('StrMessage').text();
                    //if (_Status == 'E') {
                    //    errmsg = _StrMessage;
                    //    $.alert(errmsg);
                    //    return;
                    //} else {
                    //    $.alert(_StrMessage);
                    //}
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".uldMessageULDClose").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".uldMessageULDClose").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
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


function clearAWBRecords() {

    //  $("#_txtULDNo").val('');
    $("#_txtAWBNo").val('');
    $("#_txtAWBNo").focus();
    $("#_txtUnt").text('');
    $("#_txtTotalPkgs").text('');
    $("#_txtPices").val('');
    $("#_txtRNoLists").empty();
    clearOptions("_txtRNoLists");
    $("#tableRecords").empty();
    $(".uldMessageSuccess").text('');


}


isAddEquip = function () {
    if ($("#uldLists").val() == "0" || $("#uldLists").val() == "") {
        // $.alert("Please Select ULD's.");
        $("#btnAddEquipment").prop("disabled", true).css('background-color', '#a7a7a7');

    } else {

        $("#btnAddEquipment").prop("disabled", false).css('background-color', '#3c7cd3');
    }

}




GetULDMaterial = function (InputXML) {
    console.log(InputXML)
    //xmlDataForDamage = JSON.stringify(InputXML);
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetULDMaterial",
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
                console.log(xmlDoc)
                // $(xmlDoc).find('Table1').each(function (index) {
                //     Status = $(this).find('Status').text();
                //     StrMessage = $(this).find('StrMessage').text();
                //     if (Status == 'E') {
                //         $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                //     } else if (Status == 'S') {
                //         $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                //     }
                // });



                $(xmlDoc).find('Table2').each(function (index) {

                    createDynamicEquipmentTable($(this).find('Keyvalue').text(), $(this).find('Type').text(), $(this).find('Value').text());


                    $('#tableEuipRecords').append(html);
                    $('#tableEuipRecords').show();
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

function createDynamicEquipmentTable(key, Type, Value) {

    html = '';
    html += "<tr>";
    // html += "<td class='col-8' value='" + key + "' style=' font-size: 1rem; font-weight: 400;'> " + Type +  "</td>";

    html += "<td class='col-8'>";
    html += "<input type='text' value='" + key + "' style=' font-size: 1rem; font-weight: 400;display: none; text-align:left!important' disabled>" + Type + "";
    html += "</td>";

    html += "<td class='col-4'>";
    html += "<input type='number' id='txtQuantity1' value='" + Value + "' onkeyup='NumberOnly(event);  style='height: 30px;color:#2196F3;font-weight:bold;text-align:right;' class='textfieldClass clsField'>";
    html += "</td>";
    html += "</tr>";



}


function calLocationRows(idCounter) {

    var TableData = new Array();
    inputRowsforLocation = "";

    $("#tableEuipRecords tr").each(function (row, tr) {
        TableData[row] = {
            ItemNum: $(tr).find("td:eq(0) input").val(),
            Itemname: $(tr).find("td:eq(1) input").val(),

        };
        if (
            $(tr).find("td:eq(0) input").val() != "" ||
            $(tr).find("td:eq(1) input").val() != ""
        ) {
            inputRowsforLocation +=
                '<UldEquip><Keyvalue>' + $(tr).find("td:eq(0) input").val() + '</Keyvalue><Quantity>' + $(tr).find("td:eq(1) input").val() + '</Quantity></UldEquip>';
        }
    });
    idCounter++;

}
getAllValues = function () {

    $('tr:has(input)').each(function () {
        var inputName = "";
        var values = "";
        $('input', this).each(function () {
            inputName = $(this).attr("Value");
            values += $(this).val()
        });
        console.log("Values====", values)
    });

}


function saveULD() {
    idCounter = 1;
    calLocationRows(idCounter);

    inputxml = "<UldEquips>" + inputRowsforLocation + "</UldEquips>"


    $.ajax({
        type: 'POST',
        url: ExpURL + "/SaveULDMaterial",
        data: JSON.stringify({ 'ULDXML': inputxml, 'FlightSeqNo': FltSeqNo, 'ULDSeqNo': ULDSeqNo, 'AirportCity': SHED_AIRPORT_CITY, 'UserID': Userid, 'ULDType': type }),

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
                        $("#ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        clrCtrl();
                        $("#ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
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

function exitModal() {
    $('#modalEquipmentDetail').modal('hide');
    $("#tableEuipRecords").empty();
    $("#ibiSuccessMsg").text('');
}


function clrCtrl() {

    var elements = [];
    elements = document.getElementsByClassName("clsField");

    for (var i = 0; i < elements.length; i++) {
        elements[i].value = "";
    }

}


function CheckUldNoValidation(uldno) {
    CheckSpecialCharacter(uldno);
    var ValidChars = "0123456789.";
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_`";
    var IsNumber = true;
    var Char;

    var getULDNo = uldno; //document.getElementById(txtULDNumber).value;
    var getlength = getULDNo.length;

    if ((getlength > 0) && (document.activeElement.getAttribute('id') != 'ext1')) {
        if (getlength == 4) {
            var firstChar = getULDNo.charAt(0);
            var string = getULDNo.substr(1, 3);

            for (var i = 0; i < getlength; i++) {
                if (iChars.indexOf(getULDNo.charAt(i)) != -1) {
                    $.alert("Special characters not allowed");
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    return false;
                }
            }

            for (i = 0; i < string.length && IsNumber == true; i++) {
                Char = string.charAt(i);
                if (ValidChars.indexOf(Char) == -1) {
                    $.alert('Last three character should be numeric  \n if ULD no is 4 digits');
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    IsNumber = false;
                }
            }

        } else if (getlength == 5) {
            var string = getULDNo.substr(1, 4);

            for (var i = 0; i < getlength; i++) {
                if (iChars.indexOf(getULDNo.charAt(i)) != -1) {
                    $.alert("Special characters not allowed.");
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    return false;
                }
            }

            for (i = 0; i < string.length && IsNumber == true; i++) {
                Char = string.charAt(i);
                if (ValidChars.indexOf(Char) == -1) {
                    $.alert('Last four character should be numeric  \n if ULD no is 5 digits');
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    IsNumber = false;
                }
            }
        } else {
            $.alert('Please Enter minimum four and maximum five character');
            $('#txtULDNumber').val('');
            $('#txtULDNumber').focus();
            return false;
        }
    }
}


function CheckSpecialCharacter(uldno) {

    var getUldno = $('#txtULDNo').val();
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_`";

    for (var i = 0; i < getUldno.length; i++) {
        if (iChars.indexOf(getUldno.charAt(i)) != -1) {
            $.alert("Your string has special characters. \nThese are not allowed.");
            document.getElementById(txtULDNumber).value = "";
            document.getElementById(txtULDNumber).focus();
            return false;
        }
    }
}



function GetULDs(valFromddloffpoint) {


    if ($("#txtFlightNo").val() == "") {
        $.alert("Please Enter Flight No.");
        return;
    }

    if ($("#FlightDate").val() == "") {
        $.alert("Please Enter Flight Date.");
        return;
    }

    var InputXML = "<Root><FlightAirline>" + $("#txtFlightAirlineNo").val() + "</FlightAirline><FlightNo>" + $("#txtFlightNo").val() + "</FlightNo><FlightDate>" + $("#FlightDate").val() + "</FlightDate><Offpoint>" + valFromddloffpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetExportFlightDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');

                var xmlDoc = $.parseXML(str);
                // if (shouldClearRecord) { fnClear(); }
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        errmsg = StrMessage;
                        $.alert(errmsg);
                        return;
                    }
                });
                $(xmlDoc).find('Table1').each(function (index) {
                    FltSeqNo = $(this).find('FltSeqNo').text();
                    Manpower = $(this).find('Manpower').text();

                    $("#txtFlightManpower").val(Manpower);

                });



                //$(xmlDoc).find('Table2').each(function (index) {
                //    var newOption = $('<option></option>');
                //    newOption.val($(this).find('FLIGHT_AIRPORT_CITY').text()).text($(this).find('FLIGHT_AIRPORT_CITY').text());
                //    newOption.appendTo('#offPointLists');
                //    $("#offPointLists").val($(this).find('FLIGHT_AIRPORT_CITY').text());
                //    Offpoint = $(this).find('FLIGHT_AIRPORT_CITY').text();
                //});
                $("#uldLists").empty();
                $("#counterLists").empty();

                $(xmlDoc).find('Table3').each(function (index) {
                    var newOption2 = $('<option></option>');
                    newOption2.val($(this).find('ULD_SEQUENCE_NUMBER').text()).text($(this).find('ULDBULKNO').text());
                    newOption2.appendTo('#uldLists');
                    $("#uldLists").val($(this).find('ULD_SEQUENCE_NUMBER').text());
                    $("#btnAddEquipment").prop("disabled", false).css('background-color', '#3c7cd3');
                });

                $(xmlDoc).find('Table4').each(function (index) {
                    var newOption1 = $('<option></option>');
                    newOption1.val($(this).find('Value').text()).text($(this).find('Text').text());
                    newOption1.appendTo('#counterLists');
                });

                $(xmlDoc).find('Table5').each(function (index) {
                    var newOption2 = $('<option></option>');
                    newOption2.val($(this).find('TrolleySeqNo').text()).text($(this).find('TrolleyNo').text());
                    newOption2.appendTo('#trolleyLists');
                    $("#trolleyLists").val($(this).find('TrolleySeqNo').text());
                });
                //if (Offpoint != "" && !offPointLoaded) {
                //    offPointLoaded = true;
                //    GetExportFlightDetails(true);
                //}

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