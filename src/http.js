export async function fetchAvailablePlaces() {
 const res = await fetch("http://localhost:3000/places");
 const resData = await res.json();
 if (!res.ok) {
  throw new Error("Failed to fetch places");
 }

 return resData.places;
}
