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
var routes = [];

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
function bubbleConfiguration(bubble)
{
  var path = '/tpl/bubble.ejs';
  var coordinates = bubble.getLatLng();
  var count = 0;

  for (var i = 0; i < routes.length; i++) {
    if (contains(bubble, routes[i])) {
      count++;
    }
  }

  var data = {
    id: bubbles.length,
    lat: coordinates.lat,
    lng: coordinates.lng,
    count: count
  };

  bubbles.push(bubble);
  var form = $(new EJS({ url: path }).render(data));

  $(' input[name=radius]', form).change(function () {
    bubble.setRadius(this.value);
    count = 0;

    for (var i = 0; i < routes.length; i++) {
      if (contains(bubble, routes[i])) {
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

/**
 * Make a configuration bubble.
 */
function routeConfiguration(name, route)
{
  var path = '/tpl/route.ejs';

  var data = {
    name: name
  };

  routes.push(route);
  var form = $(new EJS({ url: path }).render(data));

  $(' input[name=follow]', form).click(function () {
    follow(route);
  });

  $(' .colours span', form).on('click', function () {
    route.setStyle({ color: this.className });
  });

  return form[0];
}

$(function () {
  map = L.map('map').setView([51.383198, -2.359123], 15);

  map.on('click', function (e) {
    var bubble = L.circle(e.latlng, 100, { color: 'red' }).addTo(map);
    var gui = bubbleConfiguration(bubble);

    bubble.bindPopup(gui, {
      minWidth: 400
    });
  });

  L.tileLayer(tilePath, {
    attribution: 'OpenStreetMap | CloudeMade',
    maxZoom: 18
  }).addTo(map);

  $.getJSON('/api/paths', function (paths) {
    for (i = 0; i < paths.length; i++) {
      var route = [];

      var name = paths[i].name;
      var coordinates = paths[i].coordinates;

      for (n = 0; n < coordinates.length; n++) {
        route.push([coordinates[n].pos_x, coordinates[n].pos_y]);
      }

      var line = L.polyline(route, {color: colour(), opacity: 0.5}).addTo(map);

      line.bindPopup(name);
      var gui = routeConfiguration(name, line);

      line.bindPopup(gui, { minWidth: 400 });
    }
  });
});

function follow(line) {
  route = line.getLatLngs().slice(0);

  if (route.length == 0) {
    return;
  }

  var center = map.getCenter();
  var zoom = map.getZoom();

  line.closePopup();
  map.setZoom(17);

  var interval = setInterval(function () {
    if (route.length == 0) {
      map.setZoom(zoom);
      clearInterval(interval);

      return;
    }

    map.panTo(route.shift());
  }, 500);
}
