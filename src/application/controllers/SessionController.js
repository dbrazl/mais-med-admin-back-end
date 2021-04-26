import { Pharms, checkPassword } from "../models/Pharms";
import jwt from "jsonwebtoken";
import authConfig from "../../infraesctruture/config/authorization";

class SessionController {
  async store(request, response) {
    try {
      const { email, password } = request.body;

      const pharm = await Pharms.findOne({ email });

      if (!pharm)
        return response.status(404).json({
          message: "Not found",
          reasons: ["User does not exist"],
        });

      const samePassword = await checkPassword({
        password,
        hash: pharm.password,
      });

      if (!samePassword)
        return response.status(401).json({
          message: "No authorizated",
          reasons: ["Worng password"],
        });

      const token = await jwt.sign({ id: pharm._id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return response.status(200).json({
        email,
        token,
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new SessionController();
