'use client'

import React from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// @ts-ignore
// 將預設的 icon 設定為自訂的 icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src
})

interface MapProps {
  pointer?: number[]
}

// https://react-leaflet.js.org/docs/example-popup-marker/

// 地圖的 tile layer
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const Map: React.FC<MapProps> = ({ pointer }) => {
  return (
    <MapContainer
      center={(pointer as L.LatLngExpression) || [24, 121]}
      // 地圖縮放等級
      zoom={pointer ? 4 : 2}
      // 滑鼠滾輪縮放地圖
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} />
      {pointer && <Marker position={pointer as L.LatLngExpression} />}
    </MapContainer>
  )
}

export default Map
