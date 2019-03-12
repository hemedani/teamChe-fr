import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { readMassage, replyMassage, RU } from '../../actions';
import DotLoader from '../Utils/DotLoader'

class Massage extends Component {
  render() {
  	return (
			<div className='grid-manage'>

				<div className="grid-manage-detail detail-full-width">
					<div className="grid-manage-text">
						{this.props.user && (<div className="grid-m-t-n"> {this.props.user.name} - {this.props.user.phone}</div>)}
						{this.props.user.email && (<div className="grid-m-t-n"> ایمیل - {this.props.user.email}</div>)}
						<div className="grid-m-t-a">{this.props.text}</div>
					</div>

				{(this.props.readMassageLoading === this.props._id) ? ( <DotLoader /> ) : (
					<div className="chapchin width-same detail-full-width">
						<span className='dogme i-round i-abi round-small' onClick={() => this.props.readMassage({_id : this.props._id})}> خوانده شد </span>
						<span className='dogme i-round i-sabz round-small' onClick={() => this.props.replyMassage({rateId : this.props._id})}>پاسخ</span>
					</div>
				)}
				</div>
			</div>
  	)
  }
}

export default connect(null, { readMassage, replyMassage })(Massage);
