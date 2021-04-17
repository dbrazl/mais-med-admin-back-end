import _ from "lodash";
import { Pharms } from "../models/Pharms";
import mock from "../../assets/mock/pharms";

class PharmsController {
  async index(request, response) {
    try {
      const { page } = request.query;
      const offset = parseInt(page) * 10;

      const pharms = await Pharms.find()
        .limit(10)
        .skip(offset)
        .select("-_id -__v");

      if (pharms.length <= 0)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Don't have pharms on this page"],
        });

      return response.status(200).json(pharms);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  indexByMedicine(request, response) {
    const { medicineName } = request.params;

    const pharmsWithMedicine = pharms
      .map((pharm) => {
        const founded = !!pharm.medicines.find((medicine) =>
          medicine.name.toLowerCase().includes(medicineName.toLowerCase())
        );

        if (founded) {
          const quantity = pharm.medicines.find((medicine) =>
            medicine.name.toLowerCase().includes(medicineName.toLowerCase())
          ).quantity;

          return {
            ...pharm,
            quantity,
          };
        }
      })
      .filter((one) => !!one);

    return response
      .status(200)
      .json(_.sortBy(pharmsWithMedicine, ["distance"]));
  }
}

export default new PharmsController();
