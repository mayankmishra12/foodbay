import React, { Component } from 'react';

export default class AddItems extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        let that = this;
        event.preventDefault();
        let foodId = event.target.foodId.value;
        let foodName = event.target.foodName.value;
        let price = event.target.foodPrice.value;
        let available = event.target.available.value;
        let data = { foodId: foodId, foodName: foodName, price: price, available: available }
        fetch(`https://2ea33b9f.ngrok.io/foodbay/itemslist/?foodId=${foodId}&foodName=${foodName}&price=${price}&available=${available} `, {
            method: 'POST'
        })
            .then((res) => res.text())
            .then((res) => window.alert(res))
            .then(() => that.props.history.push('/'));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    FoodId:
    <input type="text" name="foodId" placeholder="food id should be unique" />
                </label>
                <label>
                    FoodName:
    <input type="text" name="foodName" />
                </label>
                <label>
                    price:
    <input type="text" name="foodPrice" />
                </label>
                <label>
                    available items
    <input type="text" name="available" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}