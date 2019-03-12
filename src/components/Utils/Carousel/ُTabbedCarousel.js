import React, { PureComponent } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'

class TabbedCarousel extends PureComponent {
	constructor( props ) {
		super( props );
		this.state = { 
      selectedItem : {}
    };
	}
  componentDidMount() {
    (!_.isEmpty(this.props.items)) && (this.setState({ selectedItem: this.props.items[0] }));
  }
  componentWillReceiveProps(np) {
    (np.items !== this.props.items) && (this.setState({ selectedItem: np.items[0] }))
  }
  clickOnItem(item) { this.setState({ selectedItem: item }); }
  render() { 
    return (  
      <div className="TabbedCarousel-wraper">
        <div className="wraper">
          <aside className="list-of-items">
            {this.props.items.map(item => (
              <div className={cx("each-item", {'active-item' : item.enName === this.state.selectedItem.enName})} key={item.enName} onClick={this.clickOnItem.bind(this, item)}>
                {item.name}
              </div>
            ))}
          </aside>
          <section className="selected-item">
            <div className="img-wrappeer">
              <img src={`../../../img/icons/${this.state.selectedItem.enName}.png`} alt="Pinteb"/>
            </div>
            <p>{this.state.selectedItem.decription}</p>
          </section>
          
        </div>
      </div>
    );
  }
}

TabbedCarousel.propTypes = {
  items: PropTypes.array
}
 
export default TabbedCarousel;