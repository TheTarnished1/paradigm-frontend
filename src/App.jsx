import { useState } from "react";
 
const INITIAL_COURSES = [
  {
    id: "phy102", name: "PHY 102", sub: "Electricity & Magnetism", color: "#38bdf8",
    topics: [
      {
        title: "Electric Charge & Coulomb's Law",
        concept: "Every charged particle exerts a force on every other. Like charges repel, unlike attract. The force acts along the line joining them and obeys an inverse-square law. Superposition: find each pairwise force as a vector, then add all vectors to get the net force.",
        formulas: ["F = k|q1||q2| / r²","k = 9×10⁹ N·m²/C²  (Coulomb's constant)","k = 1/(4πε₀),  ε₀ = 8.85×10⁻¹² C²/(N·m²)","Elementary charge: e = 1.6×10⁻¹⁹ C","Superposition (N charges on q): F_net = F₁ + F₂ + … (vector sum)"],
        tips: ["F gives magnitude only — direction is repulsive for same-sign, attractive for opposite-sign.","r is always the distance between the CENTRES of the two charges.","For 3 charges: find force on the target from each other charge separately, then add as vectors.","If charges are on a line, assign a positive direction first."],
        eg: { q: "q₁ = +3 μC and q₂ = −2 μC are 0.50 m apart. Find the magnitude of force and state whether attractive or repulsive.", a: "F = k|q₁||q₂| / r²\n= (9×10⁹ × 3×10⁻⁶ × 2×10⁻⁶) / (0.50)²\n= 54×10⁻³ / 0.25\n= 0.216 N\n\nOpposite signs → ATTRACTIVE force." }
      },
      {
        title: "Electric Field & Field Lines",
        concept: "The electric field E at a point is the force that would act on a unit positive test charge placed there. It is a vector — you must state direction. Field lines run from (+) to (−), and the density of lines shows field strength. Superposition applies: E_net = vector sum of individual fields.",
        formulas: ["E = F / q₀  →  units: N/C  or  V/m","Point charge: E = k|q| / r²  (away from + charge, toward − charge)","Parallel plates (uniform): E = σ / ε₀ = V / d","Infinite line: E = λ / (2πε₀r)","Infinite sheet: E = σ / (2ε₀)"],
        tips: ["E is a vector — magnitude AND direction required. Never just state a number.","Parallel plate field is UNIFORM — it does not vary with position between the plates.","Electric field inside a conductor in equilibrium is always ZERO."],
        eg: { q: "Find E at 0.30 m from a +5 μC point charge. State direction.", a: "E = k|q| / r²\n= (9×10⁹ × 5×10⁻⁶) / (0.30)²\n= 45000 / 0.09\n= 5.0×10⁵ N/C\n\nDirection: radially AWAY from the positive charge." }
      },
      {
        title: "Electric Flux & Gauss's Law",
        concept: "Electric flux Φ measures how much field passes through a surface. Gauss's Law: the net flux through any CLOSED surface equals the total enclosed charge divided by ε₀. KEY STRATEGY: choose a Gaussian surface that matches the geometry so E is constant on it — then Φ = E × Area.",
        formulas: ["Flux: Φ = E·A·cosθ  (θ = angle between E and outward normal)","Gauss's Law: Φ_net = Q_enc / ε₀","Outside sphere (r > R): E = kQ / r²","Inside uniform sphere (r < R): E = kQr / R³","Inside any conductor: E = 0"],
        tips: ["Gaussian surface is a MATHEMATICAL surface you choose — it is not physical.","Only Q_enc matters — charges OUTSIDE contribute zero net flux.","Symmetry determines surface shape: sphere → sphere; cylinder → cylinder; plane → pillbox."],
        eg: { q: "Solid insulating sphere R=0.10 m, Q=8 nC. Find E at r=0.20 m (outside) and r=0.05 m (inside).", a: "OUTSIDE: E = kQ/r² = (9×10⁹ × 8×10⁻⁹) / (0.20)² = 1800 N/C\n\nINSIDE: Q_enc = Q(r/R)³ = 8×10⁻⁹ × (0.5)³ = 1×10⁻⁹ C\nE = kQ_enc/r² = (9×10⁹ × 1×10⁻⁹) / (0.05)² = 3600 N/C" }
      },
      {
        title: "Electric Potential Energy & Electric Potential",
        concept: "Electric potential V is potential energy per unit charge — a SCALAR. This makes life easier: just add numbers with signs, no vectors needed. Work is done moving charges between different potentials. E field points from HIGH to LOW potential.",
        formulas: ["Point charge: V = kq / r","Superposition (scalar): V_total = kq₁/r₁ + kq₂/r₂ + …","Potential energy of a pair: U = kq₁q₂ / r","Work: W = q(V_A − V_B)","Relation: E = −dV/dr","Parallel plates: V = Ed;  E = V/d"],
        tips: ["V is a scalar — just add values with their signs. Much easier than E.","No work done moving a charge ALONG an equipotential surface.","A positive charge naturally moves from HIGH V to LOW V (like a ball rolling downhill)."],
        eg: { q: "q₁=+4μC at origin, q₂=−4μC at x=0.06m. (a) V at midpoint x=0.03m; (b) work to bring +1μC from infinity to that point.", a: "(a) r₁=r₂=0.03m\nV₁ = k(+4×10⁻⁶)/0.03 = +1.20×10⁶ V\nV₂ = k(−4×10⁻⁶)/0.03 = −1.20×10⁶ V\nV_total = 0 V\n\n(b) W = qΔV = 1×10⁻⁶ × (0−0) = 0 J" }
      },
      {
        title: "Capacitance: Series, Parallel & Energy",
        concept: "A capacitor stores separated charge — like an electronic water tank. Capacitance C tells you how much charge is stored per volt. Series: same Q, voltages ADD. Parallel: same V, charges ADD. Dielectrics always increase C by factor κ.",
        formulas: ["C = Q / V  (units: Farads)","Parallel-plate: C = ε₀A / d","With dielectric: C = κε₀A / d","Series:   1/C_eq = 1/C₁ + 1/C₂ + …","Parallel: C_eq = C₁ + C₂ + …","Energy: U = ½CV² = Q²/(2C)"],
        tips: ["Series capacitors: Q is THE SAME on every one; voltages add.","Parallel capacitors: V is THE SAME across every one; charges add.","Memory trick: Capacitors in Series do the fraction math (like Resistors in Parallel)."],
        eg: { q: "C₁=4μF and C₂=6μF in series, 12V. Find C_eq, charge on each, voltage across each.", a: "1/C_eq = 1/4 + 1/6 = 5/12\nC_eq = 2.4 μF\n\nQ = C_eq × V = 2.4×10⁻⁶ × 12 = 28.8 μC (same on both)\n\nV₁ = 28.8/4.0 = 7.2 V\nV₂ = 28.8/6.0 = 4.8 V\nCheck: 7.2 + 4.8 = 12 V ✓" }
      },
      {
        title: "Current, Resistivity & Resistance",
        concept: "Current I is the rate of charge flow. Resistance R opposes current — longer wire = more R, thicker wire = less R. Temperature changes resistivity. Power is energy dissipated per second.",
        formulas: ["I = Q/t  (Ampere = C/s)","R = ρL / A","Temperature: ρ(T) = ρ₀[1 + α(T − T₀)]","Ohm's Law: V = IR  (ohmic materials only)","Power: P = IV = I²R = V²/R"],
        tips: ["Doubling L doubles R; doubling A halves R.","α is positive for metals (heat increases R); negative for semiconductors.","Ohm's Law only holds for ohmic devices. Diodes do NOT obey it."],
        eg: { q: "Copper wire (ρ=1.7×10⁻⁸ Ω·m), L=2.0m, A=1.0×10⁻⁶m², I=5A. Find R, V, and P.", a: "R = ρL/A = (1.7×10⁻⁸ × 2.0) / 1.0×10⁻⁶ = 0.034 Ω\nV = IR = 5.0 × 0.034 = 0.17 V\nP = I²R = 25 × 0.034 = 0.85 W" }
      },
      {
        title: "EMF, Terminal Voltage & Power",
        concept: "A real battery has internal resistance r. When current flows, voltage is lost across r, so terminal voltage is less than the EMF. Under heavy load (large I), terminal voltage drops significantly.",
        formulas: ["Terminal voltage: V_t = ε − I·r","Power to external circuit: P_ext = V_t · I","Power wasted internally: P_internal = I²r","Short circuit current: I_max = ε/r"],
        tips: ["Terminal voltage equals EMF ONLY when I=0 (open circuit) or r=0 (ideal battery).","As external load increases, current rises and terminal voltage DROPS.","Total power: εI = I²r + P_ext"],
        eg: { q: "Battery: ε=9.0V, r=0.5Ω, external R=4.0Ω. Find I, terminal voltage, P_ext, P_internal, and efficiency.", a: "I = 9.0 / 4.5 = 2.0 A\nV_t = 9.0 − 1.0 = 8.0 V\nP_ext = I²R = 16.0 W\nP_internal = I²r = 2.0 W\nEfficiency = 16/18 = 88.9%" }
      },
      {
        title: "Resistors in Series/Parallel & Kirchhoff's Rules",
        concept: "Series: same current through all, voltages add. Parallel: same voltage across all, currents add. Kirchhoff's rules handle ANY circuit: KCL (current conservation at junctions) and KVL (energy conservation around loops).",
        formulas: ["Series: R_eq = R₁ + R₂ + …","Parallel: 1/R_eq = 1/R₁ + 1/R₂ + …","Two parallel resistors: R₁R₂/(R₁+R₂)","KCL: ΣI_in = ΣI_out","KVL: ΣΔV = 0 around any loop"],
        tips: ["Parallel R_eq is ALWAYS less than either individual R.","KVL: traverse a loop in ANY direction; just be consistent with signs.","Label current directions BEFORE writing equations. Negative answer just means arrow was wrong."],
        eg: { q: "ε=12V, r=1Ω, R₁=3Ω in series with parallel combo R₂=4Ω and R₃=12Ω. Find R_eq, I, V_parallel, I₂, I₃.", a: "Parallel: R₂₃ = (4×12)/(4+12) = 3 Ω\nTotal: R_eq = 1 + 3 + 3 = 7 Ω\nI = 12/7 ≈ 1.714 A\nV_parallel = 1.714 × 3 = 5.14 V\nI₂ = 5.14/4 = 1.286 A\nI₃ = 5.14/12 = 0.429 A ✓" }
      },
      {
        title: "RC Circuits (Charging & Discharging)",
        concept: "A capacitor charges or discharges exponentially through a resistor. The time constant τ = RC sets the speed. At t=0, capacitor acts as a short circuit (wire). At t=∞, capacitor acts as open circuit (no current).",
        formulas: ["τ = RC  (seconds)","Charging voltage: V_C(t) = ε(1 − e^(−t/τ))","Charging current: I(t) = (ε/R)e^(−t/τ)","Discharging voltage: V_C(t) = V₀·e^(−t/τ)","Discharging current: I(t) = (V₀/R)e^(−t/τ)"],
        tips: ["t=τ: capacitor is 63.2% charged; t=5τ: 99.3% (effectively fully charged).","After one τ of discharging: 36.8% of charge remains.","t=0: treat capacitor as a wire. t=∞: treat as an open gap."],
        eg: { q: "R=20kΩ, C=50μF, ε=10V. Find τ, V_C at t=τ, and time for V_C to reach 8V.", a: "τ = 20×10³ × 50×10⁻⁶ = 1.0 s\n\nV_C(τ) = 10(1 − e⁻¹) = 6.32 V\n\nFor V_C=8V:\n8 = 10(1 − e^(−t))\ne^(−t) = 0.2\nt = −ln(0.2) = 1.61 s" }
      },
      {
        title: "Magnetism, Magnetic Force & Circular Motion",
        concept: "A charge moving through a magnetic field experiences a force perpendicular to BOTH its velocity and B. This force does NO work — it only changes direction, not speed — so the result is circular motion.",
        formulas: ["|F| = qvB sinθ","Circular: qvB = mv²/r","Radius: r = mv / (qB)","Period: T = 2πm / (qB)  (independent of speed!)","Force on wire: |F| = BIL sinθ"],
        tips: ["Magnetic force NEVER does work → speed stays constant, only direction changes.","If v is parallel to B (θ=0): F=0, no deflection.","T = 2πm/(qB) doesn't depend on speed — basis of the cyclotron.","Parallel currents ATTRACT; opposite currents REPEL."],
        eg: { q: "Proton (m=1.67×10⁻²⁷kg, q=1.6×10⁻¹⁹C) at v=5.0×10⁶m/s ⊥ B=0.50T. Find r and T.", a: "r = mv/(qB) = (1.67×10⁻²⁷ × 5.0×10⁶) / (1.6×10⁻¹⁹ × 0.50)\n= 0.104 m ≈ 10.4 cm\n\nT = 2πm/(qB) = 2π × 1.67×10⁻²⁷ / 8.0×10⁻²⁰\n= 1.31×10⁻⁷ s = 131 ns" }
      },
      {
        title: "Biot-Savart Law & Ampere's Law",
        concept: "Biot-Savart gives B from any current element. Ampere's Law is the magnetic equivalent of Gauss's Law — integrate B around a closed Amperian loop and it equals μ₀ times the enclosed current. Choose loops with high symmetry.",
        formulas: ["μ₀ = 4π×10⁻⁷ T·m/A","Long wire: B = μ₀I / (2πr)","Centre of loop (N turns): B = Nμ₀I / (2R)","Solenoid (inside): B = μ₀nI  (n = N/L turns/m)","Inside thick wire (r < R): B = (μ₀I / 2πR²) × r"],
        tips: ["Right-hand rule: thumb in current direction → fingers curl in field direction.","Solenoid interior field is UNIFORM regardless of position.","Outside a solenoid: B ≈ 0.","Inside a thick wire: I_enc = I_total × (r/R)²."],
        eg: { q: "Wire I=10A: find B at r=5cm. Solenoid N=500, L=0.25m, I=4A: find B inside.", a: "Wire: B = (4π×10⁻⁷ × 10)/(2π × 0.05) = 4.0×10⁻⁵ T = 40 μT\n\nSolenoid: n = 500/0.25 = 2000 turns/m\nB = 4π×10⁻⁷ × 2000 × 4.0 ≈ 10.1 mT" }
      },
    ]
  },
  {
    id: "phy103", name: "PHY 103", sub: "Behaviour of Matter", color: "#fb923c",
    topics: [
      {
        title: "Elasticity: Hooke's Law & The Three Moduli",
        concept: "Elasticity is how materials deform under force and return to shape. Stress = force per area. Strain = fractional deformation. Elastic modulus = Stress/Strain — measures stiffness. Three types: Young's (stretching), Bulk (pressure from all sides), Shear (sliding).",
        formulas: ["Hooke's Law: F = kx","Stress = F/A  (Pa = N/m²)","Young's: Y = (F/A)/(ΔL/L)  →  ΔL = FL/(AY)","Bulk: B = −ΔP/(ΔV/V)","Shear: G = (F/A)/(x/L)"],
        tips: ["Young's → rod stretched/compressed. Bulk → object squeezed from all sides. Shear → plates sliding.","Higher modulus = stiffer material = LESS deformation for same stress.","Springs in series: 1/k_eff = 1/k₁ + 1/k₂. In parallel: k_eff = k₁ + k₂."],
        eg: { q: "Steel rod (Y=2.0×10¹¹Pa), L=2.0m, d=1.0cm, F=50000N. Find ΔL.", a: "A = π(0.005)² = 7.854×10⁻⁵ m²\nΔL = FL/(AY) = (50000 × 2.0) / (7.854×10⁻⁵ × 2.0×10¹¹)\n≈ 6.4 mm" }
      },
      {
        title: "Hydrostatics: Pressure, Pascal's Law & Archimedes",
        concept: "Pressure in a fluid increases linearly with depth. Pascal's Law: pressure applied to an enclosed fluid is transmitted equally everywhere. Archimedes: the upward buoyant force equals the weight of fluid displaced. Objects float if their density is less than the fluid's.",
        formulas: ["P = F / A  (Pa)","P = P₀ + ρgh","1 atm ≈ 1.01×10⁵ Pa","Pascal's Law: F₁/A₁ = F₂/A₂","F_buoy = ρ_fluid × V_displaced × g","Fraction submerged = ρ_obj / ρ_fluid"],
        tips: ["Pressure depends only on DEPTH, not on the shape or volume of the container.","Buoyant force = weight of fluid DISPLACED, not weight of the object.","Object floats if ρ_obj < ρ_fluid; sinks if ρ_obj > ρ_fluid."],
        eg: { q: "Wooden block (ρ=600 kg/m³, V=0.20m³) floating in water (ρ=1000 kg/m³). Find weight, buoyant force, and fraction submerged.", a: "W = 600 × 0.20 × 10 = 1200 N\nFloating → F_buoy = W = 1200 N\nFraction = 600/1000 = 60% ✓" }
      },
      {
        title: "Fluid Dynamics: Continuity & Bernoulli",
        concept: "Continuity: for incompressible flow, Q = Av is constant — what flows in must flow out. Bernoulli: total energy per unit volume is constant along a streamline. Where fluid speeds up, pressure drops — like a river flowing faster through a narrow gap.",
        formulas: ["Q = Av  (m³/s)","Continuity: A₁v₁ = A₂v₂","Bernoulli: P + ½ρv² + ρgh = constant","Torricelli: v_out = √(2gh)","Poiseuille: Q = πr⁴ΔP / (8ηL)"],
        tips: ["Bernoulli: where pipe NARROWS → v increases → P DECREASES.","Always apply Bernoulli between two SPECIFIC points.","If both points at same height, the ρgh terms cancel."],
        eg: { q: "A₁=0.08m², v₁=1.5m/s, P₁=4.0×10⁵Pa, same height. A₂=0.02m². Find v₂ and P₂.", a: "v₂ = A₁v₁/A₂ = (0.08 × 1.5)/0.02 = 6.0 m/s\n\nP₂ = P₁ + ½ρ(v₁²−v₂²)\n= 4.0×10⁵ + 500×(2.25−36)\n= 3.83×10⁵ Pa (dropped ✓)" }
      },
      {
        title: "Temperature, Zeroth Law & Thermal Expansion",
        concept: "Zeroth Law defines temperature: if A and B are each in thermal equilibrium with C, they are in equilibrium with each other. Objects expand on heating — the same idea applies to length, area, and volume.",
        formulas: ["K = °C + 273.15","°F = (9/5)°C + 32","Linear: ΔL = αL₀ΔT","Area: ΔA = 2αA₀ΔT","Volume: ΔV = βV₀ΔT  (β = 3α for solids)"],
        tips: ["Convert to Kelvin before using ideal gas law or kinetic theory.","ΔT in °C equals ΔT in Kelvin (same size degree).","Area of a hole in a solid expands the same as a solid disk of the same material."],
        eg: { q: "Steel rail (α=1.2×10⁻⁵/°C), L=10.0m at 15°C. Find ΔL at 55°C.", a: "ΔT = 40°C\nΔL = 1.2×10⁻⁵ × 10.0 × 40 = 4.8×10⁻³ m = 4.8 mm" }
      },
      {
        title: "Kinetic Theory & Ideal Gas Law",
        concept: "Gas pressure results from molecules colliding with walls. Temperature IS average molecular kinetic energy. PV = nRT unifies pressure, volume, amount, and temperature. Always convert T to Kelvin and P to Pascals before using this formula.",
        formulas: ["⟨KE⟩ = (3/2)k_B T  (k_B = 1.38×10⁻²³ J/K)","v_rms = √(3RT/M)","Ideal gas: PV = nRT  (R = 8.314 J/mol·K)","Combined: P₁V₁/T₁ = P₂V₂/T₂","STP: 273.15K, 101325Pa; 1 mol = 22.4L"],
        tips: ["ALWAYS convert T to Kelvin and P to Pa.","v_rms > v_avg > v_mp — Maxwell-Boltzmann is skewed right.","Higher T → faster molecules; lighter molecules → faster at same T."],
        eg: { q: "Find v_rms for O₂ (M=0.032 kg/mol) and H₂ (M=0.002 kg/mol) at T=300K.", a: "v_rms = √(3RT/M)\nO₂: √(3 × 8.314 × 300 / 0.032) ≈ 483 m/s\nH₂: √(3 × 8.314 × 300 / 0.002) ≈ 1934 m/s\n(H₂ is 4× faster: M ratio=16, √16=4 ✓)" }
      },
      {
        title: "Quantity of Heat & Calorimetry",
        concept: "Heat Q is energy transferred due to temperature difference. Sensible heat changes temperature. Latent heat changes phase at CONSTANT temperature. In an isolated system: heat lost by hot objects = heat gained by cold objects.",
        formulas: ["Sensible: Q = mcΔT","c_water = 4186 J/kg·K","Latent: Q = mL  (ΔT = 0 during phase change)","L_fusion(water) = 3.34×10⁵ J/kg","L_vaporization(water) = 2.26×10⁶ J/kg","Calorimetry: Q_lost = Q_gained"],
        tips: ["During phase change: T is CONSTANT — never use Q=mcΔT when changing phase.","Always check if there is ENOUGH heat to complete the phase change before proceeding.","To heat ice to steam: five separate steps."],
        eg: { q: "150g ice at 0°C mixed with 300g water at 80°C. Find final temperature.", a: "Q_melt = 0.150 × 3.34×10⁵ = 50100 J\nQ_water = 0.300 × 4186 × 80 = 100464 J\n100464 > 50100, so all ice melts.\nRemaining = 50364 J warms 450g:\nΔT = 50364 / (0.450 × 4186) = 26.7°C" }
      },
      {
        title: "Heat Transfer: Conduction, Convection & Radiation",
        concept: "Heat moves three ways: Conduction (molecule-to-molecule through contact), Convection (bulk fluid movement), Radiation (electromagnetic waves — works in vacuum). All three can act simultaneously.",
        formulas: ["Conduction: P = kA(T_hot−T_cold)/d","Thermal resistance: R_th = d/(kA)","Series layers: R_total = R₁ + R₂ + …","Stefan-Boltzmann: P = σεAT⁴  (σ = 5.67×10⁻⁸ W/m²·K⁴)","Net radiation: P_net = σεA(T⁴ − T_env⁴)"],
        tips: ["Metals have HIGH k (conductors); air/wood/plastic have LOW k (insulators).","Radiation depends on T⁴ — doubling T increases radiated power by 16×!","Perfect blackbody (ε=1): best emitter AND best absorber."],
        eg: { q: "Composite wall: wood (k=0.15, d=5cm) + brick (k=0.80, d=20cm), A=15m², ΔT=30°C.", a: "R_wood = 0.05/(0.15×15) = 0.0222 K/W\nR_brick = 0.20/(0.80×15) = 0.01667 K/W\nR_total = 0.0389 K/W\nP = 30 / 0.0389 = 771 W" }
      },
      {
        title: "First Law of Thermodynamics",
        concept: "The First Law is energy conservation: ΔU = Q − W. Think of it as: heat pumped in (Q) either makes the system hotter (ΔU) or does mechanical work (W). Internal energy depends only on T for an ideal gas.",
        formulas: ["ΔU = Q − W  (Q>0: heat IN; W>0: work BY system)","Isochoric (V=const): W=0  →  ΔU = Q","Isobaric (P=const): W = PΔV","Isothermal (ideal gas): Q = W = nRT ln(V₂/V₁)","Adiabatic (Q=0): ΔU = −W  →  PVᵞ = const","Monatomic: U=(3/2)nRT, γ=5/3; Diatomic: U=(5/2)nRT, γ=7/5"],
        tips: ["Cyclic process: ΔU=0 over full cycle → Q_net = W_net.","Adiabatic expanding gas COOLS (does work, loses U).","Area enclosed in a P-V diagram = net work done per cycle."],
        eg: { q: "2 mol monatomic gas, isobaric: A(P=1atm, V=40L) to B(P=1atm, V=100L). Find W, ΔU, Q.", a: "W = PΔV = 101325 × 0.060 = 6079 J\nΔT = 365.6 K\nΔU = (3/2)nRΔT = 1.5 × 2 × 8.314 × 365.6 = 9109 J\nQ = ΔU + W = 15188 J" }
      },
      {
        title: "Second Law, Heat Engines & Entropy",
        concept: "Second Law: heat spontaneously flows only from hot to cold. No engine can convert 100% of heat to work. Carnot engine gives the MAXIMUM possible efficiency between two temperatures. Entropy S measures disorder — it always increases for isolated systems.",
        formulas: ["Engine efficiency: e = W/Q_H = 1 − Q_C/Q_H","Carnot efficiency: e_C = 1 − T_C/T_H  (KELVIN!)","COP_refrigerator = Q_C/W","Carnot COP = T_C/(T_H−T_C)","Entropy change: ΔS = Q_rev / T  (J/K)"],
        tips: ["ALWAYS use Kelvin for Carnot efficiency.","Carnot is the THEORETICAL MAXIMUM — all real engines have e < e_Carnot.","To increase efficiency: raise T_H or lower T_C.","A refrigerator is just a heat engine run in reverse."],
        eg: { q: "Carnot engine: T_H=650K, T_C=290K, Q_H=3000J. Find e, W, Q_C, ΔS_total.", a: "e_C = 1 − 290/650 = 55.4%\nW = 0.554 × 3000 = 1661 J\nQ_C = 3000 − 1661 = 1339 J\nΔS_total ≈ 0 ✓ (Carnot is reversible)" }
      },
      {
        title: "Waves: Types, Equations & Properties",
        concept: "A wave transfers energy without transferring matter. Transverse waves: particles vibrate perpendicular to wave motion (light, strings). Longitudinal waves: particles vibrate parallel to motion (sound). Key quantities: amplitude A, wavelength λ, frequency f, period T, wave speed v.",
        formulas: ["v = fλ = λ/T","ω = 2πf  (angular frequency)","k = 2π/λ  (wave number)","y(x,t) = A sin(kx − ωt)","Speed on string: v = √(F_T/μ)","Standing wave: L = nλ/2;  f_n = nv/(2L)"],
        tips: ["T = 1/f — period and frequency are reciprocals.","Intensity falls as 1/r² — double the distance, quarter the intensity.","Standing waves: nodes separated by λ/2. Fundamental (n=1) = lowest frequency."],
        eg: { q: "y = 0.04 sin(5πx − 20πt) m. Find A, k, ω, f, T, λ, v.", a: "A=0.04m, k=5π, ω=20π\nf = ω/(2π) = 10 Hz\nT = 0.10 s\nλ = 2π/k = 0.40 m\nv = fλ = 4.0 m/s ✓" }
      },
    ]
  },
  {
    id: "mth102", name: "MTH 102", sub: "Calculus", color: "#4ade80",
    topics: [
      {
        title: "Functions, Graphs & Continuity",
        concept: "A function assigns exactly ONE output to each input — like a vending machine where pressing a button always gives exactly one snack. You must know domain (valid inputs), range (possible outputs), composition, and inverse. A function is CONTINUOUS at a point if: (1) f(a) exists, (2) the limit exists, and (3) they are equal.",
        formulas: ["Composition: (f∘g)(x) = f(g(x))  — apply g FIRST, then f","Inverse: swap x and y, solve for y","Even: f(−x) = f(x)  (y-axis symmetry)","Odd: f(−x) = −f(x)  (origin symmetry)","Continuity at x=a: f(a) exists AND lim f(x) = f(a)"],
        tips: ["Domain: exclude values making denominator=0, negative under even root, or log of non-positive.","f∘g and g∘f are generally DIFFERENT — order matters.","Polynomials are continuous everywhere."],
        eg: { q: "f(x)=x², g(x)=2x+1. Find f(g(x)), g(f(x)), domain of h(x)=√(x−3)/(x²−16), and is f(x)=x³ even/odd?", a: "(a) f(g(x)) = (2x+1)² = 4x²+4x+1\n(b) g(f(x)) = 2x²+1  (different — order matters!)\n(c) x≥3 AND x≠±4 → Domain: [3,4)∪(4,∞)\n(d) f(−x)=−x³=−f(x) → ODD" }
      },
      {
        title: "Domain: The Four Fuses",
        concept: "Think of the domain as the 'safe zone' for numbers you can plug in. You must find the 'fuses' — the hazards that make the maths blow up. There are four types to watch for. Find each hazard, solve for x, and exclude those values.",
        formulas: ["Denominator Fuse: Bottom ≠ 0","Square Root Fuse: Inside ≥ 0","Log Fuse: Argument of log > 0","Dual Fuse (root on bottom): Inside > 0 (strictly)"],
        tips: ["Set the bottom ≠ 0 and solve for the excluded x values.","Set the inside of a root ≥ 0 and solve the inequality.","If a root sits ON the bottom, it's strictly > 0.","Combine fuses: fractions with square roots in denominator need both checks."],
        eg: { q: "Find the domain of f(x) = √(x−3) / (x²−16)", a: "Fuse 1 (root): x−3 ≥ 0  →  x ≥ 3\nFuse 2 (denominator): x²−16 ≠ 0  →  x ≠ ±4\n\nSince x ≥ 3, only x=4 is in range to exclude.\nDomain: [3, 4) ∪ (4, ∞)" }
      },
      {
        title: "Limits & L'Hôpital's Rule",
        concept: "A limit is the value a function APPROACHES as x gets close to a value — like walking toward a door: the limit is where you're heading, not whether the door is open. For indeterminate forms (0/0 or ∞/∞), try factoring first. If that fails, use L'Hôpital's Rule.",
        formulas: ["Direct substitution first: lim f(x) = f(a) if f continuous at a","L'Hôpital: lim f/g = lim f'/g'  (only for 0/0 or ∞/∞)","lim(x→0) sinx/x = 1","lim(x→0) (1−cosx)/x = 0","lim(x→∞) (1 + 1/x)ˣ = e"],
        tips: ["ALWAYS try direct substitution first.","For 0/0: factor both and cancel the common factor.","L'Hôpital: differentiate TOP and BOTTOM separately — NOT the quotient rule.","L'Hôpital can be applied multiple times if still 0/0."],
        eg: { q: "(a) lim(x→3)(x²−9)/(x−3)  (b) lim(x→0)sin(5x)/x  (c) lim(x→∞)(4x²+3x)/(2x²−7)  (d) lim(x→0)(eˣ−1)/x", a: "(a) Factor: (x+3)(x−3)/(x−3) → x+3 → 6\n(b) 5×sin(5x)/(5x) → 5\n(c) Divide by x²: (4+3/x)/(2−7/x²) → 4/2 = 2\n(d) L'Hôpital: eˣ/1 at x=0 → 1" }
      },
      {
        title: "First Principles Differentiation",
        concept: "This is the 'long manual way' of finding a derivative — the method that proves all the shortcut rules work. You add a tiny step Δx, work out how much y changes (Δy), then find the ratio as those steps shrink to zero. Slow but foundational.",
        formulas: ["y + Δy = f(x + Δx)","Δy = f(x + Δx) − y","dy/dx = lim(Δx→0) of Δy/Δx"],
        tips: ["Always substitute the original y out so you're only left with Δ terms.","Expand brackets carefully before cancelling — don't rush this step.","After cancelling Δx, take the limit by setting Δx = 0."],
        eg: { q: "Differentiate y = x² from first principles.", a: "1) y + Δy = (x + Δx)²\n2) Δy = x² + 2xΔx + (Δx)² − x²\n3) Δy = 2xΔx + (Δx)²\n4) Δy/Δx = 2x + Δx\n5) As Δx→0: dy/dx = 2x" }
      },
      {
        title: "Differentiation: Power, Product & Quotient Rules",
        concept: "These are the shortcuts that save you from first principles every time. Power Rule: the exponent 'backpack' comes down to the front, then the exponent gets one lighter. Product Rule: 'keep first, shoot second PLUS keep second, shoot first.' Quotient Rule: 'Low d(High) minus High d(Low), over Low squared.'",
        formulas: ["Power: d/dx[xⁿ] = nxⁿ⁻¹","Constant: d/dx[c] = 0","Product: d/dx[f·g] = f'g + fg'","Quotient: d/dx[f/g] = (f'g − fg') / g²"],
        tips: ["Rewrite first: √x = x^(1/2), 1/x³ = x⁻³, before applying power rule.","For product rule: write out u, u', v, v' on the side first — less confusion.","Quotient rule: the MINUS sign is critical. Flip the order and you get the wrong sign."],
        eg: { q: "(a) f(x)=6x⁵−4x³+7x−9  (b) g(x)=(3x²+1)(x−4)  (c) h(x)=(2x+5)/(x²+1)", a: "(a) f'(x) = 30x⁴ − 12x² + 7\n\n(b) g'(x) = (6x)(x−4) + (3x²+1)(1) = 9x²−24x+1\n\n(c) h'(x) = [(2)(x²+1) − (2x+5)(2x)] / (x²+1)²\n= −2(x²+5x−1) / (x²+1)²" }
      },
      {
        title: "Chain Rule & Trig Derivatives",
        concept: "The Chain Rule handles 'nested' (composite) functions. Peel the onion: differentiate the OUTSIDE shell, leave the inside exactly as-is, then multiply by the derivative of the inside. Two steps always multiplied together.",
        formulas: ["d/dx[sin x] = cos x","d/dx[cos x] = −sin x  (note the MINUS)","d/dx[tan x] = sec²x","d/dx[sec x] = sec x · tan x","Chain Rule: d/dx[f(g(x))] = f'(g(x)) · g'(x)"],
        tips: ["d/dx[sin(3x)] = cos(3x)·3 — NEVER forget the inner derivative.","d/dx[sin²x] = 2sin(x)·cos(x)  (outer = x², inner = sin x).","Chain rule can be applied multiple times for deeply nested functions."],
        eg: { q: "(a) y=sin(4x²+1)  (b) y=(3x−2)⁷  (c) y=cos³(x)  (d) y=tan(√x)", a: "(a) y' = cos(4x²+1)·8x\n(b) y' = 7(3x−2)⁶·3 = 21(3x−2)⁶\n(c) y' = 3cos²(x)·(−sinx) = −3cos²(x)sinx\n(d) y' = sec²(√x) / (2√x)" }
      },
      {
        title: "Higher-Order Derivatives & Log/Exp",
        concept: "Higher derivatives are obtained by differentiating repeatedly. The second derivative y'' tells you concavity — y''>0 means the curve is 'smiling' (concave up / cup), y''<0 means 'frowning' (concave down / cap). Exp and log derivatives are heavily tested.",
        formulas: ["d/dx[eˣ] = eˣ  (its own derivative!)","d/dx[e^f(x)] = e^f(x)·f'(x)","d/dx[aˣ] = aˣ·ln a","d/dx[ln x] = 1/x","d/dx[ln|u|] = u'/u","Inflection point: y''=0 AND y'' changes sign"],
        tips: ["d/dx[e^(3x)] = 3e^(3x) — inner derivative 3 must appear.","d/dx[ln(x²+1)] = 2x/(x²+1) — chain rule applies to logs too.","y''=0 alone is NOT sufficient for inflection — y'' must also change sign."],
        eg: { q: "Find y' and y'' for: (a) y=e^(2x)·sinx  (b) y=ln(x²+4)  (c) y=3e^(−x²)", a: "(a) y'=e^(2x)(2sinx+cosx)\ny''=e^(2x)(3sinx+4cosx)\n\n(b) y'=2x/(x²+4)\ny''=(8−2x²)/(x²+4)²\n\n(c) y'=−6xe^(−x²)\ny''=6e^(−x²)(2x²−1)" }
      },
      {
        title: "Implicit Differentiation",
        concept: "Used when y is mixed with x and can't easily be isolated. Differentiate BOTH sides with respect to x as normal — but every time you differentiate a y-term, attach a 'dy/dx sticker' to it using the chain rule. Then collect all dy/dx terms on one side and solve.",
        formulas: ["d/dx[y] = dy/dx","d/dx[y²] = 2y·dy/dx","d/dx[y³] = 3y²·dy/dx","d/dx[xy] = y + x·(dy/dx)  (product rule)","d/dx[e^y] = e^y·dy/dx"],
        tips: ["Every y-term gets a 'dy/dx sticker' — never forget this.","Implicit derivatives usually contain BOTH x and y — that's normal.","For slope at (x₀,y₀): substitute both values into dy/dx."],
        eg: { q: "For x³+y³=6xy, find dy/dx. Then find slope at (3,3).", a: "3x² + 3y²(dy/dx) = 6y + 6x(dy/dx)\n(3y²−6x)(dy/dx) = 6y−3x²\ndy/dx = (2y−x²)/(y²−2x)\n\nAt (3,3): dy/dx = (6−9)/(9−6) = −1" }
      },
      {
        title: "Maximum, Minimum Values & Curve Sketching",
        concept: "A critical point is where f'(x)=0 or is undefined — candidates for peaks and valleys. Second derivative test: positive means cup (minimum), negative means cap (maximum). For ABSOLUTE extrema on [a,b]: always check critical points AND both endpoints.",
        formulas: ["Step 1: Find f'(x), set =0, solve","2nd Derivative Test: f''(c)>0 → LOCAL MIN; f''(c)<0 → LOCAL MAX","1st Derivative Test: f' changes +to− → MAX; −to+ → MIN","Absolute: evaluate at critical points + endpoints","Increasing: f'>0; Decreasing: f'<0"],
        tips: ["NEVER forget to check endpoints for ABSOLUTE extrema on a closed interval.","If f''(c)=0, use first derivative test instead.","Inflection: where f'' changes sign — not just where f''=0."],
        eg: { q: "Find local and absolute extrema of f(x)=2x³−9x²+12x−3 on [0,3].", a: "f'(x)=6(x−1)(x−2) → critical points x=1, x=2\nf''(1)=−6 → LOCAL MAX\nf''(2)=+6 → LOCAL MIN\n\nValues: f(0)=−3, f(1)=2, f(2)=1, f(3)=6\nABSOLUTE MAX=6 at x=3\nABSOLUTE MIN=−3 at x=0" }
      },
      {
        title: "Integration: Basic Rules & Fundamental Theorem",
        concept: "Integration is reverse differentiation — it 'puts the function back together.' Instead of dropping the exponent, you ADD 1 and divide by the new number. Always attach +C for indefinite integrals because constants get wiped out during differentiation. Definite integrals give the signed area under a curve.",
        formulas: ["∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ −1)","∫(1/x) dx = ln|x| + C","∫eˣ dx = eˣ + C","∫sin x dx = −cos x + C","∫cos x dx = sin x + C","FTC: ∫ₐᵇ f(x)dx = F(b) − F(a)"],
        tips: ["ALWAYS add +C for indefinite integrals — guaranteed mark loss if forgotten.","CHECK: differentiate your result to verify you get back to the original.","Rewrite before integrating: 1/x²=x⁻², √x=x^(1/2).","Definite integral: no +C; plug in upper limit then subtract lower."],
        eg: { q: "(a) ∫(5x⁴−3/x²+2√x+e²ˣ)dx  (b) ∫₁³(x²−2x+1)dx", a: "(a) x⁵+3/x+(4/3)x^(3/2)+e^(2x)/2+C\n\n(b) F(x)=x³/3−x²+x\nF(3)=9−9+3=3\nF(1)=1/3−1+1=1/3\nAnswer = 3−1/3 = 8/3" }
      },
      {
        title: "u-Substitution",
        concept: "Substitution is the integration version of the Chain Rule. When you spot a composite function where the inside function's derivative is also present, substitute u = inside function. Replace ALL x's with u, integrate cleanly, then substitute back.",
        formulas: ["Let u = g(x)  →  du = g'(x) dx","∫f(g(x))·g'(x) dx = ∫f(u) du","Definite: change limits to u(a) and u(b)","Missing constant factor: multiply and divide to compensate"],
        tips: ["u is usually the 'inner' function — inside brackets, under a root, or in an exponent.","After substituting, NO x should remain — only u and du.","For definite integrals: convert limits to u values to avoid back-substitution."],
        eg: { q: "(a) ∫3x²·cos(x³)dx  (b) ∫x/(x²+5)³dx  (c) ∫₀² 2x·√(x²+1)dx", a: "(a) u=x³, du=3x²dx → ∫cosu du = sin(x³)+C\n\n(b) u=x²+5, xdx=du/2\n(1/2)∫u⁻³du = −1/(4(x²+5)²)+C\n\n(c) Limits: u=1 to u=5\n(2/3)[u^(3/2)]₁⁵ = (2/3)(5√5−1) ≈ 6.787" }
      },
      {
        title: "Integration by Parts",
        concept: "Integration by Parts reverses the Product Rule. Use when substitution fails and the integrand is a PRODUCT of different function types. LIATE rule picks u: Logarithms, Inverse trig, Algebraic, Trigonometric, Exponential — pick the type appearing FIRST.",
        formulas: ["∫u dv = uv − ∫v du","LIATE: Log → Inverse trig → Algebraic → Trig → Exponential","Choose u = first type in LIATE; dv = everything else"],
        tips: ["If IBP gives back the ORIGINAL integral: add it to both sides and solve — it's a trick, not a loop!","∫xⁿeˣ dx: apply IBP n times (polynomial reduces each time).","∫eˣsinx dx: apply IBP TWICE → get integral back → solve for I.","∫lnx dx: u=lnx, dv=dx → gives x·lnx−x+C."],
        eg: { q: "(a) ∫x·sinx dx  (b) ∫x²·eˣ dx  (c) ∫eˣ·cosx dx", a: "(a) u=x, dv=sinxdx → v=−cosx\n= −xcosx+sinx+C\n\n(b) eˣ(x²−2x+2)+C\n\n(c) 2I = eˣ(sinx+cosx)\nI = (eˣ/2)(sinx+cosx)+C" }
      },
    ]
  },
  {
    id: "mth103", name: "MTH 103", sub: "Coordinate Geometry", color: "#e879f9",
    topics: [
      {
        title: "Distance, Midpoint & Division of a Line Segment",
        concept: "The foundation of coordinate geometry. Distance uses Pythagoras — always take the positive root. Midpoint is just averaging both coordinates separately. Division of a segment finds a point splitting it in ratio m:n — midpoint is the special case m=n=1.",
        formulas: ["d = √[(x₂−x₁)² + (y₂−y₁)²]","Midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2)","Section formula (ratio m:n from A): P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))"],
        tips: ["Distance is always POSITIVE.","Midpoint: add the two x values and halve them, same for y.","For section formula: the point divides AB in ratio m:n FROM A."],
        eg: { q: "P(−3,−1) and Q(2,4). (a) PQ; (b) midpoint; (c) point dividing PQ in ratio 2:3 from P.", a: "(a) PQ = √[5²+5²] = 5√2 ≈ 7.07\n(b) M = (−½, 3/2)\n(c) x=(4−9)/5=−1, y=(8−3)/5=1 → Point=(−1,1)" }
      },
      {
        title: "Gradient (Slope) of a Straight Line",
        concept: "The gradient m measures steepness — how much y changes per 1 unit increase in x. Positive m = rising; negative m = falling. Parallel lines have EQUAL slopes. Perpendicular lines: flip the slope and reverse the sign (negative reciprocal).",
        formulas: ["m = (y₂−y₁)/(x₂−x₁) = tanθ","Horizontal: m=0; Vertical: m=undefined","Parallel: m₁=m₂","Perpendicular: m₁×m₂=−1","Angle between lines: tanθ = |m₁−m₂| / (1+m₁m₂)"],
        tips: ["Perpendicular slopes: flip and negate. e.g. m=2 → perp m=−½.","Zero slope = horizontal line. Undefined slope = vertical line.","Always take the acute angle (positive tan) for angle between lines."],
        eg: { q: "Lines: y+3x=2 and 2y+x−4=0. (a) slopes; (b) angle; (c) perpendicular?", a: "(a) m₁=−3, m₂=−½\n(b) tanθ=|−5/2|/(5/2)=1 → θ=45°\n(c) m₁×m₂=(−3)(−½)=3/2≠−1 → NOT perpendicular" }
      },
      {
        title: "Equations of a Straight Line",
        concept: "Four equivalent forms — use whichever is most convenient. Use slope-intercept when you know slope and y-intercept; use point-slope when you have slope and one point; use intercept form when you know both intercepts.",
        formulas: ["Slope-intercept: y = mx + c","Point-slope: y − y₁ = m(x − x₁)","Two-point: (y−y₁)/(y₂−y₁) = (x−x₁)/(x₂−x₁)","Intercept form: x/a + y/b = 1","General: ax + by + c = 0"],
        tips: ["To find slope from ax+by+c=0: rearrange to y=mx+c → slope is −a/b.","Line through origin: c=0, so y=mx only.","Convert any form to general by clearing fractions and moving all terms left."],
        eg: { q: "(a) Through (−3,4), slope 5; (b) through (−1,2) and (3,1); (c) x-intercept 4, y-intercept −3.", a: "(a) y=5x+19\n(b) m=−1/4 → x+4y−7=0\n(c) x/4+y/(−3)=1 → 3x−4y=12" }
      },
      {
        title: "Parallel, Perpendicular Lines & Distance from Point to Line",
        concept: "Once you have the slope, you can write any parallel or perpendicular line through any point. The perpendicular distance formula gives the shortest right-angle distance from a point to a line — always put the line in ax+by+c=0 form first.",
        formulas: ["Parallel through (x₁,y₁): y−y₁=m(x−x₁)  (same slope)","Perpendicular through (x₁,y₁): y−y₁=(−1/m)(x−x₁)","Point to line: d = |ax₀+by₀+c| / √(a²+b²)","Between parallel lines: d = |c₁−c₂| / √(a²+b²)"],
        tips: ["Parallel: SAME slope, new point.", "Perpendicular: NEGATIVE RECIPROCAL slope, new point.","Distance formula: plug point into ax+by+c, absolute value, divide by √(a²+b²)."],
        eg: { q: "L: 3y−2x+3=0, P(4,−1). (a) parallel through P; (b) perpendicular through P; (c) distance.", a: "Slope m=2/3\n(a) 2x−3y−11=0\n(b) 3x+2y−10=0\n(c) d = |8+3−3|/√13 = 8/√13 ≈ 2.22 units" }
      },
      {
        title: "The Circle: Equation & Properties",
        concept: "A circle is the set of all points at a fixed distance (radius) from a fixed point (centre). The general form hides the centre and radius — complete the square for both x and y to reveal them. Test any point by comparing its distance to the centre vs the radius.",
        formulas: ["Standard: (x−h)²+(y−k)²=r²  (centre (h,k))","General: x²+y²+2gx+2fy+c=0","Centre: (−g, −f)","Radius: r=√(g²+f²−c)","Real circle condition: g²+f²−c > 0"],
        tips: ["Complete the square for BOTH x and y to go from general to standard form.","In general form: centre is (−g,−f) — take coefficients of x and y, halve, flip sign.","Circle through origin: constant term c=0."],
        eg: { q: "Find centre and radius: x²+y²−6x+4y−12=0. Is (1,2) inside, on, or outside?", a: "(x−3)²+(y+2)²=25 → Centre (3,−2), r=5\n\nd = √[(1−3)²+(2+2)²] = √20 ≈ 4.47\n4.47 < 5 → INSIDE" }
      },
      {
        title: "Tangent & Normal to a Circle",
        concept: "The tangent at a point on a circle is perpendicular to the radius at that point. This one relationship gives you everything: find the slope of the radius, take the negative reciprocal for the tangent slope. The normal simply follows the radius line through the centre.",
        formulas: ["Slope of radius to (x₁,y₁): m_r=(y₁−k)/(x₁−h)","Tangent slope: m_t=−1/m_r","Tangent on x²+y²+2gx+2fy+c=0: xx₁+yy₁+g(x+x₁)+f(y+y₁)+c=0","Normal: through (x₁,y₁) and centre (−g,−f)","Length of tangent from P(x₀,y₀): L=√(x₀²+y₀²+2gx₀+2fy₀+c)"],
        tips: ["Tangent is always perpendicular to radius — start here every time.","Normal passes through the CENTRE of the circle.","Length of tangent: substitute external point into LHS of general equation, take square root."],
        eg: { q: "Circle (x−2)²+(y+3)²=16. Find tangent and normal at (6,−3).", a: "Centre (2,−3), r=4\nSlope of radius = (−3+3)/(6−2) = 0 (horizontal)\nTangent is VERTICAL: x=6\nNormal is HORIZONTAL: y=−3" }
      },
      {
        title: "Circular Measure: Radians, Arc & Sector",
        concept: "Radian measure directly connects arc length to radius — 1 radian is the angle subtended when arc length = radius. The formulas for arc, area, and chord all become simple with radians. ALWAYS check whether θ is in degrees or radians before applying any formula.",
        formulas: ["π rad = 180°  →  °→rad: ×π/180; rad→°: ×180/π","Arc length: l = rθ  (θ in radians)","Sector area: A = ½r²θ","Chord length: c = 2r sin(θ/2)","Segment area = ½r²(θ − sinθ)"],
        tips: ["l=rθ requires RADIANS — convert degrees first.","Segment = sector MINUS triangle (not minus chord).","Triangle area in sector: ½r²sinθ  (SAS formula).","Quick check: θ=2π → sector area = πr² ✓"],
        eg: { q: "r=8cm, θ=150°. Find (a) arc; (b) sector area; (c) chord; (d) segment.", a: "θ=5π/6 rad\n(a) 8×5π/6 = 20π/3 ≈ 20.9cm\n(b) ½×64×5π/6 ≈ 83.8cm²\n(c) 2×8×sin75° ≈ 15.5cm\n(d) 83.8−16 = 67.8cm²" }
      },
      {
        title: "Trigonometric Ratios & Identities",
        concept: "Trig ratios are defined from right-angled triangles and extend to all angles via the unit circle. The Pythagorean identities connect sin, cos, and tan. CAST tells you which are positive in each quadrant — memorise this cold.",
        formulas: ["sinθ=Opp/Hyp; cosθ=Adj/Hyp; tanθ=Opp/Adj","sin²θ+cos²θ=1;  tan²θ+1=sec²θ;  1+cot²θ=csc²θ","CAST: Q1 all +; Q2 sin+; Q3 tan+; Q4 cos+","sin(180°−θ)=sinθ;  cos(180°−θ)=−cosθ","Area of triangle: A=½bc sinA"],
        tips: ["SOHCAHTOA: Sin=Opp/Hyp; Cos=Adj/Hyp; Tan=Opp/Adj.","CAST mnemonic: All Students Take Calculus (Q1→Q4 anticlockwise).","sin²θ+cos²θ=1 is used CONSTANTLY — must be memorised cold."],
        eg: { q: "Verify sin²θ−cos²θ=2sin²θ−1. Find sinθ if cosθ=−½ and θ in Q3.", a: "sin²θ−cos²θ = sin²θ−(1−sin²θ) = 2sin²θ−1 ✓\n\nsin²θ=1−¼=¾ → sinθ=±√3/2\nQ3: sinθ=−√3/2 ≈ −0.866" }
      },
      {
        title: "Sine Rule, Cosine Rule & Area",
        concept: "For ANY triangle: Sine Rule connects angles to opposite sides; Cosine Rule connects all three sides and one angle. Use Sine Rule when you have a side-angle PAIR. Use Cosine Rule for SAS (two sides + included angle) or SSS (all three sides).",
        formulas: ["Sine Rule: a/sinA = b/sinB = c/sinC","Cosine Rule: a²=b²+c²−2bc cosA","Finding angle: cosA=(b²+c²−a²)/(2bc)","Area=½ab sinC","Heron's: A=√[s(s−a)(s−b)(s−c)], s=(a+b+c)/2"],
        tips: ["Sine Rule: angle goes with its OPPOSITE side.","Cosine Rule: the angle is BETWEEN the two given sides.","Ambiguous case (SSA): check if sinB gives two valid angles."],
        eg: { q: "Triangle a=7, b=5, c=6. Find angle A and area.", a: "cosA = (25+36−49)/60 = 12/60 = 0.2\nA ≈ 78.46°\nArea = ½×5×6×sin(78.46°) ≈ 14.7 sq units\nHeron's check: √[9×2×4×3]=√216≈14.7 ✓" }
      },
      {
        title: "Polygons & Solid Shapes",
        concept: "Interior angle sum of any n-sided polygon is (n−2)×180°, and exterior angles always add to 360°. For 3D shapes: volume is how much space is inside, surface area is the total area of all faces. Always find slant height l=√(h²+r²) before computing cone surface area.",
        formulas: ["Interior sum: (n−2)×180°","Each interior (regular): (n−2)×180°/n","Each exterior (regular): 360°/n","Cylinder: V=πr²h; SA=2πr(r+h)","Cone: V=⅓πr²h; SA=πr(l+r); l=√(h²+r²)","Sphere: V=(4/3)πr³; SA=4πr²"],
        tips: ["n=360°/exterior angle — work backwards from the exterior.","Hemisphere total SA=3πr² (includes flat base).","Cone: always find l BEFORE finding SA."],
        eg: { q: "Regular polygon, interior angle=150°. Find exterior, n, and interior sum. Also cone r=12cm, h=5cm: find l, curved SA, total SA, V.", a: "Exterior=30°, n=12, Sum=1800°\n\nCone: l=√(25+144)=13cm\nCurved SA=156π≈490cm²\nTotal SA=300π≈943cm²\nV=240π≈754cm³" }
      },
    ]
  },
  {
    id: "cos102", name: "COS 102", sub: "Problem Solving in CS", color: "#f472b6",
    topics: [
      {
        title: "Problem Solving & Critical Thinking",
        concept: "Computer Science is the study of problems, problem-solving, and the solutions that come out of that process. Critical thinking is the ability to analyze information, evaluate perspectives, and develop logical solutions by systematically examining a problem and considering options before reaching a conclusion.",
        formulas: ["Step 1: Understand the Problem — define it, identify constraints, clarify the desired outcome","Step 2: Divide and Conquer — break into smaller sub-problems, solve each, integrate","Step 3: Use Visual Tools — flowcharts, diagrams, mind maps","Step 4: Prioritize and Plan — rank solutions by feasibility and impact","Step 5: Seek Feedback and Iterate — learn from results, adjust approach"],
        tips: ["Never skip Step 1. Half the battle is understanding exactly what the problem is asking.","Divide and Conquer is the single most powerful strategy in programming — big problems are just small problems stacked up.","Flowcharts help you catch logical errors BEFORE you write a single line of code.","Brainstorming: generate ideas first without judging — criticism comes later."],
        eg: { q: "A teacher wants to assign grades (A:90-100, B:80-89, C:70-79, D:60-69, F:<60). What are the inputs, processing operations, and output?", a: "Input: Student score (integer, 0–100)\nProcessing: Comparison operations — check score against grade boundaries using if-elif-else\nOutput: Grade letter (text/character)\n\nKey operation type: Conditional (decision-making)" }
      },
      {
        title: "Algorithms: Concept & Properties",
        concept: "An algorithm is a step-by-step procedure with well-defined rules used to solve a specific problem. It takes input, processes it, and produces output in a systematic way. Algorithms are independent of programming languages — the same algorithm can be implemented in Python, C, Java, or any language.",
        formulas: ["Property 1 — Finiteness: must have a finite number of steps; it must eventually stop","Property 2 — Effectiveness: all steps must be feasible and practical to execute","Property 3 — Definiteness: every step must be clear and unambiguous, with a defined order","Property 4 — Input: must have 0 or more well-defined inputs","Property 5 — Output: must have at least one well-defined output","Property 6 — Independence: not tied to any specific programming language"],
        tips: ["A loop that runs forever violates Finiteness — it is NOT a valid algorithm.","Definiteness: 'Multiply A by B and store in C' ✓; 'Process the values' ✗ (vague).","An algorithm can have 0 inputs — e.g., one that just prints 'Hello World'.","Think of an algorithm like a recipe: clear steps, defined ingredients (inputs), defined dish (output)."],
        eg: { q: "Is this a valid algorithm? 'Set X=1. Repeat: X = X+1 (forever).' Identify which property it violates.", a: "This is NOT a valid algorithm.\nIt violates the FINITENESS property — it never stops.\nA valid algorithm must eventually terminate, either with the expected output or a message that no solution is possible." }
      },
      {
        title: "Algorithm Development Steps",
        concept: "Developing an algorithm follows a structured process. You must identify inputs (what data is needed), identify outputs (what result is required), and identify the processing operations (what calculations or decisions convert input to output). These three together define the scope of your solution.",
        formulas: ["Step 1 — Identify Inputs: what data does the algorithm need? What are the data types (int, float, text)?","Step 2 — Identify Outputs: what is the result? What format (number, text, True/False)?","Step 3 — Identify Processing Operations: arithmetic (+−×÷%), comparison (> < ==), logical (AND OR NOT), conditionals (if-else), loops (for, while)","Step 4 — Definiteness: ensure instructions are clear and unambiguous","Step 5 — Finiteness: ensure algorithm terminates","Step 6 — Effectiveness: ensure algorithm correctly achieves its goal"],
        tips: ["Always ask: What information must be given? What must be produced? What must be done in between?","Arithmetic: +, −, *, /, % (modulus for remainder). Modulus is very useful for even/odd checks.","Comparison operators: >, <, >=, <=, ==, != — these are the building blocks of decisions.","The clearer Steps 1–3 are, the easier the actual coding becomes."],
        eg: { q: "A carpenter needs to find the area of a rectangular tabletop. Identify: input, process, output.", a: "Input: length and width of the rectangle (floating-point numbers)\nProcess: Multiplication — Area = length × width\nOutput: Area (floating-point number)\n\nAlgorithm:\nStart → Read length, width → Set area = length × width → Output area → End" }
      },
      {
        title: "Pseudocode",
        concept: "Pseudocode is an informal, human-readable description of an algorithm's steps. It looks like a programming language but isn't bound by strict syntax — it bridges the gap between your thinking and actual code. Pseudocode is NOT a programming language and cannot be executed by a computer.",
        formulas: ["START / END — begin and end the program","INPUT / READ / GET — receive data","OUTPUT / DISPLAY / PRINT — show results","SET / LET / = — assign a value to a variable","IF … THEN … ELSE … ENDIF — decision-making","FOR … TO … DO … ENDFOR — definite loop","WHILE … DO … ENDWHILE — indefinite loop","// or plain text — comments"],
        tips: ["Pseudocode helps you plan logic before worrying about syntax — catch errors early.","Indentation matters even in pseudocode — it shows which steps are inside a loop or condition.","There is no single 'correct' pseudocode style, but it must be clear and unambiguous.","Write pseudocode BEFORE you write code — it saves debugging time later."],
        eg: { q: "Write pseudocode to find the factorial of a number n.", a: "START\n  INPUT n\n  SET factorial = 1\n  FOR i FROM 1 TO n DO\n    SET factorial = factorial * i\n  ENDFOR\n  OUTPUT factorial\nEND" }
      },
      {
        title: "Pseudocode: Common Algorithm Patterns",
        concept: "Certain patterns appear again and again in algorithms — summation, finding max/min, reversing a number, checking for primes. Recognising these patterns and knowing their pseudocode template saves enormous time in exams and real programming.",
        formulas: ["Sum of numbers: SET sum=0; loop: SET sum=sum+value","Count items: SET count=0; loop: SET count=count+1","Average: SET avg = sum / count","Find max/min: compare each value to current max/min, update if better","Reverse a number: digit=num MOD 10; reversed=(reversed×10)+digit; num=num DIV 10","Prime check: FOR i FROM 2 TO n-1: IF n MOD i==0 THEN not prime"],
        tips: ["Always initialise counters and sums to 0 BEFORE the loop starts.","Modulus (MOD) gives the remainder — essential for: even/odd check (n MOD 2), digit extraction (n MOD 10), prime checking.","DIV means integer division (no remainder) — used to strip the last digit when reversing.","For prime check: if NO number from 2 to n-1 divides n evenly, then n is prime."],
        eg: { q: "Write pseudocode to reverse the number 12345.", a: "START\n  INPUT number\n  SET reversed = 0\n  WHILE number > 0 DO\n    SET digit = number MOD 10\n    SET reversed = (reversed * 10) + digit\n    SET number = number DIV 10\n  ENDWHILE\n  OUTPUT reversed\nEND\n\nTrace: 12345 → 51234 → ... → 54321" }
      },
      {
        title: "Flowcharts",
        concept: "Flowcharts are graphical representations of algorithms using standard symbols. They help you visualise the logical flow of a program before coding and are useful for communicating algorithm design to others. Each symbol has a specific meaning — never mix them up.",
        formulas: ["Oval / Rounded Rectangle: START or STOP","Parallelogram: INPUT or OUTPUT","Rectangle: PROCESS / OPERATION (calculations, assignments)","Diamond: DECISION (yes/no question, condition)","Arrows: FLOW LINES showing direction of execution","Circle: PAGE CONNECTOR (continues on another page)"],
        tips: ["Every flowchart must have exactly ONE start and at least ONE stop.","A diamond always has two exits: YES and NO (or True/False).","Flow lines should never cross if you can help it — reroute to keep it readable.","For loops: the arrow loops BACK to the decision diamond; the 'No' branch exits the loop.","Online tools: Creately (creately.com) or EDRAW (edrawmax.com) for drawing flowcharts."],
        eg: { q: "Draw/describe the flowchart to find the average of three numbers a, b, c.", a: "START\n  ↓\nINPUT a, b, c\n  ↓\nSET sum = a + b + c\n  ↓\nSET avg = sum / 3\n  ↓\nOUTPUT avg\n  ↓\nSTOP" }
      },
      {
        title: "Conditional Execution: if, elif, else",
        concept: "Conditionals let a program make decisions — choosing one path or another based on whether a condition is True or False. Think of it like a fork in the road: you must choose one path but never both. Python uses if, elif (else if), and else. Indentation is the syntax — it's not optional.",
        formulas: ["if <condition>:","    <statements>","elif <condition>:","    <statements>","else:","    <statements>","Comparison: < <= == >= > !=","Logical: and, or, not"],
        tips: ["The colon (:) after if/elif/else is required — forgetting it causes a SyntaxError.","Indentation defines the scope — Python uses spaces/tabs, not brackets.","elif is checked only if the previous if was False. else catches everything remaining.","== is comparison (is it equal?); = is assignment (set it equal). Never confuse them.","try/except: wraps risky code (like int() conversion) to handle errors gracefully."],
        eg: { q: "Write Python code to classify a number x as Small (x<2), Medium (x<10), or Large.", a: "if x < 2:\n    print('Small')\nelif x < 10:\n    print('Medium')\nelse:\n    print('Large')\nprint('All done')\n\nNote: Once a condition is True, Python skips all remaining elif/else blocks." }
      },
      {
        title: "Loops: while Loops & Loop Control",
        concept: "A while loop repeats as long as a condition is True — it's called an 'indefinite loop' because you don't know in advance how many times it will run. The key is that something inside the loop must eventually make the condition False. If nothing changes, you get an infinite loop — a common bug.",
        formulas: ["while <condition>:","    <body>","break — exits the loop immediately, jumps to code after the loop","continue — skips the rest of this iteration, jumps back to the condition check","Iteration variable: must change each time through, or the loop runs forever"],
        tips: ["The iteration variable (e.g., n=n−1) MUST change inside the loop, or it runs forever.","break is like an emergency exit — useful for 'search until found' patterns.","continue is like 'skip this one' — useful for filtering out unwanted inputs.","while True: is an intentional infinite loop — always pair it with a break statement.","After the loop: the iteration variable holds its final value — n=0 after counting down."],
        eg: { q: "Write a while loop that counts down from 5 to 1 and prints 'Blastoff!' at the end.", a: "n = 5\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint('Blastoff!')\nprint(n)  # prints 0\n\nOutput: 5, 4, 3, 2, 1, Blastoff!, 0" }
      },
      {
        title: "Loops: for Loops & Loop Patterns",
        concept: "A for loop is a 'definite loop' — it iterates over a fixed set of items and runs exactly once for each item. Python's for loop is cleaner than while for known collections. Common loop patterns: counting, summing, averaging, filtering, and searching with a boolean variable.",
        formulas: ["for <variable> in <sequence>:","    <body>","Counting: k = 0 → k = k + 1","Summing: s = 0 → s = s + value","Average: avg = sum / count (after loop)","Filtering: if value > threshold: do something","Search with boolean: found=False → if found: found=True","Find min/max: if smallest is None or value < smallest: smallest=value"],
        tips: ["The iteration variable (i, item, friend) gets the value of the current element automatically.","Always initialise counters and accumulators to 0 BEFORE the loop.","For searching: use found=False before the loop, set found=True when you find it.","For smallest/largest: initialise to None, then handle the first element as a special case.","'is None' and 'is not None' check for the None value specifically — stronger than ==."],
        eg: { q: "Write code to find the smallest value in [9, 41, 12, 3, 74, 15].", a: "smallest = None\nfor value in [9, 41, 12, 3, 74, 15]:\n    if smallest is None:\n        smallest = value\n    elif value < smallest:\n        smallest = value\nprint('Smallest:', smallest)\n# Output: Smallest: 3" }
      },
      {
        title: "Programming Languages & C Language Basics",
        concept: "A programming language is a set of rules for communicating an algorithm to a computer. Machine language (binary) is the only language computers directly understand. Assembly uses mnemonics (ADD, SUB). High-level languages (Python, C, Java) use English-like syntax and need a translator (compiler or interpreter) to convert to machine code.",
        formulas: ["Machine language: binary codes (e.g. 1011000111101) — directly executed, hard to write","Assembly language: mnemonics (ADD, SUB, LOD) — needs an assembler","High-level language: English-like (Python, C, Java) — needs compiler/interpreter","Compiler: translates entire program at once to machine code","Interpreter: translates and executes line by line","#define identifier value — define a constant in C","const type variable = value — another way to define C constants"],
        tips: ["High-level languages are machine independent — the same code runs on different hardware.","A compiler is faster at runtime; an interpreter is easier for debugging.","In C: #define LENGTH 10 means every occurrence of LENGTH in code becomes 10.","C was created by Dennis Ritchie to develop the UNIX operating system — it's the parent of C++, Java, and Python in influence.","Good language characteristics: readability, simplicity, writability, reliability, portability."],
        eg: { q: "Show the same task (sum 1 to 10) in Assembly vs C. Which is better and why?", a: "Assembly (16 lines of LOD, STO, ADD, JMP...):\nint sum=0;\nfor(int i=1; i<=10; i++)\n    sum += i;\n\nC is FAR better — it's readable, shorter, and machine-independent. Assembly requires knowing specific memory addresses and is tied to one processor type." }
      },
      {
        title: "C Variables, Data Types & Constants",
        concept: "A variable is a named storage location that holds a value which can change during program execution. Constants hold a fixed value that never changes. In C, all variables must be declared with a data type before use. The data type can never change, but the value can.",
        formulas: ["Variable declaration: int a, b; char d; float x;","int — whole numbers (e.g. 5, −3, 100)","float/double — decimal numbers (e.g. 3.14, 2.718)","char — single character (e.g. 'a', 'W')","String literal: characters in double quotes (e.g. \"Hello\")","Constant (#define): #define PI 3.14159","Constant (const): const int MAX = 100;","Valid float literals: 3.14159, 3e5, .3e6, 300000."],
        tips: ["Variables can change value during execution; their data TYPE cannot change.","Integer constant rule: it must stop somewhere — 2, 1000, −5 are fine.","Float literals: must have a decimal point OR an exponent (e), or both.","Invalid float: '2' (no decimal or exponent); '1,000.0' (comma not allowed); '510E' (incomplete exponent).","String literals in double quotes \"\"; character constants in single quotes 'a'."],
        eg: { q: "Declare variables for a student's name, age, and GPA. Also define a constant for the max score.", a: "#include <stdio.h>\n#define MAX_SCORE 100\n\nint main() {\n    char name[50];\n    int age;\n    float gpa;\n    \n    age = 20;\n    gpa = 3.75;\n    \n    printf(\"Age: %d, GPA: %.2f\\n\", age, gpa);\n    return 0;\n}" }
      },
    ]
  },
];
 
