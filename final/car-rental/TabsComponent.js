import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RentalComponent from "./RentalComponent";

import { getBookings, saveBooking } from "./BookingService";

const Tab = createBottomTabNavigator();

const Bookings = ({ route }) => {
  return (
    <View>
      <Text>Bookings</Text>
    </View>
  );
};

const Profile = ({ route }) => {
  return (
    <ScrollView style={styles.scrollView}>
      <TableView appearance="dark">
        <Section
          key="sec_1"
          header="Header"
          //separatorTintColor="#2D2D2D"
        >
          <Cell
            //backgroundColor="#fff"
            //titleTextColor="#000"
            key="cell_1"
            cellStyle="RightDetail"
            title="Title"
            isDisabled={false}
            accessory="accessory"
            detail="detail"
            onPress={() => Alert.alert("clicked")}
            image={
              <Image
                style={{
                  borderRadius: 5,
                  opacity: 1,
                }}
                source={require("./assets/waffle-fruit.jpg")}
              />
            }
          />
        </Section>
      </TableView>
      <StatusBar />
    </ScrollView>
  );
};

class TabsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingsCount: 0,
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
    await saveBooking({ carId: booking });
    await this.updateBookingsCount();
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
            <RentalComponent
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
          component={Bookings}
          options={{
            tabBarLabel: "Bookings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="clipboard-list-outline"
                color={color}
                size={size}
              />
            ),
            tabBarBadge: this.state.bookingsCount,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default TabsComponent;
