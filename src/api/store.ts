import axios, { CancelToken } from 'axios';

export const getStores = (
  latitude: number,
  longitude: number,
  meter: number = 5000,
  cancelToken?: CancelToken,
) =>
  axios.get(
    'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json',
    {
      params: {
        lat: latitude,
        lng: longitude,
        m: meter,
      },
      cancelToken,
    },
  );
