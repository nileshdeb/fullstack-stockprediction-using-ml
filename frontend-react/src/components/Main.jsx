import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[900px]">
        <section className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
            <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"></span>
            AI-Powered Predictions
          </div>

          <div className="space-y-4">
            <h1 className="mx-auto max-w-[900px] text-center text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Predict Stock Trends{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>

            <p className="mx-auto max-w-[900px] text-center text-base leading-relaxed text-slate-400 sm:text-lg">
              Harness machine learning and LSTM neural networks to forecast stock prices.
              Analyze 100-day and 200-day moving averages for smarter trading decisions.
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-3 pb-2 sm:flex-row">
            <Link
              to="/dashboard"
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto"
            >
              Explore Now
            </Link>
            <Link
              to="/register"
              className="w-full rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:bg-white/5 hover:text-white sm:w-auto"
            >
              Get Started Free
            </Link>
          </div>

          <div className="grid w-full place-items-stretch gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { value: 'LSTM', label: 'Neural Network' },
              { value: '100/200', label: 'Day Moving Avg' },
              { value: '24/7', label: 'AI Analysis' },
            ].map((stat, i) => (
              <div key={i} className="flex min-h-[120px] w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Main
