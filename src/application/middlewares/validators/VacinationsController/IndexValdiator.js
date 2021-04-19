import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import { errorHandler } from "../../helpers/handlers";

async function IndexValidator(request, response, next) {
  try {
    const schema = zod.object({
      page: zod.string(),
    });
    schema.parse(request.query);

    const page = request.query.page;

    if (!Number.isInteger(parseInt(page)))
      throw new CustomError({
        errors: [
          {
            path: ["page"],
            message: "The page should be a number",
          },
        ],
      });

    if (parseInt(page) < 0)
      throw new CustomError({
        errors: [
          {
            path: ["page"],
            message: "The page is less than 0",
          },
        ],
      });

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default IndexValidator;
