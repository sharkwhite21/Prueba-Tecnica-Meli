import React from 'react';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrum';
import '../styles/Breadcrum.scss'
import '../styles/Details.scss'


export default class SearchProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: {} , categories: {}};
  }

  componentDidMount() {
    this.loadProductsFromServer();
  }

  loadProductsFromServer() {
    const ID =  window.location.pathname.substring(7)
    axios.get(`http://localhost:8080/api/items/${ID}`)
      .then((res) => {
        this.setState({ product: res.data ,categories: res.data.categories});
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    if(this.state.product.item){
      return (
        <section className='content-page-search-id'>
          {this.state.categories ? (
          <Breadcrumbs
          categories={this.state.categories}
          />
        ) : ''}  
          <div className="body-content">
            <section className="product-body">
              <div className="product-image">
                <img
                  src={this.state.product.item.picture.secure_url}
                  alt="Imagen del Producto"
                />
              </div>
              <div className="product-resume">
                <div>
                  <p className="product-usage">
                    {this.state.product.item.condition === 'new'
                      ? 'Nuevo'
                      : 'Usado'}
                    <span>&nbsp;-&nbsp;</span>
                    {this.state.product.item.sold_quantity}
                    {' '}
vendidos
                  </p>
                </div>
                <h1 className="product-title">
                  {this.state.product.item.title}
                </h1>
                <p className="product-price">
                  $
                  <span>{this.state.product.item.price.amount}</span>
                </p>
                <button type="button" className="product-resume-buy">
                    Comprar
                </button>
              </div>
            </section>
            <div className="product-description">
            <h3 className="description__h3">Descripción del producto</h3>
            <p className="description__p">
              {this.state.product.item.description}
            </p>
            </div>
          </div>
        </section>

      );
    }
  }
}