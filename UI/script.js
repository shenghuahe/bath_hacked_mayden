/**
 * The main map.
 */
var map = null;

/**
 * Tile API path.
 */
var tilePath = 'http://{s}.tile.cloudmade.com/' +
  '64933b0e195f401bb1de7230d381bf66/997/256/{z}/{x}/{y}.png';

/**
 * Currently shown regions.
 */
var bubbles = [];

/**
 * Currently shown routes.
 */
var lines = [];

/**
 * Colours from which we randomly select line/circle/marker colours.
 */
var colours = [
  'red', 'purple', 'green', 'blue',
  'orange', 'pink', 'yellow', 'grey'
];

/**
 * Array pointer for colours.
 */
var _colourMarker = 0;

/**
 * Generate a random colour.
 */
function colour()
{
  var colour = colours[_colourMarker];

  _colourMarker = (_colourMarker + 1) % colours.length;
  return colour;
}

/**
 * Check whether a circle contains part of a line.
 */
function contains(circle, line) {
  var points = line.getLatLngs();

  for (var n = 0; n < points.length; n++) {
    if (circle.getBounds().contains(points[n])) {
      return true;
    }
  }
}

/**
 * Make a configuration bubble.
 */
function configuration(bubble)
{
  var path = '/tpl/popup.ejs';
  var coordinates = bubble.getLatLng();
  var count = 0;

  for (var i = 0; i < lines.length; i++) {
    if (contains(bubble, lines[i])) {
      count++;
    }
  }

  var data = {
    message: "Hi, mum!",
    id: bubbles.length,
    lat: coordinates.lat,
    lng: coordinates.lng,
    count: count
  };

  var layer = "bubble" + data.id;

  bubbles.push(bubble);
  var form = $(new EJS({ url: path }).render(data));

  $(' input[name=radius]', form).change(function () {
    bubble.setRadius(this.value);
    count = 0;

    for (var i = 0; i < lines.length; i++) {
      if (contains(bubble, lines[i])) {
        count++;
      }
    }

    $(' .route_count', form).text(count);
  });

  $(' input[name=delete]', form).click(function () {
    map.removeLayer(bubble);
  });

  $(' .colours span', form).on('click', function () {
    bubble.setStyle({ color: this.className });
  });

  return form[0];
}

$(function () {
  map = L.map('map').setView([51.383198, -2.359123], 15);

  map.on('click', function (e) {
    var bubble = L.circle(e.latlng, 100, { color: 'red' }).addTo(map);
    var gui = configuration(bubble);

    bubble.bindPopup(gui, {
      minWidth: 400,
    });
  });

  L.tileLayer(tilePath, {
    attribution: 'OpenStreetMap | CloudeMade',
    maxZoom: 18
  }).addTo(map);

  $.getJSON('/paths.json', function (paths) {
    for (i = 0; i < paths.length; i++) {
      var route = [];

      for (n = 0; n < paths[i].length; n++) {
        route.push([paths[i][n].pos_x, paths[i][n].pos_y]);
      }

      var line = L.polyline(route, {color: colour()}).addTo(map);
      lines.push(line);

      line.bindPopup('hello, mum!');
    }
  });

});
