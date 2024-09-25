var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var companyCode = window.localStorage.getItem("companyCode");
var UserName = window.localStorage.getItem("UserName");
var AWB_Number = localStorage.getItem('AWB_Number');
var HAWB_Number = localStorage.getItem('HAWB_Number');
var Flight_Seq_No = localStorage.getItem('Flight_Seq_No');
var allIDs = localStorage.getItem('allIDs');
var imgDataForSave = '';
var increamentVal = 1;
var _xmlDocTable;
var i = 1;
var AIRLINE_PREFIX;
var AWB_NUMBER;
var SEQUENCE_NUMBER = '';
var BOOKED_FLIGHT_SEQUENCE_NUMBER;
var IMPAWBROWID;
var IMPSHIPROWID;
var ImagesXmlGen = '';
var _DamageDataXML2, _ShipTotalPcsXML2, _PackagingXML3, _OuterPackingXML4, _InnerPackingXML5, _IsSufficientXML6;
var _DamageObserContainersXML7, _SpaceForMissingXML8, _SpaceForMissingXML9, _DamageRemarkedXML10, _DispositionXML11;
$(function () {


    GetImportDamageRecordDetails(allIDs);

    document.getElementById("cameraTakePicture").addEventListener
        ("click", cameraTakePicture);

    $('#txtIndividualWt').keyup(function () {
        var val = $(this).val();
        if (isNaN(val)) {
            val = val.replace(/[^0-9\.]/g, '');
            if (val.split('.').length > 2)
                val = val.replace(/\.+$/, "");
        }
        $(this).val(val);
    });

    $('#txtPckgsRCV').keyup(function () {
        var val = $(this).val();
        if (isNaN(val)) {
            val = val.replace(/[^0-9\.]/g, '');
            if (val.split('.').length > 2)
                val = val.replace(/\.+$/, "");
        }
        $(this).val(val);
    });

    $(".next").click(function () {

        var typeofDisvalues = '';
        if (increamentVal == 1) {

            $('#divTypeofdiscrepancy').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    typeofDisvalues = $(this).attr('id');
                    // console.log(typeofDisvalues)
                    //if ($('#txtPckgsEXP').val() == "" ) {
                    //    $('#emMsg').text('Please enter damage Pcs.').css('color', 'red');
                    //    $('#txtPckgsEXP').focus();
                    //    //alert('Please enter damage Pcs. and Wt.');
                    //    return;
                    //} else if ($('#txtPckgsRCV').val() == "") {
                    //    $('#emMsg').text('Please enter damage Wt.').css('color', 'red');
                    //    $('#txtPckgsRCV').focus();
                    //} else {
                    //    $('#emMsg').text('');
                    //}
                });
            });

        }

        if (increamentVal == 2) {

            $('#divTypeofdiscrepancy').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    typeofDisvalues = $(this).attr('id');
                    //  console.log(typeofDisvalues)
                });
            });
            if ($('#txtPckgsEXP').val() == "") {
                $('#emMsg').text('Please enter damage Pcs.').css('color', 'red');
                $('#txtPckgsEXP').focus();
                //alert('Please enter damage Pcs. and Wt.');
                return;
            }
            if ($('#txtPckgsRCV').val() == "") {
                $('#emMsg').text('Please enter damage Wt.').css('color', 'red');
                $('#txtPckgsRCV').focus();
                return;
            } else {
                $('#emMsg').text('');
            }
            //if ($('#txtPckgsEXP').val() == "" || $('#txtPckgsRCV').val() == "") {
            //    $('#emMsg').text('Please enter damage Pcs. and Wt.').css('color', 'red');
            //    //alert('Please enter damage Pcs. and Wt.');
            //    return;
            //} else {
            //    $('#emMsg').text('');
            //}
            _DamageDataXML2 = '<AwbPrefix>' + AIRLINE_PREFIX + '</AwbPrefix><AwbNumber>' + AWB_NUMBER + '</AwbNumber><AWBId>' + IMPAWBROWID + '</AWBId><SHIPId>' + IMPSHIPROWID + '</SHIPId>' +
                '<FlightSeqNo>' + Flight_Seq_No + '</FlightSeqNo><HouseSeqNo>0</HouseSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><UserID>' + UserID + '</UserID>' +
                '<TypeOfDiscrepancy>' + typeofDisvalues + '</TypeOfDiscrepancy>';

            _ShipTotalPcsXML2 = '<ShipTotalPcs>' + $('#lblNPX').text() + '</ShipTotalPcs><ShipTotalWt>' + $('#lblWtExp').text() + '</ShipTotalWt><ShipDamagePcs>' + $('#txtPckgsEXP').val() + '</ShipDamagePcs><ShipDamageWt>' + $('#txtPckgsRCV').val() + '</ShipDamageWt>' +
                '<ShipDifferencePcs>' + $('#lblNPR').text() + '</ShipDifferencePcs><ShipDifferenceWt>' + $('#lblWtRec').text() + '</ShipDifferenceWt>' +
                '<IndividualWTPerDoc>' + $('#txtIndividualWt').val() + '</IndividualWTPerDoc><IndividualWTActChk>' + $('#txtIndividualActualWt').val() + '</IndividualWTActChk><IndividualWTDifference>' + $('#diffrent').text() + '</IndividualWTDifference>';
            //console.log(_DamageDataXML2)
            //console.log(_ShipTotalPcsXML2)
        }

        if (increamentVal == 3) {
            var Materialvalues = [];

            $('#divChkMaterial').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Materialvalues.push($(this).attr('id'));
                });
            });
            var MaterialVal = Materialvalues.join(",");

            var Typevalues = [];
            $('#divType').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Typevalues.push($(this).attr('id'));
                });
            });
            var TypelVal = Typevalues.join(",");

            var MarkanLabelvalues = [];
            $('#divMarkanLabel').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    MarkanLabelvalues.push($(this).attr('id'));
                });
            });
            var MarkanLabelVal = MarkanLabelvalues.join(",");

            var OuterPackingvalues = [];
            $('#divOuterPacking').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    OuterPackingvalues.push($(this).attr('id'));
                });
            });
            var OuterPackingVal = OuterPackingvalues.join(",");

            _PackagingXML3 = '<ContainerMaterial>' + MaterialVal + '</ContainerMaterial><ContainerType>' + TypelVal + '</ContainerType>' +
                '<MarksLabels>' + MarkanLabelVal + '</MarksLabels>';
            // console.log(_PackagingXML3)
        }

        if (increamentVal == 4) {

            var OuterPackingvalues = [];
            $('#divOuterPacking').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    OuterPackingvalues.push($(this).attr('id'));
                });
            });
            var OuterPackingVal = OuterPackingvalues.join(",");

            _OuterPackingXML4 = '<OuterPacking>' + OuterPackingVal + '</OuterPacking>';
            // console.log(_OuterPackingXML4)
        }

        if (increamentVal == 5) {
            var InnerPackingvalues = [];
            $('#divInnerPacking').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    InnerPackingvalues.push($(this).attr('id'));
                });
            });
            var InnerPackingVal = InnerPackingvalues.join(",");
            _InnerPackingXML5 = '<InnerPacking>' + InnerPackingVal + '</InnerPacking>';
            //  console.log(_InnerPackingXML5)

        }

        if (increamentVal == 6) {
            var DetalofDamageObservedvalues = [];
            var DetalofDamageObservedvaluesoftextbox = [];
            var isPackRadiovalues = [];

            $('#isPackRadio').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {

                    /* var id = $(this).attr('id');*/
                    isPackRadiovalues.push($(this).attr('id'));
                });
            });

            //$('#divDetalofDamageObserved').each(function () {
            //    $(this).find("input[type='checkbox']:checked").each(function () {
            //        /* var id = $(this).attr('id');*/
            //        InnerPackingvalues.push($(this).attr('id'));
            //    });
            //});

            var course_arr = [];
            var allBoxVal;
            $('#divDetalofDamageObserved').each(function () {
                //$(this).find("input[type='checkbox']:checked").each(function () {
                //    /* var id = $(this).attr('id');*/
                //    course_arr.push($(this).attr('id'));
                //});

                $(this).find("input[type*='number']").each(function () {
                    if ($(this).val() != "") {
                        course_arr.push($(this).attr('id') + '~' + $(this).val());
                    }
                });

                $(this).find("input[type='checkbox']:checked").each(function () {
                    course_arr.push($(this).attr('id'));
                });
                //$(this).find("input[type*='number']").each(function () {
                //    if ($(".checkontext").prop('disabled', true)) {
                //        alert('l')
                //        if ($(this).val() != "") {
                //            course_arr.push($(this).attr('id') + '~' + $(this).val());
                //        } 
                //    }
                //    //if ($(this).val() != "") {
                //    //    course_arr.push($(this).attr('id') + '~' + $(this).val());
                //    //} else {
                //    //    //$('#divDetalofDamageObserved').each(function () {
                //    //    //    $(this).find("input[type='checkbox']:checked").each(function () {
                //    //    //        /* var id = $(this).attr('id');*/
                //    //    //        course_arr.push($(this).attr('id'));
                //    //    //    });
                //    //    //});
                //    //}
                //});

            });
            var DetalofDamageObservedVal = course_arr.join(",");

            console.log(DetalofDamageObservedVal)

            //$('#divDetalofDamageObserved').each(function () {
            //    $(this).find("input[type='checkbox']:checked").each(function () {

            //        $(this).find("input[type*='number']").each(function () {
            //            if ($(this).val() != "") {
            //                course_arr.push($(this).attr('id') + '~' + $(this).val());
            //            } else {
            //                alert('please enter pieces');
            //                return;
            //            }

            //        });
            //    });
            //});



            _IsSufficientXML6 = '<IsSufficient>' + isPackRadiovalues + '</IsSufficient><DamageObserContent>' + DetalofDamageObservedVal + '</DamageObserContent>';
            //   console.log(_IsSufficientXML6)
        }

        //if (increamentVal == 6) {
        //    $('#divDetalofDamageObserved input:checkbox').each(function () {
        //        $(this).find("input[type*='number']").each(function () {
        //            if (!$(this).find("input[type*='number']").attr('disabled')) {
        //                alert('Please enter pieces.');
        //                return;
        //            }
        //        });
        //    });

        //}

        if (increamentVal == 7) {
            var Containersvalues = [];

            $('#divContainers').each(function () {
                //$(this).find("input[type='checkbox']:checked").each(function () {
                //    /* var id = $(this).attr('id');*/
                //    Containersvalues.push($(this).attr('id'));
                //});

                $(this).find("input[type*='number']").each(function () {
                    if ($(this).val() != "") {
                        Containersvalues.push($(this).attr('id') + '~' + $(this).val());
                    }
                });
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Containersvalues.push($(this).attr('id'));
                });
            });
            var ContainersVal = Containersvalues.join(",");
            console.log(ContainersVal);
            var DamageDiscoveredvalues = [];

            $('#divDamageDiscovered').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    DamageDiscoveredvalues.push($(this).attr('id'));
                });
            });
            var DamageDiscoveredVal = DamageDiscoveredvalues.join(",");

            _DamageObserContainersXML7 = '<DamageObserContainers>' + ContainersVal + '</DamageObserContainers>' +
                '<DamageDiscovered>' + DamageDiscoveredVal + '</DamageDiscovered>';
            // console.log(_DamageObserContainersXML7)
        }

        if (increamentVal == 8) {
            var Spacemissingvalues = [];

            $('#divrbtSpacemissing').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Spacemissingvalues.push($(this).attr('id'));
                });
            });


            var Inviocevalues = [];

            $('#divrbtInvioce').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Inviocevalues.push($(this).attr('id'));
                });
            });


            var WeatherConditionvalues = [];

            $('#divWeatherCondition').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    WeatherConditionvalues.push($(this).attr('id'));
                });
            });
            var WeatherConditionVal = WeatherConditionvalues.join(",");

            var DamageApparentlycausedbyvalues = [];

            $('#divTheDamageApparentlycausedby').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    DamageApparentlycausedbyvalues.push($(this).attr('id'));
                });
            });
            var DamageApparentlycausedbyVal = DamageApparentlycausedbyvalues.join(",");
            _SpaceForMissingXML8 = '<SpaceForMissing>' + Spacemissingvalues + '</SpaceForMissing><VerifiedInvoice>' + Inviocevalues + '</VerifiedInvoice><WeatherCondition>' + WeatherConditionVal + '</WeatherCondition><AparentCause>' + DamageApparentlycausedbyVal + '</AparentCause>';
            //  console.log(_SpaceForMissingXML8)
        }

        if (increamentVal == 9) {
            if ($('#txtAreaRemarkincase').val().trim() == '') {
                $('#emMsgRem').text('Please enter remark.').css('color', 'red');
                $('#txtAreaRemarkincase').focus();
                $('#txtAreaRemarkincase').val('');
                //alert('Please enter damage Pcs. and Wt.');
                return;
            } else {
                $('#emMsgRm').text('');
                localStorage.setItem('remarkOfTextarea', $('#txtAreaRemarkincase').val());
            }
            var Evidancevalues = [];

            $('#divrbtEvidance').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Evidancevalues.push($(this).attr('id'));
                });
            });

            var SalvageActionvalues = [];

            $('#divSalvageAction').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    SalvageActionvalues.push($(this).attr('id'));
                });
            });

            var SalvageActionVal = SalvageActionvalues.join(",");

            _DamageRemarkedXML10 = '<DamageRemarked>' + $('#txtExactWording').val() + '</DamageRemarked><EvidenceOfPilerage>' + Evidancevalues + '</EvidenceOfPilerage><Remarks>' + $('#txtAreaRemarkincase').val() + '</Remarks><SalvageAction>' + SalvageActionVal + '</SalvageAction>';
            //  console.log(_DamageRemarkedXML10)
        }


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
        }
        if (increamentVal == 9) {
            $(this).hide();
        }
        i++;
        increamentVal = i;
        //  console.log(increamentVal);
    });

    $(".pre").click(function () {
        $('.next').show();
        $('#emMsgRem').text('');
        $('#onlyimageCount').text('');
        $('#emMsg').text('');
        $("#cameraTakePicture").removeAttr('disabled');
        imageDataForArray = [];
        ImagesXmlGen = '';
        $('#divImages').empty();
        $showing = $('.content .first.visible').first();
        $next = $showing.prev();
        $showing.removeClass("visible").hide();
        $next.addClass("visible").show();

        if (!$next.prev().length) {
            // $(this).hide();
        }
        i--;
        increamentVal = i;
        if (increamentVal == 0) {
            window.location.href = 'IMP_RecordDamage.html';
            return
        }

        $('#divDetalofDamageObserved input:checkbox').each(function () {
            if (this.checked) {
                $(this).closest("tr").find('.checkontext').removeAttr("disabled").css('border', '1px solid #ccc');

            }
        });

        $('#divContainers input:checkbox').each(function () {
            if (this.checked) {
                $(this).closest("tr").find('.checkontextContainer').removeAttr("disabled").css('border', '1px solid #ccc');
            }
        });
    });

    $('#btnRecordDamage').click(function () {
        /*  AllImages(imageDataForArray);*/
        //if (increamentVal == 11) {
        AllImages(imageDataForArray);
        var Dispositionvalues = [];

        $('#divDisposition').each(function () {
            $(this).find("input[type='checkbox']:checked").each(function () {
                /* var id = $(this).attr('id');*/
                Dispositionvalues.push($(this).attr('id'));
            });
        });

        var Disposition = Dispositionvalues.join(",");

        _DispositionXML11 = '<Disposition>' + Disposition + '</Disposition><GHARepresent>' + $('#txtGHARepresentative').val() + '</GHARepresent><AirlineRepresent>' + $('#txtAirlineRepresentative').val() + '</AirlineRepresent>' +
            '<SecurityRepresent>' + $('#txtSecurityRepresentative').val() + '</SecurityRepresent><ProblemSeqId>' + SEQUENCE_NUMBER + '</ProblemSeqId>' + ImagesXmlGen + '';

        if (ImagesXmlGen == '') {
            ImagesXmlGen = '<DamageRecordImage></DamageRecordImage>';
        }

        var finalXML = '<ROOT><DamageData>' + _DamageDataXML2 + _ShipTotalPcsXML2 + _PackagingXML3 + _OuterPackingXML4 + _InnerPackingXML5 + _IsSufficientXML6 +
            _DamageObserContainersXML7 + _SpaceForMissingXML8 + _DamageRemarkedXML10 + _DispositionXML11 + '</DamageData></ROOT>';
        // console.log(finalXML);
        SaveImportDamageRecordDetails(finalXML);

        $('#txtAreaRemark').val($('#txtAreaRemarkincase').val())
        $('#myModal').modal('toggle');
        // }
    });



});// JavaScript source code
var imageDataForArray = new Array();
function cameraTakePicture() {

    navigator.camera.getPicture(onSuccess, onFail, {
        //quality: 100,
        //encodingType: Camera.EncodingType.JPEG,
        ////allowEdit: true,
        ////correctOrientation: true,
        //targetWidth: 250,
        //targetHeight: 250,
        //destinationType: Camera.DestinationType.DATA_URL
        destinationType: Camera.DestinationType.DATA_URL, //DATA_URL , FILE_URI
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true,
        correctOrientation: true //Corrects Android orientation quirks
    });

    //var options = {
    //    quality: 50,
    //    destinationType: Camera.DestinationType.DATA_URL,
    //    sourceType: Camera.PictureSourceType.CAMERA,
    //    mediaType: Camera.MediaType.CAMERA,
    //    encodingType: Camera.EncodingType.JPEG,
    //    saveToPhotoAlbum: true
    //};
    //navigator.camera.getPicture(onSuccess, onFail, options);
}

