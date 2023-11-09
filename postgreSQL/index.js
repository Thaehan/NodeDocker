import { connectToRabbitMQ, connectToPostgre } from "./src/configs/index.js";

connectToRabbitMQ();

connectToPostgre();
