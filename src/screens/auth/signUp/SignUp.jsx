import {ActivityIndicator} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import InfoIcon from '@icons/info.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import '@locales/index';
import {useTranslation} from 'react-i18next';
import {
  StyledText,
  StyledView,
  StyledTouchableOpacity,
} from '@common/StyledComponents';

import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import {createAccount} from '@utils/authUtils';

import AddPhoto from './components/AddPhoto';
import AcceptTermsAndConditions from './components/AcceptTermsAndConditions';
import storage from '@utils/MMKVStore';
import PhoneInput from './components/PhoneInput';

const SignUp = () => {
  // Enable if more than one user type exists in app
  // const userType = storage.getString('userType');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [termsConditionsAccepted, setTermsConditionsAccepted] = useState(false);
  const navigation = useNavigation();
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const [phoneNumValue, setPhoneNumValue] = useState();

  const handleInputChange = (name, value) => {
    // Check if the name is first_name or last_name
    if (name === 'name' || name === 'surname') {
      // Check if the value contains any numbers
      if (/\d/.test(value)) {
        // If the value contains numbers, do not update the state
        return;
      }
    }

    // Update the state only if the conditions are met
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const checkConditions = async () => {
    /* Function that creates account, needs to be modified
      if termsConditionsAccepted is not needed
     */
    const result = await createAccount({
      formData: formData,
      setLoading: setLoading,
      setErrors: setErrors,
      termsConditionsAccepted: termsConditionsAccepted,
      selectedPrefix: selectedPrefix,
    });

    if (result?.success) {
      /* Navigate to Homepage if Register API returns access tokens,
       else change the route to Login screen
      */
      navigation.navigate('HomePage');
    }
  };

  const handleNumberChange = value => {
    setPhoneNumValue(value);
    handleInputChange('mobile', `+994${selectedPrefix?.value}${value}`);
  };

  return (
    <StyledView className="flex-1 bg-white">
      <StyledView
        className={`${
          loading ? 'block pb-40' : 'hidden'
        } w-screen h-screen bg-black/20 z-50 absolute items-center justify-center`}>
        <ActivityIndicator size="large" color="#0079E9" />
      </StyledView>
      <KeyboardAwareScrollView
        style={{
          padding: 16,
        }}>
        <StyledText className="font-poppi-medium text-base text-[#C0C0BF] mb-3">
          {t('attributes.registerInfoParentTitle')}
        </StyledText>
        <Input
          // Change inputName according to API scheme
          inputName="name"
          inputValue={formData?.name}
          handleInputChange={handleInputChange}
          placeholder={t('attributes.profileFirstname')}
          error={errors?.name}
        />
        <Input
          // Change inputName according to API scheme
          inputName="surname"
          inputValue={formData?.surname}
          handleInputChange={handleInputChange}
          placeholder={t('attributes.profileLastname')}
          error={errors?.surname}
        />

        <PhoneInput
          selectedPrefix={selectedPrefix}
          setSelectedPrefix={setSelectedPrefix}
          handleNumberChange={handleNumberChange}
          phoneNumValue={phoneNumValue}
          errors={errors}
        />

        <Input
          // Change inputName according to API scheme
          inputName="email"
          inputValue={formData?.email}
          handleInputChange={handleInputChange}
          placeholder={t('attributes.registerParentEmail')}
          error={errors?.email}
        />
        <PasswordInput
          // Change inputName according to API scheme
          inputName="password"
          inputValue={formData?.password}
          handleInputChange={handleInputChange}
          placeholder={t('attributes.registerParentPassword')}
          error={errors?.password}
        />
        <PasswordInput
          // Change inputName according to API scheme
          inputName="password_confirm"
          inputValue={formData?.password_confirm}
          handleInputChange={handleInputChange}
          placeholder={t('attributes.confirmPassword')}
          error={errors?.password_confirm}
        />

        <AddPhoto
          // Component for adding user photo, remove if not needed
          data={formData?.photo}
          setData={setFormData}
          error={errors?.photo}
        />

        <Input
          // Multiline input example, remove if not needed
          inputName="work_experience"
          inputValue={formData?.work_experience}
          handleInputChange={handleInputChange}
          placeholder={t('attributes.workExperience')}
          error={errors?.work_experience}
          icon={<InfoIcon />}
          multiline={true}
          height={120}
        />

        <StyledTouchableOpacity
          onPress={() => {
            navigation.navigate('SignIn', {userType: userType});
          }}>
          <StyledText className="font-poppi text-sm text-[#204F50] ml-1 mb-4">
            {/* {t('')} */}
            Already have account
          </StyledText>
        </StyledTouchableOpacity>

        <AcceptTermsAndConditions
          // Component for accepting terms and conditions
          accepted={termsConditionsAccepted}
          setAccepted={setTermsConditionsAccepted}
        />

        <StyledTouchableOpacity
          className="bg-[#76F5A4] rounded-[18px] p-[10px] mt-5 mb-20"
          onPress={checkConditions}>
          <StyledText className="text-center text-[#204F50] text-base font-poppi-semibold">
            {/* {t('')} */}
            Create Account
          </StyledText>
        </StyledTouchableOpacity>
      </KeyboardAwareScrollView>
    </StyledView>
  );
};

export default SignUp;
