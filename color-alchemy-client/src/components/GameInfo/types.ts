export interface GameInfoProps {
    userId: string
    movesLeft: number
    target: [r: number, g: number, b: number]
    delta: string
    closestColor: [r: number, g: number, b: number]
}