function onSuccess(imageData) {
    //var image = document.getElementById('myImage');
    var data = "data:image/jpeg;base64," + imageData;
    imgDataForSave = imageData;
    //$('#myImage').attr('src', data);
    //$('#myImage').css('display', 'block');
    // console.log(imgData);
    imageDataForArray.push(imgDataForSave);
    htmlImages = '';
    // $("#onlyimageCount").text(imageDataForArray.length);
    //for (var i = 0; i < imageDataForArray.length; i++) {
    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
    htmlImages += '</div>';

    $('#divImages').append(htmlImages);
    if (imageDataForArray.length == 10) {
        $("#cameraTakePicture").attr('disabled', 'disabled');
    }
    console.log(imageDataForArray);

}
//if (imageDataForArray.length == 1) {
//    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
//    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
//    htmlImages += '</div>';
//}
//if (imageDataForArray.length == 2) {
//    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
//    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
//    htmlImages += '</div>';
//}
//if (imageDataForArray.length == 3) {
//    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
//    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
//    htmlImages += '</div>';
//}




function onFail(message) {
    //  alert('Failed because: ' + message);
}


function AllImages(imageDataForArray) {
    ImagesXmlGen = '';
    // ImagesXmlGen = "<DamageRecordImage>";
    for (var n = 0; n < imageDataForArray.length; n++) {
        ImagesXmlGen += "<DamageRecordImage><images>" + imageDataForArray[n] + "</images></DamageRecordImage>";
    }
    // ImagesXmlGen += "</DamageRecordImage>";
    //  console.log(ImagesXmlGen);
    return ImagesXmlGen;

}

