import { Router } from "express";

import PharmsController from "./controllers/PharmsController";
import MedicinesController from "./controllers/MedicinesController";

const app = new Router();

app.get("/pharms", PharmsController.index);
app.get(
  "/pharms/medicine/available/:medicineName",
  PharmsController.indexByMedicine
);
app.get("/medicines", MedicinesController.index);

export default app;
