//document.addEventListener("deviceready", GetCommodityList, false);

var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var _AWBNO;
var _ScanID;
$(function () {

    if (window.localStorage.getItem("RoleExpExportsQuery") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    $('#chkScanID').click(function () {
        var checked = $(this).attr('checked', true);
        if (checked) {
            $('#lblScanID').show();
            $('#lblAWBNo').hide();
            $('#lblAWBNo').focus();
            _ScanID = 'S';
            clearBeforePopulate();

        }

    });


    $('#chkAWBNo').click(function () {
        var checked = $(this).attr('checked', true);
        if (checked) {
            $('#lblScanID').hide();
            $('#lblAWBNo').show();
            $('#lblAWBNo').focus();
            _AWBNO = 'A';
            clearBeforePopulate();
        }

    });

    $("input").keyup(function () {
        var string = $(this).val();
        // var string = $('#txtOrigin').val();
        if (string.match(/[`!₹£•√Π÷×§∆€¥¢©®™✓π@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
            /*$('#txtOrigin').val('');*/
            $(this).val('');
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }

    });

});


function onChangeLenthCheckForScanID() {
    if ($('#txtAWBNo').val().length == 11) {
        GetShipmentStatus();
        return
    }

    if ($('#txtAWBNo').val().length == 15) {
        GetShipmentStatus();
    }


}


function GetShipmentStatus() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo = $('#txtAWBNo').val();

    if (AWBNo == '') {
        errmsg = "Please enter AWB No.";
        $.alert(errmsg);
        return;
    }

    //if (AWBNo.length != '11') {
    //    errmsg = "Please enter valid AWB No.";
    //    $.alert(errmsg);
    //    return;
    //}

    if ($('#chkAWBNo').prop('checked')) {
        strType = "A";
    }

    if ($('#chkScanID').prop('checked')) {
        strType = "S";
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetAWBHistory_PDA",
            data: JSON.stringify({ 'pi_strAWBNo': AWBNo, 'pi_strType': strType }),
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
                if (str != null && str != "") {

                    $('#divAddLocation').empty();
                    html = '';

                    html = "<table id='tblNews1' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Event Name</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Final Date Time</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>User Name</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    console.log(xmlDoc)

                    $(xmlDoc).find('Table').each(function (index) {

                        var outMsg = $(this).find('OutMsg').text();

                        if (outMsg != '') {
                            $.alert(outMsg);
                            $('#divAddLocation').empty();
                            html = '';
                            return;
                        }

                        var eventName;
                        var dateTime;
                        var userName;

                        eventName = $(this).find('EventName').text();
                        dateTime = $(this).find('EventDateTime').text();
                        userName = $(this).find('Username').text();

                        AWBNo = $(this).find('AWBNo').text();
                        ScreeningMethod = $(this).find('ScreeningMethod').text();
                        ScanTimeStamp = $(this).find('ScanTimeStamp').text();

                        AddTableLocation(eventName, dateTime, userName);

                    });

                    html += "</tbody></table>";

                    $('#divAddLocation').append(html);


                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Screening Method</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Scan Time Stamp</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>UserName</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);
                    fl = '0';
                    $(xmlDoc).find('Table').each(function (index) {

                        var outMsg = $(this).find('OutMsg').text();

                        if (outMsg != '') {
                            $.alert(outMsg);
                            $('#divAddLocation').empty();
                            html = '';
                            return;
                        }

                        var eventName;
                        var dateTime;
                        var userName;

                        eventName = $(this).find('EventName').text();
                        dateTime = $(this).find('EventDateTime').text();
                        userName = $(this).find('Username').text();

                        AWBNo = $(this).find('AWBNo').text();
                        ScreeningMethod = $(this).find('ScreeningMethod').text();
                        ScanTimeStamp = $(this).find('ScanTimeStamp').text();

                        //  AddTableLocation(eventName, dateTime, userName);
                        if (ScreeningMethod != '') {
                            fl = '1';
                            if (AWBNo != '') {
                                $('#txtAWBNoOnly').val(AWBNo);
                                $('#divAWBNo').show();
                            }

                            fnScreeningMethod(ScreeningMethod, ScanTimeStamp, userName);

                        }
                    });
                    if (fl != '0') {
                        html += "</tbody></table>";

                        $('#divAddLocation').append(html);
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
}

function fnScreeningMethod(ScreeningMethod, ScanTimeStamp, userName) {
    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + ScreeningMethod + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + ScanTimeStamp + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + userName + "</td>";

    html += "</tr>";
}

function AddTableLocation(eventName, dateTime, userName) {
    html += "<tr>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + eventName + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + dateTime + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + userName + "</td>";

    html += "</tr>";
}

function clearBeforePopulate() {
    $('#txtAWBNo').val('');
    $('#txtAWBNoOnly').val('');
    $('#divAWBNo').hide();
    $('#divAddLocation').empty();

}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function alertDismissed() {
}


