import { useEffect, useState } from 'react'
import axiosInstance from '../../axiosinstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSearch, faBuilding, faChartLine, faArrowLeft, faBrain } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const [companyName, setCompanyName] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [plot, setPlot] = useState()
  const [ma100, setMA100] = useState()
  const [ma200, setMA200] = useState()
  const [prediction, setPrediction] = useState()
  const [mse, setMSE] = useState()
  const [rmse, setRMSE] = useState()
  const [r2, setR2] = useState()

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        await axiosInstance.get('/protected-view')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchProtectedData()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!companyName.trim()) return

    setSearching(true)
    setError(null)
    setSearchResults([])
    setSelectedCompany(null)

    try {
      const response = await axiosInstance.post('/search/companies/', {
        query: companyName,
      })

      if (response.data.status === 'success') {
        setSearchResults(response.data.results)
      } else {
        setError(response.data.message || 'No companies found')
      }
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to search companies. Please try again.')
    } finally {
      setSearching(false)
    }
  }

  const handleSelectCompany = (company) => {
    setSelectedCompany(company)
    fetchPrediction(company.ticker)
  }

  const fetchPrediction = async (ticker) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.post('/predict/', {
        ticker: ticker,
      })
      console.log(response.data)
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT
      const plotUrl = `${backendRoot}${response.data.plot_img}`
      const ma100Url = `${backendRoot}${response.data.plot_100_dma}`
      const ma200Url = `${backendRoot}${response.data.plot_200_dma}`
      const predictionUrl = `${backendRoot}${response.data.plot_prediction}`

      setPlot(plotUrl)
      setMA100(ma100Url)
      setMA200(ma200Url)
      setPrediction(predictionUrl)
      setMSE(response.data.mse)
      setRMSE(response.data.rmse)
      setR2(response.data.r2)
    } catch (error) {
      console.error('There was an error making the API request ', error)
      setError('Failed to fetch prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetSearch = () => {
    setSelectedCompany(null)
    setSearchResults([])
    setPlot(null)
    setMA100(null)
    setMA200(null)
    setPrediction(null)
    setMSE(null)
    setRMSE(null)
    setR2(null)
  }

  const suggestionChips = ['AAPL', 'MSFT', 'GOOG', 'TSLA', 'AMZN']
  const searchContainerStyle = { maxWidth: '760px', margin: '0 auto', width: '100%' }
  const resultsWrapperStyle = { maxWidth: '900px', margin: '0 auto', width: '100%', padding: '24px' }
  const resultsInnerStyle = { maxWidth: '900px', margin: '0 auto', padding: '0 24px' }

  return (
    <main
      className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center pb-16 sm:pb-20"
      style={{ minHeight: 'calc(100vh - 60px)' }}
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="space-y-10">
          <section
            className="mx-auto flex flex-col items-center justify-center space-y-6"
            style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
              <FontAwesomeIcon icon={faBrain} className="text-xs" />
              AI Dashboard
            </div>

            <div className="space-y-3 text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Stock <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Analysis</span>
              </h1>
              <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">
                Search for a company to get AI-powered stock predictions and moving average analysis
              </p>
            </div>
          </section>

          {!selectedCompany ? (
            <section className="space-y-4">
              <form onSubmit={handleSearch} className="mx-auto w-full" style={searchContainerStyle}>
                <div className="flex w-full justify-center">
                  <div className="flex w-full flex-col items-stretch justify-center sm:w-auto sm:flex-row">
                    <div className="relative sm:min-w-[420px] sm:w-[60vw] sm:max-w-[620px]">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute text-slate-500"
                        style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                      />
                      <input
                        type="text"
                        className="min-h-[52px] w-full rounded-t-xl rounded-b-none border border-white/10 bg-white/5 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 sm:rounded-l-xl sm:rounded-r-none"
                        style={{ paddingLeft: '36px' }}
                        placeholder="Search for a company (e.g., Apple, Microsoft)"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={searching}
                      className="min-h-[52px] rounded-b-xl rounded-t-none bg-gradient-to-r from-cyan-500 to-blue-600 px-6 text-sm font-semibold text-white shadow transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-l-none sm:rounded-r-xl sm:px-8"
                    >
                      {searching ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Search'}
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-4 flex flex-wrap items-center justify-center" style={{ gap: '8px', marginTop: '16px' }}>
                <span className="text-xs text-slate-500">Popular:</span>
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setCompanyName(chip)}
                    className="rounded-full border border-white/10 bg-white/5 font-medium text-slate-300 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-400"
                    style={{ padding: '4px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', fontSize: '13px' }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <div className="mx-auto w-full" style={resultsWrapperStyle}>
              <section className="w-full">
                <div style={resultsInnerStyle}>
                  <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <h5 className="text-lg font-semibold text-white">{selectedCompany.name}</h5>
                      <p className="text-sm text-slate-400">
                        <span className="font-medium text-cyan-400">{selectedCompany.ticker}</span>
                        {' | '}
                        {selectedCompany.description}
                      </p>
                    </div>
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                      onClick={resetSearch}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                      Search Another
                    </button>
                  </div>
                </div>
              </section>

              {loading && (
                <section className="pt-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-xl text-cyan-400" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-400">Analyzing stock data...</p>
                </section>
              )}

              {prediction && !loading && (
                <section className="w-full space-y-6" style={resultsInnerStyle}>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
                      <FontAwesomeIcon icon={faChartLine} className="text-cyan-400" />
                      Stock Analysis
                    </h3>
                    <div className="space-y-4">
                      {plot && (
                        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                          <img src={plot} className="w-full" alt="Stock plot" />
                        </div>
                      )}
                      {ma100 && (
                        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                          <img src={ma100} className="w-full" alt="100 Day Moving Average" />
                        </div>
                      )}
                      {ma200 && (
                        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                          <img src={ma200} className="w-full" alt="200 Day Moving Average" />
                        </div>
                      )}
                      {prediction && (
                        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                          <img src={prediction} className="w-full" alt="Prediction plot" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
                    <h4 className="mb-4 text-base font-semibold text-white">Model Evaluation</h4>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-center">
                        <div className="text-xs font-medium uppercase tracking-wider text-slate-500">MSE</div>
                        <div className="mt-1 text-lg font-bold text-white">{mse}</div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-center">
                        <div className="text-xs font-medium uppercase tracking-wider text-slate-500">RMSE</div>
                        <div className="mt-1 text-lg font-bold text-white">{rmse}</div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-center">
                        <div className="text-xs font-medium uppercase tracking-wider text-slate-500">R-Squared</div>
                        <div className="mt-1 text-lg font-bold text-white">{r2}</div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}

          {error && (
            <div className="max-w-3xl mx-auto rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          {searchResults.length > 0 && !selectedCompany && (
            <section className="mx-auto w-full space-y-3" style={searchContainerStyle}>
              <h5 className="flex items-center gap-2 text-base font-semibold text-white">
                <FontAwesomeIcon icon={faBuilding} className="text-cyan-400" />
                Search Results
              </h5>
              <div className="space-y-2">
                {searchResults.map((company, index) => (
                  <button
                    key={index}
                    type="button"
                    className="group w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5"
                    onClick={() => handleSelectCompany(company)}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <div className="font-semibold text-white transition-colors duration-300 group-hover:text-cyan-400">
                          {company.name}
                        </div>
                        <small className="text-sm text-slate-500">{company.description}</small>
                      </div>
                      <span className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-xs font-bold text-cyan-400">
                        {company.ticker}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  )
}

export default Dashboard
