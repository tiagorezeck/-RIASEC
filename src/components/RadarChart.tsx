import React, { useEffect, useRef } from 'react';
import { RiasecType } from '../types/riasec';
import { RIASEC_TYPE_LABELS } from '../data/riasecData';

interface RadarChartProps {
  userScores: Record<RiasecType, number>; // Percentage (0 - 100)
  benchmarkScores?: Record<RiasecType, number>; // Optional comparison
  userLabel?: string;
  benchmarkLabel?: string;
  size?: number;
}

const AXIS_KEYS: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

export const RadarChart: React.FC<RadarChartProps> = ({
  userScores,
  benchmarkScores,
  userLabel = 'Seu Perfil',
  benchmarkLabel = 'Média Geral',
  size = 440,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina display support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;
    const angleStep = (Math.PI * 2) / AXIS_KEYS.length;
    const startAngle = -Math.PI / 2;

    // 1. Concentric polygons
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    levels.forEach((level, lvlIdx) => {
      ctx.beginPath();
      for (let i = 0; i < AXIS_KEYS.length; i++) {
        const angle = startAngle + i * angleStep;
        const r = radius * level;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = lvlIdx === levels.length - 1 ? '#CBD5E1' : '#E2E8F0';
      ctx.lineWidth = lvlIdx === levels.length - 1 ? 1.5 : 1;
      ctx.stroke();

      if (lvlIdx % 2 === 1) {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.5)';
        ctx.fill();
      }
    });

    // 2. Axis spokes
    for (let i = 0; i < AXIS_KEYS.length; i++) {
      const angle = startAngle + i * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 3. Benchmark Series (if available)
    if (benchmarkScores) {
      ctx.beginPath();
      for (let i = 0; i < AXIS_KEYS.length; i++) {
        const key = AXIS_KEYS[i];
        const val = benchmarkScores[key] ?? 0;
        const normalized = Math.min(Math.max(val / 100, 0), 1);
        const r = radius * normalized;
        const angle = startAngle + i * angleStep;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
      ctx.fill();
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Dots
      for (let i = 0; i < AXIS_KEYS.length; i++) {
        const key = AXIS_KEYS[i];
        const val = benchmarkScores[key] ?? 0;
        const normalized = Math.min(Math.max(val / 100, 0), 1);
        const r = radius * normalized;
        const angle = startAngle + i * angleStep;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#64748B';
        ctx.fill();
      }
    }

    // 4. User Series
    ctx.beginPath();
    const userPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < AXIS_KEYS.length; i++) {
      const key = AXIS_KEYS[i];
      const val = userScores[key] ?? 0;
      const normalized = Math.min(Math.max(val / 100, 0), 1);
      const r = radius * normalized;
      const angle = startAngle + i * angleStep;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      userPoints.push({ x, y });

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.45)');
    gradient.addColorStop(1, 'rgba(239, 68, 68, 0.25)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Point anchors
    userPoints.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#2563EB';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // 5. Labels and Values
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < AXIS_KEYS.length; i++) {
      const key = AXIS_KEYS[i];
      const angle = startAngle + i * angleStep;
      const labelDistance = radius + 32;
      const lx = centerX + labelDistance * Math.cos(angle);
      const ly = centerY + labelDistance * Math.sin(angle);

      const userVal = userScores[key] ?? 0;
      const labelText = `${key} - ${RIASEC_TYPE_LABELS[key]}`;
      const scoreText = `${userVal}%`;

      const metrics = ctx.measureText(labelText);
      const pillWidth = Math.max(metrics.width + 16, 76);
      const pillHeight = 34;
      const pillX = lx - pillWidth / 2;
      const pillY = ly - pillHeight / 2;

      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 6);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 6);
      ctx.stroke();

      ctx.fillStyle = '#1E293B';
      ctx.font = '600 10.5px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(labelText, lx, ly - 6);

      ctx.fillStyle = '#2563EB';
      ctx.font = '700 11.5px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(scoreText, lx, ly + 8);
    }
  }, [userScores, benchmarkScores, size]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, maxWidth: '100%' }}>
        <canvas
          ref={canvasRef}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="mx-auto block max-w-full drop-shadow-xs"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-5 rounded-xs bg-blue-600 shadow-xs" />
          <span className="text-slate-800 font-semibold">{userLabel}</span>
        </div>
        {benchmarkScores && (
          <div className="flex items-center gap-2">
            <span className="inline-block h-1 w-5 border-b-2 border-dashed border-slate-500" />
            <span className="text-slate-600">{benchmarkLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};
