
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
var Is_I_E = window.localStorage.getItem("Is_I_E");
var _IGMNo;
var Origin;
var Destination;
var Commodity;
var LocId;
var LocPieces;
var PendingPieces;
var LocCode;
var MAWBId;
var HAWBNo;
var _vlaueofHawb;
var _textofHawb;
var currentLocID;
var _RemarkId = '0';
$(function () {
    AWBRemarkReferenceDataGet();
    
    // function preventSpecialCharactersV2(inputField) {
    //     var inputValue = inputField.value;
    //     var regex = /^[a-zA-Z0-9 ]*$/;
    //     if (!regex.test(inputValue)) {
    //         // If the input contains special characters, remove them
    //         inputField.val(inputValue.replace(/[^a-zA-Z0-9 ]/g, ''));
    //     }
    //     var regex = /^[$&+,:;=?[\]@#|{}'<>.^*()%!-/`~]+$/;
       

    //     // Replace disallowed characters with an empty string
    //     if (regex.test(inputValue)) {
    //         inputField.value = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');
           
    //     }
    // }

    function preventSpecialCharacters(inputField) {
        var inputValue = inputField.value;
        // Define a regular expression to allow only alphanumeric characters and spaces
        var regex = /^[a-zA-Z0-9 ]*$/;
        if (!regex.test(inputValue)) {
            // If the input contains special characters, remove them
            inputField.value = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');
        }
    }
    
    $("#txtRemark").on('input', function () {
        preventSpecialCharacters(this);
    });

    $("#txtHAWBNo").on('input', function () {
        preventSpecialCharacters(this);
    });

    $("#ddlHAWBList").change(function () {
        _vlaueofHawb = $('option:selected', this).val();
        _textofHawb = $('option:selected', this).text();

        // ASI(_vlaueofHawb);
        $("#txtBinnPkgs").val(_vlaueofHawb);
        //$("#txtReceived").val(Received);
        //$("#txtRemaining").val(Remaining);

        _InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
        _GetBinningLocPkgDetails(_InputXML);

        _InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO>" + _textofHawb + "</HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>I</EventType></Root>"
        getIGMNoList(_InputXML);

        $(".ibiSuccessMsg1").text('');
    });

    //$("#tblLocation").on('click', function () {
    //    var $item = $(this).closest("tr").find('td');
    //    console.log($item);
    //})



    $('#txtScanMAWB').keypress(function (event) {
        $("#txtHAWBNo").val('');
        $("#ddlActivity").val('0');
        $("#txtRemark").val('');
        $("#divRemarkDetail").empty();
        $('#remarkPriority').prop("checked", false);
        $(".ibiSuccessMsg").text('');
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtScanMAWB").val() == '') {
                HideLoader();
                errmsg = "Please enter MAWB No.</br>";
                $.alert(errmsg);
                return;

            }
            //if ($("#ddlActivity").val() == '0') {
            //    HideLoader();
            //    errmsg = "Please select Activity</br>";
            //    $.alert(errmsg);
            //    return;
            //}
            //if ($("#txtRemark").val() == '') {
            //    HideLoader();
            //    errmsg = "Please enter Remark</br>";
            //    $.alert(errmsg);
            //    return;
            //}

            prifix = $("#txtScanMAWB").val().slice(0, 3);
            AWBNo = $("#txtScanMAWB").val().slice(3, 11);
            //InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"

            if ($('#txtHAWBNo').val() != '') {
                InputXML = "<Root><AWBPrefix>" + prifix + "</AWBPrefix><AWBNumber>" + AWBNo + ',' + $('#txtHAWBNo').val() + "</AWBNumber><UserId>" + Userid + "</UserId></Root>";

            } else {
                InputXML = "<Root><AWBPrefix>" + prifix + "</AWBPrefix><AWBNumber>" + AWBNo + "</AWBNumber><UserId>" + Userid + "</UserId></Root>";

            }


            AWBRemarkGet(InputXML);

        }

        event.stopPropagation();
    });

    $('#txtHAWBNo').keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtScanMAWB").val() == '') {
                HideLoader();
                errmsg = "Please enter MAWB No.</br>";
                $.alert(errmsg);
                return;

            }
            //if ($("#ddlActivity").val() == '0') {
            //    HideLoader();
            //    errmsg = "Please select Activity</br>";
            //    $.alert(errmsg);
            //    return;
            //}
            //if ($("#txtRemark").val() == '') {
            //    HideLoader();
            //    errmsg = "Please enter Remark</br>";
            //    $.alert(errmsg);
            //    return;
            //}

            prifix = $("#txtScanMAWB").val().slice(0, 3);
            AWBNo = $("#txtScanMAWB").val().slice(3, 11);
            //InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"

            if ($('#txtHAWBNo').val() != '') {
                InputXML = "<Root><AWBPrefix>" + prifix + "</AWBPrefix><AWBNumber>" + AWBNo + ',' + $('#txtHAWBNo').val() + "</AWBNumber><UserId>" + Userid + "</UserId></Root>";

            } else {
                InputXML = "<Root><AWBPrefix>" + prifix + "</AWBPrefix><AWBNumber>" + AWBNo + "</AWBNumber><UserId>" + Userid + "</UserId></Root>";

            }

            AWBRemarkGet(InputXML);

        }

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
        case "Turkish":
            setTurkish();
            break;
    }

});


