"use client";

import React, { useEffect, useRef } from "react";
import neshan_map_loader from "../loaders/neshan_map_loader";

interface NeshanMapProps {
  style?: React.CSSProperties;
  options?: {
    key: string;
    maptype: string;
    poi: boolean;
    traffic: boolean;
    center: [number, number];
    zoom: number;
  };
  onInit?: (L: any, map: any) => void;
}

const NeshanMap: React.FC<NeshanMapProps> = (props) => {
  const { style, options, onInit } = props;
  const mapEl = useRef<HTMLDivElement>(null);

  const defaultStyle: React.CSSProperties = {
    width: "75vw",
    height: "400px",
    margin: 0,
    padding: "10px",
    background: "#eee",
  };

  const defaultOptions = {
    key: "YOUR_API_KEY",
    maptype: "dreamy",
    poi: true,
    traffic: false,
    center: [35.699739, 51.338097] as [number, number],
    zoom: 14,
  };

  useEffect(() => {
    if (mapEl.current && mapEl.current.id) {
      return;
    }

    neshan_map_loader({
      onLoad: () => {
        let map = new window.L.Map(mapEl.current, { 
          ...defaultOptions,
          ...options,
        });
        if (onInit) onInit(window.L, map);
      },
      onError: () => {
        console.error("Neshan Maps Error: This page didn't load Neshan Maps correctly");
      },
    });
  }, [options, onInit]);

  return <div ref={mapEl} style={{ ...defaultStyle, ...style }} />;
};

export default NeshanMap;
