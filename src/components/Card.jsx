import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function Card({ usr }) {
	const dispatch = useDispatch();
	const { _id, firstName, lastName, photoUrl, age, gender, about } = usr;

	const giveFeedback = async (status, id) => {
		try {
			const res = await axios.post(
				BASE_URL + "/request/send/" + status + "/" + id,
				{},
				{ withCredentials: true }
			);
			dispatch(removeUserFromFeed(id));
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<div className="card bg-base-300 w-96 shadow-lg">
			<figure>
				<img src={photoUrl} alt="feeder image" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{firstName + " " + lastName}</h2>
				{age && gender && <p>{age + ", " + gender}</p>}
				<p>{about}</p>
				<div className="card-actions justify-center my-4">
					<button
						className="btn btn-primary"
						onClick={() => giveFeedback("ignored", _id)}
					>
						Ignore
					</button>
					<button
						className="btn btn-secondary"
						onClick={() => giveFeedback("interested", _id)}
					>
						Interested
					</button>
				</div>
			</div>
		</div>
	);
}

export default Card;
