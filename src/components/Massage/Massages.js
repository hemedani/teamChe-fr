import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getMassages } from '../../actions';

import Massage from './Massage';

class Massages extends Component {
	componentWillMount() {
		this.props.getMassages();
	}
	gentNextMassages() {
		let query = {}
		if (this.props.massages.massages.length > 0) {
			query.id = this.props.massages.massages[this.props.massages.massages.length-1]._id;
		}
		this.props.getMassages(query);
	}
	render( ) {
		let { massages } = this.props;
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>پیام های خوانده نشده</h1>
					<div className='poshtzamine'>
						<div className='grid-section'>
							{massages.massages.map(( massage, i ) => ( <Massage key={massage._id} {...massage} readMassageLoading={massages.readMassageLoading}/> ))}
						</div>
						{massages.massageLoading && <DotLoader />}
					</div>
				</div>
				<br/>
			</div>
		);
	}
}

const mps = ({ massages }) => ({ massages });

export default connect(mps, { getMassages })( Massages );
