import React, { Component } from 'react';

 export default class Deliveryboy extends React.Component{
     constructor(props){
         super(props)
         this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleSubmit(event){
         event.preventDefault();
         let CallFrom = event.target.mobileNumber.value;
         let status = event.target.status.value;
         return fetch(`https://2ea33b9f.ngrok.io/foodbay/delivered/?CallFrom=${CallFrom}&status=${status}`, {
            method: 'get',
        }).then((res)=>res.text())
        .then((res)=>window.alert(res))
     }
 render(){
     return (
        <form  onSubmit={this.handleSubmit}>
        <label>
            Name:
<input type="text" name="Name"  />
        </label>
        <label> <br/>
            mobileNumber:
<input type="text" name="mobileNumber" />
        </label>
        <br/>
       <select name="status">
       <option value="delivered" selected="selected" >delivered </option>
       <option value="cancel">cancel </option>
       </select>
        <input type="submit" value="Submit" />
    </form>
     )
 }
 }