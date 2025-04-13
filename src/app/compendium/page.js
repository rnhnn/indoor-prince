'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

// Importing individual JSON files for each year
import year2020 from '@/data/compendium/2020.json';
import year2021 from '@/data/compendium/2021.json';
import year2022 from '@/data/compendium/2022.json';
import year2023 from '@/data/compendium/2023.json';
import year2024 from '@/data/compendium/2024.json';
import year2025 from '@/data/compendium/2025.json';

export default function CompendiumPage() {
  const [activeYear, setActiveYear] = useState("2025");
  const [playingAudio, setPlayingAudio] = useState(null);
  const audioRef = useRef(null);

  // Consolidate year imports
  const yearImports = {
    2020: year2020,
    2021: year2021,
    2022: year2022,
    2023: year2023,
    2024: year2024,
    2025: year2025,
  };

  // Extract actual data from each file
  const yearData = Object.fromEntries(
    Object.entries(yearImports).map(([year, data]) => [year, data[year]])
  );

  const handleYearClick = (year) => {
    setActiveYear(year);
    setPlayingAudio(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleGameClick = (audioFile) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingAudio !== audioFile) {
      audio.src = `/audios/${audioFile}`;
      setPlayingAudio(audioFile);
      audio.play();
    } else {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
        setPlayingAudio(null);
      }
    }
  };

  return (
    <div className="compendium-container">
      <p className="collection-intro">
        A <em>musical</em> tribute to the games I’ve played since 2020, listed here in the order they were finished:
      </p>

      <menu className="collection-menu">
        {Object.keys(yearData).map((year) => (
          <li
            key={year}
            className={`collection-menu-item ${year === activeYear ? 'active' : ''}`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </li>
        ))}
      </menu>

      <div className="collection-container">
        {Object.keys(yearData).map((year) => (
          <ol
            key={year}
            className={`collection ${year === activeYear ? 'active' : ''}`}
          >
            {yearData[year]?.map((game, index) => (
              <li
                key={`${game.audio}-${index}`}
                className={`game ${playingAudio === game.audio ? 'is-active' : ''}`}
                onClick={() => handleGameClick(game.audio)}
              >
                <figure className="game-art">
                  <Image
                    src={`/images/compendium/${game.image}`}
                    alt={game.title}
                    width={264}
                    height={423}
                    layout="intrinsic"
                    priority={index === 0}
                  />
                  <span className="game-number" />
                </figure>
              </li>
            ))}
          </ol>
        ))}
      </div>

      <audio id="player" ref={audioRef} />
    </div>
  );
}
