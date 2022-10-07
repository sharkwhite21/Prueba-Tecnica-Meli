import React from "react";
import Logo from "../assets/Logo_ML.png";
import iconoSearch from "../assets/IconoSearch.png";
import "../styles/BoxSearch.scss";
export default class BoxSearch extends React.Component {
  constructor() {
    super();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.searchItems = this.searchItems.bind(this);
  }

  searchItems() {
    const search = document.querySelector(".input_search").value;
    window.location = `/items?q=${search}`;
  }

  onClickHandler(e) {
    e.preventDefault();
    this.searchItems();
  }

  onKeyDown(e) {
    if (e.keyCode == 13) {
      this.searchItems();
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header_container">
          <a href="/">
          <img src={Logo} className="header_logo" alt="logo Mercado Libre" />
          </a>
          <div className="search">
            <input
              type="text"
              className="input_search"
              placeholder="Nunca dejes de buscar"
              onKeyDown={this.onKeyDown}
            />
            <button
              type="submit"
              className="button_search"
              onClick={this.onClickHandler}
            >
              <img src={iconoSearch} alt="Boton buscar" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
