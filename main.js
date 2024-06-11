const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

function gen_image(dado) {
  return new Promise((resolve, reject) => {
    fetch("https://wakatime.com/share/"+dado+".json", {
      method: "GET"
    }).then(x => x.json()).then(x => draw(x.data)).catch(reject);

    function draw(data) {
      const filteredData = data.filter(item => item.percent > 0);

      function generateImage() {
        const itemHeight = 50;
        const padding = 20;
        const progressBarHeight = 10;
        const progressBarWidth = 720;
        const progressBarPaddingTop = 35;
        const progressBarPaddingBottom = 15;
        const width = 800;
        const height = 30 + Math.ceil(filteredData.length / 2) * itemHeight + padding * 2 + progressBarHeight + progressBarPaddingTop + progressBarPaddingBottom;

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
          const segmentWidth = (item.percent / 100) * progressBarWidth;
          ctx.fillStyle = item.color;
          ctx.fillRect(progressEndX, barStartY, segmentWidth, progressBarHeight);
          progressEndX += segmentWidth;
        });

        ctx.font = '20px Verdana';
        ctx.fillStyle = 'white';

        const totalSeconds = filteredData.reduce((acc, item) => acc + item.total_seconds, 0);
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
        ctx.font = 'italic bold 20px Verdana';
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