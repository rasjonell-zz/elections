import React, { useState } from 'react';

import Map from 'components/Map';
import UserInfo from 'components/UserInfo';

const styles = {
  root: {
    width: '100%',
    height: '98vh',
    display: 'flex',
    padding: 0,
  },
  map: {
    width: '70%',
    height: '100%',
  },
};

const App = () => {
  const [viewport, setViewport] = useState({
    zoom: 7,
    bearing: 0,
    width: '100%',
    height: '98vh',
    latitude: 40.10938958735517,
    longitude: 45.089274016718626,
  });

  return (
    <div style={styles.root}>
      <div style={styles.map}>
        <Map viewport={viewport} setViewport={setViewport} />
      </div>
      <UserInfo viewport={viewport} setViewport={setViewport} />
    </div>
  );
};

export default App;
