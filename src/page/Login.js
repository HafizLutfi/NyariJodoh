import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { UserAction } from "../redux/Action";
import { connect } from "react-redux";
import axios from "axios";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      nomor: "",
    };
  }

  LoginPress = () => {
    axios
      .get(`http://192.168.43.232:8080/user/login/${this.state.username}/${this.state.nomor}`)
      .then((response) => {
        if (response.data !== "") {
          this.props.UserAction("username", response.data.username);
          this.props.UserAction("nama", response.data.nama);
          this.props.UserAction("nomor", response.data.nomor);
          this.props.UserAction("jenisKelamin", response.data.jenisKelamin);
          this.props.UserAction("latitude", response.data.latitude);
          this.props.UserAction("longitude", response.data.longitude);
          this.props.UserAction("umur", response.data.umur);
          this.props.UserAction("foto", response.data.foto);
          this.props.UserAction("isLogin", true);
          this.props.navigation.replace("MainMenu");
        } else {
          alert("Username dan Nomor Handphone anda salah!");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  render() {
    // console.log(this.state);
    return (
      <View>
        <View style={{ marginLeft: 40, marginTop: 100 }}>
          <Text style={{ fontSize: 20 }}> Username </Text>
          <TextInput
            placeholder="Username Anda"
            style={{ borderWidth: 1, width: 320, paddingLeft: 5, borderRadius: 10, marginTop: 10, borderColor: "#ff1493", height: 35 }}
            onChangeText={(values) => {
              this.setState({ username: values });
            }}
          />
        </View>
        <View style={{ marginLeft: 40, marginTop: 20 }}>
          <Text style={{ fontSize: 20 }}> No. Hp </Text>
          <TextInput
            placeholder="Nomor Handphone Anda"
            style={{ borderWidth: 1, width: 320, paddingLeft: 5, borderRadius: 10, marginTop: 10, borderColor: "#ff1493", height: 35 }}
            onChangeText={(values) => {
              this.setState({ nomor: values });
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ marginTop: 40, borderRadius: 20, height: 40, width: 200, alignItems: "center", backgroundColor: "#ff1493" }}
            onPress={() => {
              this.LoginPress();
            }}
          >
            <Text style={{ marginTop: 5, color: "white", fontSize: 17 }}>Login</Text>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
