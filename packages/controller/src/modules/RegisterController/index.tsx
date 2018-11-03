import * as React from "react";
import gql from "graphql-tag";
import {ChildMutateProps, graphql} from "react-apollo";
//
import {RegisterMutation, RegisterMutationVariables} from './__generated__/RegisterMutation'

export interface Props {
  children: (
    data: { submit: (values: RegisterMutationVariables) => Promise<null> }
  ) => JSX.Element | null;
}

export class C1 extends React.PureComponent<ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables> > {
  submit = async (values: RegisterMutationVariables) => {
    console.log(values);
    await this.props.mutate({
      variables: values
    });
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

export const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
  >
(registerMutation)(C1);
