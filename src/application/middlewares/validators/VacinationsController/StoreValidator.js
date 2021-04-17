import * as zod from "zod";
import { CustomError } from "../../../../services/customError";
import verifyCpf from "../../../../services/cpf";
import { errorHandler } from "../helpers/handlers";

async function StoreValidator(request, response, next) {
  try {
    const schema = zod.object({
      hashCpf: zod.string(),
      date: zod.string(),
      schedule: zod.string(),
    });
    schema.parse(request.body);

    const hashCpf = request.body.hashCpf;

    const RAW_CPF_LENGTH = 60;

    if (hashCpf.length !== RAW_CPF_LENGTH)
      throw new CustomError({
        errors: [
          {
            path: ["hashCpf"],
            message: "The hashCpf is not valid",
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
