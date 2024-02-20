import React, { useState } from "react";

function Toast({ toast }) {

	const [toastOptions, setToastOptions] = useState({
    name: toast.name,
    visibility: toast.visibility,
  });
	
	const toastClose = () => {
		setToastOptions({
			...toastOptions,
			name: "",
			visibility: "hide",
		});  
		};
	return (
		<div className="container">
			<div className="p-3">
				<div id="liveToast" className={"toast " + toastOptions.visibility} role="alert" aria-live="assertive" aria-atomic="true">
					<div className="toast-header">
						<svg
							className="bd-placeholder-img flex-shrink-0 me-2 rounded"
							width="32"
							height="32"
							xmlns="http://www.w3.org/2000/svg"
							role="img"
							aria-label="Placeholder: 32x32"
							preserveAspectRatio="xMidYMid slice"
							focusable="false">
							<rect width="100%" height="100%" fill="#dc3545" />
							<text x="50%" y="50%" fill="#007bff" dy=".3em"></text>
						</svg>
						<strong className="me-auto">Incoming call</strong>
						<small>Just Now</small>
						<button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={toastClose}></button>
					</div>
					<div className="toast-body fw-bold">
						Name Queue: <h6 id="QueueToast">{toastOptions.name}</h6>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Toast;