//document.addEventListener("deviceready", GetCommodityList, false);
//Build 15MAY2023_QA_V1
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");

var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var BasePalletSeqNum = window.localStorage.getItem("ULDSeqNo");
var FlightSeqNo;
var SegId;
var ULDseqNo;
var strShipmentInfo;
var totalPkgs;
var totalWeight;
var totalVol;
var prorataWeightValue;
var prorataVolumeValue;
var prorataWtParam;
var prorataVolParam;
var html;
var OffPoint1;
var manpower = '0';
var selectedULDSeqNo;
var selectedULDNo

$(function () {

    if (window.localStorage.getItem("RoleExpUnitization") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }
    $('#link').hide();
    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var t = formattedDate.getTime();
    var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    $('#txtFlightDate').val(newDate);

    //let date = new Date();
    //const day = date.toLocaleString('default', { day: '2-digit' });
    //const month = date.toLocaleString('default', { month: 'short' });
    //const year = date.toLocaleString('default', { year: 'numeric' });
    //var today = day + '-' + month + '-' + year;
    //$('#txtFlightDate').val(today);

    //$("#txtFlightDate").datepicker({
    //    shortYearCutoff: 1,
    //    changeMonth: true,
    //    changeYear: true,
    //    dateFormat: 'dd-M-yy'
    //});

    //var h = date.getHours();
    //var m = date.getMinutes();
    //var s = date.getSeconds();
    //return date + h + ":" + m;
    // $('#txtGPNo1').val(date);



    if (amplify.store("flightPrefix") != '' && amplify.store("flightNo") != '' && amplify.store("flightDate") != '') {
        $("#txtFlightPrefix").val(amplify.store("flightPrefix"));
        $("#txtFlightNo").val(amplify.store("flightNo"));
        $("#txtFlightDate").val(amplify.store("flightDate"));

        GetOffPointForFlight();

        amplify.store("flightSeqNo", "")
        amplify.store("flightPrefix", "")
        amplify.store("flightNo", "")
        amplify.store("flightDate", "")
        amplify.store("flightDisplayDate", "")

    }

});

//function countChar(val, count) {

//    var currentBoxNumber = 0;
//    textboxes = $('input[name="textbox[]"]');
//    currentBoxNumber = textboxes.index(val);

//    var len = val.value.length;
//    var index = val.index;

//    if (len == count)
//        ToNextTextbox(currentBoxNumber)
//};

//function ToNextTextbox(currentBoxNumber) {

//    textboxes = $('input[name="textbox[]"]');

//    if (textboxes[currentBoxNumber + 1] != null) {
//        nextBox = textboxes[currentBoxNumber + 1];
//        nextBox.focus();
//        nextBox.select();
//        event.preventDefault();
//        return false;

//    }

//}

// $("#ddlULD").on('change', 'select', function() {
//     $.alert($(this).val()); // the selected options’s value

// });


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function confirmDialog(iULDType, iULDNum, iULDOwner, obj, iULDSeqNum) {
    var basePalletULDNum = window.localStorage.getItem("ULDNo");
    $.confirm("Are you sure you want to remove Pallet " + iULDType + " " + iULDNum + " " + iULDOwner + " " + "from ULD " + basePalletULDNum, function (result) {
        if (result) {
            obj.parentNode.parentNode.parentNode.remove();
            var BasePalletSeqNum = window.localStorage.getItem("ULDSeqNo");
            DeletePallet(iULDSeqNum);
            CheckBasePallet(BasePalletSeqNum);

        }
        else {

        }
    });
}

// function to enable ULD Condition Code when Stack(RDO) is clicked.
function EnableULDConditionCode() {
    if (document.getElementById('rdoStack').checked) {
        $('#txtULDType').val('');
        $('#txtULDNumber').val('');
        $('#txtOwner').val('');
        $("#txtULDConditionCode").prop('disabled', false);
        $("#txtULDConditionCode").css('background-color', 'white');
    }

}
// function to check selected option from ULD's DDl is pallet or not
// and if it is then enable Stack(RDO). 
$(function () {
    $("#ddlULD").change(function () {
        selectedULDNo = $(this).find("option:selected").text();
        selectedULDSeqNo = $(this).val();
        //  $.alert(selectedULDSeqNo);
        window.localStorage.setItem("ULDSeqNo", selectedULDSeqNo);
        window.localStorage.setItem("ULDNo", selectedULDNo);
        if (selectedULDNo[0] == "P") {
            $('#rdoStack').attr('disabled', false);

            CheckBasePallet(selectedULDSeqNo);

            $('#txtBasePalletULDNo').val(selectedULDNo);
        }
        else {
            $('#rdoStack').attr('disabled', true);
            $("#txtULDConditionCode").prop('disabled', true);
            $("#txtULDConditionCode").css('background-color', '#eee');
            $("#rdoULD").prop("checked", true);
            $('#link').hide();
        }
    });
});

