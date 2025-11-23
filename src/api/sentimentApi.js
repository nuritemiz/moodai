import { HfInference } from '@huggingface/inference';
import Groq from 'groq-sdk';
import Config from 'react-native-config';

const HF_API_TOKEN = Config.HF_API_TOKEN || '';

const GROQ_API_KEY = Config.GROQ_API_KEY || '';

const hfClient = new HfInference(HF_API_TOKEN);
const groqClient = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

export const analyzeSentiment = async (text) => {
    if (!text || text.trim() === '') {
        throw new Error('Please enter some text.');
    }

    try {

        const output = await hfClient.textClassification({
            model: 'cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual',
            inputs: text,
        });

        if (!output || output.length === 0) {
            throw new Error('Invalid response from AI service.');
        }


        const topSentiment = output.sort((a, b) => b.score - a.score)[0];
        const label = topSentiment.label.toUpperCase();

        console.log(' Sentiment detected:', label, 'Score:', topSentiment.score);


        let suggestion = '';
        let summary = '';

        try {
            console.log(' Generating AI suggestion with Groq...');


            let systemPrompt = '';
            if (label === 'POSITIVE') {
                systemPrompt = 'Sen bir ruh sağlığı asistanısın. Pozitif duygudaki birine kısa, motive edici ve özgün bir öneri ver. Sadece öneriyi yaz, başka açıklama ekleme. Maksimum 2 cümle, Türkçe.';
                summary = '✨ Harika bir gün geçirmişsin!';
            } else if (label === 'NEGATIVE') {
                systemPrompt = 'Sen bir ruh sağlığı asistanısın. Negatif duygudaki birine empatik, teselli edici ve rahatlatıcı kısa bir öneri ver. Sadece öneriyi yaz, başka açıklama ekleme. Maksimum 2 cümle, Türkçe.';
                summary = '💙 Biraz zorlu bir gün olmuş gibi.';
            } else {
                systemPrompt = 'Sen bir ruh sağlığı asistanısın. Dengeli duygudaki birine kısa bir aktivite veya mindfulness önerisi ver. Sadece öneriyi yaz, başka açıklama ekleme. Maksimum 2 cümle, Türkçe.';
                summary = '⚖️ Dengeli bir gün.';
            }


            const chatCompletion = await groqClient.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: `Kullanıcının günlük notu: "${text.substring(0, 200)}"`
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.8,
                max_tokens: 100,
                top_p: 0.9,
            });

            suggestion = chatCompletion.choices[0]?.message?.content?.trim() || '';
            console.log('✅ AI suggestion generated via Groq:', suggestion);


            if (!suggestion || suggestion.length < 10) {
                throw new Error('Generated text too short');
            }

        } catch (error) {
            console.error(' AI generation failed:', error.message);

            // Alternatif (eğer internetten veri çekilmezse kullanılabilir.)
            const fallbackSuggestions = {
                POSITIVE: [
                    'Bu enerjini koru ve sevdiklerinle paylaş. 🌟',
                    'Bugünkü mutluluğunu günlüğüne yaz ve hatırla. 📝',
                    'Kendini ödüllendir, hak ettin! 🎁',
                    'Bu güzel anı fotoğrafla ve sakla. 📸',
                    'Pozitif enerjini başkalarına da yansıt. ✨'
                ],
                NEGATIVE: [
                    'Kendine bir kahve yap ve 10 dakika mola ver. ☕',
                    'Sevdiğin bir müzik dinle ve nefes egzersizi yap. 🎵',
                    'Bir arkadaşınla sohbet et, paylaşmak rahatlatır. 💬',
                    'Kısa bir yürüyüş yap, temiz hava iyi gelir. 🚶',
                    'Bugün zordu ama yarın daha iyi olacak. 🌈'
                ],
                NEUTRAL: [
                    'Rahatlamak için kısa bir yürüyüş yapabilirsin. 🌳',
                    'Yeni bir şey öğrenmeye zaman ayır. 📚',
                    'Kendine küçük bir hedef belirle ve başla. 🎯',
                    'Meditasyon veya yoga deneyebilirsin. 🧘',
                    'Bugün kendin için bir şeyler yap. 💆'
                ]
            };

            const suggestions = fallbackSuggestions[label] || fallbackSuggestions['NEUTRAL'];
            suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

            if (label === 'POSITIVE') {
                summary = '✨ Harika bir gün geçirmişsin!';
            } else if (label === 'NEGATIVE') {
                summary = '💙 Biraz zorlu bir gün olmuş gibi.';
            } else {
                summary = '⚖️ Dengeli bir gün.';
            }
        }

        return {
            sentiment: label,
            score: topSentiment.score,
            summary,
            suggestion,
        };

    } catch (error) {
        console.error('AI Analysis Error:', error);

        if (error.message && (error.message.includes('401') || error.message.includes('403'))) {
            throw new Error('API Token missing or invalid. Please check source code.');
        }
        throw error;
    }
};
