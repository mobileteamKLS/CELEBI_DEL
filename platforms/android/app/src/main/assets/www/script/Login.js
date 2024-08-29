document.addEventListener("deviceready", SetRememberLogin, false);
var errmsg = "";
$(function () {
    // localStorage.clear();
    //spHHT_Get_OrgTypemaster('1');

    //here load function
    $("#btnLogin").click(function () { // button click event

        var pUserID = $('#txtUserName').val();
        var pPassword = $('#txtPassword').val();

        if (pUserID == '') {
            errmsg = "Please enter user name</br>";
            $.alert(errmsg);
            return false;
        } else if (pPassword == '') {
            errmsg = "Please enter password</br>";
            $.alert(errmsg);
            return false;
        } else {
            $('body').mLoading({
                text: "Please Wait..",
            });

            //if ($("#ddlBranchWiseList").val() != '-1') {
            //    UserLoginWithDropDown(pUserID, pPassword);
            //}
            //else {

            //}

            //var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            //var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
            //var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pUserID), key,
            //{
            //    keySize: 128 / 8,
            //    iv: iv,
            //    mode: CryptoJS.mode.CBC,
            //    padding: CryptoJS.pad.Pkcs7
            //});
            //var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pPassword), key,
            //{
            //    keySize: 128 / 8,
            //    iv: iv,
            //    mode: CryptoJS.mode.CBC,
            //    padding: CryptoJS.pad.Pkcs7
            //});

            //_pUserID = encryptedlogin.toString();
            //_pPassword = encryptedpassword.toString();

            //UserLogin(_pUserID, _pPassword); // login function
            UserLogin(pUserID, pPassword); // login function
            RememberCheck(); // Remember User id Password function
        }
        //tempUserLogin();
    });
});
//document.addEventListener("deviceready", onDeviceReady, false);
//function onDeviceReady() {
//    document.addEventListener("backbutton", function (e) {
//        e.preventDefault();
//        navigator.notification.confirm("Are you sure want to exit from App?", onConfirmExit, "Confirmation", "Yes,No");
//    }, false);
//}
//function onConfirmExit(button) {
//    if (button == 2) { //If User select a No, then return back;
//        return;
//    } else {
//        navigator.app.exitApp(); // If user select a Yes, quit from the app.
//    }
//}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false); //Listen to the User clicking on the back button
}

function onBackKeyDown(e) {
    e.preventDefault();
    navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No");
    // Prompt the user with the choice
}

function onConfirm(button) {
    if (button == 2) {//If User selected No, then we just do nothing
        return;
    } else if (button == 1) {
        navigator.app.exitApp();// Otherwise we quit the app.
    } else if (button == 0) {
        return;
        // navigator.app.exitApp();// Otherwise we quit the app.
    }
}

// ajax call for logi user start here

UserLogin = function (pUserID, pPassword) {

    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetLoginUserDetails",
        data: JSON.stringify({ 'LoginName': pUserID, 'Password': pPassword }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d)
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {

                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    window.localStorage.setItem("Userid", $(this).find('Userid').text());
                    window.localStorage.setItem("User_Name", $(this).find('User_Name').text());
                    window.localStorage.setItem("User_group", $(this).find('User_group').text());
                    window.localStorage.setItem("ARE_USER_MOVEMENTS_LOGGED", $(this).find('ARE_USER_MOVEMENTS_LOGGED').text());
                    window.localStorage.setItem("ISO_COUNTRY_CODE", $(this).find('ISO_COUNTRY_CODE').text());
                    window.localStorage.setItem("SHED_AIRPORT_CITY", $(this).find('SHED_AIRPORT_CITY').text());
                    window.localStorage.setItem("NAME_OF_CITY_I300", $(this).find('NAME_OF_CITY_I300').text());
                    window.localStorage.setItem("SHED_CODE", $(this).find('SHED_CODE').text());
                    window.localStorage.setItem("SHED_DESCRIPTION", $(this).find('SHED_DESCRIPTION').text());
                    window.localStorage.setItem("PRIMARY_CURRENCY_CODE_I606", $(this).find('PRIMARY_CURRENCY_CODE_I606').text());
                    window.localStorage.setItem("CompanyCode", $(this).find('CompanyCode').text());

                    window.localStorage.setItem("Language", $('#ddlLanguage').find('option:selected').text());
                    window.location = "Dashboard.html";
                });
                localStorage.removeItem('Column1ForBeakdown');
                localStorage.removeItem('PARAMETER_NAME');

                $(xmlDoc).find('Table1').each(function (index) {
                    window.localStorage.setItem("Column1ForBeakdown", $(this).find('Column1').text());
                    window.localStorage.setItem("PARAMETER_NAME", $(this).find('PARAMETER_NAME').text());
                   
                });
            } else {

                HideLoader();
                errmsg = errmsg + 'Invalid Username or Password.';
                $.alert(errmsg);
                errmsg = '';
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}


