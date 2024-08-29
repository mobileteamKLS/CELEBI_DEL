

var Column1ForBeakdown = window.localStorage.getItem("Column1ForBeakdown");

(function () {
    document.addEventListener('backbutton', onBackKeyDown, false);
    //document.addEventListener('deviceready', DropDown, false);

    setTimeout(function () {
        window.location.href = 'Login.html'
    }, 1200000);
}
)();



$(function () {

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

    if (Column1ForBeakdown == 'Y') {
        $("#divBreakdown").show();
    } else {
        $("#divBreakdown").hide();
    }

});


function setTurkish() {
    //$('#ImpTitle').html("Gösterge Tablosunu Içe Aktar");
    $('#lblFlCheckIn').text("Ucus Check In");
    $('#lblDocUpload').text("Belge Yukleme");
    $('#lblLocation').text("Lokasyon");
    $('#lblIntMov').text("İç hareket");
    $('#lblWDO').text("Depo Teslim Siparişi");
}

function setHungarian() {
    $('#lblFlCheckIn').text("Járat érkeztetés");
    $('#lblDocUpload').text("Okmány feltöltés");
    $('#lblLocation').text("Lokáció");
    $('#lblIntMov').text("Átlokálás");
    $('#lblWDO').text("Árukiadás");

    

}


function onBackKeyDown() {
    if ($('#divDashBoardImport').is(':visible')) {
        $('#divMode').show();
        $('#divDashBoardImport').hide();
        $('#divDashBoardExport').hide();
    }
    else if ($('#divDashBoardExport').is(':visible')) {
        $('#divMode').show();
        $('#divDashBoardImport').hide();
        $('#divDashBoardExport').hide();
    }
    else {
        navigator.app.backHistory();
    }
}
function DropDownClick() {
    //if (element.id == "aImport") {
    //    if ($('#aImport').attr('aria-expanded').toString() == "false") {
    //        $('#divMain').removeClass("VerticallyCenter");
    //    }
    //    else {
    //        $('#divMain').addClass("VerticallyCenter");
    //    }
    //}
    //else if (element.id == "aExport") {
    //    if ($('#aExport').attr('aria-expanded').toString() == "false") {
    //        $('#divMain').removeClass("VerticallyCenter");
    //    }
    //    else {
    //        $('#divMain').addClass("VerticallyCenter");
    //    }
    //}

    if ($('#btnnavbar').attr('aria-expanded').toString() == "false") {
        $('#divMain').removeClass("VerticallyCenter");
    }
    else {
        $('#divMain').addClass("VerticallyCenter");
    }

}
function DisplayScreen(Mode) {
    if (Mode == "FlightCheckIn") {
        window.location.href = "IMP_FlightCheckIn.html";
    }
    else if (Mode == "DocsUpload") {
        window.location.href = "IMP_DocsUpload.html";
    }
    else if (Mode == "Location") {
        window.location.href = "IMP_Location.html";
    }
    else if (Mode == "InternalMovement") {
        localStorage.setItem('InternalMovement', 'InternalMovement');
        window.location.href = "IMP_InternalMovement.html";
    }
    else if (Mode == "WDO") {
        localStorage.setItem('WDO', 'WDO');
        window.location.href = "IMP_WDO.html";
    }
    else if (Mode == "AWBRemarks") {
        localStorage.setItem('Is_I_E', 'I');
        window.location.href = "IMP_AWBRemarks.html";
    }
    else if (Mode == "Breakdown") {
        localStorage.setItem('IMP_Breakdown_Parant', 'IMP_Breakdown_Parant');
        window.location.href = "IMP_Breakdown_Parant.html";
    }
}
