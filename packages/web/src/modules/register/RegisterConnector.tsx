import * as React from 'react';
import { RegisterController } from "@abb/controller";
//
import {RegisterView} from "./ui/RegisterView";

class RegisterConnector extends React.Component {
  dummySubmit = async (values: any) => {
    console.log(values);
    return null;
  };
  render() {
    return (
      <RegisterController>
        {({ submit }: { submit: any }) => <RegisterView submit={submit} />}
      </RegisterController>
    )
  }
}
export { RegisterConnector }
