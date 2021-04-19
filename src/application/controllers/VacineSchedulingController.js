import { VacineScheduling } from "../models/VacineScheduling";
import { isToday, isAfter, isBefore } from "date-fns";

class VacineSchedulingController {
  async store(request, response) {
    try {
      const { date, schedule, medicineId } = request.body;

      const scheduling = await VacineScheduling.findOne({ medicineId, date });

      if (scheduling)
        return response.status(401).json({
          message: "Already exist",
          reasons: ["Scheduling already been created for this date"],
        });

      const schedulingCreated = await VacineScheduling.create({
        date,
        schedules: {
          label: schedule,
          scheduled: false,
          scheduledByUser: "",
        },
        medicineId,
      });

      return response.status(201).json({
        id: schedulingCreated._id,
        date,
        schedules: schedulingCreated.schedules,
        medicineId,
      });
    } catch (error) {
      return response.status(500).json({ mesage: error.message });
    }
  }
}

export default new VacineSchedulingController();
