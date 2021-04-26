import api from "../../services/api-google-geocoding";

class Map {
  async searchAddress(request, response) {
    try {
      const { latitude, longitude } = request.query;

      const GOOGLE_API_KEY = process.env.GOOGLE_KEY || "";

      const query = `?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

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

  searchLatLong(request, response) {}
}

export default new Map();
