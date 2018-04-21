import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import raptor from './raptor.png'

const Logo= () =>{

	return(
		<div className="m4 mt0 pa3 ">
			<Tilt className="Tilt br-100 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
			 	<div className="Tilt-inner pa3">
			 		<img alt="raptor" src={raptor}/>
			 	</div>
			</Tilt>
		</div>
	);

}

export default Logo;