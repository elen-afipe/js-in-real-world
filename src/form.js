
const suspiciousPasswords = [
    // Common dictionary words (6-12 characters)
    "password",
    "welcome",
    "letmein",
    "monkey",
    "football",
    "dragon",
    "baseball",
    "sunshine",
    "iloveyou",
    "princess",
    "master",
    "trustno1",
    "shadow",
    "michael",
    "buster",
    "hockey",
    "freedom",
    
    // Simple sequences (6-12 characters)
    "123456",
    "1234567",
    "12345678",
    "123456789",
    "1234567890",
    "987654321",
    "qwerty",
    "abc123",
    "qwerty123",
    "zxcvbnm",
    "asdfghjkl",
    
    // Keyboard patterns
    "qazwsx",
    "qweasdzxc",
    
    // Common names (6-12 characters)
    "michael",
    "jennifer",
    "thomas",
    "jordan",
    "hunter",
    "andrew",
    "jessica",
    "daniel",
    "charlie",
    
    // Common variations (6-12 characters)
    "passw0rd",
    "p@ssw0rd",
    "admin123",
    "welcome1",
    "Password1",
    "qwerty123",
    "1q2w3e4r",
    "1q2w3e",
    "zaq12wsx",
    "zaq1xsw2",
    
    // Pop culture references (6-12 characters)
    "starwars",
    "pokemon",
    "whatever",
    "butterfly",
    "superman",
    "liverpool",
    "nintendo",
    "maverick",
    "mercedes"
  ];
 const form = document.querySelector(".form") ;
