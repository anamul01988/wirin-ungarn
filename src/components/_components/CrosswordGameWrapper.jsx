"use client";

import CrosswordGame from './CrosswordGame';
import { TUTTI_FRUTTI_XML } from './data/crosswordData';

export default function CrosswordGameWrapper() {
  return <CrosswordGame xmlData={TUTTI_FRUTTI_XML} />;
}

