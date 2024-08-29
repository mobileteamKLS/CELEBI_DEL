var ID = window.localStorage.getItem("ID");
var VCTNo = window.localStorage.getItem("VCTNo");
var VCTId = window.localStorage.getItem("VCTId");
var IsSecured = window.localStorage.getItem("IsSecured");
var EventType = window.localStorage.getItem("EventType");
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
var REM = window.localStorage.getItem("REM");
var _vlaueofRemPakgs = '';
var txtScannedNo = window.localStorage.getItem("txtScannedNo");
var txtVCTNo = window.localStorage.getItem("txtVCTNo");
var language = window.localStorage.getItem("Language");
var doorOption = window.localStorage.getItem("doorOption");
var counter = 1;
var HAWBNo;
var RemainingPkg;
var RemainingWt;
var WtUOM;
var IsSecured;
var REFERENCE_DESCRIPTION;
var REFERENCE_DATA_IDENTIFIER;
var REFERENCE_NUMBER_1;
var _xmlDocTable;
var REFERENCE = '0';
var IDENTIFIER = '-1';
var nextValue;
var inputRows;
var ConsignmentRowID;
var DocumentNo;
var IsSecuredTF;
var selectTestHaWB = 'select';
var _vlaueofTrolleytext;
var IsBaggage;
var MawbNo;
var HawbNo;
var isVCTNo = localStorage.getItem('isVCTNo');
var _XmlForSHCCode;
var joinAllValuesWithComma = '';
var allSHCCodeSave = '';
$(function () {

    if (txtScannedNo != '') {
        $("#txtScanAWB").val(txtScannedNo);

    }

    $("#btnOpenSHCModal").click(function () {
        $("#spnValdatemsg").text('');
        SHCCodePopupField();

    });


    $('#txtScanAWB').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var inputxmlAWB = "<Root><VCTNo>" + VCTNo + "</VCTNo><AWBId>" + $("#txtScanAWB").val() + "</AWBId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
            GetVCTUnScannedAWBDetails(inputxmlAWB);
        }
        event.stopPropagation();
    });

    //$('#txtGroupId').keypress(function (event) {
    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        $('#txPieces').focus();
    //    }
    //    event.stopPropagation();
    //});

    //$('#txPieces').keypress(function (event) {
    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        $('#txtScaleWt').focus();
    //    }
    //    event.stopPropagation();
    //});

    //$('#add').click(function () {
    //    var table = $(this).closest('table');
    //    if (table.find('input:text').length < 7) {
    //        //table.append('<tr><td style="width:200px;" align="right">Name <td> <input type="text" id="current Name" value="" /> </td></tr>');
    //        table.append("<td><input class=textpackges' id='textpackges1' type='text' /></td><td><input class='textpackges' id='textpackges2' type='text' /></td><td><input class='textpackges' id='textpackges3' type='text' /></td><td><input class='textpackges' id='textpackges4' type='text' /></td><td><button type='button' id='btnAdd' style='background-color: red;' class='btn btn--icon login__block__btn login__block__btn_margin'><i class='zmdi zmdi-minus'></i></button></td>");
    //    }
    //});
    //$('#del').click(function () {
    //    var table = $(this).closest('table');
    //    if (table.find('input:text').length > 1) {
    //        table.find('input:text').last().closest('tr').remove();
    //    }
    //});


    var $input;
    var formElements = new Array();
    $("#addButton").click(function () {
        var firstTextBox = parseInt($("#Pieces1").val())
        var CurrSumDImPcs = 0;
        var j = 0
        $("#TextBoxDiv1m").show();
        $('#TextBoxesGroup').find('input').each(function (i, input) {
            $input = $(input);
            $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
            formElements.push($input.val());
            if ($(input).attr('id') == "Pieces" + parseInt(j + 1)) {
                CurrSumDImPcs = CurrSumDImPcs + parseInt($input.val());
                j++;
            }
        });
        if ($input.val() == '') {
            $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
        } else {


            if ($('#txPieces').val() == CurrSumDImPcs) {
                errmsg = "Sum of packages are equal to entered packages.</br>";
                $.alert(errmsg);
                return;

            } else if (CurrSumDImPcs < $('#txPieces').val()) {

                nextValue = $('#txPieces').val() - CurrSumDImPcs;
                //$(this).find('HAWBNo').text();

                //var ids = [];
                //$('#TextBoxesGroup tr').each(function () {
                //    ids.push($(this).find('td:first-child input[type="text"]').attr('id'));
                //    console.log(ids)
                //})
                //$("#textpackges1").val(nextValue)
                dynamicTrCreate(nextValue);
            }
            else if (CurrSumDImPcs > $('#txPieces').val()) {
                errmsg = "Sum of dim packages are greater than remaining packages.</br>";
                $.alert(errmsg);
                return;
            }

        }

    });

    //var $input;
    //var formElements = new Array();
    //$("#addButton").click(function () {
    //    var firstTextBox = parseInt($("#Pieces1").val())
    //    $('#TextBoxesGroup').find('input').each(function (i, input) {
    //        $input = $(input);
    //        // $input.css('background-color', $input.val() ? 'green' : 'red');
    //        formElements.push($input.val());
    //    });
    //    //if ($input.val() == '') {
    //    //    $input.css('background-color', $input.val() ? 'green' : 'red');
    //    //} else {
    //    if (RemainingPkg == $("#Pieces1").val()) {
    //        errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
    //        $.alert(errmsg);
    //        return;

    //    } else if (firstTextBox < RemainingPkg) {

    //        nextValue = RemainingPkg - $("#Pieces1").val();
    //        $(this).find('HAWBNo').text();

    //        //var ids = [];
    //        //$('#TextBoxesGroup tr').each(function () {
    //        //    ids.push($(this).find('td:first-child input[type="text"]').attr('id'));
    //        //    console.log(ids)
    //        //})
    //        //$("#textpackges1").val(nextValue)
    //        dynamicTrCreate();
    //    }

    //    //}

    //});

    //$("#removeButton").click(function () {


    //});

    //$("#getButtonValue").click(function () {

    //    inputRows = "";
    //    $('#TextBoxesGroup tr').each(function () {

    //        inputRows += "<Rows>"
    //        $(this).find("input").each(function () {

    //            ItemCode = $(this).val();
    //            var id = $(this).attr('id');

    //            if (id.toString().indexOf('Pieces') != -1) {
    //                inputRows += "<Pieces>" + ItemCode + "</Pieces>"
    //            }
    //            else if (id.toString().indexOf('Length') != -1) {
    //                inputRows += "<Length>" + ItemCode + "</Length>"
    //            }
    //            else if (id.toString().indexOf('Width') != -1) {
    //                inputRows += "<Width>" + ItemCode + "</Width>"
    //            }
    //            else if (id.toString().indexOf('Height') != -1) {
    //                inputRows += "<Height>" + ItemCode + "</Height>";
    //            }
    //        });
    //        inputRows += "</Rows>";
    //    });
    //   // inputRows = "<Rows><Pieces>" + $("#textpackges").val() + "</Pieces><Length>1</Length><Width>1</Width><Height>2</Height></Rows>";
    //});


    $("#backPage").click(function () {
        window.location.href = 'EXP_VCTAcceptance.html';
        localStorage.setItem('flag', '1');
    });


    $("#btnBack").click(function () {
        localStorage.setItem('flag', '1');
        localStorage.setItem('doorOptionforback', doorOption);

        window.location.href = 'EXP_VCTAcceptance.html';
    });


    inputxml = "<Root><VCTNo>" + VCTNo + "</VCTNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
    GetVCTUnScannedDetails(inputxml);
    $("#VCTNo").text(VCTNo.toUpperCase()).css('color', 'red');

    // inputxml = "<Root><VCTNo>" + VCTNo + "</VCTNo><AWBId>"+AWBId+"</AWBId><AirportCity>" + AirportCity + "</AirportCity><Culture>" + language + "</Culture><UserId>" + UserId + "</UserId></Root>";


    $("#ddlEquTrolley").change(function () {
        //_vlaueofTrolley = $('option:selected', this).val();
        //_vlaueofTrolleytext = $('option:selected', this).text();

        //REFERENCE = _vlaueofTrolley.split(",")[0]
        //IDENTIFIER = _vlaueofTrolley.split(",")[1]

        //var a = parseFloat($("#txtScaleWt").val());
        //var b = parseFloat(REFERENCE);
        //var x = (b - a).toFixed(2);
        //if (x == "NaN") {
        //    x = '';
        //} else {
        //    //var netWeight = parseInt($("#txtScaleWt").val()) - parseInt(REFERENCE)
        //    $("#NetWt").text(x);
        //    $('#TareWt').text(REFERENCE);
        //}

        _vlaueofTrolley = $('option:selected', this).val();
        _vlaueofTrolleytext = $('option:selected', this).text();

        REFERENCE = _vlaueofTrolley.split(",")[0]
        IDENTIFIER = _vlaueofTrolley.split(",")[1]

        var a = parseFloat($("#txtScaleWt").val());
        var b = parseFloat(REFERENCE);
        var x = (a - b).toFixed(2);
        if (x == "NaN") {
            x = '';
        } else {
            //var netWeight = parseInt($("#txtScaleWt").val()) - parseInt(REFERENCE)
            $("#NetWt").text(x);
            $('#TareWt').text(REFERENCE);
        }

    });

    $("#ddlHAWBNo").change(function () {
        allSHCCodeSave = '';
        joinAllValuesWithComma = '';
        $('#dvRemarkShow').empty();
        $("#txtGroupId").val('');
        $("#txPieces").val('');
        $("#txtScaleWt").val('');
        $("#ddlEquTrolley").val('0,-1');

        $("#Pieces1").val('');
        $("#Length1").val('');
        $("#Width1").val('');
        $("#Height1").val('');

        $("#TareWt").text('');
        $("#NetWt").text('');
        $("#ddlComCode").val('0');
        $("#txtNOG").val('');
        $("#SHCCodeTbl").empty();
        if ($("#ddlMAWBNo").val() == '0') {
            return;
        }
        $("#dvForEditBtn").hide();

        $("#txtGroupId").focus();

        _vlaueofRemPakgs = $('option:selected', this).val();
        selectTestHaWB = $('option:selected', this).text();
        ConsignmentRowID = $('option:selected', this).val();
        $(_xmlDocTable).find('Table1').each(function (index) {
            if ($(this).find('ConsignmentRowID').text() == ConsignmentRowID) {

                RemainingPkg = $(this).find('RemainingPkg').text();
                RemainingWt = $(this).find('RemainingWt').text();
                WtUOM = $(this).find('WtUOM').text();
                IsSecured = $(this).find('IsSecured').text();
                HAWBNo = $(this).find('HAWBNo').text();
                NOG = $(this).find('NOG').text();
                CommSrNo = $(this).find('CommSrNo').text();
                IsBaggage = $(this).find('IsBaggage').text();
                var Remark = '';
                Remark = $(this).find('Remark').text();
                if (Remark != '') {
                    remarkPriority = $(this).find('remarkPriority').text();
                    $('#dvRemarkShow').append(Remark);
                    $('#remarkPriorityShow').modal('show');
                }
                $("#txPieces").val(RemainingPkg);
                $("#txtScaleWt").val(RemainingWt);
                $("#txtNOG").val(NOG);
                $("#ddlComCode").val(CommSrNo);
                //if ($(this).find("HAWBNo").is(':empty')) {
                //    fullHawb = '';
                //}
                //else {

                //    var newOption = $('<option></option>');
                //    newOption.val(HAWBNo).text(HAWBNo);
                //    newOption.appendTo('#ddlHAWBNo');

                //    fullHawb = $('#ddlHAWBNo option').length;
                //}
                SHCAll = $(this).find('SHCAll').text();

                _XmlForSHCCode = SHCAll;
                SHCSpanHtml(SHCAll);
            }
        });
        $("#txtGroupId").focus();
    });

    $("#ddlMAWBNo").change(function () {
        allSHCCodeSave = '';
        joinAllValuesWithComma = '';
        $(".ibiSuccessMsg1").text('');
        $("#ddlHAWBNo").empty();
        $("#dvForEditBtn").hide();
        var newOption = $('<option></option>');
        newOption.val('0').text('Select');
        newOption.appendTo('#ddlHAWBNo');


        $("#txtGroupId").val('');
        $("#txPieces").val('');
        $("#txtScaleWt").val('');
        $("#ddlEquTrolley").val('0,-1');

        $("#Pieces1").val('');
        $("#Length1").val('');
        $("#Width1").val('');
        $("#Height1").val('');

        $("#TareWt").text('');
        $("#NetWt").text('');
        $("#ddlComCode").val('0');
        $("#txtNOG").val('');
        $("#SHCCodeTbl").empty();
        if ($("#ddlMAWBNo").val() == '0') {
            return;
        }

        setHAWBNo();
        $("#txtGroupId").focus();

    });

    // $("#ddlHAWBNo").change(function () {
    // //$("#ddlHAWBNo").empty();

    // //var newOption = $('<option></option>');
    // //newOption.val('0').text('Select');
    // //newOption.appendTo('#ddlHAWBNo');


    // $("#txtGroupId").val('');
    // $("#txPieces").val('');
    // $("#txtScaleWt").val('');
    // $("#ddlEquTrolley").val('0,-1');



    // $("#TareWt").text('');
    // $("#NetWt").text('');

    // //setHAWBNoHAWBNo();
    // $("#txtGroupId").focus();

    // });

    //$("#txtScanAWB").blur(function () {

    //    if ($("#txtScanAWB").val() != '') {
    //        var value = this.value;// parseInt(this.value, 10),

    //        var res = value;//.replace(/(\d{3})/, "$1-")
    //        dd = document.getElementById('ddlMAWBNo'),
    //        index = 0;

    //        $.each(dd.options, function (i) {
    //            console.log(this.text);
    //            if (this.text == res) {
    //                index = i;
    //            }
    //        });

    //        dd.selectedIndex = index; // set selected option

    //        if (dd.selectedIndex == 0) {
    //            errmsg = "Please scan/enter valid AWB No.";
    //            $.alert(errmsg);
    //            // $('#successMsg').text('Please scan/select valid AWB No.').css('color', 'red');

    //            $("#txtGroupId").val('');
    //            $("#txPieces").val('');
    //            $("#txtScaleWt").val('');
    //            $("#ddlEquTrolley").val('0,-1');

    //            $("#Pieces1").val('');
    //            $("#Length1").val('');
    //            $("#Width1").val('');
    //            $("#Height1").val('');
    //            $("#txtScanAWB").val('');

    //            $("#TareWt").text('');
    //            $("#NetWt").text('');

    //            $(".alert_btn_ok").click(function () {
    //                $("#txtScanAWB").focus();
    //            });

    //            return;
    //        }
    //        console.log(dd.selectedIndex);

    //        $('#ddlMAWBNo').trigger('change');
    //        //  $('#hawbLists').focus();

    //        // GetAWBDetailsForULD($('#ddlULDNo').val())
    //    }



    //});

    $("#txtScanHAWB").blur(function () {

        if ($("#txtScanHAWB").val() != '') {
            var value = this.value.toUpperCase();// parseInt(this.value, 10),
            var res = value;//.replace(/(\d{3})/, "$1-")
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
                errmsg = "Please scan/enter valid HAWB No.";
                $.alert(errmsg);
                // $('#successMsg').text('Please scan/select valid AWB No.').css('color', 'red');

                $("#txtGroupId").val('');
                $("#txPieces").val('');
                $("#txtScaleWt").val('');
                $("#ddlEquTrolley").val('0,-1');

                $("#Pieces1").val('');
                $("#Length1").val('');
                $("#Width1").val('');
                $("#Height1").val('');
                $("#txtScanHAWB").val('');

                $("#TareWt").text('');
                $("#NetWt").text('');

                $(".alert_btn_ok").click(function () {
                    $("#txtScanHAWB").focus();
                });

                return;
            }
            console.log(dd.selectedIndex);


            $('#ddlHAWBNo').trigger('change');
            //  $('#ddlMAWBNo').trigger('change');
            //  $('#hawbLists').focus();

            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }



    });


    //  var language = window.localStorage.getItem("Language");

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


    $('#txtGroupId').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#txPieces').focus();
        }
    });

    $('#txPieces').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#txtScaleWt').focus();
        }
    });

    $('#txtScaleWt').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#Pieces1").focus();
        }
    });

    $('#txPieces').blur(function (event) {
        if (IsBaggage != 'Y') {
            if (parseInt($("#txPieces").val()) > parseInt(RemainingPkg)) {
                $("body").mLoading('hide');
                errmsg = "Entered Package(s) " + $("#txPieces").val() + " must be less than or equal to remaining Package(s) " + RemainingPkg + "</br>";
                $.alert(errmsg);
                $(".alert_btn_ok").click(function () {
                    $("#txPieces").focus();
                });
            }
            else
                GetRemainingPackgs();
        }
        else
            GetRemainingPackgs();
    });


});

