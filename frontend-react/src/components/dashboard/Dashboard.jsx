import {useEffect,useState} from 'react'
import axiosInstance from '../../axiosinstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSearch, faBuilding } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const[companyName, setCompanyName] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [error,setError] =useState()
  const[loading,setLoading] = useState(false)
  const[plot, setPlot] =useState()
  const [ma100,setMA100] =useState()
  const [ma200,setMA200] =useState()
  const [prediction, setPrediction] = useState()
  const [mse, setMSE]= useState()
  const [rmse, setRMSE]= useState()
  const [r2, setR2]= useState()



  useEffect(() =>{
    const fetchProtectedData = async () =>{
      try{
          const response = await axiosInstance.get('/protected-view' );
      }catch(error){
        console.error('Error fetching data:',error)
        }
    }
    fetchProtectedData();
  },[]
  )  
   
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    
    setSearching(true);
    setError(null);
    setSearchResults([]);
    setSelectedCompany(null);
    
    try {
      const response = await axiosInstance.post('/search/companies/', {
        query: companyName
      });
      
      if (response.data.status === 'success') {
        setSearchResults(response.data.results);
      } else {
        setError(response.data.message || 'No companies found');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search companies. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    fetchPrediction(company.ticker);
  };

   const fetchPrediction = async (ticker) => {
     setLoading(true);
     setError(null);
     try{
      const response = await axiosInstance.post('/predict/',{
        ticker: ticker
      });
      console.log(response.data);
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT
      const plotUrl =`${backendRoot}${response.data.plot_img}`
      const ma100Url =`${backendRoot}${response.data.plot_100_dma}`
      const ma200Url =`${backendRoot}${response.data.plot_200_dma}`
      const predictionUrl =`${backendRoot}${response.data.plot_prediction}`

      setPlot(plotUrl)
      setMA100(ma100Url)
      setMA200(ma200Url)
      setPrediction(predictionUrl)
      setMSE(response.data.mse)
      setRMSE(response.data.rmse)
      setR2(response.data.r2)

     }catch(error){
      console.error('There was an error making the API request ', error)
      setError('Failed to fetch prediction. Please try again.');
     }finally{
       setLoading(false);
     }
    };

  const resetSearch = () => {
    setSelectedCompany(null);
    setSearchResults([]);
    setPlot(null);
    setMA100(null);
    setMA200(null);
    setPrediction(null);
    setMSE(null);
    setRMSE(null);
    setR2(null);
  };

  return (
    <div className='container'>
      <div className="row">
        <div className='col-md-8 mx-auto'>
          {!selectedCompany ? (
            <form onSubmit={handleSearch}>
              <div className="input-group mb-3">
                <input 
                  type='text' 
                  className='form-control' 
                  placeholder='Search for a company (e.g., Apple, Microsoft, Google)'
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)} 
                  required
                />
                <button 
                  type='submit' 
                  className='btn btn-info'
                  disabled={searching}
                >
                  {searching ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    <FontAwesomeIcon icon={faSearch} />
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded">
              <div>
                <h5 className="mb-1">{selectedCompany.name}</h5>
                <small className="text-muted">Ticker: {selectedCompany.ticker} | {selectedCompany.description}</small>
              </div>
              <button className='btn btn-outline-secondary btn-sm' onClick={resetSearch}>
                Search Another
              </button>
            </div>
          )}
          
          {error && <div className='text-danger mt-2'>{error}</div>}
        </div>
      </div>

      {searchResults.length > 0 && !selectedCompany && (
        <div className="row mt-4">
          <div className='col-md-8 mx-auto'>
            <h5 className="mb-3"><FontAwesomeIcon icon={faBuilding} className="me-2" />Search Results</h5>
            <div className="list-group">
              {searchResults.map((company, index) => (
                <button
                  key={index}
                  type="button"
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  onClick={() => handleSelectCompany(company)}
                >
                  <div>
                    <div className="fw-bold">{company.name}</div>
                    <small className="text-muted">{company.description}</small>
                  </div>
                  <span className="badge bg-primary rounded-pill">{company.ticker}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="row mt-4">
          <div className='col-md-8 mx-auto text-center'>
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading prediction...</p>
          </div>
        </div>
      )}

        {/* print prediction plots*/}
        {prediction && !loading && (
          <div className='prediction mt-5'>
          <div className="p-3">
            {plot && (
              <img src ={plot} style={{maxWidth: '100%'}} />
            )}
          </div>
          <div className ='p-3'>
            {ma100 && (
                <img src ={ma100} style={{maxWidth: '100%'}} />

            )}

          </div>

          <div className ='p-3'>
            {ma200 && (
                <img src ={ma200} style={{maxWidth: '100%'}} />

            )}
          </div>

          <div className ='p-3'>
            {prediction && (
                <img src ={prediction} style={{maxWidth: '100%'}} />

            )}
          </div>
          <div className="text-light p-3">
            <h4>Model Evaluation</h4>
            <p>Mean Squared Error (MSE): {mse}</p>
            <p>Root Mean Squared Error (RMSE): {rmse}</p>
            <p>R-Squared :{r2}</p>

          </div>

        </div>

        )}
        
    </div>
  )
}

export default Dashboard
