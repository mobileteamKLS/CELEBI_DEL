
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var AWBNumber = window.localStorage.getItem("AWBNumber");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var AWBid;
var type;

var d = new Date(),
    n = d.getMonth() + 1,
    y = d.getFullYear()
t = d.getDate();

$(function () {

    if (window.localStorage.getItem("RoleExpTDG") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    type = 'A';

    $("#rdoAWB").click(function () {
        rdoAWBChecked();
    });

    $("#rdoSlot").click(function () {
        rdoSlotChecked();
    });;

    GetExportFWBDetails()



});



function SHCSpanHtml(newSHC) {
    var spanStr = "<tr>";
    var newSpanSHC = newSHC.split(',');
    for (var n = 0; n < newSpanSHC.length ; n++) {

        //0: "AOG"
        //1: "ATT"
        //2: "AVI"
        //3: "DGR"
        //4: "GEN"
        //5: "HUM"
        //6: "PER"
        //7: "VAL"
        //spanStr += "&nbsp;<td  style=\"background-color:rgb(177,112,136);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        if (n == 0 && newSpanSHC[n] == "AOG")
            spanStr += "&nbsp;<td  style=\"background-color:rgb(177,112,136);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        if (n == 1 && newSpanSHC[n] != "")
            spanStr += "&nbsp;<td style=\"background-color:rgb(27,81,141);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        if (n == 2 && newSpanSHC[n] != "")
            spanStr += "&nbsp;<td style=\"background-color:rgb(13,150,68);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        if (n == 3 && newSpanSHC[n] != "")
            spanStr += "&nbsp;<td style=\"background-color:rgb(35,29,31);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        if (n == 4 && newSpanSHC[n] != "")
            spanStr += "&nbsp;<td style=\"background-color:rgb(157,124,43);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        if (n == 5 && newSpanSHC[n] != "")
            spanStr += "&nbsp;<td style=\"background-color:rgb(14,76,166);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        if (n == 6 && newSpanSHC[n] != "")
            spanStr += "&nbsp;<td style=\"background-color:rgb(206,84,209);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        if (n == 7 && newSpanSHC[n] != "")
            spanStr += "&nbsp;<td style=\"background-color:rgb(143,74,219);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        if (n == 8 && newSpanSHC[n] != "")
            spanStr += "&nbsp;<td style=\"background-color:rgb(198,139,74);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
        //if (n == 9 && newSpanSHC[n] != "")
        //    spanStr += "&nbsp;<td style=\"background-color:rgb(198,139,74);color:white;padding:2px;text-align: center;\">" + newSpanSHC[n] + "</td>";
    }
    spanStr += "</tr>";
    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}



function GetExportFWBDetails() {
    // clearALL();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><AWBNo>' + AWBNumber + '</AWBNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetExportFWBDetails",
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
                $("body").mLoading('hide');
                var str = response.d;
                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);



                    $(xmlDoc).find('Table').each(function (index) {
                        Status = $(this).find('Status').text();
                        if (Status == 'E') {
                            $.alert($(this).find('StrMessage').text());

                        }
                    });

                    $(xmlDoc).find('Table1').each(function (index) {

                        FWBId = $(this).find('FWBId').text();
                        AWBPrefix = $(this).find('AWBPrefix').text();
                        AWBNo = $(this).find('AWBNo').text();
                        NOP = $(this).find('NOP').text();
                        ExpWeight = $(this).find('ExpWeight').text();
                        Weight_Code = $(this).find('Weight_Code').text();
                        ValWeight = $(this).find('ValWeight').text();
                        ChargeableWt = $(this).find('ChargeableWt').text();
                        IATA_Code = $(this).find('IATA_Code').text();
                        NatureOfGoods = $(this).find('NatureOfGoods').text();
                        SHC = $(this).find('SHC').text();
                        Agent = $(this).find('Agent').text();
                        SSR = $(this).find('SSR').text();
                        OSI = $(this).find('OSI').text();



                        $('#tdAWBNumber').text(AWBPrefix + '-' + AWBNo);
                        $('#tdNoP').text(NOP);
                        $('#tdWt').text(ExpWeight);
                        $('#tdVol').text(ValWeight);
                        $('#tdChWt').text(ChargeableWt);
                        $('#tdNOG').text(NatureOfGoods);
                        $('#otherServices').text(OSI);
                        $('#specialService').text(SSR);
                        var newSHC = SHC; //'ECC,PER,GEN,DGR,HEA,AVI,BUP,EAW,EAP';

                        SHCSpanHtml(newSHC);

                    });



                }
                else {
                    errmsg = 'Slot no. does not exists';
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




