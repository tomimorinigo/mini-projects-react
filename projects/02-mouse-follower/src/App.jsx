import { useEffect, useState } from 'react';

const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('effect ', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    }

    if(enabled){
      window.addEventListener('pointermove', handleMove)
    } 
  
    return () => {
      console.log('cleanup', { enabled })
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
};

function App() {
  
  const [mounted, setMounted] = useState(false);

  return (
    
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>
        {mounted ? 'Desmontar' : 'Montar'} componente
      </button>
    </main>
  )
}

export default App
