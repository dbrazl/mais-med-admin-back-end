import { Router } from "express";

import PharmsController from "../../application/controllers/PharmsController";
import MedicinesController from "../../application/controllers/MedicinesController";
import VacinationsController from "../../application/controllers/VacinationsController";
import VacineSchedulingController from "../../application/controllers/VacineSchedulingController";

import MedicinesIndexValidator from "../../application/middlewares/validators/MedicinesController/IndexValidator";
import PharmsStoreValidator from "../../application/middlewares/validators/PharmsController/StoreValidator";
import PharmsUpdateValidator from "../../application/middlewares/validators/PharmsController/UpdateValidator";

import authorizationMiddleware from "../../application/middlewares/Authorization/JWT";

const app = new Router();

app.get("/healthcheck", (request, response) => response.status(200).json());

app.use(authorizationMiddleware);

app.get("/medicines", MedicinesIndexValidator, MedicinesController.index);
app.post("/pharms", PharmsStoreValidator, PharmsController.store);
app.put("/pharms", PharmsUpdateValidator, PharmsController.update);

export default app;
