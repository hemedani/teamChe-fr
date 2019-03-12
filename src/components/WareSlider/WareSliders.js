import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getWareSliders } from '../../actions';

import AddWareSliderModal from './AddWareSliderModal';
import ChangeWareSliderPicModal from './ChangeWareSliderPicModal';
import EditWareSliderModal from './EditWareSliderModal';

import WareSlider from './WareSlider';

class WareSliders extends Component {
	componentWillMount() {
		this.props.getWareSliders();
	}
	render( ) {
		let { wareSliders } = this.props;
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>اسلایدها</h1>
					<div className='poshtzamine'>
						<div className='chapchin width-same-big'>
							<Link to={`${this.props.match.url}/add`} className='dogme i-round i-abi'> افزودن اسلاید جدید </Link>
						</div>
            {wareSliders.wareSliderLoading ? ( <DotLoader /> ) : (
  						<div className='grid-section'>
  							{wareSliders.wareSliders.map(( type, i ) => ( <WareSlider key={i} {...type}/> ))}
  						</div>
            )}
					</div>
				</div>
				<br/>
				<Route exact path='/manage/wareSliders/add' component={AddWareSliderModal}/>
				<Route exact path='/manage/wareSliders/changepic/:id' component={ChangeWareSliderPicModal}/>
				<Route exact path='/manage/wareSliders/edit/:id' component={EditWareSliderModal}/>
			</div>
		);
	}
}

const mps = ({ wareSliders }) => ({ wareSliders });

export default connect(mps, { getWareSliders })( WareSliders );
