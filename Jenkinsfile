pipeline {
   agent any
   tools {nodejs "Node"}
    stages {
         
        stage('Build') {
                steps {
                    
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }
}
