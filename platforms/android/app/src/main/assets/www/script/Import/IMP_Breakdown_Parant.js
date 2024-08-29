//document.addEventListener("deviceready", GetCommodityList, false);

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
var html;
var flightSeqNo;
var flightPrefix;
var flightNo;
var flightDate;
var flightULDId;
var flagRdoAll = 'A';
var strXmlStore;
var _flightPrefix = '';
var _flightNo = '';
var _flightDate = '';
$(function () {
   
    //var formattedDate = new Date();
    //var d = formattedDate.getDate();
    //if (d.toString().length < Number(2))
    //    d = '0' + d;
    //var m = formattedDate.getMonth();
    //m += 1;  // JavaScript months are 0-11
    //if (m.toString().length < Number(2))
    //    m = '0' + m;
    //var y = formattedDate.getFullYear();
    //var t = formattedDate.getTime();
    //var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    //newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    //$('#txtFlightDate').val(newDate);

    if (window.localStorage.getItem("RoleIMPFlightCheck") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var date = y.toString() + '-' + m.toString() + '-' + d.toString();


    // $('#txtFlightDate').val(date);





    //var now = new Date();

    //var day = ("0" + now.getDate()).slice(-2);
    //var month = ("0" + (now.getMonth() + 1)).slice(-2);

    //var today = now.getFullYear() + "-" + (month) + "-" + (day);

    //$('#txtFlightDate').val(today);

    _flightPrefix = amplify.store("flightPrefix");
    _flightNo = amplify.store("flightNo");
    _flightDate = amplify.store("flightDate");

    $('#txtIGMYear').val(y);

    if ((_flightPrefix != undefined && _flightPrefix != '') && (_flightNo != undefined && _flightNo != '') && (_flightDate != undefined && _flightDate != '')) {
        $("#txtFlightPrefix").val(amplify.store("flightPrefix"));
        $("#txtFlightNo").val(amplify.store("flightNo"));
        $("#txtFlightDate").val(amplify.store("flightDate"));

        GetFlightDetails();

        amplify.store("flightSeqNo", "")
        amplify.store("flightPrefix", "")
        amplify.store("flightNo", "")
        amplify.store("flightDate", "")
        amplify.store("flightDisplayDate", "")

    }

    amplify.store("selectedRowULDNo", "")
    amplify.store("selectedRowAWBNo", "")
    amplify.store("selectedRowHAWBNo", "")
    amplify.store("selectedRowULDid", "")


    //$("#rdoAll").click(function () {
    //    flagRdoAll = 'A';
    //    ViewFlightRelatedDetails();
    //});

    //$("#rdoShortUnscanned").click(function () {
    //    flagRdoAll = 'S';
    //    ViewFlightRelatedDetails();
    //});

    setDate();
});

function NexttoULDDetails() {

    //if ($('#txtFlightATAdate').val() == '' || $('#txtFlightATAhh').val() == '' || $('#txtFlightATAmm').val() == '') {
    //    errmsg = "Please enter valid ATA date and time";
    //    $.alert(errmsg);
    //    return;
    //}

    //if (Number($('#txtFlightATAhh').val()) > Number(23) || Number($('#txtFlightATAmm').val()) > Number(59)) {
    //    errmsg = "Please enter valid ATA time";
    //    $.alert(errmsg);
    //    return;
    //}

    //SaveATA();

    // set urs global variable here
    amplify.store("flightSeqNo", flightSeqNo)
    amplify.store("flightPrefix", flightPrefix)
    amplify.store("flightNo", flightNo)
    amplify.store("flightDisplayDate", flightDate)
    amplify.store("flightDate", $("#txtFlightDate").val())
    window.location.href = 'IMP_Breakdown_Child.html';
}

function setDate() {
 
    $("#txtFlightDate").val(moment(new Date()).format("YYYY-MM-DD"))
}


function checkDisabled() {

    var IGMNo = $('#txtIGMNo').val();
    var IGMYear = $("#txtIGMYear").val();
    var FlightPrefix = $("#txtFlightPrefix").val();
    var FlightNo = $("#txtFlightNo").val();
    var FlightDate;
    if (IGMNo == "" || IGMYear == "") {
        if (FlightPrefix == "" || FlightNo == "" || $('#txtFlightDate').val() == "") {

            errmsg = "Please enter IGM No. & IGM Yr. or </br> Flight No. & Flight Date</br>";
            $.alert(errmsg);

            //$("#btnGetDetail").attr('disabled', 'disabled');
            //$("#btnView").attr('disabled', 'disabled');

            return;
        } else {
            //$("#btnGetDetail").removeAttr('disabled');
            //$("#btnView").removeAttr('disabled');
        }

        if (IGMYear != "") {
            if (IGMYear.length < Number(4)) {
                errmsg = "Please enter valid IGM year";
                $.alert(errmsg);
                return;
            }
        }
    } else {
        //$("#btnGetDetail").removeAttr('disabled');
        //$("#btnView").removeAttr('disabled');
    }
}


function GetFlightDetails() {

    $('#divMainDetails').show();
    $('#divFlightInfo').hide();
    $('#divFlightInfo').empty();
    html = '';

    var inputxml = "";
    var IGMNo = $('#txtIGMNo').val();
    var IGMYear = $("#txtIGMYear").val();
    var FlightPrefix = $("#txtFlightPrefix").val();
    var FlightNo = $("#txtFlightNo").val();

    //var date = $('#txtFlightDate').val();
    //var newdate = date.split("-").reverse().join("-");
    //var FlightDate = newdate;

    var FlightDate = $('#txtFlightDate').val();// $("#year").val() + '-' + $("#month").val() + '-' + $("#day").val();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if (IGMNo == "" || IGMYear == "") {
        if (FlightPrefix == "" || FlightNo == "" || $('#txtFlightDate').val() == "") {

            errmsg = "Please enter IGM No. & IGM Yr. or </br> Flight No. & Flight Date</br>";
            $.alert(errmsg);

            //  $("#btnGetDetail").attr('disabled', 'disabled');
            // $("#btnView").attr('disabled', 'disabled');

            return;
        } else {
            //  $("#btnGetDetail").removeAttr('disabled');
            //  $("#btnView").removeAttr('disabled');
        }

        if (IGMYear != "") {
            if (IGMYear.length < Number(4)) {
                errmsg = "Please enter valid IGM year";
                $.alert(errmsg);
                return;
            }
        }
    } else {
        //$("#btnGetDetail").removeAttr('disabled');
        //$("#btnView").removeAttr('disabled');
    }

    //if ($('#txtFlightDate').val().length > 0) {
    //    var formattedDate = new Date($('#txtFlightDate').val());
    //    var d = formattedDate.getDate();
    //    if (d.toString().length < Number(2))
    //        d = '0' + d;
    //    var m = formattedDate.getMonth();
    //    m += 1;  // JavaScript months are 0-11
    //    if (m.toString().length < Number(2))
    //        m = '0' + m;
    //    var y = formattedDate.getFullYear();

    //    FlightDate = m + "/" + d + "/" + y;
    //}

    if (IGMNo != "" && IGMYear != "") {
        inputxml = '<Root><IGMNO>' + IGMNo + '</IGMNO><IGMYear>' + IGMYear + '</IGMYear><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><AirportCity>' + SHED_AIRPORT_CITY + '</AirportCity></Root>';
    }

    else if (FlightPrefix != "" && FlightNo != "" && $("#txtFlightDate").val() != "") {
        inputxml = '<Root><IGMNO></IGMNO><IGMYear></IGMYear><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><AirportCity>' + SHED_AIRPORT_CITY + '</AirportCity></Root>';
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: ACSServiceURL + "/GetImportFlightDetails",
            data: JSON.stringify({
                'InputXML': inputxml,
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
                var str = response.d

                clearBeforePopulate();
                var xmlDoc = $.parseXML(str);
                console.log(xmlDoc)
                $(xmlDoc).find('Table1').each(function (index) {
                    if (index == 0) {
                        flightSeqNo = $(this).find('FlightSeqNo').text();

                        if (flightSeqNo == 0) {
                            // $.alert('Flight not found!');
                            $('#lblFlightStatusError').text('Flight not found!').css('color', 'red');
                            return;
                        }
                        else
                            $("#btnNext").removeAttr("disabled").css('background-color','#3c7cd3');
                        $('#lblFlightStatusError').text('');

                        $('#txtIGMNo').val($(this).find('CustomRef').text());
                        flightPrefix = $(this).find('FlightAirline').text();
                        flightNo = $(this).find('FlightNo').text();
                        flightDate = $(this).find('DisplaySTA').text();
                        FlightDate = $(this).find('FlightDate').text();
                        $('#txtFlightPrefix').val($(this).find('FlightAirline').text());
                        $('#txtFlightNo').val($(this).find('FlightNo').text());
                        $('#txtFlightDate').val(FlightDate);

                        //var date = FlightDate;
                        //var newdate = date.split("-").reverse().join("-");

                        //const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        //    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
                        //];

                        //var d = new Date(date);

                        //_Mont = monthNames[d.getMonth()]

                        //DD = FlightDate.split("-")[2];
                        //MM = FlightDate.split("-")[1];
                        //YY = FlightDate.split("-")[0];


                        //var ulddate = DD + '-' + _Mont + '-' + YY;
                        //$('#txtFlightDate').val(ulddate);

                        //var date = $(this).find('FlightDate').text();
                        //var newdate = FlightDate.split("-").reverse().join("-");
                        ////  var FlightDate = newdate;
                        //$('#txtFlightDate').val(FlightDate);
                        //var $datepicker = $(this).find('FlightDate').text();
                        //$datepicker.datepicker();
                        //$datepicker.datepicker(
                        //    'setDate', new Date()
                        //    );



                        //YY = FlightDate.split("-")[0];
                        //MM = FlightDate.split("-")[1];
                        //DD = FlightDate.split("-")[2];


                        //$("#year").val(YY);
                        //$("#month").val(MM);
                        //$("#day").val(DD);





                        //fData = flightDate.replace(/[^A-Z0-9]/ig, "-");

                        //$('#txtFlightDate').val(fData);

                        $('#txtTotCnts').val($(this).find('AWBCount').text());
                        $('#txtManiPieces').val($(this).find('NPX').text());
                        $('#txtReceivePieces').val($(this).find('NPR').text());
                        $('#txtManiGrWt').val(Number($(this).find('WeightExp').text()).toFixed(3));
                        $('#txtReceiveGrWt').val(Number($(this).find('WeightRec').text()).toFixed(3));
                        $('#txtShortPieces').val($(this).find('ShortLanded').text());
                        $('#txtExcessPieces').val($(this).find('ExcessLanded').text());
                        $('#txtDamagePieces').val($(this).find('DamagePkgs').text());


                        if ($(this).find('FlightStatus').text() == 'Arrived') {
                            $('#lblFlightStatus').text('Flight Status:' + ' ' + $(this).find('FlightStatus').text());
                            $('#lblFlightStatusError').text('');
                        } else {
                            $('#lblFlightStatusError').text('Flight Status:' + ' ' + $(this).find('FlightStatus').text());
                            $('#lblFlightStatus').text('');
                        }


                        var statusNext = $(this).find('IsNext').text();
                        if (statusNext == 'Y')
                            $("#btnNext").removeAttr("disabled").css('background-color', '#3c7cd3');
                        else
                            $("#btnNext").attr("disabled", "disabled").css('background-color', '#ccc');

                    }
                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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

function ViewFlightRelatedDetails() {



    var inputxml = "";
    var IGMNo = $('#txtIGMNo').val();
    var IGMYear = $("#txtIGMYear").val();
    var FlightPrefix = $("#txtFlightPrefix").val();
    var FlightNo = $("#txtFlightNo").val();
    var FlightDate = $('#txtFlightDate').val();// $("#year").val() + '-' + $("#month").val() + '-' + $("#day").val();
    var FlightArrived;

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if (IGMNo == "" || IGMYear == "") {
        if (FlightPrefix == "" || FlightNo == "" || $('#txtFlightDate').val() == "") {
            errmsg = "Please enter IGM No. & IGM Yr. or </br> Flight No. & Flight Date</br>";
            $.alert(errmsg);
            return;
        }

        if (IGMYear != "") {
            if (IGMYear.length < Number(4)) {
                errmsg = "Please enter valid IGM year";
                $.alert(errmsg);
                return;
            }
        }
    }

    //if ($('#txtFlightDate').val().length > 0) {
    //    var formattedDate = new Date($('#txtFlightDate').val());
    //    var d = formattedDate.getDate();
    //    if (d.toString().length < Number(2))
    //        d = '0' + d;
    //    var m = formattedDate.getMonth();
    //    m += 1;  // JavaScript months are 0-11
    //    if (m.toString().length < Number(2))
    //        m = '0' + m;
    //    var y = formattedDate.getFullYear();

    //    FlightDate = m + "/" + d + "/" + y;
    //}

    $('#divMainDetails').hide();
    $('#divFlightInfo').show();

    if (flagRdoAll == '')
        flagRdoAll = 'A';

    if (IGMNo != "" && IGMYear != "") {
        inputxml = '<Root><IGMNO>' + IGMNo + '</IGMNO><IGMYear>' + IGMYear + '</IGMYear><FlightAirline></FlightAirline><FlightNo></FlightNo><FlightDate></FlightDate><FilterClause>' + flagRdoAll + '</FilterClause><AirportCity>' + AirportCity + '</AirportCity></Root>';
    }

    else if (FlightPrefix != "" && FlightNo != "" && $("#txtFlightDate").val() != "") {
        inputxml = '<Root><IGMNO></IGMNO><IGMYear></IGMYear><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><FilterClause>' + flagRdoAll + '</FilterClause><AirportCity>' + AirportCity + '</AirportCity></Root>';
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: ACSServiceURL + "/GetImportFlightCheckView_V2",
            data: JSON.stringify({ 'InputXML': inputxml }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;

                strXmlStore = str;

                if (str != null && str != "") {

                    $('#divFlightInfo').empty();
                    html = '';

                    html += '<div class="form-group col-xs-12 col-sm-6 col-md-6 NoPadding">'

                    if (flagRdoAll == 'S')
                        html += '<input type="radio" name="radSize" id="rdoAll" value="All"/>'
                    else
                        html += '<input type="radio" name="radSize" id="rdoAll" value="All" checked="checked" />'

                    html += '<label for="sizeLarge">All</label>'
                    html += '<label for="sizeLarge">  </label>'

                    if (flagRdoAll == 'S')
                        html += '<input type="radio" name="radSize" id="rdoShortUnscanned" value="ShortUnscanned" checked="checked"/>'
                    else
                        html += '<input type="radio" name="radSize" id="rdoShortUnscanned" value="ShortUnscanned" />'

                    html += '<label for="sizeSmall">Short/Unscanned</label>'
                    html += '</div>'

                    // html += "<table id='tblNews' border='1' style='width:200%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<table id='tblNews' class='table table-bordered table-striped'>";
                    html += "<thead><tr>";
                    html += "<th  style='background-color:rgb(208, 225, 244);text-align:left;'>ULD No.</th>";
                    html += "<th  style='background-color:rgb(208, 225, 244);text-align:left;'>AWB No.</th>";
                    //html += "<th  style='background-color:rgb(208, 225, 244);text-align:left;'>HAWB No.</th>";
                    html += "<th  style='background-color:rgb(208, 225, 244);text-align:left;'>Total (pcs.)</th>";
                    html += "<th  style='background-color:rgb(208, 225, 244);text-align:left;'>Scanned (pcs.)</th>";
                    html += "<th  style='background-color:rgb(208, 225, 244);text-align:left;'>Damaged (pcs.)</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";






                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table2').each(function (index) {

                        flightSeqNo = $(this).find('FlightSeqNo').text();

                        if (flightSeqNo == 0) {
                            // $.alert('Flight not found!');
                            $('#lblFlightStatusError').text('Flight not found!').css('color', 'red');
                            return;
                        } else {
                            $('#lblFlightStatusError').text('');
                        }

                        $('#txtIGMNo').val($(this).find('IGMNo').text());
                        flightPrefix = $(this).find('FlightAirline').text();
                        flightNo = $(this).find('FlightNo').text();
                        flightDate = $(this).find('DisplaySTA').text();
                        FlightArrived = $(this).find('IsNext').text();
                        $('#txtFlightPrefix').val($(this).find('FlightAirline').text());
                        $('#txtFlightNo').val($(this).find('FlightNo').text());
                        FlightDate = $(this).find('STA').text();
                        // $('#txtFlightDate').val(FlightDate);

                        // sta = $(this).find('STA').text();

                        //YY = FlightDate.split("-")[0];
                        //MM = FlightDate.split("-")[1];
                        //DD = FlightDate.split("-")[2];

                        //$("#year").val(YY);
                        //$("#month").val(MM);
                        //$("#day").val(DD);

                        //var newdate = FlightDate.split("-").reverse().join("-");

                        //$('#txtFlightDate').val(newdate);

                        var date = FlightDate;
                        var newdate = date.split("-").reverse().join("-");

                        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
                        ];

                        var d = new Date(newdate);

                        _Mont = monthNames[d.getMonth()]

                        YY = FlightDate.split("-")[2];
                        MM = FlightDate.split("-")[1];
                        DD = FlightDate.split("-")[0];


                        var ulddate = DD + '-' + _Mont + '-' + YY;
                        $('#txtFlightDate').val(ulddate);

                        $('#lblFlightStatus').text('Flight Status:' + ' ' + $(this).find('Status').text());
                    });

                    $(xmlDoc).find('Table1').each(function (index) {

                        var UldNo;
                        var AwbNo;
                        var HawbNo;
                        var Total;
                        var Scanned;
                        var Damaged;

                        UldNo = $(this).find('ULDNo').text();
                        AwbNo = $(this).find('AWBPrefix').text() + '-' + $(this).find('AWBNo').text();
                        HawbNo = $(this).find('HouseNo').text();
                        Total = $(this).find('NPX').text();
                        Scanned = $(this).find('NPR').text();
                        Damaged = $(this).find('DamageNOP').text();

                        AddTableLocationAWB(UldNo, AwbNo, HawbNo, Total, Scanned, Damaged, FlightArrived);
                    });

                    html += "</tbody></table>";

                    $('#divFlightInfo').append(html);
                    $('#divFlightInfo').show();

                    $("#rdoAll").click(function () {
                        flagRdoAll = 'A';
                        ViewFlightRelatedDetails();
                    });

                    $("#rdoShortUnscanned").click(function () {
                        flagRdoAll = 'S';
                        ViewFlightRelatedDetails();
                    });
                }
                else {
                    errmsg = 'Data not found';
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
}

function AddTableLocationAWB(UldNo, AwbNo, HawbNo, Total, Scanned, Damaged, FlightArrived) {

    if (FlightArrived == 'Y')
        html += "<tr onclick='SelectedFlightInfo(this);'>";
    else
        html += "<tr>";

    html += "<td >" + UldNo + "</td>";

    html += "<td >" + AwbNo + "</td>";

    // html += "<td >" + HawbNo + "</td>";

    html += "<td style='text-align:right;'>" + Total + "</td>";

    html += "<td style='text-align:right;'>" + Scanned + "</td>";

    html += "<td style='text-align:right;'>" + Damaged + "</td>";

    html += "</tr>";
}

function SelectedFlightInfo(a) {


    var xmlDoc = $.parseXML(strXmlStore);

    var selectedRowULDNo;
    var selectedRowAWBNo;
    var selectedRowHAWBNo;
    var selectedRowULDid;

    $(xmlDoc).find('Table1').each(function (index) {

        if (index == a.rowIndex - 1) {
            selectedRowULDNo = $(this).find('ULDNo').text();
            selectedRowAWBNo = $(this).find('AWBPrefix').text() + '-' + $(this).find('AWBNo').text();
            selectedRowHAWBNo = $(this).find('HouseNo').text();
            selectedRowULDid = $(this).find('ULDId').text();

            amplify.store("flightSeqNo", flightSeqNo)
            amplify.store("flightPrefix", flightPrefix)
            amplify.store("flightNo", flightNo)
            amplify.store("flightDisplayDate", flightDate)
            amplify.store("flightDate", $("#txtFlightDate").val())

            amplify.store("selectedRowULDNo", selectedRowULDNo)
            amplify.store("selectedRowAWBNo", selectedRowAWBNo)
            amplify.store("selectedRowHAWBNo", selectedRowHAWBNo)
            amplify.store("selectedRowULDid", selectedRowULDid)

            window.location.href = 'IMP_CheckAWB.html';

        }
    });

}


function clearALL() {

    $('#lblFlightStatusError').text('');
    $('#txtIGMNo').val('');
    //$('#txtIGMYear').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    // $('#txtFlightDate').val('');
    //var formattedDate = new Date();
    //var d = formattedDate.getDate();
    //if (d.toString().length < Number(2))
    //    d = '0' + d;
    //var m = formattedDate.getMonth();
    //m += 1;  // JavaScript months are 0-11
    //if (m.toString().length < Number(2))
    //    m = '0' + m;
    //var y = formattedDate.getFullYear();
    //var date = y.toString() + '-' + m.toString() + '-' + d.toString();


    //$('#txtFlightDate').val(date);


    let date = new Date();
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    var today = day + '-' + month + '-' + year;
    $('#txtFlightDate').val(today);

    $("#txtFlightDate").datepicker({
        shortYearCutoff: 1,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy'
    });

    $('#txtTotCnts').val('');
    $('#txtManiPieces').val('');
    $('#txtReceivePieces').val('');
    $('#txtManiGrWt').val('');
    $('#txtReceiveGrWt').val('');
    $('#txtShortPieces').val('');
    $('#txtExcessPieces').val('');
    $('#txtDamagePieces').val('');
    $("#btnNext").attr("disabled", "disabled").css('background-color', '#ccc');
    $('#lblFlightStatus').text('');
    $('#txtIGMNo').focus();

    $('#divMainDetails').show();
    $('#divFlightInfo').hide();
    $('#divFlightInfo').empty();
    html = '';
    flagRdoAll = 'A';
}

function clearBeforePopulate() {
    //$('#txtIGMNo').val('');
    //$('#txtIGMYear').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $('#txtTotCnts').val('');
    $('#txtManiPieces').val('');
    $('#txtReceivePieces').val('');
    $('#txtManiGrWt').val('');
    $('#txtReceiveGrWt').val('');
    $('#txtShortPieces').val('');
    $('#txtExcessPieces').val('');
    $('#txtDamagePieces').val('');
    $("#btnNext").attr("disabled", "disabled").css('background-color', '#ccc');
    $('#divMainDetails').show();
    $('#divFlightInfo').hide();
    $('#divFlightInfo').empty();
    html = '';
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}


//function GetCommodityList() {
//    $.ajax({
//        type: 'POST',
//        url: WebServiceUrl + "GetCommodityList",//113.193.225.52:8080
//        data: JSON.stringify({}),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//            var str = response.d;
//            if (str == "<NewDataSet />") {
//                alert("Please enter valid credentials");
//            }
//            else {
//                var xmlDoc = $.parseXML(response.d);
//                var xml = $(xmlDoc);
//                var DrpNewsCategory = xml.find("Table");
//                for (var i = 0; i < DrpNewsCategory.length; i++) {
//                    var val = $(DrpNewsCategory[i]).find('SR_NO').text();
//                    var text = $(DrpNewsCategory[i]).find('COMMODITY_TYPE').text();
//                    $('#ddlCommodity').append($('<option></option>').val(val).html(text));
//                }
//            }

//        },
//        error: function (msg) {
//            var r = jQuery.parseJSON(msg.responseText);
//            alert("Message: " + r.Message);
//        }
//    });
//}

