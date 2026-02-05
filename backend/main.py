from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Financial Health Assessment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Financial Health Assessment API"}

from processing import analyze_financials, get_ai_recommendations, get_multilingual_report
from fastapi.responses import FileResponse

# ... earlier middlewear remains ...

from fastapi import Form

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    industry: str = Form("General"),
    lang: str = Form("en")
):
    if not file.filename.endswith(('.csv', '.xlsx')):
        raise HTTPException(status_code=400, detail="Invalid file format")
    
    contents = await file.read()
    if file.filename.endswith('.csv'):
        df = pd.read_csv(io.BytesIO(contents))
    else:
        df = pd.read_excel(io.BytesIO(contents))
    
    metrics = analyze_financials(df, industry=industry)
    if "error" in metrics:
        raise HTTPException(status_code=400, detail=metrics["error"])
        
    recommendation = get_ai_recommendations(metrics)
    summary_report = get_multilingual_report(metrics, lang=lang)
    
    return {
        "filename": file.filename,
        "metrics": metrics,
        "recommendation": recommendation,
        "multilingual_summary": summary_report
    }

@app.get("/sample-csv")
def get_sample():
    return FileResponse("sample_data.csv", filename="sample_financials.csv")

@app.get("/bank-integration")
def get_bank_data(bank_name: str):
    # Stub for banking API integration (e.g., Plaid or Razorpay)
    return {"status": "success", "message": f"Connected to {bank_name} successfully", "data": {"balance": 50000, "currency": "INR"}}

@app.get("/gst-data")
def get_gst_data(gstin: str):
    # Stub for GST data import
    return {"status": "success", "message": "GST data imported for FY 2025-26", "tax_paid": 5000}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
