import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FairItem {id: number, title: string; schedule: string; address: string}

interface FullMapViewProps {
    fair: FairItem;
    onEndRoute: () => void;
}


export default function FullMap({ fair, onEndRoute }: FullMapViewProps) {

    return(
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 15}}>15 min</Text>
                </View>
                <View style={styles.routeDetails}>
                    <Text style={{color: '#7A716E', fontSize: 18}}>1.22 Km</Text>
                    <View style={{width: 5, height: 5, borderRadius: 50, backgroundColor: '#C64F23'}}></View>
                    <Text style={{color: '#7A716E', fontSize: 18}}>10:15h</Text>
                </View>                
            </View>
            <View>
                <TouchableOpacity style={styles.endRouteButton} onPress={onEndRoute}>
                    <Text style={{color: 'white', fontWeight: 600}}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row'
    },
    routeDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 15,
        columnGap: 10
    },
    endRouteButton: {
        backgroundColor: '#C64F23',
        margin: 'auto',
        width: 90,
        height: 35,
        marginBottom: 30,
        marginLeft: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
})