import React from 'react';

//import { Link } from 'react-router-dom';
import HeaderImg from "../../Images/community1.jpg";

import './Home.scss';

class Home extends React.Component {

  state = {
    products: [],
    index: 0,
    direction: null,
    btn: true,
  }

  componentDidMount() {
    // this.allProducts();
  }

//   allProducts = () => {
//     productRequests.getRequest().then((products) => {
//       this.setState({ products });
//     })
//   }

  render() {
    // const { products } = this.state;
    // const productItemComponent =
    //   <ProductItem
    //     product={products}
    //     key={products.id}
    //   />

    return (
        <div>
          <div>
            <h1 id="adamTest"> hey </h1>
          </div>
            <img src={HeaderImg} id="header-img" alt="header"></img>
        </div>
    )
  }
}


export default Home;