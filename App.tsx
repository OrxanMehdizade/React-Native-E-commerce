/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// @ts-nocheck
import 'react-native-gesture-handler';
import Navigation from '@stacks/Navigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useEffect} from 'react';
import {StatusBar, PermissionsAndroid} from 'react-native';
import {useTranslation} from 'react-i18next';
import storage from '@utils/MMKVStore';
import {refreshTokens} from '@utils/authUtils';
import SuperAlert from 'react-native-super-alert';

function App(): JSX.Element {
  const {i18n} = useTranslation();

  const customStyle = {
    container: {
      backgroundColor: '#e8e8e8',
      borderRadius: 12,
    },
    buttonCancel: {
      backgroundColor: '#e8e8e8',
      borderWidth: 1,
      borderColor: '#7658F2',
      borderRadius: 6,
      paddingHorizontal: 20,
    },
    buttonConfirm: {
      backgroundColor: '#7658F2',
      borderRadius: 6,
      paddingHorizontal: 20,
    },
    textButtonCancel: {
      color: '#7658F2',
      fontWeight: 'bold',
    },
    textButtonConfirm: {
      color: '#fff',
      fontWeight: 'bold',
    },
    title: {
      color: '#000',
      fontSize: 16,
    },
    message: {
      color: '#4f4f4f',
      fontSize: 12,
    },
  };

  useEffect(() => {
    refreshTokens();

    const currentLanguage = async () => {
      const selectedLanguage = storage.getString('selectedLanguage');
      if (selectedLanguage) {
        i18n.changeLanguage(selectedLanguage);
      }
    };
    currentLanguage();
  }, []);

  return (
    <>
      <SafeAreaProvider style={{flex: 1, backgroundColor: '#7658F2'}}>
        <StatusBar backgroundColor="#7658F2" barStyle="light-content" />
        <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
          <Navigation />
        </SafeAreaView>
      </SafeAreaProvider>
      <SuperAlert customStyle={customStyle} />
    </>
  );
}

export default App;
