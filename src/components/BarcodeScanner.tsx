
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface BarcodeScannerProps {
  onScanComplete?: (studentId: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [manualId, setManualId] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  
  const startScanning = () => {
    setIsScanning(true);
    // In a real app, this would activate the camera
    // For demo purposes, we'll simulate a scan after 2 seconds
    setTimeout(() => {
      const mockStudentId = "U" + Math.floor(100000 + Math.random() * 900000);
      setScannedCode(mockStudentId);
      setIsScanning(false);
      
      if (onScanComplete) {
        onScanComplete(mockStudentId);
      }
    }, 2000);
  };
  
  const resetScanner = () => {
    setScannedCode(null);
  };

  const handleManualSubmit = () => {
    if (manualId && manualId.trim() !== '') {
      if (onScanComplete) {
        onScanComplete(manualId);
      }
      setManualId('');
      setShowManualEntry(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6">
          <h3 className="text-xl font-medium mb-4">Student ID Scanner</h3>
          
          <div className="h-64 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center mb-6 relative overflow-hidden">
            {isScanning ? (
              <>
                <div className="absolute w-full h-[2px] bg-logu-light opacity-70 top-0 animate-scanner"></div>
                <p className="text-logu font-medium animate-pulse">Scanning...</p>
              </>
            ) : scannedCode ? (
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-bold">{scannedCode}</p>
                <p className="text-green-600 mt-1">Successfully scanned</p>
              </div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-300 mb-3">
                  <rect width="16" height="16" x="4" y="4" rx="2" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h1m-1 3h1m3-3h1m-1 3h1m2-3h.01m-.01 3h.01" strokeWidth="2" />
                </svg>
                <p className="text-gray-500 font-medium">Ready to scan</p>
              </>
            )}
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={scannedCode ? resetScanner : startScanning} 
              className="w-full bg-gradient-blue hover:bg-logu"
              disabled={isScanning}
            >
              {scannedCode ? "Scan Next ID" : "Start Scanning"}
            </Button>
            
            {showManualEntry ? (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="University ID Number" 
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                  />
                  <Button 
                    className="bg-gradient-blue shrink-0" 
                    onClick={handleManualSubmit}
                  >
                    Submit
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => setShowManualEntry(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full border-logu text-logu hover:bg-logu-light hover:text-white"
                onClick={() => setShowManualEntry(true)}
              >
                Manual Entry
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
