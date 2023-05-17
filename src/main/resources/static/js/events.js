const validLettersSelectors = document.querySelectorAll(".valid-letter");
const includedSelector = document.querySelector("#includedLetters");
const excludedSelector = document.querySelector("#excludedLetters");

function convertPolishChar(letter) {
    return letter.replace(/ą/g,"a")
                     .replace(/ć/g,"c")
                     .replace(/ę/g,"e")
                     .replace(/ł/g,"l")
                     .replace(/ń/g,"n")
                     .replace(/ó/g,"o")
                     .replace(/ś/g,"s")
                     .replace(/(ż|ź)/g,"z")
                     .replace(/Ą/g,"A")
                     .replace(/Ć/g,"C")
                     .replace(/Ę/g,"E")
                     .replace(/Ł/g,"L")
                     .replace(/Ń/g,"N")
                     .replace(/Ó/g,"O")
                     .replace(/Ś/g,"S")
                     .replace(/(Ż|Ź)/g,"Z");
  }

function removeNonAlphabeticalChars(event) {
    var keycode = event.which || event.keyCode;
    var polishCharConverted = convertPolishChar(event.key).charCodeAt(0);
    if(((keycode < 58 ||
        (keycode > 57 && keycode < 65) || 
        (keycode > 90 && keycode < 97) ||
        keycode > 122) && keycode == polishCharConverted)
       ) {
           event.preventDefault();  
           return false;
       }
    return true;
}

function validLettersSwitch(event) {
    var key = event.key;
    var oldKey = event.target.value;
    if (key != oldKey && preventDuplicates(event, excludedSelector.value + event.keyCode) && removeNonAlphabeticalChars(event)) {
        event.target.value = key;
    } else {
        event.target.value = oldKey;
    }
}


function preventDuplicates(event, lettersSet) {
    var key = event.key;
    lettersSet += lettersSet.toUpperCase() + " ";
    if (lettersSet.includes(key)) {
        event.preventDefault();  
        return false;
    }
    return true;
}

function pressEnter(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        buttonOnClick();
    }
}

function getValidLetters() {
    var validLettersString = "";
    var validLetter;
    for (var i=0; i < validLettersSelectors.length; i++) {
        validLetter = validLettersSelectors[i].value.trim();
        if (!validLetter == "") {
            validLettersString += validLetter;
        }
    }
    return validLettersString;
}

function changeValidBackground(event) {
    if (event.target.value == "" || event.target.value == " ") {
        event.target.style.background = "white";
    } else {
        event.target.style.background = "yellowgreen";
    }
}

window.addEventListener("keydown", (event) => pressEnter(event));

includedSelector.addEventListener("keypress", (event) => removeNonAlphabeticalChars(event));
excludedSelector.addEventListener("keypress", (event) => removeNonAlphabeticalChars(event));

includedSelector.addEventListener("keypress", 
    (event) => preventDuplicates(event, includedSelector.value + excludedSelector.value));
excludedSelector.addEventListener("keypress", 
    (event) => preventDuplicates(event, includedSelector.value + excludedSelector.value + getValidLetters()));

for (var i=0; i<validLettersSelectors.length; i++) {
    validLettersSelectors[i].addEventListener("keypress", (event) => removeNonAlphabeticalChars(event));
    validLettersSelectors[i].addEventListener("keypress", 
        (event) => preventDuplicates(event, excludedSelector.value));
    validLettersSelectors[i].addEventListener("keyup", (event) => changeValidBackground(event));
    validLettersSelectors[i].addEventListener("keypress", (event) => validLettersSwitch(event));
}