function SHCCodePopupField() {
    $('#dvSHCCode').empty();
    html = '';
    html += '<table id="tblSHCCode" class="table  table-bordered table-striped mb-0" style="border: 1px solid #eee;">';
    html += '<thead class="theadClass">';
    html += '<tr>';
    html += '<th id="lblRemark">Sr No</th>';
    html += '<th id="lbRemark">SHC Code</th>';

    html += '</tr>';
    html += '</thead>';
    html += '<tbody class="">';
    for (var i = 0; i < 9; i++) {
        html += '<tr id="row1 ' + i + '">';
        html += '<td>' + i + '</td>';
        html += '<td><input type="text" id="txtSHC ' + i + '" class="textfieldClass" placeholder="" style=""></td>';
        html += '</tr>';
    }

    html += "</tbody></table>";
    $('#dvSHCCode').append(html);
}

function setTurkish() {
    //$('#lblPageName').text("Kargo Kabulü");
    $('#VCTNo').text("Barkod Tara");
    $('#lblSecured').text("Güvenli");
    $('#lblMAWBNo').text("AWB'yi Tara");
    $('#lblMAWB').text("Ana Konsimento");
    $('#lblHAWBNo').text("Ara Konsimento No");
    $('#lblGrpId').text("Grup kimliği");
    $('#lblPcsSclWt').text("Parca / Ölçek Ağırlık");
    $('#lblTrolly').text("Equ./Trolley");
    $('#lbltareWt').text("Dara");
    $('#lblPcs').text("Net Ağırlık");
    $('#lblPcs').text("Parca");
    $('#lbVolume').text("Hacim (LBH)");
    $('#lblDimUn').text("UOM");
    $('#btnBack').text("Geri");
    $('#btnUnScanned').text("Temizle");
    $('#btnSubmit').text("Gönder");

}

