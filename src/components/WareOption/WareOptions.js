import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getWareOptions } from '../../actions';

import AddWareOptionModal from './AddWareOptionModal';
import ChangeWareOptionPicModal from './ChangeWareOptionPicModal';
import EditWareOptionModal from './EditWareOptionModal';

import WareOption from './WareOption';

class WareOptions extends Component {
	componentWillMount() {
		this.props.getWareOptions();
	}
	render( ) {
		let { wareOptions } = this.props;
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>امکانات محصولات</h1>
					<div className='poshtzamine'>
						<div className='chapchin width-same-big'>
							<Link to={`${this.props.match.url}/add`} className='dogme i-round i-abi'> افزودن امکانات محصول </Link>
						</div>
            {wareOptions.wareOptionLoading ? ( <DotLoader /> ) : (
  						<div className='grid-section'>
  							{wareOptions.wareOptions.map(( type, i ) => ( <WareOption key={i} {...type}/> ))}
  						</div>
            )}
					</div>
				</div>
				<br/>
				<Route exact path='/manage/wareOptions/add' component={AddWareOptionModal}/>
				<Route exact path='/manage/wareOptions/changepic/:id' component={ChangeWareOptionPicModal}/>
				<Route exact path='/manage/wareOptions/edit/:id' component={EditWareOptionModal}/>
			</div>
		);
	}
}

const mps = ({ wareOptions }) => ({ wareOptions });

export default connect(mps, { getWareOptions })( WareOptions );
