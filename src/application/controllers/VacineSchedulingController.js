import { VacineScheduling } from "../models/VacineScheduling";
import { isToday, isAfter, isBefore } from "date-fns";

class VacineSchedulingController {
  async store(request, response) {
    try {
      const { date, schedule, medicineId } = request.body;
      const { id } = request.user;

      const scheduling = await VacineScheduling.findOne({
        medicineId,
        date,
        unitId: id,
      });

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
        unitId: id,
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

  async update(request, response) {
    try {
      const { date, schedule, medicineId } = request.body;
      const { id } = request.user;

      const scheduling = await VacineScheduling.findOne({
        medicineId,
        date,
        unitId: id,
      });

      if (!scheduling)
        return response.status(401).json({
          message: "Not found",
          reasons: ["Scheduling is not registered"],
        });

      scheduling.date = date;
      scheduling.schedule = schedule;
      scheduling.medicineId = medicineId;
      const schedulingUpdated = await scheduling.save();

      return response.status(200).json(schedulingUpdated);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const unitId = request.user.id;

      const scheduling = await VacineScheduling.findOne({
        _id: id,
        date,
        unitId,
      });

      if (!scheduling)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Scheduling are not registered"],
        });

      await scheduling.deleteOne({ _id: id });

      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new VacineSchedulingController();
