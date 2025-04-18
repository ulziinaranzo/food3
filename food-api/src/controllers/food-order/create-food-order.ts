import { foodOrderModel } from "../../models/food-order-model"

export const createFoodOrderController: RequestHandler = async (req, res) => {
    try {
        const { id, orderedItems, totalPrice} = req.body
        
        if (!id || orderedItems.length === 0 || !totalPrice ) {
            res.status(400).json({message: "Missing required fields"})
        } 

        const newOrder = foodOrderModel.findById(id, orderedItems, totalPrice { new: true})
        return res.status(201).json({message: "Added"})
        } catch(error) {
            res.status(500).json({message: "Error creating food order"})
        }
    }