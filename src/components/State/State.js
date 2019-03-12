import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeState, onShowTowns } from '../../actions';



class State extends Component {
  remove(id) { this.props.removeState(id); }
  render() {
  	return (
  		<div className='grid-manage'>
			
					<div className="grid-manage-detail">
						<div className="grid-manage-text">
							<div className="grid-m-t-n">{this.props.name}</div>
							<div className="grid-m-t-a">{this.props.enName}</div>
							<div className="grid-m-t-a">تعداد شهرها : {this.props.towns.length}</div>
						</div>
						<div className="grid-manage-btn">
							<Link className='dogme i-round i-sabz round-small' to={{ pathname: `/manage/states/edit/${ this.props._id }` }}> ویرایش </Link>
							<span className='dogme i-round i-abi round-small' onClick={() => this.props.onShowTowns(this.props._id)}> نمایش شهرها </span>
							<Link className='dogme i-round i-abi round-small' to={`/manage/states/add/town/${ this.props._id }`}> افزودن شهر </Link>
							<span onClick={this.remove.bind(this, this.props._id)} className='dogme i-round i-ghermez round-small' >حذف </span>
						</div>
					</div>
  		</div>
  	)
  }
}

export default connect(null, { removeState, onShowTowns })(State);
