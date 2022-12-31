import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.welcomeText}>Hello</Text>
        <Text style={styles.subtitleText}>my name is</Text>

        <View style={[styles.box, styles.shadowProp]}>
          <Text style={styles.boxText}>
            Yared 🍵🍪 (
            <Text style={styles.gender}>
              ♂️<Text style={styles.ring}>💍</Text>
            </Text>
            )
          </Text>
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f00",
    alignItems: "center",
    justifyContent: "center",
  },

  safeArea: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  welcomeText: {
    fontSize: 90,
    fontFamily: "Georgia",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  subtitleText: {
    fontSize: 30,
    fontFamily: "Verdana",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
    textTransform: "uppercase",
  },

  box: {
    width: "100%",
    minWidth: "100%",
    height: "55%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
  },

  boxText: {
    fontSize: 60,
    fontFamily: "Georgia",
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "#D2C1B0",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
  },

  gender: {
    fontSize: 70,
    /*color: "#A0D278",
     */
    color: "#95D4FB",
    textShadowOffset: { width: -3, height: -3 },
    textShadowRadius: 3,
  },

  ring: {
    fontSize: 50,
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
