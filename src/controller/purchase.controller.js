import { cartService } from "../services/routers.js";

export const purchaseController = async (req, res) => {
  try {
    const result = await cartService.purchase(req.params.cid, req.session.user);

    return res.status(201).json({
      status: "success",
      msg: "Purchase completed",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
};