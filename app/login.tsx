import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  const router = useRouter();
  const { signIn } = useSignIn();

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        // const fullPhoneNumber = `${countryCode}6464081541`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === 'phone_code';
          }
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId,
        });

        router.push({
          pathname: 'verify/[phone]',
          params: { phone: fullPhoneNumber, signin: 'true' },
        } as never);
      } catch (error) {
        console.error('Error signing in:', JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === 'form_identifier_not_found') {
            Alert.alert('Error', error.errors[0].message);
          }
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter you phone number associated with your account
        </Text>

        <View style={defaultStyles.inputContainer}>
          <TextInput
            style={defaultStyles.input}
            placeholder='Country code'
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[defaultStyles.input, { flex: 1 }]}
            placeholder='Mobile number'
            placeholderTextColor={Colors.gray}
            keyboardType='numeric'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={defaultStyles.divider} />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View style={defaultStyles.divider} />
        </View>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
              backgroundColor: '#fff',
            },
          ]}
        >
          <Ionicons name='mail' size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
            Continue with email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
              backgroundColor: '#fff',
            },
          ]}
        >
          <Ionicons name='logo-google' size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
            Continue with google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
              backgroundColor: '#fff',
            },
          ]}
        >
          <Ionicons name='logo-apple' size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
            Continue with apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
export default Page;
