import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { getStores } from '../api/store';
import axios from 'axios';
import * as _ from 'fxjs2/Strict/index.js';
import * as L from 'fxjs2/Lazy/index.js';
import storeImages from '../constants/storeImages';
import storeTypes from '../constants/storeTypes';
import remainText from '../constants/remainText';

interface CoronaMapProps {
  latitude: number | null;
  longitude: number | null;
  markerLatitude: number | null;
  markerLongitude: number | null;
  onChangeLoading: (loading: boolean) => void;
}

const markersZIndex = {
  plenty: 50,
  some: 40,
  few: 30,
  empty: 20,
  break: 10,
};

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const kakao = window.kakao;

const infoWindow = new kakao.maps.InfoWindow({
  zIndex: 500,
  removable: true,
});

const imageSize = new kakao.maps.Size(22, 22);

const markerImages: any = {
  break: new kakao.maps.MarkerImage(storeImages.break, imageSize),
  empty: new kakao.maps.MarkerImage(storeImages.empty, imageSize),
  few: new kakao.maps.MarkerImage(storeImages.few, imageSize),
  some: new kakao.maps.MarkerImage(storeImages.some, imageSize),
  plenty: new kakao.maps.MarkerImage(storeImages.plenty, imageSize),
};

const makeMarker = map => store => {
  const markerImage = markerImages[store.remain_stat];
  const zIndex = markersZIndex[store.remain_stat];
  const latlng = new kakao.maps.LatLng(store.lat, store.lng);
  const marker = new kakao.maps.Marker({
    map,
    position: latlng,
    title: store.name,
    image: markerImage,
    zIndex,
    clickable: true,
  });

  kakao.maps.event.addListener(marker, 'click', () => {
    infoWindow.setContent(`
            <div class="store-info">
                <div class="store-name">${store.name} (${
      storeTypes[store.type]
    })</div>
                <div class="stock_at">입고시간 : ${moment(
                  new Date(store.stock_at),
                ).format('MM월 DD일 HH:mm')}</div>
                <div class="remain">재고상태 : ${
                  remainText[store.remain_stat]
                }</div>
            </div>
        `);
    infoWindow.open(map, marker);
  });

  return marker;
};

const makeMarkers = map => _.pipe(L.map(makeMarker(map)), _.takeAll);

const getIdByMarker = marker => {
  const markerPosition = marker.getPosition();
  return `${marker.getTitle()}${parseInt(
    markerPosition.getLat(),
    10,
  )}${parseInt(markerPosition.getLng(), 10)}`;
};

const getIdByStore = store =>
  `${store.name}${parseInt(store.lat, 10)}${parseInt(store.lng, 10)}`;

function CoronaMap({
  latitude,
  longitude,
  markerLatitude,
  markerLongitude,
  onChangeLoading,
}: CoronaMapProps) {
  const mapEl = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const clusterer = useRef<any>(null);
  const currentLocationMarker = useRef<any>(null);
  const storeMarkerList = useRef<Map<string, any>>(new Map());
  const [stores, setStores] = useState([]);
  const cancelSource = useRef<any>(null);

  const initStores = useCallback(
    async (lat, lng) => {
      try {
        if (cancelSource.current) {
          cancelSource.current.cancel();
        }
        onChangeLoading(true);
        const source = axios.CancelToken.source();
        cancelSource.current = source;
        const meter = Math.max(500, map.current.getLevel() * 800 - 1500);
        const { data } = await getStores(lat, lng, meter, source.token);
        setStores(data.stores);
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('Request canceled.');
        } else {
          console.error(e);
        }
      } finally {
        onChangeLoading(false);
      }
    },
    [onChangeLoading],
  );

  useEffect(() => {
    // 서울 시청
    const defaultLat = 37.5646854;
    const defaultLng = 126.9742512;
    const container = mapEl.current;
    const options = {
      center: new kakao.maps.LatLng(defaultLat, defaultLng),
      level: 5,
    };
    map.current = new kakao.maps.Map(container, options);
    map.current.setMaxLevel(10);

    clusterer.current = new kakao.maps.MarkerClusterer({
      map: map.current,
      averageCenter: true,
      minLevel: 7,
    });

    initStores(defaultLat, defaultLng);
  }, [initStores]);

  const handleLocationChanged = useCallback(
    _.throttle(() => {
      const center = map.current.getCenter();
      initStores(center.getLat(), center.getLng());
    }, 1200),
    [initStores],
  );

  useEffect(() => {
    kakao.maps.event.addListener(
      map.current,
      'bounds_changed',
      handleLocationChanged,
    );
  }, [handleLocationChanged]);

  useEffect(() => {
    if (latitude && longitude && map.current) {
      const latlng = new kakao.maps.LatLng(latitude, longitude);
      map.current.setCenter(latlng);
    }
  }, [latitude, longitude, initStores]);

  useEffect(() => {
    if (markerLatitude && markerLongitude) {
      if (currentLocationMarker.current) {
        currentLocationMarker.current.setPosition(new kakao.maps.LatLng(markerLatitude, markerLongitude));
      } else {
        currentLocationMarker.current = new kakao.maps.Marker({
          map: map.current,
          position: new kakao.maps.LatLng(markerLatitude, markerLongitude),
        });
      }
    }
  }, [markerLatitude, markerLongitude]);

  useEffect(() => {
    const markerList = storeMarkerList.current;
    const storesId = _.map(getIdByStore, stores);

    _.go(
      markerList,
      L.filter(([_, m]) => storesId.indexOf(getIdByMarker(m)) < 0),
      _.each(([id, marker]) => {
        marker.setMap(null);
        markerList.delete(id);
      }),
    );

    _.go(
      stores,
      L.filter(s => s.remain_stat),
      L.filter(s => !markerList.has(getIdByStore(s))),
      L.chunk(100),
      L.map(storeList =>
        _.go(storeList, _.delay(30), makeMarkers(map.current)),
      ),
      _.each(markers => {
        _.each(
          marker => markerList.set(getIdByMarker(marker), marker),
          markers,
        );
      }),
    );
  }, [stores]);

  return <MapContainer className="map-container" ref={mapEl} />;
}

export default memo(CoronaMap);
