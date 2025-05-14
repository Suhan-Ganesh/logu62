<<<<<<< HEAD
=======

>>>>>>> e812c0638777cbf0fa00543cfa28be8a8905caa3
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Barcode, Camera, User } from 'lucide-react';

interface BarcodeScannerProps {
  onScanComplete?: (studentId: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [manualId, setManualId] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Start camera streaming
  const startScanning = async () => {
    try {
      setIsScanning(true);
      
      if (!videoRef.current) return;
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
<<<<<<< HEAD

=======
>>>>>>> e812c0638777cbf0fa00543cfa28be8a8905caa3
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          videoRef.current.play();
          // Start capture loop
          captureFrame();
        }
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera access error",
        description: "Unable to access camera. Please try manual entry.",
        variant: "destructive"
      });
      setIsScanning(false);
    }
  };
  
  const captureFrame = () => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context || video.videoWidth === 0) {
      // Video not ready yet, try again shortly
      requestAnimationFrame(captureFrame);
      return;
    }
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame on canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to base64 for sending to API
    const imageData = canvas.toDataURL('image/jpeg', 0.7).split(',')[1];
    
    // Send to barcode API
    sendImageToAPI(imageData);
    
    // Continue capturing frames
    setTimeout(() => {
      if (isScanning) requestAnimationFrame(captureFrame);
    }, 500); // Scan every 500ms
  };
  
  const sendImageToAPI = async (imageData: string) => {
    try {
      // Make API call to Python backend
      const response = await fetch('http://localhost:5000/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });
      
      const result = await response.json();
      
      if (result.success && result.barcodes && result.barcodes.length > 0) {
        // Found a barcode
        const barcodeData = result.barcodes[0].data;
        setScannedCode(barcodeData);
        stopScanning();
        
        if (onScanComplete) {
          onScanComplete(barcodeData);
        }
<<<<<<< HEAD
                
=======
        
>>>>>>> e812c0638777cbf0fa00543cfa28be8a8905caa3
        // For demo purposes: Mark attendance in the backend
        // This would be connected to your Node.js backend
        /*
        await fetch('http://localhost:5000/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            universityNumber: barcodeData,
            eventCode: currentEvent.code // This would come from props or context
          }),
        });
        */
        
        toast({
          title: "Student ID Scanned",
          description: `Successfully scanned ID: ${barcodeData}`,
        });
      }
    } catch (error) {
      console.error('Error sending image to API:', error);
    }
  };
  
  const stopScanning = () => {
    setIsScanning(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };
  
  const resetScanner = () => {
    setScannedCode(null);
  };

  const handleManualSubmit = () => {
    if (manualId && manualId.trim() !== '') {
      // Process the manual ID entry
      if (onScanComplete) {
        onScanComplete(manualId);
      }
<<<<<<< HEAD
            
=======
      
>>>>>>> e812c0638777cbf0fa00543cfa28be8a8905caa3
      // For demo purposes: Mark attendance in the backend
      // This would be connected to your Node.js backend
      /*
      fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          universityNumber: manualId,
          eventCode: currentEvent.code // This would come from props or context
        }),
      });
      */
      
      toast({
        title: "Student ID Added",
        description: `Successfully recorded ID: ${manualId}`,
      });
      
      setManualId('');
      setShowManualEntry(false);
      setScannedCode(manualId);
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="absolute w-full h-[2px] bg-logu-light opacity-70 top-1/2 animate-scanner"></div>
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
                <p className="text-logu font-medium animate-pulse bg-black bg-opacity-50 px-2 py-1 rounded absolute bottom-2 left-2">
                  Scanning...
                </p>
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
                <Barcode className="h-16 w-16 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">Ready to scan</p>
              </>
            )}
          </div>
          
          <div className="space-y-3">
            <Button 
<<<<<<< HEAD
              onClick={scannedCode ? resetScanner : isScanning ? stopScanning : startScanning}  
=======
              onClick={scannedCode ? resetScanner : isScanning ? stopScanning : startScanning} 
>>>>>>> e812c0638777cbf0fa00543cfa28be8a8905caa3
              className="w-full bg-gradient-blue hover:bg-logu"
            >
              {isScanning ? "Cancel" : scannedCode ? "Scan Next ID" : "Start Scanning"}
              {!isScanning && !scannedCode && <Camera className="ml-2 h-4 w-4" />}
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
                <User className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;