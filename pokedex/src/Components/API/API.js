import { useState } from "react";

const API = () => {
  const [apiData, setApiData] = useState([]);

  const apiURL = "https://pokeapi.co/api/v2/pokemon";

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      setApiData(data.results);
    });

  return apiData.map((item) => (
    <p>
      name: {item.name}
      <br />
      url: {item.url}
    </p>
  ));
};

export default API;
