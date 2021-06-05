var firebaseConfig = {
    apiKey: "AIzaSyA6hJIywPAnSseehaBbng0abCxWFlLV_fw",
    authDomain: "stock-signal-app.firebaseapp.com",
    projectId: "stock-signal-app",
    storageBucket: "stock-signal-app.appspot.com",
    messagingSenderId: "638964824703",
    appId: "1:638964824703:web:02d9bfb0e18099be841d4a",
    measurementId: "G-WRNVEXM6ZP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().languageCode = 'it';

function onSignInSubmit(e){
    e.preventDefault();
    console.log("onsubmit")
    const phoneNumber = "+91"+document.getElementById('phone').value;
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
    const code = document.getElementById('otp').value;
        confirmationResult.confirm(code).then((result) => {
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

function loginfire(e) {
    e.preventDefault();
    console.log("Clicked login button")
  
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('login-submit', {
        'size': 'invisible',
        'callback': (response) => {
            console.log(response);
        }
    });
    onSignInSubmit(e);
    
}
function checklogged(){
    loggeduser = localStorage.getItem('ssuser');
    if(loggeduser){
        document.getElementById('login-btn').style.display = 'none';
    }
    else{
        document.getElementById('login-btn').style.display = 'block';
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
