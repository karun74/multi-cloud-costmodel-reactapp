// eslint-disable-next-line
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Results from './Results';

class CostPerApplnForgate extends React.Component {


	constructor(props) {
		super(props);
		this.state = { storageTier: '', minCPUConfigured: '', maxCPUConfigured: '', applicationInstances: '', storageRequiredForTheAppln: '', view: 'terraform', priceDetail: '', region: '', minMemoryConfiguredInGB: '', maxMemoryConfiguredInGB: '', loading: false };
	}




	handleSubmit = (event) => {
		event.preventDefault()
		
		const rand = Math.floor(Math.random() * 100) + 1;
		this.state.rand = rand;
		var url = `http://${process.env.REACT_APP_PythonAPIHost}/getcostperapplnperhour?storageTier=` + this.state.storageTier + "&minCPUConfigured="+this.state.minCPUConfigured+"&maxCPUConfigured="+this.state.maxCPUConfigured+"&applicationInstances="+this.state.applicationInstances + "&storageRequiredForTheAppln="+this.state.storageRequiredForTheAppln + "&region="+this.state.region +"&minMemoryConfiguredInGB="+this.state.minMemoryConfiguredInGB +"&maxMemoryConfiguredInGB="+this.state.maxMemoryConfiguredInGB ;
		//url = "http://localhost:8090/regions";
		//alert("You are submitting provider:" + this.state.vm_name);
		//alert('submitting to url: '+url);
		var powerOffVMPayload = JSON.stringify({ "vm_user": this.state.vm_user, "vm_name": this.state.vm_name, "vm_ip": this.state.vm_ip });
		//var modifiedpowerOffVMPayload = powerOffVMPayload.replace(/"/gi, '\\"');
		//alert(modifiedpowerOffVMPayload);
		
		this.setState({ loading: true }, () => { axios({
			method: 'GET',
			url: url,
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				//handle success
				this.setState({ loading: false });
				console.log(response);
				console.log(`Status: ${response.status}`)
				console.log(`${response}`);
				const vmCreationDtl = response.data;
				const statusCode = response.status;

				//alert(`response: ${JSON.stringify(response.data)}`);
				const runningCost = JSON.stringify(response.data['response']['RunningCostPerApplicationPerMonth']);
				alert(`response: ${runningCost}`);
				this.setState({ priceDetail: runningCost, view: 'response' });
			})
			.catch((error) => {
				console.log('Got Error...')
				this.setState({ loading: false });
				console.log(error)
				alert(`Got Error: ${error.message}`);
				axios.get(error.message)
					.then((response) => { })
					.catch(({ response }) => {
						alert(`error response: ${response.data}`);
						alert(`error response status: ${response.status}`);
						alert(`error response header: ${response.headers}`);
					})

			});

		});

	}
	handleClick = (event) => {
		this.setState({
    storageTier: '', minCPUConfigured: '', maxCPUConfigured: '', applicationInstances: '', storageRequiredForTheAppln: '', view: 'terraform', priceDetail: '', region: '', minMemoryConfiguredInGB: '', maxMemoryConfiguredInGB: '', loading: false 
  });
	document.getElementById("inputform").reset();
	}

	myChangeHandler = (event) => {
		//alert(event.target.value);
		this.setState({ storageRequiredForTheAppln: event.target.value });

	}
	myChangeHandler2 = (event) => {
		//alert(event.target.value);
		this.setState({ minCPUConfigured: event.target.value });
		//alert(this.state.region);
	}
	myChangeHandler3 = (event) => {
		//alert(event.target.value);
		this.setState({ applicationInstances: event.target.value });
	}
	myChangeHandler4 = (event) => {
		this.setState({ storageTier: event.target.value });
	}
	myChangeHandler5 = (event) => {
		this.setState({ region: event.target.value });
	}
	myChangeHandler6 = (event) => {
		//alert(event.target.value);
		this.setState({ maxCPUConfigured: event.target.value });
		//alert(this.state.region);
	}
	myChangeHandler7 = (event) => {
		
		this.setState({minMemoryConfiguredInGB: event.target.value });
		
	}
	myChangeHandler8 = (event) => {
		
		this.setState({maxMemoryConfiguredInGB: event.target.value });
		
	}

	render() {
		
		
		
      			return(
			
				<div>

					<header>
						<title>Cost per Application per Hour</title>
						<h1>Running Cost per Application Forgate Model Kubernetes Cluster</h1>
					</header>

					<form id="inputform" onSubmit={this.handleSubmit}>
						<table>
							<tr>
								<th>Select Storage Tier</th>
								<td>
									<select name='storageTier' onChange={this.myChangeHandler4}>
										<option value=''>Please select a Storage Tier</option>
										<option value='standard'>Magnetic</option>
										<option value='gp2'>General Purpose</option>
										<option value='io1'>Provisioned IOPS</option>
										<option value='st1'>Throughput Optimized HDD</option>
										<option value='sc1'>Cold HDD</option>
									</select>
								</td>
								<th> Select the region: </th>
	    							<td>
	      							  <select name='region' onChange={this.myChangeHandler5}>
	      								<option value=''>Please select the target region</option>
	         							<option value='us-east-1'>us-east-1</option>
	         							<option value='us-east-2'>us-east-2</option>
	         							<option value='us-west-1'>us-west-1</option>
	         							<option value='us-west-2'>us-west-2</option>
	      							  </select>
	    							</td>
							</tr>
							<tr>
								<th> Enter the storage Required For The Application: </th>
								<td>    <input name="storageRequiredForTheAppln" id="storageRequiredForTheAppln" type="text" onChange={this.myChangeHandler} />
								</td>
								<th> Enter the minimum CPU Configured: </th>
								<td>    <input name="minCPUConfigured" id="minCPUConfigured" type="text" onChange={this.myChangeHandler2} />
								</td>
								<th> Enter the maximum CPU Configured: </th>
								<td>    <input name="maxCPUConfigured" id="maxCPUConfigured" type="text" onChange={this.myChangeHandler6} />
								</td>
								
							</tr>
							<tr>
								<th> Enter the application Instances Required: </th>
								<td>
									<input name="applicationInstances" id="applicationInstances" type="text" onChange={this.myChangeHandler3} />
								</td>
								
								<th> Enter the minimum Memory Configured In GB: </th>
								<td>    <input name="minMemoryConfiguredInGB" id="minMemoryConfiguredInGB" type="text" onChange={this.myChangeHandler7} />
								</td>
								<th> Enter the maximum Memory Configured In GB: </th>
								<td>    <input name="maxMemoryConfiguredInGB" id="maxMemoryConfiguredInGB" type="text" onChange={this.myChangeHandler8} />
								</td>

							</tr>
							<tr>
							<td></td>
							<td></td>
							<td><button type='submit' disabled={this.state.loading}>Submit</button></td>
							<td><button type='button' disabled={this.state.loading} onClick={this.handleClick}>Reset</button></td>
							</tr>
						</table>

						
						

						


					</form>
{this.state.view === 'response' ? (
       <Results priceDetail={this.state.priceDetail}/> 
      ) : null}

{
 this.state.loading === true ? (
	<LoadingSpinner/>
):null
	
}

					
				</div>


			
      
      );
		
	}
}

export default CostPerApplnForgate;
