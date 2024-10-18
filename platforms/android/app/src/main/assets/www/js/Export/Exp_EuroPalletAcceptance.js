
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var AWBNumber = window.localStorage.getItem("AWBNumber");
var AWBid;
var type;
var _XmlForSHCCode;
var joinAllValuesWithComma = '';
var d = new Date(),
    n = d.getMonth() + 1,
    y = d.getFullYear()
t = d.getDate();

$(function () {

    if (window.localStorage.getItem("RoleExpTDG") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    $("#btnOpenSHCModal").click(function () {
        $("#spnValdatemsg").text('');
        SHCCodePopupField();

    });



    type = 'A';

    $("#rdoAWB").click(function () {
        rdoAWBChecked();
    });

    $("#rdoSlot").click(function () {
        rdoSlotChecked();
    });



    if (AWBNumber != null) {
        $("#txtAWBNo").val(AWBNumber);
        GetShipmentDetailsForTDG();
    }
});

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
    var ShcForSave = joinAllValuesWithComma.replace(/\"/g, "")
    if (joinAllValuesWithComma != '') {
        var newSpanSHC = ShcForSave.split(',');
        //var newSpanSHC = newSpanSHC_.replace(/\"/g, "");
        for (var n = 0; n < 9; n++) {

            html += '<tr id="row1 ' + n + '">';
            html += '<td style="text-align:center;">' + (n + 1) + '</td>';
            html += "<td><input onkeypress='return blockSpecialChar(event)' maxlength='3' value='" + newSpanSHC[n] + "' type='text' id='txtSHC " + n + "' class='form-control' placeholder='' style='text-transform: uppercase;'></td>";
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
            html += '<td><input onkeypress="return blockSpecialChar(event)" maxlength="3" value="' + blink[0] + '" type="text" id="txtSHC ' + n + '" class="textfieldClass" placeholder="" style="text-transform: uppercase;"></td>';
            html += '</tr>';
        }
    }



    html += "</tbody></table>";
    $('#dvSHCCode').append(html);
    $('#SHCCode').modal('show');
}


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
                htmlVal += 'SHC1="' + values.toUpperCase() + '" ';
                jionOfComma += values.toUpperCase() + '","'
            }
            if (i == 2) {
                htmlVal += 'SHC2="' + values.toUpperCase() + '" ';
                jionOfComma += values.toUpperCase() + '","'
            }
            if (i == 3) {
                htmlVal += 'SHC3="' + values.toUpperCase() + '" ';
                jionOfComma += values.toUpperCase() + '","'
            }
            if (i == 4) {
                htmlVal += 'SHC4="' + values.toUpperCase() + '" ';
                jionOfComma += values.toUpperCase() + '","'
            }
            if (i == 5) {
                htmlVal += 'SHC5="' + values.toUpperCase() + '" ';
                jionOfComma += values.toUpperCase() + '","'
            }
            if (i == 6) {
                htmlVal += 'SHC6="' + values.toUpperCase() + '" ';
                jionOfComma += values.toUpperCase() + '","'
            }
            if (i == 7) {
                htmlVal += 'SHC7="' + values.toUpperCase() + '" ';
                jionOfComma += values.toUpperCase() + '","'
            }
            if (i == 8) {
                htmlVal += 'SHC8="' + values.toUpperCase() + '" ';
                jionOfComma += values.toUpperCase() + '","'
            }
            if (i == 9) {
                htmlVal += 'SHC9="' + values.toUpperCase() + '" ';
                jionOfComma += values.toUpperCase()
            }
        });

    });

    allSHCCodeSave = htmlVal;
    joinAllValuesWithComma = jionOfComma;
    console.log("Values====", joinAllValuesWithComma)
    ValidateSHCCodes();
}






function rdoAWBChecked() {
    clearALL();
    type = 'A';
    $('#divAWB').css('display', 'block');
    $('#divSlot').css('display', 'none');
    $('#txtAWBNo').focus();
}

function rdoSlotChecked() {
    clearALL();
    type = 'S';
    $('#divAWB').css('display', 'none');
    $('#divSlot').css('display', 'block');
    $('#txtSlotNo').focus();
}

