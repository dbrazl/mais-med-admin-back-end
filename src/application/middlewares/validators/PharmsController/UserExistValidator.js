import * as zod from "zod";
import { errorHandler } from "../../helpers/handlers";

async function UserExistValidator(request, response, next) {
  try {
    const schema = zod.object({
      email: zod.string().email(),
    });
    schema.parse(request.query);

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default UserExistValidator;
