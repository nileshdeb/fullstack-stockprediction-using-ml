import json
import os
import logging

logger = logging.getLogger(__name__)


class CompanyLookupService:
    """
    Service for looking up company information by name or ticker.
    
    Loads company data from JSON file once at initialization and builds
    an in-memory lookup dictionary for O(1) lookups.
    """
    
    _lookup_dict = None
    _companies_list = None
    
    @classmethod
    def _load_data(cls):
        """Load JSON data and build lookup dictionary (runs once)."""
        if cls._lookup_dict is not None:
            return
        
        json_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            'data',
            'companies.json'
        )
        
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            cls._companies_list = data.get('companies', [])
            cls._lookup_dict = {}
            
            seen_aliases = set()
            for company in cls._companies_list:
                ticker = company.get('ticker', '')
                name = company.get('name', '')
                sector = company.get('sector', 'N/A')
                
                for alias in company.get('aliases', []):
                    alias_lower = alias.lower().strip()
                    
                    if alias_lower in seen_aliases:
                        logger.warning(f"Duplicate alias found: '{alias_lower}' for ticker '{ticker}'")
                        continue
                    
                    seen_aliases.add(alias_lower)
                    cls._lookup_dict[alias_lower] = {
                        'ticker': ticker,
                        'name': name,
                        'sector': sector,
                        'matched_alias': alias_lower
                    }
            
            logger.info(f"CompanyLookupService loaded {len(cls._companies_list)} companies with {len(cls._lookup_dict)} aliases")
            
        except FileNotFoundError:
            logger.error(f"companies.json not found at {json_path}")
            cls._lookup_dict = {}
            cls._companies_list = []
        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON in companies.json: {e}")
            cls._lookup_dict = {}
            cls._companies_list = []
    
    @classmethod
    def lookup(cls, query):
        """
        Look up a company by name, alias, or ticker.
        
        Args:
            query (str): Company name, alias, or ticker symbol
            
        Returns:
            dict or None: Company info with ticker, name, sector, and matched_alias
        """
        cls._load_data()
        
        if not query:
            return None
        
        query_lower = query.lower().strip()
        
        result = cls._lookup_dict.get(query_lower)
        
        if result:
            return result
        
        for company in cls._companies_list:
            if company.get('ticker', '').upper() == query.upper():
                return {
                    'ticker': company['ticker'],
                    'name': company['name'],
                    'sector': company.get('sector', 'N/A'),
                    'matched_alias': query
                }
        
        return None
    
    @classmethod
    def search(cls, query, limit=10):
        """
        Search for companies matching a query string.
        
        Args:
            query (str): Partial company name or ticker
            limit (int): Maximum number of results to return
            
        Returns:
            list: List of matching company info dicts
        """
        cls._load_data()
        
        if not query:
            return []
        
        query_lower = query.lower().strip()
        results = []
        seen_tickers = set()
        
        for alias, company_info in cls._lookup_dict.items():
            if query_lower in alias and company_info['ticker'] not in seen_tickers:
                seen_tickers.add(company_info['ticker'])
                results.append(company_info)
                
                if len(results) >= limit:
                    break
        
        return results
    
    @classmethod
    def get_all_companies(cls):
        """Return the full list of companies."""
        cls._load_data()
        return cls._companies_list
