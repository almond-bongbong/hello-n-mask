import React, { useRef, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { getStores } from '../api/store';
import { throttle } from 'lodash';
import axios from 'axios';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number | null;
  longitude: number | null;
  markerLatitude: number | null;
  markerLongitude: number | null;
}

const storeImage: any = {
  empty:
    'https://res.cloudinary.com/dfyuv19ig/image/upload/v1583862599/mask/KakaoTalk_Photo_2020-03-11-02-49-48_aaca53.png',
  few:
    'https://res.cloudinary.com/dfyuv19ig/image/upload/v1583862168/mask/KakaoTalk_Photo_2020-03-11-02-40-02_urlrsf.png',
  some:
    'https://res.cloudinary.com/dfyuv19ig/image/upload/v1583863080/mask/KakaoTalk_Photo_2020-03-11-02-57-44_fadusa.png',
  plenty:
    'https://res.cloudinary.com/dfyuv19ig/image/upload/v1583863080/mask/KakaoTalk_Photo_2020-03-11-02-57-47_rlyrqw.png',
};

const storeType: any = {
  '01': '약국',
  '02': '우체국',
  '03': '농협',
};

const getMarkerZIndex = (stat: any) => {
  if (stat === 'plenty') return 40;
  if (stat === 'some') return 30;
  if (stat === 'few') return 20;
  if (stat === 'empty') return 10;
  return 1;
};

const getRemainText = (stat: any) => {
  if (stat === 'plenty') return '100개 이상';
  if (stat === 'some') return '30 ~ 99개';
  if (stat === 'few') return '2 ~ 29개';
  if (stat === 'empty') return '1개 남음';
  return 1;
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

function Map({
  latitude,
  longitude,
  markerLatitude,
  markerLongitude,
}: MapProps) {
  const mapEl = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const currentMarker = useRef<any>(null);
  const storeMarkers = useRef<any>(null);
  const [stores, setStores] = useState([]);
  const cancelSource = useRef<any>(null);

  const initStores = useCallback(async (lat, lng) => {
    try {
      if (cancelSource.current) {
        cancelSource.current.cancel();
      }
      const source = axios.CancelToken.source();
      cancelSource.current = source;
      const meter = Math.max(500, map.current.getLevel() * 1000 - 2000);
      const { data } = await getStores(lat, lng, meter, source.token);
      setStores(data.stores);
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Request canceled.');
      } else {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    // 서울 시청
    const defaultLat = 37.5646854;
    const defaultLng = 126.9742512;
    const container = mapEl.current;
    const options = {
      center: new kakao.maps.LatLng(defaultLat, defaultLng),
      level: 6,
    };
    map.current = new kakao.maps.Map(container, options);
    map.current.setMaxLevel(10);

    initStores(defaultLat, defaultLng);
  }, [initStores]);

  const handleLocationChanged = useCallback(
    throttle(() => {
      const center = map.current.getCenter();
      initStores(center.getLat(), center.getLng());
    }, 1500),
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
      currentMarker.current = new kakao.maps.Marker({
        map: map.current,
        position: new kakao.maps.LatLng(markerLatitude, markerLongitude),
      });
    }
  }, [markerLatitude, markerLongitude]);

  useEffect(() => {
    if (storeMarkers.current) {
      storeMarkers.current.forEach((marker: any) => {
        marker.setMap(null);
      });
    }

    storeMarkers.current = stores.map((store: any) => {
      const imageSrc = storeImage[store.remain_stat];
      const imageSize = new kakao.maps.Size(22, 22);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const zIndex = getMarkerZIndex(store.remain_stat);
      const latlng = new kakao.maps.LatLng(store.lat, store.lng);

      const marker = new kakao.maps.Marker({
        map: map.current,
        position: latlng,
        title: store.name,
        image: markerImage,
        zIndex,
        clickable: true,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(`
            <div class="store-info">
                <div class="store-name">${store.name} (${storeType[store.type]})</div>
                <div class="stock_at">입고시간 : ${moment(store.stock_at).format('MM월 DD일 HH:mm')}</div>
                <div class="remain">재고상태 : ${getRemainText(store.remain_stat)}</div>
            </div>
        `);
        infoWindow.open(map.current, marker);
      });

      return marker;
    });
  }, [stores]);

  return <MapContainer className="map-container" ref={mapEl} />;
}

export default Map;
