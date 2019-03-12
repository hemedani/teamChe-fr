import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getCities } from '../../actions';

import City from './City';
import AddCityModal from './AddCityModal';

class Cities extends Component {
	componentWillMount( ) {
		this.props.getCities();
	}
	render( ) {
		let { cities } = this.props;
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>شهر ها</h1>
					<div className='poshtzamine'>
						<div className='chapchin width-same-big'>
							<Link to={`${this.props.match.url}/add`} className='dogme i-round i-abi'> افزودن شهر </Link>
						</div>
            {cities.cityLoading ? (<DotLoader />) : (
  						<div className='grid-section'>
  							{cities.cities.map(( city, i ) => ( <City key={i} {...city}/> ))}
  						</div>
            )}
					</div>
				</div>
				<br/>
				<Route path='/manage/city/add' exact component={AddCityModal}/>
			</div>
		);
	}
}

const mps = ({ cities }) => ({ cities });

export default connect(mps, { getCities })( Cities );
