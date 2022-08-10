import React, { Component } from "react";

export default class App extends Component {
  state = {
    temp: "",
    city: "",
    country: "",
    humidity: "",
    describe: "",
  };

  getWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value.toLowerCase();
    let country = e.target.elements.country.value.toLowerCase();
    let api = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}t&appid=e36ed364400282e43250b6c4c0274d44`
    );
    let data = await api.json();
    if (city && country) {
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        describe: data.weather[0].description,
      });
    }
  };

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="parent rounded p-5 shadow my-5">
          <h1 className="text-white fw-light mb-5">Get Weather</h1>
          <form className="row mb-5" onSubmit={this.getWeather}>
            <input
              type="text"
              className="p-2 col-12 mb-3 border-0 rounded"
              name="city"
              placeholder="City..."
            />
            <input
              type="text"
              className="p-2 col-12 mb-3 border-0 rounded"
              name="country"
              placeholder="Country..."
            />
            <input
              type="submit"
              value="Get"
              className="py-2 col-12 border-0 rounded bg-success text-white fs-4"
            />
          </form>
          {(this.getWeather.country !=='' && this.getWeather.city !=='')? (
            <div>
              {this.state.city && (
                <p className="text-white mb-4 fs-4 border-bottom py-3">
                  <span className="fw-bold me-2">City:</span> {this.state.city}
                </p>
              )}
              {this.state.country && (
                <p className="text-white mb-4 fs-4 border-bottom py-3">
                  <span className="fw-bold me-2">Country:</span>{" "}
                  {this.state.country}
                </p>
              )}
              {this.state.describe && (
                <p className="text-white mb-4 fs-4 border-bottom py-3">
                  <span className="fw-bold me-2">Weather condition:</span>{" "}
                  {this.state.describe}
                </p>
              )}
              {this.state.temp && (
                <p className="text-white mb-4 fs-4 border-bottom py-3">
                  <span className="fw-bold me-2">Tempreature:</span>{" "}
                  {this.state.temp}
                </p>
              )}
              {this.state.humidity && (
                <p className="text-white mb-4 fs-4 py-3">
                  <span className="fw-bold me-2">Humidity:</span>{" "}
                  {this.state.humidity} %
                </p>
              )}
            </div>
          ) : (
            <div className="text-center text-white-50 p-3">
              <p>Please Inter City and Country Name</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
