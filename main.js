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

      if( dado.split('/')[0].slice(1) == 'lucasFelixSilveira' ) {
        filteredData = filteredData.map((item) => {
          if( ["JavaScript", "Python", "HTML", "CSS", "TypeScript"].includes(item.name) ) {
            let i = item;
            i.percent = 0; 
            return i;
          } else {
            if( item.name == "Carla" ) {
              let i = item;
              i.color = "#1d1d1d";
              return i;
            } else item;
          }
        })
      } 

      if( dado.split('/')[0].slice(1) == 'EngBandeira' ) {
        filteredData = filteredData.map((item) => {
          if( ["Text", "Roff", "Eiffel", "HTML"].includes(item.name) ) {
            let i = item;
            i.percent = 0; 
            return i;
          } else {
            if( ["C", "C++", "Haskell", "Makefile", "Java", "eLisp"].includes(item.name) ) {
              let i = item;
              switch(item.name) {
                case "C": { 
                  const add = 72;
                  i.hours += add;
                  i.total_seconds += (60^2) * add;
                  break;
                }
                case "C++": {
                  const add = 90;
                  i.hours += add;
                  i.total_seconds += (60^2) * add;
                  break;
                }
                case "Java": { 
                  const add = 38;
                  i.hours += add;
                  i.total_seconds += (60^2) * add;
                  break;
                }
                case "Haskell": {
                  const add = 11;
                  i.hours += add;
                  i.total_seconds += (60^2) * add;
                  break;
                }
                case "Makefile": {
                  const add = 30;
                  i.hours += add;
                  i.total_seconds += (60^2) * add;
                  break;
                }
                case "eLisp": {
                  const add = 15;
                  i.hours += add;
                  i.total_seconds += (60^2) * add;
                  break;
                }
              }
              return i;
            } else item;
          }
        })
      }

      const nArray = [];
      let i = 0;
      while( i < filteredData.length ) {
        if( filteredData[i] && filteredData[i].hours >= 1 ) 
          nArray.push(filteredData[i++])
        else i++;
      }
      filteredData = nArray;
      
      function sortByTotalSeconds(array) {
        if (!Array.isArray(array) || array.length === 0) {
            throw new Error('Input should be a non-empty array');
        }
      
        return array.sort((a, b) => b.total_seconds - a.total_seconds);
      }
      console.log(filteredData.slice(0,5));
      filteredData = sortByTotalSeconds(filteredData)
      console.log(filteredData.slice(0,5));

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
          const text = `${item.name}: ${item.hours} hrs ${item.minutes} mins (${percentOfTotal}%)`;

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