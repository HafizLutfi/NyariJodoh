import axios from "axios";
import React, { Component } from "react";
import { View, Text, Image, Touchable, TouchableOpacity, Linking, Dimensions } from "react-native";
import { connect } from "react-redux";
import { UserAction } from "../redux/Action";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";

export class DetailCalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    this.getUserId();
  }
  getUserId = () => {
    axios
      .get(`http://192.168.43.232:8080/user/${this.props.route.params}`)
      .then((response) => {
        //   console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    // console.log(this.props.route.params);
    // console.log(this.state.data.foto);
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <Image style={{ height: 200, width: 200, marginTop: 10 }} source={{ uri: `http://192.168.43.232:8080/user-photo/${this.state.data.foto}` }} />
        </View>
        <View style={{ marginTop: 20, marginLeft: 10, flexDirection: "column" }}>
          <View>
            <Text> Nama : {this.state.data.nama}</Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text> Umur : {this.state.data.umur}</Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text> Username : {this.state.data.username}</Text>
          </View>
          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <Text style={{ justifyContent: "center" }}> No. Hp : {this.state.data.nomor}</Text>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                let nomor = this.state.data.nomor;
                let new_nomor = nomor.replace("0", "+62");
                // console.log(new_nomor);
                Linking.openURL(`whatsapp://send?text=hello&phone=${new_nomor}`);
              }}
            >
              <Icon name="whatsapp" style={{ fontSize: 40, marginLeft: 180 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <MapView
            style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height, marginTop: 10 }}
            initialRegion={{
              latitude: Number(this.props.dataUsers.latitude),
              longitude: Number(this.props.dataUsers.longitude),
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(this.state.data.latitude),
                longitude: Number(this.state.data.longitude),
              }}
            />
          </MapView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCalon);
