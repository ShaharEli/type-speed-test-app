import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
const { height } = Dimensions.get("window");
import Test from "./Test";
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";

function Game() {
  const [gameCounter, setGameCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [screenHeight, setScreenHight] = useState(0);
  const start = () => {
    setGameCounter((prev) => prev + 1);
    setGameOn(true);
  };
  useEffect(() => {
    (async () => {
      try {
        setHistory(
          await AsyncStorage.getItem("history")
            .split("$#splitingSpot#$")
            .map((score) => JSON.parse(score))
        );
      } catch (e) {}
    })();
  }, []);
  const end = async (data) => {
    setGameOn(false);
    try {
      await AsyncStorage.setItem(
        "scores",
        JSON.stringify([data, ...history].join("$#splitingSpot#$"))
      );
    } catch (e) {
      // saving error
    }
    setHistory((prev) => [data, ...prev]);
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHight({ screenHeight: contentHeight });
  };
  const scrollEnabled = screenHeight.screenHeight > 0.3 * height;

  return (
    <>
      {!gameOn ? (
        <Animatable.View animation='fadeInRightBig' style={{ height: "100%" }}>
          <MainContainer>
            <Title>Typing Speed Test</Title>
            <Button
              title='Start Test'
              buttonStyle={{
                paddingHorizontal: 50,
                paddingVertical: 20,
                borderRadius: 8,
              }}
              onPress={start}
            />
          </MainContainer>

          <ScoreContainer
            scrollEnabled={scrollEnabled}
            onContentSizeChange={onContentSizeChange}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {history.length > 0 &&
              history.map((item, index) => {
                return (
                  <Score key={index} grade={item.grade / item.word.length}>
                    <Text>
                      grade:{item.grade}/{item.word.length} (
                      {Math.round(item.grade / item.word.length) * 100}%)
                    </Text>
                    <Text>word: {item.word}</Text>
                    <Text>time: {item.time} seconds</Text>
                  </Score>
                );
              })}
          </ScoreContainer>
        </Animatable.View>
      ) : (
        <GameContainer>
          <Text style={{ textAlign: "center" }}>Game number {gameCounter}</Text>
          <Test end={end} />
        </GameContainer>
      )}
    </>
  );
}

export default Game;
const MainContainer = styled.SafeAreaView`
  background-color: #56bcd2;
  text-align: center;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  flex: 1;
  padding-top: ${Platform.OS === "android"
    ? StatusBar.currentHeight + "px"
    : "0px"};
`;

const Title = styled.Text`
  font-size: 40px;
`;

const GameContainer = styled.SafeAreaView`
  background-color: #56bcd2;
  flex: 1;
  padding-top: ${Platform.OS === "android"
    ? StatusBar.currentHeight + "px"
    : "0px"};
  height: 100%;
`;

const ScoreContainer = styled.ScrollView`
  flex: 0.4;
  background-color: #56bcd2;
`;

const Score = styled.View`
  text-align: center;
  width: 60%;
  border: 1px solid white;
  border: ${({ grade }) => (grade === 1 && "green") || (grade === 0 && "red")};
  padding: 10px 20px;
  margin-bottom: 20px;
`;