function setTurkish() {
    $('#lblIntlMove').text("İç hareket");
    $('#lblMAwbNo').text("Ana Konsimento");
    $('#lblbHWABNo').text("Ara Konsimento No");
    $('#lblFltChk').text("Ucus Detayları");
    $('#lblFromLocPcs').text("Nerden / Parca");
    $('#lblNewLoc').text("Yeni Lokasyon");
    $('#lblMovePcs').text("Paketleri Tasi");
    $('#lblOri').text("Cikis/Varis");
    $('#btnExit').text("Çıkış");
    $('#btnClear').text("Temizle");
    $('#btnSubmit').text("Gönder");
    $('#lblOrgDest').text("Származási hely / Végállomás");
}

function AWBRemarkReferenceDataGet() {
    $.ajax({
        type: 'POST',
        url: ExpURL + "/AWBRemarkReferenceDataGet",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            // console.log(response.d);
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#ddlActivity").empty();
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                    } else {
                        $(".ibiSuccessMsg").text('');
                    }
                    //else if (Status == 'S') {
                    //    //   $("#btnSubmit").removeAttr('disabled');
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                    //} else {
                    //    $(".ibiSuccessMsg1").text('');
                    //}
                    var Identifier = $(this).find('Identifier').text();
                    var Description = $(this).find('Description').text();
                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlActivity');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(Identifier).text(Description);
                    newOption.appendTo('#ddlActivity');

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

function chack11() {
    if ($('#txtScanMAWB').val() == '') {
        return;
    }
    if ($('#txtScanMAWB').val().length != '11') {
        $('#txtScanMAWB').val('');
        errmsg = "Please enter valid 11 digit AWB No.</br>";
        $.alert(errmsg);

        return;
    }
}


function setHungarian() {

    $('#lblIntlMove').text("Átlokálás");
    $('#lblMAwbNo').text("Főfuvarlevél szám");
    $('#lblbHWABNo').text("Házi  fuvarlevél szám");
    $('#lblFltChk').text("Járat szám / dátum");
    $('#btnExit').text("Kilépés");
    $('#btnClear').text("Törlés");
    $('#btnSubmit').text("Jóváhagyás");
    $('#lblFromLocPcs').text("Lokációból / darab");
    $('#lblNewLoc').text("Új lokáció");
    $('#lblMovePcs').text("Darabok átrakása");

    $('#lblLoc1').text("Darabszám");
    $('#lblPcs').text("Lokáció");
    $('#lblOrgDest').text("Cikis/Varis");


}

AWBRemarkGet = function (InputXML) {

    $("#ddlHAWBList").text('');
    $.ajax({
        type: 'POST',
        url: ExpURL + "/AWBRemarkGet",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            //debugger;
            $("body").mLoading('hide');
            response = response.d;
            //var str = response.d;
            var xmlDoc = $.parseXML(response);

            //$('#divVCTDetail').html('');
            //$('#divVCTDetail').empty();
            console.log(xmlDoc);
            $(xmlDoc).find('Table').each(function () {
                Status = $(this).find('Status').text();
                StrMessage = $(this).find('StrMessage').text();
                if (Status == 'E') {
                    $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                } else {
                    // $(".ibiSuccessMsg").text('');
                }


            });

            if (response != null && response != "") {
                $('#divRemarkDetail').empty();

                html = '';

                html += '<table id="tblDimentionAcceptance" class="table  table-bordered table-striped mb-0" style="border: 1px solid #eee;">';
                html += '<thead class="theadClass">';
                html += '<tr>';
                html += '<th id="lblRemark">Activity</th>';
                html += '<th id="lbRemark">Remark</th>';
                html += '<th id="lbRemark">Edit</th>';
                html += '<th id="lbRemark">Delete</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody class="">';

                var xmlDoc = $.parseXML(response);
                var flag = '0';
                $(xmlDoc).find('Table').each(function (index) {
                    $('#lblMessage').text('');

                    flag = '1';

                    RowId = $(this).find('RowId').text();
                    ActivityType = $(this).find('ActivityType').text();
                    Remark = $(this).find('Remark').text();
                    CreatedBy = $(this).find('CreatedBy').text();
                    CreatedOn = $(this).find('CreatedOn').text();
                    RightsToEdit = $(this).find('RightsToEdit').text();
                    FontColor = $(this).find('FontColor').text();
                    HighPriority = $(this).find('HighPriority').text();


                    RemarkListDetails(RowId, ActivityType, Remark, FontColor, HighPriority);
                });
                html += "</tbody></table>";
                $('#divRemarkDetail').append(html);



            } else {
                errmsg = 'VCT No. does not exists.';
                $.alert(errmsg);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            // alert('Server not responding...');
        }
    });
}

function RemarkListDetails(RowId, ActivityType, Remark, FontColor, HighPriority) {

    html += '<tr id="row1 ' + RowId + '">';
    html += '<td id="ActivityType' + RowId + '">' + ActivityType + '</td>';
    html += '<td id="Remark' + RowId + '" style="color: ' + FontColor + ';">' + Remark + '</td>';
    html += '<td id="fnPencil' + RowId + '" onclick="edit_row(\'' + RowId + '\',\'' + ActivityType + '\',\'' + Remark + '\',\'' + HighPriority + '\');" style="padding: 2px;" align="center" id="pencil"><button type="button"  id="btnAdd" class="btn btn--icon login__block__btn login__block__btn_margin"><i class="zmdi zmdi-edit"></i></button></td>';
    html += '<td onclick="AWBRemarkDelete(\'' + RowId + '\')" style="padding: 2px;" align="center"><button type="button" onclick="removeRow();" id="btnAdd" class="btn btn--icon login__block__btn login__block__btn_margin Delete"><i class="zmdi zmdi-delete"></i></button></td>';
    html += '</tr>';

    //html += '<tr id="row1 ' + RowId + '">';

    //html += '<td id="ActivityType' + RowId + '"><input id="txtActType' + RowId + '" class="textfieldClass" type="text" value="' + ActivityType + '" disabled="disabled"></td>';
    //html += '<td id="Remark' + RowId + '"><input id="txtxRem' + RowId + '" class="textfieldClass" type="text" value="' + Remark + '" disabled="disabled" style="color: ' + FontColor + ';"></td>';
    //html += '<td id="fnPencil' + RowId + '" onclick="edit_row(\'' + RowId + '\',\'' + ActivityType + '\',\'' + Remark + '\',\'' + HighPriority + '\');" style="padding: 2px;" align="center" id="pencil"><span  class="zmdi zmdi-edit"></span></td>';
    //// html += '<td id="fnPencil' + RowId + '" onclick="edit_row(' + RowId + ',\'' + 'E' + '\');hideShow(' + RowId + ',\'' + 'E' + '\');" style="padding: 2px;" align="center" id="pencil"><span  class="zmdi zmdi-edit"></span></td>';
    //// html += '<td id="fnSaveFile' + RowId + '" onclick="edit_row(' + RowId + ',\'' + 'S' + '\');hideShow(' + RowId + ',\'' + 'S' + '\');" style="padding: 2px;display:none;" align="center" id="file-save"><span  class="zmdi zmdi-save"></span></td>';
    ////html += '<td  style="padding: 2px;" align="center"  ><button type="button" onclick="edit_row(' + RowId + ');" id="fnPencil' + RowId + '" class="btn btn--icon login__block__btn login__block__btn_margin edit"><i class="zmdi zmdi-edit"></button></td>';
    ////html += '<td  onclick="SaveDimentionGrigValue(this);" style="padding: 2px;display:none;" align="center" ><button type="button" onclick="edit_row(' + RowId + ');" id="fnSaveFile' + RowId + '" class="btn btn--icon login__block__btn login__block__btn_margin edit"><i class="zmdi zmdi-save"></button></td>';

    //html += '<td onclick="AWBRemarkSaveUpdate(\'' + RowId + '\')" style="padding: 2px;" align="center"><button type="button" onclick="removeRow();" id="btnAdd" class="btn btn--icon login__block__btn login__block__btn_margin Delete"><i class="zmdi zmdi-delete"></i></button></td>';
    //html += '</tr>';
}
function hideShow(prm, isEdit) {

    if (isEdit == 'E') {
        $('#fnPencil' + prm).hide();
        $('#fnSaveFile' + prm).show();
    } else {
        $('#fnPencil' + prm).show();
        $('#fnSaveFile' + prm).hide();
    }
}

function SaveDimentionGrigValue() {
    //$("#fnPencil" + prm + "").show();
    //$("#fnSaveFile" + prm + "").hide();
}
function edit_row(RowId, ActivityType, Remark, HighPriority) {

    //if (isEdit == 'E') {
    //    $('#txtActType' + no).removeAttr('disabled');
    //    $('#txtxRem' + no).removeAttr('disabled');
    //} else {
    //    $('#txtActType' + no).attr('disabled', 'disabled');
    //    $('#txtxRem' + no).attr('disabled', 'disabled');
    //}

    // $("#txtScanMAWB").attr('disabled', 'disabled');
    $("#txtHAWBNo").val();
    // $("#ddlActivity").val(ActivityType);
    $("#txtRemark").val(Remark);
    if (HighPriority == '1') {
        $('#remarkPriority').prop("checked", true);
    } else {
        $('#remarkPriority').prop("checked", false);
    }
    console.log(ActivityType);
    //$("#ddlActivity option").prop("selected", ActivityType);
    // $("#ddlActivity").val(ActivityType).attr("selected", "selected");
    // $("#ddlActivity option:contains(" + ActivityType + ")").removeAttr('selected');
   // $("#ddlActivity option:contains(" + ActivityType + ")").attr('selected', 'selected');
//    $("#ddlActivity option:contains('Select')").remove();
   $("#ddlActivity option").each(function(){
        if($(this).text()===ActivityType){
            $(this).prop("selected",true);
        }
   });
    _RemarkId = RowId;
}

function save_row(no) {
    var name_val = document.getElementById("name_text" + no).value;
    var country_val = document.getElementById("country_text" + no).value;
    var age_val = document.getElementById("age_text" + no).value;

    document.getElementById("name_row" + no).innerHTML = name_val;
    document.getElementById("country_row" + no).innerHTML = country_val;
    document.getElementById("age_row" + no).innerHTML = age_val;

    document.getElementById("edit_button" + no).style.display = "block";
    document.getElementById("save_button" + no).style.display = "none";
}

function delete_row(no) {
    document.getElementById("row" + no + "").outerHTML = "";
}

function AWBRemarkSaveUpdate() {
    $('body').mLoading({
        text: "Please Wait..",
    });

    if ($("#txtScanMAWB").val() == '') {
        HideLoader();
        errmsg = "Please enter MAWB No.</br>";
        $.alert(errmsg);
        return;

    }
    if ($("#ddlActivity").val() == '0') {
        HideLoader();
        errmsg = "Please select Activity</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtRemark").val() == '') {
        HideLoader();
        errmsg = "Please enter Remark</br>";
        $.alert(errmsg);
        return;
    }
    if ($("#txtRemark").val() == '') {
        HideLoader();
        errmsg = "Please enter Remark</br>";
        $.alert(errmsg);
        return;
    }
  

    var prifix = $("#txtScanMAWB").val().slice(0, 3);
    var AWBNo = $("#txtScanMAWB").val().slice(3, 11);
    if (document.getElementById('remarkPriority').checked) {
        IsRemPrio = '1';
    }
    else {
        IsRemPrio = '0';
    }

    if (Is_I_E == 'I') {
        RefMenuCode = 'I';
    }
    else {
        RefMenuCode = 'E';
    }
    if (Is_I_E == 'C') {
        RefMenuCode = 'I';
    }

    if ($('#txtHAWBNo').val() != '') {
        var InputXML = '<Root><RemarkId>' + _RemarkId + '</RemarkId><AWBPrefix>' + prifix + '</AWBPrefix><AWBNumber>' + AWBNo + ',' + $('#txtHAWBNo').val() + '</AWBNumber><Remark>' + $('#txtRemark').val() + '</Remark><HighPriority>' + IsRemPrio + '</HighPriority><ActivityType>' + $('#ddlActivity').val() + '</ActivityType><RefMenuCode>' + RefMenuCode + '</RefMenuCode><UserId>' + Userid + '</UserId></Root >';

    } else {
        var InputXML = '<Root><RemarkId>' + _RemarkId + '</RemarkId><AWBPrefix>' + prifix + '</AWBPrefix><AWBNumber>' + AWBNo + '</AWBNumber><Remark>' + $('#txtRemark').val() + '</Remark><HighPriority>' + IsRemPrio + '</HighPriority><ActivityType>' + $('#ddlActivity').val() + '</ActivityType><RefMenuCode>' + RefMenuCode + '</RefMenuCode><UserId>' + Userid + '</UserId></Root >';

    }


    $.ajax({
        type: 'POST',
        url: ExpURL + "/AWBRemarkSaveUpdate",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            //console.log(response.d)
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {

                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        prifix = $("#txtScanMAWB").val().slice(0, 3);
                        AWBNo = $("#txtScanMAWB").val().slice(3, 11);
                        //InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
                       

                        //$("#txtHAWBNo").val('');
                        $("#ddlActivity").val('0');
                        $("#txtRemark").val('');
                        $('#remarkPriority').prop("checked", false);
                 

                        if ($('#txtHAWBNo').val() != '') {
                            InputXML = "<Root><AWBPrefix>" + prifix + "</AWBPrefix><AWBNumber>" + AWBNo + ',' + $('#txtHAWBNo').val() + "</AWBNumber><UserId>" + Userid + "</UserId></Root>";
                            AWBRemarkGet(InputXML);
                        } else {
                            InputXML = "<Root><AWBPrefix>" + prifix + "</AWBPrefix><AWBNumber>" + AWBNo + "</AWBNumber><UserId>" + Userid + "</UserId></Root>";
                            AWBRemarkGet(InputXML);
                        }
                        
                    }
                });
                _RemarkId = '0';

            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            //alert('Server not responding...');
        }
    });

}


