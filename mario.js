

var heightElem = document.getElementById("height");
var formElem = document.getElementById("draw-form");
var symbolElem = document.getElementById("symbol");



formElem.addEventListener("input", buildPage, true);
symbolElem.addEventListener("change", buildPage, true);


function buildPage(event) {
  // This is used to intercept the form submission
  event.preventDefault();

  // This is used to clear the error message on reload or resubmit
  clearError();

  // figure out the height and symbol the user typed
  heightStr = heightElem.value;
  symbol = symbolElem.value;

  //return input value to displayError
  document.getElementById('outputid').innerHTML = "<b>" + heightStr + "</b>";

  // error message if no height is given
  if (heightStr == "") {
    displayError("This is what a pyramid with no height looks like...")
    return;
  }

  // convert the string to an int
  height = parseInt(heightStr);

  // this error message rejects non numbers and negative numbers
  if (isNaN(height)) {
      displayError("That's not a valid height.");
      return;
  } else if (height < 0) {
      displayError('Pyramids go up not down');
      return;
  }

  // this error message rejects values over 100
  var tooTall = 100;
  if (height > tooTall) {
      displayError("Are you cray? I can't build a pyramid that tall.");
      return;
  }

  // draw pyramid with the specified height
  drawPyramid(height, symbol);
}


/**
 * displayError
 *
 * Displays an error message on the text input, and colors it red
 */
function displayError(message) {
    heightElem.className = "invalid-field";
    document.querySelector(".error-message").innerHTML = message;
}


/*
 * clearError
 *
 * Undisplays the error message and removes the red CSS style
 */
function clearError(message) {
    message = ""
    heightElem.className = "invalid-field";
    document.querySelector(".error-message").innerHTML = message;
}



/**
 * drawPyramid
 *
 * Renders, in the HTML document, a Mario pyramid of the specified height
 */
function drawPyramid(height, symbol) {

    // first, clear the old content
    document.getElementById("pyramid").innerHTML = "";

    // for each row....
    for (var row = 0; row < height; row++) {

        // figure out number of bricks and spaces
        var numBricks = row + 2;
        var numSpaces = height - row - 1;

        // build up a string for this row
        var rowStr = "";
        for (var i = 0; i < numSpaces; i++) {
            var spaceChar = "&nbsp"; // this is the HTML encoding for a space " "
            rowStr += spaceChar;
        }
        for (var i = 0; i < numBricks; i++) {
            rowStr += symbol;
        }

        // make a <p> element for this row, and insert it into the #pyramid container
        rowElem = document.createElement("p");
        rowElem.innerHTML = rowStr;
        document.getElementById("pyramid").appendChild(rowElem);
    }
}
