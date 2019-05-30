module.exports = {
    apps : [
        {
          name: "RanNet",
          script: "./bin/www",
          watch: false,
          env: {
              "PORT": 3001,
              "NODE_ENV": "production"
          }
        }
    ]
  }
