import {createStackNavigator} from '@react-navigation/stack';
import Profile from '@screens/profile/profile/Profile';
import Settings from '@screens/profile/settings/Settings';
import CustomHeader from '@common/CustomHeader';
import '@locales/index';
import {useTranslation} from 'react-i18next';
import ChangeLanguage from '@screens/profile/settings/ChangeLanguage';
import WebViewScreen from '@common/WebViewScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader noBackBtn title={t('attributes.profile')} />
          ),
        }}
        name="ProfileScreen"
        component={Profile}
      />
      <Stack.Screen
        options={{
          header: () => <CustomHeader title={t('attributes.Settings')} />,
        }}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{
          header: () => <CustomHeader title={t('attributes.changeLanguage')} />,
        }}
        name="ChangeLanguage"
        component={ChangeLanguage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="WebViewScreen"
        component={WebViewScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
