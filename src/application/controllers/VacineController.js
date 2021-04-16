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

  indexDates(request, response) {
    return response
      .status(200)
      .json([
        "10/11/2020",
        "11/11/2020",
        "12/11/2020",
        "15/11/2020",
        "16/11/2020",
      ]);
  }

  indexSchedules(request, response) {
    return response
      .status(200)
      .json([
        "15:00 as 15:15 horas",
        "15:15 as 15:30 horas",
        "16:15 as 16:15 horas",
        "16:15 as 16:30 horas",
      ]);
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
