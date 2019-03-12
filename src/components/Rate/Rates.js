import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getNotAcceptedRates, cleanAllRates } from '../../actions';

import Rate from './Rate';
import SetReplyRate from './SetReplyRate'

class Rates extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			accepted: false
    };
    
    this.handleAccept = this.handleAccept.bind(this)

	}
	componentWillMount() {
		this.props.cleanAllRates()
		this.props.getNotAcceptedRates({ accepted: false })
	}

	handleAccept() { 
		this.props.getNotAcceptedRates({ accepted: !this.state.accepted })
		this.setState({ accepted : !this.state.accepted }) 
	}

	gentNextRates() {
		let query = { accepted: this.setState.accepted }
		if (this.props.rates.rates.length > 0) {
			query.id = this.props.rates.rates[this.props.rates.rates.length-1]._id;
		}
		this.props.getNotAcceptedRates(query);
	}
	render( ) {
		let { rates } = this.props;
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>نظرهای تأیید نشده</h1>
					<div className='poshtzamine'>

						<div className="small-checkbox">
							<label> تایید شده </label>
							<input type="checkbox" checked={this.state.accepted} onChange={this.handleAccept}/>
						</div>
						{rates.rateLoading ?( <DotLoader /> ) : (
							<div className='grid-section'>
								{rates.rates.map(( rate, i ) => ( <Rate key={rate._id} {...rate} acceptRateLoading={rates.acceptRateLoading}/> ))}
							</div>
						)}
					</div>
				</div>
				<br/>
				<Route path="/manage/rates/reply/:_id" exact component={SetReplyRate}/>
			</div>
		);
	}
}

const mps = ({ rates }) => ({ rates });

export default connect(mps, { getNotAcceptedRates, cleanAllRates })( Rates );
