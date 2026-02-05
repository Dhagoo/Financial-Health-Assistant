import pandas as pd
from processing import analyze_financials

def test_analysis():
    data = {
        'Category': ['Sales', 'Rent'],
        'Amount': [10000, 2000],
        'Date': ['2026-01-01', '2026-01-02'],
        'Type': ['Revenue', 'Expense']
    }
    df = pd.DataFrame(data)
    result = analyze_financials(df, industry="Services")
    print("Test Result:", result)
    assert result['total_revenue'] == 10000
    assert result['total_expenses'] == 2000
    assert result['net_profit'] == 8000

if __name__ == "__main__":
    test_analysis()
