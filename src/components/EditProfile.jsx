import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
	const [gender, setGender] = useState(user?.gender || "");
	const [age, setAge] = useState(user?.age || "");
	const [about, setAbout] = useState(user.about);
	const [error, setError] = useState("");
	const [showToast, setShowToast] = useState(false);
	const [showDropDownContent, setShowDropDownContent] = useState(false);
	const dispatch = useDispatch();

	const saveProfile = async () => {
		setError("");
		try {
			const res = await axios.patch(
				BASE_URL + "/profile/edit",
				{ firstName, lastName, photoUrl, gender, age, about },
				{ withCredentials: true }
			);
			// console.log(res.data.data);
			dispatch(addUser(res?.data?.data));
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		} catch (err) {
			setError(err.response.data);
		}
	};

	return (
		<>
			<div className="flex justify-center my-10">
				<div className="mt-10 sm:mx-10 sm:w-full sm:max-w-sm">
					<h3 className="text-gray-900">Edit Profile</h3>
					{/* <form action="#" method="POST" className="space-y-6"> */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm/6 font-medium text-gray-900"
						>
							First name
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								value={firstName}
								required
								autoComplete="email"
								onChange={(e) => setFirstName(e.target.value)}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Last name
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
								autoComplete="current-password"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Photo URL
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="text"
								value={photoUrl}
								onChange={(e) => setPhotoUrl(e.target.value)}
								required
								autoComplete="current-password"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Gender
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="text"
								value={gender}
								onChange={(e) => setGender(e.target.value)}
								required
								autoComplete="current-password"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
						<div>
							<details
								className="dropdown"
								onClick={(e) => {
									!showDropDownContent && setShowDropDownContent(true);
									console.log(showDropDownContent);
								}}
							>
								<summary className="btn m-1">{gender}</summary>
								{showDropDownContent && (
									<ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
										<div
											onClick={(e) => {
												setGender(e.target.innerText);
												// console.log(showDropDownContent);
												setShowDropDownContent(false);
												// console.log(showDropDownContent);
												e.stopPropagation();
											}}
										>
											<li>
												<a>female</a>
											</li>
											<li>
												<a>male</a>
											</li>
											<li>
												<a>other</a>
											</li>
										</div>
									</ul>
								)}
							</details>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Age
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="text"
								value={age}
								onChange={(e) => setAge(e.target.value)}
								required
								autoComplete="current-password"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-900"
							>
								About
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="text"
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								required
								autoComplete="current-password"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>
					<p className="text-red-500">{error}</p>
					<div className="my-5">
						<button
							type="button"
							onClick={saveProfile}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Save Profile
						</button>
					</div>
					{/* </form> */}
				</div>
				<Card usr={{ firstName, lastName, photoUrl, gender, age, about }} />
			</div>

			{showToast && (
				<div className="toast toast-top toast-center">
					<div className="alert alert-success">
						<span>Profile saved successfully.</span>
					</div>
				</div>
			)}
		</>
	);
}

export default EditProfile;
