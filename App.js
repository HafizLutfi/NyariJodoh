import React, { Component } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Login from "./src/page/Login";
import Menu from "./src/page/Menu";
import Register from "./src/page/Register";
import { Provider } from "react-redux";
import store from "./src/redux/Store";
import MainMenu from "./src/page/MainMenu";
import Camera from "./src/page/Camera";
import DataCalon from "./src/page/DataCalon";
import PilihCalon from "./src/page/PilihCalon";
import DetailCalon from "./src/page/DetailCalon";

const Stack = createStackNavigator();

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: "#ff1493" }, headerTitleStyle: { color: "white" } }} />
            <Stack.Screen name="Register" component={Register} options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: "#ff1493" }, headerTitleStyle: { color: "white" } }} />
            <Stack.Screen name="MainMenu" component={MainMenu} options={{ headerShown: false }} />
            <Stack.Screen name="Camera" component={Camera} options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: "#ff1493" }, headerTitleStyle: { color: "white" } }} />
            <Stack.Screen name="DataCalon" component={DataCalon} options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: "#ff1493" }, headerTitleStyle: { color: "white" } }} />
            <Stack.Screen name="PilihCalon" component={PilihCalon} options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: "#ff1493" }, headerTitleStyle: { color: "white" } }} />
            <Stack.Screen name="DetailCalon" component={DetailCalon} options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: "#ff1493" }, headerTitleStyle: { color: "white" } }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
