import { VacineScheduling } from "../models/VacineScheduling";
import { isToday, isAfter, isBefore } from "date-fns";

class VacineSchedulingController {
  async indexAvailableDates(request, response) {
    try {
      const { page } = request.query;
      const offset = parseInt(page) * 10;

      const schedulings = await VacineScheduling.find()
        .limit(10)
        .skip(offset)
        .select("-_id -__v");

      if (schedulings.length <= 0)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Don't have schedulings on this page"],
        });

      const datesRepeated = schedulings.map((item) => item.date);
      const allDates = [...new Set(datesRepeated)];
      const datesNotExpired = allDates
        .map((date) => {
          const [day, month, year] = date.split("/");
          const dateTime = new Date(year, month - 1, day);

          if (isToday(dateTime) || isAfter(dateTime, new Date())) return date;

          return null;
        })
        .filter((val) => val);

      return response.status(200).json(datesNotExpired);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async indexAvailableSchedules(request, response) {
    try {
      const { date } = request.query;

      const [day, month, year] = date.split("/");
      const dateTime = new Date(year, month - 1, day);
      const isDateInPast = isBefore(dateTime, new Date()) && !isToday(dateTime);

      if (isDateInPast)
        return response.status(404).json({
          message: "Date in past",
          reasons: ["The date is in past"],
        });

      const scheduling = await VacineScheduling.findOne({ date }).select(
        "-_id -__v"
      );

      if (!scheduling)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Don't have scheduling for this date"],
        });

      const schedules = scheduling.schedules.filter(
        (schedule) => !schedule.scheduled
      );

      if (schedules.length <= 0)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Don't have available schedules for this date"],
        });

      const labels = schedules.map((schedule) => schedule.label);

      return response.status(200).json(labels);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new VacineSchedulingController();
