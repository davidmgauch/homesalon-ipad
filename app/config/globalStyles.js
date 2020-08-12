import React, { Component } from "react";
import { StyleSheet } from "react-native";

hotspotColor = "red";
hotspotOpacity = 0;
hotspotActiveOpacity = 0;

teachingDotPosition = "absolute";
teachingDotColor = "#00A2FF";
teachingDotOpacity = 1;
teachingDotWidth = 10;
teachingDotHeight = 10;
teachingDotRadius = 10;

buttonDotPosition = "absolute";
buttonDotTop = 0;
buttonDotLeft = 560;
buttonDotWidth = 250;
buttonDotHeight = 100;

module.exports = StyleSheet.create({
  backButtonPosition: {
    opacity: hotspotActiveOpacity,
    position: "absolute",
    left: 0,
    top: 0,
    height: 150,
    width: 150,
    backgroundColor: hotspotColor
  }
});
