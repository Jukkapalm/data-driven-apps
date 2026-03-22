// Data
// Tästä lisätään tekstejä

// Värikartta
// Raakadata / keräys  — #00d4ff (sähkön syaani)
// Automation             — #ff00ff (magenta)
// Security            — #39ff14 (neon vihreä)
// System / infra      — #9d4edd (purple)
const nodes = [
    {
        id:     "DA-001",
        title:  "GHOST.SYS",
        desc:   "Reaaliaikainen palvelinmonitorointi dashboard — seuraa CPU:ta, muistia, levyä ja verkkoliikennettä sekä analysoi automaattisesti pullonkauloja ja varoittaa ongelmista.",
        tags:   ["system"],
        tech:   ["Python", "JS", "HTML", "CSS"],
        clr:    "#9D4EDD",
        chars:  "0123456789ABCDEF01010110",
        link:   "https://ghost-sys-1.onrender.com",
        github: "https://github.com/Jukkapalm/ghost-sys",
        locked: false
    },
    {
        id:     "DA-002",
        title:  "Project Name Here",
        desc:   "Short description of what this project does and what was analysed.",
        tags:   [""],
        clr:    "#00D4FF",
        chars:  "0123456789ABCDEF01010110",
        link:   "#",
        github: "#",
        locked: true
    },
    {
        id:     "DA-003",
        title:  "Project Name Here",
        desc:   "Short description of what this project does and what was analysed.",
        tags:   [""],
        clr:    "#39DD14",
        chars:  "0123456789ABCDEF01010110",
        link:   "#",
        github: "#",
        locked: true
    }
];

// Render
const grid = document.getElementById('grid');

function renderNodes(filter) {
    grid.innerHTML = '';
    const visible = filter === 'all' ? nodes : nodes.filter(n => n.tags.includes(filter));
    document.getElementById('visible-count').textContent = visible.length;

    visible.forEach(n => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';

        const div = document.createElement('div');
        div.className = 'node';
        div.style.setProperty('--clr', n.clr);
        div.style.setProperty('--clr-dim', n.clr + '55');

        if (n.locked) {
            div.innerHTML = `
                <canvas></canvas>
                <div class="node-overlay"></div>
                <div class="corner corner-tl"></div>
                <div class="corner corner-br"></div>
                <div class="node-content">
                    <div class="node-id">${n.id}</div>
                    <div class="node-title is-locked">LOCKED</div>
                    <div class="node-desc is-locked">// Access denied.</div>
                    <div class="btn-row">
                        <button class="node-btn is-locked" disabled>// LOCKED</button>
                    </div>
                </div>
            `;
        } else {
            div.innerHTML = `
                <canvas></canvas>
                <div class="node-overlay"></div>
                <div class="corner corner-tl"></div>
                <div class="corner corner-br"></div>
                <div class="node-content">
                    <div class="node-id">${n.id} <span class="tag">${n.tags[0].toUpperCase()}</span></div>
                    <div class="node-title">${n.title}</div>
                    <div class="node-desc">${n.desc}</div>
                    <div class="node-tech">${n.tech.join(' / ')}</div>
                    <div class="btn-row">
                        <a class="node-btn" href="${n.link}" target="_blank">AVAA →</a>
                        <a class="node-btn ghost" href="${n.github}" target="_blank">GITHUB</a>
                    </div>
                </div>
            `;
        }

        col.appendChild(div);
        grid.appendChild(col);
        initMatrix(div, n);
    });
}

// Matrix rain
function initMatrix(div, n) {
    const canvas = div.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let cols, drops, raf;

    function resize() {
        canvas.width  = div.offsetWidth;
        canvas.height = div.offsetHeight;
        cols  = Math.floor(canvas.width / 14);
        drops = Array(cols).fill(0);
    }

    function draw() {
        ctx.fillStyle = 'rgba(6,10,13,0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '12px "Share Tech Mono"';

        for (let i = 0; i < cols; i++) {
            const ch = n.chars[Math.floor(Math.random() * n.chars.length)];
            const x  = i * 14;
            const y  = drops[i] * 14;

            ctx.globalAlpha = 1;
            ctx.fillStyle   = n.clr;
            ctx.fillText(ch, x, y);

            ctx.globalAlpha = 0.15;
            ctx.fillText(n.chars[Math.floor(Math.random() * n.chars.length)], x, y - 14);
            ctx.globalAlpha = 1;

            if (y > canvas.height && Math.random() > 0.96) drops[i] = 0;
            else drops[i]++;
        }
    }

    div.addEventListener('mouseenter', () => {
        resize();
        raf = setInterval(draw, 50);
    });
    div.addEventListener('mouseleave', () => {
        clearInterval(raf);
        raf = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    window.addEventListener('resize', () => { if (raf) resize(); });
}

// Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderNodes(btn.dataset.filter);
    });
});

// Ticker
const tickerItems = [
    'DATA_STREAMS: ONLINE',
    'BUILD: PASSING',
    'NODE ENV: PRODUCTION',
    'UPTIME: 99.8%',
    'ENCRYPTION: AES-256',
    'PIPELINE STATUS: NOMINAL',
    'DATASETS PROCESSED: 1.4M ROWS',
    'ANOMALIES DETECTED: 0',
    'SIGNAL INTEGRITY: 100%',
    'MEMORY: 4.2GB / 16GB',
    'ANALYSIS ENGINE: READY'
];

const tickerEl = document.getElementById('ticker');

// Rakennetaan yksi "setti" spanneina
function buildSet() {
    const frag = document.createDocumentFragment();
    tickerItems.forEach(t => {
        const span = document.createElement('span');
        span.textContent = t;
        frag.appendChild(span);
        const sep = document.createElement('span');
        sep.className = 'sep';
        sep.textContent = ' /// ';
        frag.appendChild(sep);
    });
    return frag;
}

// Lisätään kolme settiä — riittää kaikkiin näyttöleveyksiin
tickerEl.appendChild(buildSet());
tickerEl.appendChild(buildSet());
tickerEl.appendChild(buildSet());

document.fonts.ready.then(() => {
    // Mitataan yhden setin leveys suoraan DOM:ista
    const children   = tickerEl.children;
    const setSize    = Math.floor(children.length / 3);
    let   setWidth   = 0;
    for (let i = 0; i < setSize; i++) {
        setWidth += children[i].getBoundingClientRect().width;
    }
    // Lisätään gap (3rem = 48px) per elementti
    setWidth += setSize * 48;

    let pos = 0;
    function loop() {
        pos -= 0.5;
        if (pos <= -setWidth) pos += setWidth;
        tickerEl.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(loop);
    }
    loop();
});

renderNodes('all');