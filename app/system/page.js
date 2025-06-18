'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function SystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div style={{
      margin: 0,
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1>システム構成図</h1>
        <div style={{
          textAlign: 'center',
          margin: '20px 0'
        }}>
          <div 
            onClick={openModal}
            style={{
              cursor: 'pointer',
              display: 'inline-block',
              position: 'relative'
            }}
          >
            <Image
              src="/project/tradeHistory.svg"
              alt="システム構成図"
              width={800}
              height={600}
              style={{
                maxWidth: '100%',
                height: 'auto',
                border: '1px solid #ddd',
                borderRadius: '4px',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.02)'
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
            {/* クリック可能であることを示すアイコン */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '5px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              🔍 クリックで拡大
            </div>
          </div>
        </div>
      </div>

      {/* モーダル */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '95vw',
              maxHeight: '95vh',
              cursor: 'default'
            }}
          >
            <Image
              src="/project/tradeHistory.svg"
              alt="システム構成図（拡大表示）"
              width={1200}
              height={900}
              style={{
                maxWidth: '100%',
                maxHeight: '95vh',
                height: 'auto',
                borderRadius: '8px'
              }}
            />
            {/* 閉じるボタン */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}