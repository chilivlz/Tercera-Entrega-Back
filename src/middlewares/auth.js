export function checkUser(req, res, next) {
    if (req.session.email) {
      return next();
    }
    return res.redirect("/login");
  }
  
  export function checkAdmin(req, res, next) {
    if (req.session.email && req.session.admin == true) {
      return next();
    }
    return res.status(401).send("Unauthorized");
  }

  export function checkOwner(req, res, next) {
    console.log("SESION", req.session);
    if (req.session.user && req.session.user.cart === req.params.cid) {
      return next();
    }
    return res.status(401).send("Not your cart");
  }

    /*if (req.session?.user?.role == "user") {
      return next();
    } else {
      console.log("Debes ser usuario para realizar esta acción.");
      const isUser = "Debes ser usuario para realizar esta acción.";
      return res.status(201).render({ isUser });
    }
  }*/
  