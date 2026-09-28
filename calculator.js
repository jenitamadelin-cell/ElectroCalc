const params = new URLSearchParams(window.location.search);
const calcKey = params.get('calc') || 'ohm';

const TOPICS = {
  ohm: {
    title:"Ohm's Law", category:"ELECTRICAL FUNDAMENTALS", badge:"Ω",
    intro:"Ohm's Law relates voltage, current and resistance in an electrical circuit. Use it to find any one of the three quantities when the other two are known.",
    explanation:"Ohm's Law says that the current through a resistive element is directly related to the voltage across it and inversely related to its resistance. It is one of the first formulas used when analysing simple DC circuits.",
    formulaTitle:"Current from voltage and resistance", formula:"I = V / R", formulaNote:"I = current (A), V = voltage (V), R = resistance (Ω).",
    points:["Keep voltage in volts and resistance in ohms for current in amperes.","1 A = 1000 mA.","The law is most directly applied to ohmic/resistive components under the assumed operating conditions.","You can rearrange the equation: V = IR and R = V/I."],
    example:"Given:\nV = 5 V\nR = 1000 Ω\n\nI = V/R\n  = 5/1000\n  = 0.005 A\n  = 5 mA\n\nAnswer: I = 5 mA",
    fields:[['voltage','Voltage','V'],['resistance','Resistance','Ω']],
    calc(v){const V=+v.voltage,R=+v.resistance;if(!(V>=0&&R>0))return 'Enter a valid voltage and a positive resistance.';const I=V/R;return `Given:\nV = ${V} V\nR = ${R} Ω\n\nFormula:\nI = V / R\n\nSubstitution:\nI = ${V} / ${R}\n\nResult:\nI = ${fmt(I)} A\nI = ${fmt(I*1000)} mA`;}
  },
  power:{
    title:"Electrical Power",category:"ELECTRICAL FUNDAMENTALS",badge:"ϟ",
    intro:"Electrical power tells you how quickly electrical energy is being transferred or consumed. In a simple DC circuit, power can be calculated from voltage and current.",
    explanation:"Power is the rate of electrical energy transfer. For a DC resistive circuit, P = VI. Using Ohm's Law, the same power can also be written as P = I²R or P = V²/R.",
    formulaTitle:"Power from voltage and current",formula:"P = V × I",formulaNote:"P = power (W), V = voltage (V), I = current (A).",
    points:["1 watt means 1 joule of energy per second.","For resistors: P = I²R and P = V²/R are useful alternatives.","Use amperes, not milliamperes, in the main formula unless you convert the result.","Power ratings help prevent components from overheating."],
    example:"Given:\nV = 12 V\nI = 0.5 A\n\nP = V × I\n  = 12 × 0.5\n  = 6 W\n\nAnswer: P = 6 W",
    fields:[['voltage','Voltage','V'],['current','Current','A']],
    calc(v){const V=+v.voltage,I=+v.current;if(!(V>=0&&I>=0))return 'Enter valid non-negative values.';return `Given:\nV = ${V} V\nI = ${I} A\n\nP = V × I\n  = ${V} × ${I}\n\nResult:\nP = ${fmt(V*I)} W`;}
  },
  resistance:{
    title:"Series & Parallel Resistance",category:"CIRCUIT ANALYSIS",badge:"⌁",
    intro:"Resistors can be combined to obtain a desired total resistance. The method depends on whether the resistors are connected in series or parallel.",
    explanation:"In a series connection, the same current flows through every resistor and the resistances add directly. In a parallel connection, the voltage across each branch is the same and reciprocal resistances add.",
    formulaTitle:"Equivalent resistance",formula:"Series: Rₜ = R₁ + R₂ + …\nParallel: 1/Rₜ = 1/R₁ + 1/R₂ + …",formulaNote:"All resistor values should use the same unit, normally ohms.",
    points:["Series resistance is always greater than any individual resistor.","Parallel resistance is smaller than the smallest branch resistance for positive resistors.","For two resistors in parallel: Rₜ = R₁R₂/(R₁+R₂).","Three input boxes are provided; leave R₃ blank when only two resistors are needed."],
    example:"Given:\nR₁ = 100 Ω\nR₂ = 200 Ω\n\nSeries:\nRₜ = 100 + 200 = 300 Ω\n\nParallel:\nRₜ = (100×200)/(100+200)\n   = 66.67 Ω",
    fields:[['r1','R₁','Ω'],['r2','R₂','Ω'],['r3','R₃ (optional)','Ω']],
    calc(v){const a=[+v.r1,+v.r2,+v.r3].filter(x=>x>0);if(a.length<2)return 'Enter at least two positive resistor values.';const series=a.reduce((s,x)=>s+x,0),parallel=1/a.reduce((s,x)=>s+1/x,0);return `Resistors: ${a.join(', ')} Ω\n\nSeries:\nRₜ = ${a.join(' + ')}\nRₜ = ${fmt(series)} Ω\n\nParallel:\n1/Rₜ = ${a.map(x=>`1/${x}`).join(' + ')}\nRₜ = ${fmt(parallel)} Ω`;}
  },
  capacitor:{
    title:"Capacitor Charge",category:"BASIC ELECTRONICS",badge:"∥",
    intro:"A capacitor stores electrical energy in an electric field. This calculator finds the charge stored when capacitance and voltage are known.",
    explanation:"Capacitance measures how much charge a capacitor stores for a given voltage. A larger capacitance stores more charge at the same voltage.",
    formulaTitle:"Charge stored in a capacitor",formula:"Q = C × V",formulaNote:"Q = charge (C), C = capacitance (F), V = voltage (V).",
    points:["Capacitance is measured in farads (F).","Common practical units are μF, nF and pF.","1 μF = 10⁻⁶ F; 1 nF = 10⁻⁹ F; 1 pF = 10⁻¹² F.","Stored energy is E = ½CV²."],
    example:"Given:\nC = 100 μF = 100 × 10⁻⁶ F\nV = 5 V\n\nQ = CV\n  = (100×10⁻⁶)(5)\n  = 0.0005 C\n  = 500 μC",
    fields:[['capacitance','Capacitance','F'],['voltage','Voltage','V']],
    calc(v){const C=+v.capacitance,V=+v.voltage;if(!(C>0&&V>=0))return 'Enter a positive capacitance and valid voltage.';return `Given:\nC = ${C} F\nV = ${V} V\n\nQ = C × V\n  = ${C} × ${V}\n\nResult:\nQ = ${fmt(C*V)} C`;}
  },
  rc:{
    title:"RC Time Constant",category:"CIRCUIT RESPONSE",badge:"τ",
    intro:"The RC time constant describes how quickly a resistor-capacitor circuit charges or discharges. It is represented by the Greek letter τ (tau).",
    explanation:"The time constant is the time required for a charging capacitor to reach about 63.2% of its final voltage, or to fall to about 36.8% of its initial voltage during discharge.",
    formulaTitle:"Time constant",formula:"τ = R × C",formulaNote:"τ = time constant (s), R = resistance (Ω), C = capacitance (F).",
    points:["After about 1τ, a charging capacitor reaches 63.2% of final value.","After about 5τ, it is approximately 99.3% charged.","During discharge, voltage falls to about 36.8% after 1τ.","Increasing R or C increases the response time."],
    example:"Given:\nR = 10 kΩ = 10,000 Ω\nC = 100 μF = 0.0001 F\n\nτ = RC\n  = 10,000 × 0.0001\n  = 1 s\n\nAnswer: τ = 1 s",
    fields:[['resistance','Resistance','Ω'],['capacitance','Capacitance','F']],
    calc(v){const R=+v.resistance,C=+v.capacitance;if(!(R>0&&C>0))return 'Enter positive values.';return `Given:\nR = ${R} Ω\nC = ${C} F\n\nτ = R × C\n  = ${R} × ${C}\n\nResult:\nτ = ${fmt(R*C)} s`;}
  },
  wave:{
    title:"Frequency & Wavelength",category:"SIGNALS & WAVES",badge:"∿",
    intro:"Frequency describes how many cycles occur per second, while wavelength is the distance covered by one complete cycle of a wave.",
    explanation:"Wave speed, frequency and wavelength are related. For a wave travelling at speed v, multiplying frequency by wavelength gives the wave speed.",
    formulaTitle:"Wave relationship",formula:"v = f × λ",formulaNote:"v = wave speed (m/s), f = frequency (Hz), λ = wavelength (m).",
    points:["Frequency is measured in hertz: 1 Hz = 1 cycle/s.","For electromagnetic waves in vacuum, v is approximately 3 × 10⁸ m/s.","For a fixed wave speed, higher frequency means shorter wavelength.","Keep frequency and wavelength units consistent."],
    example:"Given:\nf = 100 MHz = 100×10⁶ Hz\nλ = 3 m\n\nv = fλ\n  = 100×10⁶ × 3\n  = 3×10⁸ m/s",
    fields:[['frequency','Frequency','Hz'],['wavelength','Wavelength','m']],
    calc(v){const f=+v.frequency,l=+v.wavelength;if(!(f>0&&l>0))return 'Enter positive values.';return `Given:\nf = ${f} Hz\nλ = ${l} m\n\nv = f × λ\n  = ${f} × ${l}\n\nResult:\nv = ${fmt(f*l)} m/s`;}
  },
  db:{
    title:"Decibel Calculator",category:"SIGNALS & SYSTEMS",badge:"dB",
    intro:"The decibel is a logarithmic way to express a ratio. It is widely used for gain, attenuation, signal levels and power measurements.",
    explanation:"For power ratios, decibels use 10 times the base-10 logarithm. For voltage ratios under the same impedance conditions, 20 times the base-10 logarithm is commonly used.",
    formulaTitle:"Power ratio in decibels",formula:"dB = 10 log₁₀(P₂ / P₁)",formulaNote:"For voltage ratio under equal impedance: dB = 20 log₁₀(V₂/V₁).",
    points:["A positive dB value means gain; a negative value means attenuation.","Doubling power is about +3.01 dB.","Doubling voltage is about +6.02 dB when impedance is unchanged.","The logarithm makes very large ratios easier to represent."],
    example:"Given:\nP₂ = 10 W\nP₁ = 1 W\n\ndB = 10 log₁₀(10/1)\n   = 10 dB",
    fields:[['output','Output power','W'],['input','Input power','W']],
    calc(v){const p2=+v.output,p1=+v.input;if(!(p2>0&&p1>0))return 'Enter positive power values.';const d=10*Math.log10(p2/p1);return `Given:\nP₂ = ${p2} W\nP₁ = ${p1} W\n\ndB = 10 log₁₀(P₂/P₁)\n   = 10 log₁₀(${p2}/${p1})\n\nResult:\ndB = ${fmt(d)} dB`;}
  },
  divider:{
    title:"Voltage Divider",category:"CIRCUIT ANALYSIS",badge:"÷",
    intro:"A voltage divider uses two series resistors to produce a fraction of an input voltage. It is a common basic circuit used for signal and reference voltages.",
    explanation:"The input voltage is shared between R₁ and R₂ in proportion to their resistance. The output is normally taken across R₂.",
    formulaTitle:"Output voltage",formula:"Vout = Vin × R₂ / (R₁ + R₂)",formulaNote:"This ideal equation assumes the output is not significantly loaded.",
    points:["R₁ is the upper resistor and R₂ is the lower resistor in the standard arrangement.","If R₂ increases, Vout increases for the same Vin and R₁.","A connected load changes the effective lower resistance.","Use consistent resistance units."],
    example:"Given:\nVin = 10 V\nR₁ = 10 kΩ\nR₂ = 10 kΩ\n\nVout = 10 × 10/(10+10)\n     = 5 V",
    fields:[['inputV','Input voltage','V'],['r1','R₁ (top)','Ω'],['r2','R₂ (bottom)','Ω']],
    calc(v){const Vin=+v.inputV,R1=+v.r1,R2=+v.r2;if(!(Vin>=0&&R1>0&&R2>0))return 'Enter valid values.';const out=Vin*R2/(R1+R2);return `Vout = Vin × R₂/(R₁+R₂)\n    = ${Vin} × ${R2}/(${R1}+${R2})\n\nResult:\nVout = ${fmt(out)} V`;}
  },
  energy:{
    title:"Electrical Energy",category:"ELECTRICAL FUNDAMENTALS",badge:"Wh",
    intro:"Electrical energy is the amount of energy consumed or delivered over a period of time. This simple calculator uses power and time.",
    explanation:"If a device operates at a constant power, multiplying power by operating time gives the energy used. Utilities commonly express electrical energy in kilowatt-hours (kWh).",
    formulaTitle:"Energy from power and time",formula:"E = P × t",formulaNote:"When P is in watts and t is in hours, E is in watt-hours (Wh).",
    points:["1 kWh = 1000 Wh.","For time in seconds and power in watts, energy is obtained in joules.","Real devices may not consume constant power.","Energy and power are different: power is a rate; energy is an amount."],
    example:"Given:\nP = 100 W\nt = 5 h\n\nE = Pt\n  = 100 × 5\n  = 500 Wh\n  = 0.5 kWh",
    fields:[['power','Power','W'],['time','Time','h']],
    calc(v){const P=+v.power,t=+v.time;if(!(P>0&&t>0))return 'Enter positive values.';return `E = P × t\n  = ${P} × ${t}\n\nResult:\nE = ${fmt(P*t)} Wh\nE = ${fmt(P*t/1000)} kWh`;}
  },
  period:{
    title:"Frequency & Period",category:"SIGNALS",badge:"T",
    intro:"Frequency and period are inverse quantities. Frequency tells how many cycles happen each second; period tells how long one cycle takes.",
    explanation:"If a signal has a high frequency, each cycle is shorter. If the frequency decreases, the period increases.",
    formulaTitle:"Period from frequency",formula:"T = 1 / f",formulaNote:"T = period (s), f = frequency (Hz).",
    points:["1 Hz corresponds to a period of 1 second.","1000 Hz corresponds to 1 ms per cycle.","Always convert units carefully before substituting.","The inverse relation also gives f = 1/T."],
    example:"Given:\nf = 50 Hz\n\nT = 1/f\n  = 1/50\n  = 0.02 s\n  = 20 ms",
    fields:[['frequency','Frequency','Hz']],
    calc(v){const f=+v.frequency;if(!(f>0))return 'Enter a positive frequency.';const T=1/f;return `T = 1/f\n  = 1/${f}\n\nResult:\nT = ${fmt(T)} s\nT = ${fmt(T*1000)} ms`;}
  },
  gate:{
    title:"Logic Gate Operations",category:"DIGITAL ELECTRONICS",badge:"⊕",
    intro:"Logic gates process binary inputs and produce a binary output. Choose a gate and the number of inputs, then evaluate your own logic expression.",
    explanation:"Digital logic uses two basic states: 0 (LOW) and 1 (HIGH). Each logic gate follows a Boolean rule that determines the output from its input combination. This calculator supports up to eight inputs for multi-input gates.",
    formulaTitle:"Boolean operations",formula:"AND: Y = A·B\nOR: Y = A+B\nNOT: Y = Ā\nXOR: Y = A⊕B",formulaNote:"NAND = NOT(AND), NOR = NOT(OR), XNOR = NOT(XOR).",
    points:["AND outputs 1 only when all inputs are 1.","OR outputs 1 when at least one input is 1.","NOT has one input and inverts it.","XOR outputs 1 when the number of 1 inputs is odd; XNOR outputs 1 when it is even.","Inputs are restricted to binary values 0 and 1."],
    example:"Example: 3-input AND\nA = 1, B = 1, C = 0\n\nY = A·B·C\n  = 1·1·0\n  = 0\n\nOutput: 0",
    logic:true
  }
};

