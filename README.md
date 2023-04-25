# Setting Up

### Install Docker and Docker Compose

`sudo apt install docker docker-compose -y`

### Install NVM

1. `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
2. `source ~/.bashrc`

### Install NPM

`nvm i 18`

### Install PM2 and Yarn

`npm i -g pm2 yarn`

### Setup env

1. `cp .env.example .env`
2. Adjust `.env` variables (can be edited with vim/nano)

### Setup DB

`docker-compose --env-file .env up -d`

### Setup BE/FE

1. Install all dep `yarn`
2. Transpile to js `yarn build`
3. Run migrations `yarn migrate`
4. Run seeder `yarn seed`

# Setup PM2

1. On project root, `pm2 init`
2. Change `ecosystem.config.js` to

```js
module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: './backend',
      script: 'yarn start',
    },
    {
      name: 'frontend',
      cwd: './frontend',
      script: 'yarn preview --host --port 3000',
    },
  ],
};
```

3. Start pm2 process `pm2 start ecosystem.config.js`
