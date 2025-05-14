import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat } from '@zxing/browser';
import { AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
  onScanComplete?: () => void;
  continuousScan?: boolean;
  scanDelay?: number;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onDetected,
  onScanComplete,
  continuousScan = false,
  scanDelay = 1000
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);
  const timeoutRef = useRef<number | null>(null);
  
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [scannedCode, setScannedCode] = useState('');
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(0);
  const [scanCount, setScanCount] = useState(0);

  // Initialize codeReader with optimized settings
  const initCodeReader = () => {
    if (typeof window === 'undefined') return;
    
    const hints = new Map();
    
    // Set specific barcode formats to scan for - optimize for CODE_39 which is common for IDs
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.CODE_39,
      BarcodeFormat.CODE_128,
      BarcodeFormat.EAN_13,
      BarcodeFormat.QR_CODE
    ]);
    
    // Try to ensure scans are successfully decoded
    hints.set(DecodeHintType.TRY_HARDER, true);
    
    // Optimize for speed by adjusting these parameters
    hints.set(DecodeHintType.PURE_BARCODE, true);
    
    codeReader.current = new BrowserMultiFormatReader(hints);
  };

  const startScanner = async () => {
    if (typeof window === 'undefined') return;
    if (!videoRef.current) return;

    // Lazy init with optimized settings
    if (!codeReader.current) {
      initCodeReader();
    }

    try {
      setIsScanning(true);
      setError('');
      setTimeoutReached(false);

      // Reset scan count when starting a new scanning session
      if (!continuousScan) {
        setScanCount(0);
      }

      // Set a timeout to stop scanning if no barcode is detected
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (isScanning) {
          setTimeoutReached(true);
          stopScanner();
        }
      }, 15000); // 15 seconds timeout

      await codeReader.current!.decodeFromVideoDevice(
        null, // Use default device
        videoRef.current,
        (result, err) => {
          if (result) {
            const code = result.getText();
            const currentTime = Date.now();
            
            // Prevent duplicate scans within the delay period
            if (currentTime - lastScanTime > scanDelay) {
              setScannedCode(code);
              setLastScanTime(currentTime);
              setScanCount(prev => prev + 1);
              
              // Process the detected code
              onDetected(code);
              
              // In continuous mode, keep scanning; otherwise, stop after one successful scan
              if (!continuousScan) {
                stopScanner();
                if (onScanComplete) onScanComplete();
              }
            }
          }
        }
      );
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access the camera. Please check permissions.');
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (codeReader.current) {
      codeReader.current.reset();
    }
    
    setIsScanning(false);
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      stopScanner();
      const code = manualCode.trim();
      setScannedCode(code);
      onDetected(code);
      setManualCode('');
      if (onScanComplete) onScanComplete();
    }
  };

  useEffect(() => {
    // Start scanner when component mounts
    startScanner();
    
    // Clean up resources when component unmounts
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-64 bg-gray-800">
        {/* Video feed */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        
        {/* Scanner UI elements */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-blue-500 rounded-lg animate-pulse">
              <div className="absolute top-0 left-1/2 w-4/5 h-1 bg-blue-500 -translate-x-1/2 animate-scan"></div>
            </div>
          </div>
        )}
        
        {/* Scanning status indicator */}
        <div className="absolute top-2 right-2 p-2 rounded-full bg-white/80">
          {isScanning ? (
            <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
          ) : scannedCode ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : error ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : (
            <XCircle className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      
      {/* Status messages */}
      <div className="w-full p-4">
        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-700 rounded border border-red-200">
            <p className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </p>
          </div>
        )}
        
        {scannedCode && (
          <div className="mb-4 p-2 bg-green-50 text-green-700 rounded border border-green-200">
            <p className="font-medium">Scanned Code:</p>
            <p className="font-mono text-sm">{scannedCode}</p>
          </div>
        )}
        
        {timeoutReached && !scannedCode && (
          <div className="mb-4 p-2 bg-yellow-50 text-yellow-700 rounded border border-yellow-200">
            <p className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              No barcode detected. Please try again.
            </p>
          </div>
        )}
        
        {continuousScan && scanCount > 0 && (
          <div className="mb-4 p-2 bg-blue-50 text-blue-700 rounded border border-blue-200">
            <p className="font-medium">Scans completed: {scanCount}</p>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="w-full p-4 border-t border-gray-100">
        <div className="flex flex-col space-y-3">
          {/* Manual entry */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Enter USN manually"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
            />
            <button
              onClick={handleManualSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
          
          {/* Scan control */}
          <div className="flex justify-center">
            {isScanning ? (
              <button
                onClick={stopScanner}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Stop Scanning
              </button>
            ) : (
              <button
                onClick={startScanner}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Start Scanning
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;