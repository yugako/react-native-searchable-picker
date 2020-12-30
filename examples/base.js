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
        data={[]}
        placeholder='Choose an item'
        defaultValue={data[0].label}
        containerStyles={{marginHorizontal: 10}}
        listStyles={{maxHeight: 50}}
        emptyMessage={'Nothing to show'}
      />
  );
}

export default App;