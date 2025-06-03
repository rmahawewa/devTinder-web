import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
	return io(BASE_URL);
};

// import { io } from "socket.io-client";

// const socket = io({
// 	auth: {
// 		token: "abcd",
// 	},
// });
