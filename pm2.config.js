module.exports = {
    apps : [
        {
          name: "RanNet",
          script: "./bin/www",
          watch: true,
          env: {
              "PORT": 3001,
              "NODE_ENV": "production"
          }
        }
    ]
  }