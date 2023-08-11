
class SessionController{
    async getSe(req,res){ return res.send(JSON.stringify(req.session));
    
    }
    async getGit (req,res){
        req.session.user = {
            _id: req.user._id,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            rol: req.user.rol,
          };
          // Successful authentication, redirect home.
          res.redirect("/products");
    }
}

export const sessionController = new SessionController();