import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getPromotions } from '../../actions';

import AddPromotionModal from './AddPromotionModal';
import ChangePromotionPicModal from './ChangePromotionPicModal';
import EditPromotionModal from './EditPromotionModal';

import Promotion from './Promotion';

class Promotions extends Component {
	componentWillMount() {
		this.props.getPromotions();
	}
	render( ) {
		let { promotions } = this.props;
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>پروموشن ها</h1>
					<div className='poshtzamine'>
						<div className='chapchin width-same-big'>
							<Link to={`${this.props.match.url}/add`} className='dogme i-round i-abi'> افزودن پروموشن جدید </Link>
						</div>
            {promotions.promotionLoading ? ( <DotLoader /> ) : (
  						<div className='grid-section'>
  							{promotions.promotions.map(( type, i ) => ( <Promotion key={i} {...type}/> ))}
  						</div>
            )}
					</div>
				</div>
				<br/>
				<Route exact path='/manage/promotions/add' component={AddPromotionModal}/>
				<Route exact path='/manage/promotions/changepic/:id' component={ChangePromotionPicModal}/>
				<Route exact path='/manage/promotions/edit/:id' component={EditPromotionModal}/>
			</div>
		);
	}
}

const mps = ({ promotions }) => ({ promotions });

export default connect(mps, { getPromotions })( Promotions );
