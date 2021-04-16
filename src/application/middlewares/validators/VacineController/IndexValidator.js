import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import verifyCpf from "../../../../services/cpf";
import { errorHandler } from "../helpers/handlers";

async function IndexValidator(request, response, next) {
  try {
    const schema = zod.object({
      page: zod.string(),
      cpf: zod.string(),
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

    const cpf = request.query.cpf;
    const isValidCpf = verifyCpf(cpf);

    if (!isValidCpf)
      throw new CustomError({
        errors: [
          {
            path: ["cpf"],
            message: "The CPF isn't valid",
          },
        ],
      });

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default IndexValidator;