const submitText = document.querySelector(".submit-text");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector(".error-text.email");
const countryInput = document.querySelector("#country");
const countryError = document.querySelector(".error-text.country");
const postalCodeInput = document.querySelector("#pscode");
const postalCodeError = document.querySelector(".error-text.pscode");
const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector(".error-text.password");
const passwordConfirmInput = document.querySelector("#password-confirm");
const passwordConfirmError = document.querySelector(".error-text.password-confirm");
const formBtn = document.querySelector(".form.btn");
const formInputs = [emailInput, countryInput, postalCodeInput, passwordInput, passwordConfirmInput]
emailInput.addEventListener("blur", () => {
    if (emailInput.validity.valid & emailInput.value.trim() !== "") {
      emailError.textContent = ""; 
      emailError.classList.remove(".active");
      emailInput.classList.remove("invalid");
      emailInput.classList.add("valid");
    } else {
      showEmailError();
    }
  });
  
  function showEmailError() {
    if (emailInput.validity.valueMissing | emailInput.value.trim() === "") {
      emailError.textContent = "Enter an email address";
    } else if (emailInput.validity.typeMismatch) {
      emailError.textContent = "Address should be email, including @ and .";
    } else if (emailInput.validity.tooShort) {
      emailError.textContent = `Email should have at least ${emailInput.minLength} symbols`;
    }
    emailError.classList.add("active");
    emailInput.classList.remove("valid");
    emailInput.classList.add("invalid");
  }

  
  function checkCountryValidity(){
        const containsLettersAndHyphensOnly = /^[A-Za-z]+([-][A-Za-z]+)*$/;
        if (countryInput.value.trim() === ""){
            return false;
        } else if (!containsLettersAndHyphensOnly.test(countryInput.value)){
            return false
        }
        else return true;
  }
  countryInput.addEventListener("blur", () => {
    const countryIsValid = checkCountryValidity();
    if (countryInput.validity.valid & countryIsValid) {
        countryError.textContent = ""; 
        countryError.classList.remove(".active");
        countryInput.classList.remove("invalid");
        countryInput.classList.add("valid");
    } else {
        showCountryError();
    }
  });
  
  function showCountryError() {
    const containsLettersAndHyphensOnly = /^[A-Za-z]+([-][A-Za-z]+)*$/;
    if (countryInput.validity.valueMissing | countryInput.value.trim() === "") {
        countryError.textContent = "Enter the name of the country";
    } else if (countryInput.validity.tooShort) {
        countryError.textContent = `Country should have at least ${countryInput.minLength} characters`;
    } else if (countryInput.validity.tooLong) {
        countryError.textContent = `Country should have no more than ${countryInput.maxLength} characters`;
    } else if (!containsLettersAndHyphensOnly.test(countryInput.value)){
        countryError.textContent = 'Only characters and hyphens are allowed';
    }
    countryError.classList.add("active");
    countryInput.classList.remove("valid");
    countryInput.classList.add("invalid");
  }

  function checkPostalCodeValidity(){
    const containsPsCodeSymbolsOnly = /^[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/;
    if (postalCodeInput.value.trim() === ""){
        return false;
    } else if (!containsPsCodeSymbolsOnly.test(postalCodeInput.value)){
        return false
    }
    else return true;
}
postalCodeInput.addEventListener("blur", () => {
const postalCodeIsValid = checkPostalCodeValidity();
if (postalCodeInput.validity.valid & postalCodeIsValid) {
    postalCodeError.textContent = ""; 
    postalCodeError.classList.remove(".active");
    postalCodeInput.classList.remove("invalid");
    postalCodeInput.classList.add("valid");
} else {
    showPostalCodeError();
}
});

function showPostalCodeError() {
const containsPsCodeSymbolsOnly = /^[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/;
if (postalCodeInput.validity.valueMissing | postalCodeInput.value.trim() === "") {
    postalCodeError.textContent = "Enter the code";
} else if (postalCodeInput.validity.tooShort) {
    postalCodeError.textContent = `Postal code should have at least ${postalCodeInput.minLength} characters`;
} else if (postalCodeInput.validity.tooLong) {
    postalCodeError.textContent = `Postal code should have no more than ${postalCodeInput.maxLength} characters`;
} else if (!containsPsCodeSymbolsOnly.test(postalCodeInput.value)){
    postalCodeError.textContent = 'Only letters, numbers, spaces and hyphens are allowed';
}
postalCodeError.classList.add("active");
postalCodeInput.classList.remove("valid");
postalCodeInput.classList.add("invalid");
}


passwordInput.addEventListener("blur", () => {
const passwordsPresent = checkPasswordsPresent();
const passwordsMatch = checkPasswordsMatch();
const passwordIsSecure = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]{6,12}$/;
const passwordIsNotVulnerable = checkSuspiciousPassword(passwordInput);
if (passwordInput.validity.valid & passwordIsNotVulnerable & passwordIsSecure.test(passwordInput.value) & passwordsMatch & passwordsPresent){
    passwordError.textContent = ""; 
    passwordConfirmError.textContent = "";
    passwordError.classList.remove(".active");
    passwordInput.classList.remove("invalid");
    passwordInput.classList.add("valid");
    passwordConfirmInput.classList.remove("invalid");
    passwordConfirmInput.classList.add("valid");
} else if (passwordInput.validity.valid & passwordIsNotVulnerable & passwordIsSecure.test(passwordInput.value) & passwordsMatch) {
    passwordError.textContent = ""; 
    passwordError.classList.remove(".active");
    passwordInput.classList.remove("invalid");
    passwordInput.classList.add("valid");
}
 else {
    showPasswordError();
}
});
function checkSuspiciousPassword(input){
    const givenPasswordInput = input;
    const userPassword = givenPasswordInput.value.toLowerCase();
    let resultOfTheCheck = true;
    suspiciousPasswords.forEach(password => {
        if (password === userPassword){
            resultOfTheCheck = false;
        }
    })
    return resultOfTheCheck;
}

function showPasswordError() {
const passwordIsNotVulnerable = checkSuspiciousPassword(passwordInput);
const passwordsMatch = checkPasswordsMatch();
const passwordIsSecure = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]{6,12}$/;
if (passwordInput.validity.valueMissing | passwordInput.value.trim() === "") {
    passwordError.textContent = "Enter the password: 6-12 symbols, at least one uppercase and lowercase letter, digit and special symbol";
} else if (!passwordIsNotVulnerable) {
    passwordError.textContent = 'Enter a password that is not vulnerable (no qwerty123!)';
} else if (passwordInput.validity.tooLong) {
    passwordError.textContent = `Password should have no more than ${passwordInput.maxLength} characters`;
} else if (passwordInput.validity.tooShort) {
    passwordError.textContent = `Password should have at least ${passwordInput.minLength} characters`;
} else if (!passwordIsSecure.test(passwordInput.value)){
    passwordError.textContent = `Password should have at least one uppercase and lowercase letter, digit and special symbol`;
} else if (!passwordsMatch){
    passwordError.textContent = "";
    passwordConfirmError.textContent = `Passwords should match`;
    passwordConfirmInput.classList.remove("valid");
    passwordConfirmInput.classList.add("invalid");
}
passwordError.classList.add("active");
passwordInput.classList.remove("valid");
passwordInput.classList.add("invalid");
}

