import React, { PureComponent } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'

class ExpressCarousel extends PureComponent {
	constructor( props ) {
		super( props );
		this.state = { 
      selectedItem : {}
    };
    this.nextInterval = null;
    this.nextItem = this.nextItem.bind(this);
	}
  componentDidMount() {
    (!_.isEmpty(this.props.items)) && (this.setState({ selectedItem: this.props.items[0] }));
    setTimeout(() => { this.nextItem(); }, 3000);
  }
  componentWillReceiveProps(np) {
    (np.items !== this.props.items) && (this.setState({ selectedItem: np.items[0] }))
  }
  clickOnItem(item) {
    clearInterval(this.nextInterval);
    this.setState({ selectedItem: item });
    setTimeout(() => { this.nextItem(); }, 3000);
  }
  nextItem() {
    const selectedIndex  = _.findIndex(this.props.items, {_id: this.state.selectedItem._id})
    const nextIndex = (this.props.items.length-1 === selectedIndex) ? 0 : selectedIndex+1;
    this.setState({ selectedItem: this.props.items[nextIndex]})
    clearInterval(this.nextInterval);
    this.nextInterval = setInterval(() => { this.nextItem() }, 3000)
  }
  componentWillUnmount() { clearInterval(this.nextInterval); }
  
  render() { 
    return (  
      <div className="ExpressCarousel-wraper">
        <div className="wraper">
          <aside className="list-of-items">
            {this.props.items.map(item => (
              <div className="each-item" key={item._id} onClick={this.clickOnItem.bind(this, item)}>
                {item.name}
              </div>
            ))}
          </aside>
          <section className="selected-item">
            {this.state.selectedItem.name}
          </section>
          
        </div>
      </div>
    );
  }
}

ExpressCarousel.propTypes = {
  items: PropTypes.array
}
 
export default ExpressCarousel;