function AWBRemarkDelete(rowid) {
    $('body').mLoading({
        text: "Please Wait..",
    });

    var InputXML = '<Root><RemarkId>' + rowid + '</RemarkId><UserId>' + Userid + '</UserId></Root>';

    $.ajax({
        type: 'POST',
        url: ExpURL + "/AWBRemarkDelete",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            //console.log(response.d)
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {

                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        prifix = $("#txtScanMAWB").val().slice(0, 3);
                        AWBNo = $("#txtScanMAWB").val().slice(3, 11);
                        //InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
                        InputXML = "<Root><AWBPrefix>" + prifix + "</AWBPrefix><AWBNumber>" + AWBNo + "</AWBNumber><UserId>" + Userid + "</UserId></Root>"
                        AWBRemarkGet(InputXML);

                        $("#txtHAWBNo").val('');
                        $("#ddlActivity").val('0');
                        $("#txtRemark").val('');
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
            //alert('Server not responding...');
        }
    });

}



function getDetailsbyFilghtChangeEvent(IGMVal) {

    inputData = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + IGMVal + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
    $("#tblLocation").empty();

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetBinningLocPkgDetails",
        data: JSON.stringify({ 'InputXML': inputData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            //console.log(response.d)
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                $("#tblLocation").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    //Status = $(this).find('Status').text();
                    //StrMessage = $(this).find('StrMessage').text();
                    //if (Status == 'E') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    //} else if (Status == 'S') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    //}
                });
                $("#tblLocation").empty();
                $(xmlDoc).find('Table1').each(function (index) {
                    Origin = $(this).find('Origin').text();
                    Destination = $(this).find('Destination').text();
                    Commodity = $(this).find('Commodity').text();
                    LocId = $(this).find('LocId').text();
                    LocPieces = $(this).find('LocPieces').text();
                    PendingPieces = $(this).find('PendingPieces').text();
                    LocCode = $(this).find('LocCode').text();
                    LocationStatus = $(this).find('LocationStatus').text();
                    TotalPieces = $(this).find('TotalPieces').text();

                    //$("#txtBinnPkgs").val(PendingPieces);
                    //$("#txtLocation").text(LocPieces);
                    $("#spnOriginDist").text(Origin + ' / ' + Destination);
                    $("#spnCommodity").text(Commodity);
                    $("#spnBinnTotPkgs").text(LocationStatus);

                    if (LocCode != '') {
                        $("#LocationDiv").show();
                        //

                        $('<tr></tr>').html('<td class="text-left">' + LocCode + '</td><td style="text-align:right;">' + LocPieces + '</td>').appendTo('#tblLocation');

                        //$("#spnlocationName").text(LocCode);
                        //$("#spnlocationPackgs").text(LocPieces);
                    } else {
                        $("#LocationDiv").hide();
                        //$("#spnlocationName").text('');
                        //$("#spnlocationPackgs").text('');
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
            //alert('Server not responding...');
        }
    });
}

