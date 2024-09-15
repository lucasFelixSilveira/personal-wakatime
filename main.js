const { createCanvas, registerFont, loadImage } = require('canvas');
const fs = require('fs');

registerFont(__dirname + '/Arial.ttf', { family: 'Arial'});

function gen_image(dado) {
  return new Promise((resolve, reject) => {
    fetch("https://wakatime.com/share/"+dado+".json", {
      method: "GET"
    }).then(x => x.json()).then(x => draw(x.data)).catch(reject);

    function draw(data) {
      let filteredData = data;

      filteredData = filteredData.map((item) => {
        if( item.name == "newLISP" ) {
          item.name = "eLisp"
        }

        if( dado.split('/')[0].slice(1) == 'lucasFelixSilveira' ) {
          if( ["JavaScript", "Python", "HTML", "CSS", "TypeScript"].includes(item.name) ) {
            let i = item;
            i.percent = 0; 
            return i;
          } else {
            if( item.name == "Carla" ) {
              let i = item;
              i.color = "#1d1d1d";
              return i;
            }
          }
        } else if( dado.split('/')[0].slice(1) == 'EngBandeira' ) {
          if( ["Text", "Roff", "Eiffel", "HTML"].includes(item.name) ) {
            let i = item;
            i.percent = 0; 
            return i;
          } else if( ["C", "C++", "Haskell", "Makefile", "Java", "eLisp"].includes(item.name) ) {
            let i = item;
            const add = (() => {
              switch(item.name) {
                case "C": 
                  return 72
                case "C++":
                  return 90
                case "Java": 
                  return 38
                case "Haskell":
                  return 11
                case "Makefile":
                  return 30
                case "eLisp":
                  return 15
              }
            })();
            i.hours += add;
            return i;
          }
        } else return item;
      })

      let total = 0;
      while( i < filteredData.length ) {
        total += filteredData[i++].hours
      }

      filteredData = filteredData.map((item) => {
        const calculo = item.hours / total * 100;
        item.percent = calculo;
        return item;
      })

      filteredData = data.filter(item => item.percent > 0);

      function generateImage() {
        const itemHeight = 50;
        const padding = 20;
        const progressBarHeight = 10;
        const progressBarWidth = 720;
        const progressBarPaddingTop = 35;
        const progressBarPaddingBottom = 15;
        const width = 800;
        const height = 30 + Math.ceil(filteredData.length / 2) * itemHeight + padding * 2 + progressBarHeight + progressBarPaddingTop + progressBarPaddingBottom;
        const totalSeconds = filteredData.reduce((acc, item) => acc + item.total_seconds, 0);

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        const barStartX = (width - progressBarWidth) / 2;
        const barStartY = progressBarPaddingTop;

        ctx.fillStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(barStartX, barStartY, progressBarWidth, progressBarHeight);

        let progressEndX = barStartX;
        filteredData.forEach(item => {
          const segmentWidth = (item.total_seconds / totalSeconds) * progressBarWidth;
          ctx.fillStyle = item.color;
          ctx.fillRect(progressEndX, barStartY, segmentWidth, progressBarHeight);
          progressEndX += segmentWidth;
        });

        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';

        let yPositionLeft = padding + progressBarPaddingTop + progressBarHeight + progressBarPaddingBottom + 20;
        let yPositionRight = padding + progressBarPaddingTop + progressBarHeight + progressBarPaddingBottom + 20;

        const halfIndex = Math.ceil(filteredData.length / 2);

        filteredData.forEach((item, index) => {
          const percentOfTotal = ((item.total_seconds / totalSeconds) * 100).toFixed(2);
          const text = `${item.name}: ${item.text} (${percentOfTotal}%)`;

          ctx.fillStyle = item.color;
          if (index < halfIndex) {
            ctx.beginPath();
            ctx.arc(30, yPositionLeft - 7, 10, 0, Math.PI * 2, true);
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.fillText(text, 50, yPositionLeft);

            yPositionLeft += itemHeight;
          } else {
            ctx.beginPath();
            ctx.arc(width - 320, yPositionRight - 7, 10, 0, Math.PI * 2, true);
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.fillText(text, width - 300, yPositionRight);

            yPositionRight += itemHeight;
          }
        });

        ctx.fillStyle = '#ffffffbb';
        ctx.fillRect(0, height - 30, width, 30);

        ctx.fillStyle = '#333333cc';
        ctx.font = 'italic bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('API From Wakatime', width / 2, height - 7);

        const buffer = canvas.toBuffer('image/png');
        resolve(buffer);
      }

      generateImage();

      console.log('Imagem gerada: output.png');
    }

  })
}

const express = require("express");
const app = express();

app.get('/timer', async (req, res) => {
  const { username, key } = req.query;
  res.set('Content-Type', 'image/png');
  res.send(await gen_image(`@${username}/${key}`));
})

app.listen(8080);