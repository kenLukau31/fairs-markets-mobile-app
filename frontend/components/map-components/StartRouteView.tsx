import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface FairItem {id: number, title: string; schedule: string; address: string}

interface StartRouteProps {
    fair: FairItem;
    onBeginRoute: () => void
}

interface RoutePointsProps {
    title: string;
    address: string;
    isOrigin: boolean;
}

const RoutePoint = ({ title, address, isOrigin}: RoutePointsProps) => {
    return (
        <View>
            <Text style={styles.pointTitle}>{isOrigin ? 'A tua localização' : title}</Text>
            <Text style={styles.pointAddress}>{isOrigin ? 'Localização Atual' : address}</Text>
        </View>
    )
}

export default function StartRoute({ fair, onBeginRoute }: StartRouteProps) {
    const [isDefaultOrder, setIsDefaultOrder] = useState(true);

    const originPoint = {
        title: 'A tua localização',
        address: 'Localização Atual',
        isOrigin: true
    }

    const destinationPoint = {
        title: fair.title,
        address: fair.address,
        isOrigin: false
    }

    const firstPoint = isDefaultOrder ? originPoint : destinationPoint;
    const secondPoint = isDefaultOrder ? destinationPoint : originPoint;

    const handleSwap = () => {
        setIsDefaultOrder(prev => !prev)
    }

    return (
        <View style={styles.container}>
            <View style={styles.distanceInfo}>
                <View style={styles.distanceSection}>
                    <Image source={require('../../assets/map-icons/walk-icon.png')} />
                    <Text style={{color: '#7A716E'}}> 15 min</Text>
                </View>
                <View style={styles.distanceSection}>
                    <Image source={require('../../assets/map-icons/car-icon.png')} />
                    <Text style={{color: '#7A716E'}}> 15 min</Text>
                </View>
                <View style={styles.distanceSection}>
                    <Image source={require('../../assets/map-icons/bus-icon.png')} />
                    <Text style={{color: '#7A716E'}}> 30 min</Text>
                </View>
            </View>
            <View style={styles.line}></View>
            <View>
                <Text style={styles.title}>{fair.title}</Text>
                <View style={styles.details}>
                    <Image source={require('../../assets/map-icons/distance-icon.png')} />
                    <Text style={{color: '#7A716E'}}>1.22 Km</Text>
                    <View style={{width: 5, height: 5, borderRadius: 50, backgroundColor: '#C64F23'}}></View>
                    <Text style={{color: '#7A716E'}}>1h:30 min</Text>
                </View>
            </View>

            <View style={styles.routeHeader}>
                <View style={styles.addressSection}>
                    <View style={styles.pointContainer}>
                        <View style={styles.iconColumn}>
                            <Image
                                source={require('../../assets/map-icons/yellow-dot-icon.png')}
                                style={styles.dotImage}
                            />
                        </View>
                        <View style={styles.dottedLineContainer}>
                            <View style={styles.dottedLine}/>
                        </View>

                        <RoutePoint
                            title={firstPoint.title}
                            address={firstPoint.address}
                            isOrigin={firstPoint.isOrigin}
                        />
                    </View>
                
                    <View style={styles.pointContainer}>
                        <View style={styles.iconColumn}>
                            <Image
                                source={require('../../assets/map-icons/orange-dot-icon.png')}
                                style={styles.dotImage}
                            />
                        </View>

                        <RoutePoint
                            title={secondPoint.title}
                            address={secondPoint.address}
                            isOrigin={secondPoint.isOrigin}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={handleSwap} style={styles.swapButton}>
                    <Image source={require('../../assets/map-icons/swap-route-icon.png')} style={styles.swapIcon} />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.startRouteButton} onPress={onBeginRoute}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Iniciar Rota</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    distanceInfo: {
        flexDirection: 'row',
        columnGap: 40,
        alignSelf: 'center',
        marginTop: 20
    },
    distanceSection: {
        flexDirection: 'row'
    },
    line: {
        width: 300,
        height: 2,
        backgroundColor: 'rgba(250, 182, 171, 0.5)',
        alignSelf: 'center',
        marginTop: 15
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 30
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 15,
        columnGap: 5
    },

    routeHeader: {
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 15,
        marginBottom: 10,
        marginTop: 40
    },
    addressSection: {
        flex: 1, 
    },
    pointContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    iconColumn: {
        marginRight: 15,
    },
    pointTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pointAddress: {
        fontSize: 14,
        color: '#7A716E',
    },
    dotImage: {
        width: 18, 
        height: 18,
    },
    dottedLineContainer: {
        position: 'absolute',
        top: 5, 
        bottom: -15, 
        width: '100%',
        marginLeft: 8
        
    },
    dottedLine: {
        width: 1, 
        flex: 1, 
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#FFB800', 
    },
    swapButton: {
        paddingTop: 30,
        marginRight: 15
    },
    swapIcon: {
        width: 18,
        height: 40,
        resizeMode: 'contain',
        tintColor: '#C64F23', 
    },
    startRouteButton: {
        backgroundColor: '#C64F23',
        margin: 'auto',
        width: 280,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    }
});