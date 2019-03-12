import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getOptions } from '../../actions'

import Option from './Option'
import AddOptionModal from './AddOptionModal'
import EditOptionModal from './EditOptionModal'
import ChangeOptionPicModal from './ChangeOptionPicModal'

class Options extends Component {
	componentWillMount( ) {
		this.props.getOptions();
	}
	render( ) {
		let { options } = this.props;
		console.log( 'options az render options Component', options );
		return (
			<div className='fasbaghal'>
				<div className='grid'>
					<h1>امکانات فروشگاه</h1>
					<div className='poshtzamine'>
						<div className='chapchin width-same-big'>
							<Link to='/manage/option/add' className='dogme i-round i-abi'>  افزودن امکانات فروشگاه </Link>
						</div>
            {options.optionLoading ? ( <DotLoader /> ) : (
  						<div className='grid-section'>
  							{options.options.map(( option, i ) => ( <Option key={i} {...option}/> ))}
  						</div>
            )}
					</div>
				</div>
				<br/>
				<Route path="/manage/option/add" exact component={AddOptionModal}/>
				<Route path="/manage/option/edit/:id" exact component={EditOptionModal}/>
				<Route path="/manage/option/changepic/:id" exact component={ChangeOptionPicModal}/>
			</div>
		);
	}
}

const mps = ({ options }) => ({ options });

export default connect(mps, { getOptions })( Options );
