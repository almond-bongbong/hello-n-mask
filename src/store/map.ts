import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MapState {
  latitude: number;
  longitude: number;
}

export const initialState: MapState = {
  latitude: 0,
  longitude: 0,
};

interface SetPositionPayload {
  latitude: number;
  longitude: number;
}

export default createSlice({
  name: 'map',
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<SetPositionPayload>) => ({
      latitude: action.payload.latitude,
      longitude: action.payload.longitude,
    }),
  },
});
