import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Platform,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JournalContext } from '../context/JournalContext';
import { analyzeSentiment } from '../api/sentimentApi';

const HomeScreen = ({ navigation }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const { addEntry } = useContext(JournalContext);

    const handleAnalyze = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setResult(null);
        Keyboard.dismiss();

        try {
            const analysis = await analyzeSentiment(text);
            setResult(analysis);
            addEntry(text, analysis);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getBackgroundColor = () => {
        if (!result) return '#f5f5f5';
        switch (result.sentiment) {
            case 'POSITIVE':
                return '#79e200ff';
            case 'NEGATIVE':
                return '#b4b4b457';
            default:
                return '#e7fafcff';
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Mood AI</Text>
                    <Text style={styles.subtitle}>Bugün nasıl hissediyorsun?</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Düşüncelerini buraya yaz..."
                        multiline
                        value={text}
                        onChangeText={setText}
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleAnalyze}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Analiz Et</Text>
                        )}
                    </TouchableOpacity>

                    {result && (
                        <View style={styles.resultContainer}>
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Duygu: {
                                    result.sentiment === 'POSITIVE' ? 'Pozitif ✨' :
                                        result.sentiment === 'NEGATIVE' ? 'Negatif 😔' : 'Nötr 😐'
                                }</Text>
                                <Text style={styles.cardText}>{result.summary}</Text>
                            </View>

                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Öneri</Text>
                                <Text style={styles.cardText}>{result.suggestion}</Text>
                            </View>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.historyButton}
                        onPress={() => navigation.navigate('History')}
                    >
                        <Text style={styles.historyButtonText}>Geçmiş Kayıtlar</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        transition: 'background-color 0.5s ease',
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        fontSize: 16,
        textAlignVertical: 'top',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
        color: '#333',
    },
    button: {
        width: '100%',
        backgroundColor: '#0e0048ff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    resultContainer: {
        width: '100%',
        marginTop: 10,
    },
    sentimentTitle: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#444',
    },
    cardText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    historyButton: {
        marginTop: 20,
        padding: 10,
    },
    historyButtonText: {
        color: '#0e0048ff',
        fontSize: 16,
        fontWeight: '500',
    }
});

export default HomeScreen;
