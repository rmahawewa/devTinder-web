import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
			dispatch(removeUser());
			return navigate("/login");
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<div className="navbar bg-primary-content shadow-sm">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost text-xl">
					DevTinder
				</Link>
			</div>
			{user && (
				<div className="flex gap-2">
					<div className="form-control">Welcome, {user.firstName}</div>
					<div className="dropdown dropdown-end mx-5 flex">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img alt="user photo" src={user.photoUrl} />
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-primary-content rounded-box z-1 mt-3 w-52 p-2 shadow"
						>
							<li>
								<Link to="/profile" className="justify-between">
									Profile
									<span className="badge">New</span>
								</Link>
							</li>
							<li>
								<Link to="/connections">Connections</Link>
							</li>
							<li>
								<Link to="/requests">Requests</Link>
							</li>
							<li>
								<a onClick={handleLogout}>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default NavBar;
