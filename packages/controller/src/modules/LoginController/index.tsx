import * as React from "react";
import gql from "graphql-tag";
import {
  ChildMutateProps,
  graphql, withApollo,
  WithApolloClient
} from "react-apollo";
//
import {LoginMutation, LoginMutationVariables} from './__generated__/LoginMutation'
import { normalizeErrors } from '../../utils/normalizeErrors';

interface Props {
  children: (
    data: { submit: (values: LoginMutationVariables) => Promise<null> }
  ) => JSX.Element | null;
}

class C2 extends React.PureComponent<ChildMutateProps<
  WithApolloClient<Props>,
  LoginMutation,
  LoginMutationVariables
  >> {
  submit = async (values: any) => {
    console.log(values);
    const { data: { login } } = await this.props.mutate({
      variables: values
    }) as any;
    if(login && login.errors) {
      return normalizeErrors(login.errors)
    }
    await this.props.client.resetStore();
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit as any });
  }
}

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        path
        message
      }
      sessionId
    }
  }
`;

export const LoginController = graphql<
  Props,
  LoginMutation,
  LoginMutationVariables
  >(loginMutation)(withApollo<Props>(C2 as any));
