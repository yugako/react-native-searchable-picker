import React, { useState } from "react";
import {
  Platform,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RNSearchablePicker = ({
  placeholder,
  emptyMessage,
  defaultValue = "",
  data,
  onSelect,
  inputStyles,
  containerStyles,
  listStyles
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [listVisibility, setListVisibility] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableHighlight;

  const onChange = (val) => {
    setInputValue(val);

    if (val.trim()) {
      const filtered = data.filter((item) => item.label.includes(val));

      if (filtered.length) setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <View style={{ ...containerStyles }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <TextInput
          value={inputValue}
          onChangeText={onChange}
          placeholder={placeholder}
          style={{ flex: 1, ...inputStyles }}
        />
        <Touchable
          background={TouchableNativeFeedback.Ripple(null, true)}
          onPress={() => setListVisibility(!listVisibility)}
        >
          <Icon name="caret-down" style={{ padding: 10 }} size={16} />
        </Touchable>
      </View>
      {listVisibility ? (
        <View>
          {Array.isArray(data) && data.length ? (
            <FlatList
              style={{
                maxHeight: 150,
                borderWidth: 1,
                borderColor: '#ccc',
                marginTop: 5,
                ...listStyles
              }}
              data={filteredData}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Touchable
                  onPress={() => {
                    onSelect(item);
                    setInputValue(item.label);
                    setListVisibility(false);
                  }}
                >
                  <Text style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                    {item.label}
                  </Text>
                </Touchable>
              )}
            />
          ) : (
            <Text>{emptyMessage}</Text>
          )}
        </View>
      ) : null}
    </View>
  );
};


export default RNSearchablePicker;