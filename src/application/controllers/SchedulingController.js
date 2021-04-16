import { Scheduling } from "../models/Scheduling";

class SchedulingController {
  async indexDates(request, response) {
    try {
      const { page } = request.query;
      const offset = parseInt(page) * 10;

      const schedulings = await Scheduling.find()
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
          const today = new Date().getTime();

          const [day, month, year] = date.split("/");
          const dateTime = new Date(year, month - 1, day).getTime();

          if (dateTime >= today) return date;

          return null;
        })
        .filter((val) => val);

      return response.status(200).json(datesNotExpired);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new SchedulingController();
