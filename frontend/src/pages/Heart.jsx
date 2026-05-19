import React, { useState } from 'react';
import axios from 'axios';

const API = 'https://jayendraupadhyay-cure-ai-backend.hf.space';

const SLIDERS = [
  { key:'age',      label:'Age',                     unit:'years', min:20,  max:100, step:1,   def:45  },
  { key:'trestbps', label:'Resting Blood Pressure',  unit:'mmHg',  min:80,  max:200, step:1,   def:120 },
  { key:'chol',     label:'Serum Cholesterol',        unit:'mg/dL', min:100, max:400, step:1,   def:200 },
  { key:'thalach',  label:'Max Heart Rate Achieved',  unit:'bpm',   min:70,  max:210, step:1,   def:150 },
  { key:'oldpeak',  label:'ST Depression (Oldpeak)',  unit:'mm',    min:0,   max:5,   step:0.1, def:1.0 },
  { key:'slope',    label:'Slope of ST Segment',      unit:'0–2',   min:0,   max:2,   step:1,   def:1   },
  { key:'ca',       label:'Major Vessels Colored',    unit:'0–3',   min:0,   max:3,   step:1,   def:0   },
  { key:'thal',     label:'Thalassemia Type',         unit:'0–3',   min:0,   max:3,   step:1,   def:1   },
];

const CP_OPTS   = [[0,'Typical Angina'],[1,'Atypical Angina'],[2,'Non-Anginal Pain'],[3,'Asymptomatic']];
const ECG_OPTS  = [[0,'Normal'],[1,'ST-T Wave Abnormality'],[2,'LV Hypertrophy']];

const REFS = [
  ['Normal BP',      '< 120 mmHg'],
  ['Cholesterol',    '< 200 mg/dL'],
  ['Resting HR',     '60–100 bpm'],
  ['ST Depression',  '0–1 mm (normal)'],
];

