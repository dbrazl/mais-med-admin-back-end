import { Router } from "express";

import PharmsController from "../../application/controllers/PharmsController";
import MedicinesController from "../../application/controllers/MedicinesController";
import SessionController from "../../application/controllers/SessionController";
import VacinationsController from "../../application/controllers/VacinationsController";
import VacineSchedulingController from "../../application/controllers/VacineSchedulingController";
import MapController from "../../application/controllers/MapController";

import MedicinesIndexValidator from "../../application/middlewares/validators/MedicinesController/IndexValidator";
import PharmsStoreValidator from "../../application/middlewares/validators/PharmsController/StoreValidator";
import PharmsUpdateValidator from "../../application/middlewares/validators/PharmsController/UpdateValidator";
import SessionStoreValidator from "../../application/middlewares/validators/SessionController/StoreValidator";
import VacinantionIndexValidator from "../../application/middlewares/validators/VacinationsController/IndexValdiator";
import MedicinesStoreValidator from "../../application/middlewares/validators/MedicinesController/StoreValidator";
import MedicinesDeleteValidator from "../../application/middlewares/validators/MedicinesController/DeleteValidator";
import VacineSchedulingStoreValidator from "../../application/middlewares/validators/VacineSchedulingController/StoreValidator";
import VacineSchedulingUpdateValidator from "../../application/middlewares/validators/VacineSchedulingController/UpdateValidator";
import VacineSchedulingDeleteValidator from "../../application/middlewares/validators/VacineSchedulingController/DeleteValidator";
import SearchAddressValidator from "../../application/middlewares/validators/MapController/SearchAddressValidator";
import SearchLatLongValidator from "../../application/middlewares/validators/MapController/SearchLatLongValidator";
import PharmsUserExistValidator from "../../application/middlewares/validators/PharmsController/UserExistValidator";
import VacineSchedulinfIndexValidator from "../../application/middlewares/validators/VacineSchedulingController/IndexValidator";
import MedicinesUpdateValidator from "../../application/middlewares/validators/MedicinesController/UpdateValidator";

import authorizationMiddleware from "../../application/middlewares/Authorization/JWT";

const app = new Router();

app.get("/healthcheck", (request, response) => response.status(200).json());
app.post("/session", SessionStoreValidator, SessionController.store);

// JWT para etapa de cadastro

app.get(
  "/map/search/address",
  SearchAddressValidator,
  MapController.searchAddress
);

app.get(
  "/map/search/latLong",
  SearchLatLongValidator,
  MapController.searchLatLong
);

app.post("/pharms", PharmsStoreValidator, PharmsController.store);
app.get(
  "/pharms/user/exist",
  PharmsUserExistValidator,
  PharmsController.userExist
);

app.use(authorizationMiddleware);

app.get("/medicines", MedicinesIndexValidator, MedicinesController.index);
app.put("/pharms", PharmsUpdateValidator, PharmsController.update);
app.get("/vacinations", VacinantionIndexValidator, VacinationsController.index);
app.post("/medicines", MedicinesStoreValidator, MedicinesController.store);
app.put("/medicines", MedicinesUpdateValidator, MedicinesController.update);
app.delete(
  "/medicines/:id",
  MedicinesDeleteValidator,
  MedicinesController.delete
);
app.get(
  "/vacine/schedule",
  VacineSchedulinfIndexValidator,
  VacineSchedulingController.index
);
app.post(
  "/vacine/schedule",
  VacineSchedulingStoreValidator,
  VacineSchedulingController.store
);
app.put(
  "/vacine/schedule",
  VacineSchedulingUpdateValidator,
  VacineSchedulingController.update
);
app.delete(
  "/vacine/schedule/:id",
  VacineSchedulingDeleteValidator,
  VacineSchedulingController.delete
);

export default app;
