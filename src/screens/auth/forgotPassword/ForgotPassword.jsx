import {useState} from 'react';
import LockIcon from '@icons/lock-forgot-password.svg';
import '@locales/index';
import {useTranslation} from 'react-i18next';
import {openInbox} from 'react-native-email-link';
import {API_URL} from '@env';
import {
  StyledTouchableOpacity,
  StyledText,
  StyledView,
} from '@common/StyledComponents';
import storage from '@utils/MMKVStore';
import {fetchData} from '@utils/fetchData';
import Input from '../components/Input';

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  const resetPassword = async () => {
    if (email) {
      const result = await fetchData({
        url: `${API_URL}/`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: {email: email},
        setLoading,
      });

      result?.success ? setEmailSent(true) : alert(result.error);
    } else {
      alert(t(''), t(''));
    }
  };

  return !emailSent ? (
    <StyledView className="flex-1 p-4 bg-white">
      <StyledView className="w-full items-center mt-14 mb-[24px]">
        <StyledView className="rounded-full  w-[80px] h-[80px] items-center justify-center mb-6">
          <LockIcon />
        </StyledView>
        <StyledText className="font-poppi-bold text-[#204F50] text-[22px] mt-10">
          {/* {t('')} */}
          Forgot password header
        </StyledText>
      </StyledView>
      <StyledText className="text-base text-center text-[#585858] font-poppi-medium mb-3">
        {/* {t('')} */}
        Forgot password Description
      </StyledText>

      <Input
        inputName="email"
        inputValue={email}
        handleInputChange={value => {
          setEmail(value);
        }}
        placeholder={
          'Enter email'
          // t('')
        }
      />

      <StyledTouchableOpacity
        className="rounded-[18px] p-[10px] bg-[#76F5A4] mt-2"
        onPress={() => {
          resetPassword();
        }}>
        <StyledText className="font-poppi-semibold text-base text-[#204F50] text-center">
          {/* {t('')} */}
          Confirm reset
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  ) : (
    <StyledView className="flex-1 p-4 bg-white">
      <StyledView className="w-full items-center mt-10 mb-[24px]">
        <StyledView className="rounded-full  w-[80px] h-[80px] items-center justify-center mb-6">
          <LockIcon />
        </StyledView>
        <StyledText className="font-poppi-bold text-[#204F50] text-[22px] mt-10">
          {/* {t('')} */}
          Check Email
        </StyledText>
      </StyledView>
      <StyledText className="text-base text-center text-[#585858] font-poppi-medium">
        {/* {t('')} */}
        Check Email Description
      </StyledText>

      <StyledTouchableOpacity
        className="rounded-[18px] p-[10px] bg-[#76F5A4] mt-8"
        onPress={() => {
          openInbox();
        }}>
        <StyledText className="font-poppi-semibold text-base text-[#204F50] text-center">
          {/* {t('')} */}
          Open mail app
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default ForgotPassword;