const topic = TOPICS[calcKey] || TOPICS.ohm;
const $ = s => document.querySelector(s);

$('#topicCategory').textContent = topic.category;
$('#topicTitle').textContent = topic.title;
$('#topicIntro').textContent = topic.intro;
$('#topicBadge').textContent = topic.badge;
$('#topicExplanation').textContent = topic.explanation;
$('#formulaTitle').textContent = topic.formulaTitle;
$('#formulaDisplay').textContent = topic.formula;
$('#formulaNote').textContent = topic.formulaNote;
$('#importantPoints').innerHTML = topic.points.map(p => `<li>${p}</li>`).join('');
$('#workedExample').textContent = topic.example;
$('#calculatorTitle').textContent = topic.title;

function fmt(n){
  if(!Number.isFinite(n)) return 'Invalid';
  if(Math.abs(n)>=1000 || (Math.abs(n)>0 && Math.abs(n)<0.001)) return n.toExponential(4);
  return Number(n.toFixed(6)).toString();
}
function inputField(id,label,unit,type='number'){
  return `<div class="field"><label for="${id}">${label} (${unit})</label><input id="${id}" type="${type}" step="any" min="0" placeholder="Enter value"></div>`;
}
function values(fields){const v={};fields.forEach(([id])=>v[id]=$(`#${id}`).value);return v;}
function saveHistory(title,result){
  const history=JSON.parse(localStorage.getItem('electrocalc_history')||'[]');
  history.unshift({title,result,date:new Date().toLocaleString()});
  localStorage.setItem('electrocalc_history',JSON.stringify(history.slice(0,50)));
}

