import React from 'react'


export default class Map extends React.Component {
	constructor(props) {
		super(props)

		this.platform = null
		this.map = null
		this.state = {
			app_id: props.app_id,
			app_code: props.app_code,
			center: {
				lat: props.lat,
				lng: props.lng,
			},
			zoom: props.zoom,
			// theme: props.theme,
			// style: props.style,
			lat: null,
			lng: null,
		}
	}

	componentDidMount() {
		// Instantiate a map and this.platform object:
this.platform = new window.H.service.Platform({
	app_id: this.props.app_id,
	app_code: this.props.app_code,
	// useCIT: true,
	useHTTPS: true,
});
// Retrieve the target element for the map:
let targetElement = document.getElementById('mapContainer');

// Get default map types from the this.platform object:
let defaultLayers = this.platform.createDefaultLayers();

// Instantiate the map:
let map = new window.H.Map(
  document.getElementById('mapContainer'),
  defaultLayers.normal.map,
  {
  zoom: 10,
  center: { lat: 52.51, lng: 13.4 }
  });

// Create the parameters for the geocoding request:
let geocodingParams = {
    searchText: '200 S Mathilda Ave, Sunnyvale, CA'
  };

// Define a callback function to process the geocoding response:
let onResult = function(result) {
  let locations = result.Response.View[0].Result,
    position,
    marker;
  // Add a marker for each location found
  for (let i = 0;  i < locations.length; i++) {
  position = {
    lat: locations[i].Location.DisplayPosition.Latitude,
    lng: locations[i].Location.DisplayPosition.Longitude
  };
  marker = new window.H.map.Marker(position);
  map.addObject(marker);
  }
};

// Get an instance of the geocoding service:
let geocoder = this.platform.getGeocodingService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
geocoder.geocode(geocodingParams, onResult, function(e) {
  alert(e);
});
}

render() {
	return (
		<div id="mapContainer" style={ {
			width: '100%',
			height: '100%',
			background: 'grey',
		} } />
	)
}
}