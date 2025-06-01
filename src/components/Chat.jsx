import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

function Chat() {
	const { targetUserId } = useParams();

	const [targetUserName, setTargetUserName] = useState("");
	const user = useSelector((store) => store.user);
	const [newMessage, setNewMessage] = useState("");
	const userId = user?._id;
	const [messages, setMessages] = useState([{ text: "Hello World" }]);
	const getTargetUserName = async () => {
		const targetUserInfo = await axios.get(
			BASE_URL + "/chatUser/" + targetUserId,
			{
				withCredentials: true,
			}
		);
		const targetUserName =
			targetUserInfo.data.firstName + " " + targetUserInfo.data.lastName;
		setTargetUserName(targetUserName);
	};
	useEffect(() => {
		getTargetUserName();
	}, [targetUserId]);

	useEffect(() => {
		if (!userId) return;
		const socket = createSocketConnection();
		// As soon as the page loaded, the socket connection is made and joinChat event is emitted
		console.log(user);
		socket.emit("joinChat", {
			firstName: user.firstName,
			userId,
			targetUserId,
		});

		socket.on("messageReceived", {});

		return () => {
			socket.disconnect();
		};
	}, [userId, targetUserId]);

	const sendMessage = () => {
		const socket = createSocketConnection();
		socket.emit("sendMessage", {
			firstName: user.firstName,
			userId,
			targetUserId,
			text: newMessage,
		});
	};

	return (
		<div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded">
			<div className="p-5 border-b border-gray-600 rounded">
				<h1>Chat</h1>
				<h2>{targetUserName}</h2>
			</div>
			<div className="flex-1 overflow-scroll p-5 rounded">
				{/* display messages */}
				{messages.map((messages, index) => {
					return (
						<div key={index} className="chat chat-start">
							<div className="chat-bubble chat-bubble-secondary">
								{messages.text}
							</div>
						</div>
					);
				})}
			</div>
			<div className="p-5 border-t border-gray-600 flex items-center gap-2 rounded">
				<input
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className="flex-1 border border-gray-500 text-black rounded p-2"
				></input>
				<button onClick={sendMessage} className="btn btn-primary">
					Send
				</button>
			</div>
		</div>
	);
}

export default Chat;
