import React, {useRef, useMemo} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import ListItem from './components/ListItem';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { SAMPLE_DATA } from './assets/data/sampleData';

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider} />
  </>
)

export default function App() {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = () => {
    bottomSheetModalRef.current?.present();
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList 
          keyExtractor={(item) => item.id} 
          data={SAMPLE_DATA} 
          renderItem={( {item} ) => (
            <ListItem name={item.name} symbol={item.symbol} 
            logoUrl={item.image} currentPrice={item.current_price} 
            priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
            onPress={() => openModal()} />
          )} 
          ListHeaderComponent={<ListHeader />}
        />
      </SafeAreaView>
      <BottomSheetModal ref={bottomSheetModalRef} index={0} 
        snapPoints={snapPoints} style={styles.bottomSheet} >
        <View style={styles.contentContainer}>
          <Text>Awesome</Text>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper:{
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },  
  bottomSheet: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
