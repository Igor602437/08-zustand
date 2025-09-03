'use client';

import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import NoteList from '@/components/NoteList/NoteList';
import Link from 'next/link';

interface NotesClientProps {
  tag: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', page, searchValue, tag],
    queryFn: () => fetchNotes(page, searchValue, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages || 1;

  const handleSearch = useDebouncedCallback((search: string) => {
    setSearchValue(search);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onSelect={page => setPage(page)}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {isLoading && !data && <Loader />}
      {isSuccess && data && data?.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>Notes not found</p>
      )}
    </div>
  );
};

export default NotesClient;
