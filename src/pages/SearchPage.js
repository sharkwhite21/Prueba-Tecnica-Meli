import React from 'react';
import axios from 'axios';
import ProductListItem from '../components/ListProductsItems';
import Breadcrumbs from '../components/Breadcrum';
import '../styles/Breadcrum.scss'
import { NotFound }  from "./NotFound";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], categories: {}, isLoading: false, notFound: false };
  }

  componentDidMount() {
    this.getproducts();
  }

  getproducts() {
    const wordSearch = window.location.search.substring(3);
    this.setState({ isLoading: true });

    axios.get(`http://localhost:8080/api/items?q=${wordSearch}&limit=4`)
      .then((res) => {
        this.setState({
          items: res.data.items,
          categories: res.data.categories,
          isLoading: false
        });
      })
      .catch( error  => {
        this.setState({
          notFound: true
        })
      });
    
  }

  render() {
    if (this.state.items.length > 0) {
    return (
      <section>
        {this.state.categories ? (
          <Breadcrumbs
          categories={this.state.categories}
          />
        ) : ''}      
        <section className="item-results">
          {this.state.items.map(item => (
            <ProductListItem key={item.id} item={item} />
          ))}
          {/* {(this.state.items.length === 0) && <NotFound />} */}
        </section>
      </section>
    );
    }
    if (this.state.notFound){
      return <NotFound />
    }
  }
}