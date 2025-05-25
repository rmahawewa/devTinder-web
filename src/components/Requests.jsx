import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

function Requests() {
	const dispatch = useDispatch();
	const requests = useSelector((store) => store.request);

	const reviewRequest = async (id, response) => {
		try {
			const res = await axios.post(
				BASE_URL + "/request/review/" + response + "/" + id,
				{},
				{ withCredentials: true }
			);
			dispatch(removeRequests(id));
		} catch (err) {
			console.error(err.message);
		}
	};

	const fetchRequests = async () => {
		try {
			const res = await axios.get(BASE_URL + "/user/requests/received", {
				withCredentials: true,
			});
			console.log(res.data.data);
			dispatch(addRequests(res.data.data));
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	if (!requests) return;

	if (requests.length === 0)
		return <h1 className="flex justify-center my-10">No requests found</h1>;

	return (
		<div className="text-center my-10">
			<h1 className="text-bold text-3xl">requests</h1>

			{requests.map((request) => {
				const { _id } = request;
				const { firstName, lastName, photoUrl, age, gender, about } =
					request.fromUserId;

				return (
					<div
						key={_id}
						className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto flex justify-between items-center"
					>
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
						<div>
							<button
								className="btn btn-primary mx-2"
								onClick={() => reviewRequest(_id, "rejected")}
							>
								Reject
							</button>
							<button
								className="btn btn-secondary mx-2"
								onClick={() => reviewRequest(_id, "accepted")}
							>
								Accept
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Requests;