function ASI(_vlaueofHawb) {

    var array = _vlaueofHawb.split(",");

    for (i = 0; i < array.length; i++) {
        if (i == 0) {
            $("#txtManifested").val(array[i]);
        }
        else if (i == 1) {
            $("#txtReceived").val(array[i]);
        }
        else if (i == 2) {
            $("#txtRemaining").val(array[i]);
        }
    }
}

function openScanner() {
    //var ScanCode = $('#txtScanMAWB').val();
    //if (ScanCode.length >= 11) {
    //    $('body').mLoading({
    //        text: "Please Wait..",
    //    });
    //    InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    //    getHWABNoList(InputXML);
    //}

    if (($("#txtScanMAWB").val() == '')) {

        return;
    }

    if (($("#txtScanMAWB").val().length != 11)) {
        errmsg = "Please enter valid AWB No.</br>";
        $("#txtScanMAWB").val('');
        $.alert(errmsg);
        return;
    }

    InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    getHWABNoList(InputXML);
}

//function openScanner() {
//    cordova.plugins.barcodeScanner.scan(
//    function (result) {
//        barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
//        if (!result.cancelled) {
//            $('body').mLoading({
//                text: "Please Wait..",
//            });
//            $("#txtScanMAWB").val(barCodeResule)
//            if ($("#txtScanMAWB").val() == '') {
//                $("body").mLoading('hide');
//                errmsg = "Please enter AWB No.</br>";
//                $.alert(errmsg);
//                return;
//            } else {
//                InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
//                // console.log(inputxml)
//                getHWABNoList(InputXML);
//            }
//        }
//        else {
//            alert("You have cancelled scan");
//            $("#txtScanMAWB").focus();

