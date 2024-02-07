pipeline {
 
   tools {nodejs "node"}
    stages {
         
        stage('Build') {
                steps {
                  
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }
}