function CheckEmpty() {

    if ($('#txtGroupId').val() != '' && $('#txtLocation').val() != '') {
        $('#btnMoveDetail').removeAttr('disabled');
    } else {
        $('#btnMoveDetail').attr('disabled', 'disabled');
        return;
    }

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
                // console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                // console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}



function backPrevPage() {
    localStorage.removeItem('AWB_Number');
    localStorage.removeItem('HAWB_Number');
    localStorage.removeItem('Flight_Seq_No');
    localStorage.removeItem('allIDs');
    window.location.href = 'IMP_RecordDamage.html'
}

function calculateDiff() {
    var T_Pcs = parseInt($('#lblNPX').text());
    var D_Pcs = parseInt($('#txtPckgsEXP').val());

    if (T_Pcs < D_Pcs) {
        $('#emMsg').text('Damage pcs ' + $('#txtPckgsEXP').val() + ' cannot be greater than Shipment Rcvd pcs - ' + $('#lblNPX').text() + '').css('color', 'red');
        $('#txtPckgsEXP').val('');

        $('#lblNPR').text('');
        return;
    } else {

        $('#emMsg').text('');
        DiffPcs = T_Pcs - D_Pcs

        if (!isNaN(DiffPcs)) {
            $('#lblNPR').text(parseInt(DiffPcs));
        }
    }



}

function lettersOnlyGHA(inputtxt) {

    var letters = /^[a-zA-Z][a-zA-Z ]*$/;
    if (inputtxt.value.match(letters)) {
        return true;
    }
    else {
        $('#txtGHARepresentative').val('');
        return false;
    }
}
function lettersOnlyAirLine(inputtxt) {

    var letters = /^[a-zA-Z][a-zA-Z ]*$/;
    if (inputtxt.value.match(letters)) {
        return true;
    }
    else {
        $('#txtAirlineRepresentative').val('');
        return false;
    }
}

function lettersOnlySecurity(inputtxt) {

    var letters = /^[a-zA-Z][a-zA-Z ]*$/;
    if (inputtxt.value.match(letters)) {
        return true;
    }
    else {
        $('#txtSecurityRepresentative').val('');
        return false;
    }
}


function calculateDiffWt() {

    var T_Wt = parseFloat($('#lblWtExp').text());
    var D_Wt = parseFloat($('#txtPckgsRCV').val());
    if (T_Wt < D_Wt) {
        $('#emMsg').text('Damage weight ' + $('#txtPckgsRCV').val() + ' cannot be greater than Shipment Rcvd weight - ' + $('#lblWtExp').text() + '').css('color', 'red');
        $('#txtPckgsRCV').val('');

        $('#lblWtRec').text('');

        return;
    } else {
        $('#emMsg').text('');
        DiffWt = T_Wt - D_Wt;
        if (!isNaN(parseFloat(DiffWt))) {
            $('#lblWtRec').text(parseFloat(DiffWt).toFixed(2));
        }

    }
}

function calculateDiffWtActual() {

    var A_wt = parseFloat($('#txtIndividualWt').val());
    var Ac_wt = parseFloat($('#txtIndividualActualWt').val());

    if (parseInt(A_wt) < parseInt(Ac_wt)) {
        $('#emMsg').text('Actual Wt. ' + $('#txtIndividualWt').val() + ' cannot be greater than document Wt. ' + $('#txtIndividualActualWt').val() + '').css('color', 'red');
        $('#txtPckgsEXP').val('');
        $('#diffrent').text('');
        $('#txtIndividualActualWt').val('');

        return;
    } else {
        $('#emMsg').text('');
        DiffWt_Awt = A_wt - Ac_wt;
        if (!isNaN(parseFloat(DiffWt_Awt))) {
            $('#diffrent').text(parseFloat(DiffWt_Awt).toFixed(2));
        }
    }
}

function GetImportDamageRecordDetails(allIDs) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var valuesOfAll = allIDs.split(',');


    IMPAWBROWID = valuesOfAll[0];
    IMPSHIPROWID = valuesOfAll[1];
    M_indi = valuesOfAll[2];

    // console.log(BOOKED_FLIGHT_SEQUENCE_NUMBER + '/' + IMPAWBROWID + '/' + IMPSHIPROWID)

    InputXML = '<Root><AWBId>' + IMPAWBROWID + '</AWBId><SHIPId>' + IMPSHIPROWID + '</SHIPId><FlightSeqNo>' + Flight_Seq_No + '</FlightSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImportDamageRecordDetails",
            data: JSON.stringify({
                'InputXML': InputXML,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                $("body").mLoading('hide');
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                console.log(xmlDoc);

                $(xmlDoc).find('Table15').each(function (index) {

                    SEQUENCE_NUMBER = $(this).find('SEQUENCE_NUMBER').text();
                    TYPE_DISCREPANCY = $(this).find('TYPE_DISCREPANCY').text();
                    PACK_CONTAINER_MATERIAL = $(this).find('TYPE_DISCREPANCY').text();

                });

                if (SEQUENCE_NUMBER != '') {
                    $.alert('Damage details are already captured, hence cannot proceed.');
                    $('.alert_btn').click(function () {
                        //if (M_indi != 'H') {

                        //    localStorage.setItem('remarkOfTextarea', $('#txtAreaRemarkincase').val());
                        //    window.location.href = 'IMP_RecordDamage.html';
                        //    return
                        //} else {
                        //    localStorage.setItem('remarkOfTextarea', $('#txtAreaRemarkincase').val());
                        //    window.location.href = 'IMP_RecordDamage.html';
                        //    return
                        //}
                        /* localStorage.setItem('remarkOfTextarea', $('#txtAreaRemarkincase').val());*/
                        window.location.href = 'IMP_RecordDamage.html';
                        return

                    });
                }

                $(xmlDoc).find('Table1').each(function (index) {

                    AIRLINE_PREFIX = $(this).find('AIRLINE_PREFIX').text();
                    AWB_NUMBER = $(this).find('AWB_NUMBER').text();

                    $('#lblAWBNoForShow').text($(this).find('AIRLINE_PREFIX').text() + '-' + $(this).find('AWB_NUMBER').text()).css('text-tran');

                    //$('#txtOrigin').val($(this).find('ORIGIN').text());
                    //$('#txtDestination').val($(this).find('DESTINATION').text());
                    //$('#txPointofLoading').val($(this).find('ORIGIN').text());
                    //$('#txtContentasperAWB').val($(this).find('DESCRIPTION').text());
                    //$('#txPointofUnloading').val($(this).find('OFFLOAD_POINT').text());

                    $('#txtOrigin').text($(this).find('ORIGIN').text());
                    $('#txtDestination').text($(this).find('DESTINATION').text());
                    $('#txPointofLoading').text($(this).find('ORIGIN').text());
                    $('#txtContentasperAWB').text($(this).find('DESCRIPTION').text());
                    $('#txPointofUnloading').text($(this).find('OFFLOAD_POINT').text());

                    $('#lblNPX').text($(this).find('NPX').text());
                    $('#lblWtExp').text($(this).find('WtExp').text());
                    // $('#lblNPR').text($(this).find('NPR').text());
                    // $('#lblWtRec').text($(this).find('WtRec').text());

                });


                html = '';
                $(xmlDoc).find('Table2').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text();
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text();

                    html += '<div class="col-xs-6 col-form-label">';
                    html += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '" >';
                    html += '</label>';
                    html += '</div>';

                });
                html1 = '';
                $(xmlDoc).find('Table3').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html1 += '<div class="col-xs-6 col-form-label">';
                    html1 += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html1 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html1 += '</label>';
                    html1 += '</div>';

                });

                html2 = '';
                $(xmlDoc).find('Table4').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html2 += '<div class="col-xs-12 col-form-label">';
                    html2 += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html2 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html2 += '</label>';
                    html2 += '</div>';

                });


                html3 = '';
                $(xmlDoc).find('Table5').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html3 += '<div class="col-xs-12 col-form-label">';
                    html3 += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html3 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html3 += '</label>';
                    html3 += '</div>';

                });

                html4 = '';
                $(xmlDoc).find('Table6').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html4 += '<div class="col-xs-12 col-form-label ">';
                    html4 += '<label for="' + REFERENCE_DATA_IDENTIFIER + '" class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html4 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html4 += '</label>';
                    html4 += '</div>';

                });

                html5 = '';
                $(xmlDoc).find('Table7').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()


                    html5 += '<tr>';
                    html5 += '<td><label class="checkbox-inline"><input onchange="onChangeCheckonText();"  type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">' + REFERENCE_DESCRIPTION + '</label></td>';
                    html5 += '<td><input disabled="disabled" type="number" id="' + REFERENCE_DATA_IDENTIFIER + '" class="form-control checkontext"></td>';
                    html5 += '</tr>';


                });

                html6 = '';
                $(xmlDoc).find('Table8').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html6 += '<div class="col-xs-6 col-form-label">';
                    html6 += '<label class="checkbox-inline">';
                    html6 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html6 += '</label>';
                    html6 += '</div>';

                });

                html7 = '';
                $(xmlDoc).find('Table8').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    //html7 += '<div class="col-xs-6 col-form-label">';
                    //html7 += '<label class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    //html7 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    //html7 += '</label>';
                    //html7 += '</div>';
                    html7 += '<tr>';
                    html7 += '<td style="white-space: nowrap;"><label class="checkbox-inline"><input onchange="onChangeCheckonTextContainer();"  type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">' + REFERENCE_DESCRIPTION + '</label></td>';
                    html7 += '<td style="white-space: nowrap;"><input disabled="disabled" type="number" id="' + REFERENCE_DATA_IDENTIFIER + '" class="form-control checkontextContainer"></td>';
                    html7 += '</tr>';

                });

                html8 = '';
                $(xmlDoc).find('Table9').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html8 += '<div class="col-xs-12 col-form-label">';
                    html8 += '<label class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html8 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html8 += '</label>';
                    html8 += '</div>';

                });

                html9 = '';
                $(xmlDoc).find('Table10').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html9 += '<div class="col-xs-12 col-form-label">';
                    html9 += '<label  class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html9 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html9 += '</label>';
                    html9 += '</div>';

                });


                html10 = '';
                $(xmlDoc).find('Table11').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()
                    html10 += '<label class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html10 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html10 += '</label></br>';

                });

                html11 = '';
                $(xmlDoc).find('Table13').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()
                    html11 += '<label style="padding-left: 20px;" class="radio-inline"> <input type="radio" name="typeofDis" id="' + REFERENCE_DATA_IDENTIFIER + '" value="' + REFERENCE_DATA_IDENTIFIER + '" >' + REFERENCE_DESCRIPTION + ' </label><br>';

                });

                html12 = '';
                $(xmlDoc).find('Table14').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html12 += '<label class="checkbox-inline"> <input type="checkbox" name="wether" id="' + REFERENCE_DATA_IDENTIFIER + '" value="' + REFERENCE_DESCRIPTION + '">' + REFERENCE_DESCRIPTION + ' </label></br>';
                });

                html13 = '';
                $(xmlDoc).find('Table12').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html13 += '<label class="checkbox-inline"> <input type="checkbox" name="wether" id="' + REFERENCE_DATA_IDENTIFIER + '" value="' + REFERENCE_DESCRIPTION + '">' + REFERENCE_DESCRIPTION + ' </label></br>';
                });

                $(xmlDoc).find('Table16').each(function (index) {

                    FLIGHT_AIRLINE = $(this).find('FLIGHT_AIRLINE').text()
                    FLIGHT_NUMBER_I800 = $(this).find('FLIGHT_NUMBER_I800').text()
                    SCHEDULED_ARRIVAL_DATETIME = $(this).find('SCHEDULED_ARRIVAL_DATETIME').text()

                    // $('#txFlightNo').val($(this).find('FLIGHT_AIRLINE').text() + '-' + $(this).find('FLIGHT_NUMBER_I800').text() + ' / ' + $(this).find('SCHEDULED_ARRIVAL_DATETIME').text());
                    $('#txFlightNo').text($(this).find('FLIGHT_AIRLINE').text() + '-' + $(this).find('FLIGHT_NUMBER_I800').text() + ' / ' + $(this).find('SCHEDULED_ARRIVAL_DATETIME').text());
                });



                $('#divChkMaterial').append(html);
                $('#divType').append(html1);
                $('#divMarkanLabel').append(html2);
                $('#divOuterPacking').append(html3);
                $('#divInnerPacking').append(html4);
                $('#divDetalofDamageObserved').append(html5);
                $('#divDetalofDamageObservedB').append(html6);
                $('#divContainers').append(html7);
                $('#divDamageDiscovered').append(html8);
                $('#divTheDamageApparentlycausedby').append(html9);
                $('#divSalvageAction').append(html10);
                $('#divTypeofdiscrepancy').append(html11);
                $('#divWeatherCondition').append(html12);
                $('#divDisposition').append(html13);
                // $('#divSalvageAction').append(html10);

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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

