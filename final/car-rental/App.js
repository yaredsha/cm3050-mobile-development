import React, { useState } from "react";
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

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import DateTimePicker from "@react-native-community/datetimepicker";

import data from "./Data";
import { saveProfile, getProfile, deleteProfile } from "./Profile";
import {
  getBookings,
  saveBooking,
  deleteBooking,
  deleteAllBookings,
} from "./Booking";

const cellHeight = Dimensions.get("window").height / 4.6;

const HomeScreenCell = (props) => {
  return (
    <Cell
      backgroundColor="transparent"
      cellStyle="Basic"
      hideSeparator={true}
      highlightUnderlayColor="#131313"
      onPress={props.action}
      cellContentView={
        <View
          style={{
            flex: 1,
            marginBottom: 30,
            paddingTop: 20,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{props.model}</Text>
            <Text>{props.automatic ? "Automatic" : "Manual"}</Text>
            <Text>{props.electric ? "Electric" : "Fuel"}</Text>
            <Text>Seats {props.seats}</Text>
          </View>

          <ImageBackground
            style={{ height: cellHeight }}
            imageStyle={{ resizeMode: "cover" }}
            source={props.img}
          ></ImageBackground>
        </View>
      }
    />
  );
};

const RentalScreen = ({ route, navigation }) => {
  return (
    <ScrollView
      style={{ backgroundColor: "#2D2D2D" }}

      //style={{ backgroundColor: "#121212" }}
      //style={styles.scrollView}
    >
      <TableView
        appearance="dark" //style={styles.restaurantsScreenTableView}
      >
        <Section
          hideSeparator={true}
          //style={styles.restaurantsScreenSection}
          //name=""
          //hideSeparator={route.params.sectionHideSeparator}
          //separatorTintColor={route.params.sectionSeparatorTintColor}
        >
          {data.cars.map((car, i) => {
            return (
              <HomeScreenCell
                key={"hs_" + i}
                id={car.id}
                model={car.model}
                automatic={car.automatic}
                electric={car.electric}
                category={car.category}
                seats={car.seats}
                img={car.img}
                action={() =>
                  navigation.navigate("Bookings", {
                    car: car,
                  })
                }
              ></HomeScreenCell>
            );
          })}
        </Section>
      </TableView>
      <StatusBar />
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();

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

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Rental"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        //tabBarActiveBackgroundColor: "#121212",
        //tabBarInactiveBackgroundColor: "#121212",
      }}
    >
      <Tab.Screen
        name="Rental"
        component={RentalScreen}
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

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <MyTabs />
    </NavigationContainer>
  );
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
