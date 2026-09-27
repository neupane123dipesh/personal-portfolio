import { useEffect, useRef, useState } from 'react';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 18;
const MILESTONE_SCORES = [500, 1000, 1500];

const PIECES = {
  I: { shape: [[1, 1, 1, 1]], color: '#0ea5e9' },
  O: { shape: [[1, 1], [1, 1]], color: '#fbbf24' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a78bfa' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#10b981' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#f87171' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#3b82f6' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f97316' },
};

const PIECE_KEYS = Object.keys(PIECES);

function createBoard() {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(0));
}

function getRandomPiece() {
  const key = PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)];
  return { ...PIECES[key], type: key };
}

function rotate(piece) {
  const { shape } = piece;
  const rotated = shape[0].map((_, i) => shape.map((row) => row[i])).reverse();
  return { ...piece, shape: rotated };
}

function collides(board, piece, pos) {
  const { shape } = piece;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const newR = pos.r + r;
      const newC = pos.c + c;
      if (newR < 0 || newR >= ROWS || newC < 0 || newC >= COLS || board[newR]?.[newC]) {
        return true;
      }
    }
  }
  return false;
}

function mergePiece(board, piece, pos) {
  const newBoard = board.map((row) => [...row]);
  const { shape, color } = piece;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const newR = pos.r + r;
        const newC = pos.c + c;
        if (newR >= 0 && newR < ROWS && newC >= 0 && newC < COLS) {
          newBoard[newR][newC] = color;
        }
      }
    }
  }
  return newBoard;
}

function clearLines(board) {
  const newBoard = board.filter((row) => row.some((cell) => !cell));
  const cleared = ROWS - newBoard.length;
  const emptyRows = Array(cleared)
    .fill(null)
    .map(() => Array(COLS).fill(0));
  return { board: [...emptyRows, ...newBoard], cleared };
}

