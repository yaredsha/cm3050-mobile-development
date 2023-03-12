import React, { useState, Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
  Button,
  Dimensions,
} from "react-native";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";

import TabsComponent from "./TabsComponent";

import { saveProfile, getProfile, deleteProfile } from "./ProfileService";
import { getAllCars, getCarsByFilter, getLocations } from "./RentalService";
import {
  getBookings,
  saveBooking,
  deleteBooking,
  deleteAllBookings,
} from "./BookingService";

const Rent = ({ route }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    //setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const showDateTimepicker = () => {
    showMode("datetime");
  };

  return (
    <View>
      <Text>Rent</Text>
      <Image
        style={{
          borderRadius: 5,
          opacity: 1,
          width: "100%",
          // Without height undefined it won't work
          height: undefined,
          // figure out your image aspect ratio
          aspectRatio: 135 / 76,
        }}
        source={require("./assets/car.jpg")}
      />

      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Button
        onPress={showDateTimepicker}
        title="Show date and time picker! (iOS only)"
      />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          //locale="en-US"
          //is24Hour={false}
          onChange={onChange}
        />
      )}
    </View>
  );
};

/*
const MyTabs = async () => {
  const result = await getBookings();
  const [bookingsCount, setBookingsCount] = useState(result);

  return (
    <Tab.Navigator
      initialRouteName="Rental"
      screenOptions={{
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Rental"
        children={() => <RentalComponent onBookingPressed={bookingPressed} />}
        options={{
          tabBarLabel: "Rental",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car-key" color={color} size={size} />
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
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
*/

export default class App extends Component {
  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <TabsComponent />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    flex: 1,
    height: "100%",
  },
});
