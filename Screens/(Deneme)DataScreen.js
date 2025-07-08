import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

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

const data = [
  { id: '4001', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4002', bloom: '200-220', mesh: 20, stok:'50.000' },
  { id: '4003', bloom: '220-230', mesh: 8, stok: '20.000' },
  { id: '4004', bloom: '200-230', mesh: 8, stok: '250.000' },
  { id: '4005', bloom: '240-220', mesh: 8, stok: '20.000' },
  { id: '4006', bloom: '200-220', mesh: 8, stok: '102220.000' },
  { id: '4007', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4008', bloom: '200-220', mesh: 8, stok: '10320.000' },
  { id: '4009', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4010', bloom: '200-220', mesh: 8, stok: '500.000' },
  { id: '4011', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4012', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4013', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4014', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4015', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4016', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4017', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4018', bloom: '200-220', mesh: 8, stok: '100.000' },
  { id: '4019', bloom: '200-220', mesh: 8, stok: '100.000' },
];

const DataScreen = ({ navigation }) => {
  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 && styles.rowEven]}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.bloom}</Text>
      <Text style={styles.cell}>{item.mesh}</Text>
      <Text style={styles.cell}>{item.stok}</Text>
    </View>
  );

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
