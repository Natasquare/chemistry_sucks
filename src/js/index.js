function $(x){return document.querySelector(x)}
function $$(x){let a=[];for(let e of document.querySelectorAll(x))a.push(e);return a}


(function(){
    const {elements} = d,
        matrix = Array.from(Array(10), () => Array(18).fill(0)),
        typemap = {
            actinide: "act",
            "alkali metal": "amt",
            "alkaline earth metal": "aem",
            "diatomic nonmetal": "dnm",
            lanthanide: "lan",
            metalloid: "mtl",
            "noble gas": "nbg",
            "polyatomic nonmetal": "pnm",
            "post-transition metal": "ptm",
            "transition metal": "tsm"
        },
        table = $(".table"),
        legend = $(".legend");
    for (const e of elements)
        matrix[e.ypos - 1][e.xpos - 1] = e;
    for (const rowi in matrix) {
        const row = matrix[rowi],
            rel = document.createElement("div");
        table.append(rel);
        rel.classList.add("row", `r${rowi}`);
        for (const coli in row) {
            const col = row[coli],
                cel = document.createElement("div"),
                tip = document.createElement("div");
            rel.append(cel);
            cel.classList.add("column", `c${coli}`);
            if (!col) {
                cel.classList.add("empty");
                continue;
            }
            cel.classList.add(col.category.startsWith("unknown") ? "unknown" : typemap[col.category]);
            // cel.style.backgroundColor = "#" + col["cpk-hex"]
            cel.innerHTML = col.symbol;
            cel.appendChild(tip);
            tip.innerHTML = col.name;
            if (row.slice(coli - 1).every((x) => !x)) break;
        }
    }
    for (const [k, v] of Object.entries(typemap)) {
        const def = document.createElement("div"),
            text = document.createElement("p"),
            color = document.createElement("div");
        color.classList.add(v);
        text.innerHTML = k.split(" ").map((x) => x[0].toUpperCase() + x.slice(1)).join(" ")
        def.append(color, text);
        legend.append(def);

        function ucl(c, x, a) {
            c.forEach((c) => c.classList[x](a))
        }

        def.onmouseover = () => ucl($$(".column").filter((x) => ![...x.classList].includes(v) && ![...x.classList].includes("void")), "add", "void")
        def.onmouseout = () => ucl($$(".column").filter((x) => ![...x.classList].includes(v) && [...x.classList].includes("void")), "remove", "void")
    }
})()
