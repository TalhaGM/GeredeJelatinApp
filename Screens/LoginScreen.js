import React, { useState, useRef } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Animated,KeyboardAvoidingView,Platform,Image,} from'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';  // Correct Expo import

export default function UniqueLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const emailLabelAnim = useRef(new Animated.Value(email ? 1 : 0)).current;
  const passwordLabelAnim = useRef(new Animated.Value(password ? 1 : 0)).current;

  const animateLabel = (anim, toValue) => {
    Animated.timing(anim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const emailLabelStyle = {
    position: 'absolute',
    left: 10,
    top: emailLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
    fontSize: emailLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: emailLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#4e8cff'],
    }),
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  };

  const passwordLabelStyle = {
    position: 'absolute',
    left: 10,
    top: passwordLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
    fontSize: passwordLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: passwordLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#4e8cff'],
    }),
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient colors={['#4CAF50', '#81C784']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
      >
      <Image
          source={require('./assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>HOŞGELDİNİZ </Text>
        <Text style={styles.subtitle}>Giriş Yapınız</Text>

        <View style={styles.inputWrapper}>
          <Animated.Text style={emailLabelStyle}>Email</Animated.Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={text => setEmail(text)}
            onFocus={() => animateLabel(emailLabelAnim, 1)}
            onBlur={() => {
              if (!email) animateLabel(emailLabelAnim, 0);
            }}
          />
          <MaterialCommunityIcons name="email-outline" size={22} color="#8fce00" style={styles.icon} />
        </View>

        <View style={styles.inputWrapper}>
          <Animated.Text style={passwordLabelStyle}>Şifre</Animated.Text>
          <TextInput
            style={styles.input}
            secureTextEntry={secureText}
            value={password}
            onChangeText={text => setPassword(text)}
            onFocus={() => animateLabel(passwordLabelAnim, 1)}
            onBlur={() => {
              if (!password) animateLabel(passwordLabelAnim, 0);
            }}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.iconRight}>
            <MaterialCommunityIcons
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#8fce00"
            />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.button}
            onPress={() => alert('Login pressed!')}
          >
            <Text style={styles.buttonText}>GİRİŞ</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={{ marginTop: 15 }}>
          <Text style={styles.forgotText}>Şifreni mi unuttun?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems:'center',
  },
  logo: {
    width: 180,
    height: 140,
    marginBottom: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#F9F9F9',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 30,
    position: 'relative',
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#8fce00',
    borderRadius: 12,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  icon: {
    position: 'absolute',
    top: 13,
    right: 10,
  },
  iconRight: {
    position: 'absolute',
    top: 13,
    right: 10,
  },
  buttonWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#8fce00',
    fontWeight: '700',
    fontSize: 18,
  },
  forgotText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