function onChangeCheckonText() {

    $('#divDetalofDamageObserved input:checkbox').each(function () {
        //if (this.checked)
        //    $(this).closest("tr").find('.checkontext').removeAttr("disabled");
        //else
        //    $(this).closest("tr").find('.checkontext').prop("disabled", true);
        if (this.checked) {
            //  $(this).closest("tr").find('.checkontext').removeAttr("disabled");
            $(this).closest("tr").find('.checkontext').removeAttr("disabled").css('border', 'thin solid red').focus();
            return true;
        }
        else {
            // $(this).closest("tr").find('.checkontext').prop("disabled", true);
            $(this).closest("tr").find('.checkontext').prop("disabled", true).css('border', '1px solid #ccc');
            //$(this).closest("tr").find('.checkontext').removeAttr("disabled").css('border', 'thin solid red');
        }
    });
}

function onChangeCheckonTextContainer() {

    $('#divContainers input:checkbox').each(function () {
        //    if (this.checked)
        //        $(this).closest("tr").find('.checkontextContainer').removeAttr("disabled");
        //    else
        //        $(this).closest("tr").find('.checkontextContainer').prop("disabled", true);
        if (this.checked) {
            //  $(this).closest("tr").find('.checkontext').removeAttr("disabled");
            $(this).closest("tr").find('.checkontextContainer').removeAttr("disabled").css('border', 'thin solid red').focus();

        }
        else {
            // $(this).closest("tr").find('.checkontext').prop("disabled", true);
            $(this).closest("tr").find('.checkontextContainer').prop("disabled", true).css('border', '1px solid #ccc');
            //$(this).closest("tr").find('.checkontext').removeAttr("disabled").css('border', 'thin solid red');
        }
    });


}

