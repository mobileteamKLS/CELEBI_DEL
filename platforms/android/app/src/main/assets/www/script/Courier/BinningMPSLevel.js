
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
var html
var _ISCRowID;

var tblArray = [];

$(function () {

    //setTimeout(function () {
    //    window.location.href = 'Login.html'
    //}, 1200000);


    //if ($("#chkLocationStatus").is(':checked')) {
    //    alert('l');
    //}

    window.onload = function () {
        $("#txtScanGroupID").trigger('focus');
        // tblArray = [];
    }


    $("#btnSearch").click(function () {
        $('body').mLoading({
            text: "Please Wait..",
        });
        if ($("#txtScanMAWB").val() == '') {
            $("body").mLoading('hide');
            errmsg = "Please enter Barcode No.</br>";
            $.alert(errmsg);
            return;
        } else {
            inputxml = "<Root><GroupID>" + $("#txtScanMAWB").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
            searchDetails(inputxml);
        }

    });


    // $('#tableRecords').hide();
    // $("#btnDiv").hide();
    //  $("#tbTable").hide('slow');

    // $("#btnSubmit").click(function () {
    //     $('body').mLoading({
    //         text: "Please Wait..",
    //     });
    //     if ($("#txtWDONo").val() == '') {
    //         $("body").mLoading('hide');
    //         errmsg = "Please enter WDO No.</br>";
    //         $.alert(errmsg);
    //         return;
    //     } else {
    //         inputxml = "<Root><WDONo>" + $("#txtWDONo").val() + "</WDONo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><Username>" + Userid + "</Username>" + LocXML + "</Root>";
    //         SaveWDODetails(inputxml);
    //     }
    // });

    $('#txtScanGroupID').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtScanGroupID").val() == '') {
                $("body").mLoading('hide');
                errmsg = "Please Scan</br>";
                $.alert(errmsg);
                return;
            } else {
                $('#tableRecords').empty();
                inputxml = "<Root><GroupID>" + $("#txtScanGroupID").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                searchDetails(inputxml);
            }
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });

    $('#txtScanShipLabel').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtScanShipLabel").val() == '') {
                $("body").mLoading('hide');
                errmsg = "Please Scan Ship Label</br>";
                $.alert(errmsg);
                return;
            } else {
                //inputxml = "<Root><GroupID>" + $("#txtScanGroupID").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                INPUTXML = "<Root><GroupID>" + $("#txtScanGroupID").val() + "</GroupID><MPSNo>" + $("#txtScanShipLabel").val() + "</MPSNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                GetImportActiveLocationsV2(INPUTXML);
            }
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
    }

    $('#tblCountShow').hide();
});

function setHungarian() {

    $('#lbPageName').text("Számlázási képernyő");
    $('#lblScan').text("Szkennelés");
    $('#lblLoc').text("Lokáció");
    $('#lblNOG').text("Áru darabszám");
    $('#lblSugg').text("Javaslatok");
    $('#BtnMove').text("Mozgatás");
    $('#btnClear').text("Törlés");


}
function detailPage() {
    window.location.href = "CourierFlightCheckInDetail.html";
}

function openScanner() {
    var ScanCode = $('#txtScanMAWB').val();
    if (($("#txtScanMAWB").val() == '')) {

        return;
    }

    if (($("#txtScanMAWB").val().length != 11)) {
        errmsg = "Please enter valid AWB No.</br>";
        $.alert(errmsg);
        $("#txtScanMAWB").val('');
        return;
    }

    inputxml = "<Root><GroupID>" + $("#txtScanMAWB").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
    searchDetails(inputxml);
}



function fnExit() {
    window.location.href = 'ImportOperations.html';
}

function fnClear() {
    $("#txtWDONo").val('');
    $("#tbTable").hide('slow');
    $("#lblPkgsWgt").html('');
    $("#lblStatus").html('');
    $(".ibiSuccessMsg1").text('')
}

