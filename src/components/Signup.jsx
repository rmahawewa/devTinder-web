import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailId, setEmailId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSignup = async () => {
		axios
			.post(
				BASE_URL + "/login",
				{
					emailId: emailId,
					password: password,
				},
				{ withCredentials: true }
			)
			.then((response) => {
				return navigate("/");
			})
			.catch((err) => {
				setError(err?.response?.data || "Something went wrong");
				console.log("Error fetchning data: " + err);
			});
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						alt="Your Company"
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
						className="mx-auto h-10 w-auto"
					/>
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
						Sign up
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
						<label
							htmlFor="email"
							className="block text-sm/6 font-medium text-gray-900"
						>
							Last name
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								value={lastName}
								required
								autoComplete="email"
								onChange={(e) => setLastName(e.target.value)}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm/6 font-medium text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								value={emailId}
								required
								autoComplete="email"
								onChange={(e) => setEmailId(e.target.value)}
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
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								autoComplete="current-password"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>

					<p className="text-red-500">{error}</p>
					<div>
						<button
							type="button"
							onClick={() => handleSignup()}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign up
						</button>
					</div>
					{/* </form> */}
				</div>
			</div>
		</>
	);
};

export default Signup;
