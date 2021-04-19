import { Vacination, encodeCpf } from "../models/Vacination";
import { VacineScheduling } from "../models/VacineScheduling";

class VacinationController {
  async index(request, response) {
    const { page } = request.query;
    const { id } = request.user;
    const offset = parseInt(page) * 10;

    const vacinations = await Vacination.find({ unitId: id })
      .limit(10)
      .skip(offset)
      .select("-_id -__v");

    if (vacinations.length <= 0)
      return response.status(404).json({
        message: "Not found",
        reasons: ["Don't have vacinations on this page"],
      });

    return response.status(200).json(vacination);
  }
}

export default new VacinationController();
