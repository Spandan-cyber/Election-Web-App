import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Use springs for smooth interpolation of mouse movement
  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position from -1 to 1 based on screen center
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      springX.set(x * 50); // Max offset 50px
      springY.set(y * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      overflow: 'hidden',
      background: 'var(--bg-slate)'
    }}>
      {/* Orb 1: Cyan */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: ['0%', '10%', '0%'],
          y: ['0%', '5%', '0%']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '70vw',
          height: '70vw',
          background: 'rgba(20, 184, 166, 0.7)', // Teal/Cyan - much more opaque
          borderRadius: '50%',
          filter: 'blur(120px)',
          mixBlendMode: 'multiply',
          x: springX,
          y: springY
        }}
      />

      {/* Orb 2: Primary Blue */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: ['0%', '-15%', '0%'],
          y: ['0%', '-10%', '0%']
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '80vw',
          height: '80vw',
          background: 'rgba(37, 99, 235, 0.6)', // Blue - much more opaque
          borderRadius: '50%',
          filter: 'blur(140px)',
          mixBlendMode: 'multiply',
          x: springX,
          y: springY
        }}
      />

      {/* Orb 3: Purple */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: ['0%', '20%', '0%'],
          y: ['0%', '-20%', '0%']
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '60vw',
          height: '60vw',
          background: 'rgba(168, 85, 247, 0.5)', // Purple - much more opaque
          borderRadius: '50%',
          filter: 'blur(100px)',
          mixBlendMode: 'multiply',
          x: springX,
          y: springY
        }}
      />

      {/* Orb 4: Pink/Rose for extra pop */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          x: ['0%', '-20%', '0%'],
          y: ['0%', '20%', '0%']
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'rgba(244, 63, 94, 0.4)', // Rose
          borderRadius: '50%',
          filter: 'blur(100px)',
          mixBlendMode: 'multiply',
          x: springX,
          y: springY
        }}
      />
    </div>
  );
}