function ValidateSHCCodes() {
    var awbid = '"' + AWBid + '"';
    var uname = '"' + UserName + '"';
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var InputXML = '<SHCInfo><SHCDetail ALRowId=' + awbid + ' ' + allSHCCodeSave + '  CreatedBy =' + uname + '/></SHCInfo>';
    console.log("InputXML====   ", InputXML)
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "TDGAcceptanceUpdateSHC_PDA",
            data: JSON.stringify({ 'pi_strSHCDetails': InputXML }),
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
                        StrMessage = $(this).find('OutMsg').text();
                        if (Status == 'E') {
                            $("#spnValdatemsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                            allSHCCodeSave = '';
                            joinAllValuesWithComma = '';
                        } else if (Status == 'S') {
                            $("#spnValdatemsg").text('');
                            $('#SHCCode').modal('hide');
                            GetShipmentDetailsForTDG();
                        }

                    });

                }
                else {

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

function cleatInvalidSHCCode() {
    allSHCCodeSave = '';
}

function GetAWBForSlotNumber() {

    var SlotNo = $('#txtSlotNo').val();

    clearALL();

    $('#txtSlotNo').val(SlotNo);

    if (SlotNo == '')
        return;

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetAWBNoBasedOnSlotNo_PDA",
            data: JSON.stringify({ 'pi_strSlotNo': SlotNo }),
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
                    $("#btnGet").removeAttr("disabled");
                    $(xmlDoc).find('Table').each(function (index) {

                        if ($(this).find('OutMsg').text() != '') {
                            $.alert($(this).find('OutMsg').text());
                            return false;
                        }

                        var newOption = $('<option></option>');
                        newOption.val($(this).find('AWBNo').text()).text($(this).find('AWBNo').text());
                        newOption.appendTo('#ddlAWBno');

                    });

                }
                else {
                    errmsg = 'Slot no. does not exists';
                    $.alert(errmsg);
                    $("#btnStartTDGAcceptance").attr("disabled", "disabled");
                    $("#btnCompleteTDGAcceptance").attr("disabled", "disabled");
                    $("#btnGet").attr("disabled", "disabled");
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

function GetShipmentDetailsForTDG(valu = false) {

    $('#divShippingBillInfo').hide();
    $('#divTDGinfo').show();

    $("#btnSave").removeAttr("disabled");
    $("#txtReceivedPkgs").removeAttr("disabled");

    clearBeforePopulate();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo;

    if (type == 'S' && $('#txtSlotNo').val() == '') {
        errmsg = "Please enter Slot No.";
        $.alert(errmsg);
        return;
    }

    if (type == 'A')
        AWBNo = $('#txtAWBNo').val();

    if (type == 'S')
        AWBNo = $('#ddlAWBno').find('option:selected').text();

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

    if (n.toString().length < Number(2))
        n = '0' + n;
    if (t.toString().length < Number(2))
        t = '0' + t;


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetShipmentDetailsforTDGAcceptance_PDA",
            data: JSON.stringify({ 'pi_strNumber': AWBNo, 'pi_strMode': 'A' }),
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
                if (str != null && str != "") {


                    var xmlDoc = $.parseXML(str);
                    console.log(xmlDoc)
                    $(xmlDoc).find('Table').each(function (index) {
                        //debugger;
                        if (index == 0) {
                            AWBid = $(this).find('AWBId').text();
                            if (type == 'A')
                                $('#txtSlotNo').val($(this).find('SlotNo').text());
                            $('#txtSlotTime').val($(this).find('SlotNo').text().slice(-4));
                            //$('#txtFlightNo').val($(this).find('FlightNo').text());
                            //$('#txtFlightDate').val($(this).find('FlightDt').text());
                            //$('#txtFltDestination').val($(this).find('OffPoint').text());
                            //$('#txtAWBDestination').val($(this).find('Destination').text());
                            //$('#txtDecPackages').val($(this).find('Pieces').text());
                            //$('#txtDeclGrossWt').val($(this).find('GrWt').text());
                            //$('#txtDeclchrgWt').val($(this).find('ChWt').text());
                            //$('#txtRcvdGrossWt').val($(this).find('ActualGrWt').text());
                            //$('#txtCommodity').val($(this).find('Commodity').text());
                            //$('#txtDeclVolWt').val($(this).find('DeclaredVolWt').text());
                            //$('#txtRcvdVolWt').val($(this).find('ActualVolWt').text());

                            //$('#txtExporterName').val($(this).find('Exporter').text());
                            //$('#txtIataCode').val($(this).find('IATA').text());
                            //$('#txtCHACode').val($(this).find('CHA').text());




                            $('#txtSlotNo').text($(this).find('SlotNo').text());
                            $('#txtSlotTime').text($(this).find('SlotNo').text().slice(-4));
                            $('#txtFlightNo').text($(this).find('FlightNo').text());

                            _ComDate = $(this).find('FlightDt').text();

                            month = _ComDate.split("/")[0];
                            day = _ComDate.split("/")[1];
                            year = _ComDate.split("/")[2];

                            //$('#txtFlightDate').text(day + "/" + month + "/" + year);

                            $('#txtFlightDate').text(_ComDate);

                            $('#txtFltDestination').text($(this).find('OffPoint').text());
                            $('#txtAWBDestination').text($(this).find('Destination').text());
                            $('#txtDecPackages').text($(this).find('ActualPieces').text());
                            $('#txtDeclGrossWt').text($(this).find('GrWt').text());
                            $('#txtDeclchrgWt').text($(this).find('ChWt').text());

                            $('#txtCommodity').text($(this).find('Commodity').text());
                            $('#txtDeclVolWt').text($(this).find('DeclaredVolWt').text());


                            $('#txtExporterName').text($(this).find('Exporter').text());
                            $('#txtIataCode').text($(this).find('IATA').text());
                            $('#txtCHACode').text($(this).find('CHA').text());

                            SHCAll = $(this).find('SHCAll').text();

                            _XmlForSHCCode = SHCAll;
                            SHCSpanHtml(SHCAll);

                            if ($(this).find('TDGStatus').text() == 'true') {

                                $("#btnSave").attr("disabled", "disabled");
                                $("#txtReceivedPkgs").attr("disabled", "disabled");
                            } else {
                                $("#btnSave").removeAttr("disabled");
                                $("#txtReceivedPkgs").removeAttr("disabled");

                            }

                            if ($(this).find('TDGStartStatus').text() == 'true') {
                                $("#btnStartTDGAcceptance").attr("disabled", "disabled");

                            } else {
                                $("#btnStartTDGAcceptance").removeAttr("disabled");
                            }

                            if ($(this).find('TDGCompletedStatus').text() == 'true') {
                                $("#btnCompleteTDGAcceptance").attr("disabled", "disabled");
                            } else {
                                $("#btnCompleteTDGAcceptance").removeAttr("disabled");
                            }

                            if ($(this).find('AcceptedPieces').text() == $(this).find('ActualPieces').text()) {
                                $("#btnSave").attr("disabled", "disabled");
                                $("#txtReceivedPkgs").attr("disabled", "disabled");
                            }

                            if (Number($(this).find('ActualGrWt').text()) > Number($(this).find('ActualChWt').text()))
                                $('#txtRcvdchrgWt').text($(this).find('ActualGrWt').text());
                            if (Number($(this).find('ActualChWt').text()) > Number($(this).find('ActualGrWt').text()))
                                $('#txtRcvdchrgWt').text($(this).find('ActualChWt').text());
                            if (Number($(this).find('ActualChWt').text()) == Number($(this).find('ActualGrWt').text()))
                                $('#txtRcvdchrgWt').text($(this).find('ActualChWt').text());


                            if ($(this).find('BAGStatus').text() == 'false') {
                                $('#divShowHideSHC').show();
                            } else {
                                $('#divShowHideSHC').hide();
                            }

                            //if ($(this).find('TDGStartStatus').text() == 'true') {

                            //} else {
                            //    $('#divShowHideSHC').hide();
                            //}
                        }

                    });


                    $(xmlDoc).find('Table').each(function () {
                        if ($(this).find('OutMsg').text().length > Number(5)) {

                            if (valu == false) {

                                $.alert($(this).find('OutMsg').text());
                            }

                            $("#btnStartTDGAcceptance").attr("disabled", "disabled");
                            $("#btnCompleteTDGAcceptance").attr("disabled", "disabled");
                        } else {

                        }
                    });
                    isTDG = 0;
                    $(xmlDoc).find('Table1').each(function () {
                        isTDG = 1;
                        Pkgs = $(this).find('Pkgs').text();
                        GrWt = $(this).find('GrWt').text();
                        ChWt = $(this).find('ChWt').text();
                        VolChWt = $(this).find('VolChWt').text();

                    });

                    if (isTDG == 1) {
                        $('#txtAcceptedPieces').text(Pkgs);
                        $('#txtRcvdGrossWt').text(GrWt);
                        $('#txtRcvdVolWt').text(VolChWt);
                        $('#txtRcvdchrgWt').text(ChWt);
                    } else {
                        $('#txtAcceptedPieces').text('0');
                        $('#txtRcvdGrossWt').text('0.00');
                        $('#txtRcvdVolWt').text('0.00');
                        $('#txtRcvdchrgWt').text('0.00');
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


function SHCSpanHtml(newSHC) {
    $("#SHCCodeTbl").empty();
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
    $("#dvForEditBtn").show();

    return spanStr;

}

function GetHAWBDetailsForTDG() {

    $('#divShippingBillInfo').show();
    $('#divTDGinfo').hide();

    var temp;

    html = '';
    $('#divAddLocation').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo;

    if (type == 'A')
        AWBNo = $('#txtAWBNo').val();

    if (type == 'S')
        AWBNo = $('#ddlAWBno').find('option:selected').text();

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

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetHAWBDetailsForTDGAcceptance_PDA",
            data: JSON.stringify({ 'pi_strNumber': AWBNo }),
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

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>S. Bill</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pkgs.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Gross Wt.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Dec. Value</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {




                        var sBill;
                        var pkgs;
                        var grWt;
                        var DecValue

                        sBill = $(this).find('SBNo').text();
                        pkgs = $(this).find('Pieces').text();
                        grWt = $(this).find('GrWt').text();
                        DecValue = $(this).find('FOBValue').text();
                        OutMsg = $(this).find('OutMsg').text();
                        Status = $(this).find('Status').text();
                        if (OutMsg != '') {
                            $.alert($(this).find('OutMsg').text());
                            return;
                        }
                        AddTableLocation(sBill, pkgs, grWt, DecValue);
                    });


                    html += "</tbody></table>";

                    if (temp != 1)

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

function AddTableLocation(sBill, pkgs, grWt, DecValue) {
    html += "<tr>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + sBill + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + pkgs + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + grWt + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + DecValue + "</td>";

    html += "</tr>";
}

function SaveTDGDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtReceivedPkgs = $('#txtReceivedPkgs').val();
    var GrossWt = 0;
    var ChargablWt = 0;
    var EuroPalletNo = 0;
    var ReceivedPieces = 0;


    if ($("#rdoAWB").prop("checked") == true) {
        if ($('#txtAWBNo').val() == "") {

            errmsg = "Please enter AWB No.</br>";
            $.alert(errmsg);
            return;

        }
    }

    if ($("#rdoSlot").prop("checked") == true) {
        if ($('#txtSlotNo').val() == "") {

            errmsg = "Please enter slot No.</br>";
            $.alert(errmsg);
            return;

        }
    }


    if (txtReceivedPkgs == "") {

        errmsg = "Please enter received NoP</br>";
        $.alert(errmsg);
        return;

    }

    //if (EuroPalletNo == "") {
    //    EuroPalletNo = '0';
    //}

    //if (Number(ReceivedPieces) > Number(TotalPIECESno)) {
    //    errmsg = "TDG packages cannot be more than declared packages.</br>";
    //    $.alert(errmsg);
    //    return;
    //}


    var xml = "";
    xml = '<TDGInfo><TDGDetail ALRowId="' + AWBid + '" ScannedPkgs="' + txtReceivedPkgs + '" ScannedGrossWt="' + GrossWt + '" VolumetricWt="' + ChargablWt + '" EuroPalletNo="' + EuroPalletNo + '" IsPalletWiseScan="0" CreatedBy="' + window.localStorage.getItem("UserName") + '" Remarks="" TDGDate="' + n + "/" + t + "/" + y + '"/></TDGInfo>';
    console.log(xml);
  
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "CreatePartTDGAcceptance_PDA",
            data: JSON.stringify({
                'pi_strTDGDetails': xml, 'pi_strMode': "false",
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

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    if (index == 0) {
                        //if (($(this).find('OutMsg').text()).length < Number(5))
                        $.alert($(this).find('OutMsg').text());
                        //else
                        //    $.alert($(this).find('OutMsg').text());


                    }
                });
                //clearALL();
                GetShipmentDetailsForTDG(true);
            },
            error: function (msg) {
                $("body").mLoading('hide');
                //$.alert('Some error occurred while saving data');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
        return false;
    }

}

function BackFromSbill() {
    $('#divShippingBillInfo').hide();
    $('#divTDGinfo').show();

}

function clearALL() {
    $('#txtEuroPalletNo').val('');
    $('#txtAWBNo').val('');
    $('#txtSlotNo').val('');
    $('#txtSlotTime').val('');
    $('#txtFlightNo').text('');
    $('#txtFlightDate').text('');
    $('#txtFltDestination').text('');
    $('#txtAWBDestination').text('');
    $('#txtDecPackages').text('');
    $('#txtDeclGrossWt').text('');
    $('#txtDeclchrgWt').text('');
    $('#txtRcvdGrossWt').text('');
    $('#txtRcvdchrgWt').text('');
    $('#txtDeclVolWt').text('');
    $('#txtRcvdVolWt').text('');
    $('#txtCommodity').text('');
    $('#txtReceivedPkgs').text('');
    $('#txtExporterName').text('');
    $('#txtIataCode').text('');
    $('#txtCHACode').text('');
    $('#txtAcceptedPieces').text('');
    $("#btnSave").removeAttr("disabled");
    $("#txtReceivedPkgs").removeAttr("disabled");
    $("#btnGet").removeAttr("disabled");
    if (type == 'A')
        $('#txtAWBNo').focus();
    $('#ddlAWBno').empty();
    $('#divAddLocation').empty();
    $('#SHCCodeTbl').empty();
    $('#divShowHideSHC').hide();


}

function FocusSlot() {
    $("#btnStartTDGAcceptance").removeAttr("disabled");
    $("#btnCompleteTDGAcceptance").removeAttr("disabled");
    if (type == 'S')
        $('#txtSlotNo').focus();
}

function clearBeforePopulate() {
    $('#txtEuroPalletNo').val('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $('#txtPackages').val('');
    $('#txtGrossWt').val('');
    $('#txtchrgWt').val('');
    $('#txtReceivedPkgs').val('');
    $('#txtPendingPkgs').val('');
    $('#txtDestination').val('');
    $('#txtCommodity').val('');
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function goToFWB() {
    if ($('#txtAWBNo').val() == '') {

        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }
    localStorage.setItem('AWBNumber', $('#txtAWBNo').val())
    window.location = "EXP_FWBDetails.html";
}

function fnExit() {
    localStorage.removeItem("AWBNumber");
    window.location = "EXP_Dashboard.html";
}


function StartTDGAcceptance_HHT() {
    var AWBNo;
    if ($("#rdoAWB").prop("checked") == true) {
        if ($('#txtAWBNo').val() == "") {
            errmsg = "Please enter AWB No.</br>";
            $.alert(errmsg);
            $(".alert_btn_ok").click(function () {
                $("#txtAWBNo").focus();
            });
            return;

        } else {
            AWBNo = $("#txtAWBNo").val();
        }
    }

    if ($("#rdoSlot").prop("checked") == true) {
        if ($('#txtSlotNo').val() == "") {
            errmsg = "Please enter slot No.</br>";
            $.alert(errmsg);
            $(".alert_btn_ok").click(function () {
                $("#txtSlotNo").focus();
            });
            return;
        } else {
            AWBNo = $("#ddlAWBno").val();
        }
    }
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "StartTDGAcceptance_HHT",
            data: JSON.stringify({ 'pi_strAwbNumber': AWBNo, 'pi_strCreatedBy': window.localStorage.getItem("UserName") }),
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

                        if ($(this).find('OutMsg').text() != '') {
                            $.alert($(this).find('OutMsg').text());
                            return false;
                        }



                    });
                    GetShipmentDetailsForTDG();
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

function CompleteTDGAcceptance_HHT() {
    var AWBNo;



    if ($("#rdoAWB").prop("checked") == true) {
        if ($('#txtAWBNo').val() == "") {
            errmsg = "Please enter AWB No.</br>";
            $.alert(errmsg);
            $(".alert_btn_ok").click(function () {
                $("#txtAWBNo").focus();
            });
            return;

        } else {
            AWBNo = $("#txtAWBNo").val();
        }
    }

    if ($("#rdoSlot").prop("checked") == true) {
        if ($('#txtSlotNo').val() == "") {
            errmsg = "Please enter slot No.</br>";
            $.alert(errmsg);
            $(".alert_btn_ok").click(function () {
                $("#txtSlotNo").focus();
            });
            return;
        } else {
            AWBNo = $("#ddlAWBno").val();
        }
    }



    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "CompleteTDGAcceptance_HHT",
            data: JSON.stringify({ 'pi_strAwbNumber': AWBNo, 'pi_strCreatedBy': window.localStorage.getItem("UserName") }),
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

                        if ($(this).find('OutMsg').text() != '') {
                            $.alert($(this).find('OutMsg').text());

                            GetShipmentDetailsForTDG(true);


                            return false;
                        }



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