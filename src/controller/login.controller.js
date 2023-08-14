import { userDto } from "../DAO/DTO/user.dto.js";

class LogInController {

  async get (req,res){
    if (req.session.user){ 
    return res.redirect("/products");
  }
  return res.render("login", {});

};
  async getFail(req, res) {
    if (!req.user) {
  
      return res.json({ error: "invalid credentials" });
    }
    
     }
    async post(req,res) { 
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rol: req.user.rol,
    };
    return res.redirect("/products");
  }

  async getCurrentUser(req, res) {
    if (!req.session.user) {
      return res.json({ error: "invalid credentials" });
    }
    const user = userDto(req.session.user);
    return res.json(user);
  }

}

export const loginController = new LogInController();


