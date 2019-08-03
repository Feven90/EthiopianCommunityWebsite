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
          <div id="header-img"></div>
          {/* <img alt="header"></img> */}
        <div>
        <div className="events-mission-div row">
          <div className="events-home col-6"></div>
          <div className="mission-home col-6"></div>
          {/* <div className="col-4"></div> */}
        </div>
            What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
    )
  }
}


export default Home;