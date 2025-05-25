import React, { useState, useEffect, useRef } from "react";

function DropdownComponent({ updateGender }) {
	const [gender, setGender] = useState("Select Gender");
	// We'll use 'isOpen' to control the 'open' attribute of the <details> tag
	const [isOpen, setIsOpen] = useState(false);
	const detailsRef = useRef(null); // Ref to the <details> element

	// Effect to synchronize the native <details> 'open' attribute with our 'isOpen' state
	useEffect(() => {
		console.log(detailsRef.current.open);
		if (detailsRef.current) {
			detailsRef.current.open = isOpen;
		}
	}, [isOpen]);

	const handleGenderSelect = (selectedGender) => {
		setGender(selectedGender);
		setIsOpen(false); // Close dropdown after selection
		// console.log("Gender selected and dropdown closing.");
		updateGender(selectedGender);
	};

	// Event listener for the native 'toggle' event of <details>
	// This allows us to update our 'isOpen' state when the user natively opens/closes the dropdown.
	const handleToggle = () => {
		console.log("detailsRef current: " + detailsRef.current.open);
		if (detailsRef.current) {
			setIsOpen(detailsRef.current.open);
			console.log("Details native toggle:", detailsRef.current.open);
		}
	};

	return (
		<div>
			<details
				ref={detailsRef} // Attach the ref
				className="dropdown"
				// Listen to the native 'toggle' event
				onToggle={handleToggle}
				// We don't need an onClick on the <details> itself to open/close it now.
				// The native <details> behavior and our onToggle handler will manage `isOpen`.
				// If you *still* want an onClick on the entire details area for some other reason,
				// add it, but it shouldn't conflict with opening/closing.
			>
				<summary className="btn m-1">{gender}</summary>
				{/* Conditionally render the ul based on `isOpen` state */}
				{isOpen && (
					<ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
						{/* We add onClick to each <li> or <a>, not the wrapping <div> */}
						<li>
							<a onClick={() => handleGenderSelect("female")}>female</a>
						</li>
						<li>
							<a onClick={() => handleGenderSelect("male")}>male</a>
						</li>
						<li>
							<a onClick={() => handleGenderSelect("other")}>other</a>
						</li>
					</ul>
				)}
			</details>
		</div>
	);
}

export default DropdownComponent;
