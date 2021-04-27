import config from "../../infraesctruture/config/map";
import fetch from "node-fetch";
const API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
class Map {
  async searchAddress(request, response) {
    try {
      const { latitude, longitude } = request.query;

      const query = `?latlng=${latitude},${longitude}&key=${config.apiKey}`;

      const returned = await fetch(`${API_URL}${query}`);
      const data = await returned.json();

      const address = data?.results[0]?.formatted_address;
      const neighborhood = data?.results[0]?.address_components?.find((one) =>
        one?.types?.includes("sublocality")
      )?.long_name;

      return response.status(200).json({ address, neighborhood });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async searchLatLong(request, response) {
    try {
      const { address: search } = request.query;

      const query = `?address=${search}&key=${config.apiKey}`;

      const returned = await fetch(`${API_URL}${query}`);
      const data = await returned.json();

      const latitude = data?.results[0]?.geometry?.location?.lat;
      const longitude = data?.results[0]?.geometry?.location?.lng;
      const address = data?.results[0]?.formatted_address;
      const neighborhood = data?.results[0]?.address_components?.find((one) =>
        one?.types?.includes("sublocality")
      )?.long_name;

      return response
        .status(200)
        .json({ latitude, longitude, address, neighborhood });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new Map();
