'use client';

import Loader from '@/components/Loader/Loader';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NoteDetails.module.css';

const NoteDetailsClient = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  const { id } = useParams<{ id: string }>();
  console.log(id);
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['myNote', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <p>Something went wrong.</p>}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <p className={css.date}>
                Created{' '}
                {new Date(note.createdAt)
                  .toLocaleString('sv-SE')
                  .replace(' ', ' ')}
              </p>
            </div>
          </div>
          <button type="button" onClick={handleClose} className={css.backBtn}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteDetailsClient;
