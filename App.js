import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import Book from "./screens/Book";

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true
    };
  }

  static navigationOptions = {
    title: "Header"
  };

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", marginBottom: 3 }}
        onPress={() =>
          navigate("Book", {
            item: item
          })
        }
      >
        <Image
          source={{ uri: item.image }}
          style={{ height: 80, width: 80, margin: 5 }}
        />
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 5 }}>
          <Text style={{ fontSize: 18, color: "green", marginBottom: 15 }}>
            {item.book_title}
          </Text>
          <Text style={{ fontSize: 16, color: "red" }}>{item.author}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    const url =
      "http://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.book_array,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "black" }} />
    );
  };

  render() {
    return this.state.isLoading ? (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#330066" animating />
      </SafeAreaView>
    ) : (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#f5fcff"
        }}
      >
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </SafeAreaView>
    );
  }
}

const AppNavigation = createStackNavigator({
  Home: { screen: App },
  Book: { screen: Book }
});

const AppNavigator = createAppContainer(AppNavigation);

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
