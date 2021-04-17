import { Vacination, encodeCpf } from "../models/Vacination";
import { VacineScheduling } from "../models/VacineScheduling";

class VacinationController {
  async index(request, response) {
    try {
      const { page, hashCpf } = request.query;
      const offset = parseInt(page) * 10;

      const vacines = await Vacination.find({ hashCpf })
        .limit(10)
        .skip(offset)
        .select("-_id -__v -hashCpf");

      if (vacines.length <= 0)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Don't have vacinations scheduled on this page"],
        });

      return response.status(200).json(vacines);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async store(request, response) {
    try {
      const { cpf, date, schedule } = request.body;

      const scheduling = await VacineScheduling.findOne({ date });

      if (!scheduling)
        return response.status(404).json({
          message: "Not found",
          reasons: ["This date aren't available to scheduling"],
        });

      const hasAvailableSchedule = !!scheduling.schedules.find(
        (one) => one.label === schedule
      );

      if (!hasAvailableSchedule)
        return response.status(404).json({
          message: "Not found",
          reasons: ["This schedule aren't available to scheduling"],
        });

      const rawCpf = await encodeCpf(cpf);

      const scheduleIndex = scheduling.schedules.findIndex(
        (one) => one.label === schedule
      );

      scheduling.schedules[scheduleIndex].scheduled = true;
      scheduling.schedules[scheduleIndex].scheduledByUser = rawCpf;
      await scheduling.save();

      await Vacination.create({
        rawCpf,
        date,
        schedule,
      });

      return response.status(201).json({
        message: "Attendance registered",
        date: request.body.date,
        schedule: request.body.schedule,
        rawCpf,
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new VacinationController();
