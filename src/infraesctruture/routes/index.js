import { Router } from "express";

import PharmsController from "../../application/controllers/PharmsController";
import MedicinesController from "../../application/controllers/MedicinesController";
import VacinationsController from "../../application/controllers/VacinationsController";
import VacineSchedulingController from "../../application/controllers/VacineSchedulingController";
import UserController from "../../application/controllers/UserController";

import MedicinesIndexValidator from "../../application/middlewares/validators/MedicinesController/IndexValidator";
import UserStoreValidator from "../../application/middlewares/validators/UserController/StoreValidator";
import UserUpdateValidator from "../../application/middlewares/validators/UserController/UpdateValidator";

const app = new Router();

app.get("/healthcheck", (request, response) => response.status(200).json());
app.get("/medicines", MedicinesIndexValidator, MedicinesController.index);
app.post("/users", UserStoreValidator, UserController.store);
app.put("/users/:id", UserUpdateValidator, UserController.update);

export default app;