const CARD_CONFIG = {
  concept:      { color: "#38bdf8", label: "CONCEPT",   icon: "💡", bg: "#06131f" },
  formula:      { color: "#a78bfa", label: "FORMULA",   icon: "📐", bg: "#0d0a1f" },
  tip:          { color: "#34d399", label: "EXAM TIP",  icon: "⚡", bg: "#051a11" },
  "example-q":  { color: "#fbbf24", label: "TRY THIS",  icon: "❓", bg: "#1a1205" },
  "example-a":  { color: "#fb923c", label: "SOLUTION",  icon: "✅", bg: "#1a0e05" },
};
 
function getCards(topic) {
  return [
    { type: "concept", content: topic.concept },
    ...topic.formulas.map((f, i) => ({ type: "formula", content: f, n: i + 1, of: topic.formulas.length })),
    ...topic.tips.map((t, i) => ({ type: "tip", content: t, n: i + 1, of: topic.tips.length })),
    { type: "example-q", content: topic.eg.q },
    { type: "example-a", content: topic.eg.a },
  ];
}
 
async function ask(system, user) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `${system}\n\nUSER PROMPT: ${user}`
      })
    });
    const d = await res.json();
    return d.reply || "Error. Try again.";
  } catch (err) { 
    console.error(err);
    return "Network error. Is the Python API running at localhost:8000?"; 
  }
}
 