//        }
//    },
//    function (error) {
//        // alert("Scanning failed: " + error);
//    },
//    {
//        preferFrontCamera: false, // iOS and Android
//        showFlipCameraButton: true, // iOS and Android
//        showTorchButton: true, // iOS and Android
//        torchOn: true, // Android, launch with the torch switched on (if available)
//        saveHistory: true, // Android, save scan history (default false)
//        prompt: "Place a barcode inside the scan area", // Android
//        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
//        formats: "CODE_128,QR_CODE,PDF_417,QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,PDF417,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
//        orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
//        disableAnimations: true, // iOS
//        disableSuccessBeep: false // iOS
//    }
// );
//}

function Imp_GetHAWBIGMNumbersForMAWBNumber() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    if ($("#txtScanMAWB").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    } else {
        InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
        // console.log(inputxml)
        getHWABNoList(InputXML);
    }
}




getIGMNoList = function (InputXML) {
    $("#ddlFlightNoandDate").text('');
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetHAWBIGMNumbersForMAWBNumber",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            //console.log(response.d)
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    var Process = $(this).find('Process').text();
                    var IGMNo = $(this).find('IGMNo').text();
                    var FlightDetails = $(this).find('FlightDetails').text();
                    _IGMNo = $(this).find('Process').text();


                    var newOption = $('<option></option>');
                    newOption.val(_IGMNo).text(FlightDetails);
                    newOption.appendTo('#ddlFlightNoandDate');



                });
                _InputXML = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo>" + _textofHawb + "</HouseNo><IGMNo>" + $('#ddlFlightNoandDate').val() + "</IGMNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
                _GetBinningLocPkgDetails(_InputXML);

            } else {
                $("body").mLoading('hide');
                errmsg = "WDO No. not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            /// alert('Server not responding...');
        }
    });
}



