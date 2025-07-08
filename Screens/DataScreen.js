import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; 

const handleLogout = async (navigation) => {
  try {
    await signOut(auth);
    console.log('Kullanıcı çıkış yaptı.');
    navigation.replace('LoginScreen');
  } catch (error) {
    console.error('Çıkış hatası:', error.message);
    alert('Çıkış sırasında bir hata oluştu: ' + error.message);
  }
};

const DataScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bloom_mesh_data"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(items);
      setLoading(false);
    }, (error) => {
      console.error("Firestore veri çekme hatası:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 && styles.rowEven]}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.bloom}</Text>
      <Text style={styles.cell}>{item.mesh}</Text>
      <Text style={styles.cell}>{item.stok}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#558B2F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ÜRÜN TABLOSU</Text>

      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>BLOOM</Text>
        <Text style={[styles.cell, styles.headerCell]}>MESH</Text>
        <Text style={[styles.cell, styles.headerCell]}>STOK</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.logoutButton}>
        <Button
          title="Çıkış Yap"
          onPress={() => handleLogout(navigation)}
          color="#558B2F"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#d0e6ff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#558B2F',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#b6d0f7',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  rowEven: {
    backgroundColor: '#f5faff',
  },
  headerRow: {
    backgroundColor: '#558B2F',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    color: '#2d3a4b',
  },
  headerCell: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 24,
    alignSelf: 'center',
    width: '50%',
  },
});

export default DataScreen;
