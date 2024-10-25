"use client";

import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import axios from "axios";
import NeshanMap from "../modules/NeshanMap";

interface CustomNeshanMapProps {
  setStartPlace: (latLang: { lat: number; lng: number } | null) => void;
  setDestPlace: (latLang: { lat: number; lng: number } | null) => void;
}

const CustomNeshanMap: React.FC<CustomNeshanMapProps> = ({
  setStartPlace,
  setDestPlace,
}) => {
  let testStart: boolean = false;
  let testDest: boolean = false;

  return (
    <div className="w-full h-full">
      <NeshanMap
        options={{
          key: "web.e967046fce064ab6b60df0bdce8f50ed",
          maptype: "dreamy",
          poi: true,
          traffic: false,
          center: [29.5926, 52.5836],
          zoom: 12,
        }}
        onInit={(L: any, myMap: any) => {
          let startMarker: any, destMarker: any;

          myMap.on(
            "click",
            function (e: { latlng: { lat: number; lng: number } }) {
              if (testStart == false) {
                if (startMarker) myMap.removeLayer(startMarker);
                startMarker = L.marker([e.latlng.lat, e.latlng.lng], {
                  icon: L.divIcon({
                    className: "start-marker",
                    html: '<div class="start-marker"></div>',
                  }),
                })
                  .addTo(myMap)
                  .bindPopup("مبدا");
                setStartPlace(e.latlng);
                testStart = true;
              } else if (testDest == false) {
                if (destMarker) myMap.removeLayer(destMarker);
                destMarker = L.marker([e.latlng.lat, e.latlng.lng], {
                  icon: L.divIcon({
                    className: "dest-marker",
                    html: '<div class="dest-marker"></div>',
                  }),
                })
                  .addTo(myMap)
                  .bindPopup("مقصد");
                setDestPlace(e.latlng);
                testDest = true;
              } else {
                if (startMarker) myMap.removeLayer(startMarker);
                if (destMarker) myMap.removeLayer(destMarker);
                setStartPlace(null);
                setDestPlace(null);
                testStart = false;
                testDest = false;
              }
            }
          );

          L.circle([35.699739, 51.348097], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 500,
          }).addTo(myMap);
        }}
      />
    </div>
  );
};

export default CustomNeshanMap;