function setHungarian() {
    $('#lblPageName').text("Áruátvétel");
    $('#lblSecured').text("Biztosítva");
    $('#scan').text("Fuvarlevél szám szkennelése");
    $('#lblMAWBNo').text("Fő Fuvarlevél szám");
    $('#lblHAWBNo').text("Házi Fuvarlevél szám");
    $('#lblGrpId').text("Group Id");
    $('#lblPcsSclWt').text("Darab / Mért súly");
    $('#lblTrolly').text("Eszköz / Kocsi");
    $('#lbltareWt').text("Bruttó súly");
    $('#lblPcs').text("Darabszám");
    $('#lbVolume').text("Térfogat");
    $('#btnBack').text("Vissza");
    $('#btnUnScanned').text("Törlés");
    $('#btnSubmit').text("Jóváhagyás");



}

function checkWt() {


    if ($("#ddlEquTrolley").val() != '0,-1') {
        REFERENCE = _vlaueofTrolley.split(",")[0]
        IDENTIFIER = _vlaueofTrolley.split(",")[1]

        var a = parseFloat($("#txtScaleWt").val());
        var b = parseFloat(REFERENCE);
        var x = (a - b).toFixed(2);
        if (x == "NaN") {
            x = '';
        } else {
            //var netWeight = parseInt($("#txtScaleWt").val()) - parseInt(REFERENCE)
            $("#NetWt").text(x);
            $('#TareWt').text(REFERENCE);
        }
    }

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


function removeRow() {
    if (counter == 1) {
        alert("No more textbox to remove");
        return false;
    }

    counter--;

    $("#TextBoxDiv" + counter).remove();
}
//function dataPop() {
//    var netWeight = $("#txtScaleWt").val() - REFERENCE
//    $("#NetWt").text(netWeight);
//}
function GetRemainingPackgs() {

    if ($("#txPieces").val() == '') {
        return;
    }
    piecesTyped = parseInt($("#txPieces").val());
    $("#TextBoxDiv1m").show();
    if ($("#ddlMAWBNo").val() == '0') {
        $("#txPieces").val('');
        errmsg = "Please select MAWB No.</br>";
        $.alert(errmsg);
        return;
    }
    //else if (RemainingPkg > piecesTyped) {
    //    actualVal = RemainingPkg - $("#txPieces").val();
    //    $("#textpackgesFirst").val(piecesTyped)
    //} else if (RemainingPkg == piecesTyped) {
    //    $("#textpackgesFirst").val(RemainingPkg);
    //} else if (RemainingPkg < piecesTyped) {
    //    $("#textpackgesFirst").val(RemainingPkg);
    //    $("#txPieces").val(RemainingPkg);
    //    errmsg = "Enterd Package(s) must be less than or equal to remaining Package(s)</br>";
    //    $.alert(errmsg);
    //}


    var rpkg = piecesTyped;
    $('#TextBoxesGroup tr').each(function () {


        $(this).find("input").each(function () {

            ItemCode = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('Pieces') != -1) {
                // inputRows += "<Pieces>" + ItemCode + "</Pieces>"
                if ($(this).val() != "") {
                    rpkg = rpkg - parseInt($(this).val());
                }
                else {
                    $(this).val(rpkg);
                }
            }

        });

    });

}
//function GetRemainingPackgs() {

