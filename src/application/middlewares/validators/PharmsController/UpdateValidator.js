import * as zod from "zod";
import { errorHandler } from "../helpers/handlers";
import { CustomError } from "../../../../services/customError";

async function UpdateValidator(request, response, next) {
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
      email: zod.string().email(),
      password: zod.string().min(6),
      neighborhood: zod.string(),
      location: locationSchema,
      medicines: zod.array(medicineSchema),
    });
    schema.parse(request.body);

    const id = request.params.id;

    const idSchema = zod.string();
    idSchema.parse(id);

    const ID_LENGTH = 24;

    if (id.length !== ID_LENGTH)
      throw new CustomError({
        errors: [
          {
            path: ["id"],
            message: "The id is malformed",
          },
        ],
      });

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default UpdateValidator;
