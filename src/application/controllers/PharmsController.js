import { Pharms, encodePassword } from "../models/Pharms";

class PharmsController {
  async store(request, response) {
    try {
      const {
        name,
        email,
        password,
        neighborhood,
        location,
        medicines,
      } = request.body;

      const pharm = await Pharms.findOne({ email });

      if (pharm)
        return response.status(401).json({
          message: "User exist",
          reasons: "The user already exist",
        });

      const newPharm = await Pharms.create({
        name,
        email,
        password: await encodePassword(password),
        neighborhood,
        location,
        medicines: [],
      });

      return response.status(200).json({
        id: newPharm._id,
        name,
        email,
        neighborhood,
        location,
        medicines: [],
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async update(request, response) {
    try {
      const {
        name,
        email,
        password,
        neighborhood,
        location,
        medicines,
      } = request.body;
      const { id } = request.user;

      const pharm = await Pharms.findOne({ _id: id });

      if (!pharm)
        return response.status(401).json({
          message: "User does not exist",
          resons: "The user is not registered",
        });

      pharm.name = name;
      pharm.email = email;
      pharm.password = await encodePassword(password);
      pharm.neighborhood = neighborhood;
      pharm.location = location;
      pharm.medicines = medicines;
      await pharm.save();

      return response.status(200).json({
        id: pharm.id,
        name,
        email,
        neighborhood,
        location,
        medicines,
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new PharmsController();
