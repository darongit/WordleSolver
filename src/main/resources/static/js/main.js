function emptyFields() {
    var html = "<h1>WordleSoler<h1>" +
    "<h2>Enter the letters in the box on the left and press Check!<h2>";
    document.getElementById("output-field").innerHTML = html;
}

function start() {
    emptyFields();
}

function showTable(wordsList) {
    var html = "<table>";
    var lineLimit = 7;
    var idx = 0;

    while (true) {
        html += "<tr>"
        for (var i=0; i<lineLimit; i++) {
            html += "<td>" + wordsList[idx] + "</td>";
            idx++;
            if (idx == wordsList.length-1) {
                break;
            }
        }
        html += "</tr>"
        if (idx == wordsList.length-1) {
            break;
        }
    }

    html += "</table>";
    document.getElementById("output-field").innerHTML = html;
}

function buttonOnClick() {
    var query = {};
    var validLetters = {};
    var words;

    if (document.getElementById("l0").value != "") {
        validLetters[0] = document.getElementById("l0").value;
    }
    if (document.getElementById("l1").value != "") {
            validLetters[1] = document.getElementById("l1").value;
    }
    if (document.getElementById("l2").value != "") {
        validLetters[2] = document.getElementById("l2").value;
    }
    if (document.getElementById("l3").value != "") {
            validLetters[3] = document.getElementById("l3").value;
    }
    if (document.getElementById("l4").value != "") {
        validLetters[4] = document.getElementById("l4").value;
    }

    if (Object.keys(validLetters).length == 0
        && document.getElementById("excludedLetters").value.length == 0
        && document.getElementById("includedLetters").value.length == 0) {
            emptyFields();
            return;
        }

    query["excluded"] = document.getElementById("excludedLetters").value;
    query["included"] = document.getElementById("includedLetters").value;
    query["validLetters"] = validLetters;

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