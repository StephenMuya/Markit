import sqlite3
import os
from datetime import datetime
from typing import Optional, List, Dict, Any
import hashlib


class Database:
    """SQLite database manager for NotionFlow scraping system."""
    
    def __init__(self, db_path: str = None):
        """Initialize database connection.
        
        Args:
            db_path: Path to SQLite database file. Defaults to SQLITE_DB_PATH env var
                     or './data/notionflow.db'
        """
        if db_path is None:
            db_path = os.getenv("SQLITE_DB_PATH", "./data/notionflow.db")
        
        self.db_path = db_path
        
        # Ensure data directory exists (if path includes a directory)
        db_dir = os.path.dirname(db_path)
        if db_dir:
            os.makedirs(db_dir, exist_ok=True)
        
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row  # Enable column access by name
        self._initialize_schema()
    
    def _initialize_schema(self):
        """Create database tables if they don't exist."""
        cursor = self.conn.cursor()
        
        # Create firms table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS firms (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firm_name TEXT NOT NULL UNIQUE,
                firm_type TEXT NOT NULL,
                website TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create deals table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS deals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                article_id TEXT NOT NULL UNIQUE,
                source_name TEXT NOT NULL,
                source_url TEXT NOT NULL,
                title TEXT,
                date_scraped TIMESTAMP NOT NULL,
                equity_partner TEXT,
                equity_partner_id INTEGER,
                developer TEXT,
                developer_id INTEGER,
                structure TEXT,
                market TEXT,
                summary TEXT,
                confidence REAL,
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (equity_partner_id) REFERENCES firms (id),
                FOREIGN KEY (developer_id) REFERENCES firms (id)
            )
        """)
        
        # Create indexes for performance
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_deals_article_id 
            ON deals(article_id)
        """)
        
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_deals_source_name 
            ON deals(source_name)
        """)
        
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_deals_date_scraped 
            ON deals(date_scraped)
        """)
        
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_firms_name 
            ON firms(firm_name)
        """)
        
        self.conn.commit()
    
    def get_or_create_firm(self, firm_name: str, firm_type: str, website: str = None) -> Optional[int]:
        """Get existing firm ID or create new firm.
        
        Args:
            firm_name: Name of the firm
            firm_type: Type of firm (e.g., "Equity Partner", "Developer")
            website: Optional website URL
            
        Returns:
            Firm ID or None if firm_name is empty
        """
        if not firm_name or firm_name.strip() == "":
            return None
        
        firm_name = firm_name.strip()
        cursor = self.conn.cursor()
        
        # Check if firm exists
        cursor.execute(
            "SELECT id FROM firms WHERE firm_name = ?",
            (firm_name,)
        )
        result = cursor.fetchone()
        
        if result:
            return result[0]
        
        # Create new firm
        cursor.execute(
            """
            INSERT INTO firms (firm_name, firm_type, website)
            VALUES (?, ?, ?)
            """,
            (firm_name, firm_type, website)
        )
        self.conn.commit()
        return cursor.lastrowid
    
    def deal_exists(self, article_id: str) -> bool:
        """Check if a deal with given article_id already exists.
        
        Args:
            article_id: Unique identifier for the article
            
        Returns:
            True if deal exists, False otherwise
        """
        cursor = self.conn.cursor()
        cursor.execute(
            "SELECT 1 FROM deals WHERE article_id = ? LIMIT 1",
            (article_id,)
        )
        return cursor.fetchone() is not None
    
    def insert_deal(self, deal: Dict[str, Any]) -> bool:
        """Insert a new deal into the database.
        
        Args:
            deal: Dictionary containing deal information
            
        Returns:
            True if inserted, False if duplicate (idempotency)
        """
        article_id = deal.get("article_id")
        if not article_id:
            print("Warning: Deal missing article_id, skipping")
            return False
        
        # Check for duplicate
        if self.deal_exists(article_id):
            print(f"Skipping duplicate deal: {article_id}")
            return False
        
        # Get or create firm IDs
        equity_partner_id = None
        if deal.get("equity_partner"):
            equity_partner_id = self.get_or_create_firm(
                deal["equity_partner"], 
                "Equity Partner"
            )
        
        developer_id = None
        if deal.get("developer"):
            developer_id = self.get_or_create_firm(
                deal["developer"], 
                "Developer"
            )
        
        cursor = self.conn.cursor()
        cursor.execute(
            """
            INSERT INTO deals (
                article_id, source_name, source_url, title, date_scraped,
                equity_partner, equity_partner_id, developer, developer_id,
                structure, market, summary, confidence, content
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                article_id,
                deal.get("source_name", "Unknown"),
                deal.get("source_url", ""),
                deal.get("title", ""),
                deal.get("date_scraped", datetime.now().isoformat()),
                deal.get("equity_partner"),
                equity_partner_id,
                deal.get("developer"),
                developer_id,
                deal.get("structure"),
                deal.get("market"),
                deal.get("summary"),
                deal.get("confidence", 0.0),
                deal.get("content", "")
            )
        )
        self.conn.commit()
        print(f"Inserted deal: {deal.get('summary', 'No summary')[:50]}...")
        return True
    
    def get_all_deals(self, limit: int = None) -> List[Dict[str, Any]]:
        """Retrieve all deals from database.
        
        Args:
            limit: Optional limit on number of deals to return
            
        Returns:
            List of deal dictionaries
        """
        cursor = self.conn.cursor()
        query = "SELECT * FROM deals ORDER BY date_scraped DESC"
        
        if limit:
            query += " LIMIT ?"
            cursor.execute(query, (limit,))
        else:
            cursor.execute(query)
        
        rows = cursor.fetchall()
        
        return [dict(row) for row in rows]
    
    def get_deals_by_source(self, source_name: str) -> List[Dict[str, Any]]:
        """Get all deals from a specific source.
        
        Args:
            source_name: Name of the source
            
        Returns:
            List of deal dictionaries
        """
        cursor = self.conn.cursor()
        cursor.execute(
            "SELECT * FROM deals WHERE source_name = ? ORDER BY date_scraped DESC",
            (source_name,)
        )
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    
    def get_all_firms(self) -> List[Dict[str, Any]]:
        """Retrieve all firms from database.
        
        Returns:
            List of firm dictionaries
        """
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM firms ORDER BY firm_name")
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    
    def get_stats(self) -> Dict[str, Any]:
        """Get database statistics.
        
        Returns:
            Dictionary with counts and other stats
        """
        cursor = self.conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM deals")
        total_deals = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM firms")
        total_firms = cursor.fetchone()[0]
        
        cursor.execute("""
            SELECT source_name, COUNT(*) as count 
            FROM deals 
            GROUP BY source_name
        """)
        deals_by_source = {row[0]: row[1] for row in cursor.fetchall()}
        
        return {
            "total_deals": total_deals,
            "total_firms": total_firms,
            "deals_by_source": deals_by_source
        }
    
    def close(self):
        """Close database connection."""
        if self.conn:
            self.conn.close()
    
    def __enter__(self):
        """Context manager entry."""
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit."""
        self.close()


def generate_article_id(url: str, date_scraped: str) -> str:
    """Generate a unique article ID from URL and date.
    
    Args:
        url: Article URL
        date_scraped: Date the article was scraped
        
    Returns:
        MD5 hash of url-date combination
    """
    raw_string = f"{url}-{date_scraped}"
    return hashlib.md5(raw_string.encode()).hexdigest()


if __name__ == "__main__":
    # Test database creation
    print("Testing database creation...")
    db = Database("./data/notionflow.db")
    stats = db.get_stats()
    print(f"Database initialized: {stats}")
    db.close()
    print("Database test complete!")
