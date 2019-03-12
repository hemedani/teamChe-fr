import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import { getWareTypes } from '../../actions';

import WareType from './WareType';

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
						<Link to='/manage/WareType/add' className='dogme i-round i-abi temamsafe'>
							 افزودن نوع محصولات
						</Link>
            {wareTypes.typeLoading ? (
              <div className='vorod-bargozari'>
                <Loader type="ball-scale-multiple" />
              </div>
            ) : (
  						<div className='gimg'>
  							{wareTypes.wareTypes.map(( type, i ) => ( <WareType key={i} {...type}/> ))}
  						</div>
            )}
					</div>
				</div>
				<br/>
			</div>
		);
	}
}

const mps = ({ wareTypes }) => ({ wareTypes });

export default connect(mps, { getWareTypes })( WareTypes );
