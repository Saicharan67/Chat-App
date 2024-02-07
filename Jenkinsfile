pipeline {
    agent any

    stages {
    
        stage('Build') {
                steps {
                    tool name: 'nodejs', type: 'nodejs'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
}
