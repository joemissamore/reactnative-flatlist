import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";

export default class Book extends Component {
  constructor() {
    super();
    this.state = {
      item: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam("item", null);
    const bookTitle = item.book_title;
    return {
      title: bookTitle
    };
  };

  getItem = () => {
    const { navigation } = this.props;
    this.setState({
      item: navigation.getParam("item", null)
    });
  };

  componentWillMount() {
    this.getItem();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={{ uri: this.state.item.image }}
          style={{ height: 300, width: 200, marginTop: 30, marginBottom: 10 }}
        />
        <Text style={{ margin: 10 }}>
          Book Title - {this.state.item.book_title}
        </Text>
        <Text>Author - {this.state.item.author}</Text>
      </SafeAreaView>
    );
  }
}
