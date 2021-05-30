import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { UserAction } from "../redux/Action";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export class DataCalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      index: 0,
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
          console.log(response.data);
          this.setState({ data: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .get("http://192.168.43.232:8080/user/getdata/laki-laki")
        .then((response) => {
          this.setState({ data: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  previos = () => {
    this.setState({ index: this.state.indexindex - 1 });
  };

  previos = () => {
    this.setState({ index: this.state.indexindex + 1 });
  };

  render() {
    // console.log(this.state.data[0]);
    return (
      <View style={{ marginTop: 50 }}>
        <FlatList
          data={this.state.data[this.state.index]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SafeAreaView style={{ alignItems: "center" }}>
              <Image style={{ height: 100, width: 100 }} source={{ uri: `http://192.168.43.232:8080/user-photo/${item.foto}` }} />
            </SafeAreaView>
          )}
        />

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginLeft: 50, marginRight: 50 }}
            onPress={() => {
              this.previos();
            }}
          >
            <Text style={{ fontSize: 20 }}>Swipe Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 50, marginRight: 50 }}
            onPress={() => {
              this.previos();
            }}
          >
            <Text style={{ fontSize: 20 }}>Swipe Right</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  dataUsers: state.UserReducer,
});

const mapDispatchToProps = {
  UserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataCalon);
