import React from "react";
import { Link, withRouter } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { LinkContainer } from 'react-router-bootstrap';
function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Multicloud Pricing Model
          </Link>

         
           
	<DropdownButton id="dropdown-basic-button" title="AWSPricingForApplicationRunning">
		<LinkContainer to="/RDSPriceForm">
  			<Dropdown.Item>RDS Pricing</Dropdown.Item>
		</LinkContainer>
		<LinkContainer to="/EC2PriceForm">
  			<Dropdown.Item>EC2 Pricing</Dropdown.Item>
		</LinkContainer>
		<LinkContainer to="/CostPerApplnForgate">
  			<Dropdown.Item>CostPerApplnForgate</Dropdown.Item>
		</LinkContainer>
		<LinkContainer to="/CostPerApplnEKS">
			<Dropdown.Item>CostPerApplnEKS</Dropdown.Item>
		</LinkContainer>
	</DropdownButton>
	<DropdownButton id="dropdown-basic-button" title="ApplicationMigrationCost">
		
		
		<LinkContainer to="/MigrationCost">
			<Dropdown.Item>MigrationCostForCaaS</Dropdown.Item>
		</LinkContainer>
	</DropdownButton>
	<DropdownButton id="dropdown-basic-button" title="InfrastructureSizing">
		
		
		<LinkContainer to="/KubernetesSizing">
			<Dropdown.Item>OpenKubernetesSizing</Dropdown.Item>
		</LinkContainer>
	</DropdownButton>
         
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
