import api from "../../services/api-google-geocoding";
import config from "../../infraesctruture/config/map";

class Map {
  async searchAddress(request, response) {
    try {
      const { latitude, longitude } = request.query;

      const query = `?latlng=${latitude},${longitude}&key=${config.apiKEY}`;

      const response = await api.get(query);

      const address = response.data?.results[0]?.formatted_address;
      const neighborhood = response.data?.results[0]?.address_components?.find(
        (one) => one?.types?.includes("sublocality")
      )?.long_name;

      return response.status(200).json({ address, neighborhood });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async searchLatLong(request, response) {
    try {
      const { address: search } = request.query;

      const query = `?address=${search}&key=${config.apiKEY}`;

      const response = await api.get(query);

      const latitude = response.data?.results[0]?.geometry?.location?.lat;
      const longitude = response.data?.results[0]?.geometry?.location?.lng;
      const address = response.data?.results[0]?.formatted_address;
      const neighborhood = response.data?.results[0]?.address_components?.find(
        (one) => one?.types?.includes("sublocality")
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
