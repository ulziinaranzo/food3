import { connect } from "mongoose"

export const connectToDatabase = async () => {
    await connect("mongodb+srv://ulziinaranzo:Gankhil12@cluster0.xcbmw7j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected to database")
}