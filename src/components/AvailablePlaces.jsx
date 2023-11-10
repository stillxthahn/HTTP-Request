import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
 const [isFetching, setIsFetching] = useState(false);
 const [availablePlaces, setAvailablePlaces] = useState([]);
 const [error, setError] = useState();

 //CACH 1 useEffect to prevent infinite loop --> will executed once
 //  useEffect(() => {
 //   fetch("http://localhost:3000/places")
 //    .then((res) => {
 //     setIsFetching(true);
 //     return res.json();
 //    })
 //    .then((resData) => {
 //     setAvailablePlaces(resData.places);
 //     setIsFetching(false);
 //    });
 //  }, []);

 //CACH 2 async await
 useEffect(() => {
  async function fetchPlaces() {
   setIsFetching(true);
   try {
    const res = await fetch("http://localhost:3000/places");
    const resData = await res.json();
    if (!res.ok) {
     throw new Error("Failed to fetch places");
    }
    setAvailablePlaces(resData.places);
   } catch (error) {
    //...
    setError({
     message: error.message || "Could not fetch places, please try again",
    });
   }
   setIsFetching(false);
  }
  fetchPlaces();
 }, []);

 if (error) {
  return <Error title="An error occured!" message={error.message} />;
 }
 return (
  <Places
   title="Available Places"
   places={availablePlaces}
   isLoading={isFetching}
   loadingText="Fetching place data..."
   fallbackText="No places available."
   onSelectPlace={onSelectPlace}
  />
 );
}
