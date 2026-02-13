export type GridState = number[][];

export interface SystemStats {
    clicks: number;
    ripples: number;
    surges: number;
}

export interface LogicRule {
    id: string;
    name: string;
    description: string;
    trigger: string;
    constraint: string;
    color: string;
    glow: string;
}

export interface GridEvent {
    id: string;
    timestamp: string;
    message: string;
    type: 'trigger' | 'ripple' | 'surge' | 'lock' | 'reboot' | 'info';
}
