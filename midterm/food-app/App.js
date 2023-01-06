import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";

const Stack = createStackNavigator();

const HomeScreenCell = (props) => {
  return (
    <Cell
      style={{
        flex: 1,
      }}
      backgroundColor="transparent"
      cellStyle="Basic"
      highlightUnderlayColor="#ccc"
      cellContentView={
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
            height: 290,
          }}
        >
          <View
            style={{
              flex: 9,
              width: "100%",
            }}
          >
            <ImageBackground
              style={{
                height: "95%",
                borderWidth: 0,
              }}
              imageStyle={{ borderRadius: 6 }}
              source={props.imgUri}
            ></ImageBackground>

            <View
              style={{
                position: "absolute",
                right: 20,
                bottom: 0,
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
          </View>
        </View>
      }
    />
  );
};

const MenuScreen = (props) => {
  return (
    <ScrollView
      style={{
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
          }}
          name=""
          hideSeparator={props.sectionHideSeparator}
          sectionTintColor="#ccc"
        >
          <HomeScreenCell
            title="Joe's Gelato"
            tagline="Desert, Ice cream, £££"
            eta="10-30"
            imgUri={require("./assets/emile-mbunzama-cLpdEA23Z44-unsplash.jpg")}
          ></HomeScreenCell>
        </Section>
      </TableView>
    </ScrollView>
  );
};

const RestaurantsScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>RestaurantsScreen</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} hideSeparator="true" />
        <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
});
