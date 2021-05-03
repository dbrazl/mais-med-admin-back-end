import {
  VacineScheduling,
  brazilianDateToUSADate,
} from "../models/VacineScheduling";
import {
  format,
  addDays,
  subDays,
  differenceInCalendarDays,
  addMilliseconds,
  subMilliseconds,
} from "date-fns";

class VacineSchedulingController {
  async index(request, response) {
    try {
      const { medicineId } = request.query;
      const { id } = request.user;

      const schedule = await VacineScheduling.findOne({
        medicineId,
        unitId: id,
      });

      if (!schedule)
        return response.status(404).json({
          message: "Not found",
          reasons: ["Schedule are not registered"],
        });

      return response.status(200).json(schedule);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async store(request, response) {
    try {
      const {
        startDate,
        endDate,
        startHour,
        endHour,
        intervalTime,
        medicineId,
      } = request.body;
      const { id } = request.user;

      await VacineScheduling.deleteMany({ medicineId, unitId: id });

      const firstDate = new Date(brazilianDateToUSADate(startDate));
      const lastDate = new Date(brazilianDateToUSADate(endDate));
      let oneDayBehindFirstDate = subDays(firstDate, 1);

      const firstHour = new Date(`01/01/2021 ${startHour}`);
      const lastHour = new Date(`01/01/2021 ${endHour}`);
      const intervalMiliseconds =
        new Date(`01/01/2021 ${intervalTime}`).getTime() -
        new Date(`01/01/2021`).getTime();
      let oneIntervalBehindFirstHour = subMilliseconds(
        firstHour,
        intervalMiliseconds
      );

      const numberOfIntervals = Math.floor(
        (lastHour.getTime() - firstHour.getTime()) / intervalMiliseconds
      );

      const days = differenceInCalendarDays(lastDate, firstDate) + 1;

      for (let i = 0; i < days; i++) {
        oneDayBehindFirstDate = addDays(oneDayBehindFirstDate, 1);

        let schedules = [];

        for (let j = 0; j < numberOfIntervals; j++) {
          oneIntervalBehindFirstHour = addMilliseconds(
            oneIntervalBehindFirstHour,
            intervalMiliseconds
          );

          const schedule = `${format(
            oneIntervalBehindFirstHour,
            "hh:mm"
          )} a ${format(
            addMilliseconds(oneIntervalBehindFirstHour, intervalMiliseconds),
            "hh:mm"
          )} horas`;

          schedules.push({
            label: schedule,
            scheduled: false,
            scheduledByUser: "",
          });
        }

        await VacineScheduling.create({
          date: format(oneDayBehindFirstDate, "dd/MM/yyyy"),
          schedules,
          scheduleInfo: {
            startDate,
            endDate,
            startHour,
            endHour,
            intervalTime,
          },
          medicineId,
          unitId: id,
        });
      }

      return response.status(201).json();
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

      const scheduling = await VacineScheduling.findById(id);

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
