import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getDeliveries, removeDelivery } from '../../actions'

import Delivery from './Delivery'
import AddDeliveryModal from './AddDeliveryModal'
import EditDeliveryModal from './EditDeliveryModal'
import ChangeDeliveryPicModal from './ChangeDeliveryPicModal'

class Deliveries extends Component {
	componentWillMount( ) {
		this.props.getDeliveries();
	}
	render( ) {
		let { deliveries, removeDelivery } = this.props;
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>انواع پست</h1>
					<div className='poshtzamine'>
						<div className='chapchin width-same-big'>
							<Link to='/manage/delivery/add' className='dogme i-round i-abi'>  افزودن نوع پست </Link>
						</div>
            {deliveries.deliveryLoading ? ( <DotLoader /> ) : (
  						<div className='grid-section'>
								
  							{deliveries.deliveries.map(delivery => ( <Delivery key={delivery._id} {...delivery} removeDelivery={removeDelivery}/> ))}
  						</div>
            )}
					</div>
				</div>
				<br/>

				<Route exact path='/manage/delivery/add' component={AddDeliveryModal}/>
				<Route exact path='/manage/delivery/edit/:id' component={EditDeliveryModal}/>
				<Route exact path='/manage/delivery/changepic/:id' component={ChangeDeliveryPicModal}/>

			</div>
		);
	}
}

const mps = ({ deliveries }) => ({ deliveries });

export default connect(mps, { getDeliveries, removeDelivery })( Deliveries );
