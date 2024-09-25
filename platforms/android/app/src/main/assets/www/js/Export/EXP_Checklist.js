var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var companyCode = window.localStorage.getItem("companyCode");
var i = 1;
var UserName = window.localStorage.getItem("UserName");
var increamentVal = 1;
var _xmlDocTable;
var lastQuestion;
var lastNo;
var allRadioValdata = {};


var inputRowsOfAns = "";
var RowID;
var PageNo = 1;
var pageNumberCount;
var currentDate;
var currentYear;
var QuestionaireId;
$(function () {

    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
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
    currentYear = '2023';//   y.toString();
    currentDate = date;
    //  $('#txtFlightDate').val(date);

    $('#btnNextBase').click(function () {

        if ($('#txtScanAWBNo').val() == '') {
            // $.alert('Please select declaration type.');
            $('#spnErrormsg').text('Please enter/scan AWB No.').css('color', 'red');
            return;
        } else {
            $('#spnErrormsg').text('');
        }

        if ($('#ddlChecklist').val() == '0' || $('#ddlChecklist').val() == null) {
            // $.alert('Please select declaration type.');
            $('#spnErrormsg').text('Please select declaration type.').css('color', 'red');
            return;
        } else {
            $('#spnErrormsg').text('');
        }

        console.log('increamentVal  / ' + increamentVal)
        //console.log('pageNumberCount  / ' + pageNumberCount)
        pageNumberCount = '';
        $(".next").attr('value', 'NEXT');

        PageNo = 1;
        GetExportCheckListNext($('#ddlChecklist').val());

    });
    // document.addEventListener('deviceready', AddLocation, false);
    //document.addEventListener('deviceready', AddingTestLocation, false);

    $(".next").click(function () {

        //Show previous button
        $('.pre').show();

        //Find the element that's currently showing
        $showing = $('.content .first.visible').first();

        //Find the next element
        $next = $showing.next();

        //Change which div is showing
        $showing.removeClass("visible").hide();
        $next.addClass("visible").show();

        //If there's no more elements, hide the NEXT button
        if (!$next.next().length) {
            // $(this).hide();
            //  console.log(parseInt(pageNumberCount) + '/' + parseInt(increamentVal))

        }

        if (parseInt(pageNumberCount) == parseInt(PageNo) + 1) {
            //alert(parseInt(lastQuestion) + '/' + parseInt(lastNo))
            $(".next").attr('value', 'Finish');
            // $(this).hide();
            // $('#myModal').modal('hide');
            //  return;
            i = 1;
        }
        // var i = 1;
        console.log('increamentVal  / ' + increamentVal)

        console.log(parseInt(pageNumberCount) + '/' + parseInt(increamentVal))
        i++;
        increamentVal = i;
        /* console.log(increamentVal)*/
        PageNo = PageNo + 1;

        GetExportCheckListNext($('#ddlChecklist').val());

        allRadioValdata = {};

    });

    $(".pre").click(function () {
        $('.next').show();

        $showing = $('.content .first.visible').first();
        $next = $showing.prev();
        $showing.removeClass("visible").hide();
        $next.addClass("visible").show();

        if (!$next.prev().length) {
            // $(this).hide();
            // $(".next").attr('value', 'NEXT');
        }
        console.log(parseInt(pageNumberCount) + '/' + parseInt(PageNo))

        if (parseInt(pageNumberCount) == parseInt(PageNo)) {
            $(".next").attr('value', 'NEXT');
            i = 1;
        } else if (parseInt(pageNumberCount) < parseInt(PageNo)) {
            $(".next").attr('value', 'Finish');
            i = 1;
        }

        i--;
        increamentVal = i;
        PageNo = PageNo - 1;
        $('#spnErrormsgonPopup').text('');

        if (PageNo == 0) {
            $('#myModal').modal('hide');
            return;
        }


        if (increamentVal != 0) {
            GetExportCheckListNext($('#ddlChecklist').val());
        } else {
            GetExportCheckListNext($('#ddlChecklist').val());

            //errmsg = "No preview available.";
            //$.alert(errmsg);
        }



    });


    // GetCheckList_HHT();
    //GetExportCheckListNext();

    //var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';

    //SHCSpanHtml(stringos);

});


