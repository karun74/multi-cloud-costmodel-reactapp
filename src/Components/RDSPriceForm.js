// eslint-disable-next-line
import React, { Component }  from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
//import {Router,Redirect} from 'react-router'
 
    
class RDSPriceForm extends React.Component {
	
  
  constructor(props) {
    super(props);
    this.state = { provider: '', region: '', instanceType: '', serviceCode: '', launchType: '', priceDetail: [] , view: '',osImage: ''};
  }
 
  handleSubmit = (event) => {
        event.preventDefault()
		var url = "http://localhost:8090/instanceprice?"+"region="+this.state.region+"&instanceType="+this.state.instanceType+"&launchType="+this.state.launchType+"&serviceCode="+this.state.serviceCode+"&osImage=''";
		//url = "http://localhost:8090/regions";
		//alert("You are submitting provider:" + this.state.provider);
		//alert('submitting to url: '+url);
		axios(url, {'mode':'no-cors',timeout: 600000})
        .then(resp=>{
		console.log(`Status: ${resp.status}`)
		console.log(`${resp}`);
		const priceDetail = resp.data;
		const statusCode = resp.status;
  		
		//alert(`response: ${JSON.stringify(resp.data['priceDetail'])}`);
    	this.setState({ priceDetail: JSON.parse(JSON.stringify(resp.data['priceDetail'])), view: 'true'});
		//window.location.href = "http://localhost:3000/";
    	
	})
	.catch((error) => {
		console.log('Got Error...')
		console.log(error)
		alert(`Got Error: ${error.message}`);
		axios.get(error.message)
     .then((response) => {})
     .catch(({ response }) => { 
         alert(response.data);  
         alert(response.status);  
         alert(response.headers);  
     })
		//window.location.href ="http://www.google.com";
	})

       
    }

  handleClick = (event) => {
		this.setState({
    storageTier: '', minCPUConfigured: '', maxCPUConfigured: '', applicationInstances: '', storageRequiredForTheAppln: '', view: 'terraform', priceDetail: '', region: '', minMemoryConfiguredInGB: '', maxMemoryConfiguredInGB: '', loading: false 
  });
	document.getElementById("inputform").reset();
	} 

  myChangeHandler = (event) => {
	 // alert(event.target.value);
	  this.setState({provider: event.target.value});
  
  }
  myChangeHandler2 = (event) => {
	  //alert(event.target.value);
	  this.setState({region: event.target.value});
	  //alert(this.state.region);
  }
  myChangeHandler3 = (event) => {
	  //alert(event.target.value);
	  this.setState({instanceType: event.target.value});
  }
  myChangeHandler4 = (event) => {
	  //alert(event.target.value);
	  this.setState({serviceCode: event.target.value});
  }
  myChangeHandler5 = (event) => {
	 // alert(event.target.value);
	  this.setState({launchType: event.target.value});
  }
 myChangeHandler6 = (event) => {
	 // alert(event.target.value);
	  this.setState({osImage: event.target.value});
  }

