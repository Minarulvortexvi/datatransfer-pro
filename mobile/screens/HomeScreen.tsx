import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FilePicker } from '../components/FilePicker';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [transferData, setTransferData] = useState<{ uri: string; name: string; transferId: string; sharedLink?: string } | null>(null);

  const handleFileSelect = (data: { uri: string; name: string; transferId: string; sharedLink?: string }) => {
    setTransferData(data);
  };

  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">{t('home.title')}</Text>
      <FilePicker onSelect={handleFileSelect} />
      {transferData && (
        <View className="mt-4">
          <Text>Transfer ID: {transferData.transferId}</Text>
          <Text>File: {transferData.name}</Text>
          {transferData.sharedLink && (
            <Button
              title={t('transfer.qr.download')}
              onPress={() => navigation.navigate('Receive', { transferId: transferData.transferId })}
            />
          )}
        </View>
      )}
    </View>
  );
          }
