import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

function Connections() {
	const dispatch = useDispatch();
	const connections = useSelector((store) => store.connection);
	const fetchConnections = async () => {
		try {
			const res = await axios.get(BASE_URL + "/user/connections", {
				withCredentials: true,
			});
			console.log(res.data.data);
			dispatch(addConnections(res.data.data));
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchConnections();
	}, []);

	if (!connections) return;

	if (connections.length === 0) return <h1>No connections found</h1>;

	return (
		<div className="text-center my-10">
			<h1 className="text-bold text-3xl">Connections</h1>

			{connections.map((connection) => {
				const { _id, firstName, lastName, photoUrl, age, gender, about } =
					connection;

				return (
					<div
						key={_id}
						className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
					>
						<div className="flex">
							<div>
								<img
									alt="photo"
									className="w-20 h-20 rounded-full"
									src={photoUrl}
								/>
							</div>
							<div className="text-left mx-6">
								<h2 className="font-bold text-xl">
									{firstName + " " + lastName}
								</h2>
								{age && gender && <p>{age + ", " + gender}</p>}
								<p>{about}</p>
							</div>
						</div>
						<Link to={"/chat/" + _id}>
							<button className="btn btn-primary">Chat</button>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default Connections;
