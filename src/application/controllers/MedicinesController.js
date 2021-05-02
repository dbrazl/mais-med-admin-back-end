import { Medicine } from "../models/Medicine";

class MedicinesController {
  async index(request, response) {
    try {
      const unitId = request.query.unitId;
      const page = request.query.page;
      const offset = parseInt(page) * 10;

      const medicines = await Medicine.find({ unitId })
        .limit(10)
        .skip(offset)
        .select("-__v -unitId");

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

  async store(request, response) {
    try {
      const { name, quantity } = request.body;
      const { id } = request.user;

      const medicine = await Medicine.create({ name, quantity, unitId: id });

      return response.status(200).json({ id: medicine._id, name, quantity });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const medicine = await Medicine.findOne({ _id: id });

      if (!medicine)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Medicine does not exist"],
        });

      await Medicine.deleteOne({ _id: id });

      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new MedicinesController();
