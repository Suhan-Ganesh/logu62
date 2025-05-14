import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner2';
import { processScannedUSN, Student } from '../services/studentService';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface ScannerPageProps {
  eventId?: number;
  eventName?: string;
}

const ScannerPage: React.FC<ScannerPageProps> = ({ eventId, eventName }) => {
  const [processing, setProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<{
    success: boolean;
    student: Student | null;
    message: string;
    timestamp: Date;
  } | null>(null);
  
  const [scanHistory, setScanHistory] = useState<{
    usn: string;
    success: boolean;
    name?: string;
    timestamp: Date;
  }[]>([]);
  
  const [continuousScan, setContinuousScan] = useState(true);
  
  const handleBarcodeDetected = async (code: string) => {
    if (processing) return;
    
    setProcessing(true);
    
    try {
      const result = await processScannedUSN(code.trim(), eventId);
      
      const scanResult = {
        ...result,
        timestamp: new Date()
      };
      
      setLastResult(scanResult);
      
      // Add to scan history
      setScanHistory(prev => [
        {
          usn: code,
          success: result.success,
          name: result.student?.name,
          timestamp: new Date()
        },
        ...prev.slice(0, 19) // Keep last 20 scans
      ]);
      
      // Play sound based on result
      if (result.success) {
        playSuccessSound();
      } else {
        playErrorSound();
      }
    } catch (error) {
      console.error('Error processing barcode:', error);
      setLastResult({
        success: false,
        student: null,
        message: 'An error occurred while processing the code',
        timestamp: new Date()
      });
      playErrorSound();
    } finally {
      setProcessing(false);
    }
  };
  
  const playSuccessSound = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play();
    } catch (e) {
      console.error('Error playing sound:', e);
    }
  };
  
  const playErrorSound = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2865/2865-preview.mp3');
      audio.play();
    } catch (e) {
      console.error('Error playing sound:', e);
    }
  };
  
  const clearHistory = () => {
    setScanHistory([]);
    setLastResult(null);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">USN Scanner</h1>
        {eventName && (
          <p className="text-lg text-gray-600">
            Event: {eventName}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Scan Barcode</h2>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={continuousScan}
                onChange={() => setContinuousScan(!continuousScan)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Continuous scanning</span>
            </label>
          </div>
          
          <BarcodeScanner
            onDetected={handleBarcodeDetected}
            continuousScan={continuousScan}
            scanDelay={1000}
          />
        </div>
        
        <div className="flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Scan History</h2>
              <button
                onClick={clearHistory}
                className="text-sm px-2 py-1 text-gray-600 hover:text-gray-800"
              >
                Clear
              </button>
            </div>
            
            {lastResult && (
              <div className={`mb-4 p-3 rounded-md ${
                lastResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    {lastResult.success ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      lastResult.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {lastResult.success ? 'Success' : 'Error'}
                    </p>
                    <p className="text-sm mt-1">
                      {lastResult.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(lastResult.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {processing && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                  <p className="ml-3 text-sm text-blue-700">Processing...</p>
                </div>
              </div>
            )}
            
            <div className="overflow-y-auto max-h-96">
              {scanHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No scans yet</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {scanHistory.map((scan, index) => (
                    <li key={index} className="py-3">
                      <div className="flex items-center">
                        {scan.success ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {scan.usn}
                          </p>
                          {scan.name && (
                            <p className="text-sm text-gray-500">{scan.name}</p>
                          )}
                          <p className="text-xs text-gray-400">
                            {formatTime(scan.timestamp)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;