import React, { useCallback, useState } from 'react';
import GlobalStyle from './styles/global-style';
import styled, { ThemeProvider } from 'styled-components';
import Map from './components/Map';
import CurrentLocationIcon from './icons/CurrentLocationIcon';
import Header from './layouts/Header';
import { theme } from './styles/theme';
import Intro from './components/Intro';
import Loader from './components/Loader';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [markerLatitude, setMarkerLatitude] = useState<number | null>(null);
  const [markerLongitude, setMarkerLongitude] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

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

  const onClickTitle = useCallback(() => {
    setShowInfo(true);
  }, []);

  const closeIntro = useCallback(() => {
    setShowInfo(false);
  }, []);

  const handleLoading = useCallback(value => {
    setLoading(value);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />

        <Map
          latitude={latitude}
          longitude={longitude}
          markerLatitude={markerLatitude}
          markerLongitude={markerLongitude}
          onChangeLoading={handleLoading}
        />

        <Header onClickTitle={onClickTitle} />

        <CurrentLocationButton onClick={detectLocation}>
          <CurrentLocationIcon />
        </CurrentLocationButton>

        {showInfo && <Intro onClickDim={closeIntro} />}

        {loading && <Loader />}
      </div>
    </ThemeProvider>
  );
}

export default App;
