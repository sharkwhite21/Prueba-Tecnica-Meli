import React from 'react';
import { Link } from 'react-router-dom';
import shipping from '../assets/iconoShipping.png';
import '../styles/ListProductsItems.scss'


export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={`/items/${this.props.item.id}`}>
        <div className="results-item">
          <div className="results-item-image">
            <img className="img" src={this.props.item.picture} alt="" />
          </div>
          <div className="results-item-info">
            <p className="results-item-price">
                $
              {this.props.item.price.amount}
              {this.props.item.free_shipping ? <img src={shipping} alt=""/> : ''}
            </p>

            <p className="results-item-location">
              {this.props.item.address}
            </p>
            <h2 className="results-item-title">{this.props.item.title}</h2>
          </div>
        </div>
      </Link>
    );
  }
}