function clearALL() {
    $('#txtAWBNo').val('');
    $('#txtAWBNo').focus();
    $('#ddlHAWB').empty();
    $('#ddlFlightNo').empty();
    $('#txtLocationShow').val('');
    $('#txtAreaRemark').val('');


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



function SaveImportDamageRecordDetails(finalXML) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    // InputXML = '<Root><AWBNo>' + $("#txtAWBNo").val() + '</AWBNo><AirportCity>' + AirportCity + '</AirportCity></Root>';
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "SaveImportDamageRecordDetails",
            data: JSON.stringify({ 'InputXML': finalXML }),
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
                //console.log(xmlDoc)
                $('#ddlHAWB').empty();


                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $.alert(StrMessage);
                        $('#txtAWBNo').val('');
                        $('#txtAWBNo').focus();
                        return;
                    } else {
                        $.alert(StrMessage);
                        $('.alert_btn').click(function () {
                            //localStorage.removeItem('AWB_Number');
                            //localStorage.removeItem('HAWB_Number');
                            //localStorage.removeItem('Flight_Seq_No');
                            //localStorage.removeItem('allIDs');
                            window.location.href = 'IMP_RecordDamage.html';
                            return
                        });
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


var validateDecimalNumber = function (e) {
    var t = e.value;
    e.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;

}