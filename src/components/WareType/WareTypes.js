import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getWareTypes } from '../../actions'

import WareType from './WareType'
import AddWareTypeModal from './AddWareTypeModal'
import ChangeWareTypePicModal from './ChangeWareTypePicModal'
import EditWareTypeModal from './EditWareTypeModal'

class WareTypes extends Component {
	componentWillMount( ) {
		this.props.getWareTypes();
	}
	render( ) {
		let { wareTypes } = this.props;
		console.log( 'wareTypes az render wareTypes Component', wareTypes );
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>انواع محصول</h1>
					<div className='poshtzamine'>
						<div className='chapchin width-same-big'>
							<Link to='/manage/WareType/add' className='dogme i-round i-abi'> افزودن نوع محصولات </Link>
						</div>
            {wareTypes.typeLoading ? ( <DotLoader /> ) : (
  						<div className='grid-section'>
  							{wareTypes.wareTypes.map(( type, i ) => ( <WareType key={i} {...type}/> ))}
  						</div>
            )}
					</div>
				</div>
				<br/>
				<Route exact path='/manage/wareType/add' component={AddWareTypeModal}/>
				<Route path="/manage/wareType/edit/:id" exact component={EditWareTypeModal}/>
				<Route exact path='/manage/wareType/changepic/:id' component={ChangeWareTypePicModal}/>
			</div>
		);
	}
}

const mps = ({ wareTypes }) => ({ wareTypes });

export default connect(mps, { getWareTypes })( WareTypes );
