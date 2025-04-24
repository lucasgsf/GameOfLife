import { Board } from '@/types/board';

export class BoardFactory {
  static createEmpty(size: number): Board {
    return Array(size).fill(null).map(() => Array(size).fill(false));
  }

  static createPattern(pattern: 'blinker' | 'block' | 'glider'): Board {
    const patterns = {
      blinker: [
        [false, true, false],
        [false, true, false],
        [false, true, false],
      ],
      block: [
        [true, true, false],
        [true, true, false],
        [false, false, false]
      ],
      glider: [
        [false, true, false],
        [false, false, true],
        [true, true, true]
      ]
    };
    return patterns[pattern];
  }
}