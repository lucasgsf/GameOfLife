export class HookMockFactory {
  static createGameOfLifeHookMock() {
    return {
      board: [[false, false], [false, false]],
      generation: 5,
      isPlayingForever: false,
      handleCellClick: jest.fn(),
      handleNext: jest.fn(),
      handleAdvance: jest.fn(),
      handlePlayForever: jest.fn(),
      handleStopPlayingForever: jest.fn(),
      handleReset: jest.fn()
    };
  }
}