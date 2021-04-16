import { Router } from "express";

import PharmsController from "../../application/controllers/PharmsController";
import MedicinesController from "../../application/controllers/MedicinesController";
import VacineController from "../../application/controllers/VacineController";
import SchedulingController from "../../application/controllers/SchedulingController";

import MedicinesIndexValidator from "../../application/middlewares/validators/MedicinesController/IndexValidator";
import VacineIndexValidator from "../../application/middlewares/validators/VacineController/IndexValidator";
import SchedulingIndexDatesValidator from "../../application/middlewares/validators/SchedulingController/IndexDatesValidator";

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
  SchedulingIndexDatesValidator,
  SchedulingController.indexDates
);
app.get("/vacine/schedules", VacineController.indexSchedules);
app.post("/vacine", VacineController.store);

export default app;
