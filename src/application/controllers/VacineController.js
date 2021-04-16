import { Vacine, encodeCpf } from "../models/Vacine";

class VacineController {
  async index(request, response) {
    try {
      const { page, hashCpf } = request.query;
      const offset = parseInt(page) * 10;

      const vacines = await Vacine.find({ hashCpf })
        .limit(10)
        .skip(offset)
        .select("-_id -__v -hashCpf");

      if (vacines.length <= 0)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Don't have vacines scheduled on this page"],
        });

      return response.status(200).json(vacines);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  store(request, response) {
    return response.status(201).json({
      message: "Attendance registered",
      date: request.body.date,
      schedule: request.body.schedule,
    });
  }
}

export default new VacineController();
