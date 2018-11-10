import * as React from 'react';
import { LoginController } from "@abb/controller";
//
import {LoginView} from "./ui/LoginView";


class LoginConnector extends React.Component {
  dummySubmit = async (values: any) => {
    console.log(values);
    return null;
  };
  render() {
    return (
      <LoginController>
        {({ submit }: { submit: any }) => <LoginView submit={submit} />}
      </LoginController>
    )
  }
}
export { LoginConnector }
