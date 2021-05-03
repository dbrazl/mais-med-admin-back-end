import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import { errorHandler } from "../../helpers/handlers";

async function StoreValidator(request, response, next) {
  try {
    const schema = zod.object({
      startDate: zod.string(),
      endDate: zod.string(),
      startHour: zod.string(),
      endHour: zod.string(),
      intervalTime: zod.string(),
      medicineId: zod.string(),
    });
    schema.parse(request.body);

    const {
      startDate,
      endDate,
      startHour,
      endHour,
      intervalTime,
      medicineId,
    } = request.body;

    const dates = { startDate, endDate };

    for (const [key, value] of Object.entries(dates)) {
      const dateSchema = zod
        .string()
        .refine(
          (data) => data.match(/\//g)?.length === 2 && data.split("/")[2],
          {
            path: [key],
            message: "Date is malformmed",
          }
        );
      dateSchema.parse(value);
    }

    const times = { startHour, endHour, intervalTime };

    for (const [key, value] of Object.entries(times)) {
      const timeSchema = zod
        .string()
        .refine(
          (data) =>
            data.match(/:/g)?.length === 1 &&
            data.split(":")[0]?.length === 2 &&
            data.split(":")[1]?.length === 2,
          {
            path: [key],
            message: "Hour is malformmed",
          }
        );
      timeSchema.parse(value);
    }

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
