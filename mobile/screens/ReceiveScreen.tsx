import { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { downloadFromDropbox } from '../lib/api/dropboxApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export function ReceiveScreen() {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const { transferId } = route.params as { transferId: string };
  const [fileData, setFileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('dropboxAccessToken');
        if (!accessToken) {
          navigation.navigate('Auth');
          return;
        }

        const response = await axios.get(`${process.env.API_URL}/transfer/status/${transferId}`);
        const { sharedLink, filePath } = response.data;
        if (sharedLink) {
          const file = await downloadFromDropbox(filePath);
          setFileData(file);
        }
      } catch (err: any) {
        setError(t('transfer.status.invalid') + ': ' + err.message);
      }
    };
    fetchTransfer();
  }, [transferId, navigation, t]);

  const saveFile = async () => {
    if (fileData) {
      const fileUri = `${FileSystem.documentDirectory}${fileData.name}`;
      await FileSystem.writeAsStringAsync(fileUri, Buffer.from(fileData.file_blob).toString('base64'), {
        encoding: FileSystem.EncodingType.Base64,
      });
      alert(t('transfer.receive.saved') + fileUri);
    }
  };

  if (error) {
    return (
      <View className="flex-1 p-6">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">{t('transfer.receive.title')}</Text>
      {fileData ? (
        <View>
          <Text>File Name: {fileData.name}</Text>
          <Text>Size: {(fileData.size / 1024 / 1024).toFixed(2)} MB</Text>
          <Button title={t('transfer.qr.download')} onPress={saveFile} />
        </View>
      ) : (
        <Text>{t('transfer.receive.loading')}</Text>
      )}
    </View>
  );
    }
