import React, { Component } from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [] }
        this.editItem = this.editItem.bind(this);
        this.removeItem = this.removeItem.bind(this);

    }
    editItem(item) {
       this.props.history.push({
        pathname: "/editItem",
        state:{item:item}
       })
    }
    removeItem(foodId) {
        let that = this;
        return fetch(`https://2ea33b9f.ngrok.io/foodbay/itemslist/?foodId=${foodId}`, {
            method: 'delete',
        })
            .then((res) => res.text())
            .then((res) => {
                return window.alert(res)
            }).then(() => {
                fetch('https://2ea33b9f.ngrok.io/foodbay/itemslist')
                    .then(response => response.json())
                    .then(data => that.setState({ items: data }))
            }
            )
    }
    componentWillMount() {
        let that = this;
        console.log("sadsafsa");
        fetch('https://2ea33b9f.ngrok.io/foodbay/itemslist')
            .then(response => response.json())
            .then(data => that.setState({ items: data }))

    }

    render() {
        const itemlist = this.state.items.map(item => {
            return (<tr key={item.foodId}>
                <td>{item.foodId}</td>
                <td>{item.foodName}</td>
                <td>{item.price}</td>
                <td>{item.available}</td>
                <td><button onClick={() => this.editItem(item)}>editItem Items</button></td>
                <td><button onClick={() => this.removeItem(item.foodId)}>delete Items</button></td>
            </tr>
            )
        })
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>foodId</th>
                            <th>foodName</th>
                            <th>price</th>
                            <th>availble Items</th>
                            <th>Edit</th>
                            <th>Remove</th>
                           
                        </tr>
                    </thead>
                    <tbody>{itemlist}</tbody>
                </table>
            </div>
        )
    }
}