import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ShieldAlert, Zap, Waves } from 'lucide-react';
import { cn } from '../utils';

interface GridBoxProps {
    value: number;
    isUpdating: boolean;
    onClick: () => void;
}

const GridBox: React.FC<GridBoxProps> = ({ value, isUpdating, onClick }) => {
    const isLocked = value >= 15;
    const isEven = value % 2 === 0;

    return (
        <motion.div
            layout
            initial={false}
            animate={{
                scale: isUpdating ? 1.05 : 1,
                rotateX: isUpdating ? 15 : 0,
                backgroundColor: isLocked ? '#ef4444' : (isEven ? '#e0e0e0' : '#1a237e'),
            }}
            whileHover={!isLocked ? {
                scale: 1.02,
                translateY: -2,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
            } : {}}
            whileTap={!isLocked ? { scale: 0.95 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={!isLocked ? onClick : undefined}
            className={cn(
                "relative w-full aspect-square flex flex-col items-center justify-center",
                "rounded-[4px] border border-black/10 shadow-[2px_2px_0px_black]",
                "font-black text-2xl md:text-3xl lg:text-4xl select-none",
                isLocked ? "cursor-not-allowed" : "cursor-pointer",
                !isLocked && isEven ? "text-[#333333]" : "text-white"
            )}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative z-10"
                >
                    {value}
                </motion.span>
            </AnimatePresence>

            {isLocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[4px]"
                >
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                    <ShieldAlert className="w-1/2 h-1/2 text-white/20 absolute rotate-12" />
                </motion.div>
            )}

            {/* Ripple/Surge Visual Feedback */}
            {isUpdating && !isLocked && (
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    className="absolute inset-0 border-2 border-white/50 rounded-[4px] pointer-events-none"
                />
            )}
        </motion.div>
    );
};

interface GridProps {
    onEvent: (msg: string, type: 'trigger' | 'ripple' | 'surge' | 'lock' | 'reboot') => void;
}

const Grid: React.FC<GridProps> = ({ onEvent }) => {
    const [grid, setGrid] = useState<number[][]>(() =>
        Array.from({ length: 3 }, () => Array(3).fill(0))
    );
    const [updatingPos, setUpdatingPos] = useState<{ row: number; col: number } | null>(null);

    const handleBoxClick = useCallback((row: number, col: number) => {
        if (grid[row]?.[col]! >= 15) return;

        setGrid(prev => {
            const newGrid = prev.map(r => [...r]);
            const newVal = newGrid[row]![col]! + 1;
            newGrid[row]![col] = newVal;

            setUpdatingPos({ row, col });
            onEvent(`NODE [${row},${col}] TRIGGERED: ${newVal}`, 'trigger');

            if (newVal === 15) onEvent(`LOCKING CORE SECTOR [${row},${col}]`, 'lock');

            // Rule A: Ripple Logic (Divisible by 3)
            if (newVal % 3 === 0 && col < 2) {
                const targetVal = newGrid[row]![col + 1]!;
                if (targetVal < 15) {
                    newGrid[row]![col + 1] = Math.max(0, targetVal - 1);
                    onEvent(`RIPPLE EFFECT: Node [${row},${col + 1}] Flow -1`, 'ripple');
                }
            }

            // Rule B: Surge Logic (Divisible by 5)
            if (newVal % 5 === 0 && row < 2) {
                const targetVal = newGrid[row + 1]![col]!;
                if (targetVal < 15) {
                    newGrid[row + 1]![col] = targetVal + 2;
                    onEvent(`SURGE BOOST: Node [${row + 1},${col}] Surge +2`, 'surge');
                }
            }

            return newGrid;
        });

        setTimeout(() => setUpdatingPos(null), 400);
    }, [grid, onEvent]);

    const resetGrid = () => {
        setGrid(Array.from({ length: 3 }, () => Array(3).fill(0)));
        onEvent('SYSTEM REBOOT: ALL CORES WIPED', 'reboot');
    };

    return (
        <div className="flex flex-col items-center gap-10 w-full max-w-[360px] lg:max-w-[460px]">
            <div className="w-full p-6 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-3xl relative overflow-hidden group">
                {/* HUD Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-1/2 w-full animate-pulse pointer-events-none" />

                <div className="grid grid-cols-3 gap-4 relative z-10">
                    {grid.map((rowArr, rowIndex) =>
                        rowArr.map((value, colIndex) => (
                            <GridBox
                                key={`${rowIndex}-${colIndex}`}
                                value={value}
                                isUpdating={updatingPos?.row === rowIndex && updatingPos?.col === colIndex}
                                onClick={() => handleBoxClick(rowIndex, colIndex)}
                            />
                        ))
                    )}
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGrid}
                className="group relative flex items-center gap-3 px-10 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-black border border-white/20 transition-all uppercase tracking-widest text-sm overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700 text-indigo-400" />
                <span className="relative z-10">Reset Core</span>
            </motion.button>
        </div>
    );
};

export default Grid;
