# Conway's Game of Life

An interactive implementation of the famous cellular automaton created by British mathematician John Horton Conway, built with React and TypeScript.

![Game of Life Screenshot](public/images/game-of-life-screenshot.png)

## About the Game of Life

Conway's Game of Life is a zero-player cellular automaton that simulates the evolution of cells on a two-dimensional grid. Despite the simplicity of its rules, the game can create complex and surprising patterns.

### Rules

1. **Any live cell with fewer than two live neighbors dies (underpopulation).**
2. **Any live cell with two or three live neighbors survives to the next generation.**
3. **Any live cell with more than three live neighbors dies (overpopulation).**
4. **Any dead cell with exactly three live neighbors becomes alive (reproduction).**

## Technologies Used

- React 19
- TypeScript
- Tailwind CSS
- Vite (build tool)
- Jest (testing)

## Installation and Execution

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/game-of-life.git
   cd game-of-life
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Run the project in development mode:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Access the application in your browser:
   ```
   http://localhost:5173
   ```

## Project Structure

```
/src
  /components
    Board.tsx          # Board component
    BoardCell.tsx      # Individual cell component
    BoardControls.tsx  # Game controls
    GameOfLife.tsx     # Main component
  /hooks
    useGameOfLife.ts   # Game state management hook
  /services
    BoardManager.ts    # Board operations
    GameRules.ts       # Game rules implementation
    GameService.ts     # Game operations coordination
  /types
    board.ts           # Type definitions
  /tests
    /components        # Component tests
    /hooks             # Hook tests
    /services          # Service tests
  App.tsx
  main.tsx
/public
  /images
    game-of-life-screenshot.png
/babel.config.js       # Babel configuration for tests
/jest.config.js        # Jest configuration
/jest.setup.js         # Jest setup file
```

## Implemented Features

1. **Interactive Board**: Click on cells to toggle between alive and dead states.
2. **Simulation Controls**:
   - Advance to the next generation
   - Advance X generations at once
   - Start/pause continuous simulation
   - Reset the board

3. **Game Information**:
   - Generation counter
   - Visual state representation

## Design Decisions

### Architecture

- **SOLID Principles**: Application of single responsibility, open-closed, and dependency inversion principles
- **Separation of Concerns**: Game logic separated into services to facilitate maintenance and testing
- **Reusable Components**: Each UI element is an independent React component
- **Immutability**: All operations on the board return new copies instead of modifying the original state

### Performance Optimizations

- **Memoization**: Using `memo` to avoid unnecessary re-renders of components
- **useCallback**: Memoized functions to ensure reference stability
- **Efficient Updates**: Use of state update functions to avoid stale closures

## Testing

This project implements a comprehensive testing strategy including:

- **Unit Tests**: Testing individual services and functions
- **Component Tests**: Testing React components in isolation
- **Hook Tests**: Testing custom hooks
- **Integration Tests**: Testing interactions between services

Run tests with:

```bash
npm test              # Run all tests
npm run test:watch    # Run in watch mode
npm run test:coverage # Generate coverage report
```

For more detailed testing information, see [TESTING.md](TESTING.md).

## Assumptions and Constraints

- **Board Boundaries**: Cells at the edges of the board have fewer neighbors, as an "infinite" or wrap-around board is not implemented.
- **Board Size**: The default size is 20x20 cells, offering a good balance between visibility and performance.
- **Simulation Speed**: The default speed is 200ms per generation.

## Potential Future Improvements

- **Predefined Patterns**: Add a library of known patterns (glider, blinker, etc.)
- **Infinite Board**: Implement a board that expands or has wrap-around at the edges
- **State History**: Allow going back and forth through the history of generations
- **Statistics**: Show statistics such as total population, growth rate, etc.