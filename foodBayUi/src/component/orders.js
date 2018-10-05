import React, { Component } from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { orders: [] }


    }

    componentWillMount() {
        let that = this;
        console.log("sadsafsa");
        fetch('https://2ea33b9f.ngrok.io/foodbay/order')
            .then(response => response.json())
            .then(data => that.setState({ orders: data }))

    }

    render() {
        const orderlist = this.state.orders.map(order => {
            return (<tr key={order.foodId}>
                <td>{order.CustomerMobileNumber}</td>
                <td>{order.orderedItem.foodId}</td>
                <td>{order.orderedItem.foodName}</td>
                <td>{order.orderedItem.totalAmount}</td>
                <td>{order.orderedItem.quantity}</td>
                <td>{order.orderedItem.deliveryboynumber}</td>
                <td>{order.orderStatus}</td>
            </tr>
            )
        })
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>CustomerMobileNumber</th>
                            <th>foodId</th>
                            <th>foodName</th>
                            <th>totalAmount</th>
                            <th>quantity</th>
                            <th>deliveryboynumber</th>
                            <th>orderStatus</th>
                        </tr>
                    </thead>
                    <tbody>{orderlist}</tbody>
                </table>
            </div>
        )
    }
}