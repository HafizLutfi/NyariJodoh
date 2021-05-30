import React, { Component } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
export class Menu extends Component {
  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 200 }}>
          <Image source={require("../img/nyarijodoh.png")} />
        </View>
        <View style={{ alignItems: "center", marginTop: 80 }}>
          <TouchableOpacity
            style={{ height: 40, width: 300, alignItems: "center", borderRadius: 10, backgroundColor: "#ff1493" }}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={{ fontSize: 20, color: "white", marginTop: 5 }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={{ height: 40, width: 300, alignItems: "center", borderRadius: 10, backgroundColor: "#ff1493" }}
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          >
            <Text style={{ fontSize: 20, color: "white", marginTop: 5 }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Menu;
