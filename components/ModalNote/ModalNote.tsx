'use client';

import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const ModalNote = ({ children }: Props) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div>
      <div>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default ModalNote;
