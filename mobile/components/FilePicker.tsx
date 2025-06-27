import { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { uploadToDropbox, getSharedLink } from '../lib/api/dropboxApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FilePickerProps {
  onSelect: (data: { uri: string; name: string; transferId: string; sharedLink?: string }) => void;
}

export function FilePicker({ onSelect }: FilePickerProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.type === 'success') {
        const { uri, name } = result;
        const accessToken = await AsyncStorage.getItem('dropboxAccessToken');
        if (!accessToken) {
          setError(t('transfer.authRequired'));
          return;
        }

        const response = await axios.post(`${process.env.API_URL}/transfer/start`, {
          userId: 'mobile-user',
          provider: 'dropbox',
        });

        const transferId = response.data.transferId;
        await uploadToDropbox(uri, name, `transfers/${transferId}`);
        const sharedLink = await getSharedLink(`/transfers/${transferId}/${name}`);
        onSelect({ uri, name, transferId, sharedLink });
      }
    } catch (err: any) {
      setError(t('filePicker.error') + ': ' + err.message);
    }
  };

  return (
    <View>
      <Button title={t('filePicker.select')} onPress={pickFile} />
      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
        }
