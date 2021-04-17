import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import verifyCpf from "../../../../services/cpf";
import { errorHandler } from "../helpers/handlers";

async function IndexHashCpfValidator(request, response, next) {
  try {
    const schema = zod.object({
      cpf: zod.string(),
    });
    schema.parse(request.body);

    const cpf = request.body.cpf;

    const CPF_LENGTH = 11;

    if (cpf.length !== CPF_LENGTH)
      throw new CustomError({
        errors: [
          {
            path: ["cpf"],
            message: "The CPF is not valid",
          },
        ],
      });

    const isCpfValid = verifyCpf(cpf);

    if (!isCpfValid)
      throw new CustomError({
        errors: [
          {
            path: ["cpf"],
            message: "The CPF is not valid",
          },
        ],
      });

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default IndexHashCpfValidator;
