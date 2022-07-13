# HellonMask
> 공적 마스크 판매정보 제공

메인 스레드의 이벤트처리를 방해하지 않도록 chunk, delay로 관리하여 순차적으로 처리
```
_.go(
  stores,
  L.filter((s) => s.remain_stat),
  L.filter((s) => !markerList.has(getIdByStore(s))),
  L.chunk(100),
  L.map((storeList) =>
    _.go(storeList, _.delay(30), makeMarkers(map.current)),
  ),
  _.flat,
  _.each((marker) => markerList.set(getIdByMarker(marker), marker)),
);
```
