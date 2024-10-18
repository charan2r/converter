import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageToTextConverter = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log(file); 
  };

  const handleConvert = () => {
    console.log('Convert button clicked');
    if (selectedImage) {
      console.log('Processing image:', selectedImage);  

      Tesseract.recognize(
        selectedImage,
        'eng',
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(Math.floor(m.progress * 100));
            }
          },
        }
      )
        .then(({ data: { text } }) => {
          setText(text);
          console.log('Extracted Text:', text);  
        })
        .catch((err) => console.error('OCR Error:', err));
    } else {
      console.log('No image selected');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
      <h1 className="text-3xl font-bold mb-10 text-white">Image to Text Converter</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload an Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />

        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Convert to Text
        </button>

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {text && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Extracted Text:</h2>
            <div className="bg-gray-100 p-4 rounded-lg mt-2 text-sm text-gray-700 whitespace-pre-wrap">
              {text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToTextConverter;