function callGetPallet() {
    var BasePalletSeqNum = window.localStorage.getItem("ULDSeqNo");
    CheckBasePallet(BasePalletSeqNum);


}
function openStackPopUp() {
    var BasePalletSeqNum = window.localStorage.getItem("ULDSeqNo");
    GetPallets(BasePalletSeqNum);
}

function CheckULDBulk() {

    if (document.getElementById('rdoULD').checked) {
        $('#divULDText').show();
        $('#divULDCondition').show();
        $('#divBulkText').hide();
        $('#divDdlULD').show();
        $('#divDdlBulk').hide();
        $('#divContour').show();
        $("#txtULDConditionCode").prop('disabled', true);
        $("#txtULDConditionCode").css('background-color', '#eee');
        $('#ddlULD').val(0);
        $('#link').hide();
        $('#txtULDType').val('');
        $('#txtULDNumber').val('');
        $('#txtOwner').val('');
        $('#txtULDConditionCode').val('');
        $('#rdoStack').attr('disabled', true);
        // $('#rdoStack').attr('checked',false);
        // $('#rdoStack').attr('disabled',true);

    }
    if (document.getElementById('rdoBulk').checked) {
        $('#divULDText').hide();
        $('#divULDCondition').hide();
        $('#divBulkText').show();
        $('#divDdlULD').hide();
        $('#divDdlBulk').show();
        $('#divContour').hide();
        $('#rdoStack').attr('disabled', true);
        
       
        
    }
}


function CheckBasePallet(BasePalletSeqNo) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var inputXML = '<Root><BasePalletSeqNo>' + BasePalletSeqNo + '</BasePalletSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "UnitizationGetPalletDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {

                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                localAuthorities = xmlDoc.getElementsByTagName("Table");
                var nodes = localAuthorities[0].getElementsByTagName("ULDSeqNo")[0].childNodes;
                var value = nodes.length === 1 ? nodes[0].nodeValue : "";
                if (value == "") {
                    $('#link').hide();
                    $('#lblHeadings').hide();
                    $('#lblNoRecord').show();
                }
                else {
                    $('#link').show();
                    $('#lblHeadings').show();
                    $('#lblNoRecord').hide();
                }
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
};


function GetPallets(BasePalletSeqNo) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    document.querySelector("#list").innerHTML = '';
    var inputXML = '<Root><BasePalletSeqNo>' + BasePalletSeqNo + '</BasePalletSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "UnitizationGetPalletDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {

                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function (index) {


                    var ULDType;
                    var ULDNum;
                    var ULDOwner;
                    var ULDConCode;
                    var ULDSeqNum;

                    ULDType = $(this).find('ULDType').text();
                    ULDNum = $(this).find('ULDNumber').text();
                    ULDOwner = $(this).find('ULDOwner').text();
                    ULDConCode = $(this).find('ConCode').text();
                    ULDSeqNum = $(this).find('ULDSeqNo').text();
                    if (ULDType != "") {
                        document.querySelector("#list").innerHTML += `
                    <div class="row form-group" id="palletRow">
                    <div class=" " style="float: left; width: 50%; justify-content: center;">
                        <div class=""
                            style="display: flex;float: left">
                            <div class="">
                                <input id="txtULDType" class="form-control" type="text" 
                                    maxlength="3" style="background-color:#eee; width:"25%";" value="${ULDType}" disabled>
                            </div>
                            &nbsp;
                            <div class="">
                                <input id="txtULDNumber" class="form-control" type="text" 
                                    maxlength="5" style="background-color:#eee; width:"50%";margin-left="3px";marging-right="3px";" value="${ULDNum}" disabled>
                            </div>
                            &nbsp;
                            <div class="">
                                <input id="txtOwner" class="form-control" type="text" maxlength="2" 
                                style="background-color:#eee;width:"25%";"
                                    value="${ULDOwner}" disabled>
                            </div>
                           
                        </div>

                    </div>
                    
                    <div class="col-xs-6 col-form-label"
                        style="float: right; width: 45%;margin-left:5px">
                        <div class=""
                            style="display: flex; justify-content: left;">
                            <input id="txtULDConditionCode" class="form-control" type="text"
                            style="background-color:#eee"
                                maxlength="3" style="text-align:right;width:40%" value="${ULDConCode}"
                                disabled>
                                <button class="delete" value="${ULDSeqNum}"
                                style="border: none;padding: 0px;margin-left:8px;background-color: white;" onclick='confirmDialog("${ULDType}","${ULDNum}","${ULDOwner}",this,"${ULDSeqNum}")'>
                                <i class="fa fa-minus-circle"
                                    style="font-size:20px;color:red"></i></button>
                        </div>
                        
                    </div>
                    
                </div>
                    `;
                        // var current_pallet = document.querySelectorAll(".delete");
                        // var current_ULDNum = document.querySelectorAll("#ULDNum");
                        // for (var i = 0; i < current_pallet.length; i++) {
                        //     current_pallet[i].onclick = function () {
                        //     this.parentNode.parentNode.parentNode.remove();
                        //     DeletePallet($(this).val());
                        //     }
                        // }
                    }


                });
            },
            error: function (msg) {

                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function ResetStackLayout() {
    document.querySelector("#list").innerHTML = '';
    var BasePalletSeqNum = window.localStorage.getItem("ULDSeqNo");
    CheckBasePallet(BasePalletSeqNum);
    location.href = "#";

}

function DeletePallet(ULDSeqNo) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var inputXML = '<Root><ULDSeqNo>' + ULDSeqNo + '</ULDSeqNo><UserId>' + UserId + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';
    if (errmsg == "" && connectionStatus == "online") {

        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + 'UnitizationDeletePalletDetails',
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {

                });


            },
            // complete: function(){
            //     CheckBasePallet(BasePalletSeqNum);
            // },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while deleting data');
            }

        });
        return false;
    }

}