passwordConfirmInput.addEventListener("blur", () => {
    const passwordsMatch = checkPasswordsMatch();
    const passwordsPresent = checkPasswordsPresent();
    const passwordIsSecure = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]{6,12}$/;
    const passwordIsNotVulnerable = checkSuspiciousPassword(passwordConfirmInput);
    if (passwordConfirmInput.validity.valid & passwordIsNotVulnerable & passwordIsSecure.test(passwordConfirmInput.value) & passwordsMatch & passwordsPresent){
        passwordConfirmError.textContent = ""; 
        passwordConfirmError.classList.remove(".active");
        passwordConfirmInput.classList.remove("invalid");
        passwordConfirmInput.classList.add("valid");
        passwordInput.classList.remove("invalid");
        passwordInput.classList.add("valid");
    } else if (passwordConfirmInput.validity.valid & passwordIsNotVulnerable & passwordIsSecure.test(passwordConfirmInput.value) & passwordsMatch) {
        passwordConfirmError.textContent = ""; 
        passwordConfirmError.classList.remove(".active");
        passwordConfirmInput.classList.remove("invalid");
        passwordConfirmInput.classList.add("valid");
    } else {
        showPasswordConfirmError();
    }
    });
    function checkPasswordsPresent(){
        const passwordPresent = (!passwordInput.validity.valueMissing & passwordInput.value.trim() !== "") ? true : false
        const passwordConfirmPresent = (!passwordConfirmInput.validity.valueMissing & passwordConfirmInput.value.trim() !== "") ? true : false
        if (passwordPresent & passwordConfirmPresent) {
            return true
        }
         else return false
    }
    function checkPasswordsMatch(){
        const passwordsPresent = checkPasswordsPresent();
        const passwordsMatch = passwordInput.value === passwordConfirmInput.value;
        if(passwordsPresent & !passwordsMatch){
            return false
        } else return true
    }
function showPasswordConfirmError() {
    const passwordIsNotVulnerable = checkSuspiciousPassword(passwordConfirmInput);
    const passwordIsSecure = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]{6,12}$/;
    const passwordsMatch = checkPasswordsMatch();
    if (passwordConfirmInput.validity.valueMissing | passwordConfirmInput.value.trim() === "") {
        passwordConfirmError.textContent = "Enter the password: 6-12 symbols, at least one uppercase and lowercase letter, digit and special symbol";
    } else if (!passwordIsNotVulnerable) {
        passwordConfirmError.textContent = 'Enter a password that is not vulnerable (no qwerty123!)';
    } else if (passwordConfirmInput.validity.tooLong) {
        passwordConfirmError.textContent = `Password should have no more than ${passwordInput.maxLength} characters`;
    } else if (passwordConfirmInput.validity.tooShort) {
        passwordConfirmError.textContent = `Password should have at least ${passwordInput.minLength} characters`;
    } else if (!passwordIsSecure.test(passwordConfirmInput.value)){
        passwordConfirmError.textContent = `Password should have at least one uppercase and lowercase letter, digit and special symbol`;
    } else if (!passwordsMatch){
        passwordConfirmError.textContent = `Passwords should match`;
        passwordInput.classList.remove("valid")
        passwordInput.classList.add("invalid")
    }
    passwordConfirmError.classList.add("active");
    passwordConfirmInput.classList.remove("valid");
    passwordConfirmInput.classList.add("invalid");
    }

    function checkFormValidity(){
        let numberOfValidInputs = 0;
        formInputs.forEach(input =>{
            if(input.classList.contains("valid")){
                numberOfValidInputs+=1;
            }
        })
        if(numberOfValidInputs === formInputs.length){
            return true
        } else return false;
    }
    formBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const formIsValid = checkFormValidity();
        if (formIsValid){
            form.reset();
            formInputs.forEach(input =>{
                input.classList.remove("valid");
                })
            submitText.textContent="Thank you! We got you data"
        } else {
            submitText.textContent="Check if you filled all the fields right"
        }
    })
