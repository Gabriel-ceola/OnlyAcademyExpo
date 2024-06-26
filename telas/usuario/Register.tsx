// telas/usuario/Register.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { RootStackParamList } from './types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
};

const Register: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [location, setLocation] = useState('');

  const moment = require('moment');

  const handleRegister = async () => {
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      bio: bio,
      birthdate: moment(birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      location: location
    };

    navigation.navigate('Home');

    try {
      const response = await axios.post('http://10.47.4.86:3000/registrar', newUser);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Usuário registrado com sucesso');
        setBirthdate('')
        setFirstName('')
        setLastName('')
        setBio('')
        setLocation('')
      } else {
        Alert.alert('Erro', 'Falha ao registrar usuário');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao registrar usuário');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Usuário</Text>
      <TextInputMask
        type={'custom'}
        options={{
          mask: '99/99/9999'
        }}
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={birthdate}
        onChangeText={setBirthdate}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Biografia"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Register;
