import { useState, useEffect } from "react";
import { Carousel } from '@mantine/carousel';

import '@mantine/carousel/styles.css';

const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-12-06&end_date=2023-12-08"

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const sliderStyle = {
  initialSlide: 1,
  slideSize: "70%",
  slideGap: "md",
  withIndicators: false,
  includeGapInSize: false,
  styles: {
    slide: {
      // backgroundImage: "url(https://images.unsplash.com/photo-1551156597-9084ca482811?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      backgroundColor: "#647bab",
      borderRadius: "30px",
      textAlign: "center",
      height: "400px",
      fontSize: "20px",
      color: "#d5e4fb",
      fontWeight: "bold",
    },

  }
}

function App() {

  const [weather, setWeather] = useState({});

  const getData = () => {
    setWeather({...weather, isLoading: true});

    return fetch(`${API}`)
      .then(checkReponse)
      .then(response => setWeather( {...weather, data: response, isLoading: false, hasError: false} ))
      .catch(e => setWeather({...weather, loading: false, hasError: true}));
  }

  useEffect(() => {
    getData();
  }, []);

  if (weather.data) {
    console.log(weather.data);
  }

  return (
    <>
      <h1 style={{paddingLeft: "30px", color: "#fff"}}>Weather App</h1>

      {
        weather.data &&
        <Carousel {...sliderStyle}>
          {
            weather.data.daily.time.map((item, index) => (
              <Carousel.Slide key={index}>
                <p style={{backgroundColor: "#f6f3ff", borderRadius: "10px", color: "#647bab"}}>{item}</p>
                <p>{'max: ' + weather.data.daily.temperature_2m_max[index]}</p>
                <p>{'min: ' + weather.data.daily.temperature_2m_min[index]}</p>
              </Carousel.Slide>
            ))
          }
        </Carousel>
      }

    </>
  );
}

export default App;