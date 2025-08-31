'use client';

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import Loader from '@/components/Loader/Loader';

const NotePreviewClient = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={handleClose}>
      {isLoading && <Loader />}
      {isError && <p>Something went wrong.</p>}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
          </div>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <p className={css.date}>
              Created{' '}
              {new Date(note.createdAt)
                .toLocaleString('sv-SE')
                .replace(' ', ' ')}
            </p>
          </div>
          <button type="button" onClick={handleClose} className={css.backBtn}>
            Go Back
          </button>
        </div>
      )}
    </Modal>
  );
};

export default NotePreviewClient;