getAllValuesofRadio = function () {
    inputRowsOfAns += "<Root>"
    $('#tblChecklist tr').each(function () {
        $(this).find("input").each(function () {
            ItemCode = $(this).val();
            var name = $(this).attr('name');
            var id = $(this).attr('id');
            QuestionIDInsert = name[2]
            if ($(this).is(':checked') == true) {
                inputRowsOfAns += "<Answer><QuestionID>" + QuestionIDInsert + "</QuestionID><Option>" + id + "</Option></Answer>"
            }
        });
    });
    inputRowsOfAns += "</Root>";
}

function CheckEmpty() {

    if ($('#txtGroupId').val() != '' && $('#txtLocation').val() != '') {
        $('#btnMoveDetail').removeAttr('disabled');
    } else {
        $('#btnMoveDetail').attr('disabled', 'disabled');
        return;
    }

}

function unCheckAll() {
    $('#tblChecklist input:radio').each(function () {
        $(this).prop('checked', false);
    });
    $('#spnErrormsgonPopup').text('');
}

function SHCSpanHtml(newSHC) {
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

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}

function GetExportCheckListNext(chkID) {

    inputRowsOfAns = "";
    inputRowsOfAns += '<Root><CheckListType>' + chkID + '</CheckListType><AWBId>' + RowID + '</AWBId><PageNo>' + PageNo + '</PageNo><PageNoDisplay></PageNoDisplay><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId><Answers> '
    $('#tblChecklist tr').each(function () {
        $(this).find("input").each(function () {
            ItemCode = $(this).val();
            var name = $(this).attr('name');
            var Qid = name.split('~');
            var option = $(this).attr('id');
            var QuestionIDInsert = Qid[1]
            if ($(this).is(':checked') == true) {
                inputRowsOfAns += "<Answer><QuestionID>" + QuestionIDInsert + "</QuestionID><Option>" + option + "</Option></Answer>"
            }
        });
    });
    inputRowsOfAns += "</Answers></Root>";
    //  console.log(inputRowsOfAns)
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    //InputXMLforNext = '<Root><CheckListType>' + chkID + '</CheckListType><AWBId>' + RowID + '</AWBId><QuestionaireMasterNo>' + QuestionaireId + '</QuestionaireMasterNo><PageNo>' + PageNo + '</PageNo><PageNoDisplay></PageNoDisplay><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';
    //InputXMLforNext = '<Root><CheckListType>DGR1</CheckListType><AWBId>99</AWBId><PageNo>1</PageNo><PageNoDisplay></PageNoDisplay><AirportCity>BUD</AirportCity><UserId>1</UserId>';


    // InputXML = "<Root><CheckListType>DGR3</CheckListType><AWBId>1</AWBId><PageNo>2</PageNo><PageNoDisplay>1-4</PageNoDisplay><AirportCity>BUD</AirportCity><UserId></UserId></Root>";
    // console.log(InputXML)
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetExportCheckListNext",
            data: JSON.stringify({ 'InputXML': inputRowsOfAns }),
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                //$('#divVCTDetail').html('');
                //$('#divVCTDetail').empty();
                console.log(xmlDoc);

                $(xmlDoc).find('Table1').each(function (index) {
                    QuestionSet = $(this).find('QuestionSet').text();
                    //  QuestionSet

                    var QNo = QuestionSet.split(',');
                    lastQuestion = QNo[2];
                    //  console.log('lastQuestion ' + lastQuestion)

                });
                $(xmlDoc).find('Table').each(function (index) {
                    $('#divCheckListDetail').empty();

                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    $(".next").removeAttr('disabled');
                    if (Status == 'E') {
                        if (StrMessage.includes('Checks are pending') == true) {
                            $('#spnErrormsgonPopup').text(StrMessage).css('color', 'red');
                            if (PageNo > parseInt(pageNumberCount)) {
                                $(".next").attr('disabled', 'disabled');
                                return
                            }

                            return;
                        }

                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        return;
                    } else {
                        if (StrMessage != '') {
                            $('#myModal').modal('toggle');
                            $('#spnErrormsg').text(StrMessage).css('color', 'green');
                            $('#divCheckListDetail').empty();
                            html = '';
                            //  setTimeout(GetExportCheckListSearch , 5000);
                            GetExportCheckListSearch();
                            return;
                        }
                        PageNo = parseInt($(this).find('PageNo').text());
                        PageCount = parseInt($(this).find('PageCount').text());
                        pageNumberCount = parseInt(PageCount);

                    }
                    $('#myModal').modal('show');
                    html = '';
                    html += '<div class="form-group col-xs-12 col-sm-6 col-md-6 NoPadding class=" first visible"" >';
                    html += '<table id="tblChecklist" class="table table-striped table-bordered">';
                    html += '<thead style="background-color:rgb(208, 225, 244);">';
                    html += '<tr>';
                    html += '<th  style="background-color:rgb(208, 225, 244);">Questions</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Yes</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">No</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">N/A</th>';
                    html += '</tr>';
                    html += '<tr>';
                    // if (index == 0) {
                    //  html += '<td colspan="4" style="background-color: rgb(224, 243, 215);"> <label id="lblHeading">' + show + '</label> </td>';
                    //  }

                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var HasChild;
                    var QuestionId;
                    var flag = '0';
                    $(xmlDoc).find('Table2').each(function (index) {
                        $('#lblMessage').text('');
                        //var Status = $(this).find('Status').text();
                        //var StrMessage = $(this).find('StrMessage').text();
                        //if (Status == 'E') {
                        //    $.alert(StrMessage);
                        //    $('#divULDNumberDetails').empty();
                        //    $('#divULDNumberDetails').hide();
                        //    html = '';
                        //    return;
                        //}

                        KeyValue = $(this).find('KeyValue').text();
                        Question = $(this).find('Question').text();
                        IsBold = $(this).find('IsBold').text();
                        Color = $(this).find('Color').text();
                        IsYes = $(this).find('IsYes').text();
                        IsNo = $(this).find('IsNo').text();
                        IsNA = $(this).find('IsNA').text();
                        IsNote = $(this).find('IsNote').text();
                        IsOptionChecked = $(this).find('IsOptionChecked').text();

                        var Lno = Question.split('.');
                        lastNo = Lno[0];

                        CheckListDetailsForShow(KeyValue, Question, IsBold, Color, IsYes, IsNo, IsNA, IsNote, IsOptionChecked);

                    });

                    html += '</tbody></table>';

                    html += '</div >';
                    //    $('#divCheckListDetail').show();
                    $('#divCheckListDetail').append(html);

                });

                //if (parseInt(pageNumberCount) == parseInt(increamentVal)) {
                //    //  alert(parseInt(lastQuestion) + '/' + parseInt(lastNo))
                //    $(".next").attr('value', 'Finish');
                //    //   $(this).hide();
                //    //  $('#myModal').modal('hide');
                //    //  return;
                //}
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


//function getPageNumber(i) {
//    PageNo = i
//    GetExportCheckListNext($('#ddlChecklist').val());
//}

function GetExportCheckListSearch() {
    // $('#spnErrormsg').text('');
    if ($("#txtScanAWBNo").val() == '') {
        return;
    }

    if ($("#txtScanAWBNo").val().length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        $('#txtScanAWBNo').val('');
        $('#txtScanAWBNo').focus();
        clearALL();
        return;
    }
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    // InputXML = '<Root><AWBNo>' + $("#txtAWBNo").val() + '</AWBNo><AirportCity>' + AirportCity + '</AirportCity></Root>';
    InputXML = '<Root><AWBNumber>' + $("#txtScanAWBNo").val() + '</AWBNumber><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserID + '</UserId></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetExportCheckListSearch",
            data: JSON.stringify({ 'InputXML': InputXML }),
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                //$('#divVCTDetail').html('');

                console.log(xmlDoc)
                $('#ddlChecklist').empty();


                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        // $.alert(StrMessage);
                        $('#spnErrormsg').text(StrMessage).css('color', 'red');
                        // clearALL();
                        $('#txtScanAWBNo').val('');
                        $('#txtScanAWBNo').focus();
                        $('#txtMAWBAWBNo').val('');
                        $('#txtNOG').val('');
                        $('#txtRemark').val('');
                        $('#divVCTDetail').hide();
                        $('#TextBoxDiv').empty();
                        $('#ddlChecklist').empty();
                        $('#divDocsDetail').empty();
                        return;
                    } else {
                        $('#spnErrormsg').text(StrMessage).css('color', 'green');
                        $('#ddlChecklist').focus();
                    }
                });
                $(xmlDoc).find('Table1').each(function (index) {
                    $('#txtMAWBAWBNo').val($('#txtScanAWBNo').val()).attr('disabled', 'disabled');
                    NOG = $(this).find('NOG').text();
                    $('#txtNOG').val(NOG)
                    SHC = $(this).find('SHC').text().toLocaleUpperCase();
                    RowID = $(this).find('RowID').text();

                    var newSHC = $(this).find('SHC').text();
                    $("#TextBoxDiv").empty();
                    SHCSpanHtml(newSHC);
                });

                $(xmlDoc).find('Table2').each(function (index) {

                    Value = $(this).find('Value').text();
                    Text = $(this).find('Text').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlChecklist');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(Value).text(Text);
                    newOption.appendTo('#ddlChecklist');

                });

                $('#divDocsDetail').empty();
                html = "";
                html += '<table id="tblChecklistAfterScan" class="table table-striped table-bordered">';
                html += '<thead style="background-color:rgb(208, 225, 244);">';
                html += '<tr>';
                html += '<th>Declaration Type</th>';
                html += '<th>User</th>';
                html += '<th>Date & Time</th>';
                html += '<th>Status</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                $(xmlDoc).find('Table3').each(function (index) {

                    //  $('#tblChecklistAfterScan').show();
                    DeclarationType = $(this).find('DeclarationType').text();
                    USERNAME = $(this).find('USERNAME').text();
                    DateTime = $(this).find('DateTime').text();
                    Status = $(this).find('Status').text();
                    QuestionaireId = $(this).find('QuestionaireId').text();
                    ReWarehousetime = $(this).find('ReWarehousetime').text();
                    Color = $(this).find('Color').text();

                    checkListBindonSearch(DeclarationType, USERNAME, DateTime, Status, QuestionaireId, ReWarehousetime, Color);
                });
                html += '</tbody></table>';

                $('#divDocsDetail').append(html);


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

