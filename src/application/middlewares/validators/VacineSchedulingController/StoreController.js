import * as zod from "zod";
import { errorHandler } from "../../helpers/handlers";

async function StoreValidator(request, response, next) {
  try {
    const schedulesSchema = zod.object({
      label: zod.string(),
      scheduled: zod.boolean(),
      scheduledByUser: zod.string(),
    });

    const schema = zod.object({
      date: zod.string(),
      schedules: zod.array(schedulesSchema),
    });
    schema.parse(request.body);

    const { date, schedules } = request.body;

    const dateSchema = zod
      .string()
      .refine((data) => data.match(/\//g)?.length === 2 && data.split("/")[2], {
        path: ["date"],
        message: "Date is malformmed",
      });
    dateSchema.parse(date);

    const SCHEDULE_LENGTH = 19;
    const USER_ID_LENGTH = 24;

    schedules.forEach((schedule, index) => {
      if (schedule.label.length !== SCHEDULE_LENGTH)
        throw new CustomError({
          errors: [
            {
              path: ["schedule"],
              message: `Schedule is malformed - Index: ${index}`,
            },
          ],
        });

      if (schedule.scheduledByUser.length !== USER_ID_LENGTH)
        throw new CustomError({
          errors: [
            {
              path: ["scheduledByUser"],
              message: `User id is malformed - Index: ${index}`,
            },
          ],
        });
    });

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default StoreValidator;
