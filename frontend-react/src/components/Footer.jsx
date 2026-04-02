import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-auto flex w-full items-center justify-center border-t border-white/10 py-4 text-center">
      <div className="w-full px-4 text-center" style={{ width: '100%', textAlign: 'center' }}>
        <p className="text-center text-sm text-slate-500">
          &copy; 2026 Built with <span className="text-red-400">&#10084;</span> by Nilesh Deb
        </p>
      </div>
    </footer>
  )
}

export default Footer
