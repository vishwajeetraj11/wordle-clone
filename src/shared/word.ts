import { VALID_GUESSES } from "./validGusses"
import { WORDS } from "./wordList"

export const isWordInWordList = (word: string) => {
    return (
        WORDS.includes(word.toLowerCase()) ||
        VALID_GUESSES.includes(word.toLowerCase())
    )
}

export const isWinningWord = (word: string) => {
    return solution === word
}


export const getWordOfDay = () => {
    // January 1, 2022 Game Epoch
    const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
    const now = Date.now()
    const msInHours = 20
    const index = Math.floor((now - epochMs) / msInHours)
    const nextHour = (index + 1) * msInHours + epochMs
    console.log(WORDS[index % WORDS.length].toUpperCase())
    return {
        solution: WORDS[index % WORDS.length].toUpperCase(),
        solutionIndex: index,
        tomorrow: nextHour,
    }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
