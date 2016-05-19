var formIDs = [
    'shape',
    'background',
    'pixelSize',
    'stepSize',
    'redAdjust',
    'greenAdjust',
    'blueAdjust'
]

window.onload = function() {
  // Builds up a query string to redirect to when the submit button is clicked
  document.getElementById('submit').onclick = function() {
    var res = '/cupcup/?';

    for (var i = 0; i < formIDs.length; i++) {
      var input = document.getElementById(formIDs[i]);
      if (input.value && input.value !== 'random')
        res += formIDs[i] + '=' + input.value + '&';
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
