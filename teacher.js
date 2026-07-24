// ==========================================================================
// Teacher Login — Vivekanand Shiksha Niketan Junior High School
// Step 1: Password check
// Step 2: Phone number check (only allowed numbers can receive OTP)
// Step 3: OTP verification via Firebase Phone Authentication
// ==========================================================================

// Only these numbers are allowed to receive a verification code.
// Any other number will be rejected before an OTP is ever sent.
const ALLOWED_NUMBERS = ["9919811871", "8840552660"];

let confirmationResult = null;

function checkPassword() {
  let pass = document.getElementById("password").value;

  if (pass == "dhruv058605remo") {
    document.getElementById("passwordStep").style.display = "none";
    document.getElementById("phoneStep").style.display = "block";
    document.getElementById("msg").innerHTML = "";
  } else {
    document.getElementById("msg").innerHTML =
      "😄 Abhi baccha hai...<br>Ja re Student Portal me.";
    setTimeout(function () {
      window.location = "student.html";
    }, 2500);
  }
}

function setupRecaptcha() {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible"
    });
  }
}

function sendOtp() {
  let rawNumber = document.getElementById("phoneNumber").value.trim();
  let digitsOnly = rawNumber.replace(/\D/g, "").slice(-10);

  if (!ALLOWED_NUMBERS.includes(digitsOnly)) {
    document.getElementById("msg").innerHTML =
      "❌ Ye number registered nahi hai. Verification code sirf authorized numbers par jaata hai.";
    return;
  }

  setupRecaptcha();

  const fullNumber = "+91" + digitsOnly;

  firebase.auth().signInWithPhoneNumber(fullNumber, window.recaptchaVerifier)
    .then(function (result) {
      confirmationResult = result;
      document.getElementById("phoneStep").style.display = "none";
      document.getElementById("otpStep").style.display = "block";
      document.getElementById("msg").innerHTML = "✅ OTP bhej diya gaya hai " + fullNumber + " par.";
    })
    .catch(function (error) {
      document.getElementById("msg").innerHTML = "OTP bhejne mein error: " + error.message;
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then(function (widgetId) {
          if (typeof grecaptcha !== "undefined") {
            grecaptcha.reset(widgetId);
          }
        });
      }
    });
}

function verifyOtp() {
  const code = document.getElementById("otpCode").value.trim();

  if (!code) {
    document.getElementById("msg").innerHTML = "Kripya OTP daalein.";
    return;
  }

  if (!confirmationResult) {
    document.getElementById("msg").innerHTML = "Pehle OTP bhejein.";
    return;
  }

  confirmationResult.confirm(code)
    .then(function () {
      sessionStorage.setItem("teacherLoggedIn", "true");
      window.location = "teacher-dashboard.html";
    })
    .catch(function () {
      document.getElementById("msg").innerHTML = "❌ Galat OTP. Dobara try karein.";
    });
}
