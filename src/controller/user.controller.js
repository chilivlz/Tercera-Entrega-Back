class UserController{
    async getUser(req,res){
        try {
            const users = await UserModel.find({});
            res.send({ result: "success", payload: users });
          } catch (error) {
            res.send({ result: "cannot get users with mongose" });
          }
        };

        async postUser(req,res){
             try {
                let { first_name, last_name, email } = req.body;
                if (!first_name || !last_name || !email) {
                  res.send({
                    status: "error",
                    error: "cannot create user with missing fields",
                  });
                }
          
                let result = await userService.createUser({
                  first_name,
                  last_name,
                  email,
                });
          
                res.send({ status: "success", payload: result });
              } catch (error) {
                throw new Error(error);
              }
            }

            async putUser(req,res){ 

                const { uid } = req.params;
                let userToReplace = req.body;
                 if (
                 !userToReplace.first_name ||
                 !userToReplace.last_name ||
                 !userToReplace.email
            ) {
                res.send({
                 status: "error",
                  error: "cannot update user with missing fields",
            });
            }
                let result = await userService.updateUser(uid, userToReplace);
                 res.send({ status: "success", payload: result });
            }

            async deleteUser (req,res){
                let { uid } = req.params;
                let result = await UserModel.deleteOne({ _id: uid });
                res.send({ status: "success, payload: result" });
              };

            
            }

            export const usercontroler = new UserController();

        
        
        
            
        
      
