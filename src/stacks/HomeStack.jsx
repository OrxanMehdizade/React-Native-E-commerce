import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '@screens/home/homepage/HomePage';
import '@locales/index';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator();

const HomeStack = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomePage"
        component={HomePage}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
