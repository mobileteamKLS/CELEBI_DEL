var txtScanMAWB = window.localStorage.getItem("txtScanMAWB");
var flightNo = window.localStorage.getItem("flightNo");
var flightDate = window.localStorage.getItem("flightDate");
var groupId = window.localStorage.getItem("groupId");
var InputXML = window.localStorage.getItem("courierFlightDetails");

$(function () {
    $("#groupIDTable").hide();
    console.log(InputXML);
    //setTimeout(function () {
    //    window.location.href = 'Login.html'
    //}, 1200000);

    var language = window.localStorage.getItem("Language");

    switch (language) {
        case "English":
            //setEnglish();
            break;
        case "Turkish":
            setTurkish();
            break;
    }

    $("#backToParant").click(function () {
        window.localStorage.setItem("c_flag", '1');
    });

   

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetImportGetCourierAcceptedDetailsV2",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d)
            $("#groupIDTable").empty();
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                // $("#btnDiv").show('slow');
                // $("#tbTable").show('slow');
                var xmlDoc = $.parseXML(str);
                createTable();
                $(xmlDoc).find('Table').each(function (index) {
                    _Status = $(this).find('Status').text();
                    _StrMessage = $(this).find('StrMessage').text();
                    if (_Status == 'E') {
                        //errmsg = _StrMessage;
                        //$.alert(errmsg);
                        $("#groupIDTable").hide();
                        $("#status").val(_StrMessage);
                        $("#statusDiv").show();
                        return;
                    } else {
                        $("#groupIDTable").show();
                        $("#statusDiv").hide();
                        var groupId;
                        if ($(this).find('GroupId').text() == "") {
                            groupId = "-"
                        } else {
                            groupId = $(this).find('GroupId').text();
                        }
                        createDynamicTable($(this).find('HAWB').text(), $(this).find('MPS').text(), $(this).find('Pkgs').text(), $(this).find('Status').text(), groupId);
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {

                });

                $(xmlDoc).find('Table2').each(function (index) {
                    //_Status = $(this).find('Status').text();
                    //_StrMessage = $(this).find('StrMessage').text();
                    //if (_Status == 'E') {
                    //    errmsg = _StrMessage;
                    //    $.alert(errmsg);
                    //    $("#groupIDTable").hide();
                    //    $("#status").val(_StrMessage);
                    //    $("#statusDiv").show();
                    //    return;
                    //} else {
                    //    $("#groupIDTable").show();
                    //    $("#statusDiv").hide();

                    //}
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".status").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    } else if (Status == 'S') {
                        $(".status").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    } else {
                        $(".status").text('');
                    }
                });

                html += "</tbody></table>";

                $('#groupIDTable').append(html);

            } else {
                $("body").mLoading('hide');
                errmsg = "Group Id not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
          //  alert('Server not responding...');
        }
    });
});

function createTable() {
    html = '';

    html += "<table id='tblNews' class='col-12 table-bordered mb-0'>";
    html += "<thead class='theadClass'><tr>";
    html += "<th>HAWB No.</th>";
    html += "<th>MPS No.</th>";
    html += "<th>Pkgs.</th>";
    html += "<th>Status</th>";
    html += "<th>Group Id</th>";
    html += "</tr></thead>";
    html += "<tbody id='tbTable'>";
}

function createDynamicTable(HAWB, MPS, PCGS, Status, GroupId) {
    html += "<tr>";

    html += "<td align='left'>" + HAWB + "</td>";

    html += "<td align='left'>" + MPS + "</td>";

    html += "<td align='center'>" + PCGS + "</td>";

    html += "<td align='left'>" + Status + "</td>";

    html += "<td align='left'>" + GroupId + "</td>";

    html += "</tr>";
}


