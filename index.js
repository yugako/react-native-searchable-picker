import React, { useState, useRef } from "react";
import {
  Platform,
  TextInput,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";

const RNSearchablePicker = (({
  placeholder,
  emptyMessage,
  defaultValue = "",
  data,
  onSelect,
  inputStyles,
  containerStyles,
  emptyMessageStyles,
  listStyles,
  itemStyles,
  flatList = true
}) => {
  
  const ref = useRef(null);

  const [inputValue, setInputValue] = useState(defaultValue);
  const [listVisibility, setListVisibility] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableHighlight;

  const onChange = (val) => {
    setInputValue(val);
    if (val.trim()) {
      // Filtered data
      const filtered = data.filter((item) => item.label.includes(val));
      // Check if empty
      if (filtered.length) setFilteredData(filtered);
    } else {
      // Complete data withot filter 
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
          ref={ref}
        />
        <Touchable background={TouchableNativeFeedback.Ripple(null, true)} onPress={() => { setListVisibility(!listVisibility); onChange(""); } }
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
          flatList ? (
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
            <ScrollView
              style={{
                maxHeight: 150,
                borderWidth: 1,
                borderColor: '#ccc',
                marginTop: 5,
                ...listStyles
              }}
            >
              {filteredData.map((item, index) => (
                <Touchable
                  key={index}
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
              ))}
            </ScrollView>
          )
        ) : (
          <Text style={{textAlign: 'center', marginVertical: 5, ...emptyMessageStyles}}>{emptyMessage}</Text>
        )}
      </View>
      ) : null}
    </View>
  );
});


export default RNSearchablePicker;