import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import { errorHandler } from "../../helpers/handlers";

async function SearchAddressValidator(request, response, next) {
  try {
    const schema = zod.object({
      latitude: zod.number(),
      longitude: zod.number(),
    });
    schema.parse(request.query);

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default SearchAddressValidator;
