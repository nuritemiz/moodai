import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JournalContext } from '../context/JournalContext';

const HistoryScreen = () => {
    const { entries } = useContext(JournalContext);

    const renderItem = ({ item }) => {
        const borderColor = item.sentiment === 'POSITIVE' ? '#4CAF50' : item.sentiment === 'NEGATIVE' ? '#F44336' : '#FFA726';

        return (
            <View style={[styles.card, { borderLeftColor: borderColor }]}>
                <View style={styles.header}>
                    <Text style={styles.date}>{new Date(item.date).toLocaleDateString('tr-TR')} {new Date(item.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</Text>
                    <Text style={[styles.sentiment, { color: item.sentiment === 'POSITIVE' ? '#4CAF50' : item.sentiment === 'NEGATIVE' ? '#F44336' : '#FFA726' }]}>
                        {item.sentiment === 'POSITIVE' ? '😊 Pozitif' : item.sentiment === 'NEGATIVE' ? '😔 Negatif' : '😐 Nötr'}
                    </Text>
                </View>
                <Text style={styles.text} numberOfLines={2}>{item.text}</Text>
                <Text style={styles.summary}>"{item.summary}"</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Henüz bir kayıt yok.</Text>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContent: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderLeftWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    date: {
        color: '#888',
        fontSize: 12,
    },
    sentiment: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    summary: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
        fontSize: 16,
    }
});

export default HistoryScreen;
