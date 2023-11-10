import { useEffect, useState } from "react";
import Places from "./Places.jsx";

const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
 const [availablePlaces, setAvailablePlaces] = useState([]);

 //useEffect to prevent infinite loop --> will executed once
 useEffect(() => {
  fetch("http://localhost:3000/places")
   .then((res) => {
    return res.json();
   })
   .then((resData) => {
    setAvailablePlaces(resData.places);
   });
 }, []);

 return (
  <Places
   title="Available Places"
   places={availablePlaces}
   fallbackText="No places available."
   onSelectPlace={onSelectPlace}
  />
 );
}
