import * as zod from "zod";
import { errorHandler } from "../../helpers/handlers";
import { CustomError } from "../../../../services/customError";

async function DeleteValidator(request, response, next) {
  try {
    const schema = zod.object({
      id: zod.string(),
    });
    schema.parse(request.params);

    const { id } = request.params;

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

export default DeleteValidator;
