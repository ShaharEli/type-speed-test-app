import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import styled from "styled-components";
import randomWords from "random-words";
export default function App() {
  return (
    <>
      <MainContainer>
        <Title>Typing Speed Tdest</Title>
        <Button title='get Rndomm' onPress={() => console.log(randomWords())} />
      </MainContainer>
    </>
  );
}

const MainContainer = styled.SafeAreaView`
  background-color: #56bcd2;
  text-align: center;
  align-items: center;
  text-align: center;
  flex: 1;
`;

const Title = styled.Text`
  font-size: 30px;
  margin: 30px 0;
`;
