import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoardControls from '.';

describe('BoardControls', () => {
  const defaultProps = {
    onNext: jest.fn(),
    onAdvance: jest.fn(),
    onPlayForever: jest.fn(),
    onStopPlayingForever: jest.fn(),
    onReset: jest.fn(),
    isPlayingForever: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all controls when not playing', () => {
    render(<BoardControls {...defaultProps} />);
    
    expect(screen.getByText('Next State')).toBeInTheDocument();
    expect(screen.getByText(/Advance \d+ states/)).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    
    expect(screen.queryByText('Pause')).not.toBeInTheDocument();
  });

  test('renders pause button instead of play when isPlayingForever is true', () => {
    render(<BoardControls {...defaultProps} isPlayingForever={true} />);
    
    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.queryByText('Play')).not.toBeInTheDocument();
  });

  test('calls onNext when Next State button is clicked', () => {
    render(<BoardControls {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Next State'));
    
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  test('calls onPlayForever when Play button is clicked', () => {
    render(<BoardControls {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Play'));
    
    expect(defaultProps.onPlayForever).toHaveBeenCalledTimes(1);
  });

  test('calls onStopPlayingForever when Pause button is clicked', () => {
    render(<BoardControls {...defaultProps} isPlayingForever={true} />);
    
    fireEvent.click(screen.getByText('Pause'));
    
    expect(defaultProps.onStopPlayingForever).toHaveBeenCalledTimes(1);
  });

  test('calls onReset when Reset button is clicked', () => {
    render(<BoardControls {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Reset'));
    
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1);
  });

  test('calls onAdvance with correct number of steps when Advance button is clicked', () => {
    render(<BoardControls {...defaultProps} />);
    
    const input = screen.getByRole('spinbutton');
    
    fireEvent.change(input, { target: { value: '5' } });
    
    fireEvent.click(screen.getByText(/Advance 5 states/));
    
    expect(defaultProps.onAdvance).toHaveBeenCalledWith(5);
  });
});