// eslint-disable-next-line
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Results from './Results';

class MigrationCost extends React.Component {


	constructor(props) {
		super(props);
		this.state = { migrationMethod: '', CostPerHr: '', usageType: '', task: '', view: 'terraform', priceDetail: '', transPathWay: '', subtasks: [],  EffortInManHrs: [], loading: false, rand: '' };
	}




	handleSubmit = (event) => {
		event.preventDefault()
		
		const rand = Math.floor(Math.random() * 100) + 1;
		this.state.rand = rand;
		var url = `http://${process.env.REACT_APP_MigrationPythonAPIHost}/addTask`;
		//url = "http://localhost:8090/regions";
		//alert("You are submitting provider:" + this.state.vm_name);
		//alert('submitting to url: '+url);
		var totalCost = 0.0;
		this.state.EffortInManHrs.map(effort => totalCost  = totalCost + Number(effort) * Number(this.state.CostPerHr) );
		//alert(totalCost);
		var taskCreationPayload = JSON.stringify({"migrationMethodId": Number(this.state.rand), "migrationMethod": this.state.migrationMethod, "transPathWay": this.state.transPathWay, "sub-tasks": this.state.subtasks,  "effort In Man Hrs": this.state.EffortInManHrs, "cost per hr": Number(this.state.CostPerHr), "Total Migration Cost": totalCost  });
		var modifiedtaskCreationPayload = taskCreationPayload.replace(/"/gi, '\\"');
		//alert(taskCreationPayload);
		
		this.setState({ loading: true }, () => { axios({
			method: 'POST',
			url: url,
			data:  taskCreationPayload,
			headers: { 'Accept': 'application/json','Content-Type': 'text/plain' }
			
		})
			.then((response) => {
				//handle success
				this.setState({ loading: false });
				console.log(response);
				console.log(`Status: ${response.status}`)
				console.log(`${response}`);
				const vmCreationDtl = response.data;
				const statusCode = response.status;
				//alert(JSON.stringify(response));
				//alert(`response: ${JSON.stringify(response["data"])}`);
				var runningCost = JSON.stringify(response);
				runningCost = runningCost.substring( runningCost.lastIndexOf('data'), runningCost.lastIndexOf(',"headers'));
				//alert(`response: ${runningCost}`);
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
    migrationMethod: '', usageType: '', 'CostPerHr': '', task: '', view: 'terraform', priceDetail: '', transPathWay: '',  subtasks: [], EffortInManHrs: [],   loading: false 
  });
	document.getElementById("inputform").reset();
	}

	myChangeHandler = (event) => {
		//alert(event.target.value);
		this.setState({ task: event.target.value });

	}
	myChangeHandler2 = (event) => {
		 var text = document.getElementById("subtask").value; //.value gets input values
		//alert(text);
		var subtasks = [...this.state.subtasks];
		subtasks.push(text);
		this.setState({
    			subtasks: subtasks
  		});
    		//alert(this.state.subtasks);
	}
	myChangeHandler3 = (event) => {
		//alert(event.target.value);
		this.setState({ CostPerHr: event.target.value });
	}
	myChangeHandler4 = (event) => {
		this.setState({ migrationMethod: event.target.value });
	}
	myChangeHandler5 = (event) => {
		this.setState({ transPathWay: event.target.value });
	}
	myChangeHandler6 = (event) => {
		//alert(event.target.value);
		this.setState({ subtask: event.target.value });
		//alert(this.state.region);
	}
	myChangeHandler7 = (event) => {
		
		this.setState({EstimatedPodsInCluster: event.target.value });
		
	}
	myChangeHandler8 = (event) => {
		
		 var text = document.getElementById("effort In Man Hrs").value; //.value gets input values
		//alert(text);
		var effortsInHours = [...this.state.EffortInManHrs];
		effortsInHours.push(parseFloat(text));
		this.setState({
    			EffortInManHrs: effortsInHours 
  		});
    		//alert(this.state.EffortInManHrs);
		
		
	}
	myChangeHandler9 = (event) => {
		
		this.setState({EffortInManHrs: event.target.value });
		
	}
	handleSubmitForSearch = (event) => {
		event.preventDefault()
		
		const rand = Math.floor(Math.random() * 100) + 1;
		this.state.rand = rand;
		var url = `http://${process.env.REACT_APP_MigrationPythonAPIHost}/tasksByMigMethod?migrationMethod=`+this.state.migrationMethod;
if( (this.state.transPathWay != '') && (this.state.migrationMethod != '') ) {
				url = `http://${process.env.REACT_APP_MigrationPythonAPIHost}/tasksByMigMethodandTransPath?transPath=`+this.state.transPathWay + "&migrationMethod=" +this.state.migrationMethod;
			} else if(this.state.transPathWay != ''){
				url = `http://${process.env.REACT_APP_MigrationPythonAPIHost}/tasks?transPath=`+this.state.transPathWay;	
			}
		//url = "http://localhost:8090/regions";
		//alert("You are submitting provider:" + this.state.vm_name);
		//alert('submitting to url: '+url);
		//var totalCost = 0.0;
		//this.state.EffortInManHrs.map(effort => totalCost  = totalCost + Number(effort) * Number(this.state.CostPerHr) );
		//alert(totalCost);
		//var taskCreationPayload = JSON.stringify({"migrationMethodId": Number(this.state.rand), "migrationMethod": //this.state.migrationMethod, "transPathWay": this.state.transPathWay, "sub-tasks": this.state.subtasks,  "effort In Man Hrs": //this.state.EffortInManHrs, "cost per hr": Number(this.state.CostPerHr), "Total Migration Cost": totalCost  });
		//var modifiedtaskCreationPayload = taskCreationPayload.replace(/"/gi, '\\"');
		//alert(taskCreationPayload);
		
		this.setState({ loading: true }, () => { axios({
			method: 'GET',
			url: url,
			headers: { 'Accept': 'application/json','Content-Type': 'text/plain' }
			
		})
			.then((response) => {
				//handle success
				this.setState({ loading: false });
				console.log(response);
				console.log(`Status: ${response.status}`)
				console.log(`${response}`);
				const vmCreationDtl = response.data;
				const statusCode = response.status;
				//alert(JSON.stringify(response));
				//alert(`response: ${JSON.stringify(response["data"])}`);
				var runningCost = JSON.stringify(response["data"]);
				
				//alert(`response: ${runningCost}`);
				//var data1 = response["data"][0];
				
 				//document.getElementById("migrationMethod").setValue( response["data"][0]["migrationMethod"]);
				this.setState({ priceDetail: runningCost,  view: 'response'  });
				//alert(this.state.priceDetail);
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
	myChangeHandler10 = (event) => {
		
		this.setState({migrationMethod: event.target.value });
		
		
	}
	myChangeHandler11 = (event) => {
		
		this.setState({transPathWay: event.target.value });
		
		
	}
	

	render() {
		
		
		
      			return(
			
				<div>

					<header>
						<title>Cost per Application per Hour</title>
						<h1>Migration Cost per Appln to Any Container as a Service (CaaS) Platform</h1>
					</header>
					<form id="inputform" onSubmit={this.handleSubmitForSearch}>
						<h1>Search For Migration Cost</h1>
					   <table class="searchTable">
						<tr> <th> Search by Migration Method: </th><td><select name='migrationMethod' onChange={this.myChangeHandler10}>
										<option value=''>Please select a Migration Method</option>
										<option value='CI/CD Pipeline through Gitlabs'>CI/CD Pipeline through Gitlabs</option>
										<option value='Automation through Infrastructure as Code - Terraform'>Automation through Infrastructure as Code - Terraform</option>
										<option value='Manually through Creating Services'>Manual through Creating Services</option>

										
									</select></td>
<th> Search by Transformation Pathway: </th>
<td>              <select name='transPathWay' onChange={this.myChangeHandler11}>
	      								<option value=''>Please select the  Transformation Path Way</option>
	         							<option value='Refactor'>Refactor</option>
	         							<option value='Rewrite'>Rewrite-Modernization</option>
	         							<option value='Rehost'>Rehost</option>
	         							<option value='Retire'>Retire</option>
	      							  </select>
</td>
<td><button type="submit"><i class="fa fa-search"></i></button></td></tr>
					   </table>
					</form>

					<form id="inputform" onSubmit={this.handleSubmit}>
						<table>
							
							<tr>
								<th>Migration Method</th>
								<td>
									<select name='migrationMethod' onChange={this.myChangeHandler4}>
										<option value=''>Please select a Migration Method</option>
										<option value='CI/CD Pipeline through Gitlabs'>CI/CD Pipeline through Gitlabs</option>
										<option value='Automation through Infrastructure as Code - Terraform'>Automation through Infrastructure as Code - Terraform</option>
										<option value='Manually through Creating Services'>Manual through Creating Services</option>
										
									</select>
								</td>
								<th> Transformation Path Way: </th>
	    							<td>
	      							  <select name='transPathWay' onChange={this.myChangeHandler5}>
	      								<option value=''>Please select the  Transformation Path Way</option>
	         							<option value='Refactor'>Refactor</option>
	         							<option value='Rewrite'>Rewrite-Modernization</option>
	         							<option value='Rehost'>Rehost</option>
	         							<option value='Retire'>Retire</option>
	      							  </select>
	    							</td>
							</tr>
							<tr>
								<th> Enter the Task of Migration: </th>
								<td>    <input name="task" id="task" type="text" onChange={this.myChangeHandler} />
								</td>
								<th> Enter the sub-tasks: </th>
								<td>    <input name="subtask" id="subtask" type="text"  onChange={this.myChangeHandler6}/>
	      								
								</td>
								<td><button type='button' id='add' onClick={this.myChangeHandler2} >add to list</button></td>
								
								
							</tr>
							<tr>
								<th>Added sub-tasks:</th>
								<td><ul>{this.state.subtasks.map(subtask => (
    <li>{subtask}</li>
  ))}</ul></td>
							</tr>
							<tr>
								<th> Enter the effort In Man Hrs for each task in order: </th>
								<td> <input name="effort In Man Hrs" id="effort In Man Hrs" type="text"/>
								</td>
<td><button type='button' id='add' onClick={this.myChangeHandler8} >add to list</button></td>
<th>Added Effort In Man hrs:</th>
								<td><ul>{this.state.EffortInManHrs.map(effort => (
    <li>{effort}</li>
  ))}</ul></td>
								</tr>
								
								<tr>
								<th> Enter the cost per hr: </th>
								<td>
									<input name="cost per hr" id="cost per hr" type="text" onChange={this.myChangeHandler3} />
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
      <table><tr><td><textarea rows="9" cols="180">{this.state.priceDetail}</textarea></td></tr></table>
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

export default MigrationCost;
