import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames'
import { removeUserAddress, addAddressToCart } from '../../actions';

import MyMap from '../Utils/MapBox'

class UserAddress extends Component {
  remove(id) { this.props.removeUserAddress(id); }
  addAddress(_id, address) { this.props.addAddressToCart({ _id, address}); }

  render() {
    const { _id, location, name, state, town, district, text, code, phone, mobilePhone } = this.props.address;
  	return (
  		<div className={cx('grid-manage', {'selected': this.props.carts.address._id === _id})}>
          
          {location && location.coordinates.length > 0 && (
            <MyMap draggable={false} center={location.coordinates} zoom={[13]} wrapperClass={'grid-manage-pic'} />
          )}

					<div className="grid-manage-detail">
						<div className="grid-manage-text">
							<span className="lead">نام </span>
							<span className="content">{name}</span>
							
              <span className="lead"> استان </span>
							<span className="content">{state.name}</span>
							
              {town && (<div>
                <span className="lead">شهر</span>
							  <span className="content">{town.name}</span>
              </div>)}
						
              <span className="lead">محله</span>
							<span className="content">{district}</span>
							
              <span className="lead">آدرس</span>
							<span className="content">{text}</span>
							
              <span className="lead">کد پستی</span>
							<span className="content">{code}</span>
							
              <span className="lead">تلفن ثابت</span>
							<span className="content">{phone}</span>
							
              <span className="lead">شماره موبایل</span>
							<span className="content">{mobilePhone}</span>
						</div>

					</div>

          <div className='chapchin'>
            {this.props.carts.address._id === _id ? (

            <span className='dogme i-round round-small' disabled>آدرس انتخاب شده</span>
            ) : (
              <span className='dogme i-round i-sabz round-small' onClick={this.addAddress.bind(this, this.props.carts._id, this.props.address)}>انتخاب آدرس</span>
            )}
            <span className='dogme i-round i-abi round-small'>ویرایش</span>
            <span onClick={this.remove.bind(this, _id)} className='dogme i-round i-ghermez round-small' >حذف </span>
          </div>
          
  		</div>
  	)
  }
}

const msp = ({ carts }) => ({ carts })

export default connect(msp, { removeUserAddress, addAddressToCart })(UserAddress);