_GetBinningLocPkgDetails = function (InputXML) {
    //console.log(InputXML)
    $("#tblLocation").empty();
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetBinningLocPkgDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            //console.log(response.d)
            var str = response.d;

            $("#tblLocation").empty();
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    //Status = $(this).find('Status').text();
                    //StrMessage = $(this).find('StrMessage').text();
                    //if (Status == 'E') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    //} else if (Status == 'S') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    //}
                });
                $(xmlDoc).find('Table1').each(function (index) {
                    Origin = $(this).find('Origin').text();
                    Destination = $(this).find('Destination').text();
                    Commodity = $(this).find('Commodity').text();
                    LocId = $(this).find('LocId').text();
                    LocPieces = $(this).find('LocPieces').text();
                    PendingPieces = $(this).find('PendingPieces').text();
                    LocCode = $(this).find('LocCode').text();
                    LocationStatus = $(this).find('LocationStatus').text();
                    TotalPieces = $(this).find('TotalPieces').text();

                    $("#txtBinnPkgs").val(PendingPieces);
                    //$("#txtLocation").text(LocPieces);
                    $("#spnOriginDist").text(Origin + ' / ' + Destination);
                    $("#spnCommodity").text(Commodity);
                    $("#spnBinnTotPkgs").text(LocationStatus);
                    var sum = LocCode + LocPieces;
                    if (LocCode != '') {
                        $("#LocationDiv").show();

                        $('<tr class="valp"></tr>').html('<td class="text-left .tdVal"  >' + LocCode + '</td><td style="text-align:right;">' + LocPieces + '</td><td style="display:none;">' + LocId + '</td>').appendTo('#tblLocation');
                        //$('<tr></tr>').html('<td class="text-left tdVal">' + LocCode + '</td><td>' + LocPieces + '</td>').appendTo('#tblLocation');

                        //$("#spnlocationName").text(LocCode);
                        //$("#spnlocationPackgs").text(LocPieces);
                    } else {
                        $("#LocationDiv").hide();
                        //$("#spnlocationName").text('');
                        //$("#spnlocationPackgs").text('');
                    }

                });
                $("#tblLocation").on('click', '.valp', function () {
                    // get the current row
                    var currentRow = $(this).closest("tr");

                    var col1 = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                    var col2 = currentRow.find("td:eq(1)").text(); // get current row 2nd TD
                    var col3 = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
                    //  var col3 = currentRow.find("td:eq(2)").text(); // get current row 3rd TD
                    var data = col1 + "/" + col2 + "/" + col3;

                    getLocation(data);
                    $('#txtLocation').focus();

                    var selected = $(this).hasClass("highlight");
                    $("#tblLocation tr").removeClass("highlight");
                    if (!selected)
                        $(this).addClass("highlight");
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
            //alert('Server not responding...');
        }
    });
}

