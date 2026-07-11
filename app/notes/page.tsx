import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface NotesProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

const Notes = async ({ searchParams }: NotesProps) => {
  const { search = '', page = '1' } = await searchParams;
  const pageNumber = Number(page) || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, pageNumber],
    queryFn: () => fetchNotes(search, pageNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
