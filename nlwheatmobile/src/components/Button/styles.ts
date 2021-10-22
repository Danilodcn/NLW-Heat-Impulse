import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
  },
  icon: {
    marginRight: 12,
  },
});
