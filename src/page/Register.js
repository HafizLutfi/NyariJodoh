import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { UserAction } from "../redux/Action";
import axios from "axios";
import * as Location from "expo-location";

export class Register extends Component {
  componentDidMount = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(JSON.stringify(location));

    this.props.UserAction("latitude", location.coords.latitude);
    this.props.UserAction("longitude", location.coords.longitude);
  };

  RegisterPress = () => {
    let formData = new FormData();
    let filename = this.props.dataUsers.foto;
    // console.log("nama gambar " + filename.split("/").pop());
    formData.append("data", JSON.stringify(this.props.dataUsers));
    formData.append("file", {
      uri: this.props.dataUsers.foto,
      type: "image/jpeg",
      name: filename.split("/").pop(),
    });

    axios
      .post("http://192.168.43.232:8080/user/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data);
        this.props.navigation.replace("Menu");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // console.log(this.props.dataUsers);
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{ marginLeft: 40, marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}> Username </Text>
            <TextInput
              placeholder="Username Anda"
              onChangeText={(value) => {
                this.props.UserAction("username", value);
              }}
              style={{ borderWidth: 1, width: 320, paddingLeft: 5, borderRadius: 10, marginTop: 10, borderColor: "#ff1493", height: 35 }}
            />
          </View>
          <View style={{ marginLeft: 40, marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}> Nama </Text>
            <TextInput
              placeholder="Nama Anda"
              onChangeText={(value) => {
                this.props.UserAction("nama", value);
              }}
              style={{ borderWidth: 1, width: 320, paddingLeft: 5, borderRadius: 10, marginTop: 10, borderColor: "#ff1493", height: 35 }}
            />
          </View>
          <View style={{ marginLeft: 40, marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}> Jenis Kelamin </Text>
            <TouchableOpacity style={{ borderWidth: 1, width: 320, paddingLeft: 5, borderRadius: 10, marginTop: 10, borderColor: "#ff1493", height: 35 }}>
              <RNPickerSelect
                pickerProps={{ style: { height: 35, overflow: "scroll" } }}
                onValueChange={(value) => {
                  this.props.UserAction("jenisKelamin", value);
                }}
                items={[
                  { label: "Laki-laki", value: "laki-laki" },
                  { label: "Perempuan", value: "perempuan" },
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 40, marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}> No. Hp </Text>
            <TextInput
              placeholder="Nomor Handphone"
              onChangeText={(value) => {
                this.props.UserAction("nomor", value);
              }}
              keyboardType="numeric"
              style={{ borderWidth: 1, width: 320, paddingLeft: 5, borderRadius: 10, marginTop: 10, borderColor: "#ff1493", height: 35 }}
            />
          </View>
          <View style={{ marginLeft: 40, marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}> Umur </Text>
            <TextInput
              placeholder="Umur Anda"
              onChangeText={(value) => {
                this.props.UserAction("umur", value);
              }}
              style={{ borderWidth: 1, width: 320, paddingLeft: 5, borderRadius: 10, marginTop: 10, borderColor: "#ff1493", height: 35 }}
              keyboardType="numeric"
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginTop: 40, borderRadius: 20, height: 40, width: 200, alignItems: "center", backgroundColor: "#ff1493" }}
              onPress={() => {
                this.props.navigation.navigate("Camera");
              }}
            >
              <Text style={{ marginTop: 5, color: "white", fontSize: 17 }}>Camera/Galery</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Image source={this.props.dataUsers.foto == "" ? require("../img/user.png") : { uri: this.props.dataUsers.foto }} style={{ height: 100, width: 100 }} />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{ marginTop: 40, borderRadius: 20, height: 30, width: 100, alignItems: "center", backgroundColor: "#ff1493", marginRight: 35 }}
              onPress={() => {
                this.RegisterPress();
              }}
            >
              <Text style={{ color: "white", fontSize: 17 }}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
