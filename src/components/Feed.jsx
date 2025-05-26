import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Card from "./Card";

function Feed() {
	const dispatch = useDispatch();
	const feedData = useSelector((store) => store.feed);

	const getFeed = async () => {
		if (feedData) return;
		try {
			const res = await axios.get(BASE_URL + "/feed", {
				withCredentials: true,
			});
			dispatch(addFeed(res.data));
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);

	if (!feedData) return;
	if (feedData.length === 0)
		return <h1 className="flex justify-center my-10">Feed is empty</h1>;

	return (
		feedData && (
			<div className="flex justify-center my-10">
				<Card usr={feedData[0]} />
			</div>
		)
	);
}

export default Feed;
