import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, Button, Stepper, Step, StepLabel, Snackbar, Alert, CircularProgress } from '@mui/material';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { useFlightContext } from '../context/FlightContext';
import * as faceapi from 'face-api.js'; 

export const SelfCheckIn = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFlightContext();
  const [activeStep, setActiveStep] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    person1: false,
    person2: false
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  
  const steps = ['Passenger 1 Verification', 'Passenger 2 Verification', 'Confirmation'];

  
   useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        setModelsLoaded(true);  // Set models as loaded
        console.log('Face recognition models loaded.');
      } catch (error) {
        console.error('Failed to load models:', error);
      }
    };
    loadModels();
  }, []);

  const handleCapture = async (person: 'person1' | 'person2') => {
    if (!modelsLoaded) {
      alert('Face recognition models are still loading. Please wait.');
      return;
  }
    setIsCapturing(true);
    try {
      if (person === 'person2') {
        console.log('Reloading models for Person 2...');
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) {
        alert('Failed to capture image.');
        setIsCapturing(false);
        return;
      }
      console.log(`Captured image for ${person}:`, imageSrc);  // ✅ Log captured image
      const capturedImg = await faceapi.fetchImage(imageSrc);
      const storedImg = await faceapi.fetchImage(state?.passengers[person].images[0]);  // First stored image
      console.log(`Stored image for ${person}:`, state?.passengers[person].images[0]);
console.log(`Captured image for ${person}:`, imageSrc);
if (!storedImg) {
  console.error(`Stored image not found for ${person}`);
  alert(`No stored image found for ${person}. Please capture the image again.`);
  setIsCapturing(false);
  return;
}
      const options=new faceapi.SsdMobilenetv1Options({ minConfidence: 0.3 });  // Lower threshold
      const capturedDesc = await faceapi.detectSingleFace(capturedImg, options).withFaceLandmarks().withFaceDescriptor();
      const storedDesc = await faceapi.detectSingleFace(storedImg, options).withFaceLandmarks().withFaceDescriptor();

      if (!capturedDesc || !storedDesc) {
        alert('Face not detected. Please try again.');
        setIsCapturing(false);
        return;
      }

      const distance = faceapi.euclideanDistance(capturedDesc.descriptor, storedDesc.descriptor);
      console.log(`Distance for ${person}:`, distance);

      const isVerified = distance < 0.6;  // Threshold for face matching
      setVerificationStatus(prev => ({
        ...prev,
        [person]: isVerified
      }));

      if (isVerified) {
        dispatch({
          type: 'SET_VERIFICATION_STATUS',
          payload: {
            person1Verified: person === 'person1' ? true : verificationStatus.person1,
            person2Verified: person === 'person2' ? true : verificationStatus.person2,
          }
        });

        if (person === 'person1') {
          setActiveStep(1);  // Move to passenger 2
        } else {
          setActiveStep(2);  // Move to confirmation
          setShowSuccess(true);
        }
      } else {
        alert(`Face verification failed for ${person}. Please try again.`);
      }

    } catch (error) {
      console.error('Verification failed:', error);
      alert('Face verification failed. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };
  const handleComplete = () => {
    navigate('/boarding-pass');
  };


  const renderPassengerVerification = (person: 'person1' | 'person2') => {
    const passengerData = state?.passengers[person];
    
    return (
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Verifying {passengerData?.firstName} {passengerData?.lastName}
        </Typography>
        
        <Box sx={{ 
          position: 'relative',
          width: '320px',
          margin: '0 auto',
          mt: 2 
        }}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
    height={480}  // Increased resolution
    videoConstraints={{
        width: 640,
        height: 480,
        facingMode: "user"
    }}
            style={{
              width: '100%',
              borderRadius: '8px'
            }}
          />
          {isCapturing && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.5)',
              borderRadius: '8px'
            }}>
              <CircularProgress sx={{ color: 'white' }} />
            </Box>
          )}
        </Box>

        {!modelsLoaded ? (
                <Typography sx={{ mt: 2, color: 'gray' }}>
                    Loading face recognition models, please wait...
                </Typography>
            ) :<Button
          variant="contained"
          onClick={() => handleCapture(person)}
          disabled={!modelsLoaded||isCapturing || verificationStatus[person]}
          sx={{ 
            mt: 2,
            bgcolor: '#FF1493',
            '&:hover': {
              bgcolor: '#FF1493dd'
            }
          }}
        >
          {verificationStatus[person] ? 'Verified ✓' : 'Verify Face'}
        </Button>
    }
    </Box>
    );
  };

  const renderConfirmation = () => (
    <Box sx={{ textAlign: 'center', mt: 3 }}>
      <Typography variant="h6" gutterBottom color="success.main">
        Both passengers verified successfully!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        You can now proceed to download your boarding passes.
      </Typography>
      <Button
        variant="contained"
        onClick={handleComplete}
        sx={{
          bgcolor: '#FF1493',
          '&:hover': {
            bgcolor: '#FF1493dd'
          }
        }}
      >
        View Boarding Pass
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Self Check-in
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && renderPassengerVerification('person1')}
          {activeStep === 1 && renderPassengerVerification('person2')}
          {activeStep === 2 && renderConfirmation()}
        </Paper>
      </motion.div>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          variant="filled"
          onClose={() => setShowSuccess(false)}
        >
          Verification completed! You can now download your boarding passes.
        </Alert>
      </Snackbar>
    </Container>
  );
}; 