import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';

const PRIMARY = '#E01F00';

const EMOJIS = [
    { id: '1', source: require('../../assets/newIcon/profileIcons/mechanics.png'), label: 'Mechanics' },
    { id: '2', source: require('../../assets/newIcon/profileIcons/engineering.png'), label: 'Engineering' },
    { id: '3', source: require('../../assets/newIcon/profileIcons/motorsports.png'), label: 'Motorsports' },
    { id: '4', source: require('../../assets/newIcon/profileIcons/cars.png'), label: 'Cars' },
    { id: '5', source: require('../../assets/newIcon/profileIcons/racing.png'), label: 'Racing' },
    { id: '6', source: require('../../assets/newIcon/profileIcons/technology.png'), label: 'Technology' },
    { id: '7', source: require('../../assets/newIcon/profileIcons/confident.png'), label: 'Confident' },
    { id: '8', source: require('../../assets/newIcon/profileIcons/ambitious.png'), label: 'Ambitious' },
];

const ChooseEmoji = ({ route }) => {
    const navigation = useNavigation();
    const { userType } = route?.params || {};
    const [selected, setSelected] = useState(null);

    const handleContinue = () => {
        if (!selected) return;
        navigation.navigate('upload_photos', {
            userType,
            selectedEmoji: selected.source,
        });
    };

    const renderItem = ({ item }) => {
        const isSelected = selected?.id === item.id;
        return (
            <TouchableOpacity
                style={[styles.emojiBox, isSelected && styles.emojiBoxSelected]}
                onPress={() => setSelected(item)}
                activeOpacity={0.8}
            >
                <Image source={item.source} style={styles.emojiImg} resizeMode="contain" />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <MainHeader onBackPress={() => navigation.goBack()} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Choose Emoji</Text>

                <FlatList
                    data={EMOJIS}
                    keyExtractor={(item) => item.id}
                    numColumns={4}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.grid}
                    renderItem={renderItem}
                />

                <View style={{ height: vh(12) }} />
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!selected}
                />
            </View>
        </SafeAreaView>
    );
};

export default ChooseEmoji;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: vw(4),
        paddingTop: vh(1),
    },
    scroll: {
        paddingHorizontal: vw(5),
        paddingBottom: vh(2),
    },
    title: {
        fontSize: fs(26),
        fontFamily: FONTS.display_bold,
        fontWeight: '700',
        color: '#111',
        marginBottom: vh(3),
    },
    grid: {
        gap: vw(3),
    },
    row: {
        gap: vw(3),
        marginBottom: vw(3),
    },
    emojiBox: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#EFEFEF',
        backgroundColor: '#FFF5F4',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    emojiBoxSelected: {
        borderColor: PRIMARY,
        backgroundColor: '#FFE8E5',
    },
    emojiImg: {
        width: '70%',
        height: '70%',
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: vw(5),
        paddingBottom: vh(3),
        paddingTop: vh(1),
        backgroundColor: '#fff',
    },
});
