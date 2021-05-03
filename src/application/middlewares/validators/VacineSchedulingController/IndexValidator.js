import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import { errorHandler } from "../../helpers/handlers";

async function IndexValidator(request, response, next) {
  try {
    const schema = zod.object({
      medicineId: zod.string(),
    });
    schema.parse(request.query);

    const { medicineId } = request.query;

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

export default IndexValidator;
