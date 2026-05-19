import React, { useState, useCallback } from 'react';
import axios from 'axios';

const API = 'https://jayendraupadhyay-cure-ai-backend.hf.space';

const CLASSES = ['Glioma', 'Meningioma', 'No Tumor', 'Pituitary'];

export default function BrainTumor() {
  const [file,       setFile]       = useState(null);
  const [preview,    setPreview]    = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [result,     setResult]     = useState(null);
  const [dragOver,   setDragOver]   = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    setPreview(URL.createObjectURL(f));
  };

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  }, []);

  const onInputChange = (e) => handleFile(e.target.files[0]);

  const analyze = async () => {
    if (!file) return;
    setLoading(true); setResult(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const { data } = await axios.post(`${API}/predict/brain`, fd);
      setResult(data);
    } catch (err) {
      alert('Error contacting API. Make sure backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const isSafe = result?.is_safe;
  const cls    = isSafe ? 'safe' : 'risk';

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="page-eyebrow">🧠 Neuro-Oncology Module</div>
        <h1 className="page-title">
          Brain Tumor <span className="highlight">Detection</span>
        </h1>
        <p className="page-subtitle">
          Upload an MRI scan for AI-powered tumor detection and multi-class classification using a deep learning ONNX model.
        </p>
      </div>

      <div className="stats-row">
        {[['🎯','Accuracy ~96%'],['⚡','~1s Inference'],['🔬','4 Tumor Classes'],['🖼️','JPG · PNG · JPEG']].map(([ic,lb]) => (
          <div key={lb} className="stat-chip"><span className="stat-chip-icon">{ic}</span>{lb}</div>
        ))}
      </div>

      <div className="grid-split">
        {/* Upload Column */}
        <div className="glass-card">
          <div className="card-label">MRI Scan Upload</div>

          {/* Drop Zone */}
          <label>
            <div
              className={`drop-zone ${dragOver ? 'active' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              style={{ cursor: 'pointer' }}
            >
              <span className="drop-icon">🖼️</span>
              <p className="drop-title">Drop your MRI scan here</p>
              <p className="drop-sub">or click to browse files from your computer</p>
              <div className="drop-formats">
                {['JPG','PNG','JPEG'].map(f => <span key={f} className="fmt-tag">{f}</span>)}
              </div>
            </div>
            <input type="file" accept="image/*" onChange={onInputChange} style={{ display:'none' }} />
          </label>

          {/* Preview */}
          {preview && (
            <div className="img-preview">
              <div className="img-badge">📷 MRI SCAN</div>
              <img src={preview} alt="MRI preview" />
            </div>
          )}

          {/* File Info */}
          {file && (
            <div className="stats-row" style={{ marginTop:14, marginBottom:0 }}>
              <div className="stat-chip"><span>📁</span>{file.name}</div>
              <div className="stat-chip"><span>✅</span>Ready to Analyze</div>
            </div>
          )}

          {/* Button */}
          <button
            className="btn-analyze"
            style={{ marginTop: preview ? 16 : 20 }}
            onClick={analyze}
            disabled={!file || loading}
          >
            {loading ? '⏳  Analyzing...' : '🔍  Analyze MRI Scan'}
          </button>
        </div>

        {/* Result Column */}
        <div className="glass-card">
          <div className="card-label">AI Diagnosis Report</div>

          {loading && (
            <div className="loading-overlay">
              <div className="loading-ring" />
              <p className="loading-text">Running deep learning inference...</p>
            </div>
          )}

          {!loading && !result && (
            <div className="empty-state">
              <div className="empty-icon">🔬</div>
              <p className="empty-title">Awaiting MRI Scan</p>
              <p className="empty-sub">Upload an MRI image and click<br />Analyze to see the AI diagnosis.</p>
            </div>
          )}

          {!loading && result && (
            <>
              {/* Main Result */}
              <div className={`result-card ${cls}`}>
                <div className="result-top">
                  <div className="result-icon-box">{isSafe ? '✅' : '⚠️'}</div>
                  <div>
                    <p className="result-eyebrow">{isSafe ? 'Clear Scan' : 'Tumor Detected'}</p>
                    <p className="result-diagnosis">{result.result}</p>
                    <p className="result-confidence">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
                  </div>
                </div>
                <div>
                  <div className="conf-labels">
                    <span>Confidence Score</span>
                    <span>{(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="conf-track">
                    <div className={`conf-fill ${cls}`} style={{ width: `${result.confidence * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Probability Breakdown */}
              <div className="prob-section">
                <div className="prob-title">Class Probabilities</div>
                {CLASSES.map(c => {
                  const pval = (result.probabilities[c] * 100).toFixed(1);
                  const isActive = c === result.result;
                  return (
                    <div key={c} className="prob-row">
                      <div className="prob-top">
                        <span className="prob-name">{c}</span>
                        <span className="prob-val">{pval}%</span>
                      </div>
                      <div className="conf-track">
                        <div
                          className={`conf-fill ${c === 'No Tumor' ? 'safe' : 'risk'}`}
                          style={{ width:`${pval}%`, opacity: isActive ? 1 : 0.35 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="divider" />

              <div className="advice-card">
                🩺 <strong>Medical Note:</strong>{' '}
                {isSafe
                  ? 'The MRI scan shows no signs of tumor. Results appear normal. Regular annual check-ups are recommended.'
                  : `The scan indicates a ${result.result} tumor. Immediate consultation with a neurologist or oncologist is strongly advised.`
                }
              </div>
              <div className="disclaimer">
                ⚠️ AI-generated result for informational purposes only. Always consult a qualified medical professional for diagnosis and treatment.
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
