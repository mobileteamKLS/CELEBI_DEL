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
$(function () {

    if (txtScannedNo != '') {
        $("#txtScanAWB").val(txtScannedNo);

    }





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
        //if ($input.val() == '') {
        //    $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
        //} else {


        if ($('#txPieces').val() == CurrSumDImPcs) {
            //errmsg = "Sum of packages are equal to entered packages.</br>";
            //$.alert(errmsg);
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

        //  }

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
    $("#VCTNo").text(VCTNo).css('color', 'red');

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
        _vlaueofRemPakgs = $('option:selected', this).val();
        selectTestHaWB = $('option:selected', this).text();
        //  $("#txPieces").val('');
        $("#txtGroupId").focus();
    });

    $("#ddlMAWBNo").change(function () {
        $("#ddlHAWBNo").empty();

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

        setHAWBNo();
        $("#txtScanHAWB").focus();

    });

    $("#ddlHAWBNo").change(function () {
        //$("#ddlHAWBNo").empty();

        //var newOption = $('<option></option>');
        //newOption.val('0').text('Select');
        //newOption.appendTo('#ddlHAWBNo');


        $("#txtGroupId").val('');
        $("#txPieces").val('');
        $("#txtScaleWt").val('');
        $("#ddlEquTrolley").val('0,-1');



        $("#TareWt").text('');
        $("#NetWt").text('');

        setHAWBNoHAWBNo();
        $("#txtGroupId").focus();

    });

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


    });


});

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
    $("#TextBoxDiv1m").hide();
    //if (counter == 1) {
    //    alert("No more textbox to remove");
    //    return false;
    //}

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

    if (counter > 5) {
        //alert("Only 10 textboxes allow");
        return false;
    }
    var newTextBoxDiv = $(document.createElement('tr'))
         .attr("id", 'TextBoxDiv' + counter);

    newTextBoxDiv.after().html('<td><input onkeyup="NumberOnly(event);" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" type="text" /></td>' +
                        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Length' + parseInt(counter + 1) + '"  type="text" /></td>' +
                        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Width' + parseInt(counter + 1) + '"  type="text" /></td>' +
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
                    newOption.val(ConsignmentRowID).text(DocumentNo);
                    newOption.appendTo('#ddlMAWBNo');


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
                    if (index == 0 && $("#ddlComCode").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlComCode');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(SR_NO).text(COMMODITY_TYPE);
                    newOption.appendTo('#ddlComCode');

                });

                if ($("#txtScanAWB").val() != '') {
                    var lastFive = $("#txtScanAWB").val().substr($("#txtScanAWB").val().length - 5);

                    $(_xmlDocTable).find('Table1').each(function (index) {

                        if (lastFive == $(this).find('ConsignmentRowID').text()) {

                            HAWBNo = $(this).find('HAWBNo').text();

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
                                $("#ddlMAWBNo").val(ConsignmentRowID)
                                $("#txPieces").val(RemainingPkg);
                                $("#txtScaleWt").val(RemainingWt);
                                $("#txtNOG").val(NOG);
                                $("#ddlComCode").val(CommSrNo);
                            }
                            else {
                                var newOption = $('<option></option>');
                                newOption.val(HAWBNo).text(HAWBNo);
                                newOption.appendTo('#ddlHAWBNo');

                                //fullHawb = $('#ddlHAWBNo option').length;
                                RemainingPkg = $(this).find('RemainingPkg').text();
                                RemainingWt = $(this).find('RemainingWt').text();
                                WtUOM = $(this).find('WtUOM').text();
                                IsSecured = $(this).find('IsSecured').text();
                                HAWBNo = $(this).find('HAWBNo').text();
                                NOG = $(this).find('NOG').text();
                                CommSrNo = $(this).find('CommSrNo').text();
                                IsBaggage = $(this).find('IsBaggage').text();
                                ConsignmentRowID = $(this).find('ConsignmentRowID').text();
                                $("#ddlMAWBNo").val(ConsignmentRowID)
                                $("#txPieces").val(RemainingPkg);
                                $("#txtScaleWt").val(RemainingWt);
                                $("#txtNOG").val(NOG);
                                $("#ddlComCode").val(CommSrNo);
                            }
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

    $(_xmlDocTable).find('Table1').each(function (index) {
        if ($("#ddlMAWBNo").find(":selected").text() == $(this).find('DocumentNo').text()) {

            HAWBNo = $(this).find('HAWBNo').text();


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

                $("#txPieces").val(RemainingPkg);
                $("#txtScaleWt").val(RemainingWt);
                $("#txtNOG").val(NOG);
                $("#ddlComCode").val(CommSrNo);
            }
            else {

                var newOption = $('<option></option>');
                newOption.val(HAWBNo).text(HAWBNo);
                newOption.appendTo('#ddlHAWBNo');

                fullHawb = $('#ddlHAWBNo option').length;
            }
        }
    });
}

function setHAWBNoHAWBNo(i) {

    $(_xmlDocTable).find('Table1').each(function (index) {
        if ($("#ddlHAWBNo").find(":selected").text() == $(this).find('HAWBNo').text()) {

            RemainingPkg = $(this).find('RemainingPkg').text();
            RemainingWt = $(this).find('RemainingWt').text();
            WtUOM = $(this).find('WtUOM').text();
            IsSecured = $(this).find('IsSecured').text();
            HAWBNo = $(this).find('HAWBNo').text();
            NOG = $(this).find('NOG').text();
            CommSrNo = $(this).find('CommSrNo').text();
            IsBaggage = $(this).find('IsBaggage').text();

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
        }
    });
}


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
    else if ($("#txtGroupId").val() == '') {
        //  $("#txPieces").focus();
        $("body").mLoading('hide');
        errmsg = "Please Enter Unique Group ID</br>";
        $.alert(errmsg);
        $(".alert_btn_ok").click(function () {
            $("#txtGroupId").focus();
        });
        return;

    } else if ($("#ddlComCode").val() == '0') {
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
            // $input.css('background-color', $input.val() ? 'green' : 'red');
            formElements.push($input.val());
        });
        //if ($input.val() == '') {
        //    $input.css('background-color', $input.val() ? 'green' : 'red');
        //} else {

        getAllValues();
        inputxml = "<Root><VCTNo>" + txtVCTNo + "</VCTNo><VCTID>" + VCTId + "</VCTID><ISULD>False</ISULD><ConsignmentRowID>" + $("#ddlMAWBNo").val() + "</ConsignmentRowID><HouseRowId>" + $("#ddlMAWBNo").val() + "</HouseRowId><AWBULDNo>" + DocumentNo + "</AWBULDNo><HAWB>" + selectTestHaWB + "</HAWB><Package>" + $("#txPieces").val() + "</Package><GrossWt>" + $("#txtScaleWt").val() + "</GrossWt><WtUOM>KG</WtUOM><TrolleyCode>" + IDENTIFIER + "</TrolleyCode><TrolleyWt>" + REFERENCE + "</TrolleyWt><IsSecured>" + IsSecuredTF + "</IsSecured><GroupId>" + $("#txtGroupId").val() + "</GroupId><DimUOM>" + $("#ddlUnit").val() + "</DimUOM><DimDetails>" + inputRows + "</DimDetails><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>" + language + "</Culture><UserId>" + Userid + "</UserId><NOG>" + $("#txtNOG").val() + "</NOG><CommSrNo>" + $("#ddlComCode").val() + "</CommSrNo></Root>"
        console.log(inputxml);
        SaveVCTCargoDetails(inputxml);

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
                        GetVCTUnScannedDetails(inputxml);

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
    // $("#ddlMAWBNo").text('');
    $("#ddlHAWBNo").text('');
    $("#txtGroupId").val('');
    $("#txPieces").val(''); IsSecured
    $("#txtScaleWt").val('');
    $("#ddlEquTrolley").text('');

    $("#TextBoxesGroup").empty();
    $("#TextBoxDiv1").empty();
    $("#TextBoxesGroup").hide();


    $("#Pieces1").val('');
    $("#Length1").val('');
    $("#Width1").val('');
    $("#Height1").val('');
    $("#ddlComCode").val('0');
    $("#txtNOG").val('');

    $("#txtScanAWB").focus();
    $("#TareWt").text('');
    $("#NetWt").text('');

}
function clearSuccessMsg() {
    $(".ibiSuccessMsg1").text('');
}







