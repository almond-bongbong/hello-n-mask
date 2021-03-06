import React, { useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalStyle from './styles/global-style';
import styled, { ThemeProvider } from 'styled-components';
import Map from './components/MaskMap';
import CurrentLocationIcon from './icons/CurrentLocationIcon';
import Header from './layouts/Header';
import { theme } from './styles/theme';
import Intro from './components/Intro';
import Loader from './components/Loader';
import store, { persistor } from './store';

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
    (position: Position) => {
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

  const handleGeoError: PositionErrorCallback = useCallback((e) => {
    console.error(e);
  }, []);

  const handleGeoWatchSuccess: PositionCallback = useCallback(
    (position: Position) => {
      const {
        coords: { latitude, longitude },
      } = position;

      setMarkerLatitude(latitude);
      setMarkerLongitude(longitude);
    },
    [],
  );

  const detectLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    navigator.geolocation.watchPosition(handleGeoWatchSuccess, handleGeoError, {
      enableHighAccuracy: true,
    });
  }, [handleGeoSuccess, handleGeoWatchSuccess, handleGeoError]);

  const onClickTitle = useCallback(() => {
    setShowInfo(true);
  }, []);

  const closeIntro = useCallback(() => {
    setShowInfo(false);
  }, []);

  const handleLoading = useCallback((value) => {
    setLoading(value);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
