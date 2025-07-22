"use client"

import { useState, useEffect } from "react"
import styles from "./comic-filters.module.css"

interface ComicFiltersProps {
  onFilterChange: (filters: { character: string; creator: string }) => void
  availableCharacters: string[]
  availableCreators: string[]
}

export function ComicFilters({ onFilterChange, availableCharacters, availableCreators }: ComicFiltersProps) {
  const [selectedCharacter, setSelectedCharacter] = useState("")
  const [selectedCreator, setSelectedCreator] = useState("")

  useEffect(() => {
    onFilterChange({
      character: selectedCharacter,
      creator: selectedCreator,
    })
  }, [selectedCharacter, selectedCreator, onFilterChange])

  const handleCharacterChange = (character: string) => {
    setSelectedCharacter(character)
  }

  const handleCreatorChange = (creator: string) => {
    setSelectedCreator(creator)
  }

  const clearFilters = () => {
    setSelectedCharacter("")
    setSelectedCreator("")
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label htmlFor="character-filter" className={styles.label}>
          Filter by Character:
        </label>
        <select
          id="character-filter"
          value={selectedCharacter}
          onChange={(e) => handleCharacterChange(e.target.value)}
          className={styles.select}
        >
          <option value="">All Characters</option>
          {availableCharacters.map((character) => (
            <option key={character} value={character}>
              {character}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="creator-filter" className={styles.label}>
          Filter by Creator:
        </label>
        <select
          id="creator-filter"
          value={selectedCreator}
          onChange={(e) => handleCreatorChange(e.target.value)}
          className={styles.select}
        >
          <option value="">All Creators</option>
          {availableCreators.map((creator) => (
            <option key={creator} value={creator}>
              {creator}
            </option>
          ))}
        </select>
      </div>

      {(selectedCharacter || selectedCreator) && (
        <button onClick={clearFilters} className={styles.clearButton}>
          Clear Filters
        </button>
      )}
    </div>
  )
}
