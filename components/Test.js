import React, { useState, useEffect } from "react";
import styled from "styled-components";
import randomWords from "random-words";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  Platform,
  TextInput,
  Alert,
} from "react-native";

function Test({ end }) {
  const [time, setTime] = useState(0);
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [len, setLen] = useState(0);
  const [types, setTypes] = useState("");
  const check = () => {
    const current = time;
    const grade = types
      .split("")
      .filter((item, i) => item.toLocaleLowerCase() === word[i]);
    if (grade.length / word.length === 1) {
      Alert.alert(
        "you got: " +
          grade.length +
          " / " +
          word.length +
          " (" +
          Math.round((grade.length / word.length) * 100) +
          "%)",
        `your time is: ${current} seconds`
      );
    } else if (grade.length === 0) {
      Alert.alert(
        "you got: " +
          grade.length +
          " / " +
          word.length +
          " (" +
          Math.round((grade.length / word.length) * 100) +
          "%)",
        `your time is: ${current} seconds`
      );
    } else {
      Alert.alert(
        "you got: " +
          grade.length +
          " / " +
          word.length +
          " (" +
          Math.round((grade.length / word.length) * 100) +
          "%)",
        `your time is: ${current} seconds`
      );
    }
    end({ grade: grade.length, word: word, time: time });
  };

  useEffect(() => {
    setWord(randomWords());
    setLoading(false);
    const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  const type = (e) => {
    setTypes(e);
  };
  useEffect(() => {
    setLen(types.length);
  }, [types]);

  return (
    <TestContainer>
      <View>
        <Text style={{ color: "red", fontSize: 16 }}>timer: {time}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 25 }}>you need to type: </Text>
        <Text style={{ textAlign: "center" }}>
          {word.split("").map((item, i) => (
            <Text
              style={
                len === i
                  ? { color: "green", fontSize: 45 }
                  : { color: "blue", fontSize: 30 }
              }
              key={i}
            >
              {item}
            </Text>
          ))}
        </Text>
      </View>
      <View style={{ width: "80%" }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 8,
          }}
          onChangeText={(e) => type(e)}
          placeholder={"Type..."}
        />
      </View>
      <View>
        <Button onPress={check} style={{ marginTop: 50 }} title='Submit' />
      </View>
    </TestContainer>
  );
}

export default Test;

const TestContainer = styled.View`
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;
