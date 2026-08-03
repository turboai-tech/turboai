import { ImageResponse } from 'next/og'

export const alt = 'Turbo AI — We build anything with AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background:
            'linear-gradient(135deg, #0b1220 0%, #132033 45%, #1a2b3f 100%)',
          color: '#f5f7fa',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: -0.5,
          }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: '#3b82f6',
              display: 'flex',
            }}
          />
          Turbo AI
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 920,
            }}>
            We build anything with AI
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#b7c2d0',
              maxWidth: 820,
              lineHeight: 1.35,
            }}>
            From a sentence to a shipped product — Shanghai, Tokyo and beyond.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 22, color: '#8fa0b5' }}>
          www.iturboai.com
        </div>
      </div>
    ),
    { ...size },
  )
}
