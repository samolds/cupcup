var formIDs = [
    'shape',
    'background',
    'customBackgroundPath',
    'customBackgroundWidth',
    'customBackgroundHeight',
    'customBackgroundNickname',
    'pixelSize',
    'stepSize',
    'redAdjust',
    'greenAdjust',
    'blueAdjust'
]

window.onload = function() {
  // Builds up a query string to redirect to when the submit button is clicked
  document.getElementById('submit').onclick = function() {
    var cusPath = document.getElementById('customBackgroundPath');
    var cusWidth = document.getElementById('customBackgroundWidth');
    var cusHeight = document.getElementById('customBackgroundHeight');

    // If any of these three exist but not all three, "throw" error
    if ((cusPath.value && cusWidth.value && cusHeight.value) ||
        !(cusPath.value || cusWidth.value || cusHeight.value)) {
      cusPath.classList.remove("error");
      cusWidth.classList.remove("error");
      cusHeight.classList.remove("error");
      document.getElementById('error_msg').classList.add("hide");
    } else {
      cusPath.classList.add("error");
      cusWidth.classList.add("error");
      cusHeight.classList.add("error");
      document.getElementById('error_msg').classList.remove("hide");
      return;
    }

    var res = '/cupcup/?';

    for (var i = 0; i < formIDs.length; i++) {
      var input = document.getElementById(formIDs[i]);
      if (input.value && input.value !== 'random') {
        if (formIDs[i] === 'customBackgroundPath') {
          res += formIDs[i] + '=' + encodeURIComponent(input.value) + '&';
        } else {
          res += formIDs[i] + '=' + input.value + '&';
        }
      }
    }
    res = res.substr(0, res.length - 1);

    window.location.href = res;
  };

  var i = 0;
  var shapes = document.getElementById('shape');
  var backgrounds = document.getElementById('background');

  // Adds all of the possible shapes to the dropdown
  for (i = 0; i < Globals.possibleShapes.length; i++) {
    var option = document.createElement('option');
    option.value = Globals.possibleShapes[i];
    option.text = Globals.possibleShapes[i];
    shapes.add(option);
  }

  // Adds all of the possible backgrounds to the dropdown
  for (i = 0; i < Globals.possibleBackgrounds.length; i++) {
    var option = document.createElement('option');
    option.value = Globals.possibleBackgrounds[i].nickname;
    option.text = Globals.possibleBackgrounds[i].nickname;
    backgrounds.add(option);
  }
}
