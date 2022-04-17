import React from 'react';
import NeshanMap from 'react-neshan-map-leaflet';
import './style.scss';

const Map = ({ defaultLat, defaultLong, defaultZoom, style, onChoose }) => {
  return (
    <NeshanMap
      options={{
        key: 'web.CpQXCXvjTBsvGo10LS3dBOZgoQLx4UsXGAmP9JZk',
        center: [defaultLat || 35.699739, defaultLong || 51.338097],
        zoom: defaultZoom || 14,
      }}
      style={{
        width: 400,
        height: 400,
        ...style,
      }}
      onInit={(L, map) => {
        let marker = L.marker([35.699739, 51.338097]);

        map.on('click', function (e) {
          if (typeof onChoose === 'function') {
            onChoose(e.latlng);
          }
          marker.setLatLng(e.latlng);
          marker.addTo(map);
        });
        // options for disabling or enabling functionalities
        // map.dragging.disable();
        // map.touchZoom.disable();
        // map.doubleClickZoom.disable();
        // map.scrollWheelZoom.disable();
        // map.boxZoom.disable();
        // map.keyboard.disable();
        // if (map.tap) map.tap.disable();
        // document.getElementById('map').style.cursor = 'default';
      }}
    />
  );
};

export default Map;
