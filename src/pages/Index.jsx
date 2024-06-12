import React, { useRef, useState, useEffect } from "react";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { FaSquare } from "react-icons/fa";

const colors = ["#D40920", "#1356A2", "#F7D842", "#000000", "#FFFFFF"];

const Index = () => {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = (e) => {
      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = selectedColor;
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };

    const startDrawing = () => {
      canvas.addEventListener("mousemove", draw);
    };

    const stopDrawing = () => {
      canvas.removeEventListener("mousemove", draw);
      context.beginPath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [selectedColor]);

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <VStack position="absolute" top={4} left={4} spacing={2}>
        {colors.map((color) => (
          <Button
            key={color}
            leftIcon={<FaSquare color={color} />}
            colorScheme={selectedColor === color ? "teal" : "gray"}
            variant={selectedColor === color ? "solid" : "outline"}
            onClick={() => setSelectedColor(color)}
          >
            {color}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;