if(topic.logic){
  $('#truthInfo').classList.remove('hidden');
  $('#calculatorForm').innerHTML = `
    <div class="field"><label for="gateType">Gate operation</label><select id="gateType"><option>AND</option><option>OR</option><option>NOT</option><option>NAND</option><option>NOR</option><option>XOR</option><option>XNOR</option></select></div>
    <div class="field"><label for="inputCount">Number of inputs</label><select id="inputCount">${Array.from({length:8},(_,i)=>`<option value="${i+1}" ${i===1?'selected':''}>${i+1}</option>`).join('')}</select></div>
    <div id="gateInputs"></div>
  `;
  const updateGateInputs=()=>{
    const type=$('#gateType').value;
    const count=type==='NOT'?1:+$('#inputCount').value;
    if(type==='NOT') $('#inputCount').value='1';
    $('#gateInputs').innerHTML=Array.from({length:count},(_,i)=>inputField(`g${i}`,`Input ${String.fromCharCode(65+i)}`,'0 or 1','number')).join('');
    Array.from({length:count},(_,i)=>{
      const el=$(`#g${i}`); el.setAttribute('max','1'); el.setAttribute('min','0'); el.step='1';
    });
  };
  $('#gateType').onchange=updateGateInputs; $('#inputCount').onchange=updateGateInputs; updateGateInputs();
  $('#calculateBtn').onclick=()=>{
    const type=$('#gateType').value;
    const count=type==='NOT'?1:+$('#inputCount').value;
    const inputs=Array.from({length:count},(_,i)=>+($(`#g${i}`).value));
    if(inputs.some(x=>x!==0&&x!==1)){showResult('Enter only 0 or 1 for every input.');return;}
    let out;
    if(type==='AND') out=inputs.every(Boolean)?1:0;
    if(type==='OR') out=inputs.some(Boolean)?1:0;
    if(type==='NOT') out=inputs[0]===0?1:0;
    if(type==='NAND') out=inputs.every(Boolean)?0:1;
    if(type==='NOR') out=inputs.some(Boolean)?0:1;
    if(type==='XOR') out=inputs.reduce((a,b)=>a^b,0);
    if(type==='XNOR') out=inputs.reduce((a,b)=>a^b,0)^1;
    const names=inputs.map((_,i)=>String.fromCharCode(65+i));
    const expr=type==='NOT'?`Y = ¬${names[0]}`:`Y = ${names.join(' '+({AND:'·',OR:'+',NAND:'·',NOR:'+',XOR:'⊕',XNOR:'⊙'})[type]+' ')}`;
    const text=`Gate: ${type}\nInputs: ${inputs.join(', ')}\n\n${expr}\n\nOutput Y = ${out}`;
    showResult(text); saveHistory(`${type} Gate`,text);
  };
} else {
  $('#calculatorForm').innerHTML = `<div class="form-grid">${topic.fields.map(f=>inputField(...f)).join('')}</div>`;
  $('#calculateBtn').onclick=()=>{
    const v=values(topic.fields);
    const answer=topic.calc(v);
    showResult(answer); saveHistory(topic.title,answer);
  };
}

function showResult(text){$('#result').textContent=text;$('#result').classList.remove('hidden');}
$('#clearBtn').onclick=()=>{$('#calculatorForm').querySelectorAll('input').forEach(i=>i.value='');$('#result').classList.add('hidden');};
