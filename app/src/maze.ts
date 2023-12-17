import { shuffleArray } from "./utils"

type Vec2<T> = {x: T, y: T}

export const generateMazeDfs = (maze: number[][], initialCell: Vec2<number>): number[][] => {
  const dfs = (location: Vec2<number>, visited: Set<string>) => {
    maze[location.x][location.y] = 1
    visited.add(JSON.stringify(location))

    const neighborLookups: Vec2<number>[] = [
      {x: location.x - 1, y: location.y},
      {x: location.x + 1, y: location.y},
      {x: location.x, y: location.y - 1},
      {x: location.x, y: location.y + 1}
    ].filter(n => n.x >= 0 && n.x < maze.length && n.y >= 0 && n.y < maze.length)

    shuffleArray(neighborLookups).forEach(n => {
      if (visited.has(JSON.stringify(n))) {
        return;
      }

      dfs(n, visited)
    })
  }

  dfs(initialCell, new Set())

  return maze
}