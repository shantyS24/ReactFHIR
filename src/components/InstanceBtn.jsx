import React from "react";

function InstanceBtn({ queue }) {
	const goToIntance = () => {
		window.open(queue.buttonUrl, "_blank");
	};
	return (
		<button className={'btn ' + queue.buttonColor} onClick={goToIntance}>
			{queue.buttonLabel}
		</button>
	);
}

export default InstanceBtn;