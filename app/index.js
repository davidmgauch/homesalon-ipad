import React, { Component } from "react";

import {
  StatusBarIOS,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  FlatList,
  TouchableOpacity,
  Text
} from "react-native";
import { FeedStack } from "./config/router";

const { width, height } = Dimensions.get("window");

const dialogOverlayImages = [
  require("./assets/png/_alexa/Henkel_AlexaIntegration_0009_1a.png"),
  require("./assets/png/_alexa/Henkel_AlexaIntegration_0010_1b.png"),
  require("./assets/png/_alexa/Henkel_AlexaIntegration_0011_1c.png"),
  require("./assets/png/_alexa/Henkel_AlexaIntegration_0012_2.png"),
  require("./assets/png/_alexa/Henkel_AlexaIntegration_0013_3.png"),
  require("./assets/png/_alexa/Henkel_AlexaIntegration_0014_4.png")
];

class App extends Component {
  constructor(props) {
    super(props);
    this.opacity_value = new Animated.Value(0);
    this.state = {
      onFirstLoad: true,
      showAlexaOverlay: false,
      overlayImgSrc: null,
      showUserModal: false,
      currentUser: "1",
      userData: [
        "1",
        "2",
        "3",
        "4",
        "adrian",
        "christian",
        "heiko",
        "jerome",
        "mike",
        "nicola",
        "olaf",
        "thomas"
      ]
    };
  }
  // StatusBarIOS.setStyle('light-content');

  componentDidMount() {
    const url = "https://homesalon.icon-hub.com/api/" + this.state.currentUser;

    fetch(url, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        console.log("fetch", res);
        this.setState({
          data: res,
          error: res.error || null,
          loading: false
        });
        this.runWebSocket();
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  runWebSocket = () => {
    const socket = new WebSocket("wss://homesalon.icon-hub.com");
    socket.onopen = () => {
      console.log("connection opened!!");
      console.log("current user SEND", this.state.currentUser);
      socket.send(JSON.stringify({ name: this.state.currentUser }));
      socket.onmessage = e => {
        // console.log("webSocket Raw Data", e);
        const json = JSON.parse(JSON.parse(e.data));
        const stateId = json.config.stateId;
        // console.log("webSocket stateId", stateId);
        const secondCaseData = json.secondCase;
        console.log("webSocket Data", json);
        if (this.state.onFirstLoad === true) {
          // console.log("Server Start");
          this.setState({
            onFirstLoad: false
          });
        } else {
          if (secondCaseData.stressQuestion === true) {
            Animated.timing(this.opacity_value, {
              toValue: 1,
              duration: 150,
              easing: Easing.ease
            }).start();
            this.setState({
              showAlexaOverlay: true,
              overlayImgSrc: dialogOverlayImages[0]
            });
          }
          if (secondCaseData.sunHatQuestion === true) {
            this.setState({
              overlayImgSrc: dialogOverlayImages[1]
            });
          }
          if (secondCaseData.travelQuestion === true) {
            this.setState({
              overlayImgSrc: dialogOverlayImages[2]
            });
          }
          if (secondCaseData.recommendationTip1 === true) {
            this.setState({
              overlayImgSrc: dialogOverlayImages[3]
            });
          }
          if (secondCaseData.recommendationTip2 === true) {
            this.setState({
              overlayImgSrc: dialogOverlayImages[4]
            });
          }
          if (secondCaseData.recommendationTip3 === true) {
            this.setState({
              overlayImgSrc: dialogOverlayImages[5]
            });
            setTimeout(() => {
              Animated.timing(this.opacity_value, {
                toValue: 0,
                duration: 150,
                easing: Easing.ease
              }).start(() =>
                this.setState({
                  showAlexaOverlay: false,
                  overlayImgSrc: null
                })
              );
            }, 6000);
          }
        }
      };
    };
  };

  closeOverlay = () => {
    Animated.timing(this.opacity_value, {
      toValue: 0,
      duration: 150,
      easing: Easing.ease
    }).start(() =>
      this.setState({ showAlexaOverlay: false, showUserModal: false })
    );
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.selectUserItem}
      underlayColor={"#fff"}
      activeOpacity={0.7}
      onPress={() => this.updateUser(item)}
    >
      <Text style={styles.selectUserText}>{item}</Text>
    </TouchableOpacity>
  );

  updateUser = item => {
    this.closeOverlay();
    this.setState({
      currentUser: item,
      showUserModal: false,
      onFirstLoad: true
    });
    this.runWebSocket();
  };

  _renderHeader = () => <Text style={styles.selectUserTitle}>Switch User</Text>;

  _renderFooter = () => (
    <TouchableOpacity
      style={styles.selectUserBack}
      underlayColor={"#fff"}
      activeOpacity={0.7}
      onPress={() => this.closeOverlay()}
    >
      <Text style={styles.selectUserText}>Back</Text>
    </TouchableOpacity>
  );

  openUserModal = () => {
    this.setState({ showUserModal: true });
    Animated.timing(this.opacity_value, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease
    }).start();
  };

  render() {
    const opacity = this.opacity_value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    console.log("currentUser", this.state.currentUser);

    return (
      <View style={styles.container}>
        <FeedStack />
        {this.state.showAlexaOverlay === true && (
          <TouchableWithoutFeedback onPress={() => this.closeOverlay()}>
            <Animated.Image
              source={this.state.overlayImgSrc}
              style={[
                styles.dialogImage,
                {
                  opacity: opacity
                }
              ]}
            />
          </TouchableWithoutFeedback>
        )}
        <View>
          <TouchableOpacity
            activeOpacity={hotspotActiveOpacity}
            onPress={() => this.openUserModal()}
            style={styles.buttonOne}
          />
        </View>
        {this.state.showUserModal === true && (
          <Animated.View
            style={[
              styles.selectUserModalContainer,
              {
                opacity: opacity
              }
            ]}
          >
            <View style={styles.selectUserModal}>
              <FlatList
                data={this.state.userData}
                keyExtractor={item => item}
                renderItem={this._renderItem}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={this._renderFooter}
              />
            </View>
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dialogImage: {
    position: "absolute",
    width: width,
    height: height
  },
  selectUserModalContainer: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  selectUserModal: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  selectUserItem: {
    flex: 1,
    height: 48,
    width: 300,
    backgroundColor: "#C2B598",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  selectUserBack: {
    flex: 1,
    height: 48,
    width: 300,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  selectUserText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center"
  },
  selectUserTitle: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    paddingBottom: 20
  },
  buttonOne: {
    opacity: hotspotOpacity,
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 120,
    width: 120,
    backgroundColor: hotspotColor
  }
});

export default App;
