import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, FlatList, StyleSheet, Image, View, TouchableOpacity } from "react-native";


export default function TimelineSessoesPage() {

  const [imagem, setImagem] = useState(require('../assets/images/relogio.png'));
  const [dataEncontro, setDataEncontro] = useState([]);
  const [dataObjeto, setDataObjeto] = useState([]);
  const [dataSituacao, setDataSituacao] = useState([]);


  const fetchDataEncontro = async () => {
    const resp = await fetch("http://academico3.rj.senac.br:8080/api/Encontro");
    const dataEncontro = await resp.json();
    setDataEncontro(dataEncontro);
    console.log(dataEncontro)
  };

  const fetchDataObjeto = async () => {
    const resp = await fetch("http://academico3.rj.senac.br:8080/api/ObjetoAprendizagem");
    const dataObjeto  = await resp.json();
    setDataObjeto (dataObjeto );
    console.log(dataObjeto )
  };

  const fetchDataSituacao = async () => {
    const resp = await fetch("http://academico3.rj.senac.br:8080/api/ObjetoAprendizagem");
    const dataSituacao = await resp.json();
    setDataSituacao(dataSituacao);
    console.log(dataSituacao)
  };
  
  useEffect(() => {
    fetchDataObjeto();
    fetchDataSituacao();
    fetchDataEncontro();
  }, []);

  // function openScreen() {
  //   // navigation.navigate('Informações', { dia: data.dia, titulo: data.titulo, situacao: data.situacao, descricao: data.descricao })
  //   navigation.navigate('Informações', data, dataObj)
  // }

  function trocarImagem() {
    setImagem(require('../assets/images/verifica.png'))
  }

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.timeline}>
        <View style={styles.parte1}>
          <View style={styles.circulo}>
            {/* <Image source={imagem} style={{ width: 19, height: 19 }} /> */}
          </View>
          <View style={styles.linha}></View>
        </View>
        {/* <View style={styles.badge}>
          <Image source={require('../assets/images/images.jpg')} style={{ width: 22, height: 25 }}></Image>
        </View> */}
        {/* <View style={styles.parte2}>
          <Text style={styles.titulo}>{item.dia}</Text>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.descricao}>Descrição: {item.descricao}</Text>
          <TouchableOpacity style={styles.button} onPress={openScreen} onPressOut={trocarImagem}>
            <Text style={styles.detalhes}>Detalhes</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.parte2}>
          <Text style={styles.titulo}>{item.horaInicio}</Text>
          <Text style={styles.descricao}>{item.observacao}</Text>
          <TouchableOpacity style={styles.button} onPressOut={trocarImagem}>
            <Text style={styles.detalhes}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={dataEncontro}
        extraData={dataObjeto}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    flexDirection: 'column',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  timeline: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    padding: 5,
  },
  tituloTimeline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    justifyContent: 'center'
  },
  parte1: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  circulo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00315a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linha: {
    backgroundColor: '#C5C5C5',
    height: '200%',
    width: 2,
    justifyContent: 'center',

  },
  parte2: {
    flex: 7,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginLeft: 10,
    boxShadow: "4px 2px 4px 4px rgba(0, 0, 0, 0.15)",
    /************/
  },
  badge: {
    // backgroundColor: '#F78B1F',
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 15,
    color: "#092C4C",
  },
  descricao: {
    fontSize: 15,
    color: '#000',
    marginTop: 10,

  },
  data: {
    fontSize: 15,
    color: '#656565',
  },
  button:{
    backgroundColor: '#092C4C',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    paddingTop: 10,
    marginTop: 10,
  },
  detalhes:{
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  }
});