  render() {
	const priceDetail = this.state.priceDetail;
	if(this.state.view == 'true') {
    return (
		
 	<div>
		
	<title>Relational Database Service</title>
	<h1>Running Cost of Relational Database Service</h1>		
 
      <form id="inputform" onSubmit = { this.handleSubmit }>
	<table class="inputs">
	    <tr>
      <th> Select Cloud Provider Name: </th>
	<td>    <select name='provider' onChange={this.myChangeHandler}>
	      <option value=''>Please select the target provider</option>
	      <option value='AWS'>AWS</option>
	      <option value='Azure'>Azure</option>
	    </select>
	</td>
	 <th> Select the region: </th>
	    <td>
	      <select name='region' onChange={this.myChangeHandler2}>
	      <option value=''>Please select the target region</option>
	         <option value='us-east-1'>us-east-1</option>
	         <option value='us-east-2'>us-east-2</option>
	         <option value='us-west-1'>us-west-1</option>
	         <option value='us-west-2'>us-west-2</option>
	      </select>
	    </td>
	    </tr>
	    <tr>
	      <th> Select Instance Type: </th>
	      <td>
	        <select name='instanceType' onChange={this.myChangeHandler3}>
	          <option value=''>Select the instance type</option>
	          <option value='db.t2.2xlarge'>db.t2.2xlarge</option>
	        </select>
	      </td>
	      <th> Select Operating System: </th>
	      <td>
	        <select name='osImage' onChange={this.myChangeHandler6}>
	          <option value=''>Select the operating system</option>
		  <option value='Windows'>Windows</option>
		  <option value='Linux'>Linux</option>
	          <option value='RHEL'>RHEL</option>
		  <option value='SELS'>SELS</option>
	        </select>
	      </td>
	        <th>Select Service Code : </th>
		<td>
	        <select name='serviceCode' onChange={this.myChangeHandler4}>
	          <option value=''>Select the Service type</option>
	          <option value='AmazonRDS'>AmazonRDS</option>
	          <option value='AmazonEC2'>AmazonEC2</option>
	        </select>
	      	</td>
		</tr>
		<tr>
	        <th> Select the Lauch Type: </th>
	        <td>
	          <select name='launchType' onChange={this.myChangeHandler5}>
	          <option value=''>Select the Service type</option>
	          <option value='Reserved'>Reserved</option>
	          <option value='OnDemand'>OnDemand</option>
	          </select> 
	        </td>
	    </tr>
	    <tr>
		<td>           </td>
		<td>           </td>
                <td>
                  <button  type='submit'>Submit</button>
		</td>
		<td><button type='button' disabled={this.state.loading} onClick={this.handleClick}>Reset</button></td>
            </tr>

	</table>
	
                     
            
            
        
	   
      </form>
	  <table class="result"> 
		<tr><th> Price Detail for the selected Instance & Launch Type: </th> </tr>
			<tr>
				<th>Instance Price per Hour</th>
				<th>Launch Type</th>
				<th>Instance Type</th>
			</tr>
			<tr>
				<td>
					{this.state.priceDetail['instancePricePerHour']}
				</td>
				<td>
					{this.state.priceDetail['launchType']}
				</td>				<td>
					{this.state.priceDetail['instanceType']}
				</td>
			</tr>
		</table>
	  
	   </div>
	    
    );
} else {
	return (
	<div>
	<title>Relational Database Service</title>
	<h1>Running Cost of Relational Database Service</h1>		
 
	<form id="inputform" onSubmit = { this.handleSubmit }>
	<table class="inputs">
	    <tr>
      <th> Select Cloud Provider Name: </th>
	<td>    <select name='provider' onChange={this.myChangeHandler}>
	      <option value=''>Please select the target provider</option>
	      <option value='AWS'>AWS</option>
	      <option value='Azure'>Azure</option>
	    </select>
	</td>
	 <th> Select the region: </th>
	    <td>
	      <select name='region' onChange={this.myChangeHandler2}>
	      <option value=''>Please select the target region</option>
	         <option value='us-east-1'>us-east-1</option>
	         <option value='us-east-2'>us-east-2</option>
	         <option value='us-west-1'>us-west-1</option>
	         <option value='us-west-2'>us-west-2</option>
	      </select>
	    </td>
	    </tr>
	    <tr>
	      <th> Select Instance Type: </th>
	      <td>
	        <select name='instanceType' onChange={this.myChangeHandler3}>
	          <option value=''>Select the instance type</option>
	          <option value='db.t2.2xlarge'>db.t2.2xlarge</option>
	        </select>
	      </td>
	      <th> Select Operating System: </th>
	      <td>
	        <select name='osImage' onChange={this.myChangeHandler6}>
	          <option value=''>Select the operating system</option>
		  <option value='Windows'>Windows</option>
		  <option value='Linux'>Linux</option>
	          <option value='RHEL'>RHEL</option>
		  <option value='SELS'>SELS</option>
	        </select>
	      </td>
	        <th>Select Service Code : </th>
		<td>
	        <select name='serviceCode' onChange={this.myChangeHandler4}>
	          <option value=''>Select the Service type</option>
	          <option value='AmazonRDS'>AmazonRDS</option>
	          <option value='AmazonEC2'>AmazonEC2</option>
	        </select>
	      </td>
		</tr>
		<tr>
	        <th> Select the Lauch Type: </th>
	        <td>
	          <select name='launchType' onChange={this.myChangeHandler5}>
	          <option value=''>Select the Service type</option>
	          <option value='Reserved'>Reserved</option>
	          <option value='OnDemand'>OnDemand</option>
	          </select> 
	        </td>
	    </tr>
 		<tr>
		<td>           </td>
<td>           </td>
                <td>
                  <button  type='submit'>Submit</button>
		</td>
<td><button type='button' disabled={this.state.loading} onClick={this.handleClick}>Reset</button></td>
            </tr>
	</table>
	
            
           
            
        
	   
      </form>
	  
	  
	   </div>
	);
}
  }
}

export default RDSPriceForm;
