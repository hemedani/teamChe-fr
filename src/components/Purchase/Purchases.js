import React, { Component } from 'react'
import { connect } from 'react-redux'
import DotLoader from '../Utils/DotLoader'
import { getPurchases } from '../../actions'

import Purchase from './Purchase'
class Purchases extends Component {
	componentWillMount( ) {
		this.props.getPurchases();
	}
	render( ) {
		let { purchases, pinteb } = this.props;
		return (
			<div className='fasbaghal pinteb-wraper-80'>
				<div className='grid'>
					<h1>لیست خریدها </h1>
					<div className='poshtzamine'>
            {pinteb.loaders.getPurchaseLoading ? ( <DotLoader /> ) : (
  						<div className='grid-section'>
  							{purchases.purchases.map(( purchase, i ) => ( <Purchase key={i} {...purchase}/> ))}
  						</div>
            )}
					</div>
				</div>
				<br/>
			</div>
		);
	}
}

const mps = ({ purchases, pinteb }) => ({ purchases, pinteb });

export default connect(mps, { getPurchases })( Purchases );
