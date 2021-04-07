import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact, Compute, KubernetesSizing, RDSPriceForm, EC2PriceForm, CostPerApplnForgate, CostPerApplnEKS, MigrationCost } from "./Components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/RDSPriceForm" exact component={() => <RDSPriceForm />} />
          <Route path="/EC2PriceForm" exact component={() => <EC2PriceForm />} />
          <Route path="/CostPerApplnForgate" exact component={() => <CostPerApplnForgate />} />
	  <Route path="/CostPerApplnEKS" exact component={() => <CostPerApplnEKS />} />
	  <Route path="/MigrationCost" exact component={() => <MigrationCost />} />
	  <Route path="/KubernetesSizing" exact component={() => <KubernetesSizing />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
