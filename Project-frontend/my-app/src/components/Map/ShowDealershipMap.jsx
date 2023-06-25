import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ShowDealershipMap = ({ dealership }) => {
  useEffect(() => {
    console.log(dealership)
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: dealership.geometry.coordinates,
      zoom: 9,
    });

    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker()
      .setLngLat(dealership.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${dealership.title}</h3><p>${dealership.location}</p>`
        )
      )
      .addTo(map);

    return () => map.remove();
  }, [dealership]);

  return <div id="map" style={{ height: '500px' }} />;
};

export default ShowDealershipMap;
