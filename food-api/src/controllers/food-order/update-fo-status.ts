import { RequestHandler } from "express"
import { foodOrderModel } from "../../models/food-order-model"

export const updateFoodOrderStatusController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status || !["pending", "delivered", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Төлөв чинь байхгүй байна" })
    }

    const updatedOrder = await foodOrderModel.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({ message: "Захиалга олдсонгүй ээ" })
    }

    return res.status(200).json({
      message: "Захиалгын төлөв амжилттай өөрчлөгдлөө",
      order: updatedOrder,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Захиалгын төлөв өөрчлөгдөхөд алдаа гарлаа" })
  }
}
