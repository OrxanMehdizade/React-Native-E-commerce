import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
  StyledScrollView,
} from '@common/StyledComponents';
import {useNavigation} from '@react-navigation/native';
import '@locales/index';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native';

const Profile = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const menuItems = [
    {
      // logo: <DocsIcon />,
      title: t('attributes.termsAndConditions'),
      route: 'WebViewScreen',
      // Add if url exists for TermsConditions or PrivacyPolicy pages
      payload: {
        url: 'http://2school.app/open/az/terms_and_conditions/',
        title: 'İstifadəçi qaydaları və şərtləri',
      },
    },
    {
      // logo: <LockIcon />,
      title: t('attributes.privacyPolicy'),
      route: 'WebViewScreen',
    },

    {
      // logo: <SettingsIcon />,
      title: t('attributes.Settings'),
      route: 'Settings',
    },
  ];

  const renderItem = ({item}) => (
    <StyledView
      className={` border-[1px] border-[#EDEFF3] my-[6px] bg-white rounded-[18px]`}>
      <StyledTouchableOpacity
        onPress={async () => {
          if (item.route && item.payload) {
            navigation.navigate(item.route, item.payload);
          } else if (item.route) {
            navigation.navigate(item.route);
          } else {
            setDeleteAccountOpen(true);
          }
        }}>
        <StyledView className="items-center flex-row justify-between w-full p-4">
          <StyledView className="flex-row items-center">
            {item.logo}
            <StyledText
              className={`text-[#292B2D] text-base font-poppi-medium ml-2`}>
              {item.title}
            </StyledText>
          </StyledView>
          {/* {item.route !== '' && <ArrowRightIcon />} */}
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  );

  return (
    <>
      <StyledScrollView className="flex-1 bg-white px-4 pt-[20px]">
        <StyledView className="mt-[30px] mb-[40px]">
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            scrollEnabled={false}
            data={menuItems}
            renderItem={renderItem}
          />

          <StyledTouchableOpacity
            onPress={() => {
              // Logout function goes here
            }}
            className="py-2 border-[1px] mt-2 border-[#204F50] justify-center items-center rounded-[18px]">
            <StyledText
              className={`text-[#204F50] text-base font-poppi-semibold`}>
              {/* {t('')} */}
              Log out
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledScrollView>
    </>
  );
};

export default Profile;
