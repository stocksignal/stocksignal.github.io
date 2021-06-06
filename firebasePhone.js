firebase.auth().languageCode = 'en';

function onSignInSubmit(e){
    e.preventDefault();
    document.getElementById('login-submit').value = "Please wait..."
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('login-submit', {
        'size': 'invisible',
        'callback': (response) => {
            console.log(response);
        }
    });

    console.log("Number submitted");

    const phoneNumber = "+91" + document.getElementById('phone').value;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {

    window.confirmationResult = confirmationResult;
        
    var loginform = document.querySelector('.login-form');
    var otpform = document.querySelector('.otp-form');
    var otptext = document.querySelector('#otp-text');

    loginform.style.display = 'none';
    otpform.style.display = 'flex';
    otptext.innerHTML = "OTP has been sent to +91" + document.getElementById('phone').value;

    }).catch((error) => {
        alert("SMS for OTP could not be sent : "+error)
        grecaptcha.reset(window.recaptchaWidgetId);

    });
}

function onotpsubmit(e){
    e.preventDefault();
    document.getElementById('otp-submit').value = 'Please wait...';
    const code = document.getElementById('otp').value;
    confirmationResult.confirm(code).then((result) => {
    document.getElementById('otp-submit').value = 'Logged in';
    window.location = '/';
    const user = result.user;
    localStorage.setItem('ssuser', user['refreshToken']);
    localStorage.setItem('phone', user['phoneNumber']);
    localStorage.setItem('uid', user['uid']);
    checklogged();
    }).catch((error) => {
        alert("Wrong OTP. Try again.")
    });
}


function checklogged(){
    loggeduser = localStorage.getItem('ssuser');
    if(loggeduser){
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('oitable').style.display = 'block';
        document.getElementById('oiChart').style.display = 'block';
        document.getElementById('pcrChart').style.display = 'block';
        document.querySelector('.logindialog1').style.display = 'none';
        document.querySelector('.logindialog2').style.display = 'none';
        document.querySelector('.logindialog3').style.display = 'none';
    }
    else{
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('oitable').style.display = 'none';
        document.getElementById('oiChart').style.display = 'none';
        document.getElementById('pcrChart').style.display = 'none';
        document.querySelector('.logindialog1').style.display = 'block';
        document.querySelector('.logindialog2').style.display = 'block';
        document.querySelector('.logindialog3').style.display = 'block';
    }
}
checklogged();

userid = localStorage.getItem('uid');
if(userid){
        document.getElementById('login-btn').style.display = 'none';
} 
else{
    setTimeout(() => {
        document.getElementById('login-btn').style.display = 'block';
        document.querySelector('.login-page').style.display = 'flex';
    }, 10000);
}
