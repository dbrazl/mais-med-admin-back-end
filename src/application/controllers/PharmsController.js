import { Pharms, encodePassword, checkPassword } from "../models/Pharms";

class PharmsController {
  async userExist(request, response) {
    try {
      const { email } = request.query;

      const user = await Pharms.findOne({ email });

      if (!user)
        return response
          .status(404)
          .json({ message: "Not found", reasons: ["User don't exist"] });

      return response.status(200).json({ message: "User exist!" });
    } catch (error) {
      await response.status(500).json({ message: error.message });
    }
  }

  async store(request, response) {
    try {
      const {
        name,
        email,
        password,
        address,
        neighborhood,
        location,
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
        address,
        neighborhood,
        location,
        medicines: [],
      });

      return response.status(200).json({
        id: newPharm._id,
        name,
        email,
        address,
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
        newPassword,
        address,
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
      pharm.address = address;
      pharm.neighborhood = neighborhood;
      pharm.location = location;

      if (password) {
        if (await checkPassword({ password, hash: pharm.password }))
          pharm.password = await encodePassword(newPassword);
        else
          return response.status(401).json({
            message: "Check password failure",
            reasons: "Password is wrong",
          });
      }

      if (medicines) pharm.medicines = medicines;

      await pharm.save();

      return response.status(200).json({
        id: pharm.id,
        name,
        email,
        address,
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
