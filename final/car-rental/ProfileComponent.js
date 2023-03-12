import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, TextInput, ScrollView, Image, Alert } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

import ProfileCellComponent from "./ProfileCellComponent";

import { getProfile, saveProfile } from "./ProfileService";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      phoneNumber: "",
      street: "",
      postalCode: "",
      city: "",
    };
  }

  /**
   * We can't use await inside a construtor.
   * So we use await inside componentDidUpdate event
   */
  componentDidMount = async () => {
    const profile = await getProfile();
    console.log("componentDidMount prifle: ", profile);
    if (profile && Object.keys(profile).length > 0) {
      this.setState({ ...profile });
    }
  };

  render() {
    //console.log("prifle: ", this.state.profile);
    return (
      <ScrollView>
        <TableView appearance="dark">
          <Section
            header={"Update your profile"}
            //separatorTintColor="#ccc"
            headerTextStyle={{ fontSize: 16 }}
          >
            <ProfileCellComponent
              name="Email"
              value={this.state.email}
              icon="email-outline"
              onChangeText={(value) => this.setState({ email: value })}
            />
            <ProfileCellComponent
              name="Name"
              value={this.state.name}
              icon="account"
              onChangeText={(value) => this.setState({ name: value })}
            />

            <ProfileCellComponent
              name="Phone number"
              value={this.state.phoneNumber}
              icon="phone"
              onChangeText={(value) => this.setState({ phoneNumber: value })}
            />
            <ProfileCellComponent
              name="Street"
              value={this.state.street}
              icon="map-marker-outline"
              onChangeText={(value) => this.setState({ street: value })}
            />
            <ProfileCellComponent
              name="Postal code"
              value={this.state.postalCode}
              icon="map-marker"
              onChangeText={(value) => this.setState({ postalCode: value })}
            />
            <ProfileCellComponent
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

export default ProfileComponent;
