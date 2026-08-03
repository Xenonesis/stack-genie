import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation for Stack Genie Favicon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: '#101010',
          border: '1px solid #212121',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 400,
          fontFamily: 'sans-serif',
          letterSpacing: '-0.5px',
          borderRadius: '4px',
        }}
      >
        <span style={{ color: '#ffffff', fontWeight: 600 }}>S</span>
        <span style={{ color: '#6f6759', fontWeight: 600 }}>G</span>
      </div>
    ),
    {
      ...size,
    }
  )
}
