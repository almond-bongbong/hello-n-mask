import React, { useCallback, useState } from 'react';
import GlobalStyle from 'styles/global-style';
import styled from 'styled-components';
import Map from 'components/Map';
import CurrentLocationIcon from 'icons/CurrentLocationIcon';
import Header from './layouts/Header';

const CurrentLocationButton = styled.button`
  display: block;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1000;
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 0;
`;

function App() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [markerLatitude, setMarkerLatitude] = useState<number | null>(null);
  const [markerLongitude, setMarkerLongitude] = useState<number | null>(null);

  const handleGeoSuccess: PositionCallback = useCallback(
    async (position: Position) => {
      const {
        coords: { latitude, longitude },
      } = position;

      setLatitude(latitude);
      setLongitude(longitude);
      setMarkerLatitude(latitude);
      setMarkerLongitude(longitude);
    },
    [],
  );

  const handleGeoError: PositionErrorCallback = useCallback(e => {
    console.error(e);
  }, []);

  const detectLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, [handleGeoSuccess, handleGeoError]);

  return (
    <div className="App">
      <GlobalStyle />

      <Map
        latitude={latitude}
        longitude={longitude}
        markerLatitude={markerLatitude}
        markerLongitude={markerLongitude}
      />

      <Header />

      <CurrentLocationButton onClick={detectLocation}>
        <CurrentLocationIcon />
      </CurrentLocationButton>
    </div>
  );
}

export default App;
