import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RU } from '../../actions/types'

const User = ( props ) => {
	const directPic = ( ) => {
		if ( props.pic ) {
			const masir = `${ RU }/pic/orginal/${ props.pic }`;
			return <img src={masir} alt={props.email}/>
		} else {
			return <img src={`../img/default/default-user.svg`} alt={props.email}/>;
		}

	}

  const handleBtn = ( ) => {
    if (props.sath === 'ranande') {
      return (
        <div>
  				<Link className='dogme i-abi i-alt i-round round-small' to={{ pathname: `/karbarha/virakarbar/${ props._id }` }}>
  					ویرایش
  				</Link>
  				<Link className='dogme i-abi i-alt i-round round-small' to={{ pathname: `/karbarha/viraaks/${ props._id }` }}>
  					تغییر عکس
  				</Link>
  				<Link className='dogme i-abi i-alt i-round round-small' to={{ pathname: `/manage/users/edit/password/${ props._id }` }}>
  					تغییر رمز
  				</Link>
  				<Link className='dogme i-ghermez i-alt i-round round-small' to={{ pathname: `/karbarha/hazf/${ props._id }` }}>
  					حذف کاربر
  				</Link>
          {props.fcmToken ? (
    				<Link className='dogme i-abi i-alt i-round round-small' to={{ pathname: `/karbarha/ersalnotification/${ props._id }` }}>
    					ارسال نوتیفیکیشن
    				</Link>
          ) : null}
        </div>
      )
    } else {
      return (
        <div>
  				<Link className='dogme i-abi i-alt i-round round-small' to={{ pathname: `/manage/users/edit/${ props._id }` }}>
  					ویرایش
  				</Link>
  				<Link className='dogme i-abi i-alt i-round round-small' to={{ pathname: `/manage/users/changepic/${ props._id }` }}>
  					تغییر عکس
  				</Link>
  				<Link className='dogme i-abi i-alt i-round round-small' to={{ pathname: `/manage/users/edit/password/${ props._id }` }}>
  					تغییر رمز
  				</Link>
  				<span className='dogme i-ghermez i-alt i-round round-small' onClick={() => props.remove(props._id)}>
  					حذف کاربر
  				</span>
          {props.fcmToken ? (
    				<Link className='dogme i-abi i-alt i-round round-small' to={{ pathname: `/karbarha/ersalnotification/${ props._id }` }}>
    					ارسال نوتیفیکیشن
    				</Link>
          ) : null}
        </div>
      )
    }
  }

  return (
		<div className='grid-manage'>
			<div className='grid-manage-pic'>
				{directPic()}
			</div>
			<div className="grid-manage-detail">
				<div className="grid-manage-text">
					<div className="grid-m-t-n"> {props.name ? props.name : null}  {props.familyName ? props.familyName : null} </div>
					<div className="grid-m-t-a">ایمیل : {props.email} </div>
					<div className="grid-m-t-a"> شماره : {props.phone} </div>
				</div>
				<div className="grid-manage-btn">
					{handleBtn()}
				</div>
			</div>
		</div>
	)
}

export default User;
