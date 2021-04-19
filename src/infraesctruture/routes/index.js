import { Router } from "express";

import PharmsController from "../../application/controllers/PharmsController";
import MedicinesController from "../../application/controllers/MedicinesController";
import VacinationsController from "../../application/controllers/VacinationsController";
import VacineSchedulingController from "../../application/controllers/VacineSchedulingController";

import MedicinesIndexValidator from "../../application/middlewares/validators/MedicinesController/IndexValidator";

const app = new Router();

app.get("/healthcheck", (request, response) => response.status(200).json());
app.get("/medicines", MedicinesIndexValidator, MedicinesController.index);

export default app;
