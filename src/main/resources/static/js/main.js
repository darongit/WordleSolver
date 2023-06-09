var validLettersGlobal = {};
var includedGlobal = "";
var excludedGlobal = "";

function colorValidLettersFields() {
    for (var i=0; i<5; i++) {
        fieldId = "l" + i;
        if (document.getElementById(fieldId).value.trim() == "") {
            document.getElementById(fieldId).style.backgroundColor = "white";
        } else {
            document.getElementById(fieldId).style.backgroundColor = "yellowgreen";
        }
    }
}

function emptyFields() {
    var html = "<h1>WordleSoler<h1>" +
    "<h2>Enter the letters in the box on the left and press Check!<h2>";
    document.getElementById("output-field").innerHTML = html;
    document.getElementById("input-form").reset();
    colorValidLettersFields();
}

function start() {
    emptyFields();
    updateGlobals();
}

function updateGlobals() {
    validLettersGlobal = {};
    if (document.getElementById("l0").value != "") {
        validLettersGlobal[0] = document.getElementById("l0").value.toLowerCase();
    }
    if (document.getElementById("l1").value != "") {
        validLettersGlobal[1] = document.getElementById("l1").value.toLowerCase();
    }
    if (document.getElementById("l2").value != "") {
        validLettersGlobal[2] = document.getElementById("l2").value.toLowerCase();
    }
    if (document.getElementById("l3").value != "") {
        validLettersGlobal[3] = document.getElementById("l3").value.toLowerCase();
    }
    if (document.getElementById("l4").value != "") {
        validLettersGlobal[4] = document.getElementById("l4").value.toLowerCase();
    }
    excludedGlobal = document.getElementById("excludedLetters").value.toLowerCase();
    includedGlobal = document.getElementById("includedLetters").value.toLowerCase();    
}

function colorWord(word) {
    var result = "";
    var tmp = "";
    var letter;
    for (var i=0; i<word.length; i++) {
        letter = word.charAt(i);
        if (!includedGlobal.includes(letter) && validLettersGlobal[i]!=letter) {
            result += letter;
            continue;
        }
        if (validLettersGlobal[i] == letter) {
            result += "<span class=\"table-valid-letter\">" + letter + "</span>";
        } else {
            result += "<span class=\"table-included-letter\">" + letter + "</span>";
        }
         
    }
    return result;
}

function showTable(wordsList) {
    var html = "<table align=\"center\">";
    var lineLimit = 8;
    var idx = 0;
    if (wordsList.length == 0) {
        html += "<tr><td>No correct words:(</td></tr>";
    }
    else if (wordsList.length == 1) {
        if (wordsList[0]=="no-matches") {
            html += "<tr><td>" + wordsList[0] + "</td></tr>";
        } else {
            html += "<tr><td>" + colorWord(wordsList[0]) + "</td></tr>";
        }
    } else {
        while (idx < wordsList.length) {
            html += "<tr>"
            for (var i=0; i<lineLimit; i++) {
                html += "<td>" + colorWord(wordsList[idx]) + "</td>";
                idx++;
                if (idx > wordsList.length-1) {
                    break;
                }
            }
            html += "</tr>"
        }
    }

    html += "</table>";
    document.getElementById("output-field").innerHTML = html;
}

function buttonOnClick() {
    updateGlobals();
    var query = {};
    if (Object.keys(validLettersGlobal).length == 0
        && excludedGlobal.length == 0
        && includedGlobal.length == 0) {
            emptyFields();
            return;
        }

    query["excluded"] = excludedGlobal;
    query["included"] = includedGlobal;
    query["validLetters"] = validLettersGlobal;
    fetch('api/getwords', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }).then(res => res.json())
      .then(res => showTable(res));
}