export default function TetrisGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [milestone, setMilestone] = useState(null);
  const gameStateRef = useRef({
    board: createBoard(),
    piece: getRandomPiece(),
    pos: { r: 0, c: COLS / 2 - 1 },
    nextPiece: getRandomPiece(),
    score: 0,
    gameRunning: false,
    interval: null,
  });

  const isDark = () => {
    return document.documentElement.classList.contains('dark');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleKeyDown = (e) => {
      if (!gameStateRef.current.gameRunning) {
        if (e.code === 'Space' && !gameStarted) {
          startGame();
        } else if (e.code === 'Space' && !gameRunning) {
          startGame();
        }
        return;
      }

      const state = gameStateRef.current;
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        const newPos = { ...state.pos, c: state.pos.c - 1 };
        if (!collides(state.board, state.piece, newPos)) {
          state.pos = newPos;
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        const newPos = { ...state.pos, c: state.pos.c + 1 };
        if (!collides(state.board, state.piece, newPos)) {
          state.pos = newPos;
        }
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        moveDown();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        let rotated = rotate(state.piece);
        if (!collides(state.board, rotated, state.pos)) {
          state.piece = rotated;
        }
      }
    };

    const startGame = () => {
      gameStateRef.current = {
        board: createBoard(),
        piece: getRandomPiece(),
        pos: { r: 0, c: COLS / 2 - 1 },
        nextPiece: getRandomPiece(),
        score: 0,
        gameRunning: true,
        interval: null,
      };
      setScore(0);
      setGameRunning(true);
      setGameStarted(true);
      setMilestone(null);
    };

    const moveDown = () => {
      const state = gameStateRef.current;
      if (!state.gameRunning) return;

      const newPos = { ...state.pos, r: state.pos.r + 1 };
      if (!collides(state.board, state.piece, newPos)) {
        state.pos = newPos;
      } else {
        state.board = mergePiece(state.board, state.piece, state.pos);
        const { board, cleared } = clearLines(state.board);
        state.board = board;

        if (cleared > 0) {
          const points = [0, 100, 300, 500, 800][cleared] || 0;
          state.score += points;
          setScore(state.score);

          if (MILESTONE_SCORES.includes(state.score)) {
            setMilestone(state.score);
            setTimeout(() => setMilestone(null), 2500);
          }
        }

        state.piece = state.nextPiece;
        state.nextPiece = getRandomPiece();
        state.pos = { r: 0, c: COLS / 2 - 1 };

        if (collides(state.board, state.piece, state.pos)) {
          state.gameRunning = false;
          setGameRunning(false);
        }
      }
    };

    const draw = () => {
      const isDarkMode = isDark();
      const bgColor = isDarkMode ? '#09090b' : '#f7f3ee';
      const gridColor = isDarkMode ? 'rgba(71, 85, 105, 0.2)' : 'rgba(148, 163, 184, 0.15)';
      const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, isDarkMode ? 'rgba(67, 56, 202, 0.08)' : 'rgba(99, 102, 241, 0.06)');
      gradient.addColorStop(1, isDarkMode ? 'rgba(15, 23, 42, 0)' : 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!gameStateRef.current.gameRunning) {
        ctx.fillStyle = textColor;
        ctx.font = 'bold 32px system-ui';
        ctx.textAlign = 'center';
        if (!gameStarted) {
          ctx.fillText('🎮 TETRIS', canvas.width / 2, canvas.height / 2 - 40);
          ctx.font = '14px system-ui';
          ctx.fillStyle = isDarkMode ? '#94a3b8' : '#64748b';
          ctx.fillText('Press SPACE to start', canvas.width / 2, canvas.height / 2 + 30);
        } else {
          ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 40);
          ctx.font = '18px system-ui';
          ctx.fillStyle = textColor;
          ctx.fillText(`Score: ${gameStateRef.current.score}`, canvas.width / 2, canvas.height / 2 + 20);
          ctx.font = '12px system-ui';
          ctx.fillStyle = isDarkMode ? '#94a3b8' : '#64748b';
          ctx.fillText('Press SPACE to retry', canvas.width / 2, canvas.height / 2 + 60);
        }
        ctx.textAlign = 'left';
      } else {
        // Draw grid
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        for (let i = 0; i <= COLS; i++) {
          ctx.beginPath();
          ctx.moveTo(i * BLOCK_SIZE, 0);
          ctx.lineTo(i * BLOCK_SIZE, ROWS * BLOCK_SIZE);
          ctx.stroke();
        }
        for (let i = 0; i <= ROWS; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * BLOCK_SIZE);
          ctx.lineTo(COLS * BLOCK_SIZE, i * BLOCK_SIZE);
          ctx.stroke();
        }

        // Draw board
        const { board } = gameStateRef.current;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (board[r][c]) {
              ctx.fillStyle = board[r][c];
              ctx.fillRect(c * BLOCK_SIZE + 1, r * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
              ctx.shadowBlur = 8;
              ctx.shadowColor = board[r][c] + '60';
              ctx.fillRect(c * BLOCK_SIZE + 1, r * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
              ctx.shadowBlur = 0;
            }
          }
        }

        // Draw current piece
        const { piece, pos } = gameStateRef.current;
        ctx.fillStyle = piece.color;
        ctx.shadowColor = piece.color + '80';
        ctx.shadowBlur = 12;
        for (let r = 0; r < piece.shape.length; r++) {
          for (let c = 0; c < piece.shape[r].length; c++) {
            if (piece.shape[r][c]) {
              const x = (pos.c + c) * BLOCK_SIZE + 1;
              const y = (pos.r + r) * BLOCK_SIZE + 1;
              ctx.fillRect(x, y, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
            }
          }
        }
        ctx.shadowBlur = 0;
      }

      // Draw score and milestone
      ctx.fillStyle = textColor;
      ctx.font = 'bold 20px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Score: ${gameStateRef.current.score}`, canvas.width / 2, 24);

      if (milestone) {
        ctx.font = 'bold 16px system-ui';
        ctx.fillStyle = '#818ef5';
        const messages = {
          500: '🎯 Great! Hire me for premium work →',
          1000: '🚀 Amazing! Let\'s build together →',
          1500: '⭐ Contact me for collaboration →',
        };
        ctx.fillText(messages[milestone], canvas.width / 2, canvas.height - 12);
      }
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', resizeCanvas);
      if (gameStateRef.current.interval) {
        clearInterval(gameStateRef.current.interval);
      }
    };
  }, [gameStarted, gameRunning]);

  // Game loop
  useEffect(() => {
    if (!gameRunning) return;

    const interval = setInterval(() => {
      if (gameStateRef.current.gameRunning) {
        const newPos = { ...gameStateRef.current.pos, r: gameStateRef.current.pos.r + 1 };
        if (!collides(gameStateRef.current.board, gameStateRef.current.piece, newPos)) {
          gameStateRef.current.pos = newPos;
        } else {
          gameStateRef.current.board = mergePiece(
            gameStateRef.current.board,
            gameStateRef.current.piece,
            gameStateRef.current.pos
          );
          const { board, cleared } = clearLines(gameStateRef.current.board);
          gameStateRef.current.board = board;

          if (cleared > 0) {
            const points = [0, 100, 300, 500, 800][cleared] || 0;
            gameStateRef.current.score += points;
            setScore(gameStateRef.current.score);

            if (MILESTONE_SCORES.includes(gameStateRef.current.score)) {
              setMilestone(gameStateRef.current.score);
              setTimeout(() => setMilestone(null), 2500);
            }
          }

          gameStateRef.current.piece = gameStateRef.current.nextPiece;
          gameStateRef.current.nextPiece = getRandomPiece();
          gameStateRef.current.pos = { r: 0, c: COLS / 2 - 1 };

          if (collides(gameStateRef.current.board, gameStateRef.current.piece, gameStateRef.current.pos)) {
            gameStateRef.current.gameRunning = false;
            setGameRunning(false);
          }
        }
      }
    }, 600);

    return () => clearInterval(interval);
  }, [gameRunning]);

  return (
    <canvas
      ref={canvasRef}
      width={COLS * BLOCK_SIZE}
      height={ROWS * BLOCK_SIZE}
      className="block h-full w-full max-w-full cursor-pointer"
      style={{ imageRendering: 'pixelated', aspectRatio: `${COLS * BLOCK_SIZE} / ${ROWS * BLOCK_SIZE}` }}
      aria-label="Tetris Game - Use Arrow Keys to play, Space to start"
    />
  );
}
