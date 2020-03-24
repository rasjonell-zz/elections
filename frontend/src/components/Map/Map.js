import React from 'react';

import Map, { Marker, NavigationControl } from 'react-map-gl';

const { REACT_APP_MAPBOX_KEY } = process.env;

const navStyle = {
  padding: '10px',
  position: 'absolute',
};

const _Map = ({ viewport, setViewport }) => {
  return (
    <Map
      {...viewport}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={REACT_APP_MAPBOX_KEY}
    >
      <div className="nav" style={navStyle}>
        <NavigationControl onViewportChange={setViewport} />
      </div>
    </Map>
  );
};

export default _Map;
