import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [apiResponse, setApiResponse] = useState("");
  useEffect(() => {
    async function api_content() {
      const response = await fetch(
        // Make this YOUR URL
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/11355?unitGroup=metric&key=PJY051BB1KI1ZD9044U4MPM2P&contentType=json",
        {}
      );
      const json = await response.json();
      return json;
    }

    api_content().then((days) => {
      console.log(days);
      setApiResponse(JSON.parse(days));
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>welcome to the Forecast Frequencies app!!</Text>
      {/* {apiResponse?.days((daily) => (
        <>
          <Text>{daily.datetime}</Text> <Text>{daily.temp}</Text>
        </>
      ))} */}
      <Text>{apiResponse?.address}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
