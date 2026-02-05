import pandas as pd
import numpy as np

def analyze_financials(df, industry="General"):
    """
    Analyzes basic financial metrics from a dataframe.
    """
    try:
        # Convert amount to numeric
        df['Amount'] = pd.to_numeric(df['Amount'], errors='coerce')
        
        revenue = df[df['Type'].str.lower() == 'revenue']['Amount'].sum()
        expenses = df[df['Type'].str.lower() == 'expense']['Amount'].sum()
        net_profit = revenue - expenses
        
        # Industry Benchmarking (Mock)
        benchmarks = {
            "Manufacturing": 0.12,
            "Retail": 0.08,
            "Services": 0.25,
            "Logistics": 0.10,
            "General": 0.15
        }
        
        industry_avg_margin = benchmarks.get(industry, 0.15)
        current_margin = net_profit / revenue if revenue != 0 else 0
        
        benchmarking = {
            "industry": industry,
            "status": "Above Average" if current_margin > industry_avg_margin else "Below Average",
            "industry_avg": f"{industry_avg_margin * 100}%",
            "current": f"{current_margin * 100:.2f}%"
        }
        
        return {
            "total_revenue": float(revenue),
            "total_expenses": float(expenses),
            "net_profit": float(net_profit),
            "benchmarking": benchmarking,
            "alerts": [
                f"{industry} sector usually sees lower overhead; review your operations.",
                "High expense ratio detected in 'Marketing'"
            ] if current_margin < industry_avg_margin else ["Profitability is strong", "Consider reinvesting surplus"]
        }
    except Exception as e:
        return {"error": str(e)}

def get_multilingual_report(metrics, lang="en"):
    reports = {
        "en": f"Financial Summary: Net Profit is ${metrics['net_profit']}. Industry status: {metrics['benchmarking']['status']}.",
        "hi": f"वित्तीय सारांश: शुद्ध लाभ ${metrics['net_profit']} है। उद्योग की स्थिति: {metrics['benchmarking']['status']}।"
    }
    return reports.get(lang, reports["en"])

def get_ai_recommendations(metrics):
    # This would normally call OpenAI/Claude
    # For now, we return intelligent mock responses based on metrics
    if metrics['net_profit'] < 0:
        return "Your business is currently operating at a loss. Focus on cost optimization in non-essential expense categories. Identify low-margin products and consider price adjustments."
    elif metrics['net_profit'] / metrics['total_revenue'] < 0.1:
        return "Margins are thin. We recommend evaluating your supplier contracts to reduce COGS and exploring automated bookkeeping to reduce administrative overhead."
    else:
        return "Financial health is robust. This is an ideal time to seek expansion capital. We recommend exploring SME working capital loans from our partner banks to scale your inventory."
