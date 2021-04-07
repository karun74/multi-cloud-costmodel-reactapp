// eslint-disable-next-line
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Results from './Results';

class KubernetesSizing extends React.Component {


	constructor(props) {
		super(props);
		this.state = { numberOfMicroServices: '', view: 'terraform', priceDetail: '', memoryRequestInMBperContainer: '', cpuRequestperPod: '', maxPlannedUnavNode:'',  loading: false, numberOfNodes: '', nodeCapacityCPU: '', nodeCapacityMem: '' };
	}




	handleSubmit = (event) => {
		event.preventDefault()
		this.state.loading = true;
		var maxPlannedUnAvNode = document.getElementById("maxPlannedUnavNode").value;
		//alert(event.target.value);
		this.state.maxPlannedUnavNode= maxPlannedUnAvNode;
		var sqrt = Math.sqrt(this.state.numberOfMicroServices);
		var perfectSqr = Math.round( sqrt  ) * Math.round( sqrt  )
		//alert(perfectSqr);
		var numberOfContainersPerNode = Math.sqrt(perfectSqr);
		//alert(numberOfContainersPerNode);
		var numberOfNodes = Math.ceil(this.state.numberOfMicroServices/numberOfContainersPerNode);
		//alert(numberOfNodes);
		//alert(this.state.maxPlannedUnavNode);
		var overProvisionFactorCPU = numberOfContainersPerNode * (this.state.cpuRequestperPod) / (numberOfNodes - this.state.maxPlannedUnavNode); 

		var overProvisionFactorMem = (numberOfContainersPerNode * (this.state.memoryRequestInMBperContainer)) / (numberOfNodes - this.state.maxPlannedUnavNode); 
		//alert(overProvisionFactorCPU);
		//alert((numberOfContainersPerNode * this.state.cpuRequestperPod ))
		var nodeCapacityCPU = Math.ceil((numberOfContainersPerNode * this.state.cpuRequestperPod )  + overProvisionFactorCPU + 0.5 );
		//alert(nodeCapacityCPU);
		//alert(this.state.memoryRequestInMBperContainer);
		//alert(overProvisionFactorMem);
		var nodeCapacityMem = Math.ceil((numberOfContainersPerNode * this.state.memoryRequestInMBperContainer )  + overProvisionFactorMem + 500 );
		//alert(nodeCapacityMem);
		this.setState({ numberOfNodes: numberOfNodes, nodeCapacityCPU: nodeCapacityCPU, nodeCapacityMem: nodeCapacityMem, loading: false,  view: 'response'});

	}
	handleClick = (event) => {
		this.setState({
    numberOfMicroServices: '', view: 'reset', priceDetail: '', memoryRequestInMBperContainer: '', cpuRequestperPod: '', maxPlannedUnavNode: '',  loading: false , numberOfNodes: '', nodeCapacityCPU: '', nodeCapacityMem: ''
  });
	document.getElementById("inputform").reset();
	}

	myChangeHandler = (event) => {
		//alert(event.target.value);
		this.setState({ numberOfMicroServices: event.target.value });

	}
	myChangeHandler1 = (event) => {
		//alert(event.target.value);
		this.setState({ memoryRequestInMBperContainer: event.target.value });
		//alert(this.state.region);
	}
	myChangeHandler2 = (event) => {
		//alert(event.target.value);
		this.setState({ cpuRequestperPod: event.target.value });
		//alert(this.state.region);
	}
	myChangeHandler3 = (event) => {
		var maxPlannedUnAvNode = document.getElementById("maxPlannedUnavNode").value;
		//alert(event.target.value);
		this.setState({ maxPlannedUnavNode: maxPlannedUnAvNode });
		//alert(this.state.region);
	}
	

	render() {
		
		
		
      			return(
			
				<div>

					<header>
						<title>Kubernetes Cluster Sizing Calculator</title>
						<h1>Kubernetes Cluster Sizing Calculator</h1>
					</header>

					<form id="inputform" onSubmit={this.handleSubmit}>
						<table>
							
							<tr>
								<th> Enter the targeted number of Microservices: </th>
								<td>    <input name="numberOfMicroServices" id="numberOfMicroServices" type="text" onChange={this.myChangeHandler} />
								</td>
								
								<th> Enter the Maximum Memory required per container: </th>
								<td> <input name="memoryRequestInMBperContainer" id="memoryRequestInMBperContainer" type="text" onChange={this.myChangeHandler1} />
								</td>
								
							</tr>
							<tr>
								
								
								
								<th> Enter Maximum CPU to be request for a container: </th>
								<td> <input name="cpuRequestperPod" id="cpuRequestperPod" type="text" onChange={this.myChangeHandler2} />
								</td>
								<th> Enter Maximum Planned Unavailable Nodes: </th>
								<td> <input name="maxPlannedUnavNode" id="maxPlannedUnavNode" type="text"/>
								</td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td><button type='submit' disabled={this.state.loading}>Calculate</button></td>
							<td><button type='button' disabled={this.state.loading} onClick={this.handleClick}>Reset</button></td>
							</tr>
						</table>

						
						

						


					</form>
{this.state.view === 'response' ? (
       <table class="results">
	<tr>
	<th>Number of Nodes in Cluster: </th><td> {this.state.numberOfNodes}</td><th>Number of CPUs per Node: </th> <td> {this.state.nodeCapacityCPU}</td> <th>Memory per Node in MB: </th><td> {this.state.nodeCapacityMem}</td>
	</tr>
	</table>
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

export default KubernetesSizing;
