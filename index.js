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


const RNSearchablePicker = ({
  placeholder,
  emptyMessage,
  defaultValue = "",
  data,
  onSelect,
  inputStyles,
  containerStyles,
  emptyMessageStyles,
  listStyles,
  itemStyles
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
          {listVisibility 
            ? <Text style={{fontSize: 28, color: '#000', padding: 10}}>&#9652;</Text>
            : <Text style={{fontSize: 28, color: '#000', padding: 10}}>&#9662;</Text>
          }
         
        </Touchable>
      </View>
      {listVisibility ? (
        <View>
          {Array.isArray(data) && data.length ? (
            <FlatList
              nestedScrollEnabled={true}
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
                  <Text style={{ paddingVertical: 10, paddingHorizontal: 5, ...itemStyles }}>
                    {item.label}
                  </Text>
                </Touchable>
              )}
            />
          ) : (
            <Text style={{textAlign: 'center', marginVertical: 5, ...emptyMessageStyles}}>{emptyMessage}</Text>
          )}
        </View>
      ) : null}
    </View>
  );
};


export default RNSearchablePicker;