function getLocation(data) {
    var str = data;
    var rest = str.substring(0, str.lastIndexOf("/"));
    currentLocID = str.substring(str.lastIndexOf("/") + 1, str.length);
    $("#locationShow").text(rest);
}



function exitFunction() {
    if (Is_I_E == 'I') {
        window.location.href = 'ImportOperations.html';
    } else if (Is_I_E == 'E') {
        window.location.href = 'ExportOperations.html';
    } else if (Is_I_E == 'C') {
        window.location.href = 'Courier.html';
    }

}

function clearFunction() {
    $("#txtScanMAWB").val('');
    $("#txtHAWBNo").val('');
    $("#ddlActivity").val('0');
  
    $("#txtRemark").val('');
    $("#divRemarkDetail").empty();
    $('#remarkPriority').prop("checked", false);
    $(".ibiSuccessMsg").text('');
}


//FillGrid = function (response) {
//    var obj = JSON.parse(response.d);

//    var count = 0;
//    var row = '';
//    if (obj.length > 0) {
//        $.each(obj, function (i, d) {
//            row += '<tr>';
//            row += '<td><span id="spnlocationName"></span></td>';
//            row += '<td class="text-right"><span id="spnlocationPackgs"></span></td>';
//            row += '</tr>';
//            count++;
//        });
//        $("#tblLocation").html(row);
//    }
//}

