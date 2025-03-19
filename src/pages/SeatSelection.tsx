import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
// Replace `@/lib/utils` with your actual utility library or define `cn` manually
import clsx from 'clsx'; 
import { useFlightContext } from '../context/FlightContext';

const seatVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Add occupied seats simulation
const occupiedSeats = [''];

export const SeatSelection = () => {
  const { dispatch } = useFlightContext();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    if (selectedSeats.length >= 2 && !selectedSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const generateSeatRow = (rowNum: number) => {
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    return (
      <div key={rowNum} className="flex gap-2 justify-center items-center my-1">
        {cols.map((col, idx) => {
          const seatId = `${rowNum}${col}`;
          const isSelected = selectedSeats.includes(seatId);
          const isOccupied = occupiedSeats.includes(seatId);
          const isAisle = idx === 2;

          return (
            <React.Fragment key={seatId}>
              <motion.button
                variants={seatVariants}
                whileHover={isOccupied ? undefined : 'hover'}
                whileTap={isOccupied ? undefined : 'tap'}
                onClick={() => handleSeatClick(seatId)}
                disabled={isOccupied}
                className={clsx(
                  'w-8 h-8 rounded-md flex items-center justify-center text-xs border',
                  isSelected && 'bg-red-600 text-white border-primary',
                  isOccupied && 'bg-gray-200 border-gray-300 cursor-not-allowed',
                  !isSelected && !isOccupied && 'bg-white border-gray-300 hover:border-primary'
                )}
              >
                {rowNum}
                {col}
              </motion.button>
              {isAisle && <div className="w-8" />}
            </React.Fragment>
          );
        })}
    </div>
    );
  };

  const handleNext = () => {
    if (selectedSeats.length !== 2) {
      alert('Please select exactly 2 seats to continue');
      return;
    }

    try {
      // Ensure seats are properly formatted
      const formattedSeats = selectedSeats.map(seat => seat.toString());
      
      dispatch({
        type: 'SET_SELECTED_SEATS',
        payload: formattedSeats
      });

      // Add debug logging
      console.log('Saved selected seats:', formattedSeats);
      navigate('/boarding-pass');
    } catch (error) {
      console.error('Error saving seats:', error);
      alert('Error saving seat selection. Please try again.');
    }
  };

  return (
    <main>
      <div className="max-w-4xl mx-auto py-8">
        <div className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Select 2 Seats</h1>
            <p className="text-black text-sm">
              Select your seats and click on 'Next' to proceed
            </p>
          </div>

          <div className="flex justify-between mb-8">
            <button
              onClick={() => navigate('/passenger-details')}
              className="flex items-center gap-2 text-white border border-gray-300 p-2 rounded"
            >
              <ChevronLeftIcon /> Previous
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-white"
              disabled={selectedSeats.length !== 2}
            >
              Next <ChevronRightIcon />
            </button>
          </div>

          {/* <div className="relative bg-white rounded-lg p-8"> */}
          <div className='relative  bg-white p-11  w-80 mx-auto rounded-t-full z-10'></div>
          <div className="relative bg-white p-11  w-80 mx-auto z-10">
            <div className="flex flex-col gap-1">
              {Array.from({ length: 14 }, (_, i) => generateSeatRow(i + 1))}
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-gray-300 rounded" />
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span className="text-sm">Selected</span>
              </div>
             
            </div>
            
          </div>
          <div className="absolute bottom-80 left-1/2 transform -translate-x-1/2 w-[32rem] flex justify-between z-0">
    <div className="w-72 h-20 bg-gray-400 rounded-md -rotate-12 -translate-x-20"></div> {/* Left Wing */}
    <div className="w-72 h-20 bg-gray-400 rounded-md rotate-12 translate-x-20"></div> {/* Right Wing */}
  </div>
        </div>
        
      </div>
    </main>
  );
};
