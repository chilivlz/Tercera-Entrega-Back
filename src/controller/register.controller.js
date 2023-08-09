class RegisterController{
  async get (req,res) {
    return res.render("register", {});
  }

  async post(req,res){
    if (!req.user) {
        return res.json({ error: "something went wrong" });
  
      }
      req.session.user = {
        _id: req.user._id,
        email: req.user.email,
        age: req.user.age,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        rol: req.user.rol,
      };
  
      return res.redirect("/products");

  }
}

export const registerController = new RegisterController();