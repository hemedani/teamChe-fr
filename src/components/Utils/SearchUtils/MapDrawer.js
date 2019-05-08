import React from "react";
import { FeatureGroup, Polygon, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

export default ({ setPolygon, polygon }) => {
  // console.log("==================");
  // console.log("GeoJson", GeoJSON);
  // console.log("==================");
  const polygonPosition = () => {
    let position = [];
    if (polygon && polygon.coordinates.length > 0) {
      polygon.coordinates[0].map(cor => position.push([cor[1], cor[0]]));
    }

    console.log("==================");
    console.log("polygonCoordinates position", polygon.coordinates, position);
    console.log("==================");
    return position;
  };

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onEdited={setPolygon}
        onCreated={setPolygon}
        draw={{
          rectangle: false,
          marker: false,
          circle: false,
          polyline: false,
          circlemarker: false
        }}
      />
      {/* {console.log("polygon from MapDrawer", polygon)} */}
      {polygon && <Polygon positions={polygonPosition()} />}
      {/* {polygon && <GeoJSON data={polygon} />} */}
    </FeatureGroup>
  );
};
