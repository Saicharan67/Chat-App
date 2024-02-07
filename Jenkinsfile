pipeline {
    agent any

    stages {
    
        stage('Build') {
                steps {
                    tool name: 'nodejs', type: 'nodejs', version: '20.5.0'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
}
