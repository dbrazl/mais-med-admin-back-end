import * as zod from "zod";
import { errorHandler } from "../../helpers/handlers";

async function SearchAddressValidator(request, response, next) {
  try {
    const schema = zod.object({
      latitude: zod.string(),
      longitude: zod.string(),
    });
    schema.parse(request.query);

    const latitude = request.query.latitude;

    if (!Number.isFinite(parseFloat(latitude)))
      throw new CustomError({
        errors: [
          {
            path: ["latitude"],
            message: "The latitude should be a number",
          },
        ],
      });

    const longitude = request.query.longitude;

    if (!Number.isFinite(parseFloat(longitude)))
      throw new CustomError({
        errors: [
          {
            path: ["longitude"],
            message: "The longitude should be a number",
          },
        ],
      });

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default SearchAddressValidator;
