import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.container, styles.saveArea]}>
        <View style={styles.row}>
          <View style={[styles.box, styles.borderRight, styles.borderBottom]}>
            <Text style={styles.text}>o</Text>
          </View>
          <View style={[styles.box, styles.borderRight, styles.borderBottom]}>
            <Text style={styles.text}>o</Text>
          </View>
          <View style={[styles.box, styles.borderBottom]}>
            <Text style={styles.text}>x</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.box, styles.borderRight, styles.borderBottom]}>
            <Text style={styles.text}>x</Text>
          </View>
          <View style={[styles.box, styles.borderRight, styles.borderBottom]}>
            <Text style={styles.text}>o</Text>
          </View>
          <View style={[styles.box, styles.borderBottom]}>
            <Text style={styles.text}>o</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.box, styles.borderRight]}>
            <Text style={styles.text}>x</Text>
          </View>
          <View style={[styles.box, styles.borderRight]}>
            <Text style={styles.text}>x</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>o</Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  saveArea: {
    margin: 30,
  },

  row: {
    flexDirection: "row",
  },

  box: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E8F5FF",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  text: {
    color: "#B5D0E2",
    fontSize: 100,
    fontWeight: "500",
    lineHeight: 100,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 7,
  },

  borderRight: {
    borderRightWidth: 6,
    borderRightColor: "#D5E1EA",
  },

  borderBottom: {
    borderBottomWidth: 6,
    borderBottomColor: "#D5E1EA",
  },
});
