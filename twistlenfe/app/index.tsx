import "../global.css";
import { ActivityIndicator, Text, View} from "react-native";
import RealEstateLanding from "@/components/src/organisms/RealEstateLanding/RealEstateLanding";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
        <RealEstateLanding />
      )}
    </View>
  );
}