//    if ($("#txPieces").val() == '') {
//        return;
//    }

//    piecesTyped = parseInt($("#txPieces").val());
//    $("#TextBoxDiv1m").show();
//    if ($("#ddlMAWBNo").val() == '0') {
//        $("#txPieces").val('');
//        errmsg = "Please select MAWB No.</br>";
//        $.alert(errmsg);
//        return;
//    }
//    //else if (RemainingPkg > piecesTyped) {
//    //    actualVal = RemainingPkg - $("#txPieces").val();
//    //    $("#textpackgesFirst").val(piecesTyped)
//    //} else if (RemainingPkg == piecesTyped) {
//    //    $("#textpackgesFirst").val(RemainingPkg);
//    //} else if (RemainingPkg < piecesTyped) {
//    //    $("#textpackgesFirst").val(RemainingPkg);
//    //    $("#txPieces").val(RemainingPkg);
//    //    errmsg = "Enterd Package(s) must be less than or equal to remaining Package(s)</br>";
//    //    $.alert(errmsg);
//    //}


//    var rpkg = piecesTyped;
//    $('#TextBoxesGroup tr').each(function () {


//        $(this).find("input").each(function () {

//            ItemCode = $(this).val();
//            var id = $(this).attr('id');

//            if (id.toString().indexOf('Pieces') != -1) {
//                // inputRows += "<Pieces>" + ItemCode + "</Pieces>"
//                if ($(this).val() != "") {
//                    rpkg = rpkg - parseInt($(this).val());
//                }
//                else {
//                    $(this).val(rpkg);
//                }
//            }

