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
var _XmlForSHCCode;
var allSHCCodeSave = '';
var joinAllValuesWithComma = '';
$(function () {
    $("#uldLists").change(function () {
        selectedULDNo = $(this).find("option:selected").text();
        selectedULDSeqNo = $(this).val();
     

        if(selectedULDNo=="Select"){
            $("#ULDScaleWt").val('');
            $("#txtRemark").val('');
            $("#txtULDManpower").val('');
            return;
        }
        if (selectedULDNo == "BULK") {
            var InputXML = {
                "ULDSequenceNo": selectedULDSeqNo,
                "AirportCity": SHED_AIRPORT_CITY,
                "CompanyCode": CompanyCode,
                "Mode": "U",
                "FltSeqNo": FltSeqNo,
                "RoutePoint": Offpoint,
            }
            console.log(InputXML)
            GetExportULDData(InputXML)
        }
        else {
            var InputXML = {
                "ULDSequenceNo": selectedULDSeqNo,
                "AirportCity": SHED_AIRPORT_CITY,
                "CompanyCode": CompanyCode,
                "Mode": "U",
                "FltSeqNo": FltSeqNo,
                "RoutePoint": Offpoint,
            }
            console.log(InputXML)
            GetExportULDData(InputXML)
        }
    });

    $("#trolleyLists").change(function () {
        selectedULDNo = $(this).find("option:selected").text();
        selectedULDSeqNo = $(this).val();
        $("#bulkScaleWt").val('');
        $("#txtBlkRemark").val('');
        $("#txtBulkManpower").val('');      
        if(selectedULDNo!="Select"){
            $("#txtBulkManpower").prop('disabled', true);
            $("#txtBlkRemark").prop('disabled', true);
            $("#btnAddEquipment").prop("disabled", true).css('background-color', '#a7a7a7');
            var InputXML = {
                "ULDSequenceNo": selectedULDSeqNo,
                "AirportCity": SHED_AIRPORT_CITY,
                "CompanyCode": CompanyCode,
                "Mode": "T",
                "FltSeqNo": FltSeqNo,
                "RoutePoint": Offpoint,
            }
            console.log(InputXML)
            GetExportULDData(InputXML)
            
        }
        else{
            $("#txtBulkManpower").prop('disabled', false);
            $("#txtBlkRemark").prop('disabled', false);
            $("#btnAddEquipment").prop("disabled", false).css('background-color', '#3c7cd3');
            var InputXML = {
                "ULDSequenceNo": "0",
                "AirportCity": SHED_AIRPORT_CITY,
                "CompanyCode": CompanyCode,
                "Mode": "U",
                "FltSeqNo": FltSeqNo,
                "RoutePoint": Offpoint,
            }
            console.log(InputXML)
            GetExportULDData(InputXML)
        }
           
       

    });

    $('input[name="mode"]').on('change', function () {

        if ($('#bulkCheckBox').is(':checked')) {
            if ($("#txtFlightNo").val() == "") {        
                return;
            }
        
            if ($("#FlightDate").val() == "") {
                return;
            }
            if ($("#trolleyLists").find("option:selected").text() === 'Select') {
                var InputXML = {
                    "ULDSequenceNo": "0",
                    "AirportCity": SHED_AIRPORT_CITY,
                    "CompanyCode": CompanyCode,
                    "Mode": "U",
                    "FltSeqNo": FltSeqNo,
                    "RoutePoint": Offpoint,
                }
                console.log(InputXML)
                GetExportULDData(InputXML)
            }
        }
    });

    $("#btnOpenSHCModal").click(function () {

        $("#spnValdatemsg").text('');
        SHCCodePopupField();

    });

    $("#txtFromULD").blur(function () {

        if ($("#txtFromULD").val() != '') {
            var value = this.value;// parseInt(this.value, 10),
            var result = value.replace(/^(.{3})(.{5})(.*)$/, "$1 $2 $3");
            dd = document.getElementById('ddlSource'),
                index = 0;

            $.each(dd.options, function (i) {
                if (this.text == result) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                //errmsg = "Please scan/enter valid ULD No.";
                //$.alert(errmsg);
                $('#lblMSGForMoveShipment').text('Please scan/select valid ULD No.').css('color', 'red');
                $("#txtFromULD").val('');
                $("#txtFromULD").focus();
                // $('#ddlSource').trigger('change');
                return;
            } else {
                $('#lblMSGForMoveShipment').text('');
            }
            console.log(dd.selectedIndex);
            $('#ddlSource').trigger('change');
        }
    });

    $("#txtToULD").blur(function () {

        if ($("#txtToULD").val() != '') {
            var value = this.value;// parseInt(this.value, 10),
            var result = value.replace(/^(.{3})(.{5})(.*)$/, "$1 $2 $3");
            dd = document.getElementById('ddlDestination'),
                index = 0;

            $.each(dd.options, function (i) {
                if (this.text == result) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                //errmsg = "Please scan/enter valid ULD No.";
                //$.alert(errmsg);
                $('#lblMSGForMoveShipment').text('Please scan/select valid ULD No.').css('color', 'red');
                $("#txtToULD").val('');
                $("#txtToULD").focus();
                $('#ddlDestination').trigger('change');
                return;
            } else {
                $('#lblMSGForMoveShipment').text('');
            }
            console.log(dd.selectedIndex);
            $('#ddlDestination').trigger('change');
        }
    });

    $("#txtAWBNOMoveShip").blur(function () {

        if ($("#txtAWBNOMoveShip").val() != '') {
            var value = this.value;// parseInt(this.value, 10),

            var res = value.replace(/(\d{3})/, "$1")
            dd = document.getElementById('ddlAWBList'),
                index = 0;

            $.each(dd.options, function (i) {
                console.log(this.text);
                if (this.text == res) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                // errmsg = "Please scan/enter valid AWB No.";
                // $.alert(errmsg);
                $('#lblMSGForMoveShipment').text('Please scan/select valid AWB No.').css('color', 'red');
                $("#txtAWBNOMoveShip").val('');
                $("#txtAWBNOMoveShip").focus();
                $('#ddlAWBList').trigger('change');
                return;
            }
            console.log(dd.selectedIndex);
            $('#lblMSGForMoveShipment').text('');
            $('#ddlAWBList').trigger('change');
            //  $('#hawbLists').focus();

            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }
    });



    $("#divbtnInfo1").hide();
    $("#AWB").hide();
    setDate();
    commonFunc();
    $('#tableRecords').hide();

    $('#selectAll').click(function (e) {
        $(this).closest('table').find('td input:checkbox').prop('checked', this.checked);
    });


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
            type = "B";
            // if ($("#trolleyLists").val() == "0" || $("#trolleyLists").val() == "") {
            //     $.alert("Please Select Trolley.");
            //     return;
            // }
            ULDSeqNo = $("#trolleyLists").val();
            selectedULD = $("#trolleyLists :selected").text()
        } else if ($("#ULDCheckbox").prop("checked")) {
            type = "U";
            if ($("#uldLists").val() == "") {
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




    //$("#btnViewAWB").click(function () {


    //    if ($("#bulkCheckBox").prop("checked")) {
    //        type = "T";

    //    } else if ($("#ULDCheckbox").prop("checked")) {
    //        type = "U";
    //        ULDSeqNo = $("#uldLists").val();
    //        selectedULD = $("#uldLists :selected").text()

    //    }
    //    if ($("#txtFlightAirlineNo").val() == '' || $("#txtFlightNo").val() == '') {
    //        errmsg = "Please enter Flight No. and Date</br>";
    //        $.alert(errmsg);
    //        return;
    //    }

    //    if ($("#offPointLists").val() == '0') {
    //        errmsg = "Please select Off Point</br>";
    //        $.alert(errmsg);
    //        return;
    //    }
    //    //if ($("#uldLists").val() == '0') {
    //    //    errmsg = "Please select ULD's</br>";
    //    //    $.alert(errmsg);
    //    //    return;
    //    //}

    //    inputxml = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>0</ULDSeqNo><Type>" + type + "</Type><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity > <CompanyCode>" + CompanyCode + "</CompanyCode></Root >";

    //    UnitizedGetAWBDetails(inputxml);



    //});

});

//function SHCCodePopupField() {
//    $('#dvSHCCode').empty();


//    html = '';
//    html += '<table id="tblSHCCode"  class="table  table-bordered table-striped mb-0" style="border: 1px solid #eee;">';
//    html += '<thead class="theadClass">';
//    html += '<tr>';
//    html += '<th id="lblRemark">Sr No</th>';
//    html += '<th id="lbRemark">SHC Code</th>';

//    html += '</tr>';
//    html += '</thead>';
//    html += '<tbody class="">';

//    var newSpanSHC = _XmlForSHCCode.split(',');
//    var filtered = newSpanSHC.filter(function (el) {
//        return el != "";
//    });

//    for (var n = 0; n < filtered.length; n++) {

//        var blink = filtered[n].split('~');
//        html += '<tr id="row1 ' + n + '">';
//        html += '<td style="text-align:center;">' + (n + 1) + '</td>';
//        html += '<td><input onkeypress="return blockSpecialChar(event)" maxlength="3" value="' + blink[0] + '" type="text" id="txtSHC ' + n + '" class="textfieldClass" placeholder="" style="text-transform: uppercase;"></td>';
//        html += '</tr>';
//    }
//    html += "</tbody></table>";
//    $('#dvSHCCode').append(html);
//    $('#SHCCode').modal('show');
//}

function SHCCodePopupField() {
    $('#dvSHCCode').empty();
    //var allSHCCodeSave = '';
    //var joinAllValuesWithComma = '';

    html = '';
    html += '<table id="tblSHCCode"  class="table  table-bordered table-striped mb-0" style="border: 1px solid #eee;">';
    html += '<thead class="theadClass">';
    html += '<tr>';
    html += '<th id="lblRemark">Sr No</th>';
    html += '<th id="lbRemark">SHC Code</th>';

    html += '</tr>';
    html += '</thead>';
    html += '<tbody class="">';

    if (joinAllValuesWithComma != '') {
        var newSpanSHC = joinAllValuesWithComma.split(',');
        for (var n = 0; n < 9; n++) {

            html += '<tr id="row1 ' + n + '">';
            html += '<td style="text-align:center;">' + (n + 1) + '</td>';
            html += '<td><input onkeyup="return clsAlphaNoOnly(event)" maxlength="3" value="' + newSpanSHC[n] + '" type="text" id="txtSHC ' + n + '" class="textfieldClass" placeholder="" style="text-transform: uppercase;"></td>';
            html += '</tr>';
        }
    } else {
        var newSpanSHC = _XmlForSHCCode.split(',');
        var filtered = newSpanSHC.filter(function (el) {
            return el != "";
        });

        for (var n = 0; n < filtered.length; n++) {
            var blink = filtered[n].split('~');
            html += '<tr id="row1 ' + n + '">';
            html += '<td style="text-align:center;">' + (n + 1) + '</td>';
            html += '<td><input onkeyup="return blockSpecialChar(event)" maxlength="3" value="' + blink[0] + '" type="text" id="txtSHC ' + n + '" class="textfieldClass" placeholder="" style="text-transform: uppercase;"></td>';
            html += '</tr>';
        }
    }



    html += "</tbody></table>";
    $('#dvSHCCode').append(html);
    $('#SHCCode').modal('show');
}

function clsAlphaNoOnly(e) {  // Accept only alpha numerics, no special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}

//function getAllSHCCodefromPopup() {
//    var inputName = "";
//    var values = "";
//    var htmlVal = '';
//    $('#dvSHCCode tr').each(function (i, el) {

//        $(this).find("input").each(function () {
//            inputName = $(this).attr("Value");
//            values = $(this).val();
//            if (i == 1) {
//                htmlVal += '<SHC1>' + values.toUpperCase() + '</SHC1>';
//            }
//            if (i == 2) {
//                htmlVal += '<SHC2>' + values.toUpperCase() + '</SHC2>';
//            }
//            if (i == 3) {
//                htmlVal += '<SHC3>' + values.toUpperCase() + '</SHC3>';
//            }
//            if (i == 4) {
//                htmlVal += '<SHC4>' + values.toUpperCase() + '</SHC4>';
//            }
//            if (i == 5) {
//                htmlVal += '<SHC5>' + values.toUpperCase() + '</SHC5>';
//            }
//            if (i == 6) {
//                htmlVal += '<SHC6>' + values.toUpperCase() + '</SHC6>';
//            }
//            if (i == 7) {
//                htmlVal += '<SHC7>' + values.toUpperCase() + '</SHC7>';
//            }
//            if (i == 8) {
//                htmlVal += '<SHC8>' + values.toUpperCase() + '</SHC8>';
//            }
//            if (i == 9) {
//                htmlVal += '<SHC9>' + values.toUpperCase() + '</SHC9>';
//            }
//        });

//    });

//    allSHCCodeSave = htmlVal;
//    console.log("Values====", allSHCCodeSave);
//    ValidateSHCCodes();

//}

function getAllSHCCodefromPopup() {
    var inputName = "";
    var values = "";
    var htmlVal = '';
    var jionOfComma = '';
    $('#dvSHCCode tr').each(function (i, el) {

        $(this).find("input").each(function () {
            inputName = $(this).attr("Value");
            values = $(this).val();
            if (i == 1) {
                htmlVal += '<SHC1>' + values.toUpperCase() + '</SHC1>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 2) {
                htmlVal += '<SHC2>' + values.toUpperCase() + '</SHC2>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 3) {
                htmlVal += '<SHC3>' + values.toUpperCase() + '</SHC3>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 4) {
                htmlVal += '<SHC4>' + values.toUpperCase() + '</SHC4>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 5) {
                htmlVal += '<SHC5>' + values.toUpperCase() + '</SHC5>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 6) {
                htmlVal += '<SHC6>' + values.toUpperCase() + '</SHC6>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 7) {
                htmlVal += '<SHC7>' + values.toUpperCase() + '</SHC7>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 8) {
                htmlVal += '<SHC8>' + values.toUpperCase() + '</SHC8>';
                jionOfComma += values.toUpperCase() + ','
            }
            if (i == 9) {
                htmlVal += '<SHC9>' + values.toUpperCase() + '</SHC9>';
                jionOfComma += values.toUpperCase()
            }
        });

    });

    allSHCCodeSave = htmlVal;
    joinAllValuesWithComma = jionOfComma;
    console.log("Values====", joinAllValuesWithComma)
    ValidateSHCCodes();
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

    $("#txtBulkManpower").val('');
    $("#txtULDType").val('');
    $("#txtULDNo").val('');
    $("#txtULDOwner").val('');
    $("#bulkType").val('');
    $("#bulkNo").val('');
    $("#bulkScaleWt").val('');
    $("#txtBlkRemark").val('');
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
    $("#txtBulkManpower").prop('disabled', false);
    $("#txtBlkRemark").prop('disabled', false);
    commonFunc();
    $(".uldMessageSuccess").text('');
    $(".uldMessageULDClose").text('');
    $("#txtULDManpower").val('');
    $("#txtRemark").val('');
    $("#uldTypeULDL").val('0');
    $("#txtFlightManpower").val('');


}

function fnClearfornoMsgClear() {
    $("#txtULDType").val('');
    $("#txtULDNo").val('');
    $("#txtULDOwner").val('');
    $("#bulkType").val('');
    $("#bulkNo").val('');
    $("#bulkScaleWt").val('');
    $("#txtBlkRemark").val('');
    $("#ULDScaleWt").val('');
    $("#txtULDManpower").val('');
    $("#txtRemark").val('');
    $("#offPointLists").empty();
    $("#uldLists").empty();
    $("#counterLists").empty();
    $("#trolleyLists").empty();
    clearOptions("offPointLists");
    clearOptions("uldLists");
    clearOptions("counterLists");
    clearOptions("trolleyLists");
    $("#ULDCheckbox").prop("checked", true);
    $("#txtBulkManpower").prop('disabled', false);
    $("#txtBlkRemark").prop('disabled', false);
    commonFunc();
    $(".uldMessageSuccess").text('');
    // $(".uldMessageULDClose").text('');

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
        if ($("#uldLists :selected").text() == "Select") {
            $.alert("Please Select ULD's.");
            return;
        }
        ULDSeqNo = $("#uldLists").val();
        selectedULD = $("#uldLists :selected").text();

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
                $("#SHCCodeTbl").empty();
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
                //_XmlForSHCCode = '';
                ////$(xmlDoc).find('Table1').each(function (index) {
                //$("#SHCCodeTbl").empty();
                ////    createDynamicTable($(this).find('AWBNo').text(), $(this).find('NOP').text());
                ////    html += "</tbody></tbody>";
                //_XmlForSHCCode = xmlDoc;
                //$(_XmlForSHCCode).find('Table3').each(function (index) {
                //    SHC1 = $(this).find('SHC1').text();
                //    SHC2 = $(this).find('SHC2').text();
                //    SHC3 = $(this).find('SHC3').text();
                //    SHC4 = $(this).find('SHC4').text();
                //    SHC5 = $(this).find('SHC5').text();
                //    SHC6 = $(this).find('SHC6').text();
                //    SHC7 = $(this).find('SHC7').text();
                //    SHC8 = $(this).find('SHC8').text();
                //    SHC9 = $(this).find('SHC9').text();
                //    allVal = SHC1 + ',' + SHC2 + ',' + SHC3 + ',' + SHC4 + ',' + SHC5 + ',' + SHC6 + ',' + SHC7 + ',' + SHC8 + ',' + SHC9;
                //    //$('#txtSHC').val(allVal);

                //});
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

function SHCSpanHtml(newSHC) {
    var spanStr = "<tr class=''>";
    var newSpanSHC = newSHC.split(',');
    var filtered = newSpanSHC.filter(function (el) {
        return el != "";
    });

    for (var n = 0; n < filtered.length; n++) {
        var blink = filtered[n].split('~');

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'Y' && filtered[n] != '~Y') {
                spanStr += "<td class='blink_me'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#SHCCodeTbl").html(spanStr);
    $("#dvForEditBtn").show();

    return spanStr;

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
              //  GetExportFlightDetails(true);

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

var RemNOP;
var RemWt;
function UnitizationPendingAWBDetails() {
    allSHCCodeSave = '';
    joinAllValuesWithComma = '';
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
                $('.uldMessageSuccess').text('');


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
                    $('#dvRemarkShow').empty();
                    var Remark = '';
                    $(xmlDoc).find('Table2').each(function (index) {

                        Remark = $(this).find('Remark').text();
                        // Date = $(this).find('Date').text();
                        IsHighPriority = $(this).find('IsHighPriority').text();
                        $('#dvRemarkShow').append(Remark);
                        $('#remarkPriorityShow').modal('show');


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
                            $("#_txtWeightUnt").text($(this).find('ManWt').text());
                            $("#_txtWeightTotal").text($(this).find('Weight').text());
                            Weight = $(this).find('Weight').text();
                            ShipmentId = $(this).find('EXPSHIPROWID').text();

                            RemNOP = $(this).find('RemNOP').text();
                            RemWt = $(this).find('RemWt').text();
                        }
                        $("#_txtRNoLists").val($(this).find('RNo').text());
                        $("#_txtUnt").text($(this).find('ManNOP').text());
                        $("#_txtTotalPkgs").text($(this).find('NOP').text());
                        $("#_txtWeightUnt").text($(this).find('ManWt').text());
                        $("#_txtWeightTotal").text($(this).find('Weight').text());
                        Weight = $(this).find('Weight').text();
                        ShipmentId = $(this).find('EXPSHIPROWID').text();

                        RemNOP = $(this).find('RemNOP').text();
                        RemWt = $(this).find('RemWt').text();
                        $("#SHCCodeTbl").empty();
                        SHCAll = $(this).find('SHCAll').text();
                        _XmlForSHCCode = SHCAll;
                        SHCSpanHtml(SHCAll);
                    });

                    // this code now commnet after discussed @krunal on 22062023, no need HAWB in IST. we show total hawb pcs on awb textbox change (312608)

                    //if (isHAWBNo == '1') {

                    //    $("#divHAWBNo1").show();
                    //    $("#divHAWBNo2").show();
                    //    $("#divHAWBNo3").show();
                    //    $("#divHAWBNo4").show();
                    //    $("#txtHAWBNo").focus();

                    //} else {
                    //    $('#_txtPices').focus();
                    //    $("#divHAWBNo1").hide();
                    //    $("#divHAWBNo2").hide();
                    //    $("#divHAWBNo3").hide();
                    //    $("#divHAWBNo4").hide();
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

}
var calculateVolumeForRm;
function calculateMAnWeightForShow() {


    if (parseInt($('#_txtPices').val()) > parseInt(RemNOP)) {
        $('.uldMessageSuccess').text('Entered NOP should not greater than remaining NOP ( ' + RemNOP + ' )').css('color', 'red');
        $('#_txtPices').val('');
        $('#_txtManWt').val('');

        return;
    } else {
        $('.uldMessageSuccess').text('');

    }
    enterNop = parseInt($('#_txtPices').val());
    var weightNew = (parseFloat(RemWt) / parseFloat(RemNOP)) * enterNop;
    //var enteredNOP = parseInt($('#txtNOPforRemove').val());
    //var volumeNew = (parseFloat(oldVolumeRm) / parseFloat(oldNOPRM)) * enteredNOP;
    calculateRmWt = Math.round(weightNew * 100) / 100;
    $('#_txtManWt').val(calculateRmWt);
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
    $("#_txtWeightUnt").text('');
    $("#_txtWeightTotal").text('');
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

    //if (isHAWBNo == '1') {

    //    if ($("#ddlHAWBNo").val() == '0') {
    //        $.alert("Please select HAWB No.");
    //        return;
    //    }
    //}

    if ($("#_txtRNoLists").val() == "" || $("#_txtRNoLists").val() == "0") {
        $.alert("Please Select R No.");
        return;
    }

    if ($("#_txtPices").val() == "") {
        $.alert("Please Enter Pieces");
        return;
    }
    if ($("#_txtManWt").val() == "") {
        $.alert("Please Enter Weight");
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

    var InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>" + ULDSeqNo + "</ULDSeqNo><Type>" + type + "</Type><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserID>" + Userid + "</UserID><ULDType>" + ULDType + "</ULDType><ULDNumber>" + ULDNumber + "</ULDNumber><ULDOwner>" + ULDOwner + "</ULDOwner><AWBId>-1</AWBId><ShipmentId>" + ShipmentId + "</ShipmentId><AWBNo>" + $("#_txtAWBNo").val() + "</AWBNo><NOP>" + $("#_txtPices").val() + "</NOP><Weight>" + $("#_txtManWt").val() + "</Weight><Volume>-1</Volume><HAWBRowId>" + HAWBRowId + "</HAWBRowId>" + allSHCCodeSave + "</Root>";

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
                        $("#_txtWeightUnt").text('');
                        $("#_txtWeightTotal").text('');
                        $("#_txtRNoLists").empty();
                        $("#ddlHAWBNo").empty();
                        $("#SHCCodeTbl").empty();
                        $("#_txtAWBNo").focus();
                        $("#_txtManWt").val('');
                        $("#dvForEditBtn").hide();
                        joinAllValuesWithComma = '';
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

function GetExportULDData(Input){
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/ExportGetULDData",
        data: JSON.stringify(Input),
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
                 
                if ($("#ULDCheckbox").prop("checked")) {
                    $(xmlDoc).find('Table').each(function (index) {
                        uldScaleWeight = $(this).find('ScaleWt').text();
                        uldRemark = $(this).find('REMARKS').text();
                        uldManpower = $(this).find('ULDManpower').text();
                        uldCONTOUR = $(this).find('CONTOUR').text();

                        $("#ULDScaleWt").val(uldScaleWeight);
                        $("#txtRemark").val(uldRemark);
                        $("#txtULDManpower").val(uldManpower);
                        selectedvalue=uldCONTOUR;
                        if(uldCONTOUR=="" || uldCONTOUR==" "){
                            selectedvalue="0"
                        }
                        $("#counterLists option").each(function(){
                            console.log($(this).val())
                            if($(this).val()===selectedvalue){
                                $(this).prop("selected",true);
                                console.log("triggered")
                            }
                       });

                    });
                }
                if($("#bulkCheckBox").prop("checked")){
                    $(xmlDoc).find('Table').each(function (index) {
                        blkScaleWeight = $(this).find('ScaleWt').text();
                       blkRemark = $(this).find('REMARKS').text();
                        blkManpower = $(this).find('ULDManpower').text();
                   

                        $("#bulkScaleWt").val(blkScaleWeight);
                        $("#txtBlkRemark").val(blkRemark);
                        $("#txtBulkManpower").val(blkManpower);

                    });  
                }

                // UnitizedMoveShipmentGetULD();

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

    // $('#trolleyLists').empty();
    // var newOption = $('<option></option>');
    // newOption.val(0).text('Select');
    // newOption.appendTo('#trolleyLists');

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
                if (shouldClearRecord) {
                    fnClearfornoMsgClear();
                    $(".uldMessageULDClose").text('');
                    $(".uldMessage").text('');
                }
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
                    $("#offPointLists").val($(this).find('FLIGHT_AIRPORT_CITY').text());
                    Offpoint = $(this).find('FLIGHT_AIRPORT_CITY').text();
                    if($("#offPointLists").val()!='0'){
                        console.log("offpoint");
                        GetULDs($('#offPointLists').find('option:selected').text());
                    }
                });

                $(xmlDoc).find('Table3').each(function (index) {
                    var newOption2 = $('<option></option>');
                    newOption2.val($(this).find('ULD_SEQUENCE_NUMBER').text()).text($(this).find('ULDBULKNO').text());
                    newOption2.appendTo('#uldLists');
                    // $("#uldLists").val($(this).find('ULD_SEQUENCE_NUMBER').text());
                    
                });
                if ($("#uldLists").val() == "0" || $("#uldLists").val() == ""|| $("#uldLists").val() == null) {
                    $("#btnAddEquipment").prop("disabled", true).css('background-color', '#a7a7a7');
                }
                else {
                    $("#btnAddEquipment").prop("disabled", false).css('background-color', '#3c7cd3');
                }

                $(xmlDoc).find('Table4').each(function (index) {
                    var newOption1 = $('<option></option>');
                    newOption1.val($(this).find('Value').text()).text($(this).find('Text').text());
                    newOption1.appendTo('#counterLists');
                });

                $(xmlDoc).find('Table5').each(function (index) {
                    var newOption2 = $('<option></option>');
                    newOption2.val($(this).find('TrolleySeqNo').text()).text($(this).find('TrolleyNo').text());
                    if ($('#trolleyLists option[value="' + $(this).find('TrolleySeqNo').text() + '"]').length === 0)
                    {
                        newOption2.appendTo('#trolleyLists');
                    }
                 
                    // $("#trolleyLists").val($(this).find('TrolleySeqNo').text());
                });
                //if (Offpoint != "" && !offPointLoaded) {
                //    offPointLoaded = true;
                //    GetExportFlightDetails(true);
                //}

                // UnitizedMoveShipmentGetULD();

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

    if ($("#uldTypeULDL").val() == "0") {
        $.alert("Please select ULD Position.");
        return;
    }



    var InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDType>" + $("#txtULDType").val() + "</ULDType><ULDNo>" + $("#txtULDNo").val() + "</ULDNo><ULDOwner>" + $("#txtULDOwner").val() + "</ULDOwner><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId><ULDSpecification>" + $("#uldTypeULDL").val() + "</ULDSpecification></Root>";
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

                        // GetExportFlightDetails(true);
                    }
                    $('#txtULDType').val('');
                    $('#txtULDNo').val('');
                    $('#txtULDOwner').val('');
                    $("#uldTypeULDL").val('0');
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
                        $(".trollyMessage").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".trollyMessage").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        GetULDs($("#offPointLists").val());
                        //GetExportFlightDetails(true);
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
        if ($("#trolleyLists").val() == "0" || $("#trolleyLists").val() == ""){
            $("#btnAddEquipment").prop("disabled", false).css('background-color', '#3c7cd3');
        }
        else{
            $("#btnAddEquipment").prop("disabled", true).css('background-color', '#a7a7a7');
        }
    } else if ($("#ULDCheckbox").prop("checked")) {
        $("#ULD").show();
        $("#BULK").hide();
        console.log($("#uldLists").val());
        if ($("#uldLists").val() == "0" || $("#uldLists").val() == null) {
            $("#btnAddEquipment").prop("disabled", true).css('background-color', '#a7a7a7');
            console.log("ULD");
        }
        else {
            $("#btnAddEquipment").prop("disabled", false).css('background-color', '#3c7cd3');
            console.log("ULD1");
        }
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

    if ($("#txtFlightAirlineNo").val() == '' || $("#txtFlightNo").val() == '') {
        errmsg = "Please enter Flight No. and Date</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#FlightDate").val() == "") {
        $.alert("Please Enter Flight Date.");
        return;
    }



    if ($("#bulkCheckBox").prop("checked")) {
        // if ($("#trolleyLists :selected").text() == 'Select') {
        //     $.alert("Please select Bulk / Trolley");
        //     return;
        // }
        EXPTrolleyClose();
    } else if ($("#ULDCheckbox").prop("checked")) {
        if ($("#uldLists :selected").text() == 'Select' ) {
            $.alert("Please select ULD.");
            return;
        }
        if($('#uldLists option').length===0){
            $.alert("Please select ULD");
            return;
        }
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

    // if ($("#uldLists").val() === "") {
    //    $.alert("Please Select ULD's.");
    //    return;
    // }

    

    if ($("#bulkCheckBox").prop("checked")) {
        if ($("#trolleyLists option:selected").text() == 'Select') {
            errmsg = "Please select Bulk / Trolley</br>";
            $.alert(errmsg);
            return;
        }
        type = "T";
        ULDSeqNo = $("#trolleyLists").val();

    } else if ($("#ULDCheckbox").prop("checked")) {
        if ($("#uldLists option:selected").text() == 'Select') {
            errmsg = "Please select ULD</br>";
            $.alert(errmsg);
            return;
        }
        type = "U";
        ULDSeqNo = $("#uldLists").val();
        selectedULD = $("#uldLists :selected").text()

    }
    //if ($("#uldLists").val() == "0") {
    //    ULDSeqNo = "0"
    //} else {
    //    ULDSeqNo = $("#uldLists").val();
    //}

    if ($("#counterLists").val() == "0") {
        counterCode = ""
    } else {
        counterCode = $("#counterLists").val();
    }
    $('body').mLoading({
        text: "Please Wait..",
    });

    var ULD = $("#uldLists option:selected").text();

    // var str = "How are you doing today?";

    if ($("#uldLists").val() == '0') {
        _Type = '';
        _No = '';
        _Owner = '';
    } else {
        var res = ULD.split(" ");

        var _Type = res[0];
        var _No = res[1];
        var _Owner = res[2];
    }



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
            "ULDManpower": $("#txtULDManpower").val(),
            "Remark": $("#txtRemark").val(),

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
                    GetULDs($("#offPointLists").val());
                    //GetExportFlightDetails(true);
                    $("#txtRemark").val('');
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
    // if ($("#trolleyLists").val() == "0" || $("#trolleyLists").val() == "") {
    //     console.log($("#trolleyLists").val()); 
    //     $.alert("Please Select Trolley.");
    //     return;
    // }
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/EXPTrolleyClose",
        data: JSON.stringify({
            "ULDSequenceNo": $("#trolleyLists").val(),
            "AirportCity": SHED_AIRPORT_CITY,
            "ScaleWeight": $("#bulkScaleWt").val(),
            "CompanyCode": CompanyCode,
            "strUserID": Userid,
            "FlightSeqNumber": FltSeqNo,
            "routepoint": $("#offPointLists").val(),
            "ULDManpower": $("#txtBulkManpower").val(),
            "Remark":$("#txtBlkRemark").val(),
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
    $("#_txtManWt").val('');
    $("#_txtTotalPkgs").text('');
    $("#_txtWeightUnt").text('');
    $("#_txtWeightTotal").text('');
    $("#_txtPices").val('');
    $("#_txtRNoLists").empty();
    clearOptions("_txtRNoLists");
    $("#tableRecords").empty();
    $("#SHCCodeTbl").empty();
    $(".uldMessageSuccess").text('');
    $("#dvForEditBtn").hide();


}


isAddEquip = function () {
    if ($("#uldLists").val() == "") {
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

                    createDynamicEquipmentTable($(this).find('Keyvalue').text(), $(this).find('Type').text(), $(this).find('Value').text(),$(this).find('weight').text());


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

function createDynamicEquipmentTable(key, Type, Value,Weight) {

    html = '';
    html += "<tr>";
    // html += "<td class='col-8' value='" + key + "' style=' font-size: 1rem; font-weight: 400;'> " + Type +  "</td>";

    html += "<td class='col-3'>";
    html += "<input type='text' value='" + key + "' style=' font-size: 1rem; font-weight: 400;display: none; text-align:left!important' disabled>" + Type + "";
    html += "</td>";

    html += "<td class='col-3'>";
    html += "<input type='number' id='txtQuantity1' value='" + Value + "' onkeyup='NumberOnly(event);  style='height: 30px;color:#2196F3;font-weight:bold;text-align:right;' class='textfieldClass clsField'>";
    html += "</td>";

    html += "<td class='col-3'>";
    html += "<input type='number' id='txtQuantity1' value='" + Weight + "' onkeyup='NumberOnly(event);  style='height: 30px;color:#2196F3;font-weight:bold;text-align:right;' class='textfieldClass clsField'>";
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
            Itemname: $(tr).find("td:eq(2) input").val(),

        };
        if (
            $(tr).find("td:eq(0) input").val() != "" ||
            $(tr).find("td:eq(1) input").val() != "" ||
            $(tr).find("td:eq(2) input").val() != ""
        ) {
            inputRowsforLocation +=
                '<UldEquip><Keyvalue>' + $(tr).find("td:eq(0) input").val() + '</Keyvalue><Quantity>' + $(tr).find("td:eq(1) input").val() + '</Quantity><Weight>' + $(tr).find("td:eq(2) input").val() + '</Weight></UldEquip>';
        }
    });
    idCounter++;

}
//getAllValues = function () {

//    $('tr:has(input)').each(function () {
//        var inputName = "";
//        var values = "";
//        $('input', this).each(function () {
//            inputName = $(this).attr("Value");
//            values += $(this).val()
//        });
//        console.log("Values====", values)
//    });

//}


function saveULD() {
    idCounter = 1;
    calLocationRows(idCounter);

    inputxml = "<UldEquips>" + inputRowsforLocation + "</UldEquips>"
    $('body').mLoading({
        text: "Please Wait..",
    });

    $.ajax({
        type: 'POST',
        url: ExpURL + "/SaveULDMaterial",
        data: JSON.stringify({ 'ULDXML': inputxml, 'FlightSeqNo': FltSeqNo, 'ULDSeqNo': ULDSeqNo, 'AirportCity': SHED_AIRPORT_CITY, 'UserID': 1, 'ULDType': type }),

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

function exitModalAWBDetails() {
    $('#modalViewAWBDetails').modal('hide');
    $("#tblViewAWBDetails").empty();
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



UnitizedGetAWBDetails = function () {

    if ($("#bulkCheckBox").prop("checked")) {
        if ($("#trolleyLists option:selected").text() == 'Select') {
            errmsg = "Please select Bulk / Trolley</br>";
            $.alert(errmsg);
            return;
        }
        type = "T";
        ULDSeqNo = $("#trolleyLists").val();

    } else if ($("#ULDCheckbox").prop("checked")) {
        if ($("#uldLists option:selected").text() == 'Select') {
            errmsg = "Please select ULD</br>";
            $.alert(errmsg);
            return;
        }
        type = "U";
        ULDSeqNo = $("#uldLists").val();
        selectedULD = $("#uldLists :selected").text()

    }
    if ($("#txtFlightAirlineNo").val() == '' || $("#txtFlightNo").val() == '') {
        errmsg = "Please enter Flight No. and Date</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#offPointLists").val() == '0') {
        errmsg = "Please select Off Point</br>";
        $.alert(errmsg);
        return;
    }


    //if ($("#uldLists").val() == '0') {
    //    errmsg = "Please select ULD's</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>" + ULDSeqNo + "</ULDSeqNo><Type>" + type + "</Type><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity > <CompanyCode>" + CompanyCode + "</CompanyCode></Root >";

    console.log(InputXML)
    //xmlDataForDamage = JSON.stringify(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizedGetAWBDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            $('#tblViewAWBDetails').empty();


            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                var isTable1Av = '0';
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    }
                    //else if (Status == 'S') {
                    //    $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    //}
                });

                $("#lblULDNAME").text($("#uldLists option:selected").text());

                $(xmlDoc).find('Table1').each(function (index) {
                    isTable1Av = '1';
                    AWBNUMBER = $(this).find('AWBNUMBER').text();
                    ULD_SEQUENCE_NUMBER = $(this).find('ULD_SEQUENCE_NUMBER').text();
                    NOP = $(this).find('NOP').text();
                    WEIGHT_KG = $(this).find('WEIGHT_KG').text();
                    VOLUME = $(this).find('VOLUME').text();
                    ManifestSeqNo = $(this).find('ManifestSeqNo').text();
                    ViewAWBDetailsTable(AWBNUMBER, ULD_SEQUENCE_NUMBER, NOP, WEIGHT_KG, VOLUME, ManifestSeqNo);
                    $('#tblViewAWBDetails').append(html);


                });

                $(xmlDoc).find('Table2').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                    var newOption = $('<option></option>');

                    newOption.val(REFERENCE_DATA_IDENTIFIER).text(REFERENCE_DESCRIPTION);
                    newOption.appendTo('#ddlReasonforRemove');
                });

                if (isTable1Av == '1') {
                    $('#modalViewAWBDetails').modal('show');

                } else {
                    $.alert("Shipment not present in selected ULD / Bulk / Trolley.");
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


function ViewAWBDetailsTable(AWBNUMBER, ULD_SEQUENCE_NUMBER, NOP, WEIGHT_KG, Volume, ManifestSeqNo) {

    html = '';
    html += "<tr>";
    //html += "<td>";
    //html += "<input style='float: left;margin: 8px 8px;width: 100 %;' class='checkbox' type='checkbox' value='" + ULD_SEQUENCE_NUMBER + "' >";
    //html += "</td>";
    html += "<td>" + AWBNUMBER.replace(/ /g, '') + "</td>";
    html += "<td>" + NOP + "</td>";
    html += "<td>" + WEIGHT_KG + "</td>";
    html += "<td>" + Volume + "</td>";
    // html += '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right"  id=""   type="text" /></td>';
    // html += '<td><input onkeyup="NumberOnly(event); " class="textpackges text - right"  id=""   type="text" /></td>';
    html += '<td><button type="button" id="btnClear" onclick="openDetailModalofRemove(\'' + AWBNUMBER + '\',\'' + ULD_SEQUENCE_NUMBER + '\',\'' + NOP + '\',\'' + WEIGHT_KG + '\',\'' + Volume + '\',\'' + ManifestSeqNo + '\');" class="btnClass zmdi zmdi-delete zmdi-hc-fw"></button></td>';

    html += "</tr>";

}
var oldNOPRM;
var oldVolumeRm;
var _ManifestSeqNo;
var oldWeight;
function openDetailModalofRemove(AWBNUMBER, ULD_SEQUENCE_NUMBER, NOP, WEIGHT_KG, Volume, ManifestSeqNo) {
    if ($("#uldLists").val() == '0') {
        $('#tdULDNo').text('Bulk');
    } else {
        uldsVal = $("#uldLists option:selected").text().replace(' ', '');
        $('#tdULDNo').text(uldsVal);
    }
    $('#tdAWBNo').text(AWBNUMBER);

    $('#tdANOP').text(NOP + ' / ' + WEIGHT_KG);
    $('#tdUVolume').text(Volume);
    oldNOPRM = NOP;
    oldVolumeRm = Volume;
    oldWeight = WEIGHT_KG;
    _ManifestSeqNo = ManifestSeqNo;



    $('#modalViewRemoveOffload').modal('toggle');
}

function openModalMoveShipment() {
    UnitizedMoveShipmentGetULD();


}

function exitModalAWBDetailsforRemove() {
    clearRemoveData();
    $('#modalViewRemoveOffload').modal('hide');
}
var calculateVolumeForRm;
function calculateVolumneRemove() {

    if ($('#txtNOPforRemove').val() == '') {
        $('#txtWeightforRemove').val('');
        $('#txtWeightforRemove').val('');
        return;
    }


    if (parseInt($('#txtNOPforRemove').val()) > parseInt(oldNOPRM)) {
        $('#lblMSGForRemove').text('Entered NOP should not greater than manifested NOP').css('color', 'red');
        $('#txtNOPforRemove').val('');
        $('#txtVolumeforRemove').val('');

        return;
    } else {
        $('#lblMSGForRemove').text('');

    }




    var enteredwt = parseInt($('#txtNOPforRemove').val());
    var wtNew = (parseFloat(oldWeight) / parseFloat(oldNOPRM)) * enteredwt;
    calculateWtForMoveShip = Math.round(wtNew * 100) / 100;
    $('#txtWeightforRemove').val(calculateWtForMoveShip);


    var enteredNOP = parseInt($('#txtNOPforRemove').val());
    var volumeNew = (parseFloat(oldVolumeRm) / parseFloat(oldNOPRM)) * enteredNOP;
    calculateVolumeForRm = Math.round(volumeNew * 100) / 100;
    $('#txtVolumeforRemove').val(calculateVolumeForRm);
}

UnitizationRemoveOffloadShipment = function () {

    if ($("#txtNOPforRemove").val() == "") {
        $('#lblMSGForRemove').text('Please enter NOP').css('color', 'red');
        return;
    } else {
        $('#lblMSGForRemove').text('');
    }
    if ($("#txtWeightforRemove").val() == "") {
        $('#lblMSGForRemove').text('Please enter Weight').css('color', 'red');
        return;
    } else {
        $('#lblMSGForRemove').text('');
    }

    if ($("#ddlReasonforRemove").val() == "0") {
        $('#lblMSGForRemove').text('Please select reason.').css('color', 'red');
        return;
    } else {
        $('#lblMSGForRemove').text('');
    }



    if ($("#bulkCheckBox").prop("checked")) {
        type = "T";

    } else if ($("#ULDCheckbox").prop("checked")) {
        type = "U";
    }
    if ($("#uldLists").val() == '0') {
        ULDType = '';
        ULDNumber = '';
        ULDOwner = '';
    } else {
        uldsVal = $("#uldLists option:selected").text().replace(' ', '');
        ULDType = uldsVal.slice(0, 3)
        ULDNumber = uldsVal.slice(3, 8)
        ULDOwner = uldsVal.slice(8, 11)
    }

    InputXML = '<Root><FlightSeqNo>' + FltSeqNo + '</FlightSeqNo><ULDSeqNo>' + $("#uldLists").val() + '</ULDSeqNo><ManifestSeqNo>' + _ManifestSeqNo + '</ManifestSeqNo><Type>' + type + '</Type><Offpoint>' + $("#offPointLists").val() + '</Offpoint>' +
        '<AirportCity>' + SHED_AIRPORT_CITY + '</AirportCity><UserID>' + Userid + '</UserID><ULDType>' + ULDType + '</ULDType><ULDNumber>' + ULDNumber + '</ULDNumber><ULDOwner>' + ULDOwner + '</ULDOwner>' +
        '<ShipmentId>' + ShipmentId + '</ShipmentId><NOP>' + $("#txtNOPforRemove").val() + '</NOP><Weight>' + $("#txtWeightforRemove").val() + '</Weight><Volume>' + $("#txtVolumeforRemove").val() + '</Volume><Reason>' + $("#ddlReasonforRemove").val() + '</Reason><Remark>' + $("#txtRemarkforRmove").val() + '</Remark></Root>';
    console.log(InputXML)
    //xmlDataForDamage = JSON.stringify(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizationRemoveOffloadShipment",
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
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $("#lblMSGForRemove").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else {
                        $("#lblMSGForRemove").text(StrMessage).css({ "color": "green", "font-weight": "bold" });
                        $("#txtNOPforRemove").val('');
                        $("#txtWeightforRemove").val('');
                        $("#txtVolumeforRemove").val('');
                        $("#ddlReasonforRemove").val('');
                        $("#txtRemarkforRmove").val('');
                        setTimeout(function () {
                            $('#modalViewRemoveOffload').modal('hide');
                            clearRemoveData()
                            UnitizedGetAWBDetails();
                        }, 5000);
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

function clearRemoveData() {
    $("#txtNOPforRemove").val('');
    $("#txtWeightforRemove").val('');
    $("#txtVolumeforRemove").val('');
    $("#ddlReasonforRemove").val('');
    $("#txtRemarkforRmove").val('');
    $("#lblMSGForRemove").text('');

}

function clearMoveShipment() {
    $("#ddlSource").val('0');
    $("#ddlAWBList").empty();
    $("#ddlDestination").val('0');
    $("#txtMovePieces").val('');
    $("#txtMoveWeight").val('');
    $("#txtMoveVolume").val('');
    $("#txtAWBNOMoveShip").val('');
    $("#txtFromULD").val('');
    $("#txtToULD").val('');
    $("#mantiya").text('');
    $("#lblMSGForMoveShipment").text('');
    $("#txtFromULD").focus();
}

var calculateVolumeForMoveShip;
function calculateVolumneForMoveShip() {
    if ($('#txtMovePieces').val() == '') {
        $('#txtMoveWeight').val('');
        $('#txtMoveVolume').val('');
        return;
    }

    if (parseInt($('#txtMovePieces').val()) > parseInt(SNOPMOVE)) {
        $('#lblMSGForMoveShipment').text('Entered NOP should not greater than manifested NOP').css('color', 'red');
        $('#txtMovePieces').val('');
        $('#txtMoveVolume').val('');

        return;
    } else {
        $('#lblMSGForMoveShipment').text('');

    }

    var enteredwt = parseInt($('#txtMovePieces').val());
    var wtNew = (parseFloat(SWTMAN) / parseFloat(SNOPMAN)) * enteredwt;
    calculateWtForMoveShip = Math.round(wtNew * 100) / 100;
    $('#txtMoveWeight').val(calculateWtForMoveShip);


    var enteredNOP = parseInt($('#txtMovePieces').val());
    var volumeNew = (parseFloat(SVOLMOVE) / parseFloat(SNOPMOVE)) * enteredNOP;
    calculateVolumeForMoveShip = Math.round(volumeNew * 100) / 100;
    $('#txtMoveVolume').val(calculateVolumeForMoveShip);



}
var EAID;
var ESID;
var SNOPMAN;
var EmiSeqNo;
var SNOPMOVE;
var SWTMAN;
var SWTMOVE;
var SVOLMAN;
var SVOLMOVE;
function AWBChangeForXML(allValues) {
    $("#lblMSGForMoveShipment").text('');
    alvalSplit = allValues.split('~');
    console.log(alvalSplit)
    EAID = alvalSplit[0];
    ESID = alvalSplit[1];
    EmiSeqNo = alvalSplit[2];
    SNOPMAN = alvalSplit[3];
    SNOPMOVE = alvalSplit[4];
    SWTMAN = alvalSplit[5];
    SWTMOVE = alvalSplit[6];
    SVOLMAN = alvalSplit[7];
    SVOLMOVE = alvalSplit[8];
    if($("#ddlAWBList option:selected").text() == 'Select'){
        $("#txtMovePieces").val('');
        $("#txtMoveWeight").val('');
        $("#txtMoveVolume").val('');
        $("#mantiya").text('');  
        $('#txtAWBNOMoveShip').val('');
    }
    else{
        $('#txtAWBNOMoveShip').val($("#ddlAWBList option:selected").text().replace(/\s/g, ''));
        $("#txtMovePieces").val(SNOPMOVE);
        $("#txtMoveWeight").val(SWTMOVE);
        $("#txtMoveVolume").val(SVOLMOVE);
        $("#mantiya").text(SNOPMAN + ' / ' + SWTMAN + ' / ' + SWTMAN);
    }
    
  

}

function DestChane(rr) {
    $("#lblMSGForMoveShipment").text('');
    $('#txtToULD').val($("#ddlDestination option:selected").text().replace(/\s/g, ''));
}


UnitizationMoveShipment = function () {
    if ($("#ddlSource option:selected").text() == 'Select') {
        $('#lblMSGForMoveShipment').text('Please enter/scan from ULD No.').css('color', 'red');
        return;
    } else {
        $('#lblMSGForMoveShipment').text('');
    }

    if ($("#ddlAWBList").val() == "0") {
        $('#lblMSGForMoveShipment').text('Please enter/scan AWB No.').css('color', 'red');
        return;
    } else {
        $('#lblMSGForMoveShipment').text('');
    }

    if ($("#ddlDestination option:selected").text() == 'Select') {
        $('#lblMSGForMoveShipment').text('Please enter/scan from to ULD No.').css('color', 'red');
        return;
    } else {
        $('#lblMSGForMoveShipment').text('');
    }
    if ($("#txtMovePieces").val() == "") {
        $('#lblMSGForMoveShipment').text('Please enter Pieces').css('color', 'red');
        return;
    } else {
        $('#lblMSGForMoveShipment').text('');
    }
    if ($("#txtMoveWeight").val() == "") {
        $('#lblMSGForMoveShipment').text('Please enter Weight').css('color', 'red');
        return;
    } else {
        $('#lblMSGForMoveShipment').text('');
    }

    if ($("#txtMoveVolume").val() == "") {
        $('#lblMSGForMoveShipment').text('Please enter Volume').css('color', 'red');
        return;
    } else {
        $('#lblMSGForMoveShipment').text('');
    }

    sourceSplit = $("#ddlSource").val().split('_');
    finalSplitSource = sourceSplit[0];

    destSplit = $("#ddlDestination").val().split('_');
    finaldestSplit = destSplit[0];
    InputXML = '<awbULDs>' +
        '<ULDdata>' +
        '<EAID>' + EAID + '</EAID>' +
        '<ESID>' + ESID + '</ESID>' +
        '<EmiSeqNo>' + EmiSeqNo + '</EmiSeqNo>' +
        '<SNOPMAN>' + SNOPMAN + '</SNOPMAN>' +
        '<SNOPMOVE>' + $("#txtMovePieces").val() + '</SNOPMOVE>' +
        '<SWTMAN>' + SWTMAN + '</SWTMAN>' +
        '<SWTMOVE>' + $("#txtMoveWeight").val() + '</SWTMOVE>' +
        '<SourceULD>' + finalSplitSource + '</SourceULD>' +
        '<TargetULD>' + finaldestSplit + '</TargetULD>' +
        '</ULDdata>' +
        '</awbULDs>';
    console.log(InputXML)
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizationMoveShipment",
        data: JSON.stringify({

            'FltSeqNo': FltSeqNo,
            'fromULD': $("#ddlSource").val(),
            'toULD': $("#ddlDestination").val(),
            'AWBxml': InputXML,
            'AirportCity': SHED_AIRPORT_CITY,
            'CompanyCode': CompanyCode,
            'UserID': Userid

        }),
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
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $("#lblMSGForMoveShipment").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else {
                        $("#ddlSource").val('0');
                        $("#ddlAWBList").empty();
                        $("#ddlDestination").val('0');
                        $("#txtMovePieces").val('');
                        $("#txtMoveWeight").val('');
                        $("#txtMoveVolume").val('');
                        $("#txtAWBNOMoveShip").val('');
                        $("#txtFromULD").val('');
                        $("#txtToULD").val('');
                        $("#mantiya").text('');
                        $("#lblMSGForMoveShipment").text(StrMessage).css({ "color": "green", "font-weight": "bold" });
                    }
                    //else if (Status == 'S') {
                    //    $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    //}
                });



                $(xmlDoc).find('Table1').each(function (index) {
                    AWBNUMBER = $(this).find('AWBNUMBER').text();
                    ULD_SEQUENCE_NUMBER = $(this).find('ULD_SEQUENCE_NUMBER').text();
                    NOP = $(this).find('NOP').text();
                    WEIGHT_KG = $(this).find('WEIGHT_KG').text();
                    VOLUME = $(this).find('VOLUME').text();
                    ViewAWBDetailsTable(AWBNUMBER, ULD_SEQUENCE_NUMBER, NOP, WEIGHT_KG, VOLUME);

                    $('#tblViewAWBDetails').append(html);


                });

                $(xmlDoc).find('Table2').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();

                    var newOption = $('<option></option>');
                    newOption.val(REFERENCE_DATA_IDENTIFIER).text(REFERENCE_DESCRIPTION);
                    newOption.appendTo('#ddlReasonforRemove');
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




UnitizedMoveShipmentGetULD = function () {
    if ($("#txtFlightAirlineNo").val() == '' || $("#txtFlightNo").val() == '') {
        errmsg = "Please enter Flight No. and Date</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#offPointLists").val() == '0') {
        errmsg = "Please select Off Point</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#uldLists option:selected").text() == 'Select') {
        errmsg = "Please select ULD</br>";
        $.alert(errmsg);
        return;
    }
    InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><CompanyCode>" + CompanyCode + "</CompanyCode></Root>";
    console.log(InputXML)
    //xmlDataForDamage = JSON.stringify(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizedMoveShipmentGetULD",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            $('#ddlSource').empty();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                $('#ddlDestination').empty();
                $('#ddlSource').empty();
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {

                    Type = $(this).find('Type').text();
                    ULDId = $(this).find('ULDId').text();
                    ULD = $(this).find('ULD').text();
                    ULDVal = $(this).find('ULDVal').text();
                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlSource');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(ULDVal).text(ULD);
                    newOption.appendTo('#ddlSource');

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlDestination');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(ULDVal).text(ULD);
                    newOption.appendTo('#ddlDestination');

                    //$('#txtFromULD').focus();
                });

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        // $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    }

                });
                ddlVal = $("#uldLists option:selected").text().replace(/ /g, '');

                $('#txtFromULD').val(ddlVal);
                $('#txtFromULD').blur();
                $('#modaltblMoveShipment').modal('toggle');


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

UnitizedMoveShipmentGetShipmentData = function (sqno) {
    $("#lblMSGForMoveShipment").text('');
    sep_no = sqno.split('_');
    finseqNo = sep_no[0];
    if ($("#ddlSource option:selected").text() == 'Select') {
        $('#tblMoveShipment').empty();
        $("#ddlSource").val('0');
        $("#ddlAWBList").empty();
        $("#ddlDestination").val('0');
        $("#txtMovePieces").val('');
        $("#txtMoveWeight").val('');
        $("#txtMoveVolume").val('');
        $("#txtAWBNOMoveShip").val('');
        $("#txtFromULD").val('');
        $("#txtToULD").val('');
        $("#mantiya").text('');
        $("#lblMSGForMoveShipment").text('');
        $("#txtFromULD").focus();
        return;
    }

    
   $('#txtFromULD').val($("#ddlSource option:selected").text().replace(/\s/g, ''));
    
    InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>" + finseqNo + "</ULDSeqNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><CompanyCode>" + CompanyCode + "</CompanyCode></Root>";
    console.log(InputXML)
    //xmlDataForDamage = JSON.stringify(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizedMoveShipmentGetShipmentData",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            $('#ddlAWBList').empty();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                $('#tblMoveShipment').empty();
                console.log(xmlDoc)

                $(xmlDoc).find('Table1').each(function (index) {

                    isTable1Av = '1';

                    Type = $(this).find('Type').text();
                    ULDSeqNo = $(this).find('ULDSeqNo').text();
                    EAID = $(this).find('EAID').text();
                    ESID = $(this).find('ESID').text();
                    EmiSeqNo = $(this).find('EmiSeqNo').text();
                    NPX = $(this).find('NPX').text();
                    Status = $(this).find('Status').text();
                    AWB_x0020_NO = $(this).find('AWB_x0020_NO').text();
                    SNOPMAN = $(this).find('SNOPMAN').text();
                    SNOPMOVE = $(this).find('SNOPMOVE').text();
                    SWTMAN = $(this).find('SWTMAN').text();
                    SWTMOVE = $(this).find('SWTMOVE').text();
                    SVOLMAN = $(this).find('SVOLMAN').text();
                    SVOLMOVE = $(this).find('SVOLMOVE').text();
                    if (index == 0 && $("#ddlAWBList").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlAWBList');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(EAID + '~' + ESID + '~' + EmiSeqNo + '~' + SNOPMAN + '~' + SNOPMOVE + '~' + SWTMAN + '~' + SWTMOVE + '~' + SVOLMAN + '~' + SVOLMOVE).text(AWB_x0020_NO);
                    newOption.appendTo('#ddlAWBList');


                });


                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        // $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

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

function exitModalMoveShipment() {
    $("#ddlSource").val('0');
    $("#ddlAWBList").empty();
    $("#ddlDestination").val('0');
    $("#txtMovePieces").val('');
    $("#txtMoveWeight").val('');
    $("#txtMoveVolume").val('');
    $("#txtAWBNOMoveShip").val('');
    $("#txtFromULD").val('');
    $("#txtToULD").val('');
    $("#mantiya").text('');
    $("#lblMSGForMoveShipment").text('');
    $("#txtFromULD").focus();
    $('#modaltblMoveShipment').modal('hide');
}


function ViewMoveShipmentTbl(AWB_x0020_NO, ULDSeqNo, EAID, ESID, EmiSeqNo, NPX, Status, SNOPMAN, SNOPMOVE, SWTMAN, SWTMOVE, SVOLMAN, SVOLMOVE) {

    html += "<tr>";
    html += "<td>";
    //html += '<input onclick="openDetailModalofRemove(\'' + AWBNUMBER + '\',\'' + ULD_SEQUENCE_NUMBER + '\',\'' + NOP + '\',\'' + WEIGHT_KG + '\',\'' + Volume + '\',\'' + ManifestSeqNo + '\');" style="float: left; margin: 8px 8px; width: 100 %; " class="checkbox" type="checkbox" value="' + ULD_SEQUENCE_NUMBER + '" >';
    html += '<input  style="float: left; margin: 8px 8px; width: 100 %; " class="checkbox" type="checkbox" id="' + ULDSeqNo + ',' + EAID + ',' + ESID + ',' + EmiSeqNo + ',' + NPX + ',' + Status + '" >';
    html += '<input style="display: none;"  type="text" name="custId" value="' + ULDSeqNo + '" >';
    html += '<input style="display: none;" type="text" name="custId" value="' + EAID + '" >';
    html += '<input style="display: none;" type="text" name="custId" value="' + ESID + '" >';
    html += '<input style="display: none;" type="text" name="custId" value="' + EmiSeqNo + '" >';
    html += '<input style="display: none;" type="text" name="custId" value="' + NPX + '" >';
    html += '<input style="display: none;" type="text" name="custId" value="' + Status + '" >';

    html += "</td>";
    html += "<td>" + AWB_x0020_NO + "</td>";
    html += '<td style="padding:7px;text-align: center;">' + SNOPMAN + ' <br><input onkeyup="NumberOnly(event); " class="textpackges text-right"  id=""   type="text" value=' + SNOPMOVE + ' /></td>';
    html += '<td style="padding:7px;text-align: center;">' + SWTMAN + ' <br><input onkeyup="NumberOnly(event); " class="textpackges text-right"  id=""   type="text" value=' + SWTMOVE + ' /></td>';
    html += '<td style="padding:7px;text-align: center;">' + SVOLMAN + ' <br><input onkeyup="NumberOnly(event); " class="textpackges text-right"  id=""   type="text" value=' + SVOLMOVE + ' /></td>';
    html += "</tr>";

}
var OuterPackingvalues = [];
function myfunctionforChecked() {
    $('#tblMoveShipment').each(function () {
        $(this).find("input[type='checkbox']:checked").each(function () {
            if ($(".checkbox").prop('checked') == true) {

            }
        });
        //$(this).find("input[type*='text']").each(function () {
        //    /* var id = $(this).attr('id');*/
        //    alert($(this).attr('value'));
        //});
    });
    //var OuterPackingVal = OuterPackingvalues.join(",");
    //console.log(OuterPackingVal);
}
getAllValues = function () {

    inputRows = "";
    $('#TextBoxesGroup tr').each(function () {

        inputRows += "<Rows>"
        $(this).find("input").each(function () {

            ItemCode = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('Pieces') != -1) {
                inputRows += "<Pieces>" + ItemCode + "</Pieces>"
            }
            else if (id.toString().indexOf('Length') != -1) {
                inputRows += "<Length>" + ItemCode + "</Length>"
            }
            else if (id.toString().indexOf('Width') != -1) {
                inputRows += "<Width>" + ItemCode + "</Width>"
            }
            else if (id.toString().indexOf('Height') != -1) {
                inputRows += "<Height>" + ItemCode + "</Height>";
            }
        });
        inputRows += "</Rows>";
    });
}


UnitizedGetAWBDetailsMove = function () {

    if ($("#bulkCheckBox").prop("checked")) {
        type = "T";

    } else if ($("#ULDCheckbox").prop("checked")) {
        type = "U";
        ULDSeqNo = $("#uldLists").val();
        selectedULD = $("#uldLists :selected").text()

    }
    if ($("#txtFlightAirlineNo").val() == '' || $("#txtFlightNo").val() == '') {
        errmsg = "Please enter Flight No. and Date</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#offPointLists").val() == '0') {
        errmsg = "Please select Off Point</br>";
        $.alert(errmsg);
        return;
    }

    if ($("#uldLists option:selected").text() == 'Select') {
        errmsg = "Please select ULD</br>";
        $.alert(errmsg);
        return;
    }
    //if ($("#uldLists").val() == '0') {
    //    errmsg = "Please select ULD's</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>0</ULDSeqNo><Type>" + type + "</Type><Offpoint>" + Offpoint + "</Offpoint><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity > <CompanyCode>" + CompanyCode + "</CompanyCode></Root >";

    console.log(InputXML)
    //xmlDataForDamage = JSON.stringify(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizedGetAWBDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            $('#tblViewAWBDetails').empty();


            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                var isTable1Av = '0';
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    }
                    //else if (Status == 'S') {
                    //    $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    //}
                });

                $("#lblULDNAME").text($("#uldLists option:selected").text());

                $(xmlDoc).find('Table1').each(function (index) {
                    isTable1Av = '1';
                    AWBNUMBER = $(this).find('AWBNUMBER').text();
                    ULD_SEQUENCE_NUMBER = $(this).find('ULD_SEQUENCE_NUMBER').text();
                    NOP = $(this).find('NOP').text();
                    WEIGHT_KG = $(this).find('WEIGHT_KG').text();
                    VOLUME = $(this).find('VOLUME').text();
                    ManifestSeqNo = $(this).find('ManifestSeqNo').text();
                    ViewAWBDetailsTable(AWBNUMBER, ULD_SEQUENCE_NUMBER, NOP, WEIGHT_KG, VOLUME, ManifestSeqNo);
                    $('#tblViewAWBDetails').append(html);


                });

                $(xmlDoc).find('Table2').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                    var newOption = $('<option></option>');

                    newOption.val(REFERENCE_DATA_IDENTIFIER).text(REFERENCE_DESCRIPTION);
                    newOption.appendTo('#ddlReasonforRemove');
                });

                if (isTable1Av == '1') {
                    $('#modalViewAWBDetails').modal('show');
                } else {
                    $.alert("Data not found.");
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



UnitizedMoveShipmentGetShipmentDataOld = function (sqno) {

    sep_no = sqno.split('_');
    finseqNo = sep_no[0];
    if ($("#ddlSource option:selected").text() == 'Select') {
        $('#tblMoveShipment').empty();
        $("#ddlSource").val('0');
        $("#ddlAWBList").empty();
        $("#ddlDestination").val('0');
        $("#txtMovePieces").val('');
        $("#txtMoveWeight").val('');
        $("#txtMoveVolume").val('');
        $("#txtAWBNOMoveShip").val('');
        $("#txtFromULD").val('');
        $("#txtToULD").val('');
        $("#mantiya").text('');
        $("#lblMSGForMoveShipment").text('');
        return;
    }
    InputXML = "<Root><FlightSeqNo>" + FltSeqNo + "</FlightSeqNo><ULDSeqNo>" + finseqNo + "</ULDSeqNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><CompanyCode>" + CompanyCode + "</CompanyCode></Root>";
    console.log(InputXML)
    //xmlDataForDamage = JSON.stringify(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/UnitizedMoveShipmentGetShipmentData",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            $('#ddlAWBList').empty();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                var xmlDoc = $.parseXML(str);
                $('#tblMoveShipment').empty();
                console.log(xmlDoc)
                html = '';

                html = "<table class='table table-bordered table-striped  mb-0'>";
                html += "<thead><tr>";
                // html += "<th style='background-color:rgb(208, 225, 244);'><input id='selectAll' type='checkbox' style='margin: 8px 8px;' /></th>";
                html += "<th style='background-color:rgb(208, 225, 244);'></th>";
                html += "<th style='background-color:rgb(208, 225, 244);'>AWB Number</th>";
                html += "<th style='background-color:rgb(208, 225, 244);'>Man. Pcs.</th>";
                html += "<th style='background-color:rgb(208, 225, 244);'>Man. Wt.</th>";
                html += "<th style='background-color:rgb(208, 225, 244);'>Man Vol.</th>";
                html += "</tr></thead>";
                html += "<tbody>";
                $(xmlDoc).find('Table1').each(function (index) {

                    isTable1Av = '1';

                    Type = $(this).find('Type').text();
                    ULDSeqNo = $(this).find('ULDSeqNo').text();
                    EAID = $(this).find('EAID').text();
                    ESID = $(this).find('ESID').text();
                    EmiSeqNo = $(this).find('EmiSeqNo').text();
                    NPX = $(this).find('NPX').text();
                    Status = $(this).find('Status').text();
                    AWB_x0020_NO = $(this).find('AWB_x0020_NO').text();
                    SNOPMAN = $(this).find('SNOPMAN').text();
                    SNOPMOVE = $(this).find('SNOPMOVE').text();
                    SWTMAN = $(this).find('SWTMAN').text();
                    SWTMOVE = $(this).find('SWTMOVE').text();
                    SVOLMAN = $(this).find('SVOLMAN').text();
                    SVOLMOVE = $(this).find('SVOLMOVE').text();
                    if (index == 0 && $("#ddlAWBList").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlAWBList');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(AWB_x0020_NO).text(AWB_x0020_NO);
                    newOption.appendTo('#ddlAWBList');
                    //  ViewMoveShipmentTbl(AWB_x0020_NO, ULDSeqNo, EAID, ESID, EmiSeqNo, NPX, Status, SNOPMAN, SNOPMOVE, SWTMAN, SWTMOVE, SVOLMAN, SVOLMOVE);


                });
                html += "</tbody></table>";
                $('#tblMoveShipment').append(html);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        // $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

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
function ValidateSHCCodes() {

    var InputXML = '<Root><AirportCity>' + SHED_AIRPORT_CITY + '</AirportCity>' + allSHCCodeSave + '</Root >';
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ExpURL + "/ValidateSHCCodes",
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

                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $("#spnValdatemsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        allSHCCodeSave = '';
                        joinAllValuesWithComma = '';
                    } else if (Status == 'S') {
                        $("#spnValdatemsg").text('');
                        $('#SHCCode').modal('hide');
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

function cleatInvalidSHCCode() {
    allSHCCodeSave = '';
}

function GetULDs(valFromddloffpoint) {
    // $('#trolleyLists').empty();
    // var newOption = $('<option></option>');
    // newOption.val(0).text('Select');
    // newOption.appendTo('#trolleyLists');

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
                    if ($('#trolleyLists option[value="' + $(this).find('TrolleySeqNo').text() + '"]').length === 0)
                    {
                        newOption2.appendTo('#trolleyLists');
                    }
                    // $("#trolleyLists").val($(this).find('TrolleySeqNo').text());
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