import React, { useEffect, useRef } from 'react';
import { RiasecType } from '../types/riasec';
import { RIASEC_COLORS, RIASEC_TYPE_LABELS } from '../data/riasecData';

interface PieChartProps {
  scores: Record<RiasecType, { points: number; percentage: number }>;
  size?: number;
  centerText?: string;
}

const ORDER: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

export const PieChart: React.FC<PieChartProps> = ({ scores, size = 320, centerText = 'RIASEC' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = size * 0.44;
    const innerRadius = size * 0.26; // Donut style

    // Calculate total points
    const totalPoints = ORDER.reduce((sum, key) => sum + (scores[key]?.points || 0), 0) || 1;

    let currentAngle = -Math.PI / 2;

    ORDER.forEach((key) => {
      const pts = scores[key]?.points || 0;
      const sliceAngle = (pts / totalPoints) * Math.PI * 2;
      if (sliceAngle <= 0) return;

      const nextAngle = currentAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, currentAngle, nextAngle);
      ctx.arc(centerX, centerY, innerRadius, nextAngle, currentAngle, true);
      ctx.closePath();

      ctx.fillStyle = RIASEC_COLORS[key].primary;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      currentAngle = nextAngle;
    });

    // Center circle cutout background
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius - 2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Center text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1E293B';
    ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(centerText, centerX, centerY - 8);

    ctx.fillStyle = '#64748B';
    ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Distribuição', centerX, centerY + 12);
  }, [scores, size, centerText]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, maxWidth: '100%' }}>
        <canvas
          ref={canvasRef}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="mx-auto block max-w-full drop-shadow-sm"
        />
      </div>

      {/* Grid Legend */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full max-w-md">
        {ORDER.map((key) => {
          const item = scores[key];
          const pct = item?.percentage ?? 0;
          const pts = item?.points ?? 0;
          return (
            <div
              key={key}
              className="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50/70 text-xs"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: RIASEC_COLORS[key].primary }}
                />
                <span className="font-semibold text-slate-700 truncate">
                  {key} - {RIASEC_TYPE_LABELS[key]}
                </span>
              </div>
              <span className="font-bold text-slate-900 ml-1.5 whitespace-nowrap">
                {pct}% <span className="text-slate-400 font-normal">({pts}p)</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
