class LogoutController{
   async get(req,res){
    req.session.destroy((err) => {
        if (err) {
          return res.json({ status: "Logout error", body: err });
        }
        return res.redirect("login");
      });

   }
}

export const logoutController = new LogoutController();