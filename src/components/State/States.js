import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getStates, getDeliveries, offShowTowns } from '../../actions'

import State from './State'
import AddStateModal from './AddStateModal'
import EditStateModal from './EditStateModal'
import AddTownToState from './AddTownToState'
import ShowStateTown from './ShowStateTown'


class States extends Component {
	componentDidMount( ) {
		this.props.getStates();
		this.props.getDeliveries();
	}
	render( ) {
		let { states } = this.props;
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>استان ها</h1>
					<div className='poshtzamine'>
						<div className='chapchin width-same-big'>
							<Link to='/manage/states/add' className='dogme i-round i-abi'>  استان جدید </Link>
						</div>
            {states.stateLoading ? ( <DotLoader /> ) : (
  						<div className='grid-section'> {states.states.map(( state, i ) => ( <State key={i} {...state} showTowns={this.props.states.showTowns}/> ))} </div>
            )}
					</div>
				</div>
				<br/>
				<Route path="/manage/states/add" exact component={(history) => <AddStateModal deliveries={this.props.deliveries.deliveries} {...history} />} />
				<Route path="/manage/states/edit/:id" exact component={(history) => <EditStateModal deliveries={this.props.deliveries.deliveries} {...history} />}/>
				<Route path="/manage/states/add/town/:id" exact component={AddTownToState}/>

				{this.props.states.showTowns && <ShowStateTown towns={this.props.states.selectedTowns} offShowTowns={this.props.offShowTowns}/>}
			</div>
		);
	}
}

const mps = ({ states, deliveries }) => ({ states, deliveries });

export default connect(mps, { getStates, getDeliveries, offShowTowns })( States );
