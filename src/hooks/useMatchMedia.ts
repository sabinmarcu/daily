import {
  useState,
  useEffect,
} from 'react';

const matchMedia = (media: string) => window.matchMedia(media);

export const useMatchMedia = (media: string) => {
  const [matches, setMatches] = useState<boolean>(
    matchMedia(media).matches,
  );
  useEffect(
    () => {
      const handler = ({ matches: m }: MediaQueryListEvent) => setMatches(m);
      const mediaMatch = matchMedia(media);
      mediaMatch.addEventListener('change', handler);
      return () => mediaMatch.removeEventListener('change', handler);
    },
    [media, setMatches],
  );
  return matches;
};
