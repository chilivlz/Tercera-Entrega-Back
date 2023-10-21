class ViewrouterController{
    async get (req,res){
        res.render("login");
        const allProducts = await productManagerMongo.getProducts(
            req.query.limit,
            req.query.page,
            req.query.sort,
            req.query.query
          );
        
          const products = allProducts.docs.map((product) => ({
            name: product.title,
            description: product.description,
            price: product.price,
          }));
        
          return res.render("home", {
            style: "../public/css/styles.css",
            products: products,
          });
        };

        async getUsers(req, res, next) {
          try {
            const allUsers = await userService.getAllUsers();
      
            res.status(200).render("users", {
              u: allUsers.map((user) => ({
                firstName: user.firstName,
                lastName: user.lastName,
                rol: user.rol,
                id: user._id,
              })),
            });
          } catch (error) {
            next(error);
          }
        }
    }

    

    export  const viewrouterController = new ViewrouterController();