import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack >
      <Stack.Screen name="login" options={{title: "Login"}}/>
      <Stack.Screen name="register" options={{title: "Register"}} />
    </Stack>
  );
};

export default AuthLayout;
