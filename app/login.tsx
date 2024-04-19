import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const [countryCode, setCountryCode] = useState('+92');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
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
