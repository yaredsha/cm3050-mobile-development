import React, { Component } from "react";
import { Text, Alert, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyRentalComponent from "./MyRentalComponent";
import MyBookingsComponent from "./MyBookingsComponent";
import MyProfileComponent from "./MyProfileComponent";

import { getBookings, saveBooking } from "./MyBookingService";
import { getProfile } from "./MyProfileService";

const Tab = createBottomTabNavigator();

class MyTabsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingsCount: 0,
      saveProfilePressed: false,
    };
  }

  /**
   * We can't use await inside a construtor.
   * So we use await inside componentDidMount event
   */
  componentDidMount = async () => {
    await this.updateBookingsCount();
  };

  bookingPressed = async (booking) => {
    const profile = await getProfile();
    if (profile && Object.keys(profile).length > 0) {
      await saveBooking({ carId: booking });
      await this.updateBookingsCount();
    } else {
      Alert.alert("Please update your profile before booking!");
    }
  };

  updateBookingsCount = async () => {
    const bookings = await getBookings();
    this.setState({ bookingsCount: bookings.length });
  };

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Rental"
        screenOptions={{
          tabBarActiveTintColor: "#fff",
        }}
      >
        <Tab.Screen
          name="Rental"
          children={() => (
            <MyRentalComponent
              onBookingPressed={async (value) =>
                await this.bookingPressed(value)
              }
            />
          )}
          options={{
            tabBarLabel: "Rental",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="car-key"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bookings"
          children={() => (
            <MyBookingsComponent
              onBookingDeleted={async () => await this.updateBookingsCount()}
            />
          )}
          options={{
            tabBarLabel: "Bookings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="clipboard-list-outline"
                color={color}
                size={size}
              />
            ),
            tabBarBadge:
              this.state.bookingsCount > 0
                ? this.state.bookingsCount
                : undefined,
          }}
        />
        <Tab.Screen
          name="Profile"
          children={() => (
            <MyProfileComponent
              isSaveProfilePressed={this.state.saveProfilePressed}
            />
          )}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => this.setState({ saveProfilePressed: true })}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default MyTabsComponent;