function CheckUldNoValidation(uldno) {
    CheckSpecialCharacter(uldno);
    var ValidChars = "0123456789.";
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_`";
    var IsNumber = true;
    var Char;

    var getULDNo = uldno;//document.getElementById(txtULDNumber).value;
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

        }
        else if (getlength == 5) {
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
        }
        else {
            $.alert('Please Enter minimum four and maximum five character');
            $('#txtULDNumber').val('');
            $('#txtULDNumber').focus();
            return false;
        }
    }
}

function CheckSpecialCharacter(uldno) {

    var getUldno = $('#txtULDNumber').val();
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

function GetOffPointForFlight() {

    $('#ddlOffPoint').empty();
    $('#uldTypeULDL').empty();
    $('#ddlContour').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlContour');

    $('#ddlULD').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlULD');
    $('#link').hide();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();

    if (FlightPrefix == "" || FlightNo == "") {
        errmsg = "Please enter valid Flight No.";
        $.alert(errmsg);
        return;
    }

    if (FlightDate == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }

    var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetExportFlightDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    var status = $(this).find('Status').text();

                    if (status == 'E') {
                        $.alert($(this).find('StrMessage').text());
                    }
                });

                $(xmlDoc).find('Table1').each(function () {

                    FlightSeqNo = $(this).find('FltSeqNo').text();
                    Manpower = $(this).find('Manpower').text();


                    $("#txtFlightManpower").val(Manpower);
                    $("#btnViewCloseULDList").removeAttr('disabled');



                });

                $(xmlDoc).find('Table2').each(function (index) {

                    var RouteId;
                    var OffPointCity;

                    RouteId = $(this).find('RouteID').text();
                    OffPointCity = $(this).find('FLIGHT_AIRPORT_CITY').text();

                    OffPoint1 = $(this).find('FLIGHT_AIRPORT_CITY').text();

                    var newOption = $('<option></option>');
                    newOption.val(RouteId).text(OffPointCity);
                    newOption.appendTo('#ddlOffPoint');
                    if (index == 0) {
                        GetULDs(OffPointCity);
                    }
                });

                $(xmlDoc).find('Table4').each(function (index) {

                    var ContourId;
                    var ContourNo;

                    ContourId = $(this).find('Value').text();
                    ContourNo = $(this).find('Text').text();

                    var newOption = $('<option></option>');
                    newOption.val(ContourId).text(ContourNo);
                    newOption.appendTo('#ddlContour');
                });

                $(xmlDoc).find('Table6').each(function (index) {

                    var KEYVALUE;
                    var DESCRIPTION;
                    
                    KEYVALUE = $(this).find('KEYVALUE').text();
                    DESCRIPTION = $(this).find('DESCRIPTION').text();

                    var newOption = $('<option></option>');
                    newOption.val(KEYVALUE).text(DESCRIPTION);
                    newOption.appendTo('#uldTypeULDL');
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function setItemsToView() {



    console.log('show data: ', window.localStorage.getItem('FlightPrefix'));
    if ($('#txtFlightPrefix').val() == "" || $('#txtFlightNo').val() == "") {
        errmsg = "Please enter valid Flight No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtFlightDate').val() == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }


    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();
    // var OffPoint = $('#ddlOffPoint').val();
    var OffPoint = this.OffPoint1;
    var FlightSeqNo = this.FlightSeqNo;


    window.localStorage.setItem('FlightPrefix', FlightPrefix);
    window.localStorage.setItem('FlightNo', FlightNo);
    window.localStorage.setItem('FlightDate', FlightDate);
    window.localStorage.setItem('OffPoint', OffPoint);
    window.localStorage.setItem('FlightSeqNo', FlightSeqNo);


    amplify.store("flightSeqNo", FlightSeqNo);
    amplify.store("flightPrefix", FlightPrefix);
    amplify.store("flightNo", FlightNo);
    //amplify.store("flightDisplayDate", flightDate)
    amplify.store("flightDate", $("#txtFlightDate").val());

    location.href = "EXP_ViewClosedUB.html";


}

function GetULDs(offPonit) {

    $('#ddlULD').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlULD');

    $('#ddlBulk').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlBulk');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();

    var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint>' + offPonit + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetExportFlightDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table3').each(function (index) {

                    var ULDId;
                    var ULDNo;

                    ULDId = $(this).find('ULD_SEQUENCE_NUMBER').text();
                    ULDNo = $(this).find('ULDBULKNO').text();

                    var newOption = $('<option></option>');
                    newOption.val(ULDId).text(ULDNo);

                    newOption.appendTo('#ddlULD');

                });

                $(xmlDoc).find('Table5').each(function (index) {

                    var TrolleyId;
                    var TrolleyNo;

                    TrolleyId = $(this).find('TrolleySeqNo').text();
                    TrolleyNo = $(this).find('TrolleyNo').text();

                    var newOption = $('<option></option>');
                    newOption.val(TrolleyId).text(TrolleyNo);
                    newOption.appendTo('#ddlBulk');
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}



function AddULD() {

    if ($('#txtFlightPrefix').val() == "" || $('#txtFlightNo').val() == "") {
        errmsg = "Please enter valid Flight No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtFlightDate').val() == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }

    if (document.getElementById('rdoULD').checked) {
        if ($('#txtULDType').val() == "" || $('#txtULDNumber').val() == "") {
            errmsg = "Please enter ULD Type and No.";
            $.alert(errmsg);
            return;
        }
        if ($('#txtOwner').val() == "") {
            errmsg = "Please enter ULD Owner";
            $.alert(errmsg);
            return;
        }
        if ($("#uldTypeULDL").val() == "-1") {
            $.alert("Please select ULD Position.");
            return;
        }

    }
    if (document.getElementById('rdoBulk').checked) {
        if ($('#txtBulkType').val() == "" || $('#txtBulkNumber').val() == "") {
            errmsg = "Please enter Bulk Type and No.";
            $.alert(errmsg);
            return;
        }
    }

    // Validation for InputField's when Stack(RDO) is selected.
    if (document.getElementById('rdoStack').checked) {
        if ($('#txtULDType').val() == "" || $('#txtULDNumber').val() == "") {
            errmsg = "Please enter ULD Type and No.";
            $.alert(errmsg);
            return;
        }
        if ($('#txtOwner').val() == "") {
            errmsg = "Please enter ULD Owner";
            $.alert(errmsg);
            return;
        }
        //validation for ULD Condition Code
        if ($('#txtULDConditionCode').val() == "") {
            errmsg = "Please enter ULD Condition Code";
            $.alert(errmsg);
            return;
        }
    }

    if ($('#ddlOffPoint').find('option:selected').text() == "Select" || $('#ddlOffPoint').find('option:selected').text() == "") {
        errmsg = "No offpoint selected";
        $.alert(errmsg);
        return;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '';
    var servicename;

    if (document.getElementById('rdoULD').checked) {

        inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDType>' + $('#txtULDType').val().toUpperCase() + '</ULDType><ULDNo>' + $('#txtULDNumber').val() + '</ULDNo><ULDOwner>' + $('#txtOwner').val().toUpperCase() + '</ULDOwner><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><ULDSpecification>' + $("#uldTypeULDL").val() + '</ULDSpecification></Root>';
        servicename = 'UnitizationSaveULDDetails';
        $('#link').hide();
    }
    if (document.getElementById('rdoBulk').checked) {

        inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDType>' + $('#txtBulkType').val().toUpperCase() + '</ULDType><ULDNo>' + $('#txtBulkNumber').val() + '</ULDNo><ULDOwner></ULDOwner><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>'
        servicename = 'UnitizationSaveTrolleyDetails ';
    }
    //write xml for stacking pallet on base pallet
    if (document.getElementById('rdoStack').checked) {
        inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDType>' + $('#txtULDType').val().toUpperCase() + '</ULDType><ULDNo>' + $('#txtULDNumber').val() + '</ULDNo><ULDOwner>' + $('#txtOwner').val().toUpperCase() + '</ULDOwner><BasePalletSqNo>' + selectedULDSeqNo + '</BasePalletSqNo><ConCode>' + $('#txtULDConditionCode').val().toUpperCase() + '</ConCode><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';
        servicename = 'UnitizationSavePalletDetails';
        // var BasePalletSeqNum = window.localStorage.getItem("ULDSeqNo");
        // CheckBasePallet(BasePalletSeqNum);
        // GetPallets(selectedULDSeqNo);
    }




    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + servicename,
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    if (index == 0) {
                        $.alert($(this).find('Column2').text());
                    }
                });
                if (document.getElementById('rdoULD').checked) {
                    GetULDs($('#ddlOffPoint').find('option:selected').text());
                }
                if (document.getElementById('rdoBulk').checked) {
                    GetULDs($('#ddlOffPoint').find('option:selected').text());
                }
                if (document.getElementById('rdoStack').checked) {
                    callGetPallet();
                }
                $("#uldTypeULDL").val('-1');
                $('#txtULDType').val('');
                $('#txtULDNumber').val('');
                $('#txtOwner').val('');
                $('#txtULDConditionCode').val('');
                $('#txtBulkType').val('');
                $('#txtBulkNumber').val('');
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function CloseULD() {

    if (document.getElementById('rdoBulk').checked) {
        CloseBulk();
        return;
    }

    if (document.getElementById('rdoULD').checked) {
        if ($('#txtFlightPrefix').val() == "" || $('#txtFlightNo').val() == "") {
            errmsg = "Please enter valid Flight No.";
            $.alert(errmsg);
            return;
        }
    }


    if ($('#txtFlightDate').val() == "") {
        errmsg = "Please enter Flight Date";
        $.alert(errmsg);
        return;
    }

    //if ($('#txtOwner').val() == "") {
    //    errmsg = "Please enter ULD Owner";
    //    $.alert(errmsg);
    //    return;
    //}

    if ($('#ddlOffPoint').find('option:selected').text() == "Select" || $('#ddlOffPoint').find('option:selected').text() == "") {
        errmsg = "No offpoint selected";
        $.alert(errmsg);
        return;
    }

    if ($('#ddlULD').find('option:selected').text() == "Select" || $('#ddlULD').find('option:selected').text() == "") {
        errmsg = "Please select ULD";
        $.alert(errmsg);
        return;
    }

    var uldType = $('#ddlULD').find('option:selected').text().substring(0, 3);
    var tempSTR = $('#ddlULD').find('option:selected').text().substring(3);
    var uldOwner = tempSTR.substring(tempSTR.length - 2)
    var uldNumber = (tempSTR.slice(0, -2)).trim();

    var contourCode;
    if ($('#ddlContour').find('option:selected').val() == 'Select')
        contourCode = '';
    else
        contourCode = $('#ddlContour').find('option:selected').val();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    manpower = $("#txtULDManpower").val();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "EXPULDClose",
            data: JSON.stringify({
                'ULDType': uldType, 'ULDNo': uldNumber, 'ULDOwner': uldOwner.toUpperCase(),
                'ULDSequenceNo': $('#ddlULD').find('option:selected').val(), 'AirportCity': AirportCity, 'ScaleWeight': $('#txtGrossWt').val(),
                'ContourCode': contourCode, 'CompanyCode': window.localStorage.getItem("companyCode"), 'strUserID': window.localStorage.getItem("UserID"),
                'FlightSeqNumber': FlightSeqNo, 'routepoint': $('#ddlOffPoint').find('option:selected').text(), "ULDManpower": manpower,
               
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    $.alert($(this).find('StrMessage').text());
                });

                GetOffPointForFlight();

                $('#txtGrossWt').val('');
                //  $("#txtULDManpower").val('');
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function CloseBulk() {

    if ($('#ddlBulk').find('option:selected').text() == "Select" || $('#ddlBulk').find('option:selected').text() == "") {
        errmsg = "Please select Bulk";
        $.alert(errmsg);
        return;
    }


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "EXPTrolleyClose",
            data: JSON.stringify({
                'ULDSequenceNo': $('#ddlBulk').find('option:selected').val(), 'AirportCity': AirportCity, 'ScaleWeight': $('#txtGrossWt').val(),
                'CompanyCode': window.localStorage.getItem("companyCode"), 'strUserID': window.localStorage.getItem("UserID"),
                'FlightSeqNumber': FlightSeqNo, 'routepoint': $('#ddlOffPoint').find('option:selected').text(),
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {

                $('#txtGrossWt').val('');

                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    $.alert($(this).find('StrMessage').text());
                });

                GetOffPointForFlight();

                $('#txtGrossWt').val('');
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function SaveDateTimeForULD() {

    if ($('#ddlOffPoint').find('option:selected').text() == "Select") {
        errmsg = "Please select ULD";
        $.alert(errmsg);
        return;
    }

    if ($('#txtStartDateTime').val() == "" || $('#txtStartTimeFrom').val() == "" || $('#txtStartTimeTo').val() == "") {
        errmsg = "Please enter Start Date/hh/mm.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtEndDateTime').val() == "" || $('#txtEndTimeFrom').val() == "" || $('#txtEndTimeTo').val() == "") {
        errmsg = "Please enter End Date/hh/mm.";
        $.alert(errmsg);
        return;
    }

    if ((new Date($('#txtStartDateTime').val()).getTime() > new Date($('#txtEndDateTime').val()).getTime())) {
        errmsg = "End date cannot be less start date.";
        $.alert(errmsg);
        return;
    }

    if ((new Date($('#txtStartDateTime').val()).getTime() == new Date($('#txtEndDateTime').val()).getTime())) {
        if (Number($('#txtStartTimeFrom').val()) > Number($('#txtEndTimeFrom').val())) {
            errmsg = "End time cannot be less start time.";
            $.alert(errmsg);
            return;
        }
    }

    if ($('#txtStartDateTime').val().length > 0) {
        var formattedDate = new Date($('#txtStartDateTime').val());
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();

        var StartDate = m + "/" + d + "/" + y;
    }

    if ($('#txtEndDateTime').val().length > 0) {
        var formattedDate = new Date($('#txtEndDateTime').val());
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();

        var EndDate = m + "/" + d + "/" + y;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULD').find('option:selected').val() + '</ULDSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><BuiltUpStart>' + StartDate + '</BuiltUpStart><BuiltUpStartTime>' + $('#txtStartTimeFrom').val() + ':' + $('#txtStartTimeTo').val() + '</BuiltUpStartTime><BuiltUpEnd>' + EndDate + '</BuiltUpEnd><BuiltUpEndTime>' + $('#txtEndTimeFrom').val() + ':' + $('#txtEndTimeTo').val() + '</BuiltUpEndTime><UserId>' + UserId + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "UnitizationBuiltUpULD",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    $.alert($(this).find('StrMessage').text());
                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function ShowAddAWBGrid() {

    if (document.getElementById('rdoULD').checked) {
        if ($('#ddlULD').find('option:selected').text() == 'Select') {
            errmsg = "Please select ULD";
            $.alert(errmsg);
            return false;
        }
        $('#txtULDNo').val($('#ddlULD').find('option:selected').text());
    }

    if (document.getElementById('rdoBulk').checked) {
        if ($('#ddlBulk').find('option:selected').text() == 'Select') {
            errmsg = "Please select Bulk";
            $.alert(errmsg);
            return;
        }
        $('#txtULDNo').val($('#ddlBulk').find('option:selected').text());
    }

    $('#txtFlightPrefix').attr("disabled", "disabled");
    $('#txtFlightNo').attr("disabled", "disabled");
    $('#txtFlightDate').attr("disabled", "disabled");
    $('#ddlOffPoint').attr("disabled", "disabled");
    $('#btnGet').attr("disabled", "disabled");

    //$('#txtULDNo').val($('#ddlULD').find('option:selected').text());
    $("#divULDDetails").hide();
    $("#divAddAWBDetails").show();

}

function ShowULDGrid() {
    $('#txtFlightPrefix').removeAttr("disabled");
    $('#txtFlightNo').removeAttr("disabled");
    $('#txtFlightDate').removeAttr("disabled");
    $('#ddlOffPoint').removeAttr("disabled");
    $('#btnGet').removeAttr("disabled");

    $("#divAddAWBDetails").hide();
    $("#divULDDetails").show();

    $('#txtAWBPrefix').val('');
    $('#txtAWBNo').val('');
    $('#ddlShipmentNo').empty();
    $('#txtPackages').val('');

    $('#txtUnitizedPkgs').val('');
    $('#txtTotalPkgs').val('');

    $('#txtWeight').val('');
    $('#txtVolume').val('');

    $('#divAddTestLocation').empty();
    html = '';
}

function GetShipmentInfoForAWB() {

    var MAWBPrefix = $('#txtAWBNo').val().substr(0, 3);
    var MAWBNo = $('#txtAWBNo').val().substr(3, 11);

    if (MAWBNo == '') {
        return;
    }

    if (MAWBNo.length != '8') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    $('#txtPackages').val('');
    $('#txtWeight').val('');
    $('#txtVolume').val('');
    $('#txtUnitizedPkgs').val('');
    $('#txtTotalPkgs').val('');
    $('#ddlShipmentNo').empty();

    totalPkgs = '';
    totalWeight = '';
    totalVol = '';

    prorataWtParam = '';
    prorataVolParam = '';

    var getULDNo;

    if (MAWBNo == '')
        return;

    if (MAWBNo != '') {
        if (MAWBPrefix.length != '3' || MAWBNo.length != '8') {
            errmsg = "Please enter valid AWB No.";
            $.alert(errmsg);
            return;
        }
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><flightSeqNo>' + FlightSeqNo + '</flightSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><AWBPrefix>' + MAWBPrefix + '</AWBPrefix><AWBNo>' + MAWBNo + '</AWBNo></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            //url: GHAExportFlightserviceURL + "UnitizationPendingAWBDetails",
            url: GHAExportFlightserviceURL + "UnitizationPendingAWBDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                responsee = response.d;

                strShipmentInfo = responsee;

                var xmlDoc = $.parseXML(responsee);

                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('Status').text() != 'S') {
                        $.alert($(this).find('StrMessage').text());
                        return;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {

                    var newOption = $('<option></option>');
                    newOption.val($(this).find('EXPSHIPROWID').text()).text($(this).find('RNo').text());
                    newOption.appendTo('#ddlShipmentNo');

                    if (index == 0) {
                        //$('#txtPackages').val($(this).find('NOP').text());
                        //$('#txtWeight').val($(this).find('WEIGHT_KG').text());
                        //$('#txtVolume').val($(this).find('VOLUME').text());

                        $('#txtUnitizedPkgs').val($(this).find('ManNOP').text());
                        $('#txtTotalPkgs').val($(this).find('NOP').text());

                        totalPkgs = $(this).find('NOP').text();
                        totalWeight = $(this).find('ManWt').text();
                        //totalVol = $(this).find('VOLUME').text();

                        prorataWtParam = Number(totalWeight) / Number(totalPkgs);
                        //prorataVolParam = Number(totalVol) / Number(totalPkgs);
                    }
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function ChangeEWRInfo(selectedShpmnt) {

    var xmlDoc = $.parseXML(strShipmentInfo);

    $(xmlDoc).find('Table1').each(function (index) {

        if ($(this).find('RNo').text() == selectedShpmnt) {
            $('#txtUnitizedPkgs').val($(this).find('ManNOP').text());
            $('#txtTotalPkgs').val($(this).find('NOP').text());

            totalPkgs = $(this).find('NOP').text();
            totalWeight = $(this).find('ManWt').text();
            //totalVol = $(this).find('VOLUME').text();

            prorataWtParam = Number(totalWeight) / Number(totalPkgs);
        }
    });

}

function CalculateProrataWtVol() {

    var newWt = Number($('#txtPackages').val()) * prorataWtParam;
    var newVol = Number($('#txtPackages').val()) * prorataVolParam;

    $('#txtWeight').val(newWt.toFixed(3));
    $('#txtVolume').val(newVol.toFixed(3));
}

function SaveAWBforULDDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var AWBPrefix = $('#txtAWBPrefix').val();
    var AWBNo = $('#txtAWBNo').val();

    if (AWBNo == '') {
        errmsg = "Please enter AWB No.";
        $.alert(errmsg);
        return;
    }

    if (AWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    var ShipmentNo = $('#ddlShipmentNo').find('option:selected').text();
    var Packages = $('#txtPackages').val();
    var GrossWt = $('#txtWeight').val();
    var GrossWtUnit = $('#ddlGrossWtUnit').find('option:selected').text();
    var Volume = $('#txtVolume').val();
    var ULDNo;
    var Type;

    if (document.getElementById('rdoULD').checked) {
        Type = 'U';
        ULDNo = $('#ddlULD').find('option:selected').val();
    }
    if (document.getElementById('rdoBulk').checked) {
        Type = 'T';
        ULDNo = $('#ddlBulk').find('option:selected').val();
    }

    if (AWBNo == "" || Packages == "" || GrossWt == "") {

        errmsg = "Please enter all the required fields.</br>";
        $.alert(errmsg);
        return;

    }

    if (Packages == Number(0)) {

        errmsg = "Packages cannot be 0.</br>";
        $.alert(errmsg);
        return;

    }

    if (ShipmentNo == "Select" || ShipmentNo == "") {

        errmsg = "Shipment number not found</br>";
        $.alert(errmsg);
        return;

    }

    if ($('#txtFlightDate').val().length > 0) {
        var formattedDate = new Date($('#txtFlightDate').val());
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();

        var flightDate = m + "/" + d + "/" + y;
    }

    var inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDSeqNo>' + ULDNo + '</ULDSeqNo><Type>' + Type + '</Type><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserID>' + window.localStorage.getItem("UserID") + '</UserID><ULDType></ULDType><ULDNumber></ULDNumber><ULDOwner></ULDOwner><AWBId>-1</AWBId><ShipmentId>' + $('#ddlShipmentNo').find('option:selected').val() + '</ShipmentId><AWBNo>' + AWBNo + '</AWBNo><NOP>' + Packages + '</NOP><Weight>-1</Weight><Volume>-1</Volume></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "UnitizeAWB",
            //data: JSON.stringify({
            //    'strFlightNo': $('#txtFlightPrefix').val() + $('#txtFlightNo').val(), 'strFlightDate': flightDate, 'strULDNo': ULDNo,
            //    'strAWBNo': AWBNo, 'strShipmentNo': ShipmentNo, 'strPkgs': Packages,
            //    'strGrossWt': GrossWt, 'strWtUnit': GrossWtUnit, 'strVolume': Volume,
            //    'strAirportCity': AirportCity, 'strUserID': window.localStorage.getItem("UserID"), 'CompanyCode': window.localStorage.getItem("companyCode"), 'OffPoint': $('#ddlOffPoint').find('option:selected').text(), 'Type': Type,
            //}),
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    var status = $(this).find('Status').text();

                    if (status != 'E') {
                        $('#txtAWBPrefix').val('');
                        $('#txtAWBNo').val('');
                        $('#txtUnitizedPkgs').val('');
                        $('#txtTotalPkgs').val('');
                        $('#txtPackages').val('');
                        $('#ddlShipmentNo').empty();

                    }

                    //if (confirm($(this).find('StrMessage').text())) {
                    //    $('#txtAWBNo').focus();
                    //}

                    if (!alert($(this).find('StrMessage').text())) {
                        $('#txtAWBNo').focus();
                    }



                });

                //GetShipmentInfoForAWB($('#txtAWBNo').val());


                //$('#txtVolume').val('');
                //window.location.reload();

                GetAWBDetailsForULD();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function GetAWBDetailsForULD() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (document.getElementById('rdoULD').checked) {
        if ($('#ddlULD').find('option:selected').text() == 'Select') {
            return false;
        }
    }

    if (document.getElementById('rdoBulk').checked) {
        if ($('#ddlBulk').find('option:selected').text() == 'Select') {
            return false;
        }
    }

    var ULDid;
    var type;

    if (document.getElementById('rdoULD').checked) {
        ULDid = $("#ddlULD option:selected").val();
        type = 'U';
    }

    if (document.getElementById('rdoBulk').checked) {
        ULDid = $("#ddlBulk option:selected").val();
        type = 'T';
    }



    //SelectedHawbId = $("#ddlHAWB option:selected").val();      

    //var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + HAWBNo + '</HouseNo><IGMNo>' + IgmVal + '</IGMNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDSeqNo>' + ULDid + '</ULDSeqNo><Type>' + type + '</Type><Offpoint>' + $("#ddlOffPoint option:selected").text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetUnitizedShipmentDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                var totalPkgs;

                strXmlStore = str;

                if (str != null && str != "") {

                    $('#divAddTestLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>AWB</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Packages</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

                        //var outMsg = $(this).find('Status').text();

                        //if (outMsg == 'E') {
                        //    $.alert($(this).find('StrMessage').text());
                        //    return;
                        //}

                        var Awb;
                        var Pkgs;

                        Awb = $(this).find('AWBNo').text().toUpperCase();
                        Pkgs = $(this).find('NOP').text();

                        AddTableLocation(Awb, Pkgs);

                    });

                    $(xmlDoc).find('Table2').each(function (index) {

                        totalPkgs = $(this).find('NOP').text();

                        html += "<tr>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>TOTAL</td>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>" + totalPkgs + "</td>";
                        html += "</tr>";


                    });

                    html += "</tbody></table>";

                    if (totalPkgs > Number(0))
                        $('#divAddTestLocation').append(html);
                    else {
                        $('#divAddTestLocation').empty();
                        html = '';
                    }
                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function AddTableLocation(AWB, Pkgs) {

    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + AWB + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + Pkgs + "</td>";
    html += "</tr>";

}

function clearAllULDDetails() {
    $("#uldTypeULDL").val('-1');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $('#ddlOffPoint').empty();
    $('#txtULDType').val('');
    $('#txtULDNumber').val('');
    $('#txtOwner').val('');
    $('#txtULDConditionCode').val('');
    $('#ddlULD').empty();
    $('#ddlBulk').empty();
    $('#txtStartDateTime').val('');
    $('#txtStartTimeFrom').val('');
    $('#txtStartTimeTo').val('');
    $('#txtEndDateTime').val('');
    $('#txtEndTimeFrom').val('');
    $('#txtEndTimeTo').val('');
    $('#txtBulkType').val('');
    $('#txtBulkNumber').val('');
    $('#txtGrossWt').val('');
    $('#txtFlightPrefix').focus();
    $("#rdoULD").prop("checked", true);
    $('#rdoStack').attr('disabled', true);
    $("#txtULDConditionCode").prop('disabled', true);
    $("#txtULDConditionCode").css('background-color', '#eee');
    $('#link').hide();
}

function clearAWBDetails() {

    //$('#txtULDNo').val('');
    $('#txtAWBPrefix').val('');
    $('#txtAWBNo').val('');
    $('#ddlShipmentNo').empty();
    $('#txtPackages').val('');
    $('#txtUnitizedPkgs').val('');
    $('#txtTotalPkgs').val('');
    $('#txtAWBNo').focus();
    //$('#txtTotalPkgs').val('');


}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function alertDismissed() {
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
    var InputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId><Manpower>' + $("#txtFlightManpower").val() + '</Manpower></Root>';
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: GHAExportFlightserviceURL + "/UnitizationSaveFlightManDetails",
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

                GetOffPointForFlight();

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