import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const storedEntries = await AsyncStorage.getItem('@journal_entries');
            if (storedEntries) {
                setEntries(JSON.parse(storedEntries));
            }
        } catch (e) {
            console.error('Failed to load entries', e);
        } finally {
            setLoading(false);
        }
    };

    const addEntry = async (text, analysisResult) => {
        const newEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            text,
            ...analysisResult,
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);

        try {
            await AsyncStorage.setItem('@journal_entries', JSON.stringify(updatedEntries));
        } catch (e) {
            console.error('Failed to save entry', e);
        }
    };

    const clearEntries = async () => {
        try {
            await AsyncStorage.removeItem('@journal_entries');
            setEntries([]);
        } catch (e) {
            console.error('Failed to clear entries', e);
        }
    };

    return (
        <JournalContext.Provider value={{ entries, addEntry, clearEntries, loading }}>
            {children}
        </JournalContext.Provider>
    );
};
