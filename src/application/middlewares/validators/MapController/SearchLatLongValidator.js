import * as zod from "zod";
import { errorHandler } from "../../helpers/handlers";

async function SearchAddressValidator(request, response, next) {
  try {
    const schema = zod.object({
      address: zod.string(),
    });
    schema.parse(request.query);

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default SearchAddressValidator;
