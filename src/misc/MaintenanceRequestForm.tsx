import React, { ChangeEvent, Component, FormEvent } from "react";

import Form from "../components/Form";
import Input from "../components/Input";
import Logo from "../components/Logo";
// tslint:disable-next-line:max-line-length
import { logoContainer, navGroup, noPadContainer, plainFooter, plainTopbar, textMiddle } from "../emotion-styles/src/topbar";

type Inputs = "email" | "shortdescription";

class MaintenanceRequestForm extends Component<{}, { [input in Inputs]?: string }> {
  public state = {
    email: "",
    shortdescription: "",
  };

  public handleSubmit = async (event: FormEvent) => {
    if (this.state.shortdescription !== "") {
      window.location.href = window.location.origin + "/status.html";
    } else {
     // TODO: error handling
    }
  }

  public handleInputChange = (input: Inputs) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [input]: event.target.value });
  }

  public render() {
    const { shortdescription, email } = this.state;
    return (
        <>
          <div className={plainTopbar}>
            <div className={navGroup}>
            <div className={logoContainer}>
              <Logo type="qr-light"/>
            </div>
            </div>
              <p className={textMiddle}>Maintenance Report</p>
            </div>
          <div className={noPadContainer}>
            <Form onSubmit={this.handleSubmit} submitText="Send maintenance report">
              <h3>Avaruuskuilu 3, laundy machine 1</h3>
              <p>Hey! <br/>
              It seems that you have scanned maintenance card. Is the appliance malfunction?
              No wories. Fill out the following form and HAOS will be informaed. We'll make
              sure together that you'll be able to use the appliance soon!
              </p>
              <Input
                name="shortdescription"
                onChange={this.handleInputChange("shortdescription")}
                placeholder="Short description of the problem"
                required={true}
                value={shortdescription}
              />
              <p>Click here to add photo</p>
              <p>Leave your email address if you want to be informed when the appliance is functioning again.</p>
              <Input
                name="email"
                onChange={this.handleInputChange("email")}
                value={email}
                placeholder="Email address"
              />
            </Form>
          </div>
          <div className={plainFooter}>
            <div className={logoContainer}>
              <Logo type="light" />
            </div>
            <div>
              <a href="#">Our Website</a>
            </div>
            <div>
              <ul>Teletappimaa 1 A 24</ul>
              <ul>02150 Espoolandia</ul>
              <ul>Finland</ul>
            </div>
          </div>
        </>
    );
  }
}

export default MaintenanceRequestForm;
