import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  StatusBar,
  Image,
  Alert,
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
      onPress={props.action}
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
                bottom: -51,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
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
                  {props.eta}
                  {"\n"}mins
                </Text>
              </View>

              <View
                style={{
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 16 }}>{props.stars}</Text>
              </View>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginBottom: 5,
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

const MenuScreen = ({ route }) => {
  return (
    <ScrollView
      style={{
        height: "100%",
      }}
    >
      <TableView>
        {route.params.items.map((item, i) => {
          return (
            <Section
              key={"sec_" + i}
              header={item.title}
              separatorTintColor="#ccc"
            >
              {item.contents.map((content, j) => {
                return (
                  <Cell
                    key={"cell_" + j}
                    cellStyle="RightDetail"
                    title={content.title}
                    isDisabled={content.outOfStock}
                    detail={content.outOfStock == true ? "Out of Stock" : ""}
                    onPress={() =>
                      Alert.alert(
                        content.title,
                        "'" + content.title + "' added to cart"
                      )
                    }
                    accessory={
                      content.info == true
                        ? "DetailDisclosure"
                        : content.disclosure == true
                        ? "DisclosureIndicator"
                        : ""
                    }
                    image={
                      content.outOfStock == true ? (
                        <Image
                          style={{
                            borderRadius: 5,
                            opacity: 0.5,
                          }}
                          source={require("./images/affogatomainimage_td8k5c.jpg")}
                        />
                      ) : (
                        <Image
                          style={{
                            borderRadius: 5,
                          }}
                          source={require("./images/affogatomainimage_td8k5c.jpg")}
                        />
                      )
                    }
                  />
                );
              })}
            </Section>
          );
        })}
      </TableView>
      <StatusBar />
    </ScrollView>
  );
};

const RestaurantsScreen = ({ navigation }) => {
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
          //hideSeparator={sectionHideSeparator}
        >
          <HomeScreenCell
            title="Joe's Gelato"
            tagline="Desert, Ice cream, £££"
            eta="10-30"
            stars="★★★★"
            imgUri={require("./images/affogatomainimage_td8k5c.jpg")}
            action={() =>
              navigation.navigate("Menu", {
                items: [
                  {
                    title: "Gelato",
                    contents: [
                      { title: "Vanilla", info: true },
                      { title: "Chocolate", outOfStock: true },
                      { title: "Mint", disclosure: true },
                    ],
                  },
                  {
                    title: "Coffee",
                    contents: [
                      { title: "Flat white", outOfStock: true },
                      { title: "Latte" },
                      { title: "Caffè Americano", info: true },
                    ],
                  },
                ],
              })
            }
          ></HomeScreenCell>

          <HomeScreenCell
            title="Joe's Diner"
            tagline="American, Burgers, ££"
            eta="50+"
            stars="★★★"
            imgUri={require("./images/SEO_fot_amerik2_21-07.jpg")}
            action={() =>
              navigation.navigate("Menu", {
                items: [
                  {
                    title: "Burger",
                    contents: [
                      { title: "Big Mac" },
                      { title: "Hamburger" },
                      { title: "Cheeseburger" },
                    ],
                  },
                  {
                    title: "Coffee",
                    contents: [
                      { title: "Flat white" },
                      { title: "Latte" },
                      { title: "Caffè Americano" },
                    ],
                  },
                ],
              })
            }
          ></HomeScreenCell>
          <HomeScreenCell
            title="Joe's Waffle"
            tagline="Waffle, Muffins, ££"
            eta="20+"
            stars="★★★★★"
            imgUri={require("./images/waffle.jpg")}
            action={() =>
              navigation.navigate("Menu", {
                items: [
                  {
                    title: "Waffle",
                    contents: [
                      { title: "Creme Waffle" },
                      { title: "Waffle Chocolate" },
                      { title: "Belgian Waffle" },
                    ],
                  },
                  {
                    title: "Coffee",
                    contents: [
                      { title: "Flat white" },
                      { title: "Latte" },
                      { title: "Caffè Americano" },
                    ],
                  },
                ],
              })
            }
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
