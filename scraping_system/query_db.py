#!/usr/bin/env python3
"""
Database query utility for NotionFlow SQLite database.
Provides simple commands to view deals, firms, and statistics.
"""

import sys
import os

# Add current directory to path for imports
sys.path.insert(0, os.path.dirname(__file__))

from database import Database


def print_deals(deals, limit=None):
    """Print deals in a formatted way."""
    if not deals:
        print("No deals found.")
        return
    
    displayed = deals[:limit] if limit else deals
    
    for i, deal in enumerate(displayed, 1):
        print(f"\n{i}. {deal['title']}")
        print(f"   Source: {deal['source_name']}")
        print(f"   Date: {deal['date_scraped']}")
        if deal['equity_partner']:
            print(f"   Equity Partner: {deal['equity_partner']}")
        if deal['developer']:
            print(f"   Developer: {deal['developer']}")
        if deal['market']:
            print(f"   Market: {deal['market']}")
        if deal['structure']:
            print(f"   Structure: {deal['structure']}")
        if deal['confidence']:
            print(f"   Confidence: {deal['confidence']:.2f}")
        if deal['summary']:
            print(f"   Summary: {deal['summary'][:100]}...")
    
    if limit and len(deals) > limit:
        print(f"\n... and {len(deals) - limit} more")


def print_firms(firms):
    """Print firms in a formatted way."""
    if not firms:
        print("No firms found.")
        return
    
    for i, firm in enumerate(firms, 1):
        print(f"{i}. {firm['firm_name']} ({firm['firm_type']})")
        if firm['website']:
            print(f"   Website: {firm['website']}")


def main():
    """Main function to handle command-line queries."""
    if len(sys.argv) < 2:
        print("Usage: python query_db.py <command> [args]")
        print("\nCommands:")
        print("  stats                    - Show database statistics")
        print("  deals [limit]            - List all deals (optional limit)")
        print("  firms                    - List all firms")
        print("  source <source_name>     - List deals from specific source")
        print("  recent [limit]           - List most recent deals (default: 10)")
        print("  search <keyword>         - Search for deals containing keyword")
        sys.exit(1)
    
    command = sys.argv[1].lower()
    db = Database()
    
    try:
        if command == "stats":
            stats = db.get_stats()
            print("Database Statistics:")
            print(f"  Total Deals: {stats['total_deals']}")
            print(f"  Total Firms: {stats['total_firms']}")
            print("\n  Deals by Source:")
            for source, count in sorted(stats['deals_by_source'].items(), key=lambda x: x[1], reverse=True):
                print(f"    {source}: {count}")
        
        elif command == "deals":
            limit = int(sys.argv[2]) if len(sys.argv) > 2 else None
            deals = db.get_all_deals(limit=limit)
            print(f"Found {len(deals)} deals:")
            print_deals(deals, limit=20)
        
        elif command == "firms":
            firms = db.get_all_firms()
            print(f"Found {len(firms)} firms:")
            print_firms(firms)
        
        elif command == "source":
            if len(sys.argv) < 3:
                print("Error: Please specify source name")
                sys.exit(1)
            source_name = sys.argv[2]
            deals = db.get_deals_by_source(source_name)
            print(f"Found {len(deals)} deals from {source_name}:")
            print_deals(deals, limit=20)
        
        elif command == "recent":
            limit = int(sys.argv[2]) if len(sys.argv) > 2 else 10
            deals = db.get_all_deals(limit=limit)
            print(f"Most recent {limit} deals:")
            print_deals(deals)
        
        elif command == "search":
            if len(sys.argv) < 3:
                print("Error: Please specify search keyword")
                sys.exit(1)
            keyword = sys.argv[2]
            
            # Use SQL LIKE queries for better performance with large datasets
            cursor = db.conn.cursor()
            search_pattern = f"%{keyword}%"
            cursor.execute(
                """
                SELECT * FROM deals 
                WHERE title LIKE ? 
                   OR summary LIKE ? 
                   OR equity_partner LIKE ? 
                   OR developer LIKE ?
                ORDER BY date_scraped DESC
                """,
                (search_pattern, search_pattern, search_pattern, search_pattern)
            )
            rows = cursor.fetchall()
            matching_deals = [dict(row) for row in rows]
            
            print(f"Found {len(matching_deals)} deals matching '{keyword}':")
            print_deals(matching_deals, limit=20)
        
        else:
            print(f"Unknown command: {command}")
            sys.exit(1)
    
    finally:
        db.close()


if __name__ == "__main__":
    main()
