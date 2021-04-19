import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import { errorHandler } from "../../helpers/handlers";

async function StoreValidator(request, response, next) {
  try {
    const schema = zod.object({
      date: zod.string(),
      schedule: zod.string(),
      medicineId: zod.string(),
    });
    schema.parse(request.body);

    const { date, schedule, medicineId } = request.body;

    const dateSchema = zod
      .string()
      .refine((data) => data.match(/\//g)?.length === 2 && data.split("/")[2], {
        path: ["date"],
        message: "Date is malformmed",
      });
    dateSchema.parse(date);

    const SCHEDULE_LENGTH = 19;

    if (schedule.length !== SCHEDULE_LENGTH)
      throw new CustomError({
        errors: [
          {
            path: ["schedule"],
            message: `Schedule is malformed - Index: ${index}`,
          },
        ],
      });

    const MEDICINE_ID_LEGNTH = 24;

    if (medicineId.length !== MEDICINE_ID_LEGNTH)
      throw new CustomError({
        errors: [
          {
            path: ["medicineId"],
            message: "Medicine id is malformed",
          },
        ],
      });

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default StoreValidator;
