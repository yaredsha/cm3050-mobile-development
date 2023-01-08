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

const restaurants = [
  {
    title: "Joe's Gelato",
    tagline: "Desert, Ice cream, £££",
    eta: "10-30",
    stars: "★★★★☆",
    distance: 1.5,
    imgUri: require("./assets/affogatomainimage_td8k5c.jpg"),
    items: [
      {
        title: "Gelato",
        contents: [
          {
            title: "Vanilla",
            info: true,
            price: 3.55,
            img: require("./assets/vanilla.jpg"),
          },
          {
            title: "Chocolate",
            price: 3.69,
            img: require("./assets/chocolate.jpg"),
          },
          {
            title: "Mint",
            price: 4.65,
            img: require("./assets/mint.jpg"),
          },
        ],
      },
      {
        title: "Coffee",
        contents: [
          {
            title: "Flat white",
            outOfStock: true,
            price: 1.59,
            img: require("./assets/flat-white.jpg"),
          },
          {
            title: "Latte",
            price: 2.05,
            img: require("./assets/latte.jpg"),
          },
          {
            title: "Caffè Americano",
            info: true,
            price: 3.05,
            img: require("./assets/americano.jpg"),
          },
        ],
      },
    ],
  },
  {
    title: "Joe's Diner",
    tagline: "American, Burgers, ££",
    eta: "50+",
    stars: "★★★☆☆",
    distance: 3,
    imgUri: require("./assets/SEO_fot_amerik2_21-07.jpg"),
    items: [
      {
        title: "Burger",
        contents: [
          {
            title: "Big Foot",
            price: 4.55,
            img: require("./assets/big-foot.jpg"),
          },
          {
            title: "Hamburger XBacon",
            price: 2.69,
            img: require("./assets/hamburger-xbacon.jpg"),
          },
          {
            title: "Caramelized Onion",
            price: 2.75,
            img: require("./assets/caramelized-onion.jpg"),
            info: true,
          },
        ],
      },
      {
        title: "Coffee",
        contents: [
          {
            title: "Flat white",
            outOfStock: true,
            price: 1.75,
            img: require("./assets/flat-white.jpg"),
          },
          {
            title: "Latte",
            price: 2.55,
            img: require("./assets/latte.jpg"),
          },
          {
            title: "Caffè Americano",
            price: 3.05,
            img: require("./assets/americano.jpg"),
            info: true,
          },
        ],
      },
    ],
  },
  {
    title: "Joe's Waffle",
    tagline: "Waffle, Muffins, ££",
    eta: "20+",
    stars: "★★★☆☆",
    distance: 4.5,
    imgUri: require("./assets/waffle.jpg"),
    items: [
      {
        title: "Waffle",
        contents: [
          {
            title: "Waffle Fruit",
            price: 5.49,
            img: require("./assets/waffle-fruit.jpg"),
          },
          {
            title: "Waffle Chocolate",
            price: 5.55,
            img: require("./assets/waffle-chocolate.jpg"),
          },
          {
            title: "Belgian Waffle",
            price: 6.05,
            img: require("./assets/belgian-waffle.jpg"),
            outOfStock: true,
          },
        ],
      },
      {
        title: "Coffee",
        contents: [
          {
            title: "Flat white",
            price: 1.65,
            img: require("./assets/flat-white.jpg"),
            info: true,
          },
          {
            title: "Latte",
            price: 1.99,
            img: require("./assets/latte.jpg"),
          },
          {
            title: "Caffè Americano",
            price: 2.09,
            img: require("./assets/americano.jpg"),
          },
        ],
      },
    ],
  },
];

