import React from 'react';
import { useDispatch } from 'react-redux';
import { resetCheckStatus } from '../redux/slices/checkStatus';
import { Button } from '@mui/material';

function AttendanceAlreadyMarked({setIsMarked}) {

    const dispatch = useDispatch();

    const reset = () => {
        dispatch(resetCheckStatus());
        setIsMarked(0)
    }

    return (
        <div className="bg-[#070b0f] text-white min-h-screen w-full p-2 md:p-8 mt">
            <div className="p-2 md:p-4 mt-14 md:mt-0">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">Attendance Marked</h1>
                    <p className="text-base md:text-lg text-gray-300 mb-6">
                        Attendance has been successfully marked.
                    </p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => reset()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AttendanceAlreadyMarked;
