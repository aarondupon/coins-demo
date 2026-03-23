import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox } from "@/components/checkbox";

export default function Index() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Checkbox
        value={checked}
        onValueChange={setChecked}
        label="Demo checkbox"
        description="Tap to toggle"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
