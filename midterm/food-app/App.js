import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";

const Stack = createStackNavigator();

const HomeScreenCell = (props) => {
  return (
    <Cell
      backgroundColor="transparent"
      cellStyle="Basic"
      highlightUnderlayColor="#ccc"
      cellContentView={
        <View
          style={{
            flex: 1,
            height: 290,
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              height: "74%",
            }}
          >
            <ImageBackground
              style={{
                height: "100%",
              }}
              imageStyle={{ borderRadius: 6 }}
              source={props.imgUri}
            ></ImageBackground>

            <View
              style={{
                position: "absolute",
                right: 20,
                bottom: -26,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 30,
                padding: 10,
                width: 90,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  flexWrap: "wrap",
                  width: 60,
                  textAlign: "center",
                }}
              >
                {props.eta}mins
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginBottom: 10,
                  paddingTop: 10,
                }}
              >
                {props.title}
              </Text>
              <Text style={{ fontSize: 15, color: "#5B5B5B" }}>
                {props.tagline}
              </Text>
            </View>
          </View>
        </View>
      }
    />
  );
};

const MenuScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HomeScreen</Text>
    </View>
  );
};

const RestaurantsScreen = (props) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        height: "100%",
      }}
    >
      <TableView
        style={{
          flex: 1,
        }}
      >
        <Section
          style={{
            flex: 1,
            alignItems: "center",
          }}
          name=""
          separatorTintColor="#ccc"
          hideSeparator={props.sectionHideSeparator}
        >
          <HomeScreenCell
            title="Joe's Gelato"
            tagline="Desert, Ice cream, £££"
            eta="10-30"
            imgUri={require("./assets/affogatomainimage_td8k5c.jpg")}
          ></HomeScreenCell>
        </Section>
      </TableView>
      <StatusBar />
    </ScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