//        });

//    });

//}

function dynamicTrCreate(piecesValue) {

    // if (counter > 5) {
    // //alert("Only 10 textboxes allow");
    // return false;
    // }
    var newTextBoxDiv = $(document.createElement('tr'))
        .attr("id", 'TextBoxDiv' + counter);

    newTextBoxDiv.after().html('<td><input onkeyup="NumberOnly(event);" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);"  type="text" /></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Length' + parseInt(counter + 1) + '" onkeypress="MoveToWid(this);"  type="text" /></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Width' + parseInt(counter + 1) + '" onkeypress="MoveToHei(this);"  type="text" /></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Height' + parseInt(counter + 1) + '"  type="text" /></td>' +
        '<td><button onclick="removeRow();" type="button" id="btnAdd" style="background-color: red;" class="btn btn--icon login__block__btn login__block__btn_margin"><i class="zmdi zmdi-minus"></i></button></td>');


    var one = parseInt($("#Pieces1").val());
    var two = parseInt($("#Pieces2").val());
    var sumOfTwoTextBox = one + two;

    if (parseInt($("#Pieces1").val()) == RemainingPkg) {
        errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
        $.alert(errmsg);

    } else if (sumOfTwoTextBox == RemainingPkg) {
        $("#textpackges1").val(nextValue);
        errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
        $.alert(errmsg);

    } else {
        newTextBoxDiv.appendTo("#TextBoxesGroup");
        $("#textpackges1").val(nextValue);
        counter++;

    }
    GetRemainingPackgs();
    $("#Pieces" + counter).focus();
}



GetVCTUnScannedDetails = function (InputXML) {
    //console.log(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    $("#ddlMAWBNo").text('');
    $("#ddlHAWBNo").text('');
    $("#ddlEquTrolley").text('');
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetVCTUnScannedDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            $("#ddlMAWBNo").empty();
            var newOption = $('<option></option>');
            newOption.val('0').text('Select');
            newOption.appendTo('#ddlMAWBNo');
            var str = response.d;
            console.log(response.d);
            var _conid;
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                _xmlDocTable = xmlDoc;



                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        //  $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    } else {
                        $(".ibiSuccessMsg1").text('');
                    }

                });
                $(xmlDoc).find('Table1').each(function (index) {
                    Type = $(this).find('Type').text();
                    ConsignmentRowID = $(this).find('ConsignmentRowID').text();


                    DocumentNo = $(this).find('DocumentNo').text();
                    SelectedCommSrNo = $(this).find('CommSrNo').text();
                    HAWBNo = $(this).find('HAWBNo').text();
                    //RemainingPkg = $(this).find('RemainingPkg').text();
                    //RemainingWt = $(this).find('RemainingWt').text();
                    //WtUOM = $(this).find('WtUOM').text();
                    IsSecured = $(this).find('IsSecured').text();
                    //REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                    if (IsSecured == 'N') {
                        IsSecuredTF = false;
                    } else if (IsSecured == 'Y') {
                        IsSecuredTF = true;
                    }
                    //$('#ddlMAWBNo')[]
                    var newOption = $('<option></option>');
                    newOption.val(DocumentNo).text(DocumentNo);
                    newOption.appendTo('#ddlMAWBNo');
                    if (isVCTNo == '0') {
                        var result;
                        $("#ddlMAWBNo option").each(function () {
                            result = $('#txtScanAWB').val();
                            if (result.length != 11) {
                                let text = $('#txtScanAWB').val();
                                result = text.slice(0, 11);
                            }
                            if ($(this).val() === result) {
                                $(this).prop("selected", true);
                                setHAWBNo();
                            }
                        });
                    }

                    var a = new Array();
                    $("#ddlMAWBNo").children("option").each(function (x) {
                        test = false;
                        b = a[x] = $(this).text();
                        for (i = 0; i < a.length - 1; i++) {
                            if (b == a[i]) test = true;
                        }
                        if (test) $(this).remove();
                    });
                });


                $(xmlDoc).find('Table2').each(function (index) {
                    Type = $(this).find('Type').text();

                    HAWBNo = $(this).find('HAWBNo').text();
                    RemainingPkg = $(this).find('RemainingPkg').text();
                    RemainingWt = $(this).find('RemainingWt').text();
                    WtUOM = $(this).find('WtUOM').text();
                    IsSecured = $(this).find('IsSecured').text();
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();
                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    REFERENCE_NUMBER_1 = $(this).find('REFERENCE_NUMBER_1').text() + "," + $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    IsBaggage = $(this).find('IsBaggage').text();

                    var newOption = $('<option></option>');
                    newOption.val(REFERENCE_NUMBER_1).text(REFERENCE_DESCRIPTION);
                    newOption.appendTo('#ddlEquTrolley');

                    $('#ddlEquTrolley').trigger('change');

                });
                $(xmlDoc).find('Table3').each(function (index) {
                    ConsignmentRowID = $(this).find('ConsignmentRowID').text();
                    DocumentNo = $(this).find('DocumentNo').text();

                });

                $(xmlDoc).find('Table4').each(function (index) {
                    SR_NO = $(this).find('SR_NO').text();
                    COMMODITY_TYPE = $(this).find('COMMODITY_TYPE').text();
                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlComCode');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(SR_NO).text(COMMODITY_TYPE);
                    newOption.appendTo('#ddlComCode');
                    if (isVCTNo == '0') {
                        $("#ddlComCode option").each(function () {
                            if ($(this).val() === SelectedCommSrNo) {
                                $(this).prop("selected", true);

                            }
                        });
                    }


                });

                if ($("#txtScanAWB").val() != '') {
                    var ScanCodeInSession = $("#txtScanAWB").val();
                    lastFiveNumber = parseInt(ScanCodeInSession);


                    $(_xmlDocTable).find('Table1').each(function (index) {

                        ConsignmentRowID = $(this).find('ConsignmentRowID').text();
                        convertIntConID = parseInt(ConsignmentRowID);
                        console.log('==>> ' + convertIntConID)

                        console.log(lastFiveNumber + '==' + convertIntConID)
                        if (lastFiveNumber == convertIntConID) {

                            //HAWBNo = $(this).find('HAWBNo').text();
                            $("#ddlMAWBNo").val($(this).find('DocumentNo').text());
                            setHAWBNo();

                            if ($(this).find("HAWBNo").is(':empty')) {
                                fullHawb = '';
                                RemainingPkg = $(this).find('RemainingPkg').text();
                                RemainingWt = $(this).find('RemainingWt').text();
                                WtUOM = $(this).find('WtUOM').text();
                                IsSecured = $(this).find('IsSecured').text();
                                HAWBNo = $(this).find('HAWBNo').text();
                                NOG = $(this).find('NOG').text();
                                CommSrNo = $(this).find('CommSrNo').text();
                                IsBaggage = $(this).find('IsBaggage').text();
                                ConsignmentRowID = $(this).find('ConsignmentRowID').text();
                                $("#txPieces").val(RemainingPkg);
                                $("#txtScaleWt").val(RemainingWt);
                                $("#txtNOG").val(NOG);
                                // $("#ddlComCode").val(CommSrNo);


                                if (CommSrNo != '-1' && CommSrNo != '0' && CommSrNo != null && CommSrNo != undefined && CommSrNo != '') {
                                    $("#ddlComCode").val(CommSrNo);
                                }
                            }
                            else {



                                RemainingPkg = $(this).find('RemainingPkg').text();
                                RemainingWt = $(this).find('RemainingWt').text();
                                WtUOM = $(this).find('WtUOM').text();
                                IsSecured = $(this).find('IsSecured').text();
                                HAWBNo = $(this).find('HAWBNo').text();
                                NOG = $(this).find('NOG').text();
                                CommSrNo = $(this).find('CommSrNo').text();
                                IsBaggage = $(this).find('IsBaggage').text();
                                ConsignmentRowID = $(this).find('ConsignmentRowID').text();

                                $("#txPieces").val(RemainingPkg);
                                $("#txtScaleWt").val(RemainingWt);
                                $("#txtNOG").val(NOG);
                                // $("#ddlComCode").val(CommSrNo);
                                $("#ddlHAWBNo").val(ConsignmentRowID);
                                $('#ddlHAWBNo').trigger('change');
                                // var newOption = $('<option></option>');
                                // newOption.val(ConsignmentRowID).text(HAWBNo);
                                // newOption.appendTo('#ddlHAWBNo');

                                // fullHawb = $('#ddlHAWBNo option').length;
                                if (CommSrNo != '-1' && CommSrNo != '0' && CommSrNo != null && CommSrNo != undefined && CommSrNo != '') {
                                    $("#ddlComCode").val(CommSrNo);
                                }
                            }

                            $("#txtGroupId").focus();
                            return false;
                        }
                    });

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
            alert('Server not responding...');
        }
    });
}


