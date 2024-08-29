
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

});

function setTurkish() {
    //$('#ImpTitle').html("Gösterge Tablosunu Içe Aktar");
    $('#lblVCTAcc').text("Kamyon Kabul");
    $('#lblScr').text("Tarama");
    $('#lblLocation').text("Lokasyon");
    $('#lblIntMov').text("İç hareket");
    $('#lblUnitze').text("Gruplandirma");
}

function setHungarian() {
    $('#lblVCTAcc').text("Áruátvétel");
    $('#lblLocation').text("Lokáció");
    $('#lblIntMov').text("Átlokálás");
    $('#lblUnitze').text("Paletta építés");


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
    if (Mode == "VCTAcceptance") {
        window.location.href = "EXP_VCTAcceptance.html";
        localStorage.setItem('flag', '0');
    }
    else if (Mode == "Screening") {
        localStorage.setItem('EXP_Screening', 'EXP_Screening');
        window.location.href = "EXP_Screening.html";
    }
    else if (Mode == "Location") {
        localStorage.setItem('EXP_Location', 'EXP_Location');
        window.location.href = "EXP_Location.html";
    }
    else if (Mode == "InternalMovement") {
        localStorage.setItem('EXP_InternalMovement', 'EXP_InternalMovement');
        window.location.href = "EXP_InternalMovement.html";
    } else if (Mode == "Unitization") {
        localStorage.setItem('EXP_Unitization', 'EXP_Unitization');
        window.location.href = "EXP_Unitization.html";
    } else if (Mode == "AWBRemarks") {
        localStorage.setItem('Is_I_E', 'E');
        window.location.href = "IMP_AWBRemarks.html";
    } else if (Mode == "GateInStatus") {
        localStorage.setItem('GateInStatus', 'GateInStatus');
        window.location.href = "EXP_GateInStatus.html";
    } else if (Mode == "Checklist") {
        localStorage.setItem('Checklist', 'Checklist');
        window.location.href = "EXP_Checklist.html";
    }

}
