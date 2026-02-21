import json
import os
from dotenv import load_dotenv

# Handle imports whether run as script or module
try:
    from .database import Database
except ImportError:
    from database import Database

load_dotenv()


def push_deals_to_database(input_file="extracted_deals.json"):
    """Push extracted deals to SQLite database.
    
    Args:
        input_file: Path to JSON file containing extracted deals
    """
    if not os.path.exists(input_file):
        print("No deals to push.")
        return

    with open(input_file, "r") as f:
        deals = json.load(f)

    # Initialize database
    db = Database()
    
    inserted_count = 0
    duplicate_count = 0
    
    for deal in deals:
        # The insert_deal method handles idempotency internally
        if db.insert_deal(deal):
            inserted_count += 1
        else:
            duplicate_count += 1

    db.close()
    
    print(f"\nSummary:")
    print(f"  Inserted: {inserted_count}")
    print(f"  Duplicates skipped: {duplicate_count}")
    print(f"  Total processed: {len(deals)}")
    
    # Show stats
    db = Database()
    stats = db.get_stats()
    print(f"\nDatabase stats:")
    print(f"  Total deals: {stats['total_deals']}")
    print(f"  Total firms: {stats['total_firms']}")
    print(f"  Deals by source: {stats['deals_by_source']}")
    db.close()


if __name__ == "__main__":
    push_deals_to_database()