function onblurGroupID() {

    if ($("#txtGroupId").val() == '') {
        return;
    }
    $("#txPieces").focus();

}

var fullHawb;
function setHAWBNo(i) {
    $('#dvRemarkShow').empty();
    $(_xmlDocTable).find('Table1').each(function (index) {
        if ($("#ddlMAWBNo").find(":selected").text() == $(this).find('DocumentNo').text()) {

            HAWBNo = $(this).find('HAWBNo').text();
            ConsignmentRowID = $(this).find('ConsignmentRowID').text();

            if ($(this).find("HAWBNo").is(':empty')) {
                fullHawb = '';
                RemainingPkg = $(this).find('RemainingPkg').text();
                RemainingWt = $(this).find('RemainingWt').text();
                WtUOM = $(this).find('WtUOM').text();
                IsSecured = $(this).find('IsSecured').text();
                NOG = $(this).find('NOG').text();
                CommSrNo = $(this).find('CommSrNo').text();
                IsBaggage = $(this).find('IsBaggage').text();


                $("#txPieces").val(RemainingPkg);
                $("#txtScaleWt").val(RemainingWt);
                $("#txtNOG").val(NOG);
                $("#ddlComCode").val(CommSrNo);

                SHCAll = $(this).find('SHCAll').text();

                _XmlForSHCCode = SHCAll;
                SHCSpanHtml(SHCAll);
            }
            else {

                var newOption = $('<option></option>');
                newOption.val(ConsignmentRowID).text(HAWBNo);
                newOption.appendTo('#ddlHAWBNo');

                fullHawb = $('#ddlHAWBNo option').length;

                $("#SHCCodeTbl").empty();

            }
        }


    });

    var Remark = '';
    $(_xmlDocTable).find('Table3').each(function (index) {
        if ($("#ddlMAWBNo").find(":selected").text() == $(this).find('DocumentNo').text()){
            Remark = $(this).find('Remark').text();
            if (Remark != '') {
                // RemarkDate = $(this).find('RemarkDate').text();
                remarkPriority = $(this).find('remarkPriority').text();
                $('#dvRemarkShow').append(Remark);
                $('#remarkPriorityShow').modal('show');
            }
        }
    });
}

// function setHAWBNoHAWBNo(i) {

// $(_xmlDocTable).find('Table1').each(function (index) {
// if ($("#ddlHAWBNo").find(":selected").text() == $(this).find('HAWBNo').text()) {

// RemainingPkg = $(this).find('RemainingPkg').text();
// RemainingWt = $(this).find('RemainingWt').text();
// WtUOM = $(this).find('WtUOM').text();
// IsSecured = $(this).find('IsSecured').text();
// HAWBNo = $(this).find('HAWBNo').text();
// NOG = $(this).find('NOG').text();
// CommSrNo = $(this).find('CommSrNo').text();
// IsBaggage = $(this).find('IsBaggage').text();