function RememberCheck() {
    if ($('#chkRemember').is(':checked')) {
        var UserName = $('#txtUserName').val();
        var PassWord = $('#txtPassword').val();
        window.localStorage.setItem("UserName", UserName);
        window.localStorage.setItem("Password", PassWord);
        window.localStorage.setItem("IsRememberChecked", "true");
    }
    else {
        window.localStorage.setItem("UserName", "");
        window.localStorage.setItem("Password", "");
        window.localStorage.setItem("IsRememberChecked", "false");
    }
}

// Remember user id and password function end here

function SetRememberLogin() {

    var U = window.localStorage.getItem("UserName");
    var P = window.localStorage.getItem("Password");
    var R = window.localStorage.getItem("IsRememberChecked");
    if (R != null && R == "true") {
        $('#chkRemember').prop("checked", true);
    }
    else {
        $('#chkRemember').prop("checked", false);
    }
    if (U != null && U != "") {
        $('#txtUserName').val(U);
    }
    if (P != null && P != "") {
        $('#txtPassword').val(P);
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    if (connectionStatus == 'offline') {
        $.alert('No Internet Connection!');
        setInterval(function () {
            connectionStatus = navigator.onLine ? 'online' : 'offline';
            if (connectionStatus == 'online') {
            }
            else {
                $.tips('You are offline.');
            }
        }, 3000);
    }

}

function viewPassword() {
    var x = document.getElementById("txtPassword");
    if (x.type === "password") {
        $(".zmdi-eye").show();
        $(".zmdi-eye-off").hide();
        x.type = "text";
    } else {
        $(".zmdi-eye").hide();
        $(".zmdi-eye-off").show();
        x.type = "password";
    }
}


spHHT_Get_OrgTypemaster = function (OperationType) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/spHHT_Get_OrgTypemaster",
        data: JSON.stringify({ OperationType: OperationType }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            if (obj.length > 0) {

                var branch = '<option value="-1">-- Select Organization Type --</option>';
                for (var i = 0; i < obj.length; i++) {
                    branch += '<option value="' + obj[i].OrganizationTypeId + '">' + obj[i].Name + '</option>';
                }
                $("#ddlBranchWiseList").html(branch);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

//GHA_PDA.GHAImpHHTService.HHTImpServices srvPDA = new GHA_PDA.GHAImpHHTService.HHTImpServices();

//srvPDA.GetLoginUserDetails(txtUserName.Text.Trim(), txtPassword.Text.Trim());

//strEXPServicePath = "http://10.22.2.71:8080/CELEBIIST/Services/HHTExpServices.asmx";
//strWebMercury = "http://10.22.2.71:8080/CELEBIIST/Services/HHTImpServices.asmx";
//strRoleAuth = "http://10.22.2.71:8080/CELEBIIST/Services/HHTUserRolesAuthorization.asmx";

