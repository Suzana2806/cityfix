pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'docker compose down'
                bat 'docker compose up -d'
            }
        }

    }

    post {
        success {
            echo 'CityFix deployed successfully!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}