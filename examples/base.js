import React from 'react';
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

export const DropdownExample = (props) => {
  /**
   * Define local state for selected element
   */
  const [selected, setSelected] = useState();

  const selectHandler = item => {
    setSelected(item);
  }

  return (
      <RNSearchablePicker
        onSelect={selectHandler}
        data={data}
        placeholder='Choose an item'
        defaultValue={data[0].label}
        containerStyles={{marginHorizontal: 10}}
        {...props}
      />
  );
}