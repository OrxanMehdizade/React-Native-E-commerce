import {
  StyledView,
  StyledText,
  StyledTextInput,
} from '@common/StyledComponents';
import CustomSelect from './CustomSelect';
import {prefixData} from '@utils/staticData';
import {useTranslation} from 'react-i18next';

const PhoneInput = ({
  selectedPrefix,
  setSelectedPrefix,
  handleNumberChange,
  errors,
  phoneNumValue,
}) => {
  const {t} = useTranslation();

  return (
    <StyledView className="w-auto mb-3">
      <StyledView className="flex-row">
        <CustomSelect
          items={prefixData}
          selectedItem={selectedPrefix}
          setSelectedItem={setSelectedPrefix}
          placeholder={
            'Select prefix'
            // t('')
          }
          disabled={false}
          error={errors?.prefix}
        />
        <StyledView className="w-[70%]">
          <StyledTextInput
            maxLength={7}
            keyboardType="numeric"
            value={phoneNumValue}
            placeholder={t('attributes.profileNumber')}
            name="mobile"
            placeholderTextColor={errors?.mobile ? '#FF3115' : '#757575'}
            onChangeText={value => handleNumberChange(value)}
            className={`border-[1px] h-[50px] text-black py-[8px] font-poppi text-base placeholder:font-poppi ${
              errors?.mobile
                ? 'border-red-400 bg-red-50'
                : 'border-[#EDEFF3] bg-white focus:border-[#7658F2] focus:bg-[#F3F7FF]'
            } h-[45px]  rounded-[18px] rounded-l-none px-4`}
          />
        </StyledView>
      </StyledView>

      <StyledText
        className={`text-red-400 text-xs font-serrat mt-1 ${
          errors?.mobile || errors?.prefix ? 'block' : 'hidden'
        }`}>
        {errors?.mobile || errors?.prefix}
      </StyledText>
    </StyledView>
  );
};

export default PhoneInput;
