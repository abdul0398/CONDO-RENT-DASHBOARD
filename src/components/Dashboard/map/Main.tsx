import 'maplibre-gl/dist/maplibre-gl.css';
import * as React from 'react';
import Map, { MapRef, Marker, FullscreenControl, ScaleControl } from 'react-map-gl/maplibre';
import { FaMapMarkerAlt } from "react-icons/fa";
import { MyContext } from '@/context/context';
export default function MapComponent() {

  const {transactions} = React.useContext(MyContext)

// console.log(transactions);
const test = [transactions[0]];

    return (
      <Map
      initialViewState={{latitude:1.31399286264569, longitude:103.837714613091, zoom: 10}}
        maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
        mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
      >
  
 

        <ScaleControl />
      </Map>
    );
  }