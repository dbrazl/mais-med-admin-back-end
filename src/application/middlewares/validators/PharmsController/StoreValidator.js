import * as zod from "zod";
import { errorHandler } from "../helpers/handlers";

async function StoreValidator(request, response, next) {
  try {
    const locationSchema = zod.object({
      latitude: zod.number(),
      longitude: zod.number(),
    });

    const medicineSchema = zod.object({
      name: zod.string(),
      quantity: zod.number(),
      needSchedule: zod.boolean(),
    });

    const schema = zod.object({
      name: zod.string(),
      neighborhood: zod.string(),
      email: zod.string().email(),
      password: zod.string().min(6),
      location: locationSchema,
      medicines: zod.array(medicineSchema),
    });
    schema.parse(request.body);

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default StoreValidator;
