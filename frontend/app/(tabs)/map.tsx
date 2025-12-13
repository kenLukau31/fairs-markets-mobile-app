import React, { useState, useMemo, useRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ThemedView } from '@/components/themed-view';
import locations from '../data/locations.json';
import MapListView from '@/components/map-components/ListView'
import FairDetails from '@/components/map-components/MarketView';
import StartRoute from '@/components/map-components/StartRouteView';
import FullMap from '@/components/map-components/FullMapView';


const data = [
    {
        id: 1,
        title: 'Mercado do Bolhão',
        schedule: 'Seg - Sex 11:00 - 19:00',
        address: 'R. Formosa 322, 4000-248 Porto'
    },
    {
        id: 2,
        title: 'Time Out Market Porto',
        schedule: 'Todos os dias 10:00 - 00:00',
        address: 'Praça De Almeida Garrett, Porto 40'
    },
    {
        id: 3,
        title: 'Feira da Vandoma',
        schedule: 'Sábado 06:00 - 12:00',
        address: 'Av. 25 de Abril, 4300-537 Porto'
    },
    {
        id: 4,
        title: 'Feira da Sra. da Hora',
        schedule: 'Sábado 09:00 - 14:00',
        address: 'Parque Dr. João Gomes Laranjo'
    },
    {
        id: 5,
        title: 'Mercado do Bolhão',
        schedule: 'Seg - Sex 11:00 - 19:00',
        address: 'R. Formosa 322, 4000-248 Porto'
    },
    {
        id: 6,
        title: 'Time Out Market Porto',
        schedule: 'Todos os dias 10:00 - 00:00',
        address: 'Praça De Almeida Garrett, Porto 40'
    },
    {
        id: 7,
        title: 'Feira da Vandoma',
        schedule: 'Sábado 06:00 - 12:00',
        address: 'Av. 25 de Abril, 4300-537 Porto'
    },
    {
        id: 8,
        title: 'Feira da Sra. da Hora',
        schedule: 'Sábado 09:00 - 14:00',
        address: 'Parque Dr. João Gomes Laranjo'
    }
]
interface FairItem {id: number, title: string; schedule: string; address: string}
type ViewMode = 'list' | 'details' | 'route' | 'fullRoute';

export default function MapScreen() {
  const [selectedFair, setSelectedFair] = useState<FairItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const screenHeight = Dimensions.get('window').height;

  // Bottom Sheet Ref
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ({
         listMin: 30,
         listExpanded: screenHeight * 0.30,
         details: screenHeight * 0.38,
         route: screenHeight * 0.60,
         fullRoute: screenHeight * 0.15
  }), [screenHeight]);

  // Dynamic Snap Points, depending on the component
  const { dynamicSnapPoints, initialIndex } = useMemo(() => {
    switch(viewMode) {
      case 'list':
        return {
          dynamicSnapPoints: [snapPoints.listMin, snapPoints.listExpanded],
          initialIndex: 1
        };
      case 'details': 
        return {
          dynamicSnapPoints: [snapPoints.listMin, snapPoints.listExpanded, snapPoints.details],
          initialIndex: 2
        };
      case 'route': 
        return {
          dynamicSnapPoints: [snapPoints.listMin, snapPoints.route],
          initialIndex: 2
        };
      case 'fullRoute':
        return {
          dynamicSnapPoints: [snapPoints.listMin, snapPoints.fullRoute],
          initialIndex: 2
        }
        default: return { dynamicSnapPoints: [snapPoints.listMin], initialIndex: 0}
      }
  }, [viewMode, snapPoints])

  // Handling Card Press
  const handleCardPress = (fair: FairItem) => {
    setSelectedFair(fair);
    setViewMode('details');
  };

  // Handling Back to List
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedFair(null);
  }

  // Handling Start Route
  const handleStartRoute = () => {
    setViewMode('route');
  }

  // Handling View Route
  const handleRouteView = () => {
    setViewMode('fullRoute')
  }

  // Handling Remove Route
  const handleEndRoute = () => {
    setViewMode('list');
    setSelectedFair(null);
  }

  // Handling content rendering
  const renderContent = () => {
    if (viewMode === 'list') {
      return <MapListView data={data} onSelect={handleCardPress}/>
    } else if (viewMode === 'details' && selectedFair) {
      return <FairDetails fair={selectedFair} onBack={handleBackToList} onStartRoute={handleStartRoute}/>
    } else if (viewMode === 'route' && selectedFair) {
      return <StartRoute fair={selectedFair} onBeginRoute={handleRouteView} />
    } else if (viewMode === 'fullRoute' && selectedFair) {
      return <FullMap fair={selectedFair} onEndRoute={handleEndRoute} />
    }
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
                latitude: 41.1579, 
                longitude: -8.6291,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
          />
        ))}
      </MapView>
      <BottomSheet
        key={viewMode}
        ref={bottomSheetRef}
        index={initialIndex}
        snapPoints={dynamicSnapPoints}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.indicator}
      >
        <BottomSheetView style={{flex: 1}}>
          {renderContent()}
        </BottomSheetView>
      </BottomSheet>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  background: {
      backgroundColor: '#FCFBFA',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  },
  indicator: {
      backgroundColor: '#F88B72',
      width: 60,
      height: 6,
    },
});
