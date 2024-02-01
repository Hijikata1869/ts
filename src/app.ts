import axios from "axios";
import "dotenv/config";
require("dotenv").config();

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// 意味合いの解説。戻り値はオブジェクトで、resultsというフィールドがある。これは、オブジェクトの配列。このオブジェクトはgeometryというキーを持っている。geometryはオブジェクト。そのオブジェクトはlocationというキーを持っている。このlocationもオブジェクト。この中にlat, lngのキーがあり、どちらもnumber型。
type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

declare var google: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${apiKey}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        console.log(response);
        throw new Error("座標を取得できませんでした。");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}
form.addEventListener("submit", searchAddressHandler);
