'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { downloadFromDropbox } from '@/lib/api/dropbox';

export default function ReceiveTransferPage() {
  const { t } = useTranslation();
  const { transferId } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [fileData, setFileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated' && session?.accessToken) {
      const fetchTransfer = async () => {
        try {
          const response = await axios.get(`/api/transfer/status/${transferId}`);
          const { sharedLink } = response.data;
          if (sharedLink && session.provider === 'dropbox') {
            const path = new URL(sharedLink).pathname.replace('/s/', '/').split('?')[0];
            const file = await downloadFromDropbox(session.accessToken, path);
            setFileData(file);
          }
        } catch (err: any) {
          setError(t('transfer.status.invalid') + ': ' + err.message);
        }
      };
      fetchTransfer();
    }
  }, [status, session, transferId, router, t]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">{t('transfer.receive.title')}</h1>
      {fileData ? (
        <div>
          <p>File Name: {fileData.name}</p>
          <p>Size: {(fileData.size / 1024 / 1024).toFixed(2)} MB</p>
          <a
            href={URL.createObjectURL(new Blob([fileData.file_blob]))}
            download={fileData.name}
            className="text-blue-600"
          >
            {t('transfer.qr.download')}
          </a>
        </div>
      ) : (
        <p>{t('transfer.receive.loading')}</p>
      )}
    </div>
  );
  }
