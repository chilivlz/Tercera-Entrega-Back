/*class LogInController {
  async logPost(req, res) {
    if (!req.user) {
      return res.json({ error: "invalid credentials" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rol: req.user.rol,
    };
    return res.redirect("/products");
  }
}

export const loginController = new LogInController();*/
