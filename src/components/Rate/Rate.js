import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { acceptRate, deniedRate, justDeniedRate, RU } from '../../actions';
import DotLoader from '../Utils/DotLoader'

class Rate extends Component {
	directPic() {
		if ( this.props.user && this.props.user.pic ) {
			const masir = `${ RU }/pic/orginal/${ this.props.user.pic }`;
			return <img src={masir} alt={this.props.name} alt={this.props.user.name}/>
		} else {
			return <img src={`../img/default/default-user.svg`} alt={this.props.user ? (this.props.user.name) : ('nothing')}/>;
		}
	}
  remove(id) {
    console.log('id az removee shahr', id);
    this.props.ingoreRate(id);
  }
  render() {
  	return (
			<div className='grid-manage'>
				<div className='grid-manage-pic'>
					{this.directPic()}
				</div>
				<div className="grid-manage-detail">
					<div className="grid-manage-text">
						{this.props.center && (<div className="grid-m-t-n">نظر برای مرکز :  {this.props.center.name}</div>)}
						{this.props.ware && (<div className="grid-m-t-n">نظر برای محصول : {this.props.ware.title}</div>)}
						<div className="grid-m-t-a">{this.props.text}</div>
					</div>

				{(this.props.acceptRateLoading === this.props._id) ? ( <DotLoader /> ) : (
					<div className="grid-manage-btn">
						{this.props.accepted ? (
							<span className='dogme i-round i-ghermez round-small' onClick={() => this.props.justDeniedRate({rateId : this.props._id})}> رد کردن </span>
						) : (
							<span className='dogme i-round i-abi round-small' onClick={() => this.props.acceptRate({rateId : this.props._id})}> تایید </span>
						)}
						<span className='dogme i-round i-ghermez round-small' onClick={() => this.props.deniedRate({rateId : this.props._id})}>حذف متن</span>
						<Link className='dogme i-round i-sabz round-small'  to={`/manage/rates/reply/${ this.props._id }`}>پاسخ دادن</Link>
					</div>
				)}
				</div>
			</div>
  	)
  }
}

export default connect(null, { acceptRate, deniedRate, justDeniedRate })(Rate);
