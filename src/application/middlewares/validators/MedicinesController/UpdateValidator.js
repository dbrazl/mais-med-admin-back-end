import * as zod from "zod";
import { errorHandler } from "../../helpers/handlers";

async function UpdateValidator(request, response, next) {
  try {
    const schema = zod.object({
      id: zod.string(),
      name: zod.string(),
      quantity: zod.number(),
      needSchedule: zod.boolean(),
    });
    schema.parse(request.body);

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default UpdateValidator;