// $("#txPieces").val(RemainingPkg);
// $("#txtScaleWt").val(RemainingWt);
// $("#txtNOG").val(NOG);
// $("#ddlComCode").val(CommSrNo);
// //if ($(this).find("HAWBNo").is(':empty')) {
// //    fullHawb = '';
// //}
// //else {

// //    var newOption = $('<option></option>');
// //    newOption.val(HAWBNo).text(HAWBNo);
// //    newOption.appendTo('#ddlHAWBNo');

// //    fullHawb = $('#ddlHAWBNo option').length;
// //}
// }
// });
// }


function saveCargoAcceptance() {
    if ($("#ddlMAWBNo").val() == '0') {
        $("body").mLoading('hide');
        errmsg = "Please Select/Scan the AWB</br>";
        $.alert(errmsg);
        return;
    }
    else if (fullHawb > 1 && $('#ddlHAWBNo').val() == '0') {
        // $("#txPieces").focus();
        $("body").mLoading('hide');
        errmsg = "Please select HAWB No.</br>";
        $.alert(errmsg);
        return;
    }
    else if ($("#txPieces").val() == '') {
        // $("#txPieces").focus();
        $("body").mLoading('hide');
        errmsg = "Please Enter Package</br>";
        $.alert(errmsg);
        $(".alert_btn_ok").click(function () {
            $("#txPieces").focus();
        });

        return;
    } else if ($("#txtScaleWt").val() == '') {
        // $("#txPieces").focus();
        $("body").mLoading('hide');
        errmsg = "Please Enter Gross Wt.</br>";
        $.alert(errmsg);
        $(".alert_btn_ok").click(function () {
            $("#txtScaleWt").focus();
        });
        return;
    }
    // else if ($("#txtGroupId").val() == '') {
    //     //  $("#txPieces").focus();
    //     $("body").mLoading('hide');
    //     errmsg = "Please Enter Unique Group ID</br>";
    //     $.alert(errmsg);
    //     $(".alert_btn_ok").click(function () {
    //         $("#txtGroupId").focus();
    //     });
    //     return;

    // }
    else if (IsBaggage != 'Y' && (parseInt($("#txPieces").val()) > parseInt(RemainingPkg))) {
        $("body").mLoading('hide');
        errmsg = "Entered Package(s) " + $("#txPieces").val() + " must be less than or equal to remaining Package(s)" + RemainingPkg + "</br>";
        $.alert(errmsg);
        $(".alert_btn_ok").click(function () {
            $("#txPieces").focus();
        });
        return;
    }
    else if ($("#ddlComCode").val() == '0') {
        $("body").mLoading('hide');
        errmsg = "Please Select Com. Code</br>";
        $.alert(errmsg);
        return;
    } else if ($("#txtNOG").val() == '') {
        $("body").mLoading('hide');
        errmsg = "Please Enter NOG</br>";
        $.alert(errmsg);
        $(".alert_btn_ok").click(function () {
            $("#txtNOG").focus();
        });
        return;
    }
    //else if (_vlaueofTrolleytext == 'Select') {
    //    //  $("#txPieces").focus();
    //    $("body").mLoading('hide');
    //    errmsg = "Please select Trolley</br>";
    //    $.alert(errmsg);
    //    return;
    //}
    else {

        //var empty = 0;

        //$('#TextBoxesGroup input[type=text]').each(function () {
        //    if (this.value == "") {
        //        empty++;
        //    }
        //});

        //if (empty != 0) {
        //    $('#TextBoxesGroup input[type=text]').css('background-color', 'red');
        //} else {
        //getAllValues();

        //inputxml = "<Root><VCTNo>" + txtVCTNo + "</VCTNo><VCTID>" + VCTId + "</VCTID><ISULD>False</ISULD><ConsignmentRowID>" + $("#ddlMAWBNo").val() + "</ConsignmentRowID><HouseRowId>" + $("#ddlMAWBNo").val() + "</HouseRowId><AWBULDNo>" + DocumentNo + "</AWBULDNo><HAWB>" + selectTestHaWB + "</HAWB><Package>" + $("#txPieces").val() + "</Package><GrossWt>" + $("#txtScaleWt").val() + "</GrossWt><WtUOM>KG</WtUOM><TrolleyCode>" + IDENTIFIER + "</TrolleyCode><TrolleyWt>" + REFERENCE + "</TrolleyWt><IsSecured>" + IsSecuredTF + "</IsSecured><GroupId>" + $("#txtGroupId").val() + "</GroupId><DimUOM>" + $("#ddlUnit").val() + "</DimUOM><DimDetails>" + inputRows + "</DimDetails><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>"
        //console.log(inputxml);
        //SaveVCTCargoDetails(inputxml);
        //    alert('k');
        //}
        var $input;
        var formElements = new Array();
        $('#TextBoxesGroup').find('input').each(function (i, input) {
            $input = $(input);
            $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
            formElements.push($input.val());
        });
        // if ($input.val() == '') {
        //     $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
        //     $(".ibiSuccessMsg1").text('Please enter dimensions.').css({ 'color': 'red' });
        //     $("#Length1").focus();
        // } else {
            $(".ibiSuccessMsg1").text('');
            getAllValues();
            inputxml = "<Root><VCTNo>" + txtVCTNo + "</VCTNo><VCTID>" + VCTId + "</VCTID><ISULD>False</ISULD><ConsignmentRowID>" + ConsignmentRowID + "</ConsignmentRowID><HouseRowId>" + ConsignmentRowID + "</HouseRowId><AWBULDNo>" + $("#ddlMAWBNo").val() + "</AWBULDNo><HAWB>" + $("#ddlHAWBNo option:selected").text() + "</HAWB><Package>" + $("#txPieces").val() + "</Package><GrossWt>" + $("#txtScaleWt").val() + "</GrossWt><WtUOM>KG</WtUOM><TrolleyCode>" + IDENTIFIER + "</TrolleyCode><TrolleyWt>" + REFERENCE + "</TrolleyWt><IsSecured>" + IsSecuredTF + "</IsSecured><GroupId>" + $("#txtGroupId").val() + "</GroupId><DimUOM>" + $("#ddlUnit").val() + "</DimUOM><DimDetails>" + inputRows + "</DimDetails><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId><NOG>" + $("#txtNOG").val() + "</NOG><CommSrNo>" + $("#ddlComCode").val() + "</CommSrNo>" + allSHCCodeSave + "</Root>"
            console.log(inputxml);
            SaveVCTCargoDetails(inputxml);
        //}
        // }

    }
}

