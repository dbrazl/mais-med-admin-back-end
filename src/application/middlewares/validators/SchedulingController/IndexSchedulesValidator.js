import * as zod from "zod";
import { errorHandler } from "../helpers/handlers";

async function IndexSchedulesValidator(request, response, next) {
  try {
    const schema = zod.object({
      date: zod.string(),
    });
    schema.parse(request.query);

    const date = request.query.date;

    const dateSchema = zod
      .string()
      .refine((data) => data.match(/\//g)?.length === 2 && data.split("/")[2], {
        path: ["date"],
        message: "Date is malformmed",
      });
    dateSchema.parse(date);

    return next();
  } catch (error) {
    return response.status(400).json(errorHandler(error));
  }
}

export default IndexSchedulesValidator;
