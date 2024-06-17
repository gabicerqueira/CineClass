import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, Image } from 'react-native';
import { bancoExterno } from './firebaseConnection';
import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Fontes() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <App />;
}

export function App() {
  const [nomeFilme, setNomeFilme] = useState('');
  const [estrelas, setEstrelas] = useState('');
  const [genero, setGenero] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  async function cadastrarFilme() {
    if (nomeFilme === '' || estrelas === '' || genero === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    await addDoc(collection(bancoExterno, "filmes"), {
      nome: nomeFilme,
      estrelas: parseInt(estrelas),
      genero: genero
    });

    setNomeFilme('');
    setEstrelas('');
    setGenero('');
    setModalVisible(false);
    alert('Filme cadastrado com sucesso!');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inicio}>
        <Image source={require('./assets/images/inicio.png')} />
      </View>

      <View style={styles.branco}>
        <Text style={styles.titulo}>CineClass</Text>
        <Text style={styles.titulo2}>Cadastre seus filmes assistidos aqui na plataforma da CineClass!</Text>
        <TouchableOpacity style={styles.openButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.textoBotao}>Cadastrar Novo Filme</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Cadastrar Filme</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Filme"
              value={nomeFilme}
              onChangeText={setNomeFilme}
            />
            <TextInput
              style={styles.input}
              placeholder="Estrelas (1-5)"
              value={estrelas}
              onChangeText={setEstrelas}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Gênero"
              value={genero}
              onChangeText={setGenero}
            />
            <TouchableOpacity style={styles.botao} onPress={cadastrarFilme}>
              <Text style={styles.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1320',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    color: '#3f3f3f',
    fontFamily: 'Montserrat_800ExtraBold',
    marginBottom: 30,
  },
  titulo2: {
    fontSize: 22,
    color: '#3f3f3f',
    marginBottom: 20,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Montserrat_500Medium',
  },
  openButton: {
    backgroundColor: '#1C3F60',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#436286',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    color: '#000',
    borderColor: '#404040',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    fontFamily: 'Montserrat_400Regular',
  },
  botao: {
    backgroundColor: '#1C3F60',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#AFC1D0',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
  },
  branco: {
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    width: '100%',
    height: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  inicio:{
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
