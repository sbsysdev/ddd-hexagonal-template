import React from "react";
import { View } from "react-native";
import { useSignInView } from "./useSignInView.hook";
import { signInStyles } from "./sign-in.styles";

export function SignInView() {
  const { errors, handleSignInSubmit } = useSignInView();

  return <View style={signInStyles.wrapper}></View>;
}
