import { useEffect, useRef, useState } from 'react';

const GRAVITY = 0.5;
const JUMP_STRENGTH = -12;
const PIPE_SPEED = 5;
const PIPE_GAP = 140;
const PIPE_WIDTH = 60;
const BIRD_SIZE = 24;
const MILESTONE_SCORES = [5, 10, 15];

export default function FlappyGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [milestone, setMilestone] = useState(null);
  const gameStateRef = useRef({
    birdY: 150,
    birdVelocity: 0,
    pipes: [],
    score: 0,
    gameRunning: false,
    lastPipeX: 0,
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

    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!gameStateRef.current.gameRunning && gameStarted) {
          resetGame();
        } else if (gameStateRef.current.gameRunning) {
          gameStateRef.current.birdVelocity = JUMP_STRENGTH;
        } else {
          startGame();
        }
      }
    };

    const handleClick = () => {
      if (!gameStateRef.current.gameRunning && gameStarted) {
        resetGame();
      } else if (gameStateRef.current.gameRunning) {
        gameStateRef.current.birdVelocity = JUMP_STRENGTH;
      } else {
        startGame();
      }
    };

    canvas.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyPress);

    const startGame = () => {
      gameStateRef.current = {
        birdY: canvas.height / 2,
        birdVelocity: 0,
        pipes: [],
        score: 0,
        gameRunning: true,
        lastPipeX: 0,
      };
      setScore(0);
      setGameOver(false);
      setGameStarted(true);
      setMilestone(null);
    };

    const resetGame = () => {
      setGameOver(false);
      setMilestone(null);
      startGame();
    };

    const animate = () => {
      if (!canvasRef.current) return;

      const isDarkMode = isDark();
      const bgColor = isDarkMode ? '#09090b' : '#f7f3ee';
      const birdColor = isDarkMode ? '#818ef5' : '#5f5cf1';
      const pipeColor = isDarkMode ? '#334155' : '#e2e8f0';
      const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw radial gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, isDarkMode ? 'rgba(67, 56, 202, 0.12)' : 'rgba(99, 102, 241, 0.08)');
      gradient.addColorStop(1, isDarkMode ? 'rgba(15, 23, 42, 0)' : 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!gameStateRef.current.gameRunning) {
        // Draw start screen
        ctx.fillStyle = textColor;
        ctx.font = 'bold 36px system-ui';
        ctx.textAlign = 'center';
        if (!gameStarted) {
          ctx.fillText('🎮 PLAY GAME', canvas.width / 2, canvas.height / 2 - 40);
          ctx.font = '16px system-ui';
          ctx.fillStyle = isDarkMode ? '#94a3b8' : '#64748b';
          ctx.fillText('Click or press SPACE', canvas.width / 2, canvas.height / 2 + 20);
        } else {
          ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 40);
          ctx.font = '20px system-ui';
          ctx.fillStyle = isDarkMode ? '#e2e8f0' : '#1e293b';
          ctx.fillText(`Score: ${gameStateRef.current.score}`, canvas.width / 2, canvas.height / 2 + 20);
          ctx.font = '14px system-ui';
          ctx.fillStyle = isDarkMode ? '#94a3b8' : '#64748b';
          ctx.fillText('Click or press SPACE to retry', canvas.width / 2, canvas.height / 2 + 60);
        }
        ctx.textAlign = 'left';
      } else {
        // Update bird
        gameStateRef.current.birdVelocity += GRAVITY;
        gameStateRef.current.birdY += gameStateRef.current.birdVelocity;

        // Check collision with top/bottom
        if (
          gameStateRef.current.birdY - BIRD_SIZE / 2 < 0 ||
          gameStateRef.current.birdY + BIRD_SIZE / 2 > canvas.height
        ) {
          gameStateRef.current.gameRunning = false;
          setGameOver(true);
          setGameStarted(true);
        }

        // Generate pipes
        if (gameStateRef.current.lastPipeX === 0) {
          gameStateRef.current.lastPipeX = canvas.width + 100;
        }

        if (gameStateRef.current.lastPipeX < canvas.width - 150) {
          const gapY = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
          gameStateRef.current.pipes.push({
            x: canvas.width,
            topGapY: gapY,
            scored: false,
          });
          gameStateRef.current.lastPipeX = canvas.width + 150;
        }

        // Update and draw pipes
        ctx.fillStyle = pipeColor;
        for (let i = gameStateRef.current.pipes.length - 1; i >= 0; i--) {
          const pipe = gameStateRef.current.pipes[i];
          pipe.x -= PIPE_SPEED;

          // Draw pipe
          ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topGapY);
          ctx.fillRect(pipe.x, pipe.topGapY + PIPE_GAP, PIPE_WIDTH, canvas.height);

          // Check if bird passed pipe
          if (!pipe.scored && pipe.x + PIPE_WIDTH < gameStateRef.current.birdY) {
            pipe.scored = true;
            gameStateRef.current.score += 1;
            setScore(gameStateRef.current.score);

            // Check milestones
            if (MILESTONE_SCORES.includes(gameStateRef.current.score)) {
              setMilestone(gameStateRef.current.score);
              setTimeout(() => setMilestone(null), 2000);
            }
          }

          // Check collision
          if (
            pipe.x < gameStateRef.current.birdY + BIRD_SIZE / 2 &&
            pipe.x + PIPE_WIDTH > gameStateRef.current.birdY - BIRD_SIZE / 2
          ) {
            if (
              gameStateRef.current.birdY - BIRD_SIZE / 2 < pipe.topGapY ||
              gameStateRef.current.birdY + BIRD_SIZE / 2 > pipe.topGapY + PIPE_GAP
            ) {
              gameStateRef.current.gameRunning = false;
              setGameOver(true);
              setGameStarted(true);
            }
          }

          if (pipe.x + PIPE_WIDTH < 0) {
            gameStateRef.current.pipes.splice(i, 1);
          }
        }

        // Draw bird
        ctx.fillStyle = birdColor;
        ctx.beginPath();
        ctx.arc(gameStateRef.current.birdY, 80, BIRD_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 12;
        ctx.shadowColor = birdColor + '80';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw score
      ctx.fillStyle = textColor;
      ctx.font = 'bold 32px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(Math.max(score, gameStateRef.current.score), canvas.width / 2, 60);

      // Draw milestone message
      if (milestone) {
        ctx.font = 'bold 24px system-ui';
        ctx.fillStyle = isDarkMode ? '#818ef5' : '#5f5cf1';
        ctx.textAlign = 'center';
        const messages = {
          5: '🎯 Nice! Hire me for more fun →',
          10: '🚀 Getting better! Let\'s collaborate →',
          15: '⭐ Contact me for epic projects →',
        };
        ctx.fillText(messages[milestone], canvas.width / 2, canvas.height / 2);
      }

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameStarted, score]);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full cursor-pointer bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950"
      aria-label="Flappy Bird Game - Click or press Space to play"
    />
  );
}
