import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import { errorHandler } from "../../helpers/handlers";

async function IndexValidator(request, response, next) {
  try {
    const schema = zod.object({
      unitId: zod.string(),
    });
    schema.parse(request.query);

    const unityId = request.query.unitId;
    const HASH_SIZE = 24;

    if (unityId.length !== HASH_SIZE)
      throw new CustomError({
        errors: [
          {
            path: ["unitId"],
            message: "The hash is invalid",
          },
        ],
      });

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default IndexValidator;