function checkListBindonSearch(DeclarationType, USERNAME, DateTime, Status, QuestionaireId, ReWarehousetime) {


    html += '<tr style="color:' + Color + '">';
    html += '<td style="background-color: rgb(224, 243, 215);" id="tdDeclarationType">' + DeclarationType + '</td>';
    html += '<td style="background-color: rgb(224, 243, 215);" id="tdUSERNAME">' + USERNAME + '</td>';
    html += '<td style="background-color: rgb(224, 243, 215);" id="tdStatus">' + ReWarehousetime + '</td>';
    html += '<td style="background-color: rgb(224, 243, 215); text-align: center;" id="tdDateTime">' + Status + '</td>';
    html += '</tr>';


}

function CheckListDetailsForShow(KeyValue, Question, IsBold, Color, IsYes, IsNo, IsNA, IsNote, IsOptionChecked) {
    var AllKeys = KeyValue.split('~');

    //  html += '<tr style="border-bottom: solid thin #ccc;">';
    html += '<tr>';
    if (IsBold == 'Y') {
        html += '<td colSpan="8"><span style="font-weight: bold;">' + Question + '</span></td>';
    } else {
        if (Question.includes('Note') == true) {
            html += '<td colSpan="8"><span style="color:' + Color + '">' + Question + '</span></td>';
        } else {
            if (AllKeys[0] != 'C') {
                html += '<td colSpan="8"><span style="color:' + Color + '">' + Question + '</span></td>';
            } else {
                html += '<td><span style="color:' + Color + '">' + Question + '</span></td>';
            }

        }
        //if (Question.includes('Note') == true) {
        //    html += '<td colSpan="8" style="font-weight: bold;"><span style="color:' + Color + '">' + Question + '</span></td>';
        //} else {
        //    html += '<td><span style="color:' + Color + '">' + Question + '</span></td>';
        //}
    }

    if (AllKeys[0] == 'C') {


        if (IsYes == 'Y') {
            html += '<td><label class="radio-inline"> <input   type="radio" name="' + KeyValue + '" id="Yes" value="" checked="checked"> </label></td>';
        } else {
            if (IsYes != 'X') {
                html += '<td><label class="radio-inline"> <input   type="radio" name="' + KeyValue + '" id="Yes" value="" > </label></td>';
            }
        }

        if (IsNo == 'Y') {
            html += '<td><label class="radio-inline"> <input   type="radio" name="' + KeyValue + '" id="No" value="" checked="checked"> </label></td>';
        } else {
            if (IsNo != 'X') {
                html += '<td><label class="radio-inline"> <input  type="radio" name="' + KeyValue + '" id="No" value=""> </label></td>';
            }
        }

        if (IsNA == 'Y') {
            if (IsNA != 'X') {
                html += '<td><label class="radio-inline"> <input  type="radio" name="' + KeyValue + '" id="NA" value="" checked="checked"> </label></td>';
            }
        } else {
            if (IsNA != 'X') {
                html += '<td><label class="radio-inline"> <input  type="radio" name="' + KeyValue + '" id="NA" value="" > </label></td>';
            }
        }
    }

    html += '</tr>';
}

