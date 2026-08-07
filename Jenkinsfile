pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Code checked out by Jenkins'
            }
        }

        stage('Build Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker compose down'
                bat 'docker compose up -d'
            }
        }

        stage('Verify') {
            steps {
                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'CityFix deployed successfully!'
        }
        failure {
            echo 'Pipeline failed - check the logs above.'
        }
    }
}