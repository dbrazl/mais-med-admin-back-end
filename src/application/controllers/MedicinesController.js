import { Medicine } from "../models/Medicine";
import { Pharms } from "../models/Pharms";

class MedicinesController {
  async index(request, response) {
    try {
      const unitId = request.query.unitId;

      const pharm = await Pharms.findById(unitId);

      if (!pharm)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Pharm does not exist"],
        });

      if (pharm?.medicines.length <= 0)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Don't have medicines"],
        });

      return response.status(200).json(pharm?.medicines);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async store(request, response) {
    try {
      const { name, quantity, needSchedule } = request.body;
      const { id } = request.user;

      const medicine = await Medicine.create({ name, quantity, unitId: id });

      const pharm = await Pharms.findById(id);

      pharm.medicines = [{ name, quantity, needSchedule }, ...pharm?.medicines];
      await pharm.save();

      return response
        .status(200)
        .json({ id: medicine._id, name, quantity, needSchedule });
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
