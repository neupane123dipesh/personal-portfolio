import { useEffect, useRef, useState, useCallback } from "react";
import {
  FiVolume2,
  FiVolumeX,
  FiPause,
  FiPlay,
  FiRotateCw,
  FiArrowLeft,
  FiArrowRight,
  FiArrowDown,
  FiZap,
  FiRefreshCw,
} from "react-icons/fi";
import { sound } from "../../utils/tetrisAudio";

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 22; // Base logical block size
const MILESTONE_SCORES = [500, 1000, 1500];

const PIECES = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.45)",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.45)",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.45)",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.45)",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.45)",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.45)",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.45)",
  },
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

function rotatePiece(piece) {
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
      if (
        newR < 0 ||
        newR >= ROWS ||
        newC < 0 ||
        newC >= COLS ||
        board[newR]?.[newC]
      ) {
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

function getGhostPosition(board, piece, pos) {
  const ghostPos = { ...pos };
  while (!collides(board, piece, { ...ghostPos, r: ghostPos.r + 1 })) {
    ghostPos.r++;
  }
  return ghostPos;
}

export default function TetrisGame() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("tetris_high_score") || "0", 10);
    } catch {
      return 0;
    }
  });
  const [linesClearedTotal, setLinesClearedTotal] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(() => sound.isMuted);
  const [milestone, setMilestone] = useState(null);
  const [nextPieceState, setNextPieceState] = useState(null);
  const [comboText, setComboText] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  // Particles for line clearing visual feedback
  const particlesRef = useRef([]);
  // Flash rows for clearing animation
  const clearingRowsRef = useRef([]);

  const gameStateRef = useRef({
    board: createBoard(),
    piece: getRandomPiece(),
    pos: { r: 0, c: 3 },
    nextPiece: getRandomPiece(),
    score: 0,
    lines: 0,
    level: 1,
    gameRunning: false,
    isPaused: false,
    lastDropTime: 0,
  });

  const isDark = () => {
    return document.documentElement.classList.contains("dark");
  };

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 160);
  }, []);

  const triggerMilestone = useCallback((sc) => {
    sound.playMilestone?.();
    setMilestone(sc);
    setTimeout(() => setMilestone(null), 3500);
  }, []);

  const spawnParticles = (rowIndices) => {
    const isDarkMode = isDark();
    const newParticles = [];
    rowIndices.forEach((rowIdx) => {
      for (let i = 0; i < 28; i++) {
        newParticles.push({
          x: Math.random() * (COLS * BLOCK_SIZE),
          y: rowIdx * BLOCK_SIZE + Math.random() * BLOCK_SIZE,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.7) * 5,
          alpha: 1,
          size: Math.random() * 4 + 2,
          color: isDarkMode
            ? Math.random() > 0.5
              ? "#60a5fa"
              : "#c084fc"
            : "#4f46e5",
        });
      }
    });
    particlesRef.current.push(...newParticles);
  };

  const startGame = useCallback(() => {
    const initialPiece = getRandomPiece();
    const initialNext = getRandomPiece();
    gameStateRef.current = {
      board: createBoard(),
      piece: initialPiece,
      pos: { r: 0, c: 3 },
      nextPiece: initialNext,
      score: 0,
      lines: 0,
      level: 1,
      gameRunning: true,
      isPaused: false,
      lastDropTime: performance.now(),
    };
    clearingRowsRef.current = [];
    particlesRef.current = [];
    setScore(0);
    setLinesClearedTotal(0);
    setLevel(1);
    setGameRunning(true);
    setGameStarted(true);
    setIsPaused(false);
    setMilestone(null);
    setComboText(null);
    setNextPieceState(initialNext);
    sound.playLevelUp();
  }, []);

  const togglePause = useCallback(() => {
    if (!gameStateRef.current.gameRunning) return;
    setIsPaused((prev) => {
      const next = !prev;
      gameStateRef.current.isPaused = next;
      return next;
    });
  }, []);

  const toggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Movement & Logic
  const moveLeft = useCallback(() => {
    const state = gameStateRef.current;
    if (!state.gameRunning || state.isPaused) return;
    const newPos = { ...state.pos, c: state.pos.c - 1 };
    if (!collides(state.board, state.piece, newPos)) {
      state.pos = newPos;
      sound.playMove();
    }
  }, []);

  const moveRight = useCallback(() => {
    const state = gameStateRef.current;
    if (!state.gameRunning || state.isPaused) return;
    const newPos = { ...state.pos, c: state.pos.c + 1 };
    if (!collides(state.board, state.piece, newPos)) {
      state.pos = newPos;
      sound.playMove();
    }
  }, []);

  const rotate = useCallback(() => {
    const state = gameStateRef.current;
    if (!state.gameRunning || state.isPaused) return;
    const rotated = rotatePiece(state.piece);
    // Wall kick attempts: 0, -1, +1, -2, +2
    const kicks = [0, -1, 1, -2, 2];
    for (const kick of kicks) {
      const testPos = { ...state.pos, c: state.pos.c + kick };
      if (!collides(state.board, rotated, testPos)) {
        state.piece = rotated;
        state.pos = testPos;
        sound.playRotate();
        break;
      }
    }
  }, []);

  const lockPiece = useCallback(() => {
    const state = gameStateRef.current;
    state.board = mergePiece(state.board, state.piece, state.pos);

    // Check full rows
    const fullRowIndices = [];
    state.board.forEach((row, idx) => {
      if (row.every((cell) => cell !== 0)) {
        fullRowIndices.push(idx);
      }
    });

    if (fullRowIndices.length > 0) {
      clearingRowsRef.current = fullRowIndices;
      spawnParticles(fullRowIndices);
      sound.playLineClear(fullRowIndices.length);

      const cleared = fullRowIndices.length;
      const pointsTable = [0, 100, 300, 500, 800];
      const earned = (pointsTable[cleared] || 100) * state.level;
      state.score += earned;
      state.lines += cleared;

      setScore(state.score);
      setLinesClearedTotal(state.lines);

      // Check high score
      if (state.score > highScore) {
        setHighScore(state.score);
        try {
          localStorage.setItem("tetris_high_score", String(state.score));
        } catch {}
      }

      // Combo banner
      if (cleared === 4) {
        setComboText("🔥 TETRIS! +800");
        triggerShake();
      } else if (cleared >= 2) {
        setComboText(`✨ +${earned} PTS`);
      }
      setTimeout(() => setComboText(null), 1800);

      // Milestone check
      for (const ms of MILESTONE_SCORES) {
        if (state.score >= ms && state.score - earned < ms) {
          triggerMilestone(ms);
          break;
        }
      }

      // Level check every 5 lines
      const newLevel = Math.floor(state.lines / 5) + 1;
      if (newLevel > state.level) {
        state.level = newLevel;
        setLevel(newLevel);
        sound.playLevelUp();
      }

      // Remove lines
      const remainingRows = state.board.filter(
        (_, idx) => !fullRowIndices.includes(idx),
      );
      const emptyRows = Array(cleared)
        .fill(null)
        .map(() => Array(COLS).fill(0));
      state.board = [...emptyRows, ...remainingRows];
      clearingRowsRef.current = [];
    }

    // Next piece
    state.piece = state.nextPiece;
    state.nextPiece = getRandomPiece();
    state.pos = { r: 0, c: 3 };
    setNextPieceState(state.nextPiece);

    // Game Over check
    if (collides(state.board, state.piece, state.pos)) {
      state.gameRunning = false;
      setGameRunning(false);
      sound.playGameOver();
      triggerShake();
    }
  }, [highScore, triggerMilestone, triggerShake]);

  const moveDown = useCallback(() => {
    const state = gameStateRef.current;
    if (!state.gameRunning || state.isPaused) return;

    const newPos = { ...state.pos, r: state.pos.r + 1 };
    if (!collides(state.board, state.piece, newPos)) {
      state.pos = newPos;
      sound.playDrop();
    } else {
      lockPiece();
    }
  }, [lockPiece]);

  const hardDrop = useCallback(() => {
    const state = gameStateRef.current;
    if (!state.gameRunning || state.isPaused) return;

    const ghostPos = getGhostPosition(state.board, state.piece, state.pos);
    const dropDistance = ghostPos.r - state.pos.r;
    state.pos = ghostPos;
    state.score += dropDistance * 2;
    setScore(state.score);
    sound.playHardDrop();
    triggerShake();
    lockPiece();
  }, [lockPiece, triggerShake]);

  // Handle Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid taking over keys if user is typing in a form input or textarea
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;

      if (!gameStateRef.current.gameRunning) {
        if (e.code === "Space") {
          e.preventDefault();
          startGame();
        }
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        hardDrop();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        moveLeft();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        moveRight();
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        moveDown();
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        rotate();
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        togglePause();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        startGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [startGame, hardDrop, moveLeft, moveRight, moveDown, rotate, togglePause]);

  // Animation Loop & Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId;

    const render = (time) => {
      const state = gameStateRef.current;
      const isDarkMode = isDark();

      // Drop tick timing based on level
      if (state.gameRunning && !state.isPaused) {
        const dropInterval = Math.max(120, 650 - (state.level - 1) * 60);
        if (time - state.lastDropTime > dropInterval) {
          state.lastDropTime = time;
          const newPos = { ...state.pos, r: state.pos.r + 1 };
          if (!collides(state.board, state.piece, newPos)) {
            state.pos = newPos;
          } else {
            lockPiece();
          }
        }
      }

      // Clear & Background
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Grid background fill
      ctx.fillStyle = isDarkMode ? "#0a0d14" : "#f8fafc";
      ctx.fillRect(0, 0, w, h);

      // Cyber grid lines
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = isDarkMode
        ? "rgba(99, 102, 241, 0.08)"
        : "rgba(148, 163, 184, 0.18)";

      for (let c = 0; c <= COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(c * BLOCK_SIZE, 0);
        ctx.lineTo(c * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        ctx.stroke();
      }
      for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * BLOCK_SIZE);
        ctx.lineTo(COLS * BLOCK_SIZE, r * BLOCK_SIZE);
        ctx.stroke();
      }

      // Draw settled board blocks
      const { board } = state;
      for (let r = 0; r < ROWS; r++) {
        const isClearing = clearingRowsRef.current.includes(r);
        for (let c = 0; c < COLS; c++) {
          const color = board[r][c];
          if (color) {
            const x = c * BLOCK_SIZE;
            const y = r * BLOCK_SIZE;
            if (isClearing) {
              ctx.fillStyle = "#ffffff";
              ctx.shadowColor = "#60a5fa";
              ctx.shadowBlur = 14;
            } else {
              ctx.fillStyle = color;
              ctx.shadowColor = color + "66";
              ctx.shadowBlur = 6;
            }
            ctx.beginPath();
            ctx.roundRect(x + 1, y + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2, 4);
            ctx.fill();
            // Subtle top highlight
            ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
            ctx.fillRect(x + 2, y + 2, BLOCK_SIZE - 4, 3);
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw active piece & ghost piece if running
      if (state.gameRunning) {
        const { piece, pos } = state;

        // 1. Ghost Piece
        const ghostPos = getGhostPosition(board, piece, pos);
        ctx.strokeStyle = piece.color;
        ctx.fillStyle = piece.glow || "rgba(99, 102, 241, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);

        for (let r = 0; r < piece.shape.length; r++) {
          for (let c = 0; c < piece.shape[r].length; c++) {
            if (piece.shape[r][c]) {
              const gx = (ghostPos.c + c) * BLOCK_SIZE;
              const gy = (ghostPos.r + r) * BLOCK_SIZE;
              ctx.beginPath();
              ctx.roundRect(gx + 1, gy + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2, 4);
              ctx.fill();
              ctx.stroke();
            }
          }
        }
        ctx.setLineDash([]); // reset dash

        // 2. Current Piece
        ctx.fillStyle = piece.color;
        ctx.shadowColor = piece.glow || piece.color;
        ctx.shadowBlur = 10;
        for (let r = 0; r < piece.shape.length; r++) {
          for (let c = 0; c < piece.shape[r].length; c++) {
            if (piece.shape[r][c]) {
              const px = (pos.c + c) * BLOCK_SIZE;
              const py = (pos.r + r) * BLOCK_SIZE;
              ctx.beginPath();
              ctx.roundRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2, 4);
              ctx.fill();
              ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
              ctx.fillRect(px + 2, py + 2, BLOCK_SIZE - 4, 3);
              ctx.fillStyle = piece.color;
            }
          }
        }
        ctx.shadowBlur = 0;
      }

      // Draw explosion particles
      const activeParticles = [];
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.alpha -= 0.02;
        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          activeParticles.push(p);
        }
      });
      particlesRef.current = activeParticles;

      // Overlay if Paused or Game Over
      if (!state.gameRunning || state.isPaused) {
        ctx.fillStyle = isDarkMode
          ? "rgba(10, 13, 20, 0.78)"
          : "rgba(248, 250, 252, 0.82)";
        ctx.fillRect(0, 0, w, h);

        ctx.textAlign = "center";
        if (state.isPaused) {
          ctx.fillStyle = isDarkMode ? "#f8fafc" : "#0f172a";
          ctx.font = "bold 22px system-ui";
          ctx.fillText("PAUSED", w / 2, h / 2 - 10);
          ctx.fillStyle = isDarkMode ? "#94a3b8" : "#64748b";
          ctx.font = "12px system-ui";
          ctx.fillText("Press P to Resume", w / 2, h / 2 + 18);
        } else if (!gameStarted) {
          // Ready state
          ctx.fillStyle = isDarkMode ? "#e0e7ff" : "#312e81";
          ctx.font = "bold 24px system-ui";
          ctx.fillText("⚡ TETRIS", w / 2, h / 2 - 35);
          ctx.fillStyle = "#6366f1";
          ctx.font = "12px system-ui";
          ctx.fillText("READY TO PLAY", w / 2, h / 2 - 12);
          ctx.fillStyle = isDarkMode ? "#cbd5e1" : "#475569";
          ctx.font = "12px system-ui";
          ctx.fillText("Press SPACE or Start", w / 2, h / 2 + 25);
        } else {
          // Game Over
          ctx.fillStyle = "#ef4444";
          ctx.font = "bold 24px system-ui";
          ctx.fillText("GAME OVER", w / 2, h / 2 - 35);
          ctx.fillStyle = isDarkMode ? "#e2e8f0" : "#1e293b";
          ctx.font = "16px system-ui";
          ctx.fillText(`Score: ${state.score}`, w / 2, h / 2 - 5);
          ctx.fillStyle = isDarkMode ? "#94a3b8" : "#64748b";
          ctx.font = "12px system-ui";
          ctx.fillText("Press SPACE to Restart", w / 2, h / 2 + 25);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [gameStarted, lockPiece]);

  return (
    <div
      ref={containerRef}
      className={`relative flex w-full max-w-lg flex-col rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-5 ${
        isShaking ? "translate-x-1 rotate-0.5" : ""
      }`}
    >
      {/* Top Console Bar */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${gameRunning && !isPaused ? "bg-emerald-400" : "bg-indigo-400"}`}
            />
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${gameRunning && !isPaused ? "bg-emerald-500" : "bg-indigo-500"}`}
            />
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Arcade Matrix
          </span>
          <span className="hidden rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 sm:inline-block">
            LVL {level}
          </span>
        </div>

        {/* Quick action controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-400"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <FiVolumeX className="size-4" />
            ) : (
              <FiVolume2 className="size-4" />
            )}
          </button>

          {gameRunning && (
            <button
              type="button"
              onClick={togglePause}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-400"
              title={isPaused ? "Resume" : "Pause"}
              aria-label="Toggle Pause"
            >
              {isPaused ? (
                <FiPlay className="size-4" />
              ) : (
                <FiPause className="size-4" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={startGame}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-95"
            title="Restart Game"
            aria-label="Restart Game"
          >
            <FiRefreshCw className="size-3.5" />
            <span className="hidden sm:inline">
              {gameStarted ? "Restart" : "Play"}
            </span>
          </button>
        </div>
      </div>

      {/* Main Playing Area + Side HUD */}
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start sm:gap-6">
        {/* Game Canvas Container */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-slate-950/5 shadow-inner dark:border-slate-700/80 dark:bg-black/40">
          <canvas
            ref={canvasRef}
            width={COLS * BLOCK_SIZE}
            height={ROWS * BLOCK_SIZE}
            onClick={() => {
              if (!gameRunning) startGame();
            }}
            className="block cursor-pointer select-none"
            style={{
              width: `${COLS * BLOCK_SIZE}px`,
              height: `${ROWS * BLOCK_SIZE}px`,
              imageRendering: "pixelated",
            }}
            aria-label="Interactive Tetris Game"
          />

          {/* Floating combo / milestone badge */}
          {comboText && (
            <div className="pointer-events-none absolute inset-x-0 top-12 flex justify-center animate-bounce">
              <span className="rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                {comboText}
              </span>
            </div>
          )}

          {milestone && (
            <div className="pointer-events-none absolute inset-x-2 bottom-3 flex flex-col items-center rounded-xl bg-indigo-950/90 p-2.5 text-center text-xs text-white backdrop-blur-md border border-indigo-400/30 shadow-xl">
              <span className="font-bold text-amber-300">
                🎯 SCORE MILESTONE: {milestone}!
              </span>
              <span className="mt-0.5 text-[11px] text-indigo-200">
                {milestone >= 1500
                  ? "⭐ Master builder unlocked — hire me!"
                  : "🚀 Great game! Reach out below."}
              </span>
            </div>
          )}
        </div>

        {/* Side HUD Panel */}
        <div className="flex w-full flex-row justify-between gap-3 sm:w-36 sm:flex-col sm:justify-start sm:gap-3.5">
          {/* Next Piece Card */}
          <div className="flex-1 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Next
            </span>
            <div className="mt-2 flex h-14 items-center justify-center">
              {nextPieceState ? (
                <div
                  className="grid gap-0.5"
                  style={{
                    gridTemplateColumns: `repeat(${nextPieceState.shape[0].length}, minmax(0, 1fr))`,
                  }}
                >
                  {nextPieceState.shape.map((row, rIdx) =>
                    row.map((cell, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className="h-3.5 w-3.5 rounded-sm"
                        style={{
                          backgroundColor: cell
                            ? nextPieceState.color
                            : "transparent",
                          boxShadow: cell
                            ? `0 0 6px ${nextPieceState.color}`
                            : "none",
                        }}
                      />
                    )),
                  )}
                </div>
              ) : (
                <span className="text-xs text-slate-400">--</span>
              )}
            </div>
          </div>

          {/* Score Card */}
          <div className="flex-1 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Score
            </span>
            <p className="mt-1 font-mono text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
              {score}
            </p>
          </div>

          {/* High Score / Best */}
          <div className="hidden rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60 sm:block">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Best
            </span>
            <p className="mt-1 font-mono text-base font-semibold text-slate-700 dark:text-slate-300">
              {highScore}
            </p>
          </div>

          {/* Lines Cleared */}
          <div className="flex-1 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Lines
            </span>
            <p className="mt-1 font-mono text-base font-semibold text-slate-700 dark:text-slate-300">
              {linesClearedTotal}
            </p>
          </div>
        </div>
      </div>

      {/* On-screen Controls (Keyboard / Mobile touch friendly) */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800/80 sm:flex-row">
        {/* Helper chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-800">
            Space
          </span>
          <span>Drop</span>
          <span>•</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-800">
            ↑
          </span>
          <span>Rotate</span>
          <span>•</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-800">
            P
          </span>
          <span>Pause</span>
        </div>

        {/* Mobile / mouse buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={moveLeft}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 active:scale-90 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Move Left"
          >
            <FiArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={rotate}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50/80 text-indigo-600 transition hover:bg-indigo-100 active:scale-90 dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300"
            aria-label="Rotate"
          >
            <FiRotateCw className="size-4" />
          </button>
          <button
            type="button"
            onClick={moveDown}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 active:scale-90 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Soft Drop"
          >
            <FiArrowDown className="size-4" />
          </button>
          <button
            type="button"
            onClick={moveRight}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 active:scale-90 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Move Right"
          >
            <FiArrowRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={hardDrop}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-500 active:scale-90"
            title="Hard Drop"
            aria-label="Hard Drop"
          >
            <FiZap className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
