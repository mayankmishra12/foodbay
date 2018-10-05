import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './component/Home';
import AddItems from './component/addItems.componetns';
import EditItem from './component/editItemsComponents';
import Deliveryboy from './component/deliveryboyComponent';
import Orders from './component/orders';
class App extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/deliveryboy">deliveryboy portal</Link>
              </li>
              <li>
                <Link to="/addItem"> Add new Items</Link>
              </li>
              <li>
                <Link to="/orders"> Orders</Link>
              </li>
            </ul>
            <hr />
            <Route exact path="/" component={Home} />
            <Route exact path ="/deliveryboy" component={Deliveryboy}/>
            <Route path="/addItem" component={AddItems} />
            <Route path="/editItem" component={EditItem} />
            <Route path="/orders" component={Orders} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;



