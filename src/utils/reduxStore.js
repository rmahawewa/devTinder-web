import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";

const reduxStore = configureStore({
	reducer: {
		user: userReducer,
		feed: feedReducer,
		connection: connectionReducer,
	},
});

export default reduxStore;
