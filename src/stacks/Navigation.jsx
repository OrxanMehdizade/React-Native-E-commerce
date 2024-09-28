import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '@common/NoInternet';
import {NavigationContainer} from '@react-navigation/native';
import TabStack from '@stacks/TabStack';
import AuthStack from '@stacks/AuthStack';
import {useMMKVString} from 'react-native-mmkv';

const Navigation = () => {
  const [connected, setConnected] = useState();
  const [accessToken, setAccessToken] = useMMKVString('accessToken');

  const linking = {
    // Replace YOUR_PREFIX with your app prefix
    prefixes: ['YOUR_PREFIX://'],
    config: {
      // Replace INITIAL_ROUTE with route name you want to be opened first
      initialRouteName: 'INITIAL_ROUTE',
      screens: {
        // Add your tab screens and their subscreens here
        Home: {
          path: 'home/',
          screens: {
            // Replace SubScreen with actual name
            HomePage: {
              // path for subscreen
              path: 'homepage/',
              screens: {
                // if SubScreen also has nested screens, add here
                NestedScreen: 'nested/',
              },
            },
          },
        },
        // Add additional TabScreens like the Profile
        Profile: {
          path: 'profile/',
          screens: {
            // Replace SubScreen with actual name
            SubScreen: {
              // path for subscreen
              path: 'subscreen/',
              screens: {
                PaymentSuccess: 'success/',
                PaymentFail: 'fail/',
              },
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return connected === true ? (
    <NavigationContainer linking={linking}>
      {accessToken ? <TabStack /> : <AuthStack />}
    </NavigationContainer>
  ) : (
    <NoInternet />
  );
};

export default Navigation;
