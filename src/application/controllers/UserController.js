import { User, encodePassword } from "../models/User";

class UserController {
  async store(request, response) {
    try {
      const { name, email, password } = request.body;

      const user = await User.findOne({ email });

      if (user)
        return response.status(401).json({
          message: "User exist",
          reasons: "The user already exist",
        });

      const newUser = await User.create({
        name,
        email,
        password: await encodePassword(password),
      });

      return response.status(200).json({ id: newUser._id, name, email });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async update(request, response) {
    try {
      const { name, email, password } = request.body;
      const { id } = request.params;

      const user = await User.findOne({ _id: id });

      if (!user)
        return response.status(401).json({
          message: "User does not exist",
          resons: "The user is not registered",
        });

      user.name = name;
      user.email = email;
      user.password = await encodePassword(password);
      user.save();

      return response.status(200).json({
        id: user.id,
        name,
        email,
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();
