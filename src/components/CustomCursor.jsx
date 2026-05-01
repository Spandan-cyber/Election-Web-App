import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [clicks, setClicks] = useState([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide the default cursor globally
    document.documentElement.style.cursor = 'none';

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    // Smooth trailing ring animation
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    const onClick = (e) => {
      const id = Date.now() + Math.random();
      setClicks(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== id));
      }, 700);
    };

    const onMouseEnterInteractive = (e) => {
      const tag = e.target.tagName.toLowerCase();
      const isInteractive = ['a', 'button', 'input', 'select', 'textarea'].includes(tag) ||
        e.target.closest('a, button, [role="button"]');
      if (isInteractive) setIsHovering(true);
    };

    const onMouseLeaveInteractive = () => setIsHovering(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    document.addEventListener('mouseover', onMouseEnterInteractive);
    document.addEventListener('mouseout', onMouseLeaveInteractive);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseover', onMouseEnterInteractive);
      document.removeEventListener('mouseout', onMouseLeaveInteractive);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: isHovering ? '44px' : '32px',
          height: isHovering ? '44px' : '32px',
          borderRadius: '50%',
          border: isHovering
            ? '2px solid #138808'
            : '2px solid #FF9933',
          marginLeft: isHovering ? '-22px' : '-16px',
          marginTop: isHovering ? '-22px' : '-16px',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s, opacity 0.2s',
          mixBlendMode: 'multiply',
          opacity: 0.9,
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: isHovering ? '6px' : '8px',
          height: isHovering ? '6px' : '8px',
          borderRadius: '50%',
          background: isHovering ? '#138808' : '#FF9933',
          marginLeft: isHovering ? '-3px' : '-4px',
          marginTop: isHovering ? '-3px' : '-4px',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.15s, height 0.15s, margin 0.15s, background 0.2s',
          boxShadow: isHovering
            ? '0 0 8px rgba(19,136,8,0.6)'
            : '0 0 8px rgba(255,153,51,0.6)',
        }}
      />

      {/* Click ripples */}
      {clicks.map(click => (
        <ClickRipple key={click.id} x={click.x} y={click.y} />
      ))}

      {/* Force cursor:none on all child elements */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>
    </>
  );
}

function ClickRipple({ x, y }) {
  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 99997,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Tricolor ripple rings — saffron, white, green */}
      {[
        { color: '#FF9933', delay: '0ms',   size: 40 },
        { color: '#FFFFFF', delay: '80ms',  size: 56, border: true },
        { color: '#138808', delay: '160ms', size: 72 },
      ].map((ring, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${ring.size}px`,
            height: `${ring.size}px`,
            borderRadius: '50%',
            border: `2.5px solid ${ring.color}`,
            background: i === 1 ? 'transparent' : 'transparent',
            animation: `ripple-out 0.65s ease-out ${ring.delay} forwards`,
            boxShadow: `0 0 6px ${ring.color}88`,
          }}
        />
      ))}

      {/* Center dot burst */}
      <div
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '10px', height: '10px',
          borderRadius: '50%',
          background: '#FF9933',
          animation: 'dot-burst 0.4s ease-out forwards',
        }}
      />

      <style>{`
        @keyframes ripple-out {
          0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1);   opacity: 0; }
        }
        @keyframes dot-burst {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