function createTable() {
    html = '';

    html += "<table class='col-12 table  table-bordered' id='tblNews'border='1' style='table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
    html += "<thead class='theadClass'><tr>";
    html += "<th>HAWB No.</th>";
    html += "<th>MPS No.</th>";
    //html += "<th>Remark</th>";
    html += "<th >PCS</th>";
    html += "<th >Delete</th>";
    html += "</tr></thead>";
    html += "<tbody id='tbTable'>";
}

searchDetails = function (InputXML) {
    console.log("***************** searchDetails *******************");
    $('#tableRecords').empty();
    tblArray = [];

    clearRecordsBeforeGID();
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetImportActiveLocations",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#txtScanShipLabel").removeAttr('disabled');
                $("#txtScanShipLabel").trigger('focus');//.focus();

                //  createTable();
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        $('#tableRecords').empty();
                        //  $("#tblCountShow").empty();
                        // $("#txtScanGroupID").val("");
                        document.getElementById("txtScanGroupID").readOnly = false;
                        document.getElementById("txtScanShipLabel").readOnly = false;
                        $("#txtScanShipLabel").trigger('focus');
                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    } else {
                        $(".ibiSuccessMsg1").text('');
                    }
                });

                ISCROWID = '';

                var i = 0;
                $(xmlDoc).find('Table1').each(function (index) {
                    var MAWB, HAWB, Remarks, NOP;
                    $("#txtLocation1").val($(this).find('LocCode').text());
                    $("#nog").val($(this).find('NOG').text());
                    $("#suggestions").val($(this).find('Suggestion').text());

                    ISCROWID = $(this).find('ISCROWID').text();
                    MAWB = $(this).find('MAWB').text();
                    HAWB = $(this).find('HAWB').text();
                    Remarks = $(this).find('Remarks').text();
                    NOP = $(this).find('NOP').text();
                    //  createDynamicTable(MAWB, HAWB, Remarks, NOP, ISCROWID);


                    // const newRow= {MAWB:MAWB,HAWB:HAWB, MPSNo:Remarks, NOP:1,ISCROWID:ISCROWID};
                    tblArray.push({ masterno: MAWB, houseno: HAWB, mps: Remarks, pieces: 1, rowid: ISCROWID, index: i });
                    console.log(tblArray);
                    i++;
                });

                $('#dvRemarkShow').empty();
                var Remark = '';
                $(xmlDoc).find('Table3').each(function (index) {

                    Remark = $(this).find('Remark').text();
                    // Date = $(this).find('Date').text();
                    IsHighPriority = $(this).find('IsHighPriority').text();
                    $('#dvRemarkShow').append(Remark);
                   

                });
                if (Remark != '') {
                    $('#remarkPriorityShow').modal('show');
                }
                // html += "</tbody></table>";

                CreateBinningListTable();
                //generate table here


                // if (ISCROWID != '') {
                //     $('#tableRecords').append(html);
                //     $('#tableRecords').show();
                // }



                // $(xmlDoc).find('Table2').each(function (index) {

                //     $('#tdHAWBCount').text($(this).find('HAWBCount').text());
                //     $('#tdMPSCount').text($(this).find('MPSCount').text());


                // });
            } else {
                $("body").mLoading('hide');
                errmsg = "Record not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function createDynamicTable(MAWB, HAWB, Remarks, NOP, ISCROWID) {
    html += '<tr>';

    html += '<td>' + HAWB + '</td>';

    html += '<td>' + Remarks + '</td>';

    //html += "<td>" + Remarks + "</td>";

    html += '<td style="text-align:right;">' + NOP + '</td>';

    html += '<td onclick="DeleteRowByISID(\'' + ISCROWID + '\');" style="text-align:center;color:red;font-size:medium;"><i class="zmdi zmdi-delete"></i></td>';

    html += "</tr>";
}


