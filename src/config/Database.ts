import "dotenv/config"
import {connect} from "mongoose";

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_SRV);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;