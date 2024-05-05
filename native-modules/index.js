/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  useColorScheme,
  NativeModules,
  Button,
  NativeEventEmitter,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const {HelloPT} = NativeModules; // this is the same name we returned in getName function.

const {CalendarModule, Counter} = NativeModules;
console.log(Counter,HelloPT);

const CounterEvents = new NativeEventEmitter(NativeModules?.Counter);

function CustomNativeModule(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    CounterEvents.addListener('onIncrement', result => {
      console.log('OnIncrement received', result);
    });
    CounterEvents.addListener('onDecrement', result => {
      console.log('OnDecrement received', result);
    });

    return () => {
      CounterEvents.removeAllListeners();
      CounterEvents.removeAllListeners();
    };
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPress = () => {
    console.log('hello');
    CalendarModule?.createCalendarEvent('cm', 'location');
  };

  const Change = () => {
    // HelloPT.sayHello('cm', (err: string, msg: string) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log(msg);
    // });
  };
  // console.log(Counter.getConstants());

  const decrement = async () => {
    try {
      var result = await NativeModules.Counter.decrement();
      console.log(result);
    } catch (error) {
      console.log(error.message, error.code);
    }
  };

  const increment = async () => {
    Counter.increment(val => console.log(val));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <Button onPress={Change} title="call native function" /> */}
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
      {/* <Button title="increment ios" color="#841584" onPress={increment} />
      <Button title="decrement ios" color="#841584" onPress={decrement} /> */}
    </SafeAreaView>
  );
}

export default CustomNativeModule;
