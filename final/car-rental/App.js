import React, { Component } from "react";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import MyTabsComponent from "./MyTabsComponent";

export default class App extends Component {
  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <MyTabsComponent />
      </NavigationContainer>
    );
  }
}
