class ChatController{
    async get(req,res){
        return res.render("chat", {});
    }
}

export const chatController = new ChatController();