export default function App() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [ci, setCi] = useState(0);
  const [ti, setTi] = useState(0);
  const [mode, setMode] = useState("learn");
  const [cardIdx, setCardIdx] = useState(0);
  const [marks, setMarks] = useState({});
  const [explain, setExplain] = useState("");
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [quizQ, setQuizQ] = useState("");
  const [quizA, setQuizA] = useState("");
  const [feedback, setFeedback] = useState("");
  const [quizStage, setQuizStage] = useState("idle");

  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [fileContext, setFileContext] = useState("");
  const [uploading, setUploading] = useState(false);
 
  const safeCi = Math.min(ci, Math.max(0, courses.length - 1));
  const course = courses[safeCi] || courses[0];
  const topic = course?.topics[ti] || { title: "", concept: "", formulas: [], tips: [], eg: { q: "", a: "" } };
  const cards = course ? getCards(topic) : [];
  const card = cards[cardIdx] || { type: "concept", content: "" };
  const cc = CARD_CONFIG[card.type] || CARD_CONFIG.concept;
  const key = `${safeCi}-${ti}`;
  const isLast = cardIdx === cards.length - 1;
  const gotCount = Object.values(marks).filter(v => v === "got").length;
  const reviewCount = Object.values(marks).filter(v => v === "review").length;
  const total = courses.reduce((s, c) => s + c.topics.length, 0);
 
  const navTo = (newCi, newTi) => {
    setCi(newCi); setTi(newTi);
    setCardIdx(0); setMode("learn");
    setExplain(""); setQuizQ(""); setQuizA(""); setFeedback(""); setQuizStage("idle");
  };
 
  const mark = (level) => {
    setMarks(m => ({ ...m, [key]: level }));
    if (ti + 1 < course.topics.length) navTo(safeCi, ti + 1);
    else setMode("topics");
  };

  const handleUiAction = (action) => {
    if (!action) return;
    switch (action.type) {
      case 'ADD_COURSE':
        setCourses(prev => {
          if (prev.some(c => c.name.toLowerCase() === action.payload.name.toLowerCase())) return prev;
          return [...prev, {
            id: Date.now().toString(),
            name: action.payload.name,
            sub: "New Module",
            color: "#a78bfa", // Default dynamic color
            topics: []
          }];
        });
        break;
      case 'REMOVE_COURSE':
        setCourses(prev => prev.filter(c => c.name.toLowerCase() !== action.payload.name.toLowerCase()));
        break;
      default:
        console.log("Unknown action received:", action.type);
    }
  };
 
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // NOTE: You will need to create this endpoint in your Python backend!
      const res = await fetch("https://paradigm-q55h.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.extracted_text) {
        setFileContext(prev => prev + "\n\n--- DOCUMENT CONTENT ---\n" + data.extracted_text);
        setChatHistory(prev => [...prev, { role: "ai", text: `📄 I've successfully processed and stored "${file.name}". How should we use this material?` }]);
      }
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { role: "ai", text: "❌ Connection failed while trying to upload the file." }]);
    } finally {
      setUploading(false);
    }
  };

  const doExplain = async () => {
    setLoadingExplain(true); setExplain("");
    setExplain(await ask(
      "Explain this in 2-3 sentences using a simple everyday analogy. Zero jargon, zero formulas. Like texting a friend.",
      topic.concept
    ));
    setLoadingExplain(false);
  };
 
  const doQuiz = async () => {
    setQuizStage("loading"); setFeedback(""); setQuizA(""); setQuizQ("");
    const q = await ask(
      "Generate ONE specific, exam-style question about this topic with numbers or code to work through. Just the question, nothing else.",
      `Topic: ${topic.title}\nConcept: ${topic.concept}\nFormulas: ${topic.formulas.join("; ")}`
    );
    setQuizQ(q); setQuizStage("ready");
  };
 
  const doCheck = async () => {
    if (!quizA.trim()) return;
    setQuizStage("checking");
    const fb = await ask(
      "Evaluate this answer warmly in 2-4 sentences. First say what's right, then gently correct any errors with the proper method. Be encouraging and specific. End with one motivating sentence.",
      `Q: ${quizQ}\nStudent's answer: ${quizA}\nKey formulas: ${topic.formulas.join("; ")}\nWorked solution: ${topic.eg.a}`
    );
    setFeedback(fb); setQuizStage("done");
  };

  const askParadigm = async (userMessage) => {
    if (!userMessage.trim()) return;
  
    const newHistory = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory(newHistory);
    setChatInput(""); 
    setIsChatLoading(true);
  
    try {
      const contextString = `Current Course: ${course?.name} (${course?.sub}). Topic: ${topic?.title}. Context Docs: ${fileContext}`;
      
      const res = await fetch("https://paradigm-q55h.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage, 
          history: newHistory,
          context: contextString 
        })
      });
      
      const d = await res.json();
      
      setChatHistory(prev => [...prev, { role: "ai", text: d.reply || "Error reading response." }]);
      if (d.action) handleUiAction(d.action);

    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { role: "ai", text: "Connection error. Is the server awake?" }]);
    } finally {
      setIsChatLoading(false);
    }
  };
 
  const inputBase = {
    width: "100%", padding: 14, background: "#0d1117",
    border: "1px solid #1e2a3a", borderRadius: 12, color: "#e2e8f0",
    fontSize: 14, resize: "vertical", fontFamily: "inherit",
    boxSizing: "border-box", outline: "none", lineHeight: 1.6,
  };
 
  const btnBase = (bg, fg, disabled) => ({
    width: "100%", padding: "13px 0", border: "none", borderRadius: 12,
    background: disabled ? "#111827" : bg,
    color: disabled ? "#2d3f5f" : fg,
    fontSize: 14, fontWeight: "bold", cursor: disabled ? "not-allowed" : "pointer",
  });
 
  if (!course) return <div style={{ color: "#fff", padding: 20 }}>Loading layout...</div>;

  return (
    <div style={{ background: "#07090f", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif", maxWidth: 520, margin: "0 auto" }}>
 
      {/* STICKY HEADER */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "#0a0d14", borderBottom: "1px solid #151e30" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "10px 14px 0", overflowX: "auto" }}>
          {courses.map((c, i) => (
            <button key={i} onClick={() => navTo(i, 0)} style={{
              padding: "6px 10px", borderRadius: "8px 8px 0 0", border: "none",
              fontSize: 10, fontWeight: "bold", cursor: "pointer", whiteSpace: "nowrap",
              background: safeCi === i ? c.color : "#131c2e",
              color: safeCi === i ? "#07090f" : "#4b5980",
              flexShrink: 0,
            }}>{c.name}</button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 10, paddingBottom: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: "#34d399" }}>✅ {gotCount}</span>
            {reviewCount > 0 && <span style={{ fontSize: 11, color: "#f87171" }}>🔴 {reviewCount}</span>}
            <span style={{ fontSize: 11, color: "#3a4f70" }}>/{total}</span>
          </div>
        </div>
 
        <div style={{ padding: "6px 14px 8px" }}>
          <div style={{ fontSize: 13, color: course.color, fontWeight: "bold", marginBottom: 6, lineHeight: 1.3 }}>
            {ti + 1}/{Math.max(1, course.topics.length)} · {topic.title || "No topics yet"}
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {course.topics.map((_, i) => {
              const k = `${safeCi}-${i}`;
              return (
                <div key={i} onClick={() => navTo(safeCi, i)} title={course.topics[i].title} style={{
                  width: 9, height: 9, borderRadius: "50%", cursor: "pointer",
                  background: marks[k] === "got" ? "#34d399" : marks[k] === "review" ? "#f87171" : i === ti ? course.color : "#1a2a3a",
                  border: i === ti ? `2px solid ${course.color}` : "2px solid transparent",
                  flexShrink: 0,
                }} />
              );
            })}
          </div>
        </div>
 
        <div style={{ display: "flex", borderTop: "1px solid #151e30" }}>
          {[["learn", "📖 Learn"], ["quiz", "🧠 Quiz"], ["topics", "📋 Topics"]].map(([m, label]) => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: "9px 0", border: "none", fontSize: 12, cursor: "pointer",
              background: "transparent", color: mode === m ? course.color : "#3a4f70",
              borderBottom: `2px solid ${mode === m ? course.color : "transparent"}`,
              fontWeight: mode === m ? "bold" : "normal",
            }}>{label}</button>
          ))}
        </div>
      </div>
 
      <div style={{ padding: 14 }}>
 
        {/* LEARN MODE */}
        {mode === "learn" && course.topics.length > 0 && (
          <div>
            <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
              {cards.map((c, i) => (
                <div key={i} onClick={() => setCardIdx(i)} style={{
                  flex: 1, height: 4, borderRadius: 3, cursor: "pointer",
                  background: (CARD_CONFIG[c.type] || cc).color,
                  opacity: i > cardIdx ? 0.18 : i === cardIdx ? 1 : 0.55,
                }} />
              ))}
            </div>
 
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{cc.icon}</span>
              <span style={{ fontSize: 10, color: cc.color, fontWeight: "bold", letterSpacing: 2 }}>{cc.label}</span>
              {card.n != null && <span style={{ fontSize: 10, color: "#3a4f70" }}>{card.n} of {card.of}</span>}
              <span style={{ marginLeft: "auto", fontSize: 10, color: "#3a4f70" }}>Card {cardIdx + 1}/{cards.length}</span>
            </div>
 
            <div style={{
              background: cc.bg, borderRadius: 16, padding: 20,
              border: `1px solid ${cc.color}25`, borderLeftWidth: 4, borderLeftColor: cc.color,
              minHeight: 150,
            }}>
              <div style={{
                fontSize: card.type === "formula" ? 15 : 14,
                lineHeight: 1.95, color: card.type === "formula" ? "#e8e0ff" : "#c8d8ee",
                fontFamily: (card.type === "formula" || card.type === "example-a") ? "'Courier New', monospace" : "inherit",
                whiteSpace: "pre-wrap",
              }}>
                {card.content}
              </div>
            </div>
 
            {card.type === "example-q" && (
              <div style={{ fontSize: 11, color: "#3a4f70", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>
                ⏱ Try working it out before pressing Next
              </div>
            )}
 
            {card.type === "concept" && (
              <div style={{ marginTop: 10 }}>
                <button onClick={doExplain} disabled={loadingExplain} style={{
                  ...btnBase("transparent", "#6b7fa3", false),
                  border: "1px solid #1e2a3a", fontSize: 12, padding: "9px 0",
                  background: "transparent",
                }}>
                  {loadingExplain ? "🤔 Thinking of an analogy..." : "🤔 Still confused? Explain it even simpler"}
                </button>
                {explain && (
                  <div style={{ marginTop: 8, background: "#06131f", padding: 14, borderRadius: 12, border: "1px solid #38bdf825" }}>
                    <div style={{ fontSize: 9, color: "#38bdf8", marginBottom: 6, letterSpacing: 2 }}>PLAIN ENGLISH ✨</div>
                    <div style={{ fontSize: 14, color: "#93c5fd", lineHeight: 1.8 }}>{explain}</div>
                  </div>
                )}
              </div>
            )}
 
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={() => setCardIdx(c => Math.max(0, c - 1))} disabled={cardIdx === 0} style={{
                padding: "13px 18px", background: "#111827", border: "1px solid #1e2a3a",
                borderRadius: 12, color: cardIdx === 0 ? "#1a2a3a" : "#6b7fa3",
                cursor: cardIdx === 0 ? "not-allowed" : "pointer", fontSize: 16,
              }}>←</button>
 
              {!isLast ? (
                <button onClick={() => setCardIdx(c => c + 1)} style={{
                  flex: 1, padding: 13, background: cc.color, border: "none",
                  borderRadius: 12, color: "#07090f", cursor: "pointer", fontSize: 14, fontWeight: "bold",
                }}>Next →</button>
              ) : (
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "#4b5980", textAlign: "center", marginBottom: 8 }}>
                    How did you find this topic?
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => mark("review")} style={{
                      flex: 1, padding: "11px 0", background: "#1a0808",
                      border: "1px solid #f8717155", borderRadius: 10,
                      color: "#f87171", cursor: "pointer", fontSize: 13, fontWeight: "bold",
                    }}>😕 Needs work</button>
                    <button onClick={() => mark("got")} style={{
                      flex: 1, padding: "11px 0", background: "#081a0e",
                      border: "1px solid #34d39955", borderRadius: 10,
                      color: "#34d399", cursor: "pointer", fontSize: 13, fontWeight: "bold",
                    }}>✅ Got it!</button>
                  </div>
                </div>
              )}
            </div>
 
            <button onClick={() => setMode("quiz")} style={{
              width: "100%", marginTop: 10, padding: "9px 0",
              background: "transparent", border: `1px dashed ${course.color}44`,
              borderRadius: 10, color: course.color + "99", fontSize: 11, cursor: "pointer",
            }}>
              🧠 Ready to be tested on this topic? → Quiz mode
            </button>
          </div>
        )}
 
        {/* QUIZ MODE */}
        {mode === "quiz" && course.topics.length > 0 && (
          <div>
            <div style={{ background: "#0d1117", borderRadius: 12, padding: 14, marginBottom: 16, border: "1px solid #1e2a3a" }}>
              <div style={{ fontSize: 12, color: "#6b7fa3", lineHeight: 1.7 }}>
                <strong style={{ color: "#a0aec0" }}>Active recall beats re-reading every time.</strong> Try to answer even if you're unsure — the attempt is what makes it stick.
              </div>
            </div>
 
            {quizStage === "idle" && (
              <button onClick={doQuiz} style={btnBase(course.color, "#07090f", false)}>
                🎯 Generate a Question
              </button>
            )}
 
            {quizStage === "loading" && (
              <div style={{ textAlign: "center", padding: "50px 0", color: "#4b5980" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🤔</div>
                <div style={{ fontSize: 13 }}>Generating a question...</div>
              </div>
            )}
 
            {["ready", "checking", "done"].includes(quizStage) && (
              <div>
                <div style={{ background: "#1a1205", padding: 16, borderRadius: 12, border: "1px solid #fbbf2430", marginBottom: 14 }}>
                  <div style={{ fontSize: 9, color: "#fbbf24", letterSpacing: 2, marginBottom: 8 }}>QUESTION ❓</div>
                  <div style={{ fontSize: 14, color: "#fde68a", lineHeight: 1.85 }}>{quizQ}</div>
                </div>
 
                <textarea
                  value={quizA} onChange={e => setQuizA(e.target.value)}
                  placeholder="Show your working step by step... Even partial answers help you learn!"
                  disabled={quizStage !== "ready"}
                  style={{ ...inputBase, minHeight: 130 }}
                />
 
                {quizStage === "ready" && (
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button onClick={doCheck} disabled={!quizA.trim()} style={btnBase("#34d399", "#07090f", !quizA.trim())}>
                      Check My Answer ✓
                    </button>
                    <button onClick={doQuiz} style={{
                      padding: "13px 16px", background: "#111827", border: "1px solid #1e2a3a",
                      borderRadius: 12, color: "#4b5980", cursor: "pointer", fontSize: 13,
                    }}>↺</button>
                  </div>
                )}
 
                {quizStage === "checking" && (
                  <div style={{ textAlign: "center", padding: 20, color: "#4b5980", fontSize: 13 }}>
                    Evaluating your answer...
                  </div>
                )}
 
                {quizStage === "done" && feedback && (
                  <div>
                    <div style={{ background: "#081a0e", padding: 16, borderRadius: 12, border: "1px solid #34d39930", marginTop: 12 }}>
                      <div style={{ fontSize: 9, color: "#34d399", letterSpacing: 2, marginBottom: 8 }}>TUTOR FEEDBACK 🎓</div>
                      <div style={{ fontSize: 14, color: "#86efac", lineHeight: 1.85 }}>{feedback}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button onClick={doQuiz} style={{
                        flex: 1, padding: 12, background: "#111827",
                        border: `1px solid ${course.color}44`, borderRadius: 12,
                        color: course.color, fontSize: 13, cursor: "pointer",
                      }}>Try Another 🔄</button>
                      <button onClick={() => { setMode("learn"); setCardIdx(0); }} style={{
                        flex: 1, padding: 12, background: "#111827",
                        border: "1px solid #1e2a3a", borderRadius: 12,
                        color: "#6b7fa3", fontSize: 13, cursor: "pointer",
                      }}>Review Cards ←</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
 
        {/* TOPICS MODE */}
        {mode === "topics" && (
          <div>
            {reviewCount > 0 && (
              <div style={{ background: "#1a0808", padding: 12, borderRadius: 12, border: "1px solid #f8717130", marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: "#f87171", letterSpacing: 2, marginBottom: 4 }}>🔴 NEEDS REVIEW</div>
                <div style={{ fontSize: 12, color: "#fca5a5" }}>
                  {reviewCount} topic{reviewCount > 1 ? "s" : ""} marked for review — tap to revisit.
                </div>
              </div>
            )}
 
            <div style={{ background: "#111827", borderRadius: 10, padding: 12, marginBottom: 16, border: "1px solid #1e2a3a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: "#6b7fa3" }}>Overall Progress</span>
                <span style={{ fontSize: 11, color: "#34d399", fontWeight: "bold" }}>{gotCount}/{total} done</span>
              </div>
              <div style={{ height: 6, background: "#1e2a3a", borderRadius: 3 }}>
                <div style={{ height: "100%", width: `${(gotCount / total) * 100}%`, background: "#34d399", borderRadius: 3, transition: "width 0.4s" }} />
              </div>
            </div>
 
            {courses.map((c, cIdx) => {
              const cGot = c.topics.filter((_, i) => marks[`${cIdx}-${i}`] === "got").length;
              return (
                <div key={cIdx} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: c.color, letterSpacing: 2, fontWeight: "bold", textTransform: "uppercase" }}>
                      {c.name} · {c.sub}
                    </div>
                    <div style={{ fontSize: 10, color: "#4b5980" }}>{cGot}/{c.topics.length}</div>
                  </div>
                  {c.topics.map((t, tIdx) => {
                    const k = `${cIdx}-${tIdx}`;
                    const m = marks[k];
                    const active = safeCi === cIdx && ti === tIdx;
                    return (
                      <div key={tIdx} onClick={() => navTo(cIdx, tIdx)} style={{
                        padding: "11px 14px", borderRadius: 10, marginBottom: 5,
                        background: active ? c.color + "18" : "#0d1117",
                        border: `1px solid ${m === "got" ? "#34d39930" : m === "review" ? "#f8717130" : active ? c.color + "40" : "#1e2a3a"}`,
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
                      }}>
                        <span style={{ fontSize: 14, flexShrink: 0 }}>
                          {m === "got" ? "✅" : m === "review" ? "🔴" : "⚪"}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, color: active ? c.color : "#b0c4de", lineHeight: 1.4, fontWeight: active ? "bold" : "normal" }}>
                            {t.title}
                          </div>
                          <div style={{ fontSize: 9, color: "#3a4f70", marginTop: 2 }}>
                            {c.name} · Topic {tIdx + 1}
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: "#3a4f70" }}>→</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
 
        <div style={{ height: 24 }} />
      </div>

      {/* Floating Paradigm Orb */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 100 }}>
        {!isChatOpen ? (
          <button onClick={() => setIsChatOpen(true)} style={{
            width: 60, height: 60, borderRadius: "50%", background: "#38bdf8",
            border: "none", fontSize: 24, cursor: "pointer", boxShadow: "0 4px 15px #38bdf844"
          }}>🤖</button>
        ) : (
          <div style={{
            width: 320, height: 450, background: "#0d1117", borderRadius: 20,
            border: "1px solid #1e2a3a", display: "flex", flexDirection: "column",
            boxShadow: "0 10px 30px #000"
          }}>
            <div style={{ padding: 15, borderBottom: "1px solid #1e2a3a", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold", color: "#e2e8f0" }}>Paradigm CI</span>
              <button onClick={() => setIsChatOpen(false)} style={{ background: "none", border: "none", color: "#6b7fa3", cursor: "pointer" }}>❌</button>
            </div>
            
            <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
              {chatHistory.map((msg, i) => (
                <div key={i} style={{ marginBottom: 12, textAlign: msg.role === "user" ? "right" : "left" }}>
                  <span style={{ 
                    padding: "10px 14px", 
                    borderRadius: 14, 
                    background: msg.role === "user" ? "#38bdf8" : "#1e2a3a", 
                    color: msg.role === "user" ? "#07090f" : "#e2e8f0",
                    fontSize: 13, 
                    display: "inline-block",
                    maxWidth: "85%",
                    textAlign: "left",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap"
                  }}>
                    {msg.text}
                  </span>
                </div>
              ))}
              {isChatLoading && (
                <div style={{ textAlign: "left", marginBottom: 12 }}>
                  <span style={{ padding: "10px 14px", borderRadius: 14, background: "#1e2a3a", color: "#6b7fa3", fontSize: 13, display: "inline-block" }}>
                    Thinking...
                  </span>
                </div>
              )}
            </div>
            
            <div style={{ display: "flex", margin: 10, gap: 8 }}>
              {/* FILE UPLOAD BUTTON */}
              <label style={{
                background: "#1e2a3a", borderRadius: 12, width: 44, height: 44, 
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.5 : 1
              }}>
                <input 
                  type="file" 
                  onChange={handleFileUpload} 
                  style={{ display: "none" }} 
                  disabled={uploading} 
                  accept=".pdf,.pptx,.txt" 
                />
                {uploading ? "⏳" : "📎"}
              </label>

              <input 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' && !isChatLoading) {
                    askParadigm(chatInput);
                  }
                }} 
                placeholder="Ask your CI..." 
                disabled={isChatLoading}
                style={{ ...inputBase, margin: 0, flex: 1, opacity: isChatLoading ? 0.5 : 1 }} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}