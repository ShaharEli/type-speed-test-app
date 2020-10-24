import React, { useState } from "react";
import styled from "styled-components";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Button,
  Platform,
  Dimensions,
} from "react-native";
const { height } = Dimensions.get("window");
import Test from "./Test";

function Game() {
  const [gameCounter, setGameCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [screenHeight, setScreenHight] = useState(0);
  const start = () => {
    setGameCounter((prev) => prev + 1);
    setGameOn(true);
  };

  const end = (data) => {
    setGameOn(false);
    setHistory((prev) => [data, ...prev]);
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHight({ screenHeight: contentHeight });
  };
  const scrollEnabled = screenHeight.screenHeight > 0.3 * height;

  return (
    <>
      {!gameOn ? (
        <View style={{ height: "100%" }}>
          <MainContainer>
            <Title>Typing Speed Test</Title>
            <Button title='Start Test' onPress={start} />
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
        </View>
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