const HomeScreenCell = (props) => {
  return (
    <Cell
      backgroundColor="transparent"
      cellStyle="Basic"
      highlightUnderlayColor="#ccc"
      onPress={props.action}
      cellContentView={
        <View style={styles.homeScreenCell}>
          <View style={styles.homeScreenCellContainer}>
            <ImageBackground
              style={styles.homeScreenCellBgImage}
              imageStyle={styles.homeScreenCellBgImageStyle}
              source={props.imgUri}
            ></ImageBackground>
            <View style={styles.homeScreenCellDistance}>
              <Text style={styles.homeScreenCellDistanceText}>
                📍 {props.distance}km
              </Text>
            </View>

            <View style={styles.homeScreenCellEtaStar}>
              <View style={styles.homeScreenCellEta}>
                <Text style={styles.homeScreenCellEtaText}>
                  {props.eta}
                  {"\n"}mins
                </Text>
              </View>

              <View style={styles.homeScreenCellStar}>
                <Text style={styles.homeScreenCellStarText}>{props.stars}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.homeScreenCellTitle}>{props.title}</Text>
              <Text style={styles.homeScreenCellTagline}>{props.tagline}</Text>
            </View>
          </View>
        </View>
      }
    />
  );
};

const MenuScreen = ({ route }) => {
  return (
    <ScrollView style={styles.scrollView}>
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
                    backgroundColor="#fff"
                    titleTextColor="#000"
                    key={"cell_" + j}
                    cellStyle="RightDetail"
                    title={content.title}
                    isDisabled={content.outOfStock}
                    accessory={content.info == true ? "DetailDisclosure" : ""}
                    detail={
                      content.info == true
                        ? ""
                        : content.outOfStock == true
                        ? "Out of Stock"
                        : "£" + content.price
                    }
                    onPress={() =>
                      Alert.alert(
                        content.title,
                        "'" + content.title + "' added to cart"
                      )
                    }
                    image={
                      <Image
                        style={{
                          borderRadius: 5,
                          opacity: content.outOfStock == true ? 0.5 : 1,
                        }}
                        source={content.img}
                      />
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

const RestaurantsScreen = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.scrollView}>
      <TableView style={styles.restaurantsScreenTableView}>
        <Section
          style={styles.restaurantsScreenSection}
          name=""
          hideSeparator={route.params.sectionHideSeparator}
          separatorTintColor={route.params.sectionSeparatorTintColor}
        >
          {restaurants.map((restaurant, i) => {
            return (
              <HomeScreenCell
                key={"hs_" + i}
                title={restaurant.title}
                tagline={restaurant.tagline}
                eta={restaurant.eta}
                stars={restaurant.stars}
                distance={restaurant.distance}
                imgUri={restaurant.imgUri}
                action={() =>
                  navigation.navigate("Menu", {
                    items: restaurant.items,
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Restaurants">
        <Stack.Screen
          name="Restaurants"
          component={RestaurantsScreen}
          initialParams={{
            sectionHideSeparator: true,
            sectionSeparatorTintColor: "#ccc",
          }}
        />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeScreenCell: {
    flex: 1,
    height: 290,
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  homeScreenCellContainer: {
    height: "70%",
  },

  homeScreenCellBgImage: {
    height: "100%",
  },

  homeScreenCellBgImageStyle: {
    borderRadius: 6,
  },

  homeScreenCellDistance: {
    position: "absolute",
    bottom: 10,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AFAFAF",
    opacity: 0.7,
    padding: 4,
    borderRadius: 6,
  },

  homeScreenCellDistanceText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },

  homeScreenCellEtaStar: {
    position: "absolute",
    right: 20,
    bottom: -52,
    justifyContent: "center",
    alignItems: "center",
  },

  homeScreenCellEta: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    width: 90,
    opacity: 0.9,
  },

  homeScreenCellEtaText: {
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap",
    width: 60,
    textAlign: "center",
  },

  homeScreenCellStar: {
    marginTop: 4,
  },

  homeScreenCellStarText: {
    fontSize: 16,
  },

  homeScreenCellTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    paddingTop: 10,
  },

  homeScreenCellTagline: {
    fontSize: 15,
    color: "#5B5B5B",
  },

  scrollView: {
    flex: 1,
    height: "100%",
  },

  restaurantsScreenTableView: {
    flex: 1,
  },

  restaurantsScreenSection: {
    flex: 1,
    alignItems: "center",
  },
});
