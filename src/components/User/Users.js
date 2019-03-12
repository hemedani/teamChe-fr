import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link, Route } from 'react-router-dom'
import DotLoader from '../Utils/DotLoader'
import { getUsers, getUsersWithQuery, getUserWithLevel, removeUser, GetUsersCount } from '../../actions'

import User from './User'
import EditUserModal from './EditUserModal'
import ChangeUserPassModal from './ChangeUserPassModal'
import AddUserModal from './AddUserModal'
import ChangeUserPicModal from './ChangeUserPicModal'

class Users extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			email: '',
			familyName: '',
			phone: '',
		};
	}
	componentWillMount() { this.bigiHame() }

  bigiHame() {
    const { users } = this.props
    let id = users.length >= 1 ? users[users.length - 1]._id : null
		this.props.getUsers( id )
  }

  handleChange( e ) {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    this.setState({ [ name ]: target.value });
  }

	beparErsal(e) {
    e.preventDefault()
    const { email, familyName, phone } = this.state
		this.props.getUsersWithQuery({ email, familyName, phone })
	}

  beparRanande(noe) { this.props.getUserWithLevel(noe) }
  
  remove(_id) {
    console.log('thick ', _id)
    this.props.removeUser({_id})
  }

	render() {
		const { users, userLoading } = this.props.users;
		return (
			<div className='fasbaghal'>
        <div className='grid'>
          <h1>مدیریت کاربران</h1>
          <div className='poshtzamine'>
            <form onSubmit={this.beparErsal.bind(this)} className='form-search'>
                <div className='form-div-search'>
                  <label>جستجو با ایمیل</label>
                  <input name="email" label=' جستجو ' type="text" value={this.state.email} onChange={this.handleChange.bind( this )} placeholder="جستجو با ایمیل" />
                </div>
                <div className='form-div-search'>
                  <label>جستجو با شماره</label>
                  <input name="phone" label=' جستجو ' type="number" value={this.state.phone} onChange={this.handleChange.bind( this )} placeholder="جستجو با شماره" />
                </div>
                <div className='form-div-search'>
                  <label>جستجو با نام خانوادگی</label>
                  <input name="familyName" label=' جستجو ' type="text" value={this.state.familyName} onChange={this.handleChange.bind( this )} placeholder="جستجو با نام خانوادگی" />
                </div>
                <input type="submit" value="جستجو" id="submit" className='dogme i-round i-abi' />
            </form>
            { userLoading ? ( <DotLoader /> ) : (
							<div className='chapchin width-same-big'>
                <span onClick={() => this.props.getUsers()} className='dogme i-round i-abi'> همه کاربران </span>
                <span onClick={this.beparRanande.bind(this, 'doctor')} className='dogme i-round i-abi'> پزشکان </span>
                <span onClick={this.beparRanande.bind(this, 'editor')} className='dogme i-round i-abi'> ویرایشگران </span>
                <span onClick={this.beparRanande.bind(this, 'expert')} className='dogme i-round i-abi'> کارشناسان </span>
                <Link to='/manage/users/add' className='dogme i-round i-abi'>ثبت نام</Link>
              </div>
            )}
						
						<div className="grid-section end-aligned">
							<span className="count">تعداد کاربرها : {this.props.users.usersCount} </span>
							{this.props.users.countLoading ? ( <DotLoader  height='2.5rem' width='6rem'/> ) : (<span className="dogme i-sabz i-round" onClick={() => this.props.GetUsersCount()}>دریافت</span>)}
						</div>

            { users.length >= 1 && (
              <div className='grid-section'>
      					{users.map((user, i) => (<User key={i} {...user} remove={this.remove.bind(this)}/>))}
              </div>
            )}
            { userLoading ? ( <DotLoader /> ) : (
							<div className='chapchin width-same-big'>
                <span className='dogme i-round i-abi' onClick={this.bigiHame.bind(this)}>ادامه</span>
              </div>
            ) }
          </div>
        </div>
				<br/>
				<Route path="/manage/users/edit/:id" exact component={EditUserModal}/>
				<Route path="/manage/users/edit/password/:id" exact component={ChangeUserPassModal}/>
				<Route path="/manage/users/changepic/:id" exact component={ChangeUserPicModal}/>
				<Route path="/manage/users/add" exact component={AddUserModal}/>
			</div>
		);
	}
}

const mps = ({users, auth}) => ({ users, auth });

export default connect(mps, { getUsers, getUsersWithQuery, getUserWithLevel, removeUser, GetUsersCount })(Users);
