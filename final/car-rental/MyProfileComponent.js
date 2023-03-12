import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";

import { ScrollView } from "react-native";
import { Section, TableView } from "react-native-tableview-simple";

import MyProfileCellComponent from "./MyProfileCellComponent";

import { getProfile, saveProfile } from "./MyProfileService";

const emptyProfile = {
  email: "",
  name: "",
  phoneNumber: "",
  street: "",
  postalCode: "",
  city: "",
};

const emptyProfileJson = JSON.stringify(emptyProfile);

class MyProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...emptyProfile,
    };
  }

  /**
   * We can't use await inside a construtor.
   * So we use await inside componentDidUpdate event
   */
  componentDidMount = async () => {
    const profile = await getProfile();
    if (profile && Object.keys(profile).length > 0) {
      this.setState({ ...profile });
    }
  };

  /**
   * This is just to watch the save button press event
   */
  componentDidUpdate = async () => {
    if (this.props.isSaveProfilePressed === true) {
      const profile =
        emptyProfileJson === JSON.stringify(this.state)
          ? {}
          : { ...this.state };
      await saveProfile(profile);
    }
  };

  render() {
    return (
      <ScrollView>
        <TableView appearance="dark">
          <Section
            header={"Update your profile"}
            headerTextStyle={{ fontSize: 18 }}
          >
            <MyProfileCellComponent
              name="Email"
              value={this.state.email}
              icon="email-outline"
              onChangeText={(value) => this.setState({ email: value })}
            />
            <MyProfileCellComponent
              name="Name"
              value={this.state.name}
              icon="account"
              onChangeText={(value) => this.setState({ name: value })}
            />

            <MyProfileCellComponent
              name="Phone number"
              value={this.state.phoneNumber}
              icon="phone"
              onChangeText={(value) => this.setState({ phoneNumber: value })}
            />
            <MyProfileCellComponent
              name="Street"
              value={this.state.street}
              icon="map-marker-outline"
              onChangeText={(value) => this.setState({ street: value })}
            />
            <MyProfileCellComponent
              name="Postal code"
              value={this.state.postalCode}
              icon="map-marker"
              onChangeText={(value) => this.setState({ postalCode: value })}
            />
            <MyProfileCellComponent
              name="City"
              value={this.state.city}
              icon="city"
              onChangeText={(value) => this.setState({ city: value })}
            />
          </Section>
        </TableView>
        <StatusBar />
      </ScrollView>
    );
  }
}

export default MyProfileComponent;
