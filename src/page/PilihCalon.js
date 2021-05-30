import axios from "axios";
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView } from "react-native";
import { connect } from "react-redux";
import { UserAction } from "../redux/Action";

export class PilihCalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    if (this.props.dataUsers.jenisKelamin == "laki-laki") {
      axios
        .get("http://192.168.43.232:8080/user/getdata/perempuan")
        .then((response) => {
          // console.log(response.data);
          this.setState({ data: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .get("http://192.168.43.232:8080/user/getdata/laki-laki")
        .then((response) => {
          // console.log(response.data);
          this.setState({ data: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  renderItem = ({ item }) => (
    <View style={{ marginTop: 20 }}>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("DetailCalon", item.id);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginLeft: 10 }}>
            <Image source={{ uri: `http://192.168.43.232:8080/user-photo/${item.foto}` }} style={{ width: 100, height: 100 }}></Image>
          </View>
          <View>
            <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>Nama : </Text>
              <Text style={{ fontSize: 15 }}>{item.nama}</Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: 10, marginTop: 10 }}>
              <Text style={{ fontSize: 15 }}>Umur : </Text>
              <Text style={{ fontSize: 15 }}>{item.umur}</Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: 10, marginTop: 10 }}>
              <Text style={{ fontSize: 15 }}>Username : </Text>
              <Text style={{ fontSize: 15 }}>{item.username}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    // console.log(this.props.dataUsers);
    return (
      <SafeAreaView>
        <FlatList data={this.state.data} renderItem={this.renderItem} keyExtractor={(item) => item.id.toString()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PilihCalon);