function clearALL() {
    $('#txtScanAWBNo').val('');
    $('#txtScanAWBNo').focus();
    $('#txtMAWBAWBNo').val('');
    $('#txtLocationShow').val('');
    $('#txtNOG').val('');
    $('#spnErrormsg').text('');
    $('#txtRemark').val('');
    $('#divVCTDetail').hide();
    $('#TextBoxDiv').empty();
    $('#ddlChecklist').empty();
    // $('#tblChecklistAfterScan').hide();
    $('#divDocsDetail').empty();

}

function ClearIGM() {

    $('#ddlIGM').empty();
}

function clearBeforePopulate() {
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
}

function ChkAndValidate() {

    var ScanCode = $('#txtAWBNo').val();
    ScanCode = ScanCode.replace(/\s+/g, '');
    ScanCode = ScanCode.replace("-", "").replace("–", "");

    if (ScanCode.length >= 11) {

        $('#txtAWBNo').val(ScanCode.substr(0, 11));
        //$('#txtAWBNo').val(ScanCode.substr(3, 8));
        //$('#txtScanCode').val('');

        //GetShipmentStatus();
    }
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

$(function () {
    //$("#txtBCDate").datepicker({
    //    dateFormat: "dd/mm/yy"
    //});
    //$("#txtBCDate").datepicker().datepicker("setDate", new Date());
});


function GetExportCheckListSave() {
    inputRowsOfAns = "";
    inputRowsOfAns += "<Root>"
    $('#tblChecklist tr').each(function () {
        $(this).find("input").each(function () {
            ItemCode = $(this).val();
            var name = $(this).attr('name');
            var Qid = name.split('~');
            var option = $(this).attr('id');
            var QuestionIDInsert = Qid[1]
            if ($(this).is(':checked') == true) {
                inputRowsOfAns += "<Answer><QuestionID>" + QuestionIDInsert + "</QuestionID><Option>" + option + "</Option></Answer>"
            }
        });
    });
    inputRowsOfAns += "</Root>";

    XmlforDetails = '<Root><QuestionaireId>' + QuestionaireId + '</QuestionaireId><QuestionaireDate>' + currentDate + '</QuestionaireDate><CompanyCode>' + companyCode + '</CompanyCode><UserID>' + UserID + '</UserID><AWBNo>' + $("#txtScanAWBNo").val() + '</AWBNo>' +
        '<AirportCity>' + AirportCity + '</AirportCity><CheckListType>' + $("#ddlChecklist").val() + '</CheckListType><QYEAR>' + currentYear + '</QYEAR><EXPAWBROWID>' + RowID + '</EXPAWBROWID><Comments></Comments>' +
        '<Place></Place></Root>';
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetExportCheckListSave",
            data: JSON.stringify({ 'InputXML': XmlforDetails, 'IntputAnsXML': inputRowsOfAns }),
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
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $.alert(StrMessage);
                        $('#myModal').modal('toggle');
                        //  clearALL();
                        return;
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