import React from "react";
import { useNavigate } from "react-router-dom";

const ReloadLink = ({ to, children }) => {
	const navigate = useNavigate();
	const handleLinkClick = (event) => {
		event.preventDefault();
		navigate(to);
		window.location.reload(true);
	};

	return (
		<a href={to} onClick={handleLinkClick} target="_self" className="nav-link active" aria-current="page">
			{children}
		</a>
	);
};
const Navbar = () => {
	return (
		<div id="navbar" className="row">
			<nav className="navbar navbar-light">
				<div className="container-fluid px-0">
					<div className="container text-center">
						<a className="navbar-brand text-center" href="#">
							<img className="align-image d-inline-block align-top" src="/CTGlogo.png" alt="Logo" height="35" />
							CCP Extended +
						</a>
					</div>
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="container-fluid">
							<div className="collapse navbar-collapse" id="navbarNav">
								<ul className="navbar-nav">
									<li className="nav-item">
										<ReloadLink exact to="/" activeClassName="active">
											V1
										</ReloadLink>
									</li>
									<li className="nav-item">
										<ReloadLink exact to="/v2" activeClassName="active">
											V2
										</ReloadLink>
									</li>
									<li className="nav-item">
										<ReloadLink exact to="/v3" activeClassName="active">
											V3
										</ReloadLink>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
