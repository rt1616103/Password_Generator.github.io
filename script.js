const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const passwordLengthRange = document.getElementById("passwordLengthRange");
const passwordLengthDisplay = document.querySelector('.form-range-number');
const passwordStrength = document.querySelector(".password-strength");
const strengthBoxes = document.querySelectorAll(".strength-range-box");
const generatePassword = document.querySelector(".generate-button");

let generatedPassword = document.querySelector(".generated-password");
generatedPassword.innerHTML = "PTx1f5DaFX";

const copyButton = document.querySelector('.copy-password');

copyButton.addEventListener('click', function() {
    const textarea = document.createElement('textarea');
    textarea.value = generatedPassword.textContent;
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand('copy');

    document.body.removeChild(textarea);

    alert('Password copied to clipboard!');
});

const upperCaseCharactersButton = document.getElementById("upperCaseCharactersButton");
const numberCharactersButton = document.getElementById("numberCharactersButton");
const lowerCaseCharactersButton = document.getElementById("lowerCaseCharactersButton");
const symbolCharactersButton = document.getElementById("symbolCharactersButton");

let upperCaseCharacters = "";
let numberCharacters = "";
let lowerCaseCharacters = "";
let symbolCharacters = "";

upperCaseCharactersButton.addEventListener("change", () => {
    if (upperCaseCharactersButton.checked) {
        upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else {
        upperCaseCharacters = "";
    }
    generatedPassword.innerHTML = generateString(passwordLengthRange.value);
});

numberCharactersButton.addEventListener("change", () => {
    if (numberCharactersButton.checked) {
        numberCharacters = "0123456789";
    } else {
        numberCharacters = "";
    }
    generatedPassword.innerHTML = generateString(passwordLengthRange.value);
});

lowerCaseCharactersButton.addEventListener("change", () => {
    if (lowerCaseCharactersButton.checked) {
        lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
    } else {
        lowerCaseCharacters = "";
    }
    generatedPassword.innerHTML = generateString(passwordLengthRange.value);
});

symbolCharactersButton.addEventListener("change", () => {
    if (symbolCharactersButton.checked) {
        symbolCharacters = "!@#$%^&*()_-+={}[]:;''.,><?/~|";
    } else {
        symbolCharacters = "";
    }
    generatedPassword.innerHTML = generateString(passwordLengthRange.value);
});

passwordLengthRange.addEventListener('input', () => {
    passwordLengthDisplay.textContent = passwordLengthRange.value;
    generatedPassword.innerHTML = generateString(passwordLengthRange.value);
});

function generateString(length) {
    const characters = upperCaseCharacters + lowerCaseCharacters + numberCharacters + symbolCharacters;
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

generatePassword.addEventListener("click", () => {
    generatedPassword.innerHTML = generateString(passwordLengthRange.value) ? generateString(passwordLengthRange.value) : generatedPassword.innerHTML = "Click checkbox to generate password"; 
});

let checkedCount = 0;

[...checkboxes].forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        let checkedCount = 0;
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedCount++;
            }
        }
        switch (checkedCount) {
            case 1:
                passwordStrength.innerHTML = "simple";
                applyBackgroundColors(1, "#ff0000");
                break;
            case 2:
                passwordStrength.innerHTML = "simple";
                applyBackgroundColors(2, "#cc2c33");
                break;
            case 3:
                passwordStrength.innerHTML = "medium";
                applyBackgroundColors(3, "#ffff00");
                break;
            case 4:
                passwordStrength.innerHTML = "hard";
                applyBackgroundColors(4, "#008800");
                break;
            default:
                passwordStrength.innerHTML = "none";
                applyBackgroundColors(0);
		generatedPassword.innerHTML = "Click checkbox to generate password";
        }

    });
});

const strengthBoxesArray = Array.from(strengthBoxes);
passwordStrength.innerHTML = "medium";
applyBackgroundColors(3, "#ffff00");

function applyBackgroundColors(count, color) {
    strengthBoxesArray.forEach(box => {
        box.style.backgroundColor = '';
    });

    for (let i = 0; i < count; i++) {
        strengthBoxesArray[i].style.backgroundColor = color;
    }
}
