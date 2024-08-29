//document.addEventListener("deviceready", GetCommodityList, false);

var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");

var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
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

var FlightPre = window.localStorage.getItem('FlightPrefix');
var FlightNo = window.localStorage.getItem('FlightNo');
var FlightDate = window.localStorage.getItem('FlightDate');
var OffPoint = window.localStorage.getItem('OffPoint');
FlightSeqNo = window.localStorage.getItem('FlightSeqNo');



$(function () {

    flightPrefix = amplify.store("flightPrefix");
    flightNo = amplify.store("flightNo");
    flightDisplayDate = amplify.store("flightDisplayDate");
    flightDate = amplify.store("flightDate");

    if (window.localStorage.getItem("RoleExpUnitization") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }
    

    console.log('show data: ', FlightSeqNo);
    console.log('show data: ', OffPoint);
    console.log('show data: ', AirportCity);
    document.getElementById('txtFlightPrefix').value = FlightPre;
    document.getElementById('txtFlightNo').value = FlightNo;
    document.getElementById('txtFlightDate').value = FlightDate;
    document.getElementById('txtOffPoint').value = OffPoint;

    GetShipmentStatus();

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
    // $('#txtFlightDate').val(newDate);

    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return date + h + ":" + m;
    // $('#txtGPNo1').val(date);


});

function GetShipmentStatus() {
    
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var AWBNo = $('#txtAWBNo').val();
    // var SBILLNo = $('#txtSBILLNo').val();
    
    // if (AWBNo == '') {
    //     errmsg = "Please enter AWB No.";
    //     $.alert(errmsg);
    //     return;
    // }

    // // if (SBILLNo == '') {
    // //     errmsg = "Please enter SBILL No.";
    // //     $.alert(errmsg);
    // //     return;
    // // }

    // if (AWBNo.length != '11') {
    //     errmsg = "Please enter valid AWB No.";
    //     $.alert(errmsg);
    //     return;
    // }  
    
    var inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><FlightNo>' + FlightNo + '</FlightNo><FlightAirline>'+ FlightPre + '</FlightAirline><FlightDate>' + FlightDate + '</FlightDate><Offpoint>' + OffPoint + '</Offpoint><UserId>' + UserId + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "ViewClosedULD",
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
                debugger
                $("body").mLoading('hide');
                var str = response.d;
                console.log('check response: ', str);
                if (str != null && str != "") {

                    $('#divAddLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='20' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:12px' align='center'font-weight:'bold'>ULD/Trolley No.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:12px' align='center'font-weight:'bold'>AWB Count</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:12px' align='center'font-weight:'bold'>ULD/Trolley Wt.(KG)</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:12px' align='center'font-weight:'bold'>NOP</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:12px' align='center'font-weight:'bold'>Scale Wt.</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

                        // var outMsg = $(this).find('OutMsg').text();

                        // if (outMsg != '') {
                        //     $.alert(outMsg);
                        //     $('#divAddLocation').empty();
                        //     html = '';
                        //     return;
                        // }

                        var ULD;
                        var Awb_Count;
                        var ScaleWt;
                        var weight;
                        var NOP;

                        ULD = $(this).find('ULD').text();
                        Awb_Count = $(this).find('AWB_Count').text();
                        ScaleWt = $(this).find('ScaleWt').text();
                        weight = $(this).find('Weight').text();
                        NOP = $(this).find('NOP').text();

                        console.log('******ULD******', ULD);
                        
                        
                        AddTableLocation(ULD, Awb_Count, ScaleWt, weight, NOP);
                    });

                    html += "</tbody></table>";

                    $('#divAddLocation').append(html);
                    
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
}

function AddTableLocation(ULD, Awb_Count, ScaleWt, weight, NOP) {
    html += "<tr>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + ULD + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + Awb_Count + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + weight + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + NOP + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + ScaleWt + "</td>";

    html += "</tr>";
}
