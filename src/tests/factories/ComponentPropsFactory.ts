import { BoardFactory } from './BoardFactory';

export class ComponentPropsFactory {
  static createBoardControlsProps() {
    return {
      onNext: jest.fn(),
      onAdvance: jest.fn(),
      onPlayForever: jest.fn(),
      onStopPlayingForever: jest.fn(),
      onReset: jest.fn(),
      isPlayingForever: false,
      generation: 0
    };
  }

  static createBoardProps(size: number = 3) {
    return {
      board: BoardFactory.createEmpty(size),
      onCellClick: jest.fn()
    };
  }
}