SaveVCTCargoDetails = function (InputXML) {
    console.log(InputXML);
    $('body').mLoading({
        text: "Please Wait..",
    });
    //$("#ddlMAWBNo").text('');
    //$("#ddlHAWBNo").text('');
    //$("#ddlEquTrolley").text('');
    $.ajax({
        type: 'POST',
        url: ExpURL + "/SaveVCTCargoDetails",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                //$(xmlDoc).find('Table').each(function (index) {
                //    Status = $(this).find('Status').text();
                //    StrMessage = $(this).find('StrMessage').text();
                //    if (Status == 'E') {
                //        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                //    } else if (Status == 'S') {
                //        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                //        clearFunction();
                //    } else {
                //        $(".ibiSuccessMsg1").text('');
                //    }
                //});
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        //$("body").mLoading('hide');
                        //errmsg = StrMessage;
                        //$.alert(errmsg).css("color", "red");

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });
                        //$("body").mLoading('hide');
                        //errmsg = StrMessage;
                        //$.alert(errmsg).addClass('successAlertColor');

                        //$(".alert_btn_ok").click(function () {
                        //    window.location.reload();
                        inputxml = "<Root><VCTNo>" + VCTNo + "</VCTNo><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
                        setTimeout(() => {
                            GetVCTUnScannedDetails(inputxml);
                        }, 2500);
                        allSHCCodeSave = '';
                        joinAllValuesWithComma = '';
                        //});
                        clearFunction();

                    } else {
                        $(".ibiSuccessMsg1").text('');
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
            alert('Server not responding...');
        }
    });
}



function clearFunction() {
    $("#txtScanAWB").val('');
    $("#ddlMAWBNo").val('0');
    $("#ddlHAWBNo").val('0');
    $("#txtGroupId").val('');
    $("#txPieces").val('');
    $("#txtScaleWt").val('');
    $("#ddlEquTrolley").text('');
    $("#dvForEditBtn").hide();
    //$("#TextBoxesGroup").empty();
    $("#TextBoxesGroup tr:gt(0)").remove();
    $('#Pieces1').val('');
    $('#Length1').val('');
    $('#Width1').val('');
    $('#Height1').val('');
    $('#TextBoxesGroup').find('input').each(function (i, input) {
        $input = $(input);
        $input.css('background-color', '');
    });
    $("#TextBoxDiv1").empty();
    $("#SHCCodeTbl").empty();
    //$("#TextBoxesGroup").hide();

    $("#ddlComCode").val('0');
    $("#txtNOG").val('');

    $("#txtScanAWB").focus();
    $("#TareWt").text('');
    $("#NetWt").text('');

}
function clearSuccessMsg() {
    $(".ibiSuccessMsg1").text('');
}

function ClearInputFIelds() {
    $("#txtGroupId").val('');
    $("#txPieces").val('');
    $("#txtScaleWt").val('');
    $("#ddlEquTrolley").val('-1');
    $("#TareWt").text('');
    $("#NetWt").text('');

}

function MoveToLen(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Length' + index).focus();
    }
}

function MoveToWid(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Width' + index).focus();
    }
}

function MoveToHei(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Height' + index).focus();
    }
}

GetVCTUnScannedAWBDetails = function (InputXMLAWB) {
    //console.log(InputXML);
    if (InputXMLAWB == '') {
        InputXMLAWB = "<Root><VCTNo>" + VCTNo + "</VCTNo><AWBId>" + $("#txtScanAWB").val() + "</AWBId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId></Root>";
    }
    $('body').mLoading({
        text: "Please Wait..",
    });
    ClearInputFIelds();
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetVCTUnScannedAWBDetails",
        data: JSON.stringify({ 'InputXML': InputXMLAWB }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    } else {
                        //$(".ibiSuccessMsg1").text('');
                    }

                });
                $(xmlDoc).find('Table1').each(function () {
                    MawbNo = $(this).find('DocumentNo').text();
                    HawbNo = $(this).find('HouseNo').text();
                    AWBId = $(this).find('ConsignmentRowID').text();

                    //$("#ddlMAWBNo option:contains(" + MawbNo + ")").attr('selected', 'selected');                    
                    $('#ddlMAWBNo').val(MawbNo);
                    var newOption = $('<option></option>');
                    newOption.val(HawbNo).text(HawbNo);
                    newOption.appendTo('#ddlHAWBNo');
                    setHAWBNo();
                    RemainingPkg = $(this).find('RemainingPkg').text();
                    RemainingWt = $(this).find('RemainingWt').text();
                    IsBaggage = $(this).find('IsBaggage').text();
                    $("#ddlHAWBNo").val(AWBId);
                    $("#txtGroupId").focus();
                    $('#txPieces').val(RemainingPkg);
                    ConsignmentRowID = AWBId;

                    var a = new Array();
                    $("#ddlHAWBNo").children("option").each(function (x) {
                        test = false;
                        b = a[x] = $(this).text();
                        for (i = 0; i < a.length - 1; i++) {
                            if (b == a[i]) test = true;
                        }
                        if (test) $(this).remove();
                    });

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
            alert('Server not responding...');
        }
    });
}



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
            html += '<td><input onkeypress="return blockSpecialChar(event)" maxlength="3" value="' + newSpanSHC[n] + '" type="text" id="txtSHC ' + n + '" class="textfieldClass" placeholder="" style="text-transform: uppercase;"></td>';
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

    return spanStr;

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
