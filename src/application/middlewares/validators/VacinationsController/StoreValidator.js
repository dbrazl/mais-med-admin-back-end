import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import verifyCpf from "../../../../services/cpf";
import { errorHandler } from "../helpers/handlers";

async function StoreValidator(request, response, next) {
  try {
    const schema = zod.object({
      cpf: zod.string(),
      date: zod.string(),
      schedule: zod.string(),
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

    const date = request.body.date;

    const dateSchema = zod
      .string()
      .refine((data) => data.match(/\//g)?.length === 2 && data.split("/")[2], {
        path: ["date"],
        message: "Date is malformmed",
      });
    dateSchema.parse(date);

    const SCHEDULE_LENGTH = 19;

    const schedule = request.body.schedule;

    if (schedule.length !== SCHEDULE_LENGTH)
      throw new CustomError({
        errors: [
          {
            path: ["schedule"],
            message: "Schedule is malformed",
          },
        ],
      });

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default StoreValidator;
