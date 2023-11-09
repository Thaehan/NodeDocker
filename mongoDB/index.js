import { connectToRabbitMQ, connectToMongoDB } from "./src/configs/index.js";

connectToRabbitMQ();

connectToMongoDB();
