// eslint-disable-next-line
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

//import {Router,Redirect} from 'react-router'

class Compute extends React.Component {


	constructor(props) {
		super(props);
		this.state = { vm_name: '', vm_ip: '', vm_template: '', view: 'terraform', vmCreationDetail: '', rand: '', vm_iso_image: '', guestos: '', vm_cpus: '', loading: false };
		this.handleSubmit = this.handleSubmit.bind(this);
	}




	handleSubmit = (event) => {
		event.preventDefault();
		

		if (this.randvalue == null) {
			
			const rand = Math.floor(Math.random() * 100) + 1;

			this.randvalue = rand;
			this.state.rand = this.randvalue;
		}
		
		
		var url =`http://${process.env.REACT_APP_Terraformizer_Host}/v1/terraform-vsphere-createvm-template/my_workspace` + this.state.rand;
		//alert(url);
		this.state.vm_name = this.state.vm_name + "-" + this.state.rand;
		var createVMPayload = JSON.stringify({ "vm_name": this.state.vm_name, "vm_template_name": this.state.vm_template, "vm_ip": this.state.vm_ip });
		if (this.state.vmcreationoption == 'isoimage') {
			createVMPayload = JSON.stringify({ "vm_name": this.state.vm_name, "vm_image": this.state.vm_iso_image, "vm_cpus": Number(this.state.vm_cpus), "guest_id": this.state.guestos });
			url = `http://${process.env.REACT_APP_Terraformizer_Host}/v1/terraform-vsphere-vmcreation/my_workspace` + this.state.rand;
		}
		
		//modifiedCreateVMPayload = '"'+modifiedCreateVMPayload +'"';
		//alert(modifiedCreateVMPayload);
		//alert('submitting to url: ' + url);
		//alert(createVMPayload);
		
		this.setState({ loading: true }, () => {
			axios({
				method: 'POST',
				url: url,
				data: createVMPayload,
				headers: { 'Content-Type': 'application/json' }
			})
				.then((response) => {
					//handle success
					console.log(response);
					console.log(`Status: ${response.status}`)
					console.log(`${response}`);
					const priceDetail = response.data;
					const statusCode = response.status;
					const vmCreation = JSON.stringify(response.data['stdout'])
					//alert(`response: ${JSON.stringify(response.data)}`);
					//alert(vmCreation);
					this.setState({ vmCreationDetail: vmCreation, view: 'response' });
					this.setState({ loading: false });
					//this.state.view = 'response'
					//alert(this.state.vmCreationDetail);
				})
				.catch((error) => {
					console.log('Got Error...')
					console.log(error)
					this.setState({ loading: false });
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
		event.preventDefault()
		if (this.state.rand == '') {
			const min = 1;
			const max = 100;
			const rand = Math.floor(Math.random() * 100) + 1;
			this.state.rand = rand;
		}
		this.state.rand = this.state.vm_name.substring(this.state.vm_name.lastIndexOf('-') + 1, this.state.vm_name.length);
		//alert(this.state.rand);
		var url = `http://${process.env.REACT_APP_Terraformizer_Host}/v1/terraform-vsphere-createvm-template/my_workspace` + this.state.rand;
		//alert('submitting to url: '+url);
		var deleteVMPayload = JSON.stringify({ "vm_name": this.state.vm_name, "vm_template_name": this.state.vm_template, "vm_ip": this.state.vm_ip });
		//var modifiedDeleteVMPayload = deleteVMPayload.replace(/"/gi, '\\"');
		if (this.state.vmcreationoption == 'isoimage') {
			deleteVMPayload = JSON.stringify({ "vm_name": this.state.vm_name, "vm_image": this.state.vm_iso_image, "vm_cpus": Number(this.state.vm_cpus), "guest_id": this.state.guestos });
			url = `http://${process.env.REACT_APP_Terraformizer_Host}/v1/terraform-vsphere-vmcreation/my_workspace` + this.state.rand;
		}
		//alert(deleteVMPayload);
		

		this.setState({ loading: true }, () => { axios({
			method: 'DELETE',
			url: url,
			data: deleteVMPayload,
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				//handle success

				console.log(response);
				console.log(`Status: ${response.status}`)
				console.log(`${response}`);
				const priceDetail = response.data;
				const statusCode = response.status;
				var vmCreation = JSON.stringify(response.data['stdout'])
				//alert(`response: ${JSON.stringify(response.data)}`);
				//alert(vmCreation);
				this.setState({ vmCreationDetail: vmCreation, view: 'response' });
				this.setState({ loading: false });
				//this.state.view = 'response'
			})
			.catch((error) => {
				this.setState({ loading: false });
				console.log('Got Error...')
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
	myRadioChangeHandler = (event) => {
		this.setState({ vmcreationoption: event.target.value });

	}
	myChangeHandler = (event) => {
		//alert(event.target.value);
		this.setState({ vm_name: event.target.value });

	}

	myChangeHandler2 = (event) => {
		//alert(event.target.value);
		this.setState({ vm_template: event.target.value });
		//alert(this.state.region);
	}
	myChangeHandler3 = (event) => {
		//alert(event.target.value);
		this.setState({ vm_ip: event.target.value });
	}
	myChangeHandler4 = (event) => {
		this.setState({ vm_iso_image: event.target.value });
	}
	myChangeHandler5 = (event) => {
		this.setState({ guestos: event.target.value });
	}
	myChangeHandler6 = (event) => {
		this.setState({ vm_cpus: event.target.value });
	}


	render() {


		return (
			<div>

				<header>
					<title>DTCP VM Creation/Deletion through IaC</title>
					<h1>DTCP Private Cloud VM Creation/Deletion</h1>
					
				</header>

				<form onSubmit={this.handleSubmit} style={{ cursor: 'hand' }}>
					<table>
						<tr>
							<th>Select IaC (Infrastructure as Code) Tool to create compute</th>
							<td>
								<select name='IaCTool' onChange={this.myChangeHandler7}>
									<option value=''>Please select the IaC Tool</option>
									<option value='Terraform'>Terraform</option>
									<option value='Ansible'>Ansible</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>VM Creation Through Template</th>
							<td><input type="radio" value="template" name="group1" onChange={this.myRadioChangeHandler} onclick="onLoad();" /></td>

							<th>VM Creation Through ISO Image</th>
							<td><input type="radio" value="isoimage" name="group1" onChange={this.myRadioChangeHandler} onclick="onLoad();" /></td>
						</tr>
						<tr>
							<th> Enter the VM Name: </th>
							<td>    <input name="vm_name" id="vm_name" type="text" onChange={this.myChangeHandler} />
							</td>
							<th> Select the VM template name </th>
							<td>
								<select name='vm_template' onChange={this.myChangeHandler2} disabled={this.state.vmcreationoption === "isoimage"}>
									<option value=''>Please select the VM template</option>
									<option value='photon-template'>photon-template</option>
									<option value='small-ubuntu'>small-ubuntu</option>
									<option value='centos-medium'>centos-medium</option>

								</select>
							</td>
							<th> Select the VM ISO Image </th>
							<td>
								<select name='vm_iso_image' onChange={this.myChangeHandler4} disabled={this.state.vmcreationoption === "template"}>
									<option value=''>Please select the VM iso image</option>
									<option value='photon-4.0-d98e681.iso'>photon-image</option>
									<option value='ubuntu-20.04.1-live-server-amd64.iso'>ubuntu-image</option>
									<option value='CentOS-7-x86_64-Minimal-2009.iso'>centos-image</option>

								</select>
							</td>
						</tr>
						<tr>


							<th> Guest Operating System Id </th>
							<td> <input type="text" name="guestos" id="guestos" onChange={this.myChangeHandler5} disabled={this.state.vmcreationoption === "template"} /> </td>

							<th> Enter the VM IP Address to Assign: </th>
							<td>
								<input name="vm_ip" id="vm_ip" type="text" onChange={this.myChangeHandler3} disabled={this.state.vmcreationoption === "isoimage"} />
							</td>
							<th> Enter the Number of CPUs to be Assigned: </th>
							<td>
								<input name="vm_cpus" id="vm_cpus" type="text" onChange={this.myChangeHandler6} disabled={this.state.vmcreationoption === "template"} />
							</td>
						</tr>
					</table>


					<button type='submit' disabled={this.state.loading}>Create</button>
					<button type='button' onClick={this.handleClick} style={{ cursor: 'hand' }} disabled={this.state.loading}>Delete</button>



				</form>

				{ this.state.loading ? <LoadingSpinner /> : <table border='1'>

					<tr>
						<td>
							{this.state.vmCreationDetail}
						</td>

					</tr>
				</table>
				}

			</div>

		);


	}
}


export default Compute
