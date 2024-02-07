pipeline {
   agent { docker { image 'node:20.11.0-alpine3.19' } }

    stages {
         
        stage('Build') {
                steps {
                  
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
}
