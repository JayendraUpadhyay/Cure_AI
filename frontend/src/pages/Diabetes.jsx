import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000';

const FIELDS = [
  { key:'Pregnancies',             label:'Pregnancies',               unit:'count',   min:0,    max:20,  step:1,   def:1,    col:1 },
  { key:'Glucose',                 label:'Glucose Level',             unit:'mg/dL',   min:70,   max:200, step:1,   def:100,  col:1 },
  { key:'BloodPressure',           label:'Blood Pressure',            unit:'mmHg',    min:60,   max:120, step:1,   def:80,   col:1 },
  { key:'SkinThickness',           label:'Skin Thickness',            unit:'mm',      min:0,    max:100, step:1,   def:20,   col:1 },
  { key:'Insulin',                 label:'Insulin Level',             unit:'μU/mL',   min:0,    max:900, step:1,   def:80,   col:2 },
  { key:'BMI',                     label:'BMI',                       unit:'kg/m²',   min:15,   max:60,  step:0.1, def:25,   col:2 },
  { key:'DiabetesPedigreeFunction',label:'Diabetes Pedigree Function',unit:'score',   min:0.05, max:2.5, step:0.01,def:0.5,  col:2 },
  { key:'Age',                     label:'Patient Age',               unit:'years',   min:18,   max:100, step:1,   def:30,   col:2 },
];

const REFS = [
  ['Fasting Glucose (Normal)', '70–100 mg/dL'],
  ['Blood Pressure (Normal)',  '< 120 mmHg'],
  ['BMI (Healthy Range)',      '18.5–24.9 kg/m²'],
  ['Insulin (Fasting)',        '16–166 μU/mL'],
];

export default function Diabetes() {
  const init = Object.fromEntries(FIELDS.map(f => [f.key, f.def]));
  const [vals,    setVals]    = useState(init);
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);

  const set = (k, v) => setVals(p => ({ ...p, [k]: parseFloat(v) }));

  const analyze = async () => {
    setLoading(true); setResult(null);
    try {
      const { data } = await axios.post(`${API}/predict/diabetes`, vals);
      setResult(data);
    } catch { alert('Error contacting API.'); }
    finally { setLoading(false); }
  };

  const isSafe = result?.is_safe;
  const cls = isSafe ? 'safe' : 'risk';

  const renderSlider = (f) => (
    <div className="input-group" key={f.key}>
      <div className="input-top">
        <span className="input-label-text">{f.label}</span>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <span className="input-value-display">{vals[f.key]}</span>
          <span className="input-unit-badge">{f.unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={f.min} max={f.max} step={f.step}
        value={vals[f.key]}
        onChange={e => set(f.key, e.target.value)}
        style={{ background: `linear-gradient(to right, var(--cyan) 0%, var(--cyan) ${((vals[f.key]-f.min)/(f.max-f.min))*100}%, var(--surface-3) ${((vals[f.key]-f.min)/(f.max-f.min))*100}%, var(--surface-3) 100%)` }}
      />
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">🩸 Endocrinology Module</div>
        <h1 className="page-title">Diabetes <span className="highlight">Risk Assessment</span></h1>
        <p className="page-subtitle">Enter patient clinical parameters to evaluate diabetes risk using a trained ensemble ML model.</p>
      </div>

      <div className="stats-row">
        {[['🎯','Accuracy ~89%'],['🧪','8 Parameters'],['⚡','Instant Result'],['📊','Probability Score']].map(([ic,lb])=>(
          <div key={lb} className="stat-chip"><span className="stat-chip-icon">{ic}</span>{lb}</div>
        ))}
      </div>

      <div className="grid-split">
        {/* Inputs */}
        <div>
          <div className="glass-card">
            <div className="card-label">Patient Clinical Parameters</div>
            <div className="grid-2">
              <div>{FIELDS.filter(f => f.col===1).map(renderSlider)}</div>
              <div>{FIELDS.filter(f => f.col===2).map(renderSlider)}</div>
            </div>
            <button className="btn-analyze" onClick={analyze} disabled={loading}>
              {loading ? '⏳  Analyzing...' : '🚀  Run Diabetes Assessment'}
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="glass-card">
          <div className="card-label">Risk Assessment Report</div>

          {/* Reference values */}
          <div style={{ marginBottom:4 }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'1.2px', color:'var(--text-muted)', marginBottom:10 }}>
              Normal Reference Ranges
            </div>
            <div className="ref-table">
              {REFS.map(([l,v]) => (
                <div key={l} className="ref-row">
                  <span className="ref-label">{l}</span>
                  <span className="ref-val">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {loading && (
            <div className="loading-overlay">
              <div className="loading-ring" />
              <p className="loading-text">Processing patient data...</p>
            </div>
          )}

          {!loading && !result && (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <p className="empty-title">Results will appear here</p>
              <p className="empty-sub">Set patient parameters and<br />click Run Assessment.</p>
            </div>
          )}

          {!loading && result && (
            <>
              <div className={`result-card ${cls}`}>
                <div className="result-top">
                  <div className="result-icon-box">{isSafe ? '✅' : '⚠️'}</div>
                  <div>
                    <p className="result-eyebrow">Diabetes {result.result}</p>
                    <p className="result-diagnosis">{result.result}</p>
                    <p className="result-confidence">Risk Probability: {(result.probability*100).toFixed(1)}%</p>
                  </div>
                </div>
                <div className="conf-labels"><span>Confidence</span><span>{((isSafe?1-result.probability:result.probability)*100).toFixed(1)}%</span></div>
                <div className="conf-track">
                  <div className={`conf-fill ${cls}`} style={{ width:`${(isSafe?1-result.probability:result.probability)*100}%` }} />
                </div>
              </div>
              <div className="advice-card">
                🩺 <strong>Recommendation:</strong>{' '}
                {isSafe
                  ? 'Patient shows no significant diabetes indicators. Maintain a healthy lifestyle, balanced diet, and regular monitoring.'
                  : 'Patient exhibits elevated diabetes risk. Recommend HbA1c testing, dietary consultation, and endocrinologist review.'
                }
              </div>
              <div className="disclaimer">⚠️ AI-generated result only. Consult a certified endocrinologist for clinical diagnosis.</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