function CreateBinningListTable() {
    $('#tableRecords').empty();
    if (tblArray.length == 0) {
        $('#tblCountShow').hide();
    }
    else {
        tblArray.sort(function (a, b) { return b.index - a.index });

        html = '';
        html += "<table class='col-12 table  table-bordered' id='tblNews' border='1' style='table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
        html += "<thead class='theadClass'><tr>";
        html += "<th width=40%>HAWB No.</th>";
        html += "<th width=40%>MPS No.</th>";
        //html += "<th>Remark</th>";
        html += "<th width=10% >PCS</th>";
        html += "<th  width=10% >D</th>";
        html += "</tr></thead>";
        html += "<tbody id='tbTable'>";

        for (var i = 0; i < tblArray.length; i++) {
            html += '<tr>';
            html += '<td>' + tblArray[i]["houseno"] + '</td>';
            html += '<td>' + tblArray[i]["mps"] + '</td>';
            html += '<td style="text-align:right;">' + tblArray[i]["pieces"] + '</td>';
            html += '<td onclick="DeleteRowByISID(\'' + tblArray[i]["rowid"] + '\');" style="text-align:center;color:red;font-size:medium;"><i class="zmdi zmdi-delete"></i></td>';
            html += "</tr>";
        }
        html += "</tbody></table>";
        $('#tableRecords').append(html);
        $('#tblCountShow').show();
        $('#tableRecords').show();

        var countHouse = 0, countMPS = 0;
        countHouse = new Set(tblArray.map(x => x.houseno)).size;
        countMPS = new Set(tblArray.map(x => x.mps)).size;
        $('#tdHAWBCount').text(countHouse.toString());
        $('#tdMPSCount').text(countMPS.toString());
    }

}

function del(ISID) {
    console.log("ISID = " + ISID.toString());
    // var index = tblArray.indexOf(ISID);
    // console.log("index = " + index.toString());

    for (let i = 0; i < tblArray.length; i++) {
        if (tblArray[i].rowid === ISID) {
            tblArray.splice(i, 1);
            break;
        }
    }
    console.log(tblArray);
    //tblArray = tblArray.filter((elem) => elem.id !== ISID);
    //tblArray = arr;
    CreateBinningListTable();
}


