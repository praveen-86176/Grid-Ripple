import React, { useState, useCallback } from 'react';

const GridBox = ({ value, onClick, isUpdating }) => {
    const isLocked = value >= 15;
    const isEven = value % 2 === 0;

    let bgStyle = '';
    let textStyle = 'text-black';
    let shadowStyle = 'shadow-[2px_2px_0px_black]';

    if (isLocked) {
        bgStyle = 'bg-[#ef4444]'; // "turns Red"
        textStyle = 'text-white';
    } else if (isEven) {
        bgStyle = 'bg-[#e0e0e0]'; // Light Gray
        textStyle = 'text-[#333333]';
    } else {
        bgStyle = 'bg-[#1a237e]'; // Navy Blue
        textStyle = 'text-white';
    }

    return (
        <div
            onClick={!isLocked ? onClick : undefined}
            className={`
                relative w-full aspect-square flex flex-col items-center justify-center
                rounded-[4px] border border-black/10
                font-black text-2xl md:text-3xl lg:text-4xl
                transition-all duration-200
                ${bgStyle} ${textStyle} ${shadowStyle}
                ${isLocked ? 'cursor-not-allowed opacity-90' : 'cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]'}
                ${isUpdating ? 'brightness-125 z-20' : 'z-10'}
                select-none
            `}
        >
            <span className="relative z-10">{value}</span>
            {isLocked && <div className="absolute inset-0 bg-black/5 pointer-events-none" />}
        </div>
    );
};

const Grid = ({ onEvent }) => {
    const initialGrid = Array(3).fill(null).map(() => Array(3).fill(0));
    const [grid, setGrid] = useState(initialGrid);
    const [updatingPos, setUpdatingPos] = useState(null);

    const handleBoxClick = useCallback((row, col) => {
        setGrid(prevGrid => {
            if (prevGrid[row][col] >= 15) return prevGrid;

            const newGrid = prevGrid.map(r => [...r]);
            const newVal = newGrid[row][col] + 1;
            newGrid[row][col] = newVal;

            setUpdatingPos({ row, col });
            onEvent(`NODE [${row},${col}] TRIGGERED: ${newVal}`);

            if (newVal === 15) onEvent(`LOCKING CORE SECTOR [${row},${col}]`);

            // Logic Code A
            if (newVal % 3 === 0 && col < 2) {
                if (newGrid[row][col + 1] < 15) {
                    newGrid[row][col + 1] = Math.max(0, newGrid[row][col + 1] - 1);
                    onEvent(`RIPPLE: Node [${row},${col + 1}] Flux`);
                }
            }

            // Logic Code B
            if (newVal % 5 === 0 && row < 2) {
                if (newGrid[row + 1][col] < 15) {
                    newGrid[row + 1][col] = newGrid[row + 1][col] + 2;
                    onEvent(`SURGE: Node [${row + 1},${col}] Boost`);
                }
            }

            return newGrid;
        });

        setTimeout(() => setUpdatingPos(null), 300);
    }, [onEvent]);

    const resetGrid = () => {
        setGrid(initialGrid);
        onEvent('SYSTEM REBOOT: ALL CORES WIPED');
    };

    return (
        <div className="flex flex-col items-center gap-6 lg:gap-8 w-full max-w-[360px] lg:max-w-[460px]">
            <div className="w-full p-3 lg:p-4 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="grid grid-cols-3 gap-2.5 lg:gap-4 relative z-10">
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

            {/* Ultra Cool Reset Button */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <button
                    onClick={resetGrid}
                    className="relative px-12 py-3.5 bg-[#0a0a0a] text-white rounded-2xl font-black
                       border border-white/20 hover:border-white/40
                       transition-all duration-300 uppercase tracking-[0.2em] text-sm overflow-hidden flex items-center gap-3"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.2)_0%,_transparent_70%)]" />
                    </div>

                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-700">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M8 16H3v5" />
                    </svg>

                    <span className="relative font-black">Reset Grid</span>

                    {/* Glossy Overlay */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </button>
            </div>
        </div>
    );
};

export default Grid;
