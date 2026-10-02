import RootShell, { BASE_METADATA } from '@/components/layout/RootShell';
import '../globals.css';

export const metadata = BASE_METADATA;

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
