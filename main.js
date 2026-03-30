const { createCanvas, registerFont, loadImage } = require("canvas");
const fs = require("fs");
require("dotenv").config();

registerFont(__dirname + "/Arial.ttf", { family: "Arial" });
registerFont(__dirname + "/Roboto.ttf", { family: "Roboto" });

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function gen_image(dado) {
    return new Promise((resolve, reject) => {
        fetch("https://wakatime.com/share/" + dado + ".json", {
            method: "GET",
        })
            .then((x) => x.json())
            .then((x) => draw(x.data))
            .catch(reject);

        function draw(data) {
            let filteredData = data;

            if (dado.split("/")[0].slice(1) == "lucasFelixSilveira") {
                if (!filteredData.map((x) => x.name).includes("Java")) {
                    filteredData.push({
                        name: "Go",
                        minutes: 26,
                        hours: 0,
                        total_seconds: 0,
                        color: "#00add8",
                    });
                }
                filteredData = filteredData.map((item) => {
                    if (["HTML", "CSS", "Text"].includes(item.name)) {
                        let i = item;
                        i.delete = true;
                        return i;
                    } else {
                        let i = item;
                        i.color = item.name == "Carla" ? "#1d1d1d" : i.color;
                        switch (item.name) {
                            case "C++": {
                                const add = 38;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "Rust": {
                                const add = 218;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "C": {
                                const add = 847;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "Zig": {
                                const add = 96;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "Java": {
                                const add = 264;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "Assembly": {
                                const add = 87;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "newLISP": {
                                const add = 12;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                i.name = "eLisp";
                                break;
                            }
                            case "Carla": {
                                const add = 120;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "Go": {
                                const add = 43;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "JavaScript": {
                                const add = 192;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                        }
                        return i;
                    }
                });
            }

            if (dado.split("/")[0].slice(1) == "SunnYu") {
                filteredData.push({
                    name: "Carla",
                    hours: 0,
                    total_seconds: 0,
                    minutes: 99,
                });
                filteredData = filteredData.map((item) => {
                    if (
                        [
                            "Python",
                            "JSON",
                            "Markdown",
                            "Makefile",
                            "Vim Script",
                            "Other",
                        ].includes(item.name)
                    ) {
                        let i = item;
                        i.delete = true;
                        return i;
                    } else {
                        let i = item;
                        i.color = item.name == "Carla" ? "#1d1d1d" : i.color;
                        switch (item.name) {
                            case "Carla": {
                                const add = 763;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                        }
                        return i;
                    }
                });
            }

            if (dado.split("/")[0].slice(1) == "EngBandeira") {
                if (!filteredData.map((x) => x.name).includes("Java")) {
                    filteredData.push({
                        name: "Java",
                        minutes: 32,
                        hours: 0,
                        total_seconds: 0,
                        color: "#b07219",
                    });
                }
                if (!filteredData.map((x) => x.name).includes("Carla")) {
                    filteredData.push({
                        name: "Carla",
                        minutes: 99,
                        hours: 763,
                        total_seconds: Math.floor(60 * 60 * 763 + 60 + 99),
                        color: "#1d1d1d",
                    });
                }
                filteredData = filteredData.map((item) => {
                    if (
                        ["Text", "Roff", "Eiffel", "HTML"].includes(item.name)
                    ) {
                        let i = item;
                        i.delete = true;
                        return i;
                    } else {
                        let i = item;
                        switch (item.name) {
                            case "C": {
                                const add = 72;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "C++": {
                                const add = 90;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "Java": {
                                const add = 38;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "Haskell": {
                                const add = 11;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "Makefile": {
                                const add = 30;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                break;
                            }
                            case "newLISP": {
                                const add = 27;
                                i.hours += add;
                                i.total_seconds += Math.floor(60 * 60 * add);
                                i.name = "eLisp";
                                break;
                            }
                        }
                        return i;
                    }
                });
            }

            const nArray = [];
            let i = 0;
            while (i < filteredData.length) {
                if (
                    filteredData[i] &&
                    !filteredData[i].delete &&
                    filteredData[i].total_seconds > Math.pow(60, 2)
                )
                    nArray.push(filteredData[i++]);
                else i++;
            }
            filteredData = nArray;

            function sortByTotalSeconds(array) {
                if (!Array.isArray(array) || array.length === 0) {
                    throw new Error("Input should be a non-empty array");
                }

                return array.sort((a, b) => b.total_seconds - a.total_seconds);
            }

            filteredData = sortByTotalSeconds(filteredData);

            function generateImage() {
                const itemHeight = 50;
                const padding = 20;
                const progressBarHeight = 10;
                const progressBarWidth = 720;
                const progressBarPaddingTop = 35;
                const progressBarPaddingBottom = 15;
                const width = 800;
                const height =
                    30 +
                    Math.ceil(filteredData.length / 2) * itemHeight +
                    padding * 2 +
                    progressBarHeight +
                    progressBarPaddingTop +
                    progressBarPaddingBottom;
                const totalSeconds = filteredData.reduce(
                    (acc, item) => acc + item.total_seconds,
                    0,
                );

                const canvas = createCanvas(width, height);
                const ctx = canvas.getContext("2d");

                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, width, height);

                const barStartX = (width - progressBarWidth) / 2;
                const barStartY = progressBarPaddingTop;

                ctx.fillStyle = "white";
                ctx.lineWidth = 2;
                ctx.strokeStyle = "white";
                ctx.strokeRect(
                    barStartX,
                    barStartY,
                    progressBarWidth,
                    progressBarHeight,
                );

                let progressEndX = barStartX;
                filteredData.forEach((item) => {
                    const segmentWidth =
                        (item.total_seconds / totalSeconds) * progressBarWidth;
                    ctx.fillStyle = item.color;
                    ctx.fillRect(
                        progressEndX,
                        barStartY,
                        segmentWidth,
                        progressBarHeight,
                    );
                    progressEndX += segmentWidth;
                });

                ctx.font = "20px Arial";
                ctx.fillStyle = "white";

                let yPositionLeft =
                    padding +
                    progressBarPaddingTop +
                    progressBarHeight +
                    progressBarPaddingBottom +
                    20;
                let yPositionRight =
                    padding +
                    progressBarPaddingTop +
                    progressBarHeight +
                    progressBarPaddingBottom +
                    20;

                const halfIndex = Math.ceil(filteredData.length / 2);

                filteredData.forEach((item, index) => {
                    const percentOfTotal = (
                        (item.total_seconds / totalSeconds) *
                        100
                    ).toFixed(2);
                    const text = `${item.name}: ${item.hours} hrs ${item.minutes} mins (${percentOfTotal}%)`;

                    ctx.fillStyle = item.color;
                    if (index < halfIndex) {
                        ctx.beginPath();
                        ctx.arc(
                            30,
                            yPositionLeft - 7,
                            10,
                            0,
                            Math.PI * 2,
                            true,
                        );
                        ctx.fill();

                        ctx.fillStyle = "white";
                        ctx.fillText(text, 50, yPositionLeft);

                        yPositionLeft += itemHeight;
                    } else {
                        ctx.beginPath();
                        ctx.arc(
                            width - 350,
                            yPositionRight - 7,
                            10,
                            0,
                            Math.PI * 2,
                            true,
                        );
                        ctx.fill();

                        ctx.fillStyle = "white";
                        ctx.fillText(text, width - 330, yPositionRight);

                        yPositionRight += itemHeight;
                    }
                });

                ctx.fillStyle = "#ffffffbb";
                ctx.fillRect(0, height - 30, width, 30);

                ctx.fillStyle = "#333333cc";
                ctx.font = "italic bold 20px Arial";
                ctx.textAlign = "center";
                ctx.fillText("API From Wakatime", width / 2, height - 7);

                const buffer = canvas.toBuffer("image/png");
                resolve(buffer);
            }

            generateImage();

            console.log("Imagem gerada: output.png");
        }
    });
}

async function getGithubLanguages(username) {
    const headers = {
        "User-Agent": "node",
        Accept: "application/vnd.github+json",
        ...(GITHUB_TOKEN && {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
        }),
    };

    const repos = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        { headers },
    ).then((res) => res.json());

    const langTotals = {};

    for (const repo of repos) {
        if (!repo.languages_url) continue;

        const langs = await fetch(repo.languages_url, { headers }).then((res) =>
            res.json(),
        );

        for (const lang in langs) {
            if (!langTotals[lang]) langTotals[lang] = 0;
            langTotals[lang] += langs[lang];
        }
    }

    return langTotals;
}

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  CSharp: "#178600",
  Kotlin: "#A97BFF",
  Swift: "#ffac45",
  Dart: "#00B4AB",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Elixir: "#6e4a7e",
  Erlang: "#B83998",
  Scala: "#c22d40",
  Haxe: "#df7900",
  ObjectiveC: "#438eff",

  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Less: "#1d365d",

  Shell: "#89e051",
  Bash: "#4EAA25",
  PowerShell: "#012456",
  Fish: "#4aae47",

  SQL: "#e38c00",
  PLpgSQL: "#336790",

  JSON: "#292929",
  YAML: "#cb171e",
  TOML: "#9c4221",
  XML: "#0060ac",

  Markdown: "#083fa1",

  Perl: "#0297c1",
  Lua: "#000080",
  Zig: "#ec915c",
  Assembly: "#6E4C13",
  Haskell: "#5e5086",
  OCaml: "#3be133",
  Nim: "#ffc200",
  Crystal: "#000100",
  V: "#5d87bf",

  R: "#198CE7",
  Julia: "#a270ba",
  Matlab: "#e16737",
  Octave: "#0790c0",

  Fortran: "#4d41b1",
  COBOL: "#005ca5",
  Ada: "#02f88c",

  GraphQL: "#e10098",
  ProtoBuf: "#d1a00f",

  Svelte: "#ff3e00",
  Vue: "#41b883",
  Angular: "#dd0031",
  React: "#61dafb",

  WebAssembly: "#04133b",

  Dockerfile: "#384d54",
  Makefile: "#427819",
  CMake: "#DA3434",

  Meow: "#ff0678",

  default: "#999999",
};

function applyCutePreset(langTotals, options = {}) {
    const pastelPalette = [
        "#ff9ecb",
        "#ffb3d9",
        "#ffcce6",
        "#e6a6ff",
        "#d580ff",
        "#c266ff",
        "#ff80bf",
        "#ff66a3"
    ];

    const cuteBoost = {
        Rust: 1.6,
        C: 1.8,
        Swift: 2
    };

    let i = 0;

    for (const lang in langTotals) {
        LANGUAGE_COLORS[lang] = pastelPalette[i % pastelPalette.length];
        i++;
    }

    for (const lang in cuteBoost) {
        if (langTotals[lang]) {
            langTotals[lang] = Math.floor(langTotals[lang] * cuteBoost[lang]);
        }
    }

    options._cute = true;
    return langTotals;
}

function drawPieChart(langTotals, options = {}) {
    const width = 900;
    const height = 870;
    const radius = 200;

    const {
        add = {},
        remove = [],
        override = {},
        limit = 6
    } = options;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = options._cute ? "#50003f" : "#000";
    ctx.fillRect(0, 0, width, height);

    let modified = { ...langTotals };

    for (const lang of remove) delete modified[lang];
    for (const [lang, value] of Object.entries(add)) {
        modified[lang] = (modified[lang] || 0) + value;
    }
    for (const [lang, value] of Object.entries(override)) {
        modified[lang] = value;
    }

    let entries = Object.entries(modified)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);

    const total = entries.reduce((acc, [, v]) => acc + v, 0);

    let start = 0;

    entries.forEach(([lang, value]) => {
        const slice = (value / total) * Math.PI * 2;
        const color = LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default;

        ctx.shadowColor = color;
        ctx.shadowBlur = options._cute ? 25 : 10;

        ctx.beginPath();
        ctx.moveTo(width / 2, 370);
        ctx.arc(width / 2, 370, radius, start, start + slice);
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();

        ctx.shadowBlur = 0;

        start += slice;
    });

    if (options._cute) {
        ctx.save();

        ctx.globalAlpha = 0.15;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(width / 2, 370, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        const gradient = ctx.createRadialGradient(
            width / 2 - 60,
            370 - 60,
            10,
            width / 2,
            370,
            radius
        );

        gradient.addColorStop(0, "rgba(255,255,255,0.4)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.globalAlpha = 0.6;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(width / 2, 370, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    if (options._cute) {
        ctx.beginPath();
        ctx.arc(width / 2, 370, radius - 40, 0, Math.PI * 2);
        ctx.fillStyle = "#1a001f";
        ctx.fill();
    }

    const startY = 670;
    let xLeft = 100;
    let xRight = 500;
    let yLeft = startY;
    let yRight = startY;

    const half = Math.ceil(entries.length / 2);

    entries.forEach(([lang, value], index) => {
        const percent = ((value / total) * 100).toFixed(2);
        const text = `${lang}: ${percent}%`;

        const color = LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default;

        const isLeft = index < half;
        const x = isLeft ? xLeft : xRight;
        const y = isLeft ? yLeft : yRight;

        ctx.beginPath();
        ctx.arc(x, y - 15, 14, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.fillStyle = options._cute ? "#ffe6f2" : "white";
        ctx.font = "42px Arial";
        ctx.fillText(text, x + 35, y - 2.5);

        if (isLeft) yLeft += 55;
        else yRight += 55;
    });

    ctx.fillStyle = options._cute ? "#ffb3d9" : "#ff6e96";
    ctx.font = "bold 60px Roboto";
    ctx.textAlign = "center";

    const title = options._cute
        ? "🌸✨ Most used languages ✨🌸"
        : "Most used languages";

    ctx.fillText(title, 450, 80);

    return canvas.toBuffer("image/png");
}

const express = require("express");
const app = express();

app.get("/timer", async (req, res) => {
    const { username, key } = req.query;
    res.set("Content-Type", "image/png");
    res.send(await gen_image(`@${username}/${key}`));
});

app.get("/amount", async (req, res) => {
    const { username, presset } = req.query;

    try {
        let langs = await getGithubLanguages(username);
        if( presset === "cute" ) langs = applyCutePreset(langs, { _cute: true });
        const image = drawPieChart(langs, {
            add: { "Meow": presset === "cute" ? 10000 : 0 },
            limit: 6
        });

        res.set("Content-Type", "image/png");
        res.send(image);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
});

app.listen(8080);
