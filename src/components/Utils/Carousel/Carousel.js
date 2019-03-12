import React, { PureComponent } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { RU } from '../../../actions'
import _ from 'lodash'

class Carousel extends PureComponent {
	constructor( props ) {
		super( props );
		this.state = { 
      isSet: true, isReversing: false, its: []
    };
    
    this.calcIts = this.calcIts.bind(this);

	}
  componentDidMount() {
    (!_.isEmpty(this.props.items)) && (this.calcIts(this.props.items));
  }
  calcIts(itm) {
    itm.map((it, i) => it.order = i + 1)
    this.setState({ isSet:false, its: itm });
    // this.next(true)
    setTimeout(() => this.next(true), 20)
  }
  componentWillReceiveProps(np) {
    (np.items !== this.props.items) && (this.calcIts(np.items))
  }
  next(isReversing) {
    let { its } = this.state;
    this.setState({isSet:false, isReversing})
    let newIts = its.map(it => {
      isReversing ? ++it.order : --it.order;
      isReversing ? it.order === its.length + 1 && (it.order = 1) : it.order === 0 && (it.order = its.length);
      return it
    })
    this.setState({its: newIts})
    setTimeout(() => { this.setState({isSet:true}) }, 50)
  }
  render() { 
    return (  
      <div className="carousel-wraper">
        <div className="wraper">
         <div className="lead"> {this.props.lead} </div>
          
            {/* <ul className={cx("carousel", {'is-set': this.state.isSet, 'is-reversing': this.state.isReversing})}>
              {this.state.its.map(it => (
                <li className="carousel-seat" key={it._id} style={{ order: it.order}}><h2>{it.name}</h2></li>
              ))}
            </ul> */}


            <div className={cx("carousel", {'is-set': this.state.isSet, 'is-reversing': this.state.isReversing})}>
              {this.state.its.map(it => (
                <div key={it._id} className="ware-type carousel-seat" style={{ order: it.order}} onClick={() => {
                    this.props.history.push(`${this.props.url}/${it._id}`)
                  }}>
                  <div className="img-wrapper">
                   <img src={`${ RU }/pic/orginal/${ Array.isArray(it.pic) ? it.pic[0] : it.pic }`} alt={it.enName}/>
                    
                  </div>
                  <div className="name">{it.title}</div>
                </div>
              ))}
            </div>
          
        </div>
        <div className="controls">
          <span className="toggle left pinteb-icon icon-angle-left" onClick={this.next.bind(this, true)}></span>
          <span className="toggle right pinteb-icon icon-angle-right" onClick={this.next.bind(this, false)}></span>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  items: PropTypes.array,
  lead: PropTypes.string
}
 
export default Carousel;