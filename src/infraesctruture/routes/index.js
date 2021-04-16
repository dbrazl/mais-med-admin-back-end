import { Router } from "express";

import PharmsController from "../../application/controllers/PharmsController";
import MedicinesController from "../../application/controllers/MedicinesController";
import VacineController from "../../application/controllers/VacineController";
import VacineSchedulingController from "../../application/controllers/VacineSchedulingController";

import MedicinesIndexValidator from "../../application/middlewares/validators/MedicinesController/IndexValidator";
import VacineIndexValidator from "../../application/middlewares/validators/VacineController/IndexValidator";
import VacineSchedulingIndexDatesValidator from "../../application/middlewares/validators/VacineSchedulingController/IndexDatesValidator";
import VacineSchedulingIndexSchudulesValidator from "../../application/middlewares/validators/VacineSchedulingController/IndexSchedulesValidator";

const app = new Router();

app.get("/pharms", PharmsController.index);
app.get(
  "/pharms/medicine/available/:medicineName",
  PharmsController.indexByMedicine
);
app.get("/medicines", MedicinesIndexValidator, MedicinesController.index);
app.get("/vacines", VacineIndexValidator, VacineController.index);
app.get(
  "/vacine/dates",
  VacineSchedulingIndexDatesValidator,
  VacineSchedulingController.indexAvailableDates
);
app.get(
  "/vacine/schedules",
  VacineSchedulingIndexSchudulesValidator,
  VacineSchedulingController.indexAvailableSchedules
);
app.post("/vacine", VacineController.store);

export default app;
