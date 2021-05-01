import * as zod from "zod";
import { errorHandler } from "../../helpers/handlers";
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

    const schema = zod
      .object({
        name: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(6).optional(),
        newPassword: zod.string().min(6).optional(),
        address: zod.string(),
        neighborhood: zod.string(),
        location: locationSchema,
        medicines: zod.array(medicineSchema),
      })
      .refine((data) => !(data?.password && !data?.newPassword), {
        message: "You should info new password field",
        path: ["newPassword"],
      })
      .refine((data) => !(!data?.password && data?.newPassword), {
        message: "You should info password field",
        path: ["password"],
      });

    schema.parse(request.body);

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default UpdateValidator;
