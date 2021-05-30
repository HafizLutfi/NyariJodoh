import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { UserAction } from "../redux/Action";

export class MainMenu extends Component {
  componentDidMount() {
    if (!this.props.dataUsers.isLogin) {
      alert("Anda belum Login");
      this.props.navigation.replace("Login");
    }
  }

  handleLogout = () => {
    this.props.UserAction("isLogin", false);
    this.props.navigation.replace("Menu");
  };

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{ justifyContent: "center", marginTop: 300, width: 200, alignItems: "center", height: 40, backgroundColor: "#ff1493", borderRadius: 10 }}
          onPress={() => {
            this.props.navigation.navigate("DataCalon");
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Data Calon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: "center", marginTop: 20, width: 200, alignItems: "center", height: 40, backgroundColor: "#ff1493", borderRadius: 10 }}
          onPress={() => {
            this.props.navigation.navigate("PilihCalon");
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Pilih Calon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: "center", marginTop: 20, width: 200, alignItems: "center", height: 40, backgroundColor: "#ff1493", borderRadius: 10 }}
          onPress={() => {
            this.handleLogout();
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Keluar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataUsers: state.UserReducer,
  };
};

const mapDispatchToProps = {
  UserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