export default function Heart() {
  const init = {
    ...Object.fromEntries(SLIDERS.map(s => [s.key, s.def])),
    sex:1, cp:0, fbs:0, restecg:0, exang:0,
  };
  const [vals,    setVals]    = useState(init);
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);

  const set    = (k, v) => setVals(p => ({ ...p, [k]: parseFloat(v) }));
  const setInt = (k, v) => setVals(p => ({ ...p, [k]: parseInt(v)   }));

  const analyze = async () => {
    setLoading(true); setResult(null);
    try {
      const { data } = await axios.post(`${API}/predict/heart`, vals);
      setResult(data);
    } catch { alert('Error contacting API.'); }
    finally { setLoading(false); }
  };

  const isSafe = result?.is_safe;
  const cls    = isSafe ? 'safe' : 'risk';

  const renderSlider = (s) => (
    <div className="input-group" key={s.key}>
      <div className="input-top">
        <span className="input-label-text">{s.label}</span>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <span className="input-value-display">{vals[s.key]}</span>
          <span className="input-unit-badge">{s.unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={s.min} max={s.max} step={s.step}
        value={vals[s.key]}
        onChange={e => set(s.key, e.target.value)}
        style={{ background:`linear-gradient(to right,var(--cyan) 0%,var(--cyan) ${((vals[s.key]-s.min)/(s.max-s.min))*100}%,var(--surface-3) ${((vals[s.key]-s.min)/(s.max-s.min))*100}%,var(--surface-3) 100%)` }}
      />
    </div>
  );

  const renderSelect = (key, label, opts) => (
    <div className="input-group" key={key}>
      <div className="input-top" style={{ marginBottom:8 }}>
        <span className="input-label-text">{label}</span>
      </div>
      <select value={vals[key]} onChange={e => setInt(key, e.target.value)}>
        {opts.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">❤️ Cardiology Module</div>
        <h1 className="page-title">Heart Disease <span className="highlight">Prediction</span></h1>
        <p className="page-subtitle">Input cardiovascular indicators for AI-based heart disease risk stratification and early detection.</p>
      </div>

      <div className="stats-row">
        {[['🎯','Accuracy ~91%'],['🫀','13 Parameters'],['⚡','Instant Result'],['📈','Risk Stratification']].map(([ic,lb])=>(
          <div key={lb} className="stat-chip"><span className="stat-chip-icon">{ic}</span>{lb}</div>
        ))}
      </div>

      <div className="grid-split-3">
        {/* Demographics + Vitals */}
        <div className="glass-card">
          <div className="card-label">Demographics &amp; Vitals</div>

          {renderSlider(SLIDERS[0])}
          {renderSelect('sex',    'Biological Sex',           [[0,'♀ Female'],[1,'♂ Male']])}
          {renderSlider(SLIDERS[1])}
          {renderSlider(SLIDERS[2])}
          {renderSelect('fbs',    'Fasting Blood Sugar >120', [[0,'No'],[1,'Yes']])}
          {renderSlider(SLIDERS[3])}
        </div>

        {/* ECG + Stress */}
        <div className="glass-card">
          <div className="card-label">ECG &amp; Stress Test Data</div>

          {renderSelect('cp',      'Chest Pain Type',       CP_OPTS)}
          {renderSelect('restecg', 'Resting ECG Result',    ECG_OPTS)}
          {renderSelect('exang',   'Exercise Angina',       [[0,'No'],[1,'Yes']])}
          {renderSlider(SLIDERS[4])}
          {renderSlider(SLIDERS[5])}
          {renderSlider(SLIDERS[6])}
          {renderSlider(SLIDERS[7])}
        </div>

        {/* Result */}
        <div className="glass-card">
          <div className="card-label">Cardiac Risk Report</div>

          <div style={{ marginBottom:6 }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'1.2px', color:'var(--text-muted)', marginBottom:10 }}>
              Risk Thresholds
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

          <button className="btn-analyze" onClick={analyze} disabled={loading}>
            {loading ? '⏳  Analyzing...' : '🚀  Analyze Cardiac Risk'}
          </button>

          <div className="divider" />

          {loading && (
            <div className="loading-overlay" style={{ padding:'32px 0' }}>
              <div className="loading-ring" />
              <p className="loading-text">Processing cardiovascular data...</p>
            </div>
          )}

          {!loading && !result && (
            <div className="empty-state" style={{ padding:'32px 0' }}>
              <div className="empty-icon">🫀</div>
              <p className="empty-title">Results here</p>
              <p className="empty-sub">Complete parameters<br />and click Analyze.</p>
            </div>
          )}

          {!loading && result && (
            <>
              <div className={`result-card ${cls}`}>
                <div className="result-top">
                  <div className="result-icon-box">{isSafe?'✅':'⚠️'}</div>
                  <div>
                    <p className="result-eyebrow">Cardiac {result.result}</p>
                    <p className="result-diagnosis">{result.result}</p>
                    <p className="result-confidence">Risk Score: {(result.probability*100).toFixed(1)}%</p>
                  </div>
                </div>
                <div className="conf-labels"><span>Confidence</span><span>{((isSafe?1-result.probability:result.probability)*100).toFixed(1)}%</span></div>
                <div className="conf-track">
                  <div className={`conf-fill ${cls}`} style={{ width:`${(isSafe?1-result.probability:result.probability)*100}%` }} />
                </div>
              </div>
              <div className="advice-card">
                🩺 <strong>Clinical Note:</strong>{' '}
                {isSafe
                  ? 'No significant cardiac risk detected. Continue healthy lifestyle habits and annual ECG screenings.'
                  : 'Elevated cardiovascular risk detected. Urgent cardiology consultation, ECG, and lipid panel strongly recommended.'
                }
              </div>
              <div className="disclaimer">⚠️ AI result only. Consult a qualified cardiologist for clinical evaluation.</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
