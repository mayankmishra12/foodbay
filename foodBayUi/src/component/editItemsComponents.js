import React, { Component } from 'react';

 export default class EditItem extends React.Component{
     constructor(props){
        
         super(props)
         this.handleSubmit = this.handleSubmit.bind(this);
         this.onChangeHandler = this.onChangeHandler.bind(this);
     }

     componentWillMount(){
        let item = this.props.location.state.item;
        this.setState({
            foodName:item.foodName,
            foodId: item.foodId,
            foodPrice: item.price,
            available:item.available
         })
     }
    
     onChangeHandler(e){
         console.log(e.target.value);
        e.preventDefault();
         console.log(this.state)
         this.setState({
             [e.target.name]:e.target.value
         })
     }

     handleSubmit(event){
        let that = this;
        event.preventDefault();
        let foodId =event.target.foodId.value;
        let foodName = event.target.foodName.value;
        let price = event.target.foodPrice.value;
        let available = event.target.available.value;
        let data ={foodId:foodId,foodName:foodName,price:price,available:available}
       fetch(`https://2ea33b9f.ngrok.io/foodbay/itemslist/?foodId=${foodId}&foodName=${foodName}&price=${price}&available=${available} `,{
           method:'PUT'
       })
       .then((res)=> res.text() )               
       .then((res)=>window.alert(res))
       .then(()=> that.props.history.push('/') );
     }
 render(){
     return (
        <form  onSubmit={this.handleSubmit}>
        <label>
            FoodId:
<input type="text" name="foodId"  value ={this.state.foodId}/>
        </label>
        <label>
            FoodName:
<input type="text" name="foodName" value ={this.state.foodName} onChange ={this.onChangeHandler} />
        </label>
        <label>
            price:
<input type="text" name="foodPrice" value ={this.state.foodPrice} onChange ={this.onChangeHandler}/>
        </label>
        <label>
           available items
<input type="text" name="available" value = {this.state.available}  onChange ={this.onChangeHandler}/>
        </label>
        <input type="submit" value="Submit" />
    </form>
        
     )
 }
 }