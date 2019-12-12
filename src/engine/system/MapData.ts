export interface MapTile {
  backgroundColor: Array<number>;
  foreGroundColor: Array<number>;
  uvs: Array<number>;
}

interface MapData {
  palette: Array<MapTile>;
  map: Array<Array<number>>;
}

export default MapData;
