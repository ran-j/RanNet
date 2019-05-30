module.exports = {
    apps : [
        {
          name: "RanNet",
          script: "./bin/www",
          watch: false,
	  instances : "max",
	  exec_mode : "cluster", 
          env: {
              "PORT": 3001,
              "NODE_ENV": "production"
          }
        }
    ]
 }
