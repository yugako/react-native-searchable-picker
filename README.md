# React Native Searchable Picker

[![npm](https://img.shields.io/npm/v/react-native-searchable-picker)](https://www.npmjs.com/package/react-native-searchable-picker)

The main purpose of this package is creating cool dropdown lists with simple search functionality.

## Installation

```
 $ npm i react-native-searchable-picker
```

## Usage

```javascript
import React, {useEffect, useState} from 'react';
import RNSearchablePicker from 'react-native-searchable-picker';

const data = [
  {
    label: 'React',
    value: 'react'
  },
  {
    label: 'React Native',
    value: 'rn'
  },
  {
    label: 'Ionic',
    value: 'ion'
  }
]
const App = () => {
  /**
   * Define local state for selected element
   */
  const [selected, setSelected] = useState();

  const selectHandler = item => {
    setSelected(item);
  }

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
      <RNSearchablePicker
        onSelect={selectHandler}
        data={data}
        placeholderTextColor='#bcbcbc'
        placeholder='Choose an item'
        defaultValue={data[0].label}
        containerStyles={{marginHorizontal: 10}}
        listStyles={{maxHeight: 50}}
      />
  );
}

export default App;

```
## Props

| Name          | Type               | Description | 
| ------------- |:------------------:| ------------------:| 
| data          | **Object**         | Must contains **value** and **label** fields |
| placeholder   | **String**         | Placeholder for text field |
| emptyMessage  | **String** | Shows when data array is empty |
| defaultValue | **String** | Default value for text input |
| onSelect | **Function** | Select callback, takes clicked item as parameter |
| inputStyles | **Object** | Styles object for text input |
| containerStyles | **Object** | Styles object for container |
| emptyMessageStyles | **Object** | Styles object for empty message |
| listStyles | **Object** | Styles object for dropdown list |
| itemStyles | **Object** | Styles object for item in dropdown list |


License
----

ISC