function DeleteRowByISID(ISID) {

    console.log("***************** DeleteRowByISID *******************");

    console.log("ISID = " + ISID.toString());

    $('body').mLoading({
        text: "Please Wait..",
    });
    InputXML = "<Root><GroupID>0</GroupID><LocCode>BRK</LocCode><ISCRowID>" + ISID + "</ISCRowID><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    console.log("InputXML = " + InputXML);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/UpdateImportLocationV3",
        data: JSON.stringify({ 'InputXML': InputXML }),
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
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        inputxml = "<Root><GroupID>" + $("#txtScanGroupID").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                        //searchDetails(inputxml);
                        for (let i = 0; i < tblArray.length; i++) {
                            if (tblArray[i].rowid === ISID) {
                                tblArray.splice(i, 1);
                                break;
                            }
                        }
                        CreateBinningListTable();
                    }
                });


            } else {
                $("body").mLoading('hide');
                errmsg = "Data not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function GetImportActiveLocationsV2(INPUTXML) {
    console.log("***************** GetImportActiveLocationsV2 *******************");
    $('body').mLoading({
        text: "Please Wait..",
    });
    $("#txtOldNewLocation").val('');
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetImportActiveLocationsV2",
        data: JSON.stringify({ 'InputXML': INPUTXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d);
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {

                $("#txtOldNewLocation").trigger('focus');//.focus();

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        $("#txtMPSNo").val("");
                        $("#txtOldLocation").val("");
                        $("#txtOldHAWBLocation").val("");
                        $("#txtScanShipLabel").val("");
                        $("#txtScanShipLabel").trigger('focus');//.focus();

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                        $("#txtScanShipLabel").val("");
                        $("#txtScanShipLabel").trigger('focus');//.focus();
                    }
                });



                var IsAddedInGrp, indexval = tblArray.length;
                $(xmlDoc).find('Table1').each(function (index) {
                    MPSNo = $(this).find('MPSNo').text();
                    LocCode = $(this).find('LocCode').text();
                    Suggestion = $(this).find('Suggestion').text();
                    ISID = $(this).find('ISID').text();
                    _ISCRowID = $(this).find('ISCROWID').text();
                    $("#txtMPSNo").val($(this).find('MPSNo').text())
                    $("#txtOldLocation").val($(this).find('LocCode').text())
                    $("#txtOldHAWBLocation").val($(this).find('Suggestion').text())

                    var HAWB, Remarks, NOP, ISCROWID1;
                    HAWB = $(this).find('HouseNo').text();
                    Remarks = $(this).find('MPSNo').text();
                    NOP = 1;
                    IsAddedInGrp = $(this).find('IsAddedInGrp').text();
                    ISCROWID1 = $(this).find('ISCROWID').text();
                    indexval++;
                    if (IsAddedInGrp == "Y") {
                        tblArray.push({ masterno: "", houseno: HAWB, mps: Remarks, pieces: 1, rowid: ISCROWID1, index: indexval });
                        // console.log(tblArray);
                    }
                });

                CreateBinningListTable();
                console.log(tblArray);

            } else {
                $("body").mLoading('hide');
                errmsg = "Data not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}



function UpdateImportLocationV3(InputXML) {
    console.log("***************** UpdateImportLocationV3 *******************");
    if (($("#txtScanGroupID").val() == '')) {
        errmsg = "Please enter/scan Group ID</br>";
        $.alert(errmsg);
        return;
    }

    // if (($("#txtScanShipLabel").val() == '')) {
    //     errmsg = "Please enter/scan Group ID</br>";
    //     $.alert(errmsg);
    //     return;
    // }

    if (($("#txtOldNewLocation").val() == '')) {
        errmsg = "Please enter/scan new location</br>";
        $.alert(errmsg);
        return;
    }

    $('body').mLoading({
        text: "Please Wait..",
    });

    // changed by krunal 19-07-2022
    if (_ISCRowID == undefined || _ISCRowID == null || _ISCRowID == '') {
        _ISCRowID = '0';
    }

    InputXML = "<Root><GroupID>" + $("#txtScanGroupID").val() + "</GroupID><LocCode>" + $("#txtOldNewLocation").val() + "</LocCode><ISCRowID>" + _ISCRowID + "</ISCRowID><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/UpdateImportLocationV3",
        data: JSON.stringify({ 'InputXML': InputXML }),
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
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        clearRecords();
                        //ibiSuccessMsg1
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        //INPUTXML = "<Root><GroupID>" + $("#txtScanGroupID").val() + "</GroupID><MPSNo>" + $("#txtScanShipLabel").val() + "</MPSNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
                        //GetImportActiveLocationsV2(INPUTXML);
                        inputxml = "<Root><GroupID>" + $("#txtScanGroupID").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";

                        // searchDetails(inputxml);

                    }
                });


            } else {
                $("body").mLoading('hide');
                errmsg = "Data not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function clearRecords() {
    $("#txtScanGroupID").val("");
    $("#txtOldNewLocation").val("");
    $("#txtScanShipLabel").val("");
    $("#txtMPSNo").val("");
    $("#txtOldLocation").val("");
    $("#txtOldHAWBLocation").val("");
    $("#status").val("");
    $("#tableRecords").empty();
    $("#tblCountShow").hide();
    $("#txtScanGroupID").trigger('focus');//.focus();
    $(".ibiSuccessMsg1").text('');
}

function clearRecordsBeforeGID() {

    $("#txtOldNewLocation").val("");
    $("#txtScanShipLabel").val("");
    $("#txtMPSNo").val("");
    $("#txtOldLocation").val("");
    $("#txtOldHAWBLocation").val("");
    $("#status").val("");
    $("#tableRecords").empty();
    $("#tblCountShow").hide();
    $("#txtScanGroupID").trigger('focus');//.focus();
    $(".ibiSuccessMsg1").text('');
}



