import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import qs from 'query-string'
import cx from 'classnames'
import { getWareTypes, cleanCenters, getCities, getrastes, RU } from '../../actions'


class FilterModal extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			wareType: '',
			city: '',
      raste: '',
      premium: false,
      onlineShop: false,
      sort: ''
		};
	}

  componentDidMount() {
		this.props.getWareTypes()
		this.props.getCities()
    this.props.getrastes()
    
    let query = qs.parse(this.props.location.search)

    if (query.wareType) { this.setState({wareType: query.wareType}) }
    if (query.rastes) { this.setState({raste: query.rastes}) }
    if (query.city) { this.setState({city: query.city}) }
    if (query.premium) { this.setState({premium: JSON.parse(query.premium)}) }
    if (query.onlineShop) { this.setState({onlineShop: JSON.parse(query.onlineShop)}) }
    if (query.sort) { this.setState({sort: query.sort}) }
  }
  
  onSubmit() {
    let query = {}
    let { wareType, city, raste, premium, onlineShop, sort } = this.state
    if (wareType) {query.wareType = wareType}
    if (city) {query.city = city}
    if (raste) {query.rastes = raste}
    if (premium) {query.premium = true}
    if (onlineShop) {query.onlineShop = true}
    if (sort) {query.sort = sort}
    
    this.props.cleanCenters()
		this.props.history.push({ pathname: '/centers', search: qs.stringify(query) })
  }

  
  handleWareTypeSelect(wareType) { this.setState({ wareType: wareType.target.value }) }
  
  handleCitySelect(city) { this.setState({ city: city.target.value }) }
  
  handlerasteSelect(raste) { this.setState({ raste: raste.target.value }) }

  changePreOn(preOn) {
    if (preOn === 'premium') { 
      this.setState({ premium : !this.state.premium }) 
    } else if (preOn === 'onlineShop') {
      this.setState({ onlineShop : !this.state.onlineShop })
    }
  }

  changeSort(sort) { this.setState({ sort }) }

  render() {

    const { wareTypes: { wareTypes }, cities: { cities }, rastes: { rastes, rasteLoading }  } = this.props;

    return (
      <div className='modal-darbar' >

        <div className='modal-back' onClick={this.props.history.goBack}></div>
          <div className='modal filter-modal'>

            <div className="filter-header">
              <Link to='/centers' className="clean dogme i-round i-sabz">پاک کردن</Link>
              <span>فیلتر</span>
              <span className="clean dogme i-round i-sabz" onClick={this.onSubmit.bind(this)}>اعمال</span>
            </div>


            <div className='select form-item'>
            
              <div className='form-tak'>
                <label>انتخاب شهر</label>
                <select value={this.state.city} onChange={this.handleCitySelect.bind(this)}>
                  <option defaultValue></option>
                  {cities.map(city => <option key={city._id} value={city.enName}>{city.name}</option>)}
                </select>
              </div>
            
              <div className='form-tak'>
                <label>انتخاب محصول</label>
                <select value={this.state.wareType} onChange={this.handleWareTypeSelect.bind(this)}>
                  <option defaultValue></option>
                  {wareTypes.map(wareType => <option key={wareType._id} value={wareType.enName}>{wareType.name}</option>)}
                </select>
              </div>
            
              <div className='form-tak'>
                <label>انتخاب نوع مرکز</label>
                <select value={this.state.raste} onChange={this.handlerasteSelect.bind(this)}>
                  <option defaultValue></option>
                  {rastes.map(raste => <option key={raste._id} value={raste.enName}>{raste.name}</option>)}
                </select>
              </div>

            </div>

            <div className="check-pre-online">
              <div className="small-checkbox">
                <label> ویژه ها </label>
                <input type="checkbox" checked={this.state.premium} onChange={this.changePreOn.bind(this, 'premium')}/>
              </div>
              <div className="small-checkbox">
                <label> خرید آنلاین </label>
                <input type="checkbox" checked={this.state.onlineShop} onChange={this.changePreOn.bind(this, 'onlineShop')}/>
              </div>
            </div>
            
            <div className="sort-by">
              <span>مرتب سازی بر اساس :</span>

              <div className='filter-span-wrapper with-indicator'>
                <span className={cx('Nav-item', {'is-active': this.state.sort === 'expertRate'})} onClick={this.changeSort.bind(this, 'expertRate')}>نظر کارشناس</span>
                <span className={cx('Nav-item', {'is-active': this.state.sort === 'peopleRate'})} onClick={this.changeSort.bind(this, 'peopleRate')}>نظر مردم</span>
                <span className={cx('Nav-item', {'is-active': this.state.sort === 'likes'})} onClick={this.changeSort.bind(this, 'likes')}>محبوبیت</span>
                <span className={cx('Nav-item', {'is-active': this.state.sort === 'discount'})} onClick={this.changeSort.bind(this, 'discount')}>تخفیف</span>
              </div>
            </div>

          </div>
      </div>
    )
  }

}

const msp = ({ pinteb, wareTypes, cities, rastes }) => ({ pinteb, wareTypes, cities, rastes });

export default connect(msp, { getWareTypes, cleanCenters, getCities, getrastes })(FilterModal);
