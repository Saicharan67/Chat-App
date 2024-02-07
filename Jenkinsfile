pipeline {
    agent any

    stages {
       
       

        stage('Install dependencies') {
            steps {
                sh 'npm install' // Or use 'yarn install' if preferred
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build' // Or use 'yarn build' if preferred
            }
        }


    }
}
