# Testing Guide for Game of Life

This document provides instructions for running and writing tests for the Game of Life application.

## Setting Up the Testing Environment

1. **Install Dependencies**

   The project uses Jest for testing along with React Testing Library for component tests. Install them with:

   ```bash
   npm install --save-dev jest ts-jest @types/jest
   ```

2. **Configuration Files**

   The project includes several configuration files for testing:

   - `jest.config.js` - Jest configuration
   - `jest.setup.js` - Jest setup and extensions

## Test Structure

The tests are organized in a structure that mirrors the application code:

```
/src
  /tests
    /components
      BoardCell.test.tsx        # Tests for BoardCell component
      Board.test.tsx            # Tests for Board component
      BoardControls.test.tsx    # Tests for BoardControls component
      GameOfLife.test.tsx       # Tests for GameOfLife component
    /hooks
      useGameOfLife.test.tsx    # Tests for the game hook
    /services
      BoardManager.test.ts      # Tests for board operations
      GameRules.test.ts         # Tests for Game of Life rules
      GameService.test.ts       # Tests for the game service
```

## Running Tests

The project includes several npm scripts for running tests:

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs when files change)
npm run test:watch

# Generate a coverage report
npm run test:coverage

# Run specific test categories
npm run test:components
npm run test:hooks
npm run test:services
```

## Writing Tests for Different Components

### 1. Service Tests

Service tests focus on the business logic and should verify:

```typescript
// Example: Testing a service function
describe('BoardManager', () => {
  describe('toggleCell', () => {
    it('should toggle a cell from dead to alive', () => {
      // Arrange
      const boardManager = new BoardManager();
      const board = boardManager.initializeBoard(3);
      const row = 1;
      const col = 1;
      
      // Act
      const newBoard = boardManager.toggleCell(board, row, col);
      
      // Assert
      expect(newBoard[row][col]).toBe(true);
      expect(board[row][col]).toBe(false); // Original unchanged (immutability)
    });
  });
});
```

### 2. Component Tests

Component tests verify that the UI renders correctly and responds to interactions:

```typescript
// Example: Testing a React component
describe('BoardCell', () => {
  test('renders with correct className when cell is alive', () => {
    // Arrange
    const handleClick = jest.fn();
    
    // Act
    render(<BoardCell isAlive={true} onClick={handleClick} />);
    
    // Assert
    const cell = screen.getByTestId('board-cell');
    expect(cell).toHaveClass('bg-blue-500');
  });
  
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<BoardCell isAlive={false} onClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('board-cell'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 3. Hook Tests

Hook tests verify that the custom hooks work correctly:

```typescript
// Example: Testing a custom hook
describe('useGameOfLife', () => {
  test('initializes with correct default values', () => {
    // Arrange & Act
    const { result } = renderHook(() => useGameOfLife());
    
    // Assert
    expect(result.current.board).toEqual(/* expected initial board */);
    expect(result.current.generation).toBe(0);
    expect(result.current.isPlaying).toBe(false);
  });
  
  test('handleNext advances the game by one generation', () => {
    const { result } = renderHook(() => useGameOfLife());
    
    act(() => {
      result.current.handleNext();
    });
    
    expect(result.current.generation).toBe(1);
  });
});
```

## Mocking

For testing components in isolation, use Jest's mocking capabilities:

```typescript
// Mocking a service
jest.mock('../../services/GameService', () => ({
  gameService: {
    initializeBoard: jest.fn(),
    toggleCell: jest.fn(),
    calculateNextState: jest.fn()
  }
}));

// Mocking a component
jest.mock('../../components/BoardCell', () => ({
  __esModule: true,
  default: function MockBoardCell(props) {
    return (
      <div 
        data-testid="board-cell" 
        data-alive={props.isAlive ? 'true' : 'false'}
        onClick={props.onClick}
      />
    );
  };
}));

// Mocking a hook
jest.mock('../../hooks/useGameOfLife', () => ({
  useGameOfLife: jest.fn()
}));
```

## Best Practices

1. **Test Isolation**: Each test should be independent and not rely on the state of other tests
2. **Test Coverage**: Aim for high coverage, but focus on critical paths
3. **Test Behavior, Not Implementation**: Test what the code does, not how it does it
4. **Arrange-Act-Assert**: Structure your tests with clear separation of setup, action, and verification
5. **Test Edge Cases**: Include tests for boundary conditions and error cases

## Code Coverage Goals

We aim for the following code coverage metrics:

- Statements: > 80%
- Branches: > 80%
- Functions: > 90%
- Lines: > 80%

To view current coverage, run:

```bash
npm run test:coverage
```

## Troubleshooting

### React Import Issues

If you encounter issues with React imports in tests, ensure:

1. You are using the deconstructed imports where possible:
   ```typescript
   import { memo } from 'react';  // Instead of React.memo
   ```

2. Jest is configured to use the correct environment (jsdom)

### Component Rendering Issues

If components fail to render in tests:

1. Check that all required props are provided
2. Verify that mocks for child components are properly set up
3. Ensure the testing environment is correctly configured for JSX