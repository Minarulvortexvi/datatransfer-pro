'use client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSession } from 'next-auth/react';
import { uploadToDropbox, getSharedLink } from '@/lib/api/dropbox';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface FileDropzoneProps {
  onTransferStart: (transferId: string, sharedLink?: string) => void;
}

export function FileDropzone({ onTransferStart }: FileDropzoneProps) {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!session?.accessToken || !session?.provider) {
      setError(t('transfer.authRequired'));
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const response = await axios.post('/api/transfer/start', {
        userId: session.user?.id || 'anonymous',
        provider: session.provider,
      });
      const transferId = response.data.transferId;

      let sharedLink: string | undefined;
      if (session.provider === 'dropbox') {
        for (const file of acceptedFiles) {
          await uploadToDropbox(session.accessToken, file, `transfers/${transferId}`);
          sharedLink = await getSharedLink(session.accessToken, `/transfers/${transferId}/${file.name}`);
        }
      }

      onTransferStart(transferId, sharedLink);
    } catch (error: any) {
      setError(t('transfer.dropzone.error') + ': ' + error.message);
    } finally {
      setUploading(false);
    }
  }, [session, onTransferStart, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-6 rounded-lg ${isDragActive ? 'border-blue-600' : 'border-gray-300'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{t('transfer.dropzone.active')}</p>
      ) : (
        <p>{t('transfer.dropzone.idle')}</p>
      )}
      {uploading && <p>{t('transfer.dropzone.uploading')}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
            }
