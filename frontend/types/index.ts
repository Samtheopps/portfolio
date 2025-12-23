/**
 * Types TypeScript partagés
 */

export type AnimationType = 'rotate' | 'rotate3d' | 'hover';

export type Offset = { x?: number | string; y?: number | string };

export interface PrismaticBurstProps {
  intensity?: number;
  speed?: number;
  animationType?: AnimationType;
  colors?: string[];
  distort?: number;
  paused?: boolean;
  offset?: Offset;
  hoverDampness?: number;
  rayCount?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'] | 'none';
}

