pipline{
  
 agent any{
   stages{
     stage ('Initialize'){
     steps{
       sh '''
               echo "PATH = $(PATH)"
               echo "M2_HOME = $(M2_HOME)"
          '''
     }
   }

    stage('Build'){
      sh 'npm install'
    }
 }

}
}
