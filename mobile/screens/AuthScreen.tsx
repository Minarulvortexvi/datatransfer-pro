import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AuthScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleDropboxLogin = async () => {
    const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${process.env.DROPBOX_CLIENT_ID}&redirect_uri=${process.env.DROPBOX_REDIRECT_URI}&response_type=code&scope=files.content.write files.content.read sharing.write&token_access_type=offline`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, process.env.DROPBOX_REDIRECT_URI);

    if (result.type === 'success') {
      const code = new URL(result.url).searchParams.get('code');
      if (code) {
        try {
          const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `code=${code}&grant_type=authorization_code&client_id=${process.env.DROPBOX_CLIENT_ID}&client_secret=${process.env.DROPBOX_CLIENT_SECRET}&redirect_uri=${process.env.DROPBOX_REDIRECT_URI}`,
          });
          const { access_token, refresh_token } = await response.json();
          await AsyncStorage.setItem('dropboxAccessToken', access_token);
          await AsyncStorage.setItem('dropboxRefreshToken', refresh_token);
          navigation.navigate('Home');
        } catch (error) {
          console.error('Dropbox auth failed:', error);
        }
      }
    }
  };

  return (
    <View className="flex-1 justify-center p-6">
      <Button title={t('login.signInWithDropbox')} onPress={handleDropboxLogin} />
    </View>
  );
}
