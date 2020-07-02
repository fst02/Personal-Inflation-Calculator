killall screen
screen -dmS personal-inflation-calculator-backend bash -c 'cd backend;npm run watch-and-log'
screen -dmS personal-inflation-calculator-frontend bash -c 'cd frontend;npm run serve-and-log'
sleep 1s
screen -ls
