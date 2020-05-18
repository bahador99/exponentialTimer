var http = require('http');
http
  .createServer(function (req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(
      `
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>HTML version</title>
          <style>
            body {
              font-family: Georgia, 'Times New Roman', Times, serif;
              font-size: 20px;
              text-align: center;
              margin-top: 100px;
              box-sizing: border-box;
              background: #e7bff5;
            }
            h1 {
              font-size: 60px;
            }
            input {
              width: 100px;
              padding: 10px;
              margin: 8px 0;
              display: inline-block;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 20px;
              font-family: Georgia, 'Times New Roman', Times, serif;
            }
            input:disabled {
              background: #dddddd;
            }
            input[type='number']::-webkit-inner-spin-button {
              opacity: 1;
            }
            button {
              display: inline-block;
              margin: 10px auto;
              border: none;
              cursor: pointer;
              width: 385px;
              height: 67px;
              line-height: 67px;
              font-size: 26px;
              color: #fff;
              border-radius: 35px;
              font-weight: 700;
              max-width: 100%;
              background: rgb(241, 88, 44);
              background: linear-gradient(
                90deg,
                rgba(241, 88, 44, 1) 0%,
                rgba(255, 2, 153, 1) 100%
              );
            }
            button:disabled {
              background: #dddddd;
              cursor: default;
            }
            #timerBox {
              background-color: white;
              margin: auto;
              padding-bottom: 10px;
              width: 400px;
              border-radius: 20px;
              box-shadow: 0px 2px 10px #9528b09c;
            }
            #timer {
              margin-top: 100px;
              font-size: 150px;
              font-family: 'Courier New', Courier, monospace;
              font-weight: 900;
            }
          </style>
        </head>

        <body>
          <div class="container">
            <h1>Exponential Timer</h1>
            <div class="input">
              <label for="seconds">Seconds</label>
              <input
                id="seconds-input"
                type="number"
                name="seconds"
                min="0"
                max="9999"
                value="100"
              />
            </div>
            <div id="timerBox">
              <div id="timer"></div>
              <button id="start-btn">Start</button>
            </div>
          </div>
          <script>
            // elements
            const elTimer = document.getElementById('timer');
            const elSecondsInput = document.getElementById('seconds-input');
            const elStartBtn = document.getElementById('start-btn');

            // Initialize the timer to input value
            elTimer.innerHTML = elSecondsInput.value;

            // input field events
            elSecondsInput.addEventListener('input', () => {
              const number = elSecondsInput.value;
              const len = number.length;
              if (len > 4) elSecondsInput.value = number.substr(0, 4);
              displayInput();
            });
            elSecondsInput.addEventListener('focus', () => {
              displayInput();
            });
            elSecondsInput.addEventListener('blur', () => {
              // when empty input field goes out of focus, set 0
              if (!elTimer.innerHTML) {
                elTimer.innerHTML = 0;
                elSecondsInput.value = 0;
              } else {
                displayInput();
              }
            });

            // run countdown whether by clicking start button
            // or by pressing Enter while focus is on input field
            elStartBtn.addEventListener('click', () => {
              runCountdown();
            });
            elSecondsInput.addEventListener('keydown', (e) => {
              if (e.keyCode === 13) {
                runCountdown();
              }
            });

            // run countdown and disable input fields
            function runCountdown() {
              disable(elSecondsInput);
              disable(elStartBtn);
              countDown(1000, Number(elTimer.innerHTML));
            }

            // exponential countdown using recursive function
            function countDown(delay, time) {
              if (time > 0) {
                if (time <= 10) {
                  elTimer.style.color = 'red';
                }
                setTimeout(() => {
                  elTimer.innerHTML = time - 1;
                  countDown(delay / 1.1, time - 1);
                }, delay);
              } else {
                enable(elStartBtn);
                enable(elSecondsInput);
              }
            }

            // set input value on timer display
            function displayInput() {
              elTimer.innerHTML = Math.round(elSecondsInput.value);
              elTimer.style.color = 'black';
            }

            // Enable or disable elements
            function enable(element) {
              element.removeAttribute('disabled');
            }
            function disable(element) {
              element.setAttribute('disabled', 'true');
            }
          </script>
        </body>
      </html>
    `
    );
    res.end();
  })
  .listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888');
