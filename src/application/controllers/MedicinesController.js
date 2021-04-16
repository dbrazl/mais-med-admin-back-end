import { Medicine } from "../models/Medicine";

class MedicinesController {
  async index(request, response) {
    try {
      const unityId = request.query.unityId;
      const page = request.query.page;
      const offset = parseInt(page) * 10;

      const medicines = await Medicine.find({ unityId })
        .limit(10)
        .skip(offset)
        .select("-_id -__v -unityId");

      if (medicines.length <= 0)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Don't have medicines on this page"],
        });

      return response.status(200).json(medicines);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new MedicinesController();
