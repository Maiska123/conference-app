pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Checkout') {
            steps {
              git clone https://github.com/Maiska123/conference-app
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test'){
          steps {
            sh 'npm run test'
          }
        }
        stage('Lint'){
          steps {
            sh 'npm run lint'
          }
        }
        stage('Build')
        steps{
           sh 'npm run build'
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            // junit 'build/reports/**/*.xml'
        }
    }
}
