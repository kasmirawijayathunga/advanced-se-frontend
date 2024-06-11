import { useEffect } from "react"
import { useMap } from "react-leaflet"

function MapComponent({ position }:{ position:number[] }) {
    const map = useMap()
    useEffect(() => {
        map.panTo({
            lat: position[0],
            lng: position[1]
        })
    },[position])
    return null
